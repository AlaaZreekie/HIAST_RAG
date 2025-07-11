import streamlit as st
import embedder
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate

st.title("Flexible Website Scraper, Retriever, and Chatbot")

# --- RAG Chain Setup ---
llm = embedder.llm
retriever = embedder.load_vectorstore().as_retriever(search_type="similarity", search_kwargs={"k": 10})

system_prompt = (
    "You are an expert assistant for question-answering tasks. "
    "Use the following pieces of retrieved context to answer the user's question. "
    "If you don't know the answer, say you don't know. "
    "If the question is not related to the context, say you don't know. "
    "Cite sources using [source] notation when possible. "
    "Synthesize information from multiple sources if relevant. "
    "Format your answer in clear, concise sentences (max 12 sentences). "
    "If the context does not contain enough information, do not make up an answer."
    "\n\n"
    "{context}"
)

prompt = ChatPromptTemplate.from_messages(
    [
        ("system", system_prompt),
        ("human", "{input}"),
    ]
)
question_answer_chain = create_stuff_documents_chain(llm, prompt)
rag_chain = create_retrieval_chain(retriever, question_answer_chain)

# --- Streamlit UI ---
show_sources = st.checkbox("Show retrieved context and sources")
question = st.text_input("Ask a question:")
if question:
    st.write(f"You asked: {question}")
    with st.spinner("Retrieving and generating answer..."):
        response = rag_chain.invoke({"input": question})
        st.markdown("**Answer:**")
        st.write(response["answer"] if isinstance(response, dict) and "answer" in response else response)
        if show_sources:
            st.markdown("**Retrieved Context:**")
            # If your chain returns context, display it; otherwise, fetch from retriever
            docs = retriever.get_relevant_documents(question)
            for i, doc in enumerate(docs, 1):
                st.markdown(f"**Source {i}:** {doc.metadata.get('source', 'N/A')}")
                st.write(doc.page_content[:500] + ('...' if len(doc.page_content) > 500 else ''))
