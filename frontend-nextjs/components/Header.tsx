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
    <header className="fixed w-full bg-white border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            ResumeAI
          </Link>

          <nav className="hidden md:flex space-x-8">
            {isAuthenticated ? (
              <>
                <Link 
                  href="/" 
                  className="text-gray-600 hover:text-black"
                >
                  Home
                </Link>
                <Link 
                  href="/dashboard" 
                  className="text-gray-600 hover:text-black"
                >
                  Dashboard
                </Link>
                <Link 
                  href="/analyze" 
                  className="text-gray-600 hover:text-black"
                >
                  Analyze Resume
                </Link>
                <Link 
                  href="/analysis-history" 
                  className="text-gray-600 hover:text-black"
                >
                  History
                </Link>
              </>
            ) : (
              <>
                <Link 
                  href="/" 
                  className="text-gray-600 hover:text-black"
                >
                  Home
                </Link>
                <button 
                  onClick={() => handleNavigation('features')}
                  className="text-gray-600 hover:text-black"
                >
                  Features
                </button>
                <button 
                  onClick={() => handleNavigation('howItWorks')}
                  className="text-gray-600 hover:text-black"
                >
                  How It Works
                </button>
                <button 
                  onClick={() => handleNavigation('about')}
                  className="text-gray-600 hover:text-black"
                >
                  About
                </button>
              </>
            )}
          </nav>

          <div className="hidden md:flex space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <span className="text-gray-600">Hi, {user?.name}</span>
                <button 
                  onClick={logout}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="px-4 py-2 text-gray-600 hover:text-black"
                >
                  Login
                </Link>
                <Link 
                  href="/signup" 
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-2 space-y-1">
            {isAuthenticated ? (
              <>
                <Link 
                  href="/"
                  className="block py-2 text-gray-600 hover:text-black"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  href="/dashboard"
                  className="block py-2 text-gray-600 hover:text-black"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  href="/analyze"
                  className="block py-2 text-gray-600 hover:text-black"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Analyze Resume
                </Link>
                <Link 
                  href="/analysis-history"
                  className="block py-2 text-gray-600 hover:text-black"
                  onClick={() => setIsMenuOpen(false)}
                >
                  History
                </Link>
                <div className="block py-2 text-gray-600">
                  Hi, {user?.name}
                </div>
                <button 
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-red-600 hover:text-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/"
                  className="block py-2 text-gray-600 hover:text-black"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <button 
                  onClick={() => handleNavigation('features')}
                  className="block w-full text-left py-2 text-gray-600 hover:text-black"
                >
                  Features
                </button>
                <button 
                  onClick={() => handleNavigation('howItWorks')}
                  className="block w-full text-left py-2 text-gray-600 hover:text-black"
                >
                  How It Works
                </button>
                <button 
                  onClick={() => handleNavigation('about')}
                  className="block w-full text-left py-2 text-gray-600 hover:text-black"
                >
                  About
                </button>
                <Link 
                  href="/login"
                  className="block py-2 text-gray-600 hover:text-black"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  href="/signup"
                  className="block py-2 text-gray-600 hover:text-black"
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
