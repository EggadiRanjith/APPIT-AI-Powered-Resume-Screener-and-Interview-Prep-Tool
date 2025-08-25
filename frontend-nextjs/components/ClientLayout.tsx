'use client';

import { AuthProvider } from '@/contexts/AuthContext';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="fixed inset-0 bg-premium-white overflow-hidden">
        <div className="absolute inset-0 pattern-grid" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent" />
      </div>
      <AuthProvider>
        {children}
      </AuthProvider>
    </>
  );
}
