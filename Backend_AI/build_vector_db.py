from src import embedder

def main():
    print("🔄 Starting database rebuild...")
    
    # Use the embedder instance to rebuild the database
    embedder_instance = embedder.Embedder()
    
    # Rebuild the database
    vectorstore = embedder_instance.rebuild_database()
    
    # Get database info
    info = embedder_instance.get_database_info()
    print(f"📊 Database info: {info}")
    
    print("✅ Vector database rebuilt successfully!")

if __name__ == "__main__":
    main() 