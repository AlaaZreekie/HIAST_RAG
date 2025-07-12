from fastapi import FastAPI
from pydantic import BaseModel
from src.rag_chain import get_rag_chain

app = FastAPI(title="RAG QA API", description="Ask questions and get answers using RAG and Gemini Pro.")

rag_chain = get_rag_chain()

class QuestionRequest(BaseModel):
    question: str

class AnswerResponse(BaseModel):
    answer: str

@app.post("/ask", response_model=AnswerResponse)
def ask_question(request: QuestionRequest):
    response = rag_chain.invoke({"input": request.question})
    answer = response["answer"] if isinstance(response, dict) and "answer" in response else response
    return {"answer": answer} 