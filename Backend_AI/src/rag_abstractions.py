from abc import ABC, abstractmethod
from typing import Optional, Dict, List, AsyncGenerator
from src.rag_chain import get_conversation_aware_response, invoke_llm_with_context, stream_conversation_aware_response
from src.models_configuration import get_llm
from src.embedder import Embedder
import os
import json
import asyncio
from collections import Counter
import httpx

class BaseRAGPipeline(ABC):
    @abstractmethod
    async def answer_question(self, question: str, conversation_history: Optional[Dict] = None) -> str:
        pass

    @abstractmethod
    async def answer_question_stream(self, question: str, conversation_history: Optional[Dict] = None) -> AsyncGenerator[str, None]:
        pass

class DefaultRAGPipeline(BaseRAGPipeline):
    async def answer_question(self, question: str, conversation_history: Optional[Dict] = None) -> str:
        loop = asyncio.get_event_loop()
        return await loop.run_in_executor(None, get_conversation_aware_response, question, conversation_history)

    async def answer_question_stream(self, question: str, conversation_history: Optional[Dict] = None):
        async for chunk in stream_conversation_aware_response(question, conversation_history):
            yield chunk

class QueryTransformRAGPipeline(BaseRAGPipeline):
    def get_multi_query_prompt(self) -> str:
        prompt_path = os.path.join(os.path.dirname(__file__), 'system_prompt.json')
        try:
            with open(prompt_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            return data["multi_query"]
        except (FileNotFoundError, KeyError):
            raise FileNotFoundError(f"'multi_query' prompt not found in {prompt_path}. Please add it to system_prompt.json.")

    def get_synthesize_prompt(self) -> str:
        prompt_path = os.path.join(os.path.dirname(__file__), 'system_prompt.json')
        try:
            with open(prompt_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            return data["synthesize_multi_query"]
        except (FileNotFoundError, KeyError):
            raise FileNotFoundError(f"'synthesize_multi_query' prompt not found in {prompt_path}. Please add it to system_prompt.json.")

    def transform_query(self, question: str) -> List[str]:
        llm = get_llm()
        prompt_template = self.get_multi_query_prompt()
        prompt = prompt_template.format(question=question)
        response = llm.invoke(prompt)
        content = response.content if hasattr(response, 'content') else str(response)
        sub_questions = []
        for line in content.splitlines():
            line = line.strip()
            if line and (line[0].isdigit() and (line[1] == '.' or line[1] == ')')):
                sub_questions.append(line[2:].strip())
            elif line and line[0].isdigit():
                sub_questions.append(line[1:].strip())
        if not sub_questions:
            sub_questions = [content.strip()]
        sub_questions.append(question)
        for q in sub_questions:
            print(q + "-----\n")
        return sub_questions

    async def answer_question(self, question: str, conversation_history: Optional[Dict] = None) -> str:
        sub_questions = self.transform_query(question)
        loop = asyncio.get_event_loop()
        tasks = [loop.run_in_executor(None, get_conversation_aware_response, q, conversation_history) for q in sub_questions]
        answers = await asyncio.gather(*tasks)
        llm = get_llm()
        synth_prompt_template = self.get_synthesize_prompt()
        qa_pairs = "\n".join(f"Q: {q}\nA: {a}" for q, a in zip(sub_questions, answers))
        synth_prompt = synth_prompt_template.format(question=question, qa_pairs=qa_pairs)
        synth_response = llm.invoke(synth_prompt)
        synth_content = synth_response.content if hasattr(synth_response, 'content') else str(synth_response)
        print(synth_content)
        return synth_content

    async def answer_question_stream(self, question: str, conversation_history: Optional[Dict] = None):
        sub_questions = self.transform_query(question)
        loop = asyncio.get_event_loop()
        tasks = [loop.run_in_executor(None, get_conversation_aware_response, q, conversation_history) for q in sub_questions]
        answers = await asyncio.gather(*tasks)
        llm = get_llm()
        synth_prompt_template = self.get_synthesize_prompt()
        qa_pairs = "\n".join(f"Q: {q}\nA: {a}" for q, a in zip(sub_questions, answers))
        synth_prompt = synth_prompt_template.format(question=question, qa_pairs=qa_pairs)
        # Stream the synthesis step if possible
        if hasattr(llm, 'astream'):
            async for chunk in llm.astream(synth_prompt):
                yield getattr(chunk, 'text', str(chunk))
        else:
            synth_response = llm.invoke(synth_prompt)
            synth_content = synth_response.content if hasattr(synth_response, 'content') else str(synth_response)
            yield synth_content

class RAGFusionPipeline(BaseRAGPipeline):
    def get_multi_query_prompt(self) -> str:
        prompt_path = os.path.join(os.path.dirname(__file__), 'system_prompt.json')
        try:
            with open(prompt_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            return data["multi_query"]
        except (FileNotFoundError, KeyError):
            raise FileNotFoundError(f"'multi_query' prompt not found in {prompt_path}. Please add it to system_prompt.json.")

    def get_synthesize_prompt(self) -> str:
        prompt_path = os.path.join(os.path.dirname(__file__), 'system_prompt.json')
        try:
            with open(prompt_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            return data["synthesize_multi_query"]
        except (FileNotFoundError, KeyError):
            raise FileNotFoundError(f"'synthesize_multi_query' prompt not found in {prompt_path}. Please add it to system_prompt.json.")

    def transform_query(self, question: str) -> List[str]:
        llm = get_llm()
        prompt_template = self.get_multi_query_prompt()
        prompt = prompt_template.format(question=question)
        response = llm.invoke(prompt)
        content = response.content if hasattr(response, 'content') else str(response)
        sub_questions = []
        for line in content.splitlines():
            line = line.strip()
            if line and (line[0].isdigit() and (line[1] == '.' or line[1] == ')')):
                sub_questions.append(line[2:].strip())
            elif line and line[0].isdigit():
                sub_questions.append(line[1:].strip())
        if not sub_questions:
            sub_questions = [content.strip()]
        sub_questions.append(question)
        for q in sub_questions:
            print(q + "-----\n")
        return sub_questions

    async def answer_question(self, question: str, conversation_history: Optional[Dict] = None) -> str:
        sub_questions = self.transform_query(question)
        embedder = Embedder()
        loop = asyncio.get_event_loop()
        async def retrieve_docs(sub_q):
            retriever = embedder.load_vectorstore().as_retriever(search_type="similarity", search_kwargs={"k": 1000})
            return await loop.run_in_executor(None, retriever.get_relevant_documents, sub_q)
        tasks = [retrieve_docs(sub_q) for sub_q in sub_questions]
        docs_lists = await asyncio.gather(*tasks)
        all_docs = {}
        for docs in docs_lists:
            for doc in docs:
                content = doc.page_content
                all_docs[content] = all_docs.get(content, 0) + 1
        print(f"====docs len is : {len(all_docs)}====")
        most_common_docs = sorted(all_docs.items(), key=lambda x: x[1], reverse=True)[:15]
        selected_content = "\n".join([doc for doc, _ in most_common_docs])
        final_content = invoke_llm_with_context(selected_content, question, conversation_history)
        return final_content

    async def answer_question_stream(self, question: str, conversation_history: Optional[Dict] = None):
        sub_questions = self.transform_query(question)
        embedder = Embedder()
        loop = asyncio.get_event_loop()
        async def retrieve_docs(sub_q):
            retriever = embedder.load_vectorstore().as_retriever(search_type="similarity", search_kwargs={"k": 1000})
            return await loop.run_in_executor(None, retriever.get_relevant_documents, sub_q)
        tasks = [retrieve_docs(sub_q) for sub_q in sub_questions]
        docs_lists = await asyncio.gather(*tasks)
        all_docs = {}
        for docs in docs_lists:
            for doc in docs:
                content = doc.page_content
                all_docs[content] = all_docs.get(content, 0) + 1
        most_common_docs = sorted(all_docs.items(), key=lambda x: x[1], reverse=True)[:15]
        selected_content = "\n".join([doc for doc, _ in most_common_docs])
        llm = get_llm()
        if hasattr(llm, 'astream'):
            async for chunk in llm.astream(selected_content + f"\n\nQuestion: {question}\n\nAnswer:"):
                yield getattr(chunk, 'text', str(chunk))
        else:
            final_content = invoke_llm_with_context(selected_content, question, conversation_history)
            yield final_content

class IncrementalRAGPipeline(BaseRAGPipeline):
    async def answer_question(self, question: str, conversation_history: Optional[Dict] = None) -> str:
        loop = asyncio.get_event_loop()
        return await loop.run_in_executor(None, self._sync_answer, question, conversation_history)
    def _sync_answer(self, question, conversation_history):
        sub_questions = [question + " (part 1)", question + " (part 2)"]
        partials = [get_conversation_aware_response(q, conversation_history) for q in sub_questions]
        return " ".join(partials) 