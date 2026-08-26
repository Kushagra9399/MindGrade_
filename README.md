# MindGrade - Student Reasoning Evaluator

MindGrade is an AI-powered quiz platform that revolutionizes student assessment by requiring written reasoning for answer choices. The platform uses AWS Bedrock AI to evaluate both answer correctness and reasoning quality, providing personalized feedback to enhance learning.

## Features

- **Reasoning-Based Assessment**: Students must provide written explanations for their answers
- **AI-Powered Evaluation**: AWS Bedrock analyzes reasoning quality and provides detailed feedback
- **Multiple Input Methods**: Support for text input and image uploads (handwritten solutions)
- **Subject Organization**: Questions organized by Mathematics, Physics, Logical Reasoning, and more
- **Timed Tests**: Configurable time limits and competitive exam mock tests
- **LaTeX Support**: Proper rendering of mathematical equations and formulas
- **Multi-Tier Access**: Support for individual students, schools, and colleges

## Technology Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Backend**: Python FastAPI
- **Database**: PostgreSQL
- **AI Service**: AWS Bedrock
- **Deployment**: Docker containers

## Prerequisites

- Node.js 20+ and npm
- Python 3.11+
- PostgreSQL 15+
- Docker and Docker Compose (for containerized setup)
- AWS Account with Bedrock access

## Quick Start with Docker

1. Clone the repository
2. Copy environment files:
   ```bash
   cp backend/.env.example backend/.env
   ```
3. Update `backend/.env` with your AWS credentials
4. Start all services:
   ```bash
   docker-compose up -d
   ```
5. Access the application:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

## Local Development Setup

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Create virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. Initialize database:
   ```bash
   alembic upgrade head
   ```

6. Run the backend:
   ```bash
   uvicorn main:app --reload
   ```

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

## Database Setup

### Using Docker
The PostgreSQL database is automatically set up when using `docker-compose up`.

### Manual Setup
1. Install PostgreSQL 15+
2. Create database:
   ```sql
   CREATE DATABASE mindgrade;
   CREATE USER mindgrade WITH PASSWORD 'mindgrade';
   GRANT ALL PRIVILEGES ON DATABASE mindgrade TO mindgrade;
   ```
3. Run migrations:
   ```bash
   cd backend
   alembic upgrade head
   ```

## AWS Bedrock Configuration

1. Create an AWS account and enable Bedrock access
2. Create IAM user with Bedrock permissions
3. Add credentials to `backend/.env`:
   ```
   AWS_REGION=us-east-1
   AWS_ACCESS_KEY_ID=your_key_here
   AWS_SECRET_ACCESS_KEY=your_secret_here
   BEDROCK_MODEL_ID=anthropic.claude-3-sonnet-20240229-v1:0
   ```

## Project Structure

```
mindgrade/
├── backend/                 # Python FastAPI backend
│   ├── models/             # Database models
│   ├── services/           # Business logic services
│   ├── alembic/            # Database migrations
│   ├── main.py             # FastAPI application
│   ├── config.py           # Configuration management
│   └── database.py         # Database connection
├── frontend/               # React TypeScript frontend
│   ├── components/         # React components
│   ├── services/           # API services
│   └── types.ts            # TypeScript types
├── docker-compose.yml      # Docker orchestration
└── README.md              # This file
```

## API Documentation

Once the backend is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Testing

### Backend Tests
```bash
cd backend
pytest
```

### Frontend Tests
```bash
cd frontend
npm test
```

## Deployment

### Production Deployment
- Frontend: Deploy to Netlify
- Backend: Deploy to Railway or Vercel
- Database: Use managed PostgreSQL (AWS RDS, Railway, etc.)
