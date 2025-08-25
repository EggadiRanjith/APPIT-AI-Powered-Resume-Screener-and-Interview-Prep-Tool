# Resume AI Service

FastAPI-based AI service for resume analysis and interview question generation.

## Features

- Resume vs Job Description analysis using TF-IDF and cosine similarity
- Fit score calculation (0-100)
- Keyword extraction and matching
- Missing skills identification
- Interview question generation
- Improvement suggestions

## Setup

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Run the service:
```bash
python main.py
```

The service will run on `http://localhost:8001`

## API Endpoints

- `POST /analyze` - Analyze resume against job description
- `GET /health` - Health check
- `GET /` - Service status

## Request Format

```json
{
  "resume_text": "Your resume content...",
  "job_description": "Job description content..."
}
```

## Response Format

```json
{
  "fit_score": 85,
  "matching_keywords": ["python", "javascript", "react"],
  "missing_keywords": ["aws", "docker", "kubernetes"],
  "suggestions": ["Consider gaining experience in cloud technologies"],
  "analysis": {
    "strengths": ["Strong technical skills"],
    "weaknesses": ["Limited cloud experience"],
    "recommendations": ["Add more quantified achievements"]
  },
  "interview_questions": [
    "Can you describe your experience with Python?",
    "Tell me about a challenging project you worked on."
  ]
}
```
