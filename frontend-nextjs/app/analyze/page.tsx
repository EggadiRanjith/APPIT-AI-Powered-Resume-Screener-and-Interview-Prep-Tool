'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import RootLayout from '@/components/layouts/RootLayout';
import axios from 'axios';

interface AnalysisResult {
  analysisId: string;
  fitScore: number;
  matchingKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
  analysis: {
    strengths: string[];
    weaknesses: string[];
    recommendations: string[];
  };
  interviewQuestions: string[];
  resumeFileName: string;
}

export default function AnalyzePage() {
  const { user } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(selectedFile.type)) {
        setError('Please upload only PDF or DOCX files');
        return;
      }
      
      // Validate file size (5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }
      
      setFile(selectedFile);
      setError('');
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError('Please upload a resume file');
      return;
    }
    
    if (!jobDescription.trim()) {
      setError('Please enter a job description');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('jobDescription', jobDescription);

      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8000/api/analysis/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      setResult(response.data);
    } catch (err: any) {
      setError(err.response?.data?.msg || 'Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <ProtectedRoute>
      <RootLayout>
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-8">Resume Analysis</h1>
              
              {/* Upload Section */}
              <div className="space-y-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Resume (PDF or DOCX)
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.docx"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-black file:text-white hover:file:bg-gray-900"
                  />
                  {file && (
                    <p className="mt-2 text-sm text-green-600">
                      Selected: {file.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Description
                  </label>
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    rows={8}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Paste the job description here..."
                  />
                </div>

                {error && (
                  <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                  </div>
                )}

                <button
                  onClick={handleAnalyze}
                  disabled={loading}
                  className={`w-full py-3 px-4 rounded-md font-medium ${
                    loading
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-black text-white hover:bg-gray-900'
                  }`}
                >
                  {loading ? 'Analyzing...' : 'Analyze Resume'}
                </button>
              </div>

              {/* Results Section */}
              {result && (
                <div className="space-y-6">
                  <hr className="border-gray-200" />
                  
                  {/* Fit Score */}
                  <div className={`p-6 rounded-lg ${getScoreBgColor(result.fitScore)}`}>
                    <div className="text-center">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Fit Score</h2>
                      <div className={`text-6xl font-bold ${getScoreColor(result.fitScore)}`}>
                        {result.fitScore}%
                      </div>
                      <p className="text-gray-600 mt-2">
                        {result.fitScore >= 80 ? 'Excellent Match!' :
                         result.fitScore >= 60 ? 'Good Match' :
                         result.fitScore >= 40 ? 'Fair Match' : 'Needs Improvement'}
                      </p>
                    </div>
                  </div>

                  {/* Keywords Analysis */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-green-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-green-800 mb-4">
                        Matching Keywords ({result.matchingKeywords.length})
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {result.matchingKeywords.slice(0, 15).map((keyword, index) => (
                          <span key={index} className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-red-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-red-800 mb-4">
                        Missing Keywords ({result.missingKeywords.length})
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {result.missingKeywords.slice(0, 15).map((keyword, index) => (
                          <span key={index} className="px-3 py-1 bg-red-200 text-red-800 rounded-full text-sm">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Analysis Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-blue-800 mb-4">Strengths</h3>
                      <ul className="space-y-2">
                        {result.analysis.strengths.map((strength, index) => (
                          <li key={index} className="text-blue-700 text-sm">• {strength}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-orange-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-orange-800 mb-4">Areas to Improve</h3>
                      <ul className="space-y-2">
                        {result.analysis.weaknesses.map((weakness, index) => (
                          <li key={index} className="text-orange-700 text-sm">• {weakness}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-purple-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-purple-800 mb-4">Recommendations</h3>
                      <ul className="space-y-2">
                        {result.analysis.recommendations.map((rec, index) => (
                          <li key={index} className="text-purple-700 text-sm">• {rec}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Suggestions */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Suggestions for Improvement</h3>
                    <ul className="space-y-2">
                      {result.suggestions.map((suggestion, index) => (
                        <li key={index} className="text-gray-700">• {suggestion}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Interview Questions */}
                  <div className="bg-indigo-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-indigo-800 mb-4">Potential Interview Questions</h3>
                    <ul className="space-y-3">
                      {result.interviewQuestions?.map((question, index) => (
                        <li key={index} className="text-indigo-700">
                          <span className="font-medium">{index + 1}.</span> {question}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4">
                    <button
                      onClick={() => window.print()}
                      className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Print Report
                    </button>
                    <button
                      onClick={() => {
                        setResult(null);
                        setFile(null);
                        setJobDescription('');
                      }}
                      className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                    >
                      New Analysis
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </RootLayout>
    </ProtectedRoute>
  );
}
