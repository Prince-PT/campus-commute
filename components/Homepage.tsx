'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ImageWithOverlay from '@/components/ImageWithOverlay';
import { useAuth } from '@/contexts/AuthContext';

const Homepage: React.FC = () => {
  const [fromPlace, setFromPlace] = useState<string>('');
  const [toPlace, setToPlace] = useState<string>('');
  const router = useRouter();
  const { logout } = useAuth();

  // Log the input values when they change
  React.useEffect(() => {
    if (fromPlace) {
      console.log('From place entered:', fromPlace);
    }
    if (toPlace) {
      console.log('To place entered:', toPlace);
    }
  }, [fromPlace, toPlace]);

  const handleAutoSelect = () => {
    // Pass the from and to parameters in the URL
    router.push(
      `/auto-selected?from=${encodeURIComponent(fromPlace)}&to=${encodeURIComponent(toPlace)}`
    );
  };

  const handleTaxiSelect = () => {
    // Pass the from and to parameters in the URL
    router.push(
      `/taxi-selected?from=${encodeURIComponent(fromPlace)}&to=${encodeURIComponent(toPlace)}`
    );
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="flex w-full h-screen">
      <div className="flex flex-col w-2/5 p-6 gap-4 bg-white">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-black">Campus Commute</h1>
          <div className="flex space-x-2">
            <button
              onClick={() => router.push('/settings')}
              className="text-sm px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Settings
            </button>
            <button
              onClick={handleLogout}
              className="text-sm px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Logout
            </button>
          </div>
        </div>
        <div className="mb-6 justify-between flex">
          <button className="mr-4 px-4 py-2 bg-blue-500 text-white rounded-md">Daily Rides</button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Book Rides</button>
        </div>

        {/* Simple text inputs instead of AutocompleteInput */}
        <input
          type="text"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black mb-4"
          placeholder="From"
          value={fromPlace}
          onChange={e => setFromPlace(e.target.value)}
        />
        <input
          type="text"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          placeholder="To"
          value={toPlace}
          onChange={e => setToPlace(e.target.value)}
        />

        {/* Display entered locations */}
        {fromPlace && <p className="text-sm text-gray-600">From: {fromPlace}</p>}
        {toPlace && <p className="text-sm text-gray-600">To: {toPlace}</p>}

        <p className="text-black text-2xl mt-2">Available Rides</p>
        <button
          onClick={handleAutoSelect}
          className="mt-4 px-4 py-2 bg-white text-white rounded-md flex border-solid border-2 border-gray-400 hover:bg-gray-100 transition-colors"
        >
          <div className="flex">
            <Image
              src="/auto_icon.png"
              width={100}
              height={100}
              alt="Auto Icon"
              className="flex flex-col"
            />
            <div className="flex flex-col ml-5">
              <h2 className="text-black text-xl">Auto</h2>
              <p className="text-gray-500">Available: 5</p>
              <p className="text-gray-500">Fare: ₹50</p>
            </div>
          </div>
        </button>
        <button
          onClick={handleTaxiSelect}
          className="mt-4 px-4 py-2 bg-white text-white rounded-md flex border-solid border-2 border-gray-400 hover:bg-gray-100 transition-colors"
        >
          <div className="flex">
            <Image src="/taxi_icon.png" width={70} height={70} alt="Taxi Icon" className="ml-3" />
            <div className="flex flex-col ml-8">
              <h2 className="text-black text-xl">Taxi</h2>
              <p className="text-gray-500">Available: 5</p>
              <p className="text-gray-500">Fare: ₹50</p>
            </div>
          </div>
        </button>
      </div>
      <div className="w-3/5 h-full">
        <ImageWithOverlay src="/LNM.png" alt="LNMIIT Image" />
      </div>
    </div>
  );
};

export default Homepage;
