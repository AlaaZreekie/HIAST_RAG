import embedder

def main():
    print("Loading data...")
    data = embedder.load_data()  # uses data_distinct.txt by default
    print("Chunking data...")
    docs = embedder.chunk_data(data)
    print(f"Total chunks: {len(docs)}")
    print("Creating embeddings and saving to Chroma DB...")
    embedder.create_and_save_embeddings(docs)
    print("✅ Vector database created and persisted!")

if __name__ == "__main__":
    main() 