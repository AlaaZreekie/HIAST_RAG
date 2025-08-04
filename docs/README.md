# HIAST RAG System

A comprehensive content management system for  (HIAST) with integrated RAG  capabilities.

## Github Link
-`https://github.com/AlaaZreekie/HIAST_RAG`


## System Overview

This project consists of three main components:

1. **Backend API** (.NET Core) - RESTful API for content management
2. **Frontend** (Next.js) - Admin dashboard and public website
3. **RAG System** (Python) - AI-powered content retrieval and generation

## Prerequisites

### Required Software
- **.NET 8.0 SDK** - For backend API
- **Node.js 18+** - For frontend
- **Python 3.8+** - For RAG system
- **SQL Server** - Database
- **Git** - Version control

## Project Structure```
ForthYear/
├── Backend_Web/           # .NET Core API
├── hiast-frontend/        # Next.js Frontend
├── RAG_System/           # Python RAG System
└── README.md
```

## 1. Backend API Setup

### Prerequisites
- .NET 8.0 SDK
- SQL Server (LocalDB or full SQL Server)
- Visual Studio 2022 or VS Code

### Installation Steps

1. **Navigate to Backend Directory**
   ```bash
   cd Backend_Web
   ```

2. **Restore Dependencies**
   ```bash
   dotnet restore
   ```

3. **Update Database Connection**
   - Open `appsettings.json` or `appsettings.Development.json`
   - Update the connection string to point to your SQL Server instance:
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=HIASTDB;Trusted_Connection=true;MultipleActiveResultSets=true"
     }
   }
   ```

4. **Run Database Migrations**


5. **Run the API**
   ```bash
   dotnet run
   ```

   The API will be available at: `https://localhost:7187`

## 2. Frontend Setup

### Prerequisites
- Node.js 18+
- npm

### Installation Steps

1. **Navigate to Frontend Directory**
   ```bash
   cd hiast-frontend
   ```

2. **Install Dependencies**
   ```bash
   npm instal
   ```

3. **Environment Configuration**
   Create a `.env.local` file in the frontend directory:
   ```env
   NEXT_PUBLIC_API_URL=https://localhost:7187/api
   ```

4. **Run Development Server**
   ```bash
   npm run dev   ```

   The frontend will be available at: `http://localhost:3000`

## 3. RAG System Setup


### Installation Steps

1. **Navigate to RAG System Directory**
   ```bash
   cd Backend_AI
   ```

2. **Create Virtual Environment**
   ```bash
   python -m venv venv
   
   # Activate virtual environment
   # Windows:
   venv\Scripts\activate
   # macOS/Linux:
   source venv/bin/activate
   ```

3. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Environment Configuration**
   Create a `.env` file in the RAG_System directory:
   ```env
  GOOGLE_API_KEY = your-key
  GOOGLE_API_KEY_EMMBEDDER = "your_"   ```

5. **Run the RAG System**
   ```bash
   python main.py
   or
   python -m uvicorn main:app --reload   ```

## Running the Complete System

### 1. Start Backend API
```bash
cd Backend_Web
dotnet run
```

### 2. Start Frontend
```bash
cd hiast-frontend
npm run dev
```

### 3. Start RAG System
```bash
cd RAG_System
uvicron main.py --reload
```
## Configuration Files

### Backend Configuration
- `Backend_Web/appsettings.json` - Main configuration
- `Backend_Web/appsettings.Development.json` - Development settings

### Frontend Configuration
- `hiast-frontend/next.config.js` - Next.js configuration
- `hiast-frontend/tailwind.config.js` - Tailwind CSS configuration
- `hiast-frontend/.env.local` - Environment variables

### RAG System Configuration
- `RAG_System/config.py` - System configuration
- `RAG_System/.env` - Environment variables

## Database Setup

### Initial Setup
1. Ensure SQL Server is running
2. Update connection string in backend configuration
3. Run migrations: `dotnet ef database update`


