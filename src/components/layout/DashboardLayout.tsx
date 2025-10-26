'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import Header from './Header';
import Sidebar from './Sidebar';
import Script from 'next/script';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, initAuth } = useAuthStore();

  useEffect(() => {
    initAuth();
    
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, initAuth, router]);

  if (!isAuthenticated) {
    return null; // 或者显示 loading
  }

  return (
    <>
      {/* Font Awesome */}
      <Script 
        src="https://unpkg.byted-static.com/fortawesome/fontawesome-free/6.7.2/js/all.min.js" 
        data-auto-replace-svg="nest"
      />
      
      <div className="min-h-screen bg-bg-light">
        <Header />
        <Sidebar />
        <main className="ml-64 mt-16 p-8 min-h-screen">
          {children}
        </main>
      </div>
    </>
  );
}

