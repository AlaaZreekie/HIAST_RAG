#!/usr/bin/env python3
"""
Test Runner Script
Simple script to run all AI system tests
"""

import sys
import os
import argparse
from datetime import datetime

# Add the parent directory to the path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from test.test_dataset_loader import DatasetLoader
from test.test_ai_system import AISystemTester

def run_dataset_test():
    """Run dataset loading test"""
    print("🧪 Running Dataset Loading Test")
    print("=" * 50)
    
    try:
        loader = DatasetLoader()
        dataset_info = loader.load_ml_qa_dataset(split="test", max_samples=10)
        loader.print_dataset_info()
        loader.save_test_data()
        print("✅ Dataset test completed successfully!")
        return True
    except Exception as e:
        print(f"❌ Dataset test failed: {str(e)}")
        return False

def run_ai_system_test(max_tests: int = 5):
    """Run AI system test"""
    print("\n🧪 Running AI System Test")
    print("=" * 50)
    
    try:
        tester = AISystemTester()
        
        # Check API connection
        if not tester.test_api_connection():
            print("❌ Cannot connect to AI API. Make sure the server is running.")
            return False
        
        # Load dataset and run tests
        dataset_info = tester.dataset_loader.load_ml_qa_dataset(split="test", max_samples=max_tests)
        qa_pairs = tester.dataset_loader.get_question_answer_pairs(max_tests)
        
        questions = [pair["question"] for pair in qa_pairs]
        expected_answers = [pair["expected_answer"] for pair in qa_pairs]
        
        summary = tester.run_batch_test(questions, expected_answers, max_tests=max_tests)
        tester.save_test_results()
        
        print("✅ AI system test completed successfully!")
        return True
        
    except Exception as e:
        print(f"❌ AI system test failed: {str(e)}")
        return False

def run_strategy_comparison_test():
    """Run strategy comparison test"""
    print("\n🔄 Running Strategy Comparison Test")
    print("=" * 50)
    
    try:
        tester = AISystemTester()
        
        if not tester.test_api_connection():
            print("❌ Cannot connect to AI API.")
            return False
        
        # Load a single question for strategy comparison
        dataset_info = tester.dataset_loader.load_ml_qa_dataset(split="test", max_samples=1)
        qa_pairs = tester.dataset_loader.get_question_answer_pairs(1)
        
        if qa_pairs:
            question = qa_pairs[0]["question"]
            strategy_results = tester.test_different_strategies(question)
            
            print("\n📊 Strategy Comparison Results:")
            for strategy, result in strategy_results.items():
                if result["status"] == "success":
                    score = result["evaluation"]["score"]
                    print(f"   {strategy}: {score:.2f} score")
                else:
                    print(f"   {strategy}: Error - {result.get('error', 'Unknown error')}")
            
            print("✅ Strategy comparison test completed!")
            return True
        else:
            print("❌ No questions available for strategy comparison")
            return False
            
    except Exception as e:
        print(f"❌ Strategy comparison test failed: {str(e)}")
        return False

def main():
    """Main function"""
    parser = argparse.ArgumentParser(description="Run AI System Tests")
    parser.add_argument("--test", choices=["dataset", "ai", "strategy", "all"], 
                       default="all", help="Which test to run")
    parser.add_argument("--max-tests", type=int, default=5, 
                       help="Maximum number of tests to run")
    parser.add_argument("--api-url", default="http://localhost:8000",
                       help="API base URL")
    
    args = parser.parse_args()
    
    print(f"🚀 Starting AI System Tests - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"API URL: {args.api_url}")
    print(f"Max tests: {args.max_tests}")
    print("=" * 60)
    
    success_count = 0
    total_tests = 0
    
    if args.test in ["dataset", "all"]:
        total_tests += 1
        if run_dataset_test():
            success_count += 1
    
    if args.test in ["ai", "all"]:
        total_tests += 1
        if run_ai_system_test(args.max_tests):
            success_count += 1
    
    if args.test in ["strategy", "all"]:
        total_tests += 1
        if run_strategy_comparison_test():
            success_count += 1
    
    # Final summary
    print("\n" + "=" * 60)
    print("📋 FINAL TEST SUMMARY")
    print("=" * 60)
    print(f"Tests run: {total_tests}")
    print(f"Successful: {success_count}")
    print(f"Failed: {total_tests - success_count}")
    print(f"Success rate: {(success_count/total_tests)*100:.1f}%" if total_tests > 0 else "N/A")
    print("=" * 60)
    
    if success_count == total_tests:
        print("🎉 All tests passed!")
        return 0
    else:
        print("⚠️ Some tests failed. Check the output above for details.")
        return 1

if __name__ == "__main__":
    exit(main())
