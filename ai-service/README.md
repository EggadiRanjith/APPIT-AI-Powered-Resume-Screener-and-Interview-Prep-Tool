# AI Service - Python FastAPI

![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Google AI](https://img.shields.io/badge/Google_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)

The AI processing service for APPIT - AI-Powered Resume Screener and Interview Prep Tool. Built with FastAPI and powered by Google's Gemini Pro AI model.

## 🚀 Features

### Core AI Capabilities
- **Resume Analysis**: Advanced text processing and analysis
- **Job Matching**: Intelligent comparison between resume and job requirements
- **Fit Score Calculation**: 0-100 compatibility scoring algorithm
- **Skills Gap Analysis**: Identification of missing and matching skills
- **Personalized Recommendations**: AI-generated improvement suggestions
- **Interview Questions**: 5 tailored questions based on job description and resume

### AI Processing Features
- **Natural Language Processing**: Advanced text understanding
- **Keyword Extraction**: Smart identification of relevant skills and technologies
- **Contextual Analysis**: Deep understanding of job requirements and candidate qualifications
- **Multi-format Support**: Processing of various resume formats (via text extraction)
- **Real-time Processing**: Fast API responses with optimized AI calls

## 🛠️ Technology Stack

- **Framework**: FastAPI (Python web framework)
- **AI Model**: Google Gemini Pro API
- **Language**: Python 3.8+
- **HTTP Client**: httpx for async requests
- **Environment**: python-dotenv for configuration
- **Server**: Uvicorn ASGI server
- **Validation**: Pydantic models for request/response validation

## 📁 Project Structure

```
ai-service/
├── main.py                 # FastAPI application entry point
├── requirements.txt        # Python dependencies
├── README.md              # This documentation
├── .env.example           # Environment variables template
├── models/                # Pydantic models (if expanded)
├── services/              # Business logic services (if expanded)
├── utils/                 # Utility functions (if expanded)
└── tests/                 # Test files (if expanded)
```

## 🔧 Installation & Setup

### Prerequisites
- Python 3.8 or higher
- Google Gemini API key
- pip package manager

### Installation Steps

1. **Navigate to AI service directory**
   ```bash
   cd ai-service
   ```

2. **Create virtual environment (recommended)**
   ```bash
   python -m venv venv
   
   # Activate virtual environment
   # Windows
   venv\Scripts\activate
   # macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**
   ```bash
   # Create .env file
   cp .env.example .env
   ```
   
   Edit `.env` file:
   ```env
   GEMINI_API_KEY=your-google-gemini-api-key-here
   PORT=8000
   HOST=0.0.0.0
   DEBUG=True
   ```

5. **Get Google Gemini API Key**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Add it to your `.env` file

6. **Run the service**
   ```bash
   python main.py
   ```

7. **Verify installation**
   Navigate to [http://localhost:8000/docs](http://localhost:8000/docs) for interactive API documentation

## 🔧 Available Scripts

```bash
# Run development server
python main.py

# Run with uvicorn directly
uvicorn main:app --host 0.0.0.0 --port 8000 --reload

# Run tests
python -m pytest

# Install dependencies
pip install -r requirements.txt

# Generate requirements file
pip freeze > requirements.txt
```

## 🔌 API Endpoints

### POST `/analyze`
Analyzes a resume against a job description using AI.

**Request Body:**
```json
{
    "resume_text": "Software Engineer with 5 years of experience in JavaScript, Node.js, and Python. Built scalable web applications...",
    "job_description": "We are looking for a Senior Frontend Developer with React, TypeScript, and modern JavaScript experience..."
}
```

**Response:**
```json
{
    "fit_score": 85,
    "missing_skills": [
        "React",
        "TypeScript",
        "Frontend Architecture",
        "State Management"
    ],
    "matching_skills": [
        "JavaScript",
        "Node.js",
        "Web Development",
        "Software Engineering",
        "Problem Solving"
    ],
    "recommendations": [
        "Consider adding React experience to your resume by building projects or taking courses",
        "Learn TypeScript to enhance your JavaScript skills and meet job requirements",
        "Highlight any frontend development experience you may have",
        "Emphasize your JavaScript expertise as it's highly relevant to this role"
    ],
    "interview_questions": [
        "Tell me about your experience with JavaScript and how you've used it in your projects",
        "How would you approach learning React and TypeScript for this role?",
        "Describe a challenging web application you've built and the technologies you used",
        "What interests you about transitioning to frontend development?",
        "How do you stay updated with the latest JavaScript and web development trends?"
    ]
}
```

**Status Codes:**
- `200 OK`: Successful analysis
- `400 Bad Request`: Invalid input data
- `500 Internal Server Error`: AI service or processing error

### GET `/health`
Health check endpoint to verify service status.

**Response:**
```json
{
    "status": "healthy",
    "service": "APPIT AI Service",
    "version": "1.0.0",
    "timestamp": "2024-01-15T10:30:00Z"
}
```

### GET `/docs`
Interactive API documentation (Swagger UI).

### GET `/redoc`
Alternative API documentation (ReDoc).

## 🤖 AI Processing Logic

### Analysis Algorithm
```python
def analyze_resume(resume_text: str, job_description: str) -> dict:
    """
    1. Extract key information from resume and job description
    2. Identify required skills from job description
    3. Find matching skills in resume
    4. Calculate fit score based on matches and relevance
    5. Generate personalized recommendations
    6. Create tailored interview questions
    """
```

### Fit Score Calculation
- **90-100**: Excellent match, highly qualified candidate
- **80-89**: Very good match, strong candidate with minor gaps
- **70-79**: Good match, qualified with some skill development needed
- **60-69**: Fair match, candidate needs significant upskilling
- **Below 60**: Poor match, major skill gaps identified

### Skills Analysis
- **Matching Skills**: Direct matches between resume and job requirements
- **Missing Skills**: Required skills not found in resume
- **Transferable Skills**: Related skills that could be applicable
- **Soft Skills**: Communication, leadership, problem-solving abilities

## 🧠 Google Gemini Integration

### API Configuration
```python
import google.generativeai as genai

# Configure Gemini API
genai.configure(api_key=os.getenv('GEMINI_API_KEY'))

# Initialize model
model = genai.GenerativeModel('gemini-pro')

# Generate analysis
response = model.generate_content(prompt)
```

### Prompt Engineering
The service uses carefully crafted prompts to ensure consistent and accurate AI responses:

```python
ANALYSIS_PROMPT = """
Analyze the following resume against the job description and provide:

1. A fit score (0-100) based on how well the candidate matches the requirements
2. List of missing skills that are required but not present in the resume
3. List of matching skills found in both resume and job description
4. 3-4 specific recommendations for improving the resume
5. 5 interview questions tailored to the candidate and role

Resume: {resume_text}
Job Description: {job_description}

Provide the response in JSON format with the specified structure.
"""
```

## 🔒 Security & Best Practices

### API Key Security
- Store API keys in environment variables
- Never commit API keys to version control
- Use different keys for development and production
- Implement API key rotation policies

### Input Validation
```python
from pydantic import BaseModel, validator

class AnalysisRequest(BaseModel):
    resume_text: str
    job_description: str
    
    @validator('resume_text')
    def validate_resume_text(cls, v):
        if len(v.strip()) < 50:
            raise ValueError('Resume text too short')
        return v
    
    @validator('job_description')
    def validate_job_description(cls, v):
        if len(v.strip()) < 20:
            raise ValueError('Job description too short')
        return v
```

### Error Handling
```python
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal server error",
            "message": "An unexpected error occurred during processing"
        }
    )
```

## 📊 Performance Optimization

### Async Processing
```python
import asyncio
from concurrent.futures import ThreadPoolExecutor

async def analyze_resume_async(resume_text: str, job_description: str):
    loop = asyncio.get_event_loop()
    with ThreadPoolExecutor() as executor:
        result = await loop.run_in_executor(
            executor, 
            analyze_with_gemini, 
            resume_text, 
            job_description
        )
    return result
```

### Caching Strategy
- Implement Redis caching for similar analyses
- Cache AI responses for identical inputs
- Set appropriate TTL for cached results

### Rate Limiting
```python
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)

@app.post("/analyze")
@limiter.limit("10/minute")
async def analyze_resume(request: Request, analysis_request: AnalysisRequest):
    # Analysis logic here
    pass
```

## 🧪 Testing

### Unit Tests
```python
import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_analyze_endpoint():
    response = client.post("/analyze", json={
        "resume_text": "Software Engineer with Python experience...",
        "job_description": "Looking for Python developer..."
    })
    assert response.status_code == 200
    assert "fit_score" in response.json()

def test_health_endpoint():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"
```

### Load Testing
```bash
# Install locust for load testing
pip install locust

# Run load tests
locust -f load_test.py --host=http://localhost:8000
```

## 🚀 Deployment

### Production Configuration
```python
# main.py production settings
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", 8000)),
        workers=4,  # Multiple workers for production
        log_level="info"
    )
```

### Docker Deployment
```dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Environment Variables
```env
# Production environment
GEMINI_API_KEY=your-production-api-key
PORT=8000
HOST=0.0.0.0
DEBUG=False
LOG_LEVEL=info
WORKERS=4
```

## 📈 Monitoring & Logging

### Logging Configuration
```python
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('ai_service.log'),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger(__name__)
```

### Health Monitoring
```python
@app.get("/metrics")
async def get_metrics():
    return {
        "requests_processed": request_counter,
        "average_response_time": avg_response_time,
        "error_rate": error_rate,
        "uptime": uptime_seconds
    }
```

## 🐛 Troubleshooting

### Common Issues

1. **Gemini API Key Issues**
   ```bash
   # Verify API key is set
   echo $GEMINI_API_KEY
   
   # Test API key validity
   curl -H "Authorization: Bearer $GEMINI_API_KEY" https://generativelanguage.googleapis.com/v1/models
   ```

2. **Import Errors**
   ```bash
   # Reinstall dependencies
   pip install --force-reinstall -r requirements.txt
   
   # Check Python version
   python --version
   ```

3. **Port Already in Use**
   ```bash
   # Find process using port 8000
   lsof -i :8000
   
   # Kill process
   kill -9 <PID>
   
   # Or use different port
   uvicorn main:app --port 8001
   ```

4. **AI Response Errors**
   ```bash
   # Check API quota and limits
   # Verify prompt format and length
   # Review error logs for specific issues
   ```

## 🔮 Future Enhancements

- [ ] Support for multiple AI models (OpenAI, Claude, etc.)
- [ ] Batch processing for multiple resumes
- [ ] Resume parsing from PDF/DOCX directly
- [ ] Custom scoring algorithms
- [ ] Industry-specific analysis
- [ ] Multi-language support
- [ ] Advanced caching and optimization

## 🤝 Contributing

1. Follow PEP 8 Python style guidelines
2. Add type hints for all functions
3. Write comprehensive tests
4. Document API changes
5. Use async/await for I/O operations
6. Implement proper error handling

## 📚 Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com)
- [Google Gemini AI Documentation](https://ai.google.dev/docs)
- [Python asyncio Guide](https://docs.python.org/3/library/asyncio.html)
- [Pydantic Documentation](https://pydantic-docs.helpmanual.io)
- [Uvicorn Documentation](https://www.uvicorn.org)

---

**Built with ❤️ using FastAPI, Python, and Google Gemini AI**.
