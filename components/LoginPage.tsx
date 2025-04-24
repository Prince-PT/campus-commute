'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeRole, setActiveRole] = useState<'passenger' | 'driver' | null>(null);

  const handleRoleSelection = (role: 'passenger' | 'driver') => {
    setActiveRole(role);
    setIsLoading(true);

    // Short timeout to show loading state for better UX
    setTimeout(() => {
      login(role);

      // Redirect to appropriate page based on role
      if (role === 'passenger') {
        router.push('/');
      } else {
        router.push('/driver');
      }
    }, 800);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="relative h-44">
          <Image
            src="/LNM.png"
            fill
            style={{ objectFit: 'cover' }}
            alt="Campus"
            priority
            className="brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/30 to-blue-800/70 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-white text-center drop-shadow-lg">
              Campus Commute
            </h1>
          </div>
        </div>

        <div className="p-8">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
            Choose Your Role
          </h2>

          <p className="text-gray-600 text-center mb-8">
            Select how you want to use the Campus Commute service
          </p>

          <div className="space-y-5">
            <button
              onClick={() => handleRoleSelection('passenger')}
              disabled={isLoading}
              className={`w-full py-4 px-5 rounded-lg transition duration-200 flex items-center justify-between border-2 
                ${
                  activeRole === 'passenger'
                    ? 'bg-blue-500 border-blue-600 text-white'
                    : 'bg-white border-gray-300 text-gray-800 hover:bg-blue-50 hover:border-blue-300'
                } 
                ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <span className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="text-lg font-medium">Continue as Passenger</span>
              </span>
              {isLoading && activeRole === 'passenger' ? (
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-500">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <button
              onClick={() => handleRoleSelection('driver')}
              disabled={isLoading}
              className={`w-full py-4 px-5 rounded-lg transition duration-200 flex items-center justify-between border-2 
                ${
                  activeRole === 'driver'
                    ? 'bg-green-600 border-green-700 text-white'
                    : 'bg-white border-gray-300 text-gray-800 hover:bg-green-50 hover:border-green-300'
                } 
                ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <span className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7h8m-8 5h8m-4 3v3m0-6v-3M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"
                  />
                </svg>
                <span className="text-lg font-medium">Continue as Driver</span>
              </span>
              {isLoading && activeRole === 'driver' ? (
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="px-8 py-4 bg-gray-50 border-t border-gray-100">
          <p className="text-xs text-center text-gray-500">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-600 font-medium text-lg">Affordable Cab Rides at LNMIIT</p>
      </div>
    </div>
  );
};

export default LoginPage;
