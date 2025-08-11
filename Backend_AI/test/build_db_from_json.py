# test/build_db_from_json.py

import sys
import os
import json
from langchain_core.documents import Document

# Add the parent directory to the path to import from src
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from src.embedder import Embedder

def build_database_from_json(json_filepath: str):
    """
    Builds a Chroma vector database from the 'context' fields in a JSON file.

    This function ensures that only unique contexts are processed to avoid
    redundant data in the vector store.
    """
    try:
        # --- 1. Load the JSON File ---
        print(f"📄 Loading data from: {json_filepath}")
        with open(json_filepath, 'r', encoding='utf-8') as f:
            # This is the corrected line
            data = json.load(f)

        qa_pairs = data.get("qa_pairs", [])
        if not qa_pairs:
            print("❌ No 'qa_pairs' found in the JSON file.")
            return

        # --- 2. Extract Unique Contexts ---
        # Using a set automatically handles uniqueness
        unique_contexts = {item['context'] for item in qa_pairs if 'context' in item}
        print(f"🔍 Found {len(unique_contexts)} unique contexts to be added to the database.")

        # Convert the unique contexts into LangChain Document objects
        documents = [Document(page_content=context) for context in unique_contexts]

        # --- 3. Use the Embedder to Build the Database ---
        print("🤖 Initializing embedder to build the database...")
        embedder = Embedder()

        # Create a new, timestamped database to not overwrite old ones
        embedder.create_new_database_with_timestamp()

        # Chunk the documents
        print(f"🔪 Chunking {len(documents)} documents...")
        docs = embedder.chunk_data(documents)

        # Create and save the embeddings into the new database
        print("✨ Creating and saving embeddings... (This may take a moment)")
        embedder.create_and_save_embeddings(docs)

        print("\n✅ Database built successfully!")

    except FileNotFoundError:
        print(f"❌ Error: The file was not found at {json_filepath}")
    except Exception as e:
        print(f"❌ An unexpected error occurred: {str(e)}")

def main():
    """
    Main function to run the database building process.
    """
    # --- This is the section you will edit ---

    # Specify the JSON file you want to use to build the database
    json_file_to_use = "squad_2000_samples.json"

    # --- End of edit section ---

    # Construct the full path to the file within the 'test' directory
    test_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(test_dir, json_file_to_use)

    build_database_from_json(file_path)


if __name__ == "__main__":
    main()