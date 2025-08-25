from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import re

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

def analyze_resume_job_fit(resume_text, job_description):
    """
    Analyze resume against job description using advanced rule-based analysis
    No external APIs required - fully self-contained intelligent analysis
    """
    try:
        # Extract keywords from both texts
        resume_words = set(word.lower().strip('.,!?;:') for word in resume_text.split() if len(word) > 2)
        job_words = set(word.lower().strip('.,!?;:') for word in job_description.split() if len(word) > 2)
        
        # Define important technical keywords
        tech_keywords = {
            'javascript', 'python', 'java', 'react', 'angular', 'vue', 'node', 'nodejs', 'express',
            'mongodb', 'sql', 'mysql', 'postgresql', 'html', 'css', 'typescript', 'php', 'ruby',
            'go', 'rust', 'swift', 'kotlin', 'flutter', 'dart', 'aws', 'azure', 'gcp', 'docker',
            'kubernetes', 'jenkins', 'git', 'github', 'api', 'rest', 'graphql', 'microservices',
            'agile', 'scrum', 'devops', 'testing', 'junit', 'jest', 'redux', 'spring', 'django',
            'flask', 'laravel', 'rails', 'bootstrap', 'tailwind', 'machine learning', 'ai',
            'data science', 'analytics', 'cloud', 'security', 'blockchain', 'mobile', 'frontend',
            'backend', 'fullstack', 'database', 'linux', 'windows', 'macos', 'ios', 'android'
        }
        
        # Find matching and missing keywords
        job_tech_words = job_words.intersection(tech_keywords)
        resume_tech_words = resume_words.intersection(tech_keywords)
        
        matching_keywords = list(job_tech_words.intersection(resume_tech_words))
        missing_keywords = list(job_tech_words - resume_tech_words)
        
        # Calculate fit score based on keyword overlap and other factors
        keyword_match_ratio = len(matching_keywords) / max(len(job_tech_words), 1)
        
        # Additional scoring factors
        experience_indicators = ['years', 'experience', 'worked', 'developed', 'led', 'managed', 'built', 'created', 'designed']
        experience_score = sum(1 for word in experience_indicators if word in resume_words) / len(experience_indicators)
        
        education_indicators = ['degree', 'bachelor', 'master', 'phd', 'university', 'college', 'certification', 'certified']
        education_score = min(1.0, sum(1 for word in education_indicators if word in resume_words) / 3)
        
        # Leadership and soft skills indicators
        leadership_indicators = ['lead', 'manage', 'mentor', 'coordinate', 'supervise', 'direct']
        leadership_score = min(1.0, sum(1 for word in leadership_indicators if word in resume_words) / 3)
        
        # Calculate overall fit score with weighted factors
        fit_score = int((keyword_match_ratio * 0.4 + experience_score * 0.3 + education_score * 0.2 + leadership_score * 0.1) * 100)
        fit_score = max(15, min(95, fit_score))  # Keep between 15-95
        
        # Generate detailed recommendations
        recommendations = []
        if missing_keywords:
            recommendations.append(f"Gain experience in: {', '.join(missing_keywords[:5])}")
        if fit_score < 60:
            recommendations.append("Highlight relevant projects and quantifiable achievements")
            recommendations.append("Consider certifications in missing technical skills")
            recommendations.append("Tailor resume keywords to match job requirements")
        if leadership_score < 0.3:
            recommendations.append("Emphasize leadership and team collaboration experience")
        
        # Generate strengths
        strengths = []
        if matching_keywords:
            strengths.append(f"Strong technical alignment: {', '.join(matching_keywords[:5])}")
        if experience_score > 0.5:
            strengths.append("Demonstrates solid professional experience")
        if education_score > 0.5:
            strengths.append("Strong educational foundation")
        if leadership_score > 0.3:
            strengths.append("Shows leadership and management capabilities")
        
        # Generate weaknesses
        weaknesses = []
        if not matching_keywords:
            weaknesses.append("Limited technical skills matching job requirements")
        if missing_keywords:
            weaknesses.append(f"Missing key technologies: {', '.join(missing_keywords[:3])}")
        if experience_score < 0.3:
            weaknesses.append("Limited professional experience indicators")
        if education_score < 0.3:
            weaknesses.append("Educational background not clearly highlighted")
        
        # Determine experience level
        years_estimate = min(10, int(experience_score * 8))  # Estimate 0-10 years
        level_match = "entry" if fit_score < 40 else "junior" if fit_score < 60 else "mid" if fit_score < 80 else "senior"
        industry_fit = "excellent" if keyword_match_ratio > 0.8 else "good" if keyword_match_ratio > 0.6 else "moderate" if keyword_match_ratio > 0.3 else "limited"
        
        return {
            "fit_score": fit_score,
            "matching_keywords": matching_keywords,
            "missing_keywords": missing_keywords,
            "strengths": strengths or ["Basic qualifications present"],
            "weaknesses": weaknesses or ["Minor areas for improvement"],
            "recommendations": recommendations or ["Continue building relevant experience"],
            "experience_analysis": {
                "years_relevant": years_estimate,
                "level_match": level_match,
                "industry_fit": industry_fit
            },
            "skills_breakdown": {
                "technical_match": int(keyword_match_ratio * 100),
                "soft_skills_match": int((experience_score + leadership_score) * 50),
                "education_relevance": int(education_score * 100)
            },
            "detailed_feedback": f"Comprehensive analysis shows {fit_score}% compatibility. Technical skills match: {len(matching_keywords)}/{len(job_tech_words)} required technologies. {industry_fit.title()} industry alignment with {level_match}-level experience indicators. {'Strong candidate' if fit_score > 70 else 'Moderate fit' if fit_score > 50 else 'Needs development'} for this role."
        }
        
    except Exception as e:
        print(f"Error in analysis: {str(e)}")
        return {
            "fit_score": 25,
            "matching_keywords": [],
            "missing_keywords": [],
            "strengths": ["Analysis could not be completed"],
            "weaknesses": ["Technical error in analysis"],
            "recommendations": ["Please try again"],
            "experience_analysis": {
                "years_relevant": 0,
                "level_match": "unknown",
                "industry_fit": "unknown"
            },
            "skills_breakdown": {
                "technical_match": 0,
                "soft_skills_match": 0,
                "education_relevance": 0
            },
            "detailed_feedback": f"Analysis failed: {str(e)}"
        }
        # Extract keywords from both texts
        resume_words = set(word.lower().strip('.,!?;:') for word in resume_text.split() if len(word) > 2)
        job_words = set(word.lower().strip('.,!?;:') for word in job_description.split() if len(word) > 2)
        
        # Define important technical keywords
        tech_keywords = {
            'javascript', 'python', 'java', 'react', 'angular', 'vue', 'node', 'nodejs', 'express',
            'mongodb', 'sql', 'mysql', 'postgresql', 'html', 'css', 'typescript', 'php', 'ruby',
            'go', 'rust', 'swift', 'kotlin', 'flutter', 'dart', 'aws', 'azure', 'gcp', 'docker',
            'kubernetes', 'jenkins', 'git', 'github', 'api', 'rest', 'graphql', 'microservices',
            'agile', 'scrum', 'devops', 'testing', 'junit', 'jest', 'redux', 'spring', 'django',
            'flask', 'laravel', 'rails', 'bootstrap', 'tailwind', 'machine learning', 'ai',
            'data science', 'analytics', 'cloud', 'security', 'blockchain', 'mobile'
        }
        
        # Find matching and missing keywords
        job_tech_words = job_words.intersection(tech_keywords)
        resume_tech_words = resume_words.intersection(tech_keywords)
        
        matching_keywords = list(job_tech_words.intersection(resume_tech_words))
        missing_keywords = list(job_tech_words - resume_tech_words)
        
        # Calculate fit score based on keyword overlap and other factors
        keyword_match_ratio = len(matching_keywords) / max(len(job_tech_words), 1)
        
        # Additional scoring factors
        experience_indicators = ['years', 'experience', 'worked', 'developed', 'led', 'managed']
        experience_score = sum(1 for word in experience_indicators if word in resume_words) / len(experience_indicators)
        
        education_indicators = ['degree', 'bachelor', 'master', 'phd', 'university', 'college', 'certification']
        education_score = min(1.0, sum(1 for word in education_indicators if word in resume_words) / 3)
        
        # Calculate overall fit score
        fit_score = int((keyword_match_ratio * 0.5 + experience_score * 0.3 + education_score * 0.2) * 100)
        fit_score = max(10, min(95, fit_score))  # Keep between 10-95
        
        # Generate recommendations based on missing keywords
        recommendations = []
        if missing_keywords:
            recommendations.append(f"Consider gaining experience in: {', '.join(missing_keywords[:5])}")
        if fit_score < 60:
            recommendations.append("Focus on highlighting relevant projects and achievements")
            recommendations.append("Consider taking courses or certifications in missing technical skills")
        
        strengths = []
        if matching_keywords:
            strengths.append(f"Strong technical skills in: {', '.join(matching_keywords[:5])}")
        if experience_score > 0.5:
            strengths.append("Demonstrates relevant work experience")
        if education_score > 0.5:
            strengths.append("Has educational background relevant to the field")
        
        weaknesses = []
        if not matching_keywords:
            weaknesses.append("Limited technical skills matching job requirements")
        if missing_keywords:
            weaknesses.append(f"Missing key skills: {', '.join(missing_keywords[:3])}")
        
        return {
            "fit_score": fit_score,
            "matching_keywords": matching_keywords,
            "missing_keywords": missing_keywords,
            "strengths": strengths or ["Resume shows basic qualifications"],
            "weaknesses": weaknesses or ["Some areas for improvement identified"],
            "recommendations": recommendations or ["Continue building relevant experience"],
            "experience_analysis": {
                "years_relevant": int(experience_score * 5),  # Estimate 0-5 years
                "level_match": "junior" if fit_score < 50 else "mid" if fit_score < 80 else "senior",
                "industry_fit": "good" if keyword_match_ratio > 0.6 else "moderate" if keyword_match_ratio > 0.3 else "limited"
            },
            "skills_breakdown": {
                "technical_match": int(keyword_match_ratio * 100),
                "soft_skills_match": int(experience_score * 100),
                "education_relevance": int(education_score * 100)
            },
            "detailed_feedback": f"Analysis completed using rule-based matching. Fit score of {fit_score}% based on {len(matching_keywords)} matching technical skills out of {len(job_tech_words)} required. {'Strong' if fit_score > 70 else 'Moderate' if fit_score > 50 else 'Limited'} alignment with job requirements. For more detailed AI analysis, configure Gemini API key."
        }
        
    except Exception as e:
        print(f"Error in fallback analysis: {str(e)}")
        return {
            "fit_score": 25,
            "matching_keywords": [],
            "missing_keywords": [],
            "strengths": ["Analysis could not be completed"],
            "weaknesses": ["Technical error in analysis"],
            "recommendations": ["Please try again or check system configuration"],
            "experience_analysis": {
                "years_relevant": 0,
                "level_match": "unknown",
                "industry_fit": "unknown"
            },
            "skills_breakdown": {
                "technical_match": 0,
                "soft_skills_match": 0,
                "education_relevance": 0
            },
            "detailed_feedback": f"Analysis failed due to technical error: {str(e)}"
        }

# AI service functions are defined above

@app.route("/")
def root():
    return jsonify({"message": "APPIT AI Service is running"})

@app.route("/analyze", methods=["POST"])
def analyze_resume():
    try:
        data = request.get_json()
        
        if not data or 'resume_text' not in data or 'job_description' not in data:
            return jsonify({"error": "Missing resume_text or job_description"}), 400
        
        # Analyze resume using Gemini AI
        result = ai_service.analyze_resume(data['resume_text'], data['job_description'])
        
        return jsonify({
            "fit_score": result["fit_score"],
            "missing_skills": result["missing_skills"],
            "matching_skills": result["matching_skills"],
            "recommendations": result["recommendations"],
            "interview_questions": result["interview_questions"]
        })
    
    except Exception as e:
        return jsonify({"error": f"Analysis failed: {str(e)}"}), 500

@app.route("/health")
def health_check():
    return jsonify({
        "status": "healthy", 
        "service": "APPIT AI Service",
        "version": "1.0.0"
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
