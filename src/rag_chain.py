# NOTE: The system prompt is now loaded from 'system_prompt.txt' in the same directory as this file.
import os
from src.models_configuration import get_llm, get_llm_embedder
from src.token_manager import TokenManager
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from typing import List, Dict
from langchain.memory import ConversationTokenBufferMemory


def get_rag_chain(k=15):
    # Read system prompt from external file
    prompt_path = os.path.join(os.path.dirname(__file__), 'system_prompt.txt')
    try:
        with open(prompt_path, 'r', encoding='utf-8') as f:
            system_prompt = f.read()
    except FileNotFoundError:
        raise FileNotFoundError(f"System prompt file not found at {prompt_path}. Please create 'system_prompt.txt' in the same directory as rag_chain.py.")
    
    llm = get_llm()
    embedder = get_llm_embedder()
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
embedder = get_llm_embedder()


def get_conversation_aware_response(question: str, conversation_history: Dict = None) -> str:
    """
    Get a response that takes into account conversation history and token limits.
    """
    if conversation_history is None:
        conversation_history = {}
    
    rag_chain, token_manager = get_rag_chain()
    
    # Get retriever separately from embedder
    embedder = get_llm_embedder()
    retriever = embedder.load_vectorstore().as_retriever(search_type="similarity", search_kwargs={"k": 15})
    
    # Get relevant documents
    docs = retriever.get_relevant_documents(question)
    context = "\n".join([doc.page_content for doc in docs])
    
    # Count context tokens
    context_tokens = token_manager.count_tokens(context)
    print(f"📚 Context tokens: {context_tokens}")
    
    # Format conversation with token management (using hash map format)
    formatted_prompt = token_manager.format_conversation_for_model_hash(
        conversation_history, question, context
    )
    
    # Count formatted prompt tokens
    prompt_tokens = token_manager.count_tokens(formatted_prompt)
    print(f"📝 Formatted prompt tokens: {prompt_tokens}")
    
    # Use the LLM directly with the formatted prompt
    response = embedder.llm.invoke(formatted_prompt)
    response_content = response.content if hasattr(response, 'content') else str(response)
    
    # Count response tokens
    response_tokens = token_manager.count_tokens(response_content)
    print(f"🤖 Response tokens: {response_tokens}")
    
    return response_content 