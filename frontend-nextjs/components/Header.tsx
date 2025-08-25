"use client"
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const { isAuthenticated, user, logout } = useAuth()

  const handleNavigation = (sectionId: string) => {
    // If not on home page, navigate to home first
    if (window.location.pathname !== '/') {
      router.push(`/#${sectionId}`)
      setIsMenuOpen(false)
      return
    }
    
    // If on home page, scroll to section
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  return (
    <header className="fixed w-full glass-effect border-b border-light-gray z-50">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary-black hover:text-charcoal transition-colors">
            ResumeAI
          </Link>

          <nav className="hidden md:flex space-x-8">
            {isAuthenticated ? (
              <>
                <Link 
                  href="/" 
                  className="nav-link"
                >
                  Home
                </Link>
                <Link 
                  href="/dashboard" 
                  className="nav-link"
                >
                  Dashboard
                </Link>
                <Link 
                  href="/analyze" 
                  className="nav-link"
                >
                  Analyze Resume
                </Link>
                <Link 
                  href="/analysis-history" 
                  className="nav-link"
                >
                  History
                </Link>
              </>
            ) : (
              <>
                <Link 
                  href="/" 
                  className="nav-link"
                >
                  Home
                </Link>
                <button 
                  onClick={() => handleNavigation('features')}
                  className="nav-link"
                >
                  Features
                </button>
                <button 
                  onClick={() => handleNavigation('howItWorks')}
                  className="nav-link"
                >
                  How It Works
                </button>
                <button 
                  onClick={() => handleNavigation('about')}
                  className="nav-link"
                >
                  About
                </button>
              </>
            )}
          </nav>

          <div className="hidden md:flex space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <span className="text-medium-gray">Hi, {user?.name}</span>
                <button 
                  onClick={logout}
                  className="btn-secondary text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="px-4 py-2 text-medium-gray hover:text-primary-black transition-colors"
                >
                  Login
                </Link>
                <Link 
                  href="/signup" 
                  className="btn-primary text-sm"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-primary-black hover:text-charcoal transition-colors"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-light-gray glass-effect">
          <div className="px-4 py-2 space-y-1">
            {isAuthenticated ? (
              <>
                <Link 
                  href="/"
                  className="block py-2 nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  href="/dashboard"
                  className="block py-2 nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  href="/analyze"
                  className="block py-2 nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Analyze Resume
                </Link>
                <Link 
                  href="/analysis-history"
                  className="block py-2 nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  History
                </Link>
                <div className="block py-2 text-medium-gray">
                  Hi, {user?.name}
                </div>
                <button 
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-primary-black hover:text-charcoal transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/"
                  className="block py-2 nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <button 
                  onClick={() => handleNavigation('features')}
                  className="block w-full text-left py-2 nav-link"
                >
                  Features
                </button>
                <button 
                  onClick={() => handleNavigation('howItWorks')}
                  className="block w-full text-left py-2 nav-link"
                >
                  How It Works
                </button>
                <button 
                  onClick={() => handleNavigation('about')}
                  className="block w-full text-left py-2 nav-link"
                >
                  About
                </button>
                <Link 
                  href="/login"
                  className="block py-2 nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  href="/signup"
                  className="block py-2 nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
