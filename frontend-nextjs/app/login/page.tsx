'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import PublicRoute from '@/components/PublicRoute';
import RootLayout from '@/components/layouts/RootLayout'

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [redirectPath, setRedirectPath] = useState('/dashboard');

  useEffect(() => {
    const redirect = searchParams?.get('redirect');
    if (redirect) {
      setRedirectPath(redirect);
    }
  }, [searchParams]);

  const { email, password } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const success = await login(email, password);
      
      if (success) {
        router.push(redirectPath);
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (err: any) {
      setError(err.response?.data?.msg || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicRoute>
      <RootLayout>
        <div className="min-h-screen flex items-center justify-center bg-hero-gradient py-12">
          <div className="max-w-md w-full space-y-8">
            <div className="glass-card p-8 rounded-xl shadow-premium-lg">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-primary-black mb-8">Sign In</h2>
              </div>
              <form className="space-y-6" onSubmit={onSubmit}>
                {error && (
                  <div className="bg-light-gray border border-medium-gray text-charcoal px-4 py-3 rounded-lg">
                    ⚠️ {error}
                  </div>
                )}
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={onChange}
                    className="form-input"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-charcoal mb-2">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={onChange}
                    className="form-input"
                    placeholder="Enter your password"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`btn-primary w-full py-3 px-4 shadow-premium-md interactive-element ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </button>
              </form>

              <div className="text-center mt-6">
                <p className="text-sm text-medium-gray">
                  Don't have an account?{' '}
                  <a href="/signup" className="font-medium text-primary-black hover:text-charcoal transition-colors">
                    Sign up
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </RootLayout>
    </PublicRoute>
  )
}
