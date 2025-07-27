import streamlit as st
from src.rag_chain import get_conversation_aware_response
from src.token_manager import TokenManager

st.title("💬 RAG Chat Assistant")

# Initialize session state for conversation history
if "messages" not in st.session_state:
    st.session_state.messages = []

# Initialize token manager
if "token_manager" not in st.session_state:
    st.session_state.token_manager = TokenManager()

# Display chat history
for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

# Chat input
if prompt := st.chat_input("Ask me anything..."):
    # Add user message to chat history
    st.session_state.messages.append({"role": "user", "content": prompt})
    
    # Display user message in chat message container
    with st.chat_message("user"):
        st.markdown(prompt)
    
    # Display assistant response in chat message container
    with st.chat_message("assistant"):
        with st.spinner("Thinking..."):
            # Count input tokens
            input_tokens = st.session_state.token_manager.count_tokens(prompt)
            print(f"🔍 Input tokens: {input_tokens}")
            
            # Get conversation-aware response
            answer = get_conversation_aware_response(prompt, st.session_state.messages[:-1])  # Exclude current question
            
            # Count output tokens
            output_tokens = st.session_state.token_manager.count_tokens(answer)
            total_tokens = input_tokens + output_tokens
            
            # Manage conversation history (add new messages and remove old ones if needed)
            st.session_state.messages = st.session_state.token_manager.manage_conversation_history(
                st.session_state.messages[:-1], prompt, answer
            )
            
            print(f"💬 Output tokens: {output_tokens}")
            print(f"📊 Total tokens for this request: {total_tokens}")
            print(f"❓ Question: {prompt[:100]}{'...' if len(prompt) > 100 else ''}")
            print(f"✅ Answer: {answer[:100]}{'...' if len(answer) > 100 else ''}")
            print(f"📝 Conversation length: {len(st.session_state.messages)}")
            print("-" * 80)
            
            st.markdown(answer)

# Sidebar for additional options
with st.sidebar:
    st.header("Settings")
    
    # Token information
    if st.session_state.messages:
        total_tokens = st.session_state.token_manager.count_conversation_tokens(st.session_state.messages)
        max_tokens = st.session_state.token_manager.max_tokens - st.session_state.token_manager.reserved_tokens
        st.metric("Total Conversation Tokens", f"{total_tokens}/{max_tokens}")
        
        # Show token usage percentage
        usage_percentage = (total_tokens / max_tokens) * 100
        st.progress(usage_percentage / 100)
        st.caption(f"Token usage: {usage_percentage:.1f}%")
        
        # Show token breakdown
        with st.expander("Token Breakdown"):
            for i, message in enumerate(st.session_state.messages):
                tokens = st.session_state.token_manager.count_tokens(f"{message['role']}: {message['content']}")
                st.write(f"{message['role'].title()} {i+1}: {tokens} tokens")
    
    # Option to show sources
    show_sources = st.checkbox("Show sources for last answer")
    
    # Clear chat button
    if st.button("Clear Chat"):
        st.session_state.messages = []
        st.rerun()
    
    # Display sources if requested and there are messages
    if show_sources and st.session_state.messages:
        st.header("Sources for Last Answer")
        if st.session_state.messages and st.session_state.messages[-1]["role"] == "assistant":
            # Get the retriever from the rag_chain to fetch documents
            from src.rag_chain import get_rag_chain
            rag_chain, _ = get_rag_chain()
            retriever = rag_chain.retriever
            # Use the last user question to get sources
            last_user_message = None
            for msg in reversed(st.session_state.messages):
                if msg["role"] == "user":
                    last_user_message = msg["content"]
                    break
            
            if last_user_message:
                docs = retriever.get_relevant_documents(last_user_message)
                for i, doc in enumerate(docs, 1):
                    st.markdown(f"**Source {i}:** {doc.metadata.get('source', 'N/A')}")
                    st.write(doc.page_content[:300] + ('...' if len(doc.page_content) > 300 else ''))
                    st.divider()
