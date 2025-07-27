from pydantic import BaseModel, Field

class QuestionRequest(BaseModel):
    question: str

class AnswerResponse(BaseModel):
    answer: str
    tokens_used: int
    conversation_length: int

class DatabaseResponse(BaseModel):
    message: str
    success: bool

class RetrainRequest(BaseModel):
    chunk_size: int = Field(1200, gt=0, le=10000, description="Size of text chunks (1-10000)")
    chunk_overlap: int = Field(200, ge=0, le=5000, description="Overlap between chunks (0-5000)")

class URLScrapeRequest(BaseModel):
    url: str
    output_file: str = "scraped_data.json"
    max_depth: int = Field(3, lt=5, description="Maximum crawl depth (must be less than 5)")

class URLScrapeResponse(BaseModel):
    message: str
    success: bool
    urls_scraped: int
    total_content_length: int
    output_file: str

class URLCountRequest(BaseModel):
    url: str

class URLCountResponse(BaseModel):
    url: str
    url_count: int
    success: bool
    message: str

class RecursiveURLCountRequest(BaseModel):
    url: str
    max_depth: int = 3

class RecursiveURLCountResponse(BaseModel):
    url: str
    url_count: int
    max_depth: int
    success: bool
    message: str

class RecursiveURLStatsRequest(BaseModel):
    url: str
    max_depth: int = 3

class RecursiveURLStatsResponse(BaseModel):
    url: str
    max_depth: int
    total_urls_found: int
    total_urls_crawled: int
    total_urls_skipped: int
    total_urls_failed: int
    success: bool
    message: str

class ConversationResponse(BaseModel):
    messages: list
    total_tokens: int
    max_tokens: int

class ClearConversationResponse(BaseModel):
    message: str 