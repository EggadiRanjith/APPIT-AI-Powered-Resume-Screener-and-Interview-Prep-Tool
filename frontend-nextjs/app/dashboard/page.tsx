'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import RootLayout from '@/components/layouts/RootLayout';
import Link from 'next/link';
import axios from 'axios';

interface DashboardStats {
  totalAnalyses: number;
  averageScore: number;
  bestScore: number;
  thisMonth: number;
}

interface RecentAnalysis {
  _id: string;
  resumeFileName: string;
  fitScore: number;
  createdAt: string;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalAnalyses: 0,
    averageScore: 0,
    bestScore: 0,
    thisMonth: 0
  });
  const [recentAnalyses, setRecentAnalyses] = useState<RecentAnalysis[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Fetch analysis history to calculate stats
      const response = await axios.get('http://localhost:8000/api/analysis/history?page=1&limit=100', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const analyses = response.data.analyses || [];
      
      // Calculate stats
      const totalAnalyses = analyses.length;
      const averageScore = totalAnalyses > 0 
        ? Math.round(analyses.reduce((sum: number, a: any) => sum + a.fitScore, 0) / totalAnalyses)
        : 0;
      const bestScore = totalAnalyses > 0 
        ? Math.max(...analyses.map((a: any) => a.fitScore))
        : 0;
      
      // Calculate this month's analyses
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const thisMonth = analyses.filter((a: any) => {
        const analysisDate = new Date(a.createdAt);
        return analysisDate.getMonth() === currentMonth && analysisDate.getFullYear() === currentYear;
      }).length;

      setStats({
        totalAnalyses,
        averageScore,
        bestScore,
        thisMonth
      });

      // Set recent analyses (last 5)
      setRecentAnalyses(analyses.slice(0, 5));
      
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
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
        <div className="min-h-screen bg-section-even">
          <main className="pt-20 pb-12">
            <div className="container">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-primary-black">Dashboard</h1>
                <p className="text-charcoal mt-2">Welcome back! Here's your resume analysis overview.</p>
              </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="glass-card p-6 rounded-xl shadow-premium-md">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-light-gray">
                  <svg className="h-6 w-6 text-charcoal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-medium-gray">Total Analyses</p>
                  <p className="text-2xl font-bold text-primary-black">{stats.totalAnalyses}</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 rounded-xl shadow-premium-md">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-light-gray">
                  <svg className="h-6 w-6 text-charcoal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-medium-gray">Average Score</p>
                  <p className="text-2xl font-bold text-primary-black">{stats.averageScore}%</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 rounded-xl shadow-premium-md">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-light-gray">
                  <svg className="h-6 w-6 text-charcoal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-medium-gray">Best Score</p>
                  <p className="text-2xl font-bold text-primary-black">{stats.bestScore}%</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 rounded-xl shadow-premium-md">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-light-gray">
                  <svg className="h-6 w-6 text-charcoal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-medium-gray">This Month</p>
                  <p className="text-2xl font-bold text-primary-black">{stats.thisMonth}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Link href="/analyze" className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow group">
              <div className="text-center">
                <div className="w-12 h-12 bg-black rounded-lg mx-auto mb-4 flex items-center justify-center group-hover:bg-gray-900">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Analyze Resume</h3>
                <p className="text-gray-600 text-sm">Upload your resume and get AI-powered analysis</p>
              </div>
            </Link>

            <Link href="/analysis-history" className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow group">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-lg mx-auto mb-4 flex items-center justify-center group-hover:bg-blue-700">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">View History</h3>
                <p className="text-gray-600 text-sm">Browse your previous resume analyses</p>
              </div>
            </Link>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Generate Report</h3>
                <p className="text-gray-600 text-sm">Export detailed PDF reports (Coming Soon)</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass-card p-6 rounded-xl shadow-premium-md">
              <h2 className="text-xl font-semibold text-primary-black mb-4">Recent Activity</h2>
              {recentAnalyses.length > 0 ? (
                <div className="space-y-3">
                  {recentAnalyses.map((analysis) => (
                    <div key={analysis._id} className="flex items-center justify-between p-3 bg-off-white rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-primary-black truncate">{analysis.resumeFileName}</p>
                        <p className="text-sm text-medium-gray">{new Date(analysis.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          analysis.fitScore >= 80 ? 'bg-charcoal text-pure-white' :
                          analysis.fitScore >= 60 ? 'bg-medium-gray text-primary-black' :
                          'bg-light-gray text-charcoal'
                        }`}>
                          {analysis.fitScore}%
                        </span>
                        <Link 
                          href={`/analysis-history?id=${analysis._id}`}
                          className="text-primary-black hover:text-charcoal text-sm font-medium transition-colors"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-medium-gray">No recent activity found.</p>
              )}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Getting Started</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">1</div>
                  <div>
                    <h4 className="font-medium text-gray-900">Upload Your Resume</h4>
                    <p className="text-sm text-gray-600">Upload PDF or DOCX format</p>
                  </div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">2</div>
                <div>
                  <h4 className="font-medium text-gray-900">Add Job Description</h4>
                  <p className="text-sm text-gray-600">Paste the target job posting</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">3</div>
                <div>
                  <h4 className="font-medium text-gray-900">Get AI Analysis</h4>
                  <p className="text-sm text-gray-600">Receive detailed fit score and suggestions</p>
                </div>
              </div>
            </div>
          </div>
            </div>
          </main>
        </div>
      </RootLayout>
    </ProtectedRoute>
  )
}
