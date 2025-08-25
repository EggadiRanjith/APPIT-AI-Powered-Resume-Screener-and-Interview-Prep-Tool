'use client';

import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import RootLayout from '@/components/layouts/RootLayout';
import Link from 'next/link';

export default function DashboardPage() {
  const { user } = useAuth();
  return (
    <ProtectedRoute>
      <RootLayout>
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
              <p className="text-gray-600 mt-2">Here's your resume screening dashboard</p>
            </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Analyses', value: '0', color: 'text-blue-600' },
            { label: 'Average Score', value: '-', color: 'text-green-600' },
            { label: 'Best Score', value: '-', color: 'text-purple-600' },
            { label: 'This Month', value: '0', color: 'text-orange-600' }
          ].map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className={`text-2xl font-bold mt-2 ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
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
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recent Activity</h2>
              <Link href="/analysis-history" className="text-sm text-blue-600 hover:text-blue-800">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              <div className="text-center py-8 text-gray-500">
                <p>No recent activity</p>
                <Link href="/analyze" className="text-black hover:underline mt-2 inline-block">
                  Start your first analysis
                </Link>
              </div>
            </div>
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
          </div>
        </div>
      </RootLayout>
    </ProtectedRoute>
  )
}
