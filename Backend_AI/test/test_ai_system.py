"""
AI System Testing Module
Tests the RAG system with loaded datasets
"""

import sys
import os
import json
import time
import asyncio
import requests
from typing import List, Dict, Any, Optional
from datetime import datetime

# Add the parent directory to the path to import from src
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from test.test_dataset_loader import DatasetLoader

class AISystemTester:
    """Test the AI system with various datasets and scenarios"""
    
    def __init__(self, api_base_url: str = "http://localhost:8000"):
        self.api_base_url = api_base_url
        self.dataset_loader = DatasetLoader()
        self.test_results = []
        
    def test_api_connection(self) -> bool:
        """Test if the AI API is running and accessible"""
        try:
            response = requests.get(f"{self.api_base_url}/database-info", timeout=10)
            if response.status_code == 200:
                print("✅ API connection successful")
                return True
            else:
                print(f"❌ API connection failed: {response.status_code}")
                return False
        except requests.exceptions.RequestException as e:
            print(f"❌ API connection error: {str(e)}")
            return False
    
    def test_single_question(self, question: str, expected_answer: str = None) -> Dict[str, Any]:
        """Test a single question against the AI system"""
        try:
            print(f"\n🔍 Testing question: {question[:100]}...")
            
            # Prepare request
            payload = {"question": question}
            
            # Send request to API
            start_time = time.time()
            response = requests.post(
                f"{self.api_base_url}/conversation",
                json=payload,
                timeout=30
            )
            end_time = time.time()
            
            if response.status_code == 200:
                result = response.json()
                ai_answer = result.get("answer", "")
                tokens_used = result.get("tokens_used", 0)
                response_time = end_time - start_time
                
                # Basic evaluation metrics
                evaluation = self._evaluate_answer(ai_answer, expected_answer)
                
                test_result = {
                    "question": question,
                    "ai_answer": ai_answer,
                    "expected_answer": expected_answer,
                    "response_time": response_time,
                    "tokens_used": tokens_used,
                    "evaluation": evaluation,
                    "status": "success"
                }
                
                print(f"   ✅ Response time: {response_time:.2f}s")
                print(f"   📊 Tokens used: {tokens_used}")
                print(f"   🎯 Evaluation score: {evaluation['score']:.2f}")
                
                return test_result
                
            else:
                print(f"   ❌ API error: {response.status_code}")
                return {
                    "question": question,
                    "status": "error",
                    "error": f"API returned {response.status_code}"
                }
                
        except Exception as e:
            print(f"   ❌ Test error: {str(e)}")
            return {
                "question": question,
                "status": "error",
                "error": str(e)
            }
    
    def _evaluate_answer(self, ai_answer: str, expected_answer: str = None) -> Dict[str, Any]:
        """Evaluate the AI answer quality"""
        if not expected_answer:
            return {
                "score": 0.0,
                "metrics": {
                    "length": len(ai_answer),
                    "has_content": bool(ai_answer.strip())
                }
            }
        
        # Simple evaluation metrics
        ai_length = len(ai_answer)
        expected_length = len(expected_answer)
        
        # Length similarity
        length_similarity = min(ai_length, expected_length) / max(ai_length, expected_length) if max(ai_length, expected_length) > 0 else 0
        
        # Keyword overlap (simple)
        ai_words = set(ai_answer.lower().split())
        expected_words = set(expected_answer.lower().split())
        keyword_overlap = len(ai_words.intersection(expected_words)) / len(expected_words) if expected_words else 0
        
        # Combined score
        score = (length_similarity * 0.3) + (keyword_overlap * 0.7)
        
        return {
            "score": score,
            "metrics": {
                "length_similarity": length_similarity,
                "keyword_overlap": keyword_overlap,
                "ai_length": ai_length,
                "expected_length": expected_length
            }
        }
    
    def run_batch_test(self, questions: List[str], expected_answers: List[str] = None, 
                      max_tests: int = 10) -> Dict[str, Any]:
        """Run batch testing on multiple questions"""
        print(f"\n🚀 Starting batch test with {min(len(questions), max_tests)} questions")
        print("=" * 60)
        
        self.test_results = []
        successful_tests = 0
        total_response_time = 0
        total_tokens = 0
        total_score = 0
        
        # Limit number of tests
        test_questions = questions[:max_tests]
        test_expected = expected_answers[:max_tests] if expected_answers else [None] * len(test_questions)
        
        for i, (question, expected) in enumerate(zip(test_questions, test_expected), 1):
            print(f"\n📝 Test {i}/{len(test_questions)}")
            
            result = self.test_single_question(question, expected)
            self.test_results.append(result)
            
            if result["status"] == "success":
                successful_tests += 1
                total_response_time += result["response_time"]
                total_tokens += result["tokens_used"]
                total_score += result["evaluation"]["score"]
            
            # Small delay between requests
            time.sleep(0.5)
        
        # Calculate summary statistics
        avg_response_time = total_response_time / successful_tests if successful_tests > 0 else 0
        avg_tokens = total_tokens / successful_tests if successful_tests > 0 else 0
        avg_score = total_score / successful_tests if successful_tests > 0 else 0
        
        summary = {
            "total_tests": len(test_questions),
            "successful_tests": successful_tests,
            "success_rate": successful_tests / len(test_questions) if test_questions else 0,
            "average_response_time": avg_response_time,
            "average_tokens_used": avg_tokens,
            "average_score": avg_score,
            "test_results": self.test_results
        }
        
        self._print_summary(summary)
        return summary
    
    def _print_summary(self, summary: Dict[str, Any]):
        """Print test summary"""
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        print(f"Total tests: {summary['total_tests']}")
        print(f"Successful: {summary['successful_tests']}")
        print(f"Success rate: {summary['success_rate']:.2%}")
        print(f"Average response time: {summary['average_response_time']:.2f}s")
        print(f"Average tokens used: {summary['average_tokens_used']:.0f}")
        print(f"Average evaluation score: {summary['average_score']:.2f}")
        print("=" * 60)
    
    def save_test_results(self, filename: str = None) -> str:
        """Save test results to JSON file"""
        if not filename:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"test_results_{timestamp}.json"
        
        results_data = {
            "timestamp": datetime.now().isoformat(),
            "api_url": self.api_base_url,
            "test_results": self.test_results
        }
        
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(results_data, f, indent=2, ensure_ascii=False)
        
        print(f"💾 Test results saved to {filename}")
        return filename
    
    def test_different_strategies(self, question: str, strategies: List[str] = None) -> Dict[str, Any]:
        """Test the same question with different RAG strategies"""
        if not strategies:
            strategies = ["default", "query_transform", "fusion"]
        
        print(f"\n🔄 Testing different strategies for: {question[:100]}...")
        
        strategy_results = {}
        
        for strategy in strategies:
            try:
                # Set strategy
                response = requests.post(
                    f"{self.api_base_url}/set-strategy",
                    json={"strategy": strategy},
                    timeout=10
                )
                
                if response.status_code == 200:
                    # Test question with this strategy
                    result = self.test_single_question(question)
                    strategy_results[strategy] = result
                    print(f"   {strategy}: {result['evaluation']['score']:.2f} score")
                else:
                    strategy_results[strategy] = {"status": "error", "error": f"Strategy setting failed: {response.status_code}"}
                    
            except Exception as e:
                strategy_results[strategy] = {"status": "error", "error": str(e)}
        
        return strategy_results


def main():
    """Main testing function"""
    print("🧪 AI System Testing")
    print("=" * 60)
    
    # Initialize tester
    tester = AISystemTester()
    
    # Check API connection
    if not tester.test_api_connection():
        print("❌ Cannot connect to AI API. Make sure the server is running.")
        return
    
    try:
        # Load dataset
        print("\n📚 Loading test dataset...")
        dataset_info = tester.dataset_loader.load_ml_qa_dataset(split="test", max_samples=5)
        
        # Get test questions
        qa_pairs = tester.dataset_loader.get_question_answer_pairs(5)
        questions = [pair["question"] for pair in qa_pairs]
        expected_answers = [pair["expected_answer"] for pair in qa_pairs]
        
        # Run batch test
        summary = tester.run_batch_test(questions, expected_answers, max_tests=5)
        
        # Test different strategies on one question
        if questions:
            strategy_results = tester.test_different_strategies(questions[0])
            print(f"\n🔄 Strategy comparison results saved")
        
        # Save results
        tester.save_test_results()
        
        print("\n✅ Testing completed successfully!")
        
    except Exception as e:
        print(f"❌ Testing failed: {str(e)}")


if __name__ == "__main__":
    main()
