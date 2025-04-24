'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Settings from '@/components/Settings';
import LoginPage from '@/components/LoginPage';

export default function SettingsPage() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);

  // If not logged in, show the login page instead of redirecting
  if (!isLoggedIn) {
    return <LoginPage />;
  }

  return (
    <main>
      <Settings />
    </main>
  );
}
