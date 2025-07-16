import os
from dotenv import load_dotenv
from langchain_community.document_loaders import TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_chroma import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
# REMOVE: from src.models_configuration import get_llm, get_llm_embedder

load_dotenv()

class Embedder:
    def __init__(self, model_name="gpt-3.5-turbo"):
        """Initialize the embedder with API key and models."""
        self.google_api_key = os.getenv("GOOGLE_API_KEY")
        if not self.google_api_key:
            raise ValueError("GOOGLE_API_KEY not found in environment variables.")
        
        # Initialize embedding model
        self.embeddings = GoogleGenerativeAIEmbeddings(
            model="models/embedding-001", 
            google_api_key=self.google_api_key
        )
        
        # Initialize LLM using the centralized configuration
        temperature = 0.5
        google_api_key = os.getenv("GOOGLE_API_KEY")
        if not google_api_key:
            raise ValueError("GOOGLE_API_KEY not found in environment variables.")
        self.llm = ChatGoogleGenerativeAI(
            model="gemini-2.5-pro",
            temperature=temperature,
            google_api_key=google_api_key
        )
        # Default settings
        self.chunk_size = 1000
        self.chunk_overlap = 200
        self.persist_directory = "chroma_db"
    
    def load_data(self, filepath="data_distinct.txt"):
        """Load data from a text file."""
        print(f"📄 Loading data from: {filepath}")
        loader = TextLoader(filepath, encoding="utf-8")
        data = loader.load()
        print(f"✅ Loaded {len(data)} documents")
        return data
    
    def load_data_from_json(self, filepath="scraped_data.json"):
        """Load data from a JSON file with scraped content."""
        print(f"📄 Loading data from JSON: {filepath}")
        try:
            import json
            with open(filepath, 'r', encoding='utf-8') as f:
                json_data = json.load(f)
            
            # Extract content from JSON structure
            documents = []
            if 'scraped_content' in json_data:
                for item in json_data['scraped_content']:
                    if 'url' in item and 'content' in item:
                        # Create a document with URL as metadata and content as text
                        from langchain_core.documents import Document
                        doc = Document(
                            page_content=item['content'],
                            metadata={'url': item['url']}
                        )
                        documents.append(doc)
            
            print(f"✅ Loaded {len(documents)} documents from JSON")
            return documents
        except Exception as e:
            print(f"❌ Error loading JSON data: {e}")
            return []
    
    def chunk_data(self, data, chunk_size=None, chunk_overlap=None):
        """Split data into chunks."""
        if chunk_size is None:
            chunk_size = self.chunk_size
        if chunk_overlap is None:
            chunk_overlap = self.chunk_overlap
            
        print(f"✂️ Chunking data with size={chunk_size}, overlap={chunk_overlap}")
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size, 
            chunk_overlap=chunk_overlap
        )
        docs = text_splitter.split_documents(data)
        print(f"✅ Created {len(docs)} chunks")
        return docs
    
    def create_and_save_embeddings(self, docs, persist_directory=None):
        """Create embeddings and save to vector database."""
        if persist_directory is None:
            persist_directory = self.persist_directory
            
        print(f"💾 Creating embeddings and saving to: {persist_directory}")
        vectorstore = Chroma.from_documents(
            docs, 
            self.embeddings, 
            persist_directory=persist_directory
        )
        print("✅ Vector database created and saved!")
        return vectorstore
    
    def load_vectorstore(self, persist_directory=None):
        """Load existing vector database."""
        if persist_directory is None:
            persist_directory = self.persist_directory
            
        print(f"📂 Loading vector database from: {persist_directory}")
        return Chroma(
            persist_directory=persist_directory, 
            embedding_function=self.embeddings
        )
    
    def retrieve_chunks(self, query, k=10, persist_directory=None):
        """Retrieve relevant chunks for a query."""
        if persist_directory is None:
            persist_directory = self.persist_directory
            
        vectorstore = self.load_vectorstore(persist_directory)
        retriever = vectorstore.as_retriever(
            search_type="similarity", 
            search_kwargs={"k": k}
        )
        return retriever.get_relevant_documents(query)
    
    def retrain(self, filepath="scraped_data.json", chunk_size=1200, chunk_overlap=200):
        """Retrain (rebuild) the entire vector database from scratch."""
        print("🔄 Starting database retrain...")
        
        # Check if file is JSON or text
        if filepath.endswith('.json'):
            data = self.load_data_from_json(filepath)
        else:
            data = self.load_data(filepath)
        
        # Chunk data
        docs = self.chunk_data(data, chunk_size, chunk_overlap)
        print(f"✅ Created {len(docs)} chunks")
        # Create and save embeddings
        vectorstore = self.create_and_save_embeddings(docs)
        
        print("✅ Database retrain completed!")
        return vectorstore
    
    def get_database_info(self):
        """Get information about the current vector database."""
        try:
            vectorstore = self.load_vectorstore()
            collection = vectorstore._collection
            count = collection.count()
            
            return {
                "database_path": self.persist_directory,
                "total_documents": count,
                "embedding_model": "models/embedding-001",
                "status": "loaded"
            }
        except Exception as e:
            return {
                "database_path": self.persist_directory,
                "total_documents": 0,
                "embedding_model": "models/embedding-001",
                "status": "error",
                "error": str(e)
            }

# Create a global instance for backward compatibility
embedder = Embedder()

# Expose the main components for backward compatibility
embeddings = embedder.embeddings
llm = embedder.llm

# Expose the main functions for backward compatibility
def load_data(filepath="data_distinct.txt"):
    return embedder.load_data(filepath)

def chunk_data(data, chunk_size=1000, chunk_overlap=200):
    return embedder.chunk_data(data, chunk_size, chunk_overlap)

def create_and_save_embeddings(docs, persist_directory="chroma_db"):
    return embedder.create_and_save_embeddings(docs, persist_directory)

def load_vectorstore(persist_directory="chroma_db"):
    return embedder.load_vectorstore(persist_directory)

def retrieve_chunks(query, k=10, persist_directory="chroma_db"):
    return embedder.retrieve_chunks(query, k, persist_directory)