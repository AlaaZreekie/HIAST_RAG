import os
import json
from typing import List, Dict, Any, Optional
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma
from langchain.schema import Document

class Embedder:
    def __init__(self, db_path: str = "chroma_db", embedding_model: str = "sentence-transformers/all-MiniLM-L6-v2"):
        """
        Initialize the Embedder class.
        
        Args:
            db_path: Path to the Chroma database
            embedding_model: HuggingFace embedding model name
        """
        self.db_path = db_path
        self.embedding_model = embedding_model
        self.embeddings = HuggingFaceEmbeddings(model_name=embedding_model)
        self.vectorstore = None
        self._load_or_create_vectorstore()
        
    def _load_or_create_vectorstore(self):
        """Load existing vectorstore or create a new one."""
        if os.path.exists(self.db_path):
            try:
                self.vectorstore = Chroma(
                    persist_directory=self.db_path,
                    embedding_function=self.embeddings
                )
                print(f"✅ Loaded existing vectorstore from {self.db_path}")
            except Exception as e:
                print(f"❌ Error loading vectorstore: {e}")
                self.vectorstore = None
        else:
            print(f"📁 Creating new vectorstore at {self.db_path}")
            self.vectorstore = None
    
    def _load_documents_from_json(self, file_path: str) -> List[Document]:
        """
        Load documents from a JSON file.
        
        Args:
            file_path: Path to the JSON file
            
        Returns:
            List of Document objects
        """
        documents = []
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                
            if isinstance(data, list):
                # Handle list of documents
                for item in data:
                    if isinstance(item, dict):
                        content = item.get('content', '')
                        metadata = item.get('metadata', {})
                        documents.append(Document(page_content=content, metadata=metadata))
            elif isinstance(data, dict):
                # Handle single document or structured data
                if 'documents' in data:
                    for doc in data['documents']:
                        content = doc.get('content', '')
                        metadata = doc.get('metadata', {})
                        documents.append(Document(page_content=content, metadata=metadata))
                else:
                    # Treat as single document
                    content = data.get('content', '')
                    metadata = data.get('metadata', {})
                    documents.append(Document(page_content=content, metadata=metadata))
                    
        except Exception as e:
            print(f"❌ Error loading documents from {file_path}: {e}")
            
        return documents
    
    def _split_documents(self, documents: List[Document], chunk_size: int = 1000, chunk_overlap: int = 200) -> List[Document]:
        """
        Split documents into chunks.
        
        Args:
            documents: List of Document objects
            chunk_size: Size of each chunk
            chunk_overlap: Overlap between chunks
            
        Returns:
            List of chunked Document objects
        """
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap,
            length_function=len,
            separators=["\n\n", "\n", " ", ""]
        )
        
        split_docs = []
        for doc in documents:
            splits = text_splitter.split_documents([doc])
            split_docs.extend(splits)
            
        return split_docs
    
    def retrain(self, data_file: Optional[str] = None, chunk_size: int = 1000, chunk_overlap: int = 200):
        """
        Retrain the vector database with new data.
        
        Args:
            data_file: Path to the data file (JSON format)
            chunk_size: Size of text chunks
            chunk_overlap: Overlap between chunks
        """
        try:
            print(f"🔄 Starting database retraining...")
            print(f"📁 Data file: {data_file}")
            print(f"✂️ Chunk size: {chunk_size}")
            print(f"🔄 Chunk overlap: {chunk_overlap}")
            
            # Load documents
            if data_file and os.path.exists(data_file):
                documents = self._load_documents_from_json(data_file)
                print(f"📄 Loaded {len(documents)} documents from {data_file}")
            else:
                print(f"⚠️ No valid data file provided, using empty documents")
                documents = []
            
            # Split documents into chunks
            if documents:
                split_docs = self._split_documents(documents, chunk_size, chunk_overlap)
                print(f"✂️ Split into {len(split_docs)} chunks")
            else:
                split_docs = []
                print("⚠️ No documents to process")
            
            # Create or update vectorstore
            if split_docs:
                # Remove existing database if it exists
                if os.path.exists(self.db_path):
                    import shutil
                    shutil.rmtree(self.db_path)
                    print(f"🗑️ Removed existing database at {self.db_path}")
                
                # Create new vectorstore
                self.vectorstore = Chroma.from_documents(
                    documents=split_docs,
                    embedding=self.embeddings,
                    persist_directory=self.db_path
                )
                self.vectorstore.persist()
                print(f"✅ Created new vectorstore with {len(split_docs)} chunks")
            else:
                print("⚠️ No documents to add to vectorstore")
                
        except Exception as e:
            print(f"❌ Error during retraining: {e}")
            raise
    
    def similarity_search(self, query: str, k: int = 4) -> List[Document]:
        """
        Perform similarity search on the vector database.
        
        Args:
            query: Search query
            k: Number of results to return
            
        Returns:
            List of similar documents
        """
        if self.vectorstore is None:
            print("⚠️ No vectorstore available")
            return []
            
        try:
            results = self.vectorstore.similarity_search(query, k=k)
            return results
        except Exception as e:
            print(f"❌ Error during similarity search: {e}")
            return []
    
    def get_database_info(self) -> Dict[str, Any]:
        """
        Get information about the current vector database.
        
        Returns:
            Dictionary with database information
        """
        info = {
            "database_path": self.db_path,
            "embedding_model": self.embedding_model,
            "status": "unknown"
        }
        
        try:
            if self.vectorstore is not None:
                # Get collection info
                collection = self.vectorstore._collection
                if collection:
                    count = collection.count()
                    info["total_documents"] = count
                    info["status"] = "loaded"
                else:
                    info["total_documents"] = 0
                    info["status"] = "empty"
            else:
                info["total_documents"] = 0
                info["status"] = "not_loaded"
                
        except Exception as e:
            info["total_documents"] = 0
            info["status"] = "error"
            info["error"] = str(e)
            
        return info 