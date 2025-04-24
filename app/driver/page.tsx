'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import DriverHomepage from '@/components/DriverHomepage';
import LoginPage from '@/components/LoginPage';

export default function DriverPage() {
  const { isLoggedIn, userRole } = useAuth();
  const router = useRouter();

  // Redirect passenger to main page if they somehow end up here
  useEffect(() => {
    if (isLoggedIn && userRole === 'passenger') {
      router.push('/');
    }
  }, [isLoggedIn, userRole, router]);

  // If not logged in, show the login page
  if (!isLoggedIn) {
    return <LoginPage />;
  }

  // Otherwise show driver homepage
  return (
    <main>
      <DriverHomepage />
    </main>
  );
}
