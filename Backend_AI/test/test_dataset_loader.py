"""
Test Dataset Loader for AI System Testing
Loads a specified Q&A dataset from the Hugging Face Hub.
"""

import sys
import os
import json
from typing import List, Dict, Any
from datasets import load_dataset

# Add the parent directory to the path to import from src
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

class DatasetLoader:
    """Loads and prepares datasets for AI system testing"""

    def __init__(self):
        self.dataset = None
        self.qa_pairs = []

    def load_dataset_from_hub(self, dataset_name: str, split: str = "train", max_samples: int = None) -> Dict[str, Any]:
        """
        Load any specified dataset from the Hugging Face Hub.

        Args:
            dataset_name: The Hugging Face ID of the dataset (e.g., "squad").
            split: The dataset split to load (e.g., 'train', 'validation').
            max_samples: Maximum number of samples to load (None for all).

        Returns:
            Dictionary containing dataset information.
        """
        try:
            print(f"🔄 Loading '{dataset_name}' dataset (split: {split})...")
            self.dataset = load_dataset(dataset_name, split=split)

            if max_samples and len(self.dataset) > max_samples:
                self.dataset = self.dataset.select(range(max_samples))

            print(f"✅ Successfully loaded {len(self.dataset)} samples")
            self._extract_qa_pairs()

            return {
                "dataset_name": dataset_name,
                "total_samples": len(self.dataset),
                "qa_pairs": self.qa_pairs,
            }

        except Exception as e:
            print(f"❌ Error loading dataset '{dataset_name}': {str(e)}")
            raise

    def _extract_qa_pairs(self):
        """
        Dynamically extracts questions and answers from various known formats.
        """
        print("🔍 Extracting Q&A pairs...")
        for item in self.dataset:
            # For 'squad' format
            if 'context' in item and 'question' in item and 'answers' in item:
                answer_text = item['answers']['text'][0] if item['answers']['text'] else "N/A"
                self.qa_pairs.append({
                    "context": item['context'],
                    "question": item['question'],
                    "answer": answer_text
                })
            # For 'prsdm/Machine-Learning-QA-dataset' format
            elif 'Question' in item and 'Answer' in item:
                 self.qa_pairs.append({
                    "question": item['Question'],
                    "answer": item['Answer']
                })
            # Add other formats as needed
            else:
                print(f"⚠️ Skipping item with unknown format: {list(item.keys())}")
                continue
        
        print(f"📊 Extracted {len(self.qa_pairs)} Q&A pairs")


    def save_test_data(self, filename: str):
        """Save the extracted Q&A pairs to a JSON file."""
        try:
            test_dir = os.path.dirname(os.path.abspath(__file__))
            file_path = os.path.join(test_dir, filename)

            test_data = {
                "qa_pairs": self.qa_pairs,
                "total_pairs": len(self.qa_pairs)
            }

            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(test_data, f, indent=2, ensure_ascii=False)

            print(f"💾 Q&A data saved to {file_path}")
            return file_path

        except Exception as e:
            print(f"❌ Error saving test data: {str(e)}")
            raise


def main():
    """Main function to load a dataset and save it to JSON."""
    
    # --- This is the section you will edit ---
    
    # ** Example 1: Load 2000 samples from the SQuAD dataset **
    dataset_to_load = "squad"
    num_samples = 2000
    output_filename = "squad_2000_samples.json"
    
    # ** Example 2: Load 50 samples from the original ML dataset **
    # dataset_to_load = "prsdm/Machine-Learning-QA-dataset"
    # num_samples = 50
    # output_filename = "ml_qa_50_samples.json"

    # --- End of edit section ---
    
    
    print(f"📚 Loading '{dataset_to_load}' and saving to '{output_filename}'...")
    loader = DatasetLoader()
    
    try:
        loader.load_dataset_from_hub(
            dataset_name=dataset_to_load,
            split="train", 
            max_samples=num_samples
        )
        loader.save_test_data(output_filename)
        print("✅ Done!")
        
    except Exception as e:
        print(f"❌ An error occurred: {str(e)}")


if __name__ == "__main__":
    main()