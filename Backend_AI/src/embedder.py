import os
from dotenv import load_dotenv
from langchain_community.document_loaders import TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_chroma import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from src.models_configuration import get_llm, get_llm_embedder # Import your functions

# REMOVE: from src.models_configuration import get_llm, get_llm_embedder

load_dotenv()

class Embedder:
    def __init__(self, model_name="gpt-3.5-turbo"):
        """Initialize the embedder with API key and models."""
        self.google_api_key = os.getenv("GOOGLE_API_KEY")
        if not self.google_api_key:
            raise ValueError("GOOGLE_API_KEY not found in environment variables.")
        
        # Initialize embedding model
        self.embeddings = get_llm_embedder()
        
        # Initialize LLM using the centralized configuration
        temperature = 0.5
        google_api_key = os.getenv("GOOGLE_API_KEY")
        if not google_api_key:
            raise ValueError("GOOGLE_API_KEY not found in environment variables.")
        self.llm = get_llm()
        # Default settings
        self.chunk_size = 2000
        self.chunk_overlap = 200
        self.persist_directory = self.get_current_database_path()
    
    def get_current_database_path(self):
        """Read the current database path from current_db.txt file."""
        current_db_file = "Data/current_db.txt"
        
        try:
            if os.path.exists(current_db_file):
                with open(current_db_file, 'r', encoding='utf-8') as f:
                    path = f.read().strip()
                    if path and os.path.exists(path):
                        print(f"📂 Using database from file: {path}")
                        return path
                    else:
                        print(f"⚠️ Database path in file doesn't exist: {path}")
            else:
                print(f"ℹ️ No current_db.txt found, using default path")
        except Exception as e:
            print(f"⚠️ Error reading current_db.txt: {e}")
        
        # Default fallback
        default_path = "Data/chroma_db"
        print(f"📂 Using default database path: {default_path}")
        return default_path
    
    def save_current_database_path(self, path):
        """Save the current database path to current_db.txt file."""
        current_db_file = "Data/current_db.txt"
        
        try:
            # Ensure Data directory exists
            os.makedirs("Data", exist_ok=True)
            
            with open(current_db_file, 'w', encoding='utf-8') as f:
                f.write(path)
            print(f"💾 Saved current database path: {path}")
            return True
        except Exception as e:
            print(f"❌ Error saving database path: {e}")
            return False
    
    def create_new_database_with_timestamp(self):
        """Create a new database with timestamp and update the current_db.txt file."""
        import time
        
        # Generate timestamp
        timestamp = int(time.time())
        new_db_path = f"Data/chroma_db_{timestamp}"
        
        # Ensure Data directory exists
        os.makedirs("Data", exist_ok=True)
        
        print(f"🆕 Creating new database: {new_db_path}")
        
        # Update persist directory
        self.persist_directory = new_db_path
        
        # Save to current_db.txt
        self.save_current_database_path(new_db_path)
        
        return new_db_path
    
    def load_data(self, filepath="scraped_homepage.json"):
        """Load data from a text file."""
        print(f"📄 Loading data from: {filepath}")
        loader = TextLoader(filepath, encoding="utf-8")
        data = loader.load()
        print(f"✅ Loaded {len(data)} documents")
        return data
    
    def load_data_from_json(self, filepath="scraped_homepage.json"):
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
        print(f"✅ Created {len(docs)} chunks===============================================")
        print(docs)
        return docs
    
    def switch_to_new_database(self):
        """Switch to the newly created database."""
        if hasattr(self, 'current_database_path'):
            # Update the persist directory to use the new database
            old_path = self.persist_directory
            self.persist_directory = self.current_database_path
            
            print(f"🔄 Switched from {old_path} to {self.persist_directory}")
            return True
        else:
            print("⚠️ No new database created yet")
            return False

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
            print(f"✅ Loading vector database from: {persist_directory}")
            
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
        relevant_documents = retriever.get_relevant_documents(query)
        print(f"✅ Retrieved {len(relevant_documents)} relevant documents")
        return relevant_documents
    
    def retrain(self, filepath="scraped_homepage.json", chunk_size=2000, chunk_overlap=200):
        """Retrain (rebuild) the entire vector database from scratch."""
        print("🔄 Starting database retrain...")
        
        # Create new database with timestamp
        new_db_path = self.create_new_database_with_timestamp()
        
        # Check if file is JSON or text
        if filepath.endswith('.json'):
            data = self.load_data_from_json(filepath)
            print(f"✅ Loaded {len(data)} documents from JSON===============================================")
        else:
            data = self.load_data(filepath)
        
        if(data):
            chunk_size = self.chunk_size
            print(f"   📏 =================Chunk size: {chunk_size} characters==================================")
        else:
            print("❌ No data to retrain")
            return None
            
        # Chunk data
        docs = self.chunk_data(data, chunk_size, chunk_overlap)
        print(f"✅ Created {len(docs)} chunks")
        
        # Create and save embeddings to NEW database
        vectorstore = self.create_and_save_embeddings(docs, new_db_path)
        
        print("✅ Database retrain completed!")
        print(f"📂 New database created: {new_db_path}")
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
    
    def clear_collection(self):
        """Clear all documents from the collection but keep the database structure."""
        vectorstore = self.load_vectorstore()
        collection = vectorstore._collection
        collection.delete(where={"all": True})  # Delete all documents
        print(f"🧹 Cleared all documents from collection")