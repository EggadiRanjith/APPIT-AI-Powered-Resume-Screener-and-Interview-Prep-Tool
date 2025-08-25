'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import RootLayout from '@/components/layouts/RootLayout';
import axios from 'axios';
import Link from 'next/link';

interface Analysis {
  _id: string;
  resumeFileName: string;
  fitScore: number;
  createdAt: string;
  matchingKeywords: string[];
  missingKeywords: string[];
}

export default function AnalysisHistoryPage() {
  const { user } = useAuth();
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchAnalyses();
  }, [page]);

  const fetchAnalyses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8000/api/analysis/history?page=${page}&limit=10`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setAnalyses(response.data.analyses);
      setTotalPages(response.data.pagination.pages);
    } catch (err: any) {
      setError('Failed to load analysis history');
    } finally {
      setLoading(false);
    }
  };

  const deleteAnalysis = async (id: string) => {
    if (!confirm('Are you sure you want to delete this analysis?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8000/api/analysis/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setAnalyses(analyses.filter(analysis => analysis._id !== id));
    } catch (err: any) {
      setError('Failed to delete analysis');
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-charcoal bg-pure-white border border-charcoal';
    if (score >= 60) return 'text-charcoal bg-pure-white border border-medium-gray';
    return 'text-charcoal bg-pure-white border border-light-gray';
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

  return (
    <ProtectedRoute>
      <RootLayout>
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Analysis History</h1>
                <Link
                  href="/analyze"
                  className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-900"
                >
                  New Analysis
                </Link>
              </div>

              {error && (
                <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}

              {analyses.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg mb-4">No analyses found</p>
                  <Link
                    href="/analyze"
                    className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-900"
                  >
                    Create Your First Analysis
                  </Link>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Resume File
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Fit Score
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Keywords
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {analyses.map((analysis) => (
                          <tr key={analysis._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {analysis.resumeFileName}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getScoreColor(analysis.fitScore)}`}>
                                {analysis.fitScore}%
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(analysis.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex space-x-4">
                                <span className="text-green-600">✓ {analysis.matchingKeywords?.length || 0}</span>
                                <span className="text-red-600">✗ {analysis.missingKeywords?.length || 0}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                <Link
                                  href={`/analysis/${analysis._id}`}
                                  className="text-blue-600 hover:text-blue-900"
                                >
                                  View
                                </Link>
                                <button
                                  onClick={() => deleteAnalysis(analysis._id)}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center mt-8 space-x-2">
                      <button
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                        className={`px-4 py-2 rounded ${
                          page === 1
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-black text-white hover:bg-gray-900'
                        }`}
                      >
                        Previous
                      </button>
                      
                      <span className="px-4 py-2 text-gray-700">
                        Page {page} of {totalPages}
                      </span>
                      
                      <button
                        onClick={() => setPage(page + 1)}
                        disabled={page === totalPages}
                        className={`px-4 py-2 rounded ${
                          page === totalPages
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-black text-white hover:bg-gray-900'
                        }`}
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </RootLayout>
    </ProtectedRoute>
  );
}
