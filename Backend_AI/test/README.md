# AI System Testing Framework

This directory contains comprehensive testing tools for the AI backend system.

## Files Overview

### 📁 Test Files

- **`test_dataset_loader.py`** - Loads and prepares datasets for testing
- **`test_ai_system.py`** - Tests the AI system with various scenarios
- **`run_tests.py`** - Main test runner script
- **`README.md`** - This documentation file

## 🚀 Quick Start

### 1. Install Dependencies

First, make sure you have the required dependencies:

```bash
pip install -r requirements.txt
```

### 2. Start the AI Server

Make sure your AI backend server is running:

```bash
cd Backend_AI
python main.py
```

### 3. Run Tests

#### Option A: Run All Tests
```bash
python test/run_tests.py
```

#### Option B: Run Specific Tests
```bash
# Test only dataset loading
python test/run_tests.py --test dataset

# Test only AI system
python test/run_tests.py --test ai --max-tests 10

# Test only strategy comparison
python test/run_tests.py --test strategy

# Test with custom API URL
python test/run_tests.py --api-url http://localhost:8000
```

#### Option C: Run Individual Test Files
```bash
# Test dataset loading
python test/test_dataset_loader.py

# Test AI system
python test/test_ai_system.py
```

## 📊 Test Types

### 1. Dataset Loading Test
- Loads the Machine Learning QA dataset
- Extracts question-answer pairs
- Saves test data to JSON file
- Displays dataset information

### 2. AI System Test
- Tests API connectivity
- Runs batch questions through the AI system
- Measures response times and token usage
- Evaluates answer quality
- Compares with expected answers

### 3. Strategy Comparison Test
- Tests the same question with different RAG strategies:
  - `default` - Standard RAG pipeline
  - `query_transform` - Multi-query transformation
  - `fusion` - RAG fusion approach
- Compares performance and quality

## 📈 Metrics Tracked

- **Response Time**: How fast the AI responds
- **Token Usage**: Number of tokens consumed
- **Success Rate**: Percentage of successful API calls
- **Answer Quality**: Evaluation score based on:
  - Length similarity
  - Keyword overlap
  - Content relevance

## 📁 Output Files

The tests generate several output files:

- **`test_qa_data.json`** - Extracted question-answer pairs
- **`test_results_YYYYMMDD_HHMMSS.json`** - Detailed test results
- **Console output** - Real-time test progress and summary

## 🔧 Customization

### Adding New Datasets

To test with different datasets, modify `test_dataset_loader.py`:

```python
# Example: Load a different dataset
def load_custom_dataset(self, dataset_name: str, split: str = "test"):
    self.dataset = load_dataset(dataset_name, split=split)
    # Add custom extraction logic
```

### Custom Evaluation Metrics

To add custom evaluation metrics, modify the `_evaluate_answer` method in `test_ai_system.py`:

```python
def _evaluate_answer(self, ai_answer: str, expected_answer: str = None):
    # Add your custom metrics here
    # Example: BLEU score, semantic similarity, etc.
    pass
```

### Testing Different Scenarios

Create custom test scenarios by extending the `AISystemTester` class:

```python
def test_conversation_context(self):
    """Test conversation history handling"""
    # Your custom test logic
    pass
```

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Failed**
   - Make sure the AI server is running on `http://localhost:8000`
   - Check if the port is correct in the test configuration

2. **Dataset Loading Error**
   - Ensure you have internet connection for downloading datasets
   - Check if the dataset name is correct

3. **Import Errors**
   - Make sure all dependencies are installed
   - Check Python path configuration

### Debug Mode

Run tests with verbose output:

```bash
python test/run_tests.py --max-tests 1
```

## 📝 Example Output

```
🚀 Starting AI System Tests - 2024-01-15 10:30:00
API URL: http://localhost:8000
Max tests: 5
============================================================

🧪 Running Dataset Loading Test
==================================================
🔄 Loading Machine Learning QA dataset (split: test)...
✅ Successfully loaded 5 samples
📊 Extracted 5 Q&A pairs
💾 Test data saved to test_qa_data.json
✅ Dataset test completed successfully!

🧪 Running AI System Test
==================================================
✅ API connection successful
📚 Loading test dataset...
🔄 Loading Machine Learning QA dataset (split: test)...
✅ Successfully loaded 5 samples
📊 Extracted 5 Q&A pairs

🚀 Starting batch test with 5 questions
============================================================

📝 Test 1/5
🔍 Testing question: What is machine learning?...
   ✅ Response time: 2.34s
   📊 Tokens used: 150
   🎯 Evaluation score: 0.85

...

📊 TEST SUMMARY
============================================================
Total tests: 5
Successful: 5
Success rate: 100.0%
Average response time: 2.45s
Average tokens used: 145
Average evaluation score: 0.82
============================================================

✅ AI system test completed successfully!
💾 Test results saved to test_results_20240115_103000.json

📋 FINAL TEST SUMMARY
============================================================
Tests run: 3
Successful: 3
Failed: 0
Success rate: 100.0%
============================================================
🎉 All tests passed!
```

## 🤝 Contributing

To add new test features:

1. Create new test methods in existing classes
2. Add new test files for specific functionality
3. Update the main runner script
4. Document new features in this README

## 📚 Additional Resources

- [Hugging Face Datasets](https://huggingface.co/docs/datasets/) - Dataset loading documentation
- [FastAPI Testing](https://fastapi.tiangolo.com/tutorial/testing/) - API testing best practices
- [RAG Evaluation](https://python.langchain.com/docs/use_cases/question_answering/evaluation) - RAG system evaluation
