import os
from dotenv import load_dotenv
from langchain_community.document_loaders import TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_chroma import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI

load_dotenv()
google_api_key = os.getenv("GOOGLE_API_KEY")
if not google_api_key:
    raise ValueError("GOOGLE_API_KEY not found in environment variables.")

# --- Embedding Model ---
embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001", google_api_key=google_api_key)

# --- LLM (optional, for RAG/chat) ---
llm = ChatGoogleGenerativeAI(model="gemini-2.5-pro", temperature=0.5, google_api_key=google_api_key)

# --- Functions ---
def load_data(filepath="data_distinct.txt"):
    loader = TextLoader(filepath, encoding="utf-8")
    return loader.load()

def chunk_data(data, chunk_size=780000, chunk_overlap=0):
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=chunk_size, chunk_overlap=chunk_overlap)
    return text_splitter.split_documents(data)

def create_and_save_embeddings(docs, persist_directory="chroma_db"):
    vectorstore = Chroma.from_documents(docs, embeddings, persist_directory=persist_directory)
    return vectorstore

def load_vectorstore(persist_directory="chroma_db"):
    return Chroma(persist_directory=persist_directory, embedding_function=embeddings)

def retrieve_chunks(query, k=10, persist_directory="chroma_db"):
    vectorstore = load_vectorstore(persist_directory)
    retriever = vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": k})
    return retriever.get_relevant_documents(query)