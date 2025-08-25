"use client"
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const handleNavigation = (sectionId: string) => {
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
          </nav>

          <div className="hidden md:flex space-x-4">
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
          </div>
        </div>
      )}
    </header>
  )
}
