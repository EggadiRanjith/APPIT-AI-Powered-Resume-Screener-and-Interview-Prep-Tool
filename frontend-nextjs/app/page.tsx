import Head from 'next/head'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import Features from '@/components/Features'
import HowItWorks from '@/components/HowItWorks'
import About from '@/components/About'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
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
