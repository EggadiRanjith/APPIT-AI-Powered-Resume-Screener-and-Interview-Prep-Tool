'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import PublicRoute from '@/components/PublicRoute';
import RootLayout from '@/components/layouts/RootLayout'

export default function SignupPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [passwordValidation, setPasswordValidation] = useState({
    hasCapital: false,
    hasNumber: false,
    hasSymbol: false,
    hasMinLength: false
  });

  const { name, email, password } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Validate password in real-time
    if (name === 'password') {
      validatePassword(value);
    }
  };

  const validatePassword = (password: string) => {
    setPasswordValidation({
      hasCapital: /[A-Z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSymbol: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
      hasMinLength: password.length >= 8
    });
  };

  const isPasswordValid = passwordValidation.hasCapital && 
                         passwordValidation.hasNumber && 
                         passwordValidation.hasSymbol && 
                         passwordValidation.hasMinLength;

  const isFormValid = name.trim() !== '' && 
                     email.trim() !== '' && 
                     password.trim() !== '' && 
                     isPasswordValid;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      const success = await register(name, email, password);
      
      if (success) {
        setSuccess('Account created successfully! Please login.');
        setFormData({ name: '', email: '', password: '' });
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.msg || 'Registration failed';
      
      // If user already exists, show message and redirect to login
      if (errorMessage === 'User already exists' || errorMessage.toLowerCase().includes('already exists')) {
        setError('User already exists. Redirecting to login page...');
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        setError(errorMessage);
      }
    }
  };

  return (
    <PublicRoute>
      <RootLayout>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
              Create your account
            </h2>
            {error && (
              <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}
            {success && (
              <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                {success}
              </div>
            )}
          </div>
          <form className="mt-8 space-y-6" onSubmit={onSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                  placeholder="Full name"
                  value={name}
                  onChange={onChange}
                />
              </div>
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={onChange}
                />
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={onChange}
                />
              </div>
            </div>

            {/* Password Requirements */}
            {password && (
              <div className="mt-4 p-3 bg-gray-50 rounded-md">
                <p className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</p>
                <ul className="text-xs space-y-1">
                  <li className={`flex items-center ${passwordValidation.hasMinLength ? 'text-green-600' : 'text-red-600'}`}>
                    <span className="mr-2">{passwordValidation.hasMinLength ? '✓' : '✗'}</span>
                    At least 8 characters
                  </li>
                  <li className={`flex items-center ${passwordValidation.hasCapital ? 'text-green-600' : 'text-red-600'}`}>
                    <span className="mr-2">{passwordValidation.hasCapital ? '✓' : '✗'}</span>
                    One uppercase letter
                  </li>
                  <li className={`flex items-center ${passwordValidation.hasNumber ? 'text-green-600' : 'text-red-600'}`}>
                    <span className="mr-2">{passwordValidation.hasNumber ? '✓' : '✗'}</span>
                    One number
                  </li>
                  <li className={`flex items-center ${passwordValidation.hasSymbol ? 'text-green-600' : 'text-red-600'}`}>
                    <span className="mr-2">{passwordValidation.hasSymbol ? '✓' : '✗'}</span>
                    One special character (!@#$%^&*)
                  </li>
                </ul>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={!isFormValid}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isFormValid 
                    ? 'text-white bg-black hover:bg-gray-900 focus:ring-black cursor-pointer' 
                    : 'text-gray-400 bg-gray-300 cursor-not-allowed'
                }`}
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
      </RootLayout>
    </PublicRoute>
  )
}
