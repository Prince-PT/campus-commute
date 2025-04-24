'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import RideDetailsPage from '@/components/RideDetailsPage';

export default function RideDetails() {
  const { isLoggedIn, userRole } = useAuth();
  const router = useRouter();

  // Redirect if not logged in as a driver
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/');
    } else if (userRole !== 'driver') {
      router.push('/');
    }
  }, [isLoggedIn, userRole, router]);

  // Show loading or redirect if not logged in
  if (!isLoggedIn || userRole !== 'driver') {
    return <div className="flex justify-center items-center h-screen">Redirecting...</div>;
  }

  return (
    <main>
      <RideDetailsPage />
    </main>
  );
}
