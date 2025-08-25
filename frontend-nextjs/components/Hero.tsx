'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Hero() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleAnalyzeClick = () => {
    if (isAuthenticated) {
      router.push('/analyze');
    } else {
      router.push('/login?redirect=/analyze');
    }
  };

  const handleHistoryClick = () => {
    if (isAuthenticated) {
      router.push('/analysis-history');
    } else {
      router.push('/login?redirect=/analysis-history');
    }
  };

  return (
    <section className="relative min-h-screen flex items-center hero-gradient">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] blur-3xl rounded-full bg-gradient-to-r from-gray-200 to-gray-300 opacity-30 -top-48 -left-48 animate-float" />
        <div className="absolute w-[300px] h-[300px] blur-2xl rounded-full bg-gradient-to-r from-gray-300 to-gray-400 opacity-20 top-1/2 right-0" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h1 className="font-jakarta text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight">
            <span className="block text-gradient mb-4">AI-Powered</span>
            <span className="block">Resume Screening</span>
          </h1>
          
          <p className="mt-8 text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto font-inter leading-relaxed">
            Get instant feedback, job compatibility scores, and interview prep - all powered by advanced AI
          </p>

          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6">
            <button 
              onClick={handleAnalyzeClick}
              className="group glass-card px-8 py-4 rounded-xl text-black hover:bg-black hover:text-white transition-all duration-500"
            >
              {isAuthenticated ? 'Upload Resume & Analyze' : 'Get Started - Analyze Resume'}
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
            </button>
            <button 
              onClick={handleHistoryClick}
              className="px-8 py-4 rounded-xl border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-500"
            >
              {isAuthenticated ? 'Check Previous Results' : 'View Sample Results'}
            </button>
          </div>

          {!isAuthenticated && (
            <p className="mt-6 text-sm text-gray-500">
              Already have an account? <Link href="/login" className="text-black hover:underline font-medium">Sign in</Link>
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
