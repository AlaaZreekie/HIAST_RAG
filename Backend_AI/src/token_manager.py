import tiktoken
from typing import List, Dict, Tuple

class TokenManager:
    def __init__(self, model_name="gpt-3.5-turbo"):
        """Initialize token manager with encoding for the specified model."""
        self.encoding = tiktoken.encoding_for_model(model_name)
        self.max_tokens = 30000  # Gemini Pro limit
        self.reserved_tokens = 2000  # Reserve for system prompt and response
    
    def count_tokens(self, text: str) -> int:
        """Count tokens in a text string."""
        return len(self.encoding.encode(text))
    
    def count_conversation_tokens(self, messages: List[Dict]) -> int:
        """Count total tokens in conversation history (legacy list format)."""
        total_tokens = 0
        for message in messages:
            # Count tokens for role + content
            role_content = f"{message['role']}: {message['content']}"
            total_tokens += self.count_tokens(role_content)
        return total_tokens
    
    def count_conversation_tokens_hash(self, conversation_history: Dict) -> int:
        """Count total tokens in conversation history (hash map format)."""
        total_tokens = 0
        for question_hash, qa_pair in conversation_history.items():
            # Count tokens for user question and assistant answer
            user_tokens = self.count_tokens(f"user: {qa_pair['user']}")
            assistant_tokens = self.count_tokens(f"assistant: {qa_pair['assistant']}")
            total_tokens += user_tokens + assistant_tokens
        return total_tokens
    
    def manage_conversation_history_hash(self, conversation_history: Dict, new_question: str, new_answer: str) -> Dict:
        """
        Manage conversation history by removing old entries when token limits are exceeded.
        Returns the updated conversation history.
        """
        # Calculate total tokens
        total_tokens = self.count_conversation_tokens_hash(conversation_history)
        max_conversation_tokens = self.max_tokens - self.reserved_tokens
        
        print(f"📊 Total conversation tokens: {total_tokens}")
        print(f"📊 Max conversation tokens: {max_conversation_tokens}")
        
        # Remove old entries if we exceed the limit
        while total_tokens > max_conversation_tokens and len(conversation_history) > 1:
            # Remove the oldest entry (first key in the dictionary)
            oldest_key = next(iter(conversation_history))
            oldest_entry = conversation_history.pop(oldest_key)
            
            removed_tokens = (self.count_tokens(f"user: {oldest_entry['user']}") + 
                             self.count_tokens(f"assistant: {oldest_entry['assistant']}"))
            total_tokens -= removed_tokens
            
            print(f"🗑️ Removed old conversation entry. New total: {total_tokens} tokens")
        
        return conversation_history
    
    def format_conversation_for_model_hash(self, conversation_history: Dict, question: str, context: str) -> str:
        """
        Format the conversation, question, and context for the model using hash map format.
        Ensures we stay within token limits.
        """
        # Convert hash map to list format for compatibility with existing logic
        messages_list = []
        for qa_pair in conversation_history.values():
            messages_list.append({"role": "user", "content": qa_pair["user"]})
            messages_list.append({"role": "assistant", "content": qa_pair["assistant"]})
        
        # Use existing truncation logic
        truncated_messages = self.truncate_conversation(messages_list, question, context)
        
        # Format conversation history
        conversation_text = ""
        for message in truncated_messages:
            conversation_text += f"{message['role'].title()}: {message['content']}\n\n"
        
        # Add current question and context
        full_prompt = f"{conversation_text}Context: {context}\n\nUser: {question}\n\nAssistant:"
        
        return full_prompt
    
    def manage_conversation_history(self, conversation_history: List[Dict], new_question: str, new_answer: str) -> List[Dict]:
        """
        Manage conversation history by removing old messages when token limits are exceeded.
        Returns the updated conversation history.
        """
        # Add new messages to history
        updated_history = conversation_history.copy()
        updated_history.append({"role": "user", "content": new_question})
        updated_history.append({"role": "assistant", "content": new_answer})
        
        # Calculate total tokens
        total_tokens = self.count_conversation_tokens(updated_history)
        max_conversation_tokens = self.max_tokens - self.reserved_tokens
        
        print(f"📊 Total conversation tokens: {total_tokens}")
        print(f"📊 Max conversation tokens: {max_conversation_tokens}")
        
        # Remove old messages if we exceed the limit
        while total_tokens > max_conversation_tokens and len(updated_history) > 2:
            # Remove the oldest user-assistant pair (keep at least the current exchange)
            removed_user = updated_history.pop(0)
            removed_assistant = updated_history.pop(0)
            
            removed_tokens = (self.count_tokens(f"user: {removed_user['content']}") + 
                             self.count_tokens(f"assistant: {removed_assistant['content']}"))
            total_tokens -= removed_tokens
            
            print(f"🗑️ Removed old messages. New total: {total_tokens} tokens")
        
        return updated_history
    
    def truncate_conversation(self, messages: List[Dict], question: str, context: str) -> List[Dict]:
        """
        Truncate conversation history to fit within token limits.
        Returns the conversation that can fit within limits.
        """
        # Calculate tokens for current question and context
        question_tokens = self.count_tokens(question)
        context_tokens = self.count_tokens(context)
        
        # Available tokens for conversation history
        available_tokens = self.max_tokens - self.reserved_tokens - question_tokens - context_tokens
        
        if available_tokens <= 0:
            # If even question + context exceed limits, return empty conversation
            return []
        
        # Start from most recent messages and work backwards
        selected_messages = []
        current_tokens = 0
        
        for message in reversed(messages):
            message_tokens = self.count_tokens(f"{message['role']}: {message['content']}")
            
            if current_tokens + message_tokens <= available_tokens:
                selected_messages.insert(0, message)  # Add to beginning to maintain order
                current_tokens += message_tokens
            else:
                break
        
        return selected_messages
    
    def format_conversation_for_model(self, messages: List[Dict], question: str, context: str) -> str:
        """
        Format the conversation, question, and context for the model.
        Ensures we stay within token limits.
        """
        # Truncate conversation if needed
        truncated_messages = self.truncate_conversation(messages, question, context)
        
        # Format conversation history
        conversation_text = ""
        for message in truncated_messages:
            conversation_text += f"{message['role'].title()}: {message['content']}\n\n"
        
        # Add current question and context
        full_prompt = f"{conversation_text}Context: {context}\n\nUser: {question}\n\nAssistant:"
        
        return full_prompt 