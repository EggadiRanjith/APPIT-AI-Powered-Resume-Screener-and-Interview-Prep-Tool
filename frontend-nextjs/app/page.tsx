'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Head from 'next/head'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import Features from '@/components/Features'
import HowItWorks from '@/components/HowItWorks'
import About from '@/components/About'
import Footer from '@/components/Footer'

export default function Home() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  // Handle hash navigation for authenticated users
  useEffect(() => {
    if (!loading && isAuthenticated) {
      const hash = window.location.hash;
      if (hash) {
        // If there's a hash, scroll to that section after a brief delay
        setTimeout(() => {
          const element = document.getElementById(hash.substring(1));
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-hero-gradient">
        <div className="loading w-32 h-32 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hero-gradient">
      <Head>
        <title>ResumeAI - AI-Powered Resume Screening</title>
        <meta name="description" content="AI-powered resume screening and analysis" />
      </Head>

      <Header />
      <main className="pt-16"> {/* Added padding-top to account for fixed header */}
        <Hero />
        <section id="features">
          <Features />
        </section>
        <Stats />
        <section id="howItWorks">
          <HowItWorks />
        </section>
        <section id="about">
          <About />
        </section>
      </main>
      <Footer />
    </div>
  )
}
