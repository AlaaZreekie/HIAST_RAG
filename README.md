# AI Platform Monorepo

This repository contains three separate projects:

- **Backend_AI/**: Backend for AI-powered services and APIs.
- **Backend_Web/**: Backend for the web application (C# .NET 8.0, Clean Architecture).
- **Fronend_Web/**: Frontend web application (e.g., React, Vue, or other frameworks).

Each project is self-contained with its own dependencies, README, and .gitignore file.

## Structure

```
.
├── Backend_AI/
├── Backend_Web/
├── Fronend_Web/
├── README.md
└── .gitignore
```

## Getting Started

1. Navigate to the desired project folder.
2. Follow the setup instructions in that project's `README.md` (or see below for detailed instructions).

---

## Project Details

### Backend_AI - HIAST_RAG Conversational RAG API

A FastAPI-based conversational Retrieval-Augmented Generation (RAG) system that provides intelligent question-answering capabilities with conversation memory.

#### Features

- 🤖 **Conversational AI**: Ask questions and get context-aware responses
- 💾 **Conversation Memory**: Remembers previous questions and answers
- 🌐 **Web Scraping**: Recursively scrape URLs and extract content
- 🔍 **Vector Database**: Efficient document retrieval using ChromaDB
- 📊 **Token Management**: Smart conversation history management
- 🚀 **FastAPI**: Modern, fast web API with automatic documentation

#### Quick Start

**Installation:**

1. Clone the repository:
```bash
git clone <your-repo-url>
cd HIAST_RAG
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up environment variables:
```bash
# Create .env file with your API keys
GOOGLE_API_KEY=your_google_api_key_here
```

**Running the Application:**

Start the FastAPI server:
```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

#### API Endpoints

**Core Conversation:**
- `POST /conversation` - Ask a question and get an answer
- `GET /conversation` - Get current conversation history
- `DELETE /conversation` - Clear conversation history

**Data Management:**
- `POST /data/scrape-url` - Scrape a single URL
- `POST /data/scrape-recursive-and-update` - Recursively scrape URLs and update database
- `POST /data/count-urls-recursive` - Count URLs found through recursive crawling
- `POST /data/retrain` - Rebuild the vector database

**Database Info:**
- `GET /database-info` - Get information about the current vector database

#### Project Structure

```
HIAST_RAG/
├── main.py              # FastAPI application
├── app.py               # Additional application logic
├── build_vector_db.py   # Database building script
├── src/
│   ├── embedder.py      # Vector database management
│   ├── rag_chain.py     # RAG conversation chain
│   ├── models.py        # Pydantic models
│   ├── url_scraper.py   # Web scraping functionality
│   └── token_manager.py # Token counting and management
├── requirements.txt      # Python dependencies
└── README.md           # This file
```


#### Design Patterns Implemented

**Strategy Pattern for RAG Pipelines:**
The system implements a Strategy pattern for different RAG (Retrieval-Augmented Generation) approaches:

- **DefaultRAGPipeline**: Standard RAG with single query processing
- **QueryTransformRAGPipeline**: Multi-query transformation approach
- **RAGFusionPipeline**: Fusion-based retrieval with document ranking

Each strategy implements the `BaseRAGPipeline` abstract class with:
- `answer_question()`: Synchronous question answering

**Strategy Selection:**
- Use `/set-strategy` endpoint to switch between strategies
- Available strategies: `default`, `query_transform`, `fusion`
- Strategy instances are managed globally and can be switched at runtime

#### Libraries and Dependencies

**Core AI/ML Libraries:**
- `langchain`: Core LLM framework and abstractions
- `langchain-google-genai`: Google Generative AI integration
- `google-generativeai`: Direct Google AI SDK
- `langchain-community`: Community extensions
- `langchain_experimental`: Experimental features

**Vector Database & Embeddings:**
- `chromadb`: Vector database for document storage
- `langchain-chroma`: ChromaDB integration for LangChain
- `sentence-transformers`: Text embedding models
- `faiss-cpu`: Vector similarity search

**Text Processing:**
- `langchain-text-splitters`: Document chunking utilities
- `tiktoken`: Token counting and management
- `pypdf`: PDF document processing
- `unstructured`: Document parsing and extraction

**Web Scraping:**
- `beautifulsoup4`: HTML parsing and web scraping
- `requests`: HTTP client for web requests

**API Framework:**
- `fastapi`: Modern Python web framework
- `uvicorn`: ASGI server for FastAPI
- `pydantic`: Data validation and serialization

**Development & Utilities:**
- `python-dotenv`: Environment variable management
- `streamlit`: Optional web interface (for development)
---

### Backend_Web - Clean Architecture .NET 8.0 API

The `Backend_Web` project follows Clean Architecture principles with four main layers:

#### Project Structure

```
Backend_Web/
├── Domain/                          # Core business logic and entities
│   ├── Entity/                      # Entity classes (e.g., Program, Specialization, Language, etc.)
│   ├── Enum/                        # Business enums (e.g., DegreeTypeEnum, LanguageCodeEnum)
│   ├── Common/                      # Base classes, shared domain logic
│   └── ...                          # Other domain-specific files
│
├── Application/                     # Application services, DTOs, MediatR commands/queries
│   ├── DependencyInjection.cs       # Registers AutoMapper, MediatR, and custom mappers
│   ├── Dtos/                        # Data Transfer Objects for input/output
│   │   ├── BookDtos/                # BookDto, CreateBookDto, etc.
│   │   ├── ProgramDtos/             # ProgramDto, CreateProgramDto, etc.
│   │   ├── ...                      # Other entity DTOs
│   ├── Feature/                     # MediatR commands and queries (CQRS)
│   │   ├── Books/                   # Book CRUD and filter commands/queries
│   │   ├── Programs/                # Program CRUD and filter commands/queries
│   │   ├── ...                      # Other entity features
│   ├── IServices/                   # Service interfaces (used by controllers)
│   │   ├── IBookService.cs          # Book service contract
│   │   ├── IProgramService.cs       # Program service contract
│   │   ├── ...                      # Other service interfaces
│   ├── IUnitOfWork/                 # Unit of Work pattern interfaces
│   ├── IRepository/                 # Repository pattern interfaces
│   ├── Mapper/                      # AutoMapper profiles for DTO <-> Entity
│   ├── ResultResponse/              # API response models (e.g., ApiResponse)
│   │   └── ApiResponse.cs           # Standard API response wrapper
│   └── Serializer/                  # JSON serialization helpers
│
├── Infrastructure/                  # Data access and external services
│   ├── Context/                     # Entity Framework DbContext
│   ├── Services/                    # Service implementations (business logic)
│   │   ├── BookService.cs           # Implements IBookService
│   │   ├── ProgramService.cs        # Implements IProgramService
│   │   ├── ...                      # Other service implementations
│   ├── Repository/                  # Repository implementations
│   ├── UnitOfWork/                  # Unit of Work implementation
│   ├── Migrations/                  # Database migrations
│   └── Seeder/                      # Data seeding logic
│   ├── Extension/                   # Utility extensions for EF 
│   │   └── IncludeAllExtension.cs   # Eager-load all navigation properties
│   ├── DependencyInjection.cs      # Registers all services, repositories,unit of work, DbContext, etc.
├── Presentation/                    # Web API controllers, middleware, and areas
│   ├── Controllers/                 # Base controllers and authentication endpoints
│   │   ├── BaseGuestController.cs           # Base for User area controllers (public, read-only)
│   │   ├── BaseAuthenticatedController.cs   # Base for Admin area controllers (admin, CRUD)
│   │   └── AuthenticationController.cs      # Handles login, register, logout, user info
│   │
│   ├── Areas/
│   │   ├── Admin/                    # Admin-only endpoints (full CRUD, management)
│   │   │   ├── BookController.cs
│   │   │   ├── ProgramController.cs
│   │   │   ├── CoursesController.cs
│   │   │   ├── ... (all admin entity controllers)
│   │   │
│   │   └── User/                     # Public endpoints (read-only, browsing/filtering)
│   │       ├── BooksController.cs
│   │       ├── ProgramsController.cs
│   │       ├── CoursesController.cs
│   │       └── ... (other public entity controllers)
│   ├── DependencyInjection.cs      # Registers controllers, authentication, Swagger, etc.
│   ├── Middleware/                   # Custom middleware (e.g., error handling )
│   └── wwwroot/                      # Static files (images, PDFs, etc.)
│
└── ArchitectureTests/               # Architecture validation tests
    ├── BaseTest.cs                  # Base test class with assembly references
    ├── UnitTest1.cs                 # Basic unit test placeholder
    ├── Layers/                      # Layer-specific architecture tests
    │   └── LayerTests.cs            # Clean Architecture dependency validation tests
    └── ArchitectureTests.csproj     # Test project configuration
```

#### Controller & API Patterns

**Base Controllers:**
- **BaseGuestController**: Used by all User area controllers. Injects `IAuthenticationService` and `IJsonFieldsSerializer` for consistent response formatting and (optional) user context.
- **BaseAuthenticatedController**: Used by all Admin area controllers. Adds `[Authorize]` and exposes current user info.

**Authentication:**
- **AuthenticationController**: Handles registration, login, logout, and user info. Inherits from `BaseGuestController`.

**Area: User (Public API):**
- **Purpose**: Exposes only read (getter/filter) endpoints for public browsing.

- **Pattern**:
  - Inherit from `BaseGuestController`
  - Inject the corresponding service, `IAuthenticationService`, and `IJsonFieldsSerializer`
  - Expose only:
    - `GetAll<Entity>s` (e.g., `GetAllBooks`)
    - `GetByFilter` (e.g., `GetByFilter` with filter DTO)
  - Use consistent API response:
    ```csharp
    var apiResponse = new ApiResponse(true, "Message", StatusCodes.Status200OK, result);
    return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    ```

**Area: Admin (Admin API):**
- **Purpose**: Exposes full CRUD and management endpoints for admins.

- **Pattern**:
  - Inherit from `BaseAuthenticatedController`
  - Inject the corresponding service, `IAuthenticationService`, and `IJsonFieldsSerializer`
  - Expose full CRUD endpoints (Create, Update, Delete, GetAll, GetByFilter, AddTranslation, etc.)
  - Use consistent API response (see above)
  - All endpoints are `[Authorize(Roles = Admin)]`

**API Response Pattern:**
- All endpoints return a consistent JSON response using `ApiResponse` and `RawJsonActionResult`:
  ```json
  {
    "result": true,
    "message": "...",
    "code": 200,
    "data": [ ... ]
  }
  ```

#### Key Patterns Used

- **Clean Architecture**: Separation of concerns across layers
- **CQRS**: Commands and Queries for different operations
- **MediatR**: Mediator pattern for request handling
- **Repository Pattern**: Data access abstraction
- **Unit of Work**: Transaction management
- **AutoMapper**: Object mapping between layers
- **Areas**: Route separation for admin vs. public APIs
- **Consistent API Response**: All endpoints use `ApiResponse` and `RawJsonActionResult`

#### Setup Instructions

**Key dependencies:**
- ASP.NET Core
- Entity Framework Core (SQL Server)
- JWT Authentication
- AutoMapper
- Swagger (API documentation)

**Configuration:**
- Edit `Backend_Web/Presentation/appsettings.json` for database connection and JWT settings.

**How to run:**
1. Open a terminal and navigate to `Backend_Web/Presentation`
2. Restore dependencies: `dotnet restore`
3. Build the project: `dotnet build`
4. Run the project: `dotnet run`
5. Access Swagger UI at `https://localhost:<port>/swagger` for API exploration

**Note:** Ensure SQL Server is running and accessible as per the connection string in `appsettings.json`.

#### NuGet Packages and Dependencies

**Core Framework:**
- `Microsoft.NET.Sdk.Web` (Presentation): ASP.NET Core web application SDK
- `Microsoft.NET.Sdk` (Other projects): Standard .NET SDK for class libraries

**Object Mapping & Mediation:**
- `AutoMapper` (v14.0.0): Object-to-object mapping library for DTO transformations
- `MediatR` (v13.0.0): Mediator pattern implementation for CQRS commands and queries

**Authentication & Authorization:**
- `Microsoft.AspNetCore.Authentication.JwtBearer` (v8.0.18): JWT token-based authentication middleware
- `Microsoft.AspNetCore.Identity` (v2.3.1): ASP.NET Core Identity framework for user management
- `Microsoft.AspNetCore.Identity.EntityFrameworkCore` (v8.0.18): Entity Framework integration for Identity

**Database & ORM:**
- `Microsoft.EntityFrameworkCore` (v8.0.18): Core Entity Framework ORM framework
- `Microsoft.EntityFrameworkCore.SqlServer` (v8.0.18): SQL Server database provider for EF Core
- `Microsoft.EntityFrameworkCore.Design` (v8.0.18): EF Core design-time tools for migrations
- `Microsoft.EntityFrameworkCore.Tools` (v8.0.18): EF Core command-line tools (Add-Migration, Update-Database)

**API Documentation:**
- `Swashbuckle.AspNetCore` (v6.6.2): Swagger/OpenAPI documentation generator for ASP.NET Core

**Development Tools:**
- `Microsoft.VisualStudio.Web.CodeGeneration.Design` (v8.0.7): Code generation tools for scaffolding controllers and views
- `Microsoft.AspNetCore.Mvc.Core` (v2.3.0): Core MVC framework components

**JSON Serialization:**
- `Newtonsoft.Json` (v13.0.3): Advanced JSON serialization library with custom serialization support

**Testing Framework:**
- `xUnit` (v2.5.3): Primary testing framework for unit tests
- `NetArchTest.Rules` (v1.3.1): Architecture testing library for dependency validation
- `Shouldly` (v4.2.1): Assertion library for readable test assertions
- `Microsoft.NET.Test.Sdk` (v17.8.0): Test discovery and execution
- `coverlet.collector` (v6.0.0): Code coverage collection

#### Testing Framework

**ArchitectureTests Project:**
The project includes comprehensive architecture validation tests to ensure Clean Architecture principles are maintained:

**Test Framework & Packages:**
- **xUnit** (v2.5.3): Primary testing framework
- **NetArchTest.Rules** (v1.3.1): Architecture testing library for dependency validation
- **Shouldly** (v4.2.1): Assertion library for readable test assertions
- **Microsoft.NET.Test.Sdk** (v17.8.0): Test discovery and execution
- **coverlet.collector** (v6.0.0): Code coverage collection

**Architecture Validation Tests:**
The `LayerTests.cs` contains 6 critical Clean Architecture validation tests:

1. **`Domain_Should_NotHaveDependencyOnApplication`**: Ensures Domain layer doesn't depend on Application layer
2. **`DomainLayer_ShouldNotHaveDependencyOn_InfrastructureLayer`**: Ensures Domain layer doesn't depend on Infrastructure layer
3. **`DomainLayer_ShouldNotHaveDependencyOn_PresentationLayer`**: Ensures Domain layer doesn't depend on Presentation layer
4. **`ApplicationLayer_ShouldNotHaveDependencyOn_InfrastructureLayer`**: Ensures Application layer doesn't depend on Infrastructure layer
5. **`ApplicationLayer_ShouldNotHaveDependencyOn_PresentationLayer`**: Ensures Application layer doesn't depend on Presentation layer
6. **`InfrastructureLayer_ShouldNotHaveDependencyOn_PresentationLayer`**: Ensures Infrastructure layer doesn't depend on Presentation layer

**Running Architecture Tests:**
```bash
# Navigate to test project
cd Backend_Web/ArchitectureTests

# Run all tests
dotnet test

# Run with verbose output
dotnet test --verbosity normal

# Run from solution root
dotnet test Backend_Web/ArchitectureTests/ArchitectureTests.csproj
```

**Test Results:**
- **Total Tests**: 7 (including 1 placeholder test)
- **Success Rate**: 100% (all architecture rules validated)
- **Duration**: ~1.6s average execution time

These tests ensure that your Clean Architecture layers follow the proper dependency rules where inner layers (Domain, Application) never depend on outer layers (Infrastructure, Presentation).

---

### Frontend_Web
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

### 3. Running the Application

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

