'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import TaxiSelectedPage from '@/components/TaxiSelectedPage';

export default function TaxiSelected() {
  const { isLoggedIn, userRole } = useAuth();
  const router = useRouter();

  // Redirect if not logged in as a passenger
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/');
    } else if (userRole !== 'passenger') {
      router.push('/driver');
    }
  }, [isLoggedIn, userRole, router]);

  // Show loading or redirect if not logged in
  if (!isLoggedIn || userRole !== 'passenger') {
    return <div className="flex justify-center items-center h-screen">Redirecting...</div>;
  }

  return (
    <main>
      <TaxiSelectedPage />
    </main>
  );
}
