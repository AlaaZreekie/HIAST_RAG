import os
from typing import Dict, List, Any
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate
from langchain.schema import Document
from src.embedder import Embedder

# Initialize the embedder for similarity search
embedder_instance = Embedder()

def get_conversation_aware_response(question: str, conversation_history: Dict[str, Dict[str, str]]) -> str:
    """
    Generate a conversation-aware response using RAG.
    
    Args:
        question: The user's question
        conversation_history: Dictionary of previous Q&A pairs
        
    Returns:
        Generated response
    """
    try:
        # Get relevant documents from vector database
        relevant_docs = embedder_instance.similarity_search(question, k=4)
        
        # Prepare context from relevant documents
        context = _prepare_context(relevant_docs)
        
        # Prepare conversation history for context
        conversation_context = _prepare_conversation_context(conversation_history)
        
        # Generate response using LLM
        response = _generate_response(question, context, conversation_context)
        
        return response
        
    except Exception as e:
        print(f"❌ Error in RAG chain: {e}")
        return f"I apologize, but I encountered an error while processing your question: {str(e)}"

def _prepare_context(documents: List[Document]) -> str:
    """
    Prepare context from relevant documents.
    
    Args:
        documents: List of relevant documents
        
    Returns:
        Formatted context string
    """
    if not documents:
        return "No relevant information found in the knowledge base."
    
    context_parts = []
    for i, doc in enumerate(documents, 1):
        content = doc.page_content.strip()
        metadata = doc.metadata
        
        # Add source information if available
        source_info = ""
        if 'url' in metadata:
            source_info = f" (Source: {metadata['url']})"
        elif 'title' in metadata:
            source_info = f" (Title: {metadata['title']})"
        
        context_parts.append(f"Document {i}{source_info}:\n{content}\n")
    
    return "\n".join(context_parts)

def _prepare_conversation_context(conversation_history: Dict[str, Dict[str, str]]) -> str:
    """
    Prepare conversation history for context.
    
    Args:
        conversation_history: Dictionary of previous Q&A pairs
        
    Returns:
        Formatted conversation context
    """
    if not conversation_history:
        return ""
    
    # Take the last few conversations for context (to avoid token limits)
    recent_conversations = list(conversation_history.values())[-3:]  # Last 3 Q&A pairs
    
    context_parts = ["Previous conversation:"]
    for qa_pair in recent_conversations:
        context_parts.append(f"User: {qa_pair['user']}")
        context_parts.append(f"Assistant: {qa_pair['assistant']}")
        context_parts.append("")
    
    return "\n".join(context_parts)

def _generate_response(question: str, context: str, conversation_context: str) -> str:
    """
    Generate response using the LLM.
    
    Args:
        question: User's question
        context: Relevant document context
        conversation_context: Previous conversation context
        
    Returns:
        Generated response
    """
    try:
        # Initialize the LLM
        llm = ChatGoogleGenerativeAI(
            model="gemini-pro",
            google_api_key=os.getenv("GOOGLE_API_KEY"),
            temperature=0.7,
            max_output_tokens=2048
        )
        
        # Create the prompt template
        prompt_template = PromptTemplate(
            input_variables=["context", "conversation_context", "question"],
            template="""You are a helpful AI assistant with access to a knowledge base. Use the provided context to answer questions accurately and comprehensively.

{context}

{conversation_context}

Current Question: {question}

Please provide a detailed and accurate answer based on the context provided. If the context doesn't contain enough information to answer the question completely, acknowledge this and provide what information you can. Be conversational and helpful in your response.

Answer:"""
        )
        
        # Format the prompt
        formatted_prompt = prompt_template.format(
            context=context,
            conversation_context=conversation_context,
            question=question
        )
        
        # Generate response
        response = llm.invoke(formatted_prompt)
        
        return response.content
        
    except Exception as e:
        print(f"❌ Error generating response: {e}")
        return f"I apologize, but I encountered an error while generating a response: {str(e)}"

def get_simple_response(question: str) -> str:
    """
    Get a simple response without conversation context (for testing).
    
    Args:
        question: User's question
        
    Returns:
        Generated response
    """
    return get_conversation_aware_response(question, {}) 