from fastapi import FastAPI, UploadFile, File, HTTPException
from src.rag_chain import get_conversation_aware_response
from src.token_manager import TokenManager
from src import embedder
from src.url_scraper import URLScraper
from src.models import (
    QuestionRequest, 
    AnswerResponse, 
    DatabaseResponse, 
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
import os
import tempfile
from langchain.memory import ConversationTokenBufferMemory
from langchain_google_genai import ChatGoogleGenerativeAI

app = FastAPI(title="RAG QA API", description="Ask questions and get answers using RAG and Gemini Pro.")

llm = ChatGoogleGenerativeAI(model="gemini-2.5-pro", temperature=0.5, google_api_key="YOUR_API_KEY")
memory = ConversationTokenBufferMemory(
    llm=llm,
    max_token_limit=30000,  # or your preferred limit
    return_messages=True
)

@app.post("/ask", response_model=AnswerResponse)
def ask_question(request: QuestionRequest):
    # Save user message
    memory.save_context({"input": request.question}, {})
    # Get context/history for the LLM
    history = memory.load_memory_variables({})["history"]
    # Get response from LLM (pass history if your chain/LLM supports it)
    answer = llm.invoke(request.question, memory=memory)
    # Save assistant response
    memory.save_context({}, {"output": answer})
    # Count tokens (optional, can use memory.llm.get_num_tokens_from_messages if needed)
    total_tokens = memory.llm.get_num_tokens_from_messages(history)
    return {
        "answer": answer,
        "tokens_used": total_tokens,
        "conversation_length": len(history)
    }

@app.post("/scrape-url", response_model=URLScrapeResponse)
def scrape_url(request: URLScrapeRequest):
    """
    Scrape a URL and return the scraped content without updating the database.
    """
    try:
        print(f"🌐 Scraping URL: {request.url}")
        
        # Initialize URL scraper
        scraper = URLScraper()
        
        # Scrape the URL and save to file
        scrape_result = scraper.scrape_and_save(request.url, request.output_file)
        
        if not scrape_result["success"]:
            raise HTTPException(status_code=500, detail=f"Scraping failed: {scrape_result.get('error', 'Unknown error')}")
        
        print(f"✅ Scraping completed. URLs scraped: {scrape_result['urls_scraped']}")
        
        return URLScrapeResponse(
            message="URL scraped successfully",
            success=True,
            urls_scraped=scrape_result["urls_scraped"],
            total_content_length=scrape_result["total_content_length"],
            output_file=request.output_file
        )
        
    except Exception as e:
        print(f"❌ Error in scrape_url: {e}")
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

@app.post("/count-urls", response_model=URLCountResponse)
def count_urls(request: URLCountRequest):
    """
    Count the number of URLs that can be scraped from a given URL.
    """
    try:
        print(f"🔍 Counting URLs from: {request.url}")
        
        # Initialize URL scraper
        scraper = URLScraper()
        
        # Get URLs from the page (now returns a map)
        urls_map = scraper.get_urls_from_page(request.url)
        url_count = len(urls_map)
        
        print(f"✅ Found {url_count} unique URLs from {request.url}")
        
        return URLCountResponse(
            url=request.url,
            url_count=url_count,
            success=True,
            message=f"Found {url_count} unique URLs that can be scraped"
        )
        
    except Exception as e:
        print(f"❌ Error counting URLs: {e}")
        return URLCountResponse(
            url=request.url,
            url_count=0,
            success=False,
            message=f"Error counting URLs: {str(e)}"
        )

@app.post("/count-urls-recursive", response_model=RecursiveURLCountResponse)
def count_urls_recursive(request: RecursiveURLCountRequest):
    """
    Count the number of URLs that can be found through recursive crawling up to specified depth.
    """
    try:
        print(f"🕷️ Counting URLs recursively from: {request.url} (max depth: {request.max_depth})")
        
        # Initialize URL scraper
        scraper = URLScraper()
        
        # Get URLs recursively (without scraping content)
        urls_map = scraper.crawl_urls_recursive(request.url, request.max_depth)
        url_count = len(urls_map)
        
        print(f"✅ Found {url_count} unique URLs through recursive crawling")
        
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

@app.post("/scrape-recursive", response_model=URLScrapeResponse)
def scrape_recursive(request: URLScrapeRequest):
    """
    Recursively scrape a URL and all linked pages up to 3 levels deep.
    """
    try:
        print(f"🕷️ Starting recursive scraping: {request.url}")
        
        # Initialize URL scraper
        scraper = URLScraper()
        
        # Recursively scrape the URL and save to file
        scrape_result = scraper.scrape_recursive_and_save(request.url, max_depth=3, output_file=request.output_file)
        
        if not scrape_result["success"]:
            raise HTTPException(status_code=500, detail=f"Recursive scraping failed: {scrape_result.get('error', 'Unknown error')}")
        
        print(f"✅ Recursive scraping completed. URLs scraped: {scrape_result['urls_scraped']}")
        
        return URLScrapeResponse(
            message=f"Recursive scraping completed. Found {scrape_result.get('total_urls_found', 0)} URLs, scraped {scrape_result['urls_scraped']}",
            success=True,
            urls_scraped=scrape_result["urls_scraped"],
            total_content_length=scrape_result["total_content_length"],
            output_file=request.output_file
        )
        
    except Exception as e:
        print(f"❌ Error in recursive scraping: {e}")
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

@app.post("/scrape-and-update", response_model=URLScrapeResponse)
def scrape_and_update_database(request: URLScrapeRequest):
    """
    Scrape a URL and update the vector database with the scraped content.
    """
    try:
        print(f"🌐 Starting URL scraping: {request.url}")
        
        # Initialize URL scraper
        scraper = URLScraper()
        
        # Scrape the URL and save to file
        scrape_result = scraper.scrape_and_save(request.url, request.output_file)
        
        if not scrape_result["success"]:
            raise HTTPException(status_code=500, detail=f"Scraping failed: {scrape_result.get('error', 'Unknown error')}")
        
        print(f"✅ Scraping completed. URLs scraped: {scrape_result['urls_scraped']}")
        
        # Now rebuild the database with the scraped data
        print("🔄 Rebuilding database with scraped content...")
        embedder_instance = embedder.Embedder()
        vectorstore = embedder_instance.rebuild_database(request.output_file)
        
        # Get database info
        info = embedder_instance.get_database_info()
        
        print("✅ Database updated successfully!")
        
        return URLScrapeResponse(
            message="URL scraped and database updated successfully",
            success=True,
            urls_scraped=scrape_result["urls_scraped"],
            total_content_length=scrape_result["total_content_length"],
            output_file=request.output_file
        )
        
    except Exception as e:
        print(f"❌ Error in scrape_and_update_database: {e}")
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

@app.post("/scrape-recursive-and-update", response_model=URLScrapeResponse)
def scrape_recursive_and_update_database(request: URLScrapeRequest):
    """
    Recursively scrape a URL and all linked pages up to 3 levels deep, then update the database.
    """
    try:
        print(f"🕷️ Starting recursive scraping and database update: {request.url}")
        
        # Initialize URL scraper
        scraper = URLScraper()
        
        # Recursively scrape the URL and save to file
        scrape_result = scraper.scrape_recursive_and_save(request.url, max_depth=3, output_file=request.output_file)
        
        if not scrape_result["success"]:
            raise HTTPException(status_code=500, detail=f"Recursive scraping failed: {scrape_result.get('error', 'Unknown error')}")
        
        print(f"✅ Recursive scraping completed. URLs scraped: {scrape_result['urls_scraped']}")
        
        # Now rebuild the database with the scraped data
        print("🔄 Rebuilding database with scraped content...")
        embedder_instance = embedder.Embedder()
        vectorstore = embedder_instance.rebuild_database(request.output_file)
        
        # Get database info
        info = embedder_instance.get_database_info()
        
        print("✅ Database updated successfully!")
        
        return URLScrapeResponse(
            message=f"Recursive scraping and database update completed. Found {scrape_result.get('total_urls_found', 0)} URLs, scraped {scrape_result['urls_scraped']}",
            success=True,
            urls_scraped=scrape_result["urls_scraped"],
            total_content_length=scrape_result["total_content_length"],
            output_file=request.output_file
        )
        
    except Exception as e:
        print(f"❌ Error in recursive scraping and update: {e}")
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

@app.post("/rebuild-database", response_model=DatabaseResponse)
def rebuild_database():
    """
    Rebuild the vector database using the Embedder class
    """
    try:
        print("🔄 Rebuilding database using Embedder class...")
        
        # Create embedder instance and rebuild database
        embedder_instance = embedder.Embedder()
        vectorstore = embedder_instance.rebuild_database()
        
        # Get database info
        info = embedder_instance.get_database_info()
        
        print("✅ Database rebuilt successfully!")
        print(f"📊 Database info: {info}")
        
        return DatabaseResponse(
            message=f"Database rebuilt successfully. Total documents: {info.get('total_documents', 0)}",
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
        embedder_instance = embedder.Embedder()
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

@app.post("/crawl-stats", response_model=RecursiveURLStatsResponse)
def get_crawl_stats(request: RecursiveURLStatsRequest):
    """
    Get detailed statistics about the recursive crawling process including skipped URLs.
    """
    try:
        print(f"🕷️ Getting crawling stats for: {request.url} (max depth: {request.max_depth})")
        
        # Initialize URL scraper
        scraper = URLScraper()
        
        # Get detailed crawling stats
        stats = scraper.crawl_urls_recursive_with_stats(request.url, request.max_depth)
        
        print(f"✅ Crawling stats retrieved. Total URLs found: {stats.get('total_urls_found', 0)}")
        
        return RecursiveURLStatsResponse(
            url=request.url,
            max_depth=request.max_depth,
            total_urls_found=stats.get('total_urls_found', 0),
            total_urls_crawled=stats.get('total_urls_crawled', 0),
            total_urls_skipped=stats.get('total_urls_skipped', 0),
            total_urls_failed=stats.get('total_urls_failed', 0),
            success=True,
            message=f"Retrieved crawling stats for {request.url} (depth: {request.max_depth})"
        )
        
    except Exception as e:
        print(f"❌ Error getting crawling stats: {e}")
        return RecursiveURLStatsResponse(
            url=request.url,
            max_depth=request.max_depth,
            total_urls_found=0,
            total_urls_crawled=0,
            total_urls_skipped=0,
            total_urls_failed=0,
            success=False,
            message=f"Error getting crawling stats: {str(e)}"
        )

@app.get("/conversation", response_model=ConversationResponse)
def get_conversation():
    history = memory.load_memory_variables({})["history"]
    total_tokens = memory.llm.get_num_tokens_from_messages(history)
    return ConversationResponse(
        messages=history,
        total_tokens=total_tokens,
        max_tokens=memory.max_token_limit
    )

@app.delete("/conversation", response_model=ClearConversationResponse)
def clear_conversation():
    memory.clear()
    return ClearConversationResponse(message="Conversation cleared") 