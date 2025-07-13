from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class QuestionRequest(BaseModel):
    question: str = Field(..., description="The question to ask")

class AnswerResponse(BaseModel):
    answer: str = Field(..., description="The AI's response")
    tokens_used: int = Field(..., description="Number of tokens used in this request")
    conversation_length: int = Field(..., description="Current length of conversation history")

class DatabaseResponse(BaseModel):
    message: str = Field(..., description="Response message")
    success: bool = Field(..., description="Whether the operation was successful")

class RetrainRequest(BaseModel):
    chunk_size: int = Field(default=1000, description="Size of text chunks for embedding")
    chunk_overlap: int = Field(default=200, description="Overlap between chunks")

class URLScrapeRequest(BaseModel):
    url: str = Field(..., description="URL to scrape")
    max_depth: int = Field(default=1, description="Maximum depth for recursive scraping")
    output_file: str = Field(default="scraped_data.json", description="Output file for scraped data")

class URLScrapeResponse(BaseModel):
    message: str = Field(..., description="Response message")
    success: bool = Field(..., description="Whether the operation was successful")
    urls_scraped: int = Field(default=0, description="Number of URLs successfully scraped")
    total_content_length: int = Field(default=0, description="Total length of scraped content")
    output_file: str = Field(default="", description="Output file path")

class URLCountRequest(BaseModel):
    url: str = Field(..., description="URL to count links from")

class URLCountResponse(BaseModel):
    url: str = Field(..., description="The URL that was analyzed")
    url_count: int = Field(..., description="Number of URLs found")
    success: bool = Field(..., description="Whether the operation was successful")
    message: str = Field(..., description="Response message")

class RecursiveURLCountRequest(BaseModel):
    url: str = Field(..., description="URL to start recursive crawling from")
    max_depth: int = Field(default=2, description="Maximum depth for recursive crawling")

class RecursiveURLCountResponse(BaseModel):
    url: str = Field(..., description="The URL that was analyzed")
    url_count: int = Field(..., description="Number of URLs found through recursive crawling")
    max_depth: int = Field(..., description="Maximum depth used for crawling")
    success: bool = Field(..., description="Whether the operation was successful")
    message: str = Field(..., description="Response message")

class RecursiveURLStatsRequest(BaseModel):
    url: str = Field(..., description="URL to get statistics for")
    max_depth: int = Field(default=2, description="Maximum depth for recursive crawling")

class RecursiveURLStatsResponse(BaseModel):
    url: str = Field(..., description="The URL that was analyzed")
    total_urls: int = Field(..., description="Total number of URLs found")
    scraped_urls: int = Field(..., description="Number of URLs successfully scraped")
    failed_urls: int = Field(..., description="Number of URLs that failed to scrape")
    max_depth: int = Field(..., description="Maximum depth used for crawling")
    success: bool = Field(..., description="Whether the operation was successful")
    message: str = Field(..., description="Response message")

class ConversationResponse(BaseModel):
    messages: List[Dict[str, str]] = Field(..., description="List of conversation messages")
    total_tokens: int = Field(..., description="Total tokens in conversation")
    max_tokens: int = Field(..., description="Maximum tokens allowed")

class ClearConversationResponse(BaseModel):
    message: str = Field(..., description="Response message") 