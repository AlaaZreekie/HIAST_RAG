import streamlit as st
from src.rag_chain import get_conversation_aware_response
from src.token_manager import TokenManager

st.title("💬 RAG Chat Assistant")

# Initialize session state for conversation history (hash map format)
if "conversation_history" not in st.session_state:
    st.session_state.conversation_history = {}

# Initialize token manager
if "token_manager" not in st.session_state:
    st.session_state.token_manager = TokenManager()

# Display chat history
for qa_pair in st.session_state.conversation_history.values():
    # Display user message
    with st.chat_message("user"):
        st.markdown(qa_pair["user"])
    
    # Display assistant message
    with st.chat_message("assistant"):
        st.markdown(qa_pair["assistant"])

# Chat input
if prompt := st.chat_input("Ask me anything..."):
    # Check if this question has already been asked (O(1) lookup)
    question_hash = prompt.lower().strip()
    
    if question_hash in st.session_state.conversation_history:
        # Question already asked, show cached answer
        cached_answer = st.session_state.conversation_history[question_hash]["assistant"]
        
        # Display user message
        with st.chat_message("user"):
            st.markdown(prompt)
        
        # Display cached assistant response
        with st.chat_message("assistant"):
            st.markdown(cached_answer)
            st.info("🔄 This is a cached response from a previous question.")
    else:
        # New question, generate answer
        # Display user message
        with st.chat_message("user"):
            st.markdown(prompt)
        
        # Display assistant response in chat message container
        with st.chat_message("assistant"):
            with st.spinner("Thinking..."):
                # Count input tokens
                input_tokens = st.session_state.token_manager.count_tokens(prompt)
                print(f"🔍 Input tokens: {input_tokens}")
                
                # Get conversation-aware response
                answer = get_conversation_aware_response(prompt, st.session_state.conversation_history)
                
                # Count output tokens
                output_tokens = st.session_state.token_manager.count_tokens(answer)
                total_tokens = input_tokens + output_tokens
                
                # Add to conversation history (O(1) insertion)
                st.session_state.conversation_history[question_hash] = {
                    "user": prompt,
                    "assistant": answer
                }
                
                # Manage conversation history size if needed
                st.session_state.conversation_history = st.session_state.token_manager.manage_conversation_history_hash(
                    st.session_state.conversation_history, prompt, answer
                )
                
                print(f"💬 Output tokens: {output_tokens}")
                print(f"📊 Total tokens for this request: {total_tokens}")
                print(f"❓ Question: {prompt[:100]}{'...' if len(prompt) > 100 else ''}")
                print(f"✅ Answer: {answer[:100]}{'...' if len(answer) > 100 else ''}")
                print(f"📝 Conversation length: {len(st.session_state.conversation_history)}")
                print("-" * 80)
                
                st.markdown(answer)

# Sidebar for additional options
with st.sidebar:
    st.header("Settings")
    
    # Token information
    if st.session_state.conversation_history:
        total_tokens = st.session_state.token_manager.count_conversation_tokens_hash(st.session_state.conversation_history)
        max_tokens = st.session_state.token_manager.max_tokens - st.session_state.token_manager.reserved_tokens
        st.metric("Total Conversation Tokens", f"{total_tokens}/{max_tokens}")
        
        # Show token usage percentage
        usage_percentage = (total_tokens / max_tokens) * 100
        st.progress(usage_percentage / 100)
        st.caption(f"Token usage: {usage_percentage:.1f}%")
        
        # Show conversation stats
        st.metric("Total Q&A Pairs", len(st.session_state.conversation_history))
        
        # Show token breakdown
        with st.expander("Token Breakdown"):
            for i, (question_hash, qa_pair) in enumerate(st.session_state.conversation_history.items()):
                question_tokens = st.session_state.token_manager.count_tokens(qa_pair["user"])
                answer_tokens = st.session_state.token_manager.count_tokens(qa_pair["assistant"])
                st.write(f"Q&A {i+1}: Q={question_tokens} tokens, A={answer_tokens} tokens")
    
    # Clear chat button
    if st.button("Clear Chat"):
        st.session_state.conversation_history = {}
        st.rerun()
    
    # Database info
    st.header("Database Info")
    try:
        from src.embedder import Embedder
        embedder = Embedder()
        db_info = embedder.get_database_info()
        st.write(f"**Status:** {db_info.get('status', 'unknown')}")
        st.write(f"**Documents:** {db_info.get('total_documents', 0)}")
        st.write(f"**Model:** {db_info.get('embedding_model', 'unknown')}")
    except Exception as e:
        st.error(f"Error getting database info: {e}")
