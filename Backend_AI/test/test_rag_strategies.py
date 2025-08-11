# test/test_rag_strategies.py

import sys
import os
import json
import time
import asyncio
from typing import List, Dict, Tuple

# --- NEW IMPORTS ---
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from langchain_google_genai import GoogleGenerativeAIEmbeddings

# Add the parent directory to the path to import from src
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from src.rag_abstractions import (
    DefaultRAGPipeline,
    RAGFusionPipeline,
    QueryTransformRAGPipeline
)


def get_embeddings_and_similarity(ai_answer: str, original_answer: str, embedding_model) -> Tuple[float, list, list]:
    """
    Calculates cosine similarity and returns the score and the embeddings.
    """
    # In case one of the answers is an error message or empty
    if not ai_answer or not original_answer:
        return 0.0, [], []

    # Create embeddings for both answers
    embeddings = embedding_model.embed_documents([ai_answer, original_answer])
    ai_embedding = embeddings[0]
    original_embedding = embeddings[1]

    # Calculate the cosine similarity
    ai_vector = np.array(ai_embedding).reshape(1, -1)
    original_vector = np.array(original_embedding).reshape(1, -1)
    score = cosine_similarity(ai_vector, original_vector)[0][0]

    # Return the score and the embeddings as standard Python lists
    return float(score), ai_embedding, original_embedding


async def run_strategy_test(qa_pairs: List[Dict]):
    """
    Tests a list of questions against the three RAG strategies and records performance.
    """
    print("🤖 Initializing embedding model for similarity scoring...")
    google_api_key_embedder = os.getenv("GOOGLE_API_KEY_EMMBEDDER")
    if not google_api_key_embedder:
        raise ValueError("GOOGLE_API_KEY_EMMBEDDER not found in environment variables.")
    embedding_model = GoogleGenerativeAIEmbeddings(model="models/embedding-001", google_api_key=google_api_key_embedder)
    print("✅ Embedding model loaded.")

    strategies = {
        "default": DefaultRAGPipeline(),
        "fusion": RAGFusionPipeline(),
        "query_transform": QueryTransformRAGPipeline()
    }

    results = []
    total_tests = len(qa_pairs) * len(strategies)
    current_test = 0

    print("🚀 Starting RAG Strategy Evaluation...")

    for i, pair in enumerate(qa_pairs):
        question = pair['question']
        original_answer = pair['answer']

        print(f"\n🧪 Testing Question {i+1}/{len(qa_pairs)}: '{question[:50]}...'")

        for strategy_name, pipeline in strategies.items():
            current_test += 1
            print(f"  -> Running strategy '{strategy_name}' ({current_test}/{total_tests})")

            try:
                start_time = time.time()
                ai_answer = await pipeline.answer_question(question)
                end_time = time.time()
                time_taken = round(end_time - start_time, 2)
                
                # Get similarity score AND the embeddings
                similarity, ai_embedding, original_embedding = get_embeddings_and_similarity(
                    ai_answer, original_answer, embedding_model
                )
                print(f"     Done in {time_taken}s with semantic similarity score: {similarity:.2f}")

            except Exception as e:
                print(f"     ❌ ERROR during '{strategy_name}': {e}")
                ai_answer = f"Error during generation: {e}"
                time_taken = 0
                similarity = 0.0
                ai_embedding = []
                original_embedding = []

            # Add the embeddings to the result entry
            result_entry = {
                "question_index": i,
                "question": question,
                "original_answer": original_answer,
                "strategy": strategy_name,
                "ai_answer": ai_answer,
                "similarity_score": round(similarity, 4),
                "time_taken_seconds": time_taken,
            }
            results.append(result_entry)

            print("     ...waiting 12 seconds to avoid rate limiting...")
            time.sleep(12)

    return results


def main():
    """
    Main function to load data, run tests, and save results.
    """
    json_input_file = "squad_2000_samples.json"
    results_output_file = "results.json"
    num_questions_to_test = 5

    test_dir = os.path.dirname(os.path.abspath(__file__))
    input_path = os.path.join(test_dir, json_input_file)
    output_path = os.path.join(test_dir, results_output_file)

    try:
        print(f"📄 Loading data from '{input_path}'...")
        with open(input_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        qa_pairs_to_test = data.get("qa_pairs", [])[:num_questions_to_test]

        if not qa_pairs_to_test:
            print("❌ No Q&A pairs to test. Exiting.")
            return

        test_results = asyncio.run(run_strategy_test(qa_pairs_to_test))

        print(f"\n💾 Saving detailed results to '{output_path}'...")
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(test_results, f, indent=2, ensure_ascii=False)

        print("✅ Evaluation complete!")

    except FileNotFoundError:
        print(f"❌ Error: Input file not found at '{input_path}'. Please run the data loader first.")
    except Exception as e:
        print(f"❌ An unexpected error occurred: {e}")


if __name__ == "__main__":
    main()