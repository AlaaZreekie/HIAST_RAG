import tiktoken
from typing import Dict, Any

class TokenManager:
    def __init__(self, max_tokens: int = 8000, reserved_tokens: int = 1000):
        """
        Initialize TokenManager with token limits.
        
        Args:
            max_tokens: Maximum tokens allowed in conversation
            reserved_tokens: Tokens to reserve for new responses
        """
        self.max_tokens = max_tokens
        self.reserved_tokens = reserved_tokens
        self.encoding = tiktoken.get_encoding("cl100k_base")  # GPT-4 encoding
        
    def count_tokens(self, text: str) -> int:
        """
        Count tokens in a text string.
        
        Args:
            text: Text to count tokens for
            
        Returns:
            Number of tokens
        """
        return len(self.encoding.encode(text))
    
    def count_conversation_tokens_hash(self, conversation_history: Dict[str, Dict[str, str]]) -> int:
        """
        Count total tokens in conversation history (hash map format).
        
        Args:
            conversation_history: Conversation history as hash map
            
        Returns:
            Total token count
        """
        total_tokens = 0
        for qa_pair in conversation_history.values():
            total_tokens += self.count_tokens(qa_pair["user"])
            total_tokens += self.count_tokens(qa_pair["assistant"])
        return total_tokens
    
    def manage_conversation_history_hash(self, conversation_history: Dict[str, Dict[str, str]], 
                                       new_question: str, new_answer: str) -> Dict[str, Dict[str, str]]:
        """
        Manage conversation history size by removing oldest entries if needed.
        
        Args:
            conversation_history: Current conversation history
            new_question: New question being added
            new_answer: New answer being added
            
        Returns:
            Updated conversation history
        """
        # Add new Q&A to history
        question_hash = new_question.lower().strip()
        conversation_history[question_hash] = {
            "user": new_question,
            "assistant": new_answer
        }
        
        # Check if we need to remove old entries
        while self.count_conversation_tokens_hash(conversation_history) > (self.max_tokens - self.reserved_tokens):
            if len(conversation_history) <= 1:
                # Keep at least one entry
                break
                
            # Remove the oldest entry (first key in dict)
            oldest_key = next(iter(conversation_history))
            del conversation_history[oldest_key]
            
        return conversation_history 