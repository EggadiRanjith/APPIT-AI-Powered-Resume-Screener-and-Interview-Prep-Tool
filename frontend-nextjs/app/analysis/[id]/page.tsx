'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import RootLayout from '@/components/layouts/RootLayout';
import axios from 'axios';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface AnalysisDetail {
  _id: string;
  resumeFileName: string;
  resumeText: string;
  jobDescription: string;
  fitScore: number;
  matchingKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
  analysis: {
    strengths: string[];
    weaknesses: string[];
    recommendations: string[];
  };
  createdAt: string;
}

export default function AnalysisDetailPage() {
  const { user } = useAuth();
  const params = useParams();
  const id = params?.id as string;
  
  const [analysis, setAnalysis] = useState<AnalysisDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetchAnalysis();
    }
  }, [id]);

  const fetchAnalysis = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8000/api/analysis/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setAnalysis(response.data.analysis);
    } catch (err: any) {
      setError('Failed to load analysis details');
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

  if (loading) {
    return (
      <ProtectedRoute>
        <RootLayout>
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black"></div>
          </div>
        </RootLayout>
      </ProtectedRoute>
    );
  }

  if (error || !analysis) {
    return (
      <ProtectedRoute>
        <RootLayout>
          <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Analysis Not Found</h1>
                <p className="text-gray-600 mb-6">{error || 'The requested analysis could not be found.'}</p>
                <Link
                  href="/analysis-history"
                  className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-900"
                >
                  Back to History
                </Link>
              </div>
            </div>
          </div>
        </RootLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <RootLayout>
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{analysis.resumeFileName}</h1>
                  <p className="text-gray-600 mt-2">
                    Analyzed on {new Date(analysis.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <Link
                  href="/analysis-history"
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                >
                  Back to History
                </Link>
              </div>

              {/* Fit Score */}
              <div className={`p-6 rounded-lg mb-8 ${getScoreBgColor(analysis.fitScore)}`}>
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Fit Score</h2>
                  <div className={`text-6xl font-bold ${getScoreColor(analysis.fitScore)}`}>
                    {analysis.fitScore}%
                  </div>
                  <p className="text-gray-600 mt-2">
                    {analysis.fitScore >= 80 ? 'Excellent Match!' :
                     analysis.fitScore >= 60 ? 'Good Match' :
                     analysis.fitScore >= 40 ? 'Fair Match' : 'Needs Improvement'}
                  </p>
                </div>
              </div>

              {/* Keywords Analysis */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-800 mb-4">
                    Matching Keywords ({analysis.matchingKeywords.length})
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {analysis.matchingKeywords.map((keyword, index) => (
                      <span key={index} className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-red-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-red-800 mb-4">
                    Missing Keywords ({analysis.missingKeywords.length})
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {analysis.missingKeywords.map((keyword, index) => (
                      <span key={index} className="px-3 py-1 bg-red-200 text-red-800 rounded-full text-sm">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Analysis Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-800 mb-4">Strengths</h3>
                  <ul className="space-y-2">
                    {analysis.analysis.strengths.map((strength, index) => (
                      <li key={index} className="text-blue-700 text-sm">• {strength}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-orange-800 mb-4">Areas to Improve</h3>
                  <ul className="space-y-2">
                    {analysis.analysis.weaknesses.map((weakness, index) => (
                      <li key={index} className="text-orange-700 text-sm">• {weakness}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-800 mb-4">Recommendations</h3>
                  <ul className="space-y-2">
                    {analysis.analysis.recommendations.map((rec, index) => (
                      <li key={index} className="text-purple-700 text-sm">• {rec}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Suggestions */}
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Suggestions for Improvement</h3>
                <ul className="space-y-2">
                  {analysis.suggestions.map((suggestion, index) => (
                    <li key={index} className="text-gray-700">• {suggestion}</li>
                  ))}
                </ul>
              </div>

              {/* Job Description */}
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Job Description</h3>
                <div className="text-gray-700 whitespace-pre-wrap text-sm">
                  {analysis.jobDescription}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={() => window.print()}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Print Report
                </button>
                <Link
                  href="/analyze"
                  className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-900"
                >
                  New Analysis
                </Link>
              </div>
            </div>
          </div>
        </div>
      </RootLayout>
    </ProtectedRoute>
  );
}
