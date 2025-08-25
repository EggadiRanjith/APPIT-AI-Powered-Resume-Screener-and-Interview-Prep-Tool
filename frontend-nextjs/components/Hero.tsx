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
    <section className="relative min-h-screen flex items-center bg-hero-gradient">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] blur-3xl rounded-full bg-gradient-to-r from-black/5 to-black/10 opacity-40 -top-48 -left-48 animate-float" />
        <div className="absolute w-[300px] h-[300px] blur-2xl rounded-full bg-gradient-to-r from-black/8 to-black/12 opacity-30 top-1/2 right-0" />
        <div className="absolute w-[200px] h-[200px] blur-xl rounded-full bg-black/5 opacity-50 bottom-20 left-1/4" />
      </div>
      
      <div className="container relative z-10">
        <div className="text-center">
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-none">
            <span className="block text-gradient mb-4 animate-float">AI-Powered</span>
            <span className="block text-primary-black">Resume Screening</span>
          </h1>
          
          <p className="mt-8 text-xl sm:text-2xl text-charcoal max-w-3xl mx-auto leading-relaxed font-light">
            Get instant feedback, job compatibility scores, and interview prep - all powered by advanced AI
          </p>

          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6">
            <button 
              onClick={handleAnalyzeClick}
              className="group btn-primary interactive-element shadow-premium-lg"
            >
              {isAuthenticated ? 'Upload Resume & Analyze' : 'Get Started - Analyze Resume'}
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
            </button>
            <button 
              onClick={handleHistoryClick}
              className="btn-secondary interactive-element shadow-premium-md"
            >
              {isAuthenticated ? 'Check Previous Results' : 'View Sample Results'}
            </button>
          </div>

          {!isAuthenticated && (
            <p className="mt-8 text-sm text-medium-gray">
              Already have an account? <Link href="/login" className="text-primary-black hover:text-charcoal font-medium transition-colors">Sign in</Link>
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
