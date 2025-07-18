# NOTE: The system prompt is now loaded from 'system_prompt.json' in the same directory as this file.
import os
import json
from src.models_configuration import get_llm
from src.embedder import Embedder
from src.token_manager import TokenManager
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from typing import List, Dict
from langchain.memory import ConversationTokenBufferMemory

def get_rag_chain(k=15):
    # Read system prompt from JSON file
    prompt_path = os.path.join(os.path.dirname(__file__), 'system_prompt.json')
    try:
        with open(prompt_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        system_prompt = data["system"]
    except (FileNotFoundError, KeyError):
        raise FileNotFoundError(f"'system' prompt not found in {prompt_path}. Please add it to system_prompt.json.")

    llm = get_llm()
    embedder = Embedder()
    retriever = embedder.load_vectorstore().as_retriever(search_type="similarity", search_kwargs={"k": k})
    token_manager = TokenManager()
    
    prompt = ChatPromptTemplate.from_messages([
        ("system", system_prompt),
        ("human", "{input}"),
    ])
    question_answer_chain = create_stuff_documents_chain(llm, prompt)
    rag_chain = create_retrieval_chain(retriever, question_answer_chain)
    
    return rag_chain, token_manager

llm = get_llm()
embedder = Embedder()

def get_conversation_aware_response(question: str, conversation_history: Dict = None) -> str:
    """
    Get a response that takes into account conversation history and token limits.
    """
    if conversation_history is None:
        conversation_history = {}
    
    rag_chain, token_manager = get_rag_chain()
    
    # Get retriever separately from embedder
    embedder = Embedder()
    retriever = embedder.load_vectorstore().as_retriever(search_type="similarity", search_kwargs={"k": 15})
    
    # Get relevant documents
    docs = retriever.get_relevant_documents(question)
    context = "\n".join([doc.page_content for doc in docs])
    
    # Count context tokens
    context_tokens = token_manager.count_tokens(context)
    print(f"\U0001F4DA Context tokens: {context_tokens}")
    
    # Format conversation with token management (using hash map format)
    formatted_prompt = token_manager.format_conversation_for_model_hash(
        conversation_history, question, context
    )
    
    # Count formatted prompt tokens
    prompt_tokens = token_manager.count_tokens(formatted_prompt)
    print(f"\U0001F4DD Formatted prompt tokens: {prompt_tokens}")
    
    # Use the LLM directly with the formatted prompt
    response = embedder.llm.invoke(formatted_prompt)
    response_content = response.content if hasattr(response, 'content') else str(response)
    
    # Count response tokens
    response_tokens = token_manager.count_tokens(response_content)
    print(f"\U0001F916 Response tokens: {response_tokens}")
    
    return response_content 

async def stream_conversation_aware_response(question: str, conversation_history: Dict = None):
    """
    Async generator that streams the LLM's output token by token for a given question and conversation history.
    """
    if conversation_history is None:
        conversation_history = {}
    rag_chain, token_manager = get_rag_chain()
    embedder = Embedder()
    retriever = embedder.load_vectorstore().as_retriever(search_type="similarity", search_kwargs={"k": 15})
    docs = retriever.get_relevant_documents(question)
    context = "\n".join([doc.page_content for doc in docs])
    formatted_prompt = token_manager.format_conversation_for_model_hash(
        conversation_history, question, context
    )
    # Use the LLM's async streaming method
    async for chunk in embedder.llm.astream(formatted_prompt):
        # chunk.text or chunk.content depending on the LLM
        yield getattr(chunk, 'text', str(chunk))

def invoke_llm_with_context(context, question, conversation_history=None):
    """
    Generate an answer using the LLM, given a context, question, and optional conversation history.
    Mirrors get_conversation_aware_response, but uses the provided context.
    """
    from src.models_configuration import get_llm
    from src.embedder import Embedder
    from src.token_manager import TokenManager
    llm = get_llm()
    token_manager = TokenManager()
    if conversation_history is None:
        conversation_history = {}

    # Count context tokens
    context_tokens = token_manager.count_tokens(context)
    print(f"\U0001F4DA Context tokens: {context_tokens}")

    # Format conversation with token management (using hash map format)
    formatted_prompt = token_manager.format_conversation_for_model_hash(
        conversation_history, question, context
    )

    # Count formatted prompt tokens
    prompt_tokens = token_manager.count_tokens(formatted_prompt)
    print(f"\U0001F4DD Formatted prompt tokens: {prompt_tokens}")

    # Use the LLM directly with the formatted prompt
    response = llm.invoke(formatted_prompt)
    response_content = response.content if hasattr(response, 'content') else str(response)

    # Count response tokens
    response_tokens = token_manager.count_tokens(response_content)
    print(f"\U0001F916 Response tokens: {response_tokens}")

    return response_content 