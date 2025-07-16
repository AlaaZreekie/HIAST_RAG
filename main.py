from fastapi import FastAPI, UploadFile, File, HTTPException
from src.rag_chain import get_conversation_aware_response
from src.token_manager import TokenManager
from src.rag_abstractions import DefaultRAGPipeline, QueryTransformRAGPipeline, RAGFusionPipeline
from src.url_scraper import URLScraper
from src.models import (
    QuestionRequest, 
    AnswerResponse, 
    DatabaseResponse, 
    RetrainRequest,
    URLScrapeRequest, 
    URLScrapeResponse,
    URLCountRequest,
    URLCountResponse,
    RecursiveURLCountRequest,
    RecursiveURLCountResponse,
    RecursiveURLStatsRequest,
    RecursiveURLStatsResponse,
    ConversationResponse,
    ClearConversationResponse
)
from src.embedder import Embedder
import os
import tempfile

app = FastAPI(
    title="Conversational RAG API",
    description="A RESTful API for asking questions to a document-aware AI.",
    version="1.0.0"
)

# Initialize token manager
token_manager = TokenManager()

# Global conversation history using hash map for O(1) lookup
# Structure: {question_hash: {"user": question, "assistant": answer}}
conversation_history = {}

# Strategy pattern for RAG pipeline
class RAGStrategy:
    DEFAULT = "default"
    QUERY_TRANSFORM = "query_transform"
    FUSION = "fusion"

# Global variable to store current strategy
current_strategy = {"strategy": RAGStrategy.DEFAULT}

# Strategy instances
strategy_instances = {
    RAGStrategy.DEFAULT: DefaultRAGPipeline(),
    RAGStrategy.QUERY_TRANSFORM: QueryTransformRAGPipeline(),
    RAGStrategy.FUSION: RAGFusionPipeline()
}

@app.post("/set-strategy")
def set_strategy(strategy: str):
    if strategy not in strategy_instances:
        raise HTTPException(status_code=400, detail=f"Invalid strategy. Choose from: {list(strategy_instances.keys())}")
    current_strategy["strategy"] = strategy
    return {"message": f"Strategy set to {strategy}"}

@app.post("/conversation", response_model=AnswerResponse)
async def ask_question(request: QuestionRequest):
    global conversation_history
    
    # Create hash key for the question (normalized)
    question_hash = request.question.lower().strip()
    
    # Check if this question has already been asked (O(1) lookup)
    if question_hash in conversation_history:
        previous_answer = conversation_history[question_hash]["assistant"]
        print(f"🔄 Question already asked before. Returning cached answer.")
        print(f"❓ Question: {request.question[:100]}{'...' if len(request.question) > 100 else ''}")
        print(f"✅ Cached Answer: {previous_answer[:100]}{'...' if len(previous_answer) > 100 else ''}")
        print("-" * 80)
        
        return {
            "answer": previous_answer, 
            "tokens_used": 0,  # No new tokens used since we're returning cached answer
            "conversation_length": len(conversation_history)
        }
    
    # If question not found in history, proceed with normal processing
    print(f"🆕 New question detected. Generating answer...")
    
    # Count input tokens
    input_tokens = token_manager.count_tokens(request.question)
    print(f"🔍 Input tokens: {input_tokens}")
    
    # Use the selected RAG pipeline strategy
    strategy = current_strategy["strategy"]
    pipeline = strategy_instances[strategy]
    answer = await pipeline.answer_question(request.question, conversation_history)
    
    # Count output tokens
    output_tokens = token_manager.count_tokens(answer)
    total_tokens = input_tokens + output_tokens
    
    # Add to conversation history (O(1) insertion)
    conversation_history[question_hash] = {
        "user": request.question,
        "assistant": answer
    }
    
    # Manage conversation history size if needed
    conversation_history = token_manager.manage_conversation_history_hash(
        conversation_history, request.question, answer
    )
    
    print(f"💬 Output tokens: {output_tokens}")
    print(f"📊 Total tokens for this request: {total_tokens}")
    print(f"❓ Question: {request.question[:100]}{'...' if len(request.question) > 100 else ''}")
    print(f"✅ Answer: {answer[:100]}{'...' if len(answer) > 100 else ''}")
    print(f"📝 Conversation length: {len(conversation_history)}")
    print("-" * 80)
    
    return {
        "answer": answer, 
        "tokens_used": total_tokens,
        "conversation_length": len(conversation_history)
    }

@app.post("/data/scrape-url", response_model=URLScrapeResponse)
def scrape_url(request: URLScrapeRequest):
    """
    Scrape a URL and return the scraped content without updating the database.
    """
    try:
        print(f"🌐 Scraping URL: {request.url}")
        
        scraper = URLScraper()
        result = scraper.scrape_recursive_and_save(request.url, max_depth=request.max_depth, output_file=request.output_file)
        
        if not result["success"]:
            raise HTTPException(status_code=500, detail=f"Scraping failed: {result.get('error', 'Unknown error')}")
        
        return URLScrapeResponse(
            message="URL scraped successfully",
            success=True,
            urls_scraped=result.get("urls_scraped", 0),
            total_content_length=result.get("total_content_length", 0),
            output_file=request.output_file
        )
    except Exception as e:
        print(f"❌ Error in scrape_url: {e}")
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

@app.post("/data/count-urls-recursive", response_model=RecursiveURLCountResponse)
def count_urls_recursive(request: RecursiveURLCountRequest):
    """
    Count the number of URLs that can be found through recursive crawling up to specified depth.
    """
    try:
        print(f"🕷️ Counting URLs recursively from: {request.url} (max depth: {request.max_depth})")
        
        scraper = URLScraper()
        urls_found = scraper.crawl_for_urls(request.url, max_depth=request.max_depth)
        url_count = len(urls_found)
        
        return RecursiveURLCountResponse(
            url=request.url,
            url_count=url_count,
            max_depth=request.max_depth,
            success=True,
            message=f"Found {url_count} unique URLs through recursive crawling (depth: {request.max_depth})"
        )
    except Exception as e:
        print(f"❌ Error counting URLs recursively: {e}")
        return RecursiveURLCountResponse(
            url=request.url,
            url_count=0,
            max_depth=request.max_depth,
            success=False,
            message=f"Error counting URLs recursively: {str(e)}"
        )

@app.post("/data/scrape-recursive-and-update", response_model=URLScrapeResponse)
def scrape_recursive_and_update_database(request: URLScrapeRequest):
    """
    Recursively scrape a URL and all linked pages up to the specified max_depth, then update the database.
    """
    try:
        print(f"🕷️ Starting recursive scraping and database update: {request.url}")
        
        scraper = URLScraper()
        result = scraper.scrape_recursive_and_save(request.url, max_depth=request.max_depth, output_file=request.output_file)
        
        if not result["success"]:
            raise HTTPException(status_code=500, detail=f"Recursive scraping failed: {result.get('error', 'Unknown error')}")
        
        embedder_instance = Embedder()
        embedder_instance.retrain(request.output_file)
        
        return URLScrapeResponse(
            message=f"Recursive scraping and database update completed. Found {result.get('urls_found', 0)} URLs, scraped {result.get('urls_scraped', 0)}",
            success=True,
            urls_scraped=result.get("urls_scraped", 0),
            total_content_length=result.get("total_content_length", 0),
            output_file=request.output_file
        )
    except Exception as e:
        print(f"❌ Error in recursive scraping and update: {e}")
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

@app.post("/data/retrain", response_model=DatabaseResponse)
def retrain(request: RetrainRequest):
    """
    Rebuild the vector database using the Embedder class with custom chunk parameters
    """
    try:
        print(f"🔄 Rebuilding database using Embedder class...")
        print(f"✂️ Chunk size: {request.chunk_size}")
        print(f"🔄 Chunk overlap: {request.chunk_overlap}")
        
        # Create embedder instance and retrain database with custom parameters
        embedder_instance = Embedder()
        embedder_instance.retrain(
            chunk_size=request.chunk_size,
            chunk_overlap=request.chunk_overlap
        )
        
        # Get database info
        info = embedder_instance.get_database_info()
        
        print("✅ Database rebuilt successfully!")
        print(f"📊 Database info: {info}")
        
        return DatabaseResponse(
            message=f"Database rebuilt successfully with chunk_size={request.chunk_size}, chunk_overlap={request.chunk_overlap}. Total documents: {info.get('total_documents', 0)}",
            success=True
        )
        
    except Exception as e:
        print(f"❌ Error rebuilding database: {e}")
        return DatabaseResponse(
            message=f"Error rebuilding database: {str(e)}",
            success=False
        )

@app.get("/database-info")
def get_database_info():
    """Get information about the current vector database."""
    try:
        embedder_instance = Embedder()
        info = embedder_instance.get_database_info()
        return info
    except Exception as e:
        return {
            "database_path": "chroma_db",
            "total_documents": 0,
            "embedding_model": "models/embedding-001",
            "status": "error",
            "error": str(e)
        }

@app.get("/conversation", response_model=ConversationResponse)
def get_conversation():
    """Get the current conversation history."""
    # Convert hash map to list format for the response
    messages_list = []
    for qa_pair in conversation_history.values():
        messages_list.append({"role": "user", "content": qa_pair["user"]})
        messages_list.append({"role": "assistant", "content": qa_pair["assistant"]})
    
    return ConversationResponse(
        messages=messages_list,
        total_tokens=token_manager.count_conversation_tokens_hash(conversation_history),
        max_tokens=token_manager.max_tokens - token_manager.reserved_tokens
    )

@app.delete("/conversation", response_model=ClearConversationResponse)
def clear_conversation():
    """Clear the conversation history."""
    global conversation_history
    conversation_history = {}
    return ClearConversationResponse(message="Conversation cleared") 