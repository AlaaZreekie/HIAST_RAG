import os
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings

def get_llm():
    temperature = 0.5
    google_api_key = os.getenv("GOOGLE_API_KEY")
    if not google_api_key:
        raise ValueError("GOOGLE_API_KEY not found in environment variables.")
    return ChatGoogleGenerativeAI(
        model="gemini-2.5-pro",
        temperature=temperature,
        google_api_key=google_api_key
    ) 

def get_llm_embedder():
    google_api_key = os.getenv("GOOGLE_API_KEY_EMMBEDDER")

    return GoogleGenerativeAIEmbeddings(
            model="models/embedding-001", 
            google_api_key= google_api_key
        )
