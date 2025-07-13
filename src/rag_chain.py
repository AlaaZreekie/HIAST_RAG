from src import embedder
from src.token_manager import TokenManager
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from typing import List, Dict
from langchain.memory import ConversationTokenBufferMemory
from langchain_google_genai import ChatGoogleGenerativeAI

def get_rag_chain(k=15):
    llm = embedder.llm
    retriever = embedder.load_vectorstore().as_retriever(search_type="similarity", search_kwargs={"k": k})
    token_manager = TokenManager()
    
    system_prompt = (
         """**Role:** You are an expert research analyst. Your goal is to provide a trusted, verifiable answer based *only* on the provided text.

            **Context:**
            ---
            {context}
            ---

            **User Question:** {question}

            **Instructions:**
            Follow these steps precisely to generate your response:

            **Step 1: Create a Search Plan**
            First, create a step-by-step plan to find the answer within the context. Identify the key terms and concepts from the user's question that you need to locate in the text.

            **Step 2: Execute the Plan & Extract Key Information**
            Execute your search plan. Read through the context and extract all relevant sentences and data points that address the user's question. For each piece of information, note its source.

            **Step 3: Synthesize the Final Answer**
            Using only the information you extracted, synthesize a comprehensive answer. Adhere strictly to the following output format.

            ---
            **OUTPUT FORMAT:**

            **Plan:**
            1.  [First step of your plan]
            2.  [Second step of your plan]
            3.  ...

            **Answer:**
            [Provide a direct, clear, and concise answer to the user's question here. Synthesize the extracted information into a coherent paragraph.]

            **Key Points & Sources:**
            * [Key finding or data point 1]. [Source: file_name_1.pdf]
            * [Key finding or data point 2]. [Source: file_name_2.pdf]
            * ...

            **Confidence Score:** [High/Medium/Low]
            [Briefly explain your confidence level. For example, "High - The answer was directly stated in multiple sources." or "Low - The answer was inferred from related information, as it was not explicitly mentioned."]
"""
    )
    
    prompt = ChatPromptTemplate.from_messages([
        ("system", system_prompt),
        ("human", "{input}"),
    ])
    question_answer_chain = create_stuff_documents_chain(llm, prompt)
    rag_chain = create_retrieval_chain(retriever, question_answer_chain)
    
    return rag_chain, token_manager

llm = ChatGoogleGenerativeAI(model="gemini-2.5-pro", temperature=0.5, google_api_key="YOUR_API_KEY")


def get_conversation_aware_response(question: str, conversation_history: Dict = None) -> str:
    """
    Get a response that takes into account conversation history and token limits.
    """
    if conversation_history is None:
        conversation_history = {}
    
    rag_chain, token_manager = get_rag_chain()
    
    # Get retriever separately from embedder
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