'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Homepage from '@/components/Homepage';
import LoginPage from '@/components/LoginPage';

export default function Home() {
  const { isLoggedIn, userRole } = useAuth();
  const router = useRouter();

  // Redirect driver to driver page if they somehow end up here
  useEffect(() => {
    if (isLoggedIn && userRole === 'driver') {
      router.push('/driver');
    }
  }, [isLoggedIn, userRole, router]);

  // If not logged in, show the login page
  if (!isLoggedIn) {
    return <LoginPage />;
  }

  // Otherwise show passenger homepage
  return (
    <main>
      <Homepage />
    </main>
  );
}
