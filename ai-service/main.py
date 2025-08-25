from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict
import re
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize, sent_tokenize
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import uvicorn

# Download required NLTK data
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')

try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords')

app = FastAPI(title="Resume AI Service", version="1.0.0")

class AnalysisRequest(BaseModel):
    resume_text: str
    job_description: str

class AnalysisResponse(BaseModel):
    fit_score: int
    matching_keywords: List[str]
    missing_keywords: List[str]
    suggestions: List[str]
    analysis: Dict[str, List[str]]
    interview_questions: List[str]

class AIService:
    def __init__(self):
        self.stop_words = set(stopwords.words('english'))
        self.technical_skills = {
            'programming': ['python', 'java', 'javascript', 'c++', 'c#', 'php', 'ruby', 'go', 'rust', 'swift', 'kotlin'],
            'web': ['html', 'css', 'react', 'angular', 'vue', 'node.js', 'express', 'django', 'flask', 'spring'],
            'database': ['sql', 'mysql', 'postgresql', 'mongodb', 'redis', 'elasticsearch', 'oracle', 'sqlite'],
            'cloud': ['aws', 'azure', 'gcp', 'docker', 'kubernetes', 'jenkins', 'terraform', 'ansible'],
            'data': ['pandas', 'numpy', 'scikit-learn', 'tensorflow', 'pytorch', 'spark', 'hadoop', 'tableau'],
            'tools': ['git', 'jira', 'confluence', 'slack', 'trello', 'figma', 'photoshop', 'illustrator']
        }
    
    def preprocess_text(self, text: str) -> str:
        """Clean and preprocess text"""
        text = text.lower()
        text = re.sub(r'[^\w\s]', ' ', text)
        text = re.sub(r'\s+', ' ', text)
        return text.strip()
    
    def extract_keywords(self, text: str) -> List[str]:
        """Extract meaningful keywords from text"""
        processed_text = self.preprocess_text(text)
        tokens = word_tokenize(processed_text)
        
        # Filter out stop words and short words
        keywords = [word for word in tokens 
                   if word not in self.stop_words 
                   and len(word) > 2 
                   and word.isalpha()]
        
        # Add technical skills found in text
        tech_keywords = []
        for category, skills in self.technical_skills.items():
            for skill in skills:
                if skill.lower() in processed_text:
                    tech_keywords.append(skill)
        
        # Combine and deduplicate
        all_keywords = list(set(keywords + tech_keywords))
        return all_keywords[:50]  # Limit to top 50 keywords
    
    def calculate_fit_score(self, resume_text: str, job_description: str) -> int:
        """Calculate fit score using TF-IDF and cosine similarity"""
        try:
            # Preprocess texts
            resume_processed = self.preprocess_text(resume_text)
            job_processed = self.preprocess_text(job_description)
            
            # Create TF-IDF vectors
            vectorizer = TfidfVectorizer(max_features=1000, stop_words='english')
            tfidf_matrix = vectorizer.fit_transform([resume_processed, job_processed])
            
            # Calculate cosine similarity
            similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]
            
            # Convert to percentage and add keyword matching bonus
            base_score = int(similarity * 100)
            
            # Keyword matching bonus
            resume_keywords = set(self.extract_keywords(resume_text))
            job_keywords = set(self.extract_keywords(job_description))
            
            if job_keywords:
                keyword_match_ratio = len(resume_keywords.intersection(job_keywords)) / len(job_keywords)
                keyword_bonus = int(keyword_match_ratio * 20)  # Up to 20% bonus
                
                final_score = min(100, base_score + keyword_bonus)
            else:
                final_score = base_score
            
            return max(0, final_score)
        
        except Exception as e:
            print(f"Error calculating fit score: {e}")
            return 0
    
    def analyze_keywords(self, resume_text: str, job_description: str) -> tuple:
        """Analyze matching and missing keywords"""
        resume_keywords = set(self.extract_keywords(resume_text))
        job_keywords = set(self.extract_keywords(job_description))
        
        matching = list(resume_keywords.intersection(job_keywords))
        missing = list(job_keywords - resume_keywords)
        
        # Prioritize technical skills and important keywords
        def prioritize_keywords(keywords):
            tech_keywords = []
            other_keywords = []
            
            for keyword in keywords:
                is_tech = any(keyword.lower() in skills for skills in self.technical_skills.values())
                if is_tech:
                    tech_keywords.append(keyword)
                else:
                    other_keywords.append(keyword)
            
            return tech_keywords + other_keywords
        
        matching = prioritize_keywords(matching)[:20]
        missing = prioritize_keywords(missing)[:20]
        
        return matching, missing
    
    def generate_suggestions(self, missing_keywords: List[str], fit_score: int) -> List[str]:
        """Generate improvement suggestions"""
        suggestions = []
        
        if fit_score < 40:
            suggestions.append("Consider tailoring your resume more closely to the job requirements")
            suggestions.append("Highlight relevant experience and skills more prominently")
        elif fit_score < 70:
            suggestions.append("Good match! Consider adding more specific examples of your achievements")
            suggestions.append("Quantify your accomplishments with numbers and metrics")
        else:
            suggestions.append("Excellent match! Your resume aligns well with the job requirements")
            suggestions.append("Consider adding any additional relevant certifications or projects")
        
        if missing_keywords:
            tech_missing = [kw for kw in missing_keywords[:5] 
                           if any(kw.lower() in skills for skills in self.technical_skills.values())]
            if tech_missing:
                suggestions.append(f"Consider gaining experience in: {', '.join(tech_missing)}")
            
            other_missing = [kw for kw in missing_keywords[:3] 
                           if not any(kw.lower() in skills for skills in self.technical_skills.values())]
            if other_missing:
                suggestions.append(f"Include keywords like: {', '.join(other_missing)}")
        
        suggestions.append("Use action verbs to describe your accomplishments")
        suggestions.append("Ensure your resume is ATS-friendly with clear formatting")
        
        return suggestions[:6]
    
    def generate_analysis(self, resume_text: str, job_description: str, fit_score: int) -> Dict[str, List[str]]:
        """Generate detailed analysis"""
        strengths = []
        weaknesses = []
        recommendations = []
        
        # Analyze strengths based on fit score
        if fit_score >= 80:
            strengths.extend([
                "Strong alignment with job requirements",
                "Relevant technical skills present",
                "Good keyword optimization"
            ])
        elif fit_score >= 60:
            strengths.extend([
                "Decent match with job requirements",
                "Some relevant experience highlighted"
            ])
        else:
            strengths.append("Room for significant improvement in alignment")
        
        # Analyze weaknesses
        if fit_score < 70:
            weaknesses.extend([
                "Limited alignment with job requirements",
                "Missing key technical skills or keywords",
                "Could benefit from better keyword optimization"
            ])
        
        # Generate recommendations
        recommendations.extend([
            "Tailor resume content to match job description keywords",
            "Quantify achievements with specific metrics and numbers",
            "Use industry-standard terminology and buzzwords",
            "Highlight relevant projects and accomplishments",
            "Ensure consistent formatting and clear structure"
        ])
        
        return {
            "strengths": strengths[:4],
            "weaknesses": weaknesses[:4],
            "recommendations": recommendations[:5]
        }
    
    def generate_interview_questions(self, resume_text: str, job_description: str) -> List[str]:
        """Generate 5 interview questions based on resume and job description"""
        questions = []
        
        # Extract key skills and experiences
        resume_keywords = self.extract_keywords(resume_text)
        job_keywords = self.extract_keywords(job_description)
        
        # Technical questions based on job requirements
        tech_skills = []
        for category, skills in self.technical_skills.items():
            for skill in skills:
                if skill.lower() in job_description.lower():
                    tech_skills.append(skill)
        
        if tech_skills:
            questions.append(f"Can you describe your experience with {tech_skills[0]}? How have you used it in previous projects?")
        
        # Behavioral questions
        questions.extend([
            "Tell me about a challenging project you worked on. How did you overcome the obstacles?",
            "Describe a time when you had to learn a new technology quickly. How did you approach it?",
        ])
        
        # Role-specific questions
        if any(word in job_description.lower() for word in ['lead', 'senior', 'manager']):
            questions.append("How do you handle mentoring junior team members and code reviews?")
        else:
            questions.append("How do you stay updated with the latest industry trends and technologies?")
        
        # Experience-based question
        questions.append("Walk me through your most significant accomplishment in your previous role.")
        
        return questions[:5]

# Initialize AI service
ai_service = AIService()

@app.get("/")
async def root():
    return {"message": "Resume AI Service is running"}

@app.post("/analyze", response_model=AnalysisResponse)
async def analyze_resume(request: AnalysisRequest):
    try:
        # Calculate fit score
        fit_score = ai_service.calculate_fit_score(request.resume_text, request.job_description)
        
        # Analyze keywords
        matching_keywords, missing_keywords = ai_service.analyze_keywords(
            request.resume_text, request.job_description
        )
        
        # Generate suggestions
        suggestions = ai_service.generate_suggestions(missing_keywords, fit_score)
        
        # Generate detailed analysis
        analysis = ai_service.generate_analysis(request.resume_text, request.job_description, fit_score)
        
        # Generate interview questions
        interview_questions = ai_service.generate_interview_questions(
            request.resume_text, request.job_description
        )
        
        return AnalysisResponse(
            fit_score=fit_score,
            matching_keywords=matching_keywords,
            missing_keywords=missing_keywords,
            suggestions=suggestions,
            analysis=analysis,
            interview_questions=interview_questions
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "Resume AI Service"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)
