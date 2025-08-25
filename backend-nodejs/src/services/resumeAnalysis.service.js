const axios = require('axios');
const natural = require('natural');

class ResumeAnalysisService {
  constructor() {
    this.aiServiceUrl = process.env.AI_SERVICE_URL || 'http://localhost:8001';
  }
  static extractKeywords(text) {
    // Convert to lowercase and remove special characters
    const cleanText = text.toLowerCase().replace(/[^\w\s]/g, ' ');
    
    // Tokenize
    const tokens = natural.WordTokenizer().tokenize(cleanText);
    
    // Remove stop words
    const stopWords = new Set([
      'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
      'from', 'up', 'about', 'into', 'through', 'during', 'before', 'after', 'above', 'below',
      'between', 'among', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
      'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can',
      'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them', 'my', 'your',
      'his', 'her', 'its', 'our', 'their', 'this', 'that', 'these', 'those', 'am', 'work', 'working',
      'experience', 'years', 'year', 'including', 'using', 'used', 'use', 'also', 'well', 'good',
      'great', 'excellent', 'strong', 'skills', 'skill', 'ability', 'able', 'knowledge'
    ]);
    
    // Filter out stop words and short words
    const keywords = tokens
      .filter(token => token && token.length > 2 && !stopWords.has(token))
      .filter(token => /^[a-zA-Z+#.]+$/.test(token)); // Allow letters, +, #, . for tech terms
    
    // Count frequency
    const frequency = {};
    keywords.forEach(keyword => {
      frequency[keyword] = (frequency[keyword] || 0) + 1;
    });
    
    // Return sorted by frequency
    return Object.keys(frequency)
      .sort((a, b) => frequency[b] - frequency[a])
      .slice(0, 50); // Top 50 keywords
  }

  static calculateFitScore(resumeKeywords, jobKeywords) {
    const resumeSet = new Set(resumeKeywords.map(k => k.toLowerCase()));
    const jobSet = new Set(jobKeywords.map(k => k.toLowerCase()));
    
    let matches = 0;
    let totalJobKeywords = jobSet.size;
    
    jobSet.forEach(keyword => {
      if (resumeSet.has(keyword)) {
        matches++;
      }
    });
    
    // Calculate base score
    const baseScore = totalJobKeywords > 0 ? (matches / totalJobKeywords) * 100 : 0;
    
    // Apply weighting for important keywords
    const importantKeywords = this.getImportantKeywords(Array.from(jobSet));
    let weightedMatches = 0;
    let totalWeight = 0;
    
    jobSet.forEach(keyword => {
      const weight = importantKeywords.includes(keyword) ? 2 : 1;
      totalWeight += weight;
      if (resumeSet.has(keyword)) {
        weightedMatches += weight;
      }
    });
    
    const weightedScore = totalWeight > 0 ? (weightedMatches / totalWeight) * 100 : 0;
    
    // Final score is average of base and weighted score
    return Math.round((baseScore + weightedScore) / 2);
  }

  static getImportantKeywords(keywords) {
    const techKeywords = [
      'javascript', 'python', 'java', 'react', 'node', 'angular', 'vue', 'typescript',
      'html', 'css', 'sql', 'mongodb', 'postgresql', 'mysql', 'aws', 'azure', 'docker',
      'kubernetes', 'git', 'agile', 'scrum', 'api', 'rest', 'graphql', 'microservices',
      'machine learning', 'ai', 'data science', 'analytics', 'cloud', 'devops', 'ci/cd'
    ];
    
    return keywords.filter(keyword => 
      techKeywords.some(tech => keyword.includes(tech) || tech.includes(keyword))
    );
  }

  static findMissingKeywords(resumeKeywords, jobKeywords) {
    const resumeSet = new Set(resumeKeywords.map(k => k.toLowerCase()));
    const jobSet = new Set(jobKeywords.map(k => k.toLowerCase()));
    
    return Array.from(jobSet).filter(keyword => !resumeSet.has(keyword));
  }

  static findMatchingKeywords(resumeKeywords, jobKeywords) {
    const resumeSet = new Set(resumeKeywords.map(k => k.toLowerCase()));
    const jobSet = new Set(jobKeywords.map(k => k.toLowerCase()));
    
    return Array.from(jobSet).filter(keyword => resumeSet.has(keyword));
  }

  static generateSuggestions(missingKeywords, fitScore) {
    const suggestions = [];
    
    if (fitScore < 30) {
      suggestions.push("Consider tailoring your resume more closely to this job description");
      suggestions.push("Highlight relevant experience that matches the job requirements");
    } else if (fitScore < 60) {
      suggestions.push("Add more relevant keywords from the job description");
      suggestions.push("Emphasize skills and experience that align with the role");
    } else if (fitScore < 80) {
      suggestions.push("Fine-tune your resume to include more specific job requirements");
    }
    
    if (missingKeywords.length > 0) {
      const topMissing = missingKeywords.slice(0, 5);
      suggestions.push(`Consider adding these important keywords: ${topMissing.join(', ')}`);
    }
    
    suggestions.push("Quantify your achievements with specific numbers and results");
    suggestions.push("Use action verbs to describe your accomplishments");
    
    return suggestions;
  }

  static generateAnalysis(resumeText, jobDescription, fitScore, matchingKeywords, missingKeywords) {
    const analysis = {
      strengths: [],
      weaknesses: [],
      recommendations: []
    };
    
    // Strengths
    if (matchingKeywords.length > 0) {
      analysis.strengths.push(`Strong keyword match with ${matchingKeywords.length} relevant terms`);
    }
    
    if (fitScore >= 70) {
      analysis.strengths.push("High compatibility with job requirements");
    }
    
    // Weaknesses
    if (missingKeywords.length > 10) {
      analysis.weaknesses.push("Missing several key requirements from job description");
    }
    
    if (fitScore < 50) {
      analysis.weaknesses.push("Low overall match with job requirements");
    }
    
    // Recommendations
    analysis.recommendations.push("Tailor resume content to match job-specific requirements");
    analysis.recommendations.push("Include relevant certifications and training");
    analysis.recommendations.push("Highlight measurable achievements and impact");
    
    return analysis;
  }

  static fallbackAnalysis(resumeText, jobDescription) {
    // Simple fallback analysis when AI service is unavailable
    const resumeWords = this.extractSimpleKeywords(resumeText);
    const jobWords = this.extractSimpleKeywords(jobDescription);
    
    const matching = resumeWords.filter(word => jobWords.includes(word));
    const missing = jobWords.filter(word => !resumeWords.includes(word));
    
    const fitScore = jobWords.length > 0 ? Math.round((matching.length / jobWords.length) * 100) : 0;
    
    return {
      fitScore,
      matchingKeywords: matching.slice(0, 20),
      missingKeywords: missing.slice(0, 20),
      suggestions: [
        'AI service temporarily unavailable - basic analysis provided',
        'Consider tailoring your resume to include more job-specific keywords',
        'Highlight relevant experience and achievements',
        'Use action verbs to describe your accomplishments'
      ],
      analysis: {
        strengths: ['Resume contains relevant keywords'],
        weaknesses: ['Could benefit from more specific alignment'],
        recommendations: ['Tailor resume content to job requirements']
      },
      interviewQuestions: [
        'Tell me about your relevant experience for this role.',
        'What interests you most about this position?',
        'Describe a challenging project you worked on.',
        'How do you stay updated with industry trends?',
        'What are your career goals?'
      ]
    };
  }

  static extractSimpleKeywords(text) {
    // Convert to lowercase and remove special characters
    const cleanText = text.toLowerCase().replace(/[^\w\s]/g, ' ');
    
    // Tokenize
    const tokens = natural.WordTokenizer().tokenize(cleanText);
    
    // Remove stop words
    const stopWords = new Set([
      'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
      'from', 'up', 'about', 'into', 'through', 'during', 'before', 'after', 'above', 'below',
      'between', 'among', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
      'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can',
      'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them', 'my', 'your',
      'his', 'her', 'its', 'our', 'their', 'this', 'that', 'these', 'those', 'am', 'work', 'working',
      'experience', 'years', 'year', 'including', 'using', 'used', 'use', 'also', 'well', 'good',
      'great', 'excellent', 'strong', 'skills', 'skill', 'ability', 'able', 'knowledge'
    ]);
    
    // Filter out stop words and short words
    const keywords = tokens
      .filter(token => token && token.length > 2 && !stopWords.has(token))
      .filter(token => /^[a-zA-Z]+$/.test(token)); // Allow only letters
    
    return keywords;
  }

  async analyzeResume(resumeText, jobDescription) {
    try {
      // Call Python AI service for analysis
      const response = await axios.post(`${this.aiServiceUrl}/analyze`, {
        resume_text: resumeText,
        job_description: jobDescription
      }, {
        timeout: 30000, // 30 second timeout
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const aiResult = response.data;
      
      return {
        fitScore: aiResult.fit_score,
        matchingKeywords: aiResult.matching_keywords,
        missingKeywords: aiResult.missing_keywords,
        suggestions: aiResult.suggestions,
        analysis: aiResult.analysis,
        interviewQuestions: aiResult.interview_questions
      };
    } catch (error) {
      console.error('AI service error:', error.message);
      
      // Fallback to basic analysis if AI service is unavailable
      return ResumeAnalysisService.fallbackAnalysis(resumeText, jobDescription);
    }
  }
}

module.exports = ResumeAnalysisService;
