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
        self.chunk_size = self.analyze_chunk_analytics()
        self.chunk_overlap = 200
        self.persist_directory = "Data/chroma_db"
    
    def load_data(self, filepath="scraped_data.json"):
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
    
    def close_vectorstore(self, vectorstore=None):
        """Close vectorstore connections to release file locks."""
        try:
            if vectorstore:
                # Close the client if it exists
                if hasattr(vectorstore, '_client') and vectorstore._client:
                    try:
                        vectorstore._client.close()
                    except:
                        pass
                
                # Try to close the collection's client
                if hasattr(vectorstore, '_collection') and hasattr(vectorstore._collection, '_client'):
                    try:
                        vectorstore._collection._client.close()
                    except:
                        pass
                
                # Force garbage collection to release file handles
                import gc
                gc.collect()
                
                print("✅ Vectorstore connections closed")
        except Exception as e:
            print(f"⚠️ Warning: Could not close vectorstore: {e}")

    def create_new_database(self, persist_directory=None):
        """Create a new vector database with a unique name."""
        if persist_directory is None:
            persist_directory = self.persist_directory
            
        import time
        import os
        
        # Create a unique database name with timestamp
        timestamp = int(time.time())
        new_db_name = f"{persist_directory}_new_{timestamp}"
        
        print(f"🆕 Creating new database: {new_db_name}")
        
        # Store the new database path for later use
        self.current_database_path = new_db_name
        
        return new_db_name

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

    def cleanup_old_database(self, old_persist_directory=None):
        """Clean up the old database directory when safe."""
        if old_persist_directory is None:
            old_persist_directory = "Data/chroma_db"
            
        import os
        import time
        import shutil
        
        print(f"🧹 Cleaning up old database: {old_persist_directory}")
        
        if os.path.exists(old_persist_directory):
            try:
                # Try to rename first (safer than delete)
                backup_name = f"Data/old_{os.path.basename(old_persist_directory)}_{int(time.time())}"
                os.rename(old_persist_directory, backup_name)
                print(f"✅ Old database moved to: {backup_name}")
                print(f"💡 You can manually delete {backup_name} when convenient")
                return True
            except Exception as e:
                print(f"⚠️ Could not move old database: {e}")
                print(f"💡 Old database {old_persist_directory} still exists - delete manually when safe")
                return False
        else:
            print(f"ℹ️ Old database {old_persist_directory} doesn't exist")
            return True

    def clear_database(self, persist_directory=None):
        """Create a new database instead of clearing the old one."""
        print("🔄 Creating new database instead of clearing old one...")
        
        # Create a new database with unique name
        new_db_path = self.create_new_database(persist_directory)
        
        # Switch to the new database
        self.switch_to_new_database()
        
        print(f"✅ New database ready: {new_db_path}")
        print(f"ℹ️ Old database will be cleaned up later")
        
        return new_db_path

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
        
        # FIRST: Clear the existing database
        self.clear_database()
        
        # Check if file is JSON or text
        if filepath.endswith('.json'):
            data = self.load_data_from_json(filepath)
        else:
            data = self.load_data(filepath)
        
        if(data):
            chunk_size = self.analyze_chunk_analytics()
            print(f"   📏 =================Chunk size: {chunk_size} characters")
        else:
            print("❌ No data to retrain")
            return None
        # Chunk data
        docs = self.chunk_data(data, chunk_size, chunk_overlap)
        print(f"✅ Created {len(docs)} chunks")
        # Create and save embeddings (this will create a fresh database)
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
    
    def analyze_chunk_analytics(self, filepath="scraped_data.json"):
        """
        Analyze content statistics from a JSON data file.
        
        Args:
            filepath: Path to the JSON file containing scraped data
            
        Returns:
            Dictionary containing analytics including median content length
        """
        print(f"📊 Analyzing content analytics from: {filepath}")
        
        try:
            import json
            import statistics
            from collections import defaultdict
            
            with open(filepath, 'r', encoding='utf-8') as f:
                json_data = json.load(f)
            
            if 'scraped_content' not in json_data:
                print("❌ No 'scraped_content' key found in JSON file")
                return None
            
            content_lengths = []
            successful_scrapes = 0
            failed_scrapes = 0
            total_content_length = 0
            
            for item in json_data['scraped_content']:
                if 'content' in item and item['content_length']:
                    content_length = item['content_length']
                    content_lengths.append(content_length)
                    total_content_length += content_length
                    successful_scrapes += 1
                else:
                    failed_scrapes += 1
            
            if not content_lengths:
                print("❌ No valid content found in the JSON file")
                return None
            
            # Calculate statistics
            analytics = {
                "file_path": filepath,
                "total_items": len(json_data['scraped_content']),
                "successful_scrapes": successful_scrapes,
                "failed_scrapes": failed_scrapes,
                "success_rate": (successful_scrapes / len(json_data['scraped_content'])) * 100,
                "content_length_stats": {
                    "median": statistics.median(content_lengths),
                    "mean": statistics.mean(content_lengths),
                    "min": min(content_lengths),
                    "max": max(content_lengths),
                    "total_characters": total_content_length,
                    "average_per_item": total_content_length / successful_scrapes if successful_scrapes > 0 else 0
                },
                "content_length_distribution": {
                    "short_content": len([l for l in content_lengths if l < 1000]),
                    "medium_content": len([l for l in content_lengths if 1000 <= l < 5000]),
                    "long_content": len([l for l in content_lengths if l >= 5000])
                }
            }
            
            print(f"✅ Analytics calculated successfully!")
            print(f"   📈 Median content length: {analytics['content_length_stats']['median']} characters")
            print(f"   📊 Mean content length: {analytics['content_length_stats']['mean']:.2f} characters")
            print(f"   📋 Success rate: {analytics['success_rate']:.1f}%")
            
            print(f"   📁 File: {analytics['file_path']}")
            print(f"   📊 Total Items: {analytics['total_items']}")
            print(f"   ✅ Successful Scrapes: {analytics['successful_scrapes']}")
            print(f"   ❌ Failed Scrapes: {analytics['failed_scrapes']}")
            print(f"   📈 Success Rate: {analytics['success_rate']:.1f}%")
                    
            stats = analytics['content_length_stats']
            print(f"\n📏 Content Length Statistics:")
            print(f"   📊 Median: {stats['median']:,} characters")
            print(f"   📈 Mean: {stats['mean']:,.2f} characters")
            print(f"   📉 Min: {stats['min']:,} characters")
            print(f"   📈 Max: {stats['max']:,} characters")
            print(f"   📊 Total Characters: {stats['total_characters']:,}")
            print(f"   📊 Average per Item: {stats['average_per_item']:,.2f}")
                    
            dist = analytics['content_length_distribution']
            print(f"\n📊 Content Distribution:")
            print(f"   📝 Short (< 1K): {dist['short_content']} items")
            print(f"   📄 Medium (1K-5K): {dist['medium_content']} items")
            print(f"   📚 Long (≥ 5K): {dist['long_content']} items")
            chunk_size = (2*analytics['content_length_stats']['median']*analytics['content_length_stats']['min'])/(analytics['content_length_stats']['median']+analytics['content_length_stats']['min'])
            # Round chunk size to the nearest hundred
            chunk_size = round(chunk_size / 100) * 100
            # Validate chunk size bounds
            if chunk_size < 1500:
                chunk_size = 1500
            elif chunk_size > 4000:
                chunk_size = 4000
            print(f"   📏 =================Chunk size: {chunk_size} characters")
            return chunk_size
            
        except FileNotFoundError:
            print(f"❌ File not found: {filepath}")
            return None
        except json.JSONDecodeError as e:
            print(f"❌ Invalid JSON format: {e}")
            return None
        except Exception as e:
            print(f"❌ Error analyzing content: {e}")
            return None
