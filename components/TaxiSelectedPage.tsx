import React from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import ImageWithOverlay from '@/components/ImageWithOverlay';
import { useSearchParams } from 'next/navigation';

const TaxiSelectedPage = () => {
  const [fromPlace, setFromPlace] = useState<string>('');
  const [toPlace, setToPlace] = useState<string>('');
  const [fare, setFare] = useState<string>('');

  // Get the URL search parameters
  const searchParams = useSearchParams();

  // Load the from and to values from URL parameters
  useEffect(() => {
    const fromParam = searchParams.get('from');
    const toParam = searchParams.get('to');

    if (fromParam) setFromPlace(fromParam);
    if (toParam) setToPlace(toParam);
  }, [searchParams]);

  // Log the input values when they change
  useEffect(() => {
    if (fromPlace) {
      console.log('From place entered:', fromPlace);
    }
    if (toPlace) {
      console.log('To place entered:', toPlace);
    }
  }, [fromPlace, toPlace]);

  const handleFareChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFare(e.target.value);
    console.log('Fare amount:', e.target.value);
  };

  return (
    <div className="flex w-full h-screen">
      <div className="flex flex-col w-2/5 p-6 gap-4 bg-white">
        <h1 className="text-3xl font-bold mb-6 text-black text-center">Campus Commute</h1>
        <div className="flex items-center justify-center">
          <Image src="/taxi_icon.png" width={70} height={70} alt="Taxi Icon" className="ml-3" />
          <h1 className="text-2xl text-black ml-8">Taxi</h1>
        </div>

        {/* Simple text inputs with pre-filled values */}
        <input
          type="text"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black mb-4"
          placeholder="From"
          value={fromPlace}
          onChange={e => setFromPlace(e.target.value)}
        />
        <input
          type="text"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black mb-4"
          placeholder="To"
          value={toPlace}
          onChange={e => setToPlace(e.target.value)}
        />

        {/* Fare input with similar styling */}
        <div className="relative w-full mb-4">
          <input
            type="text"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            placeholder="Fare (₹)"
            value={fare}
            onChange={handleFareChange}
          />
        </div>

        {/* Display entered locations */}
        {fromPlace && <p className="text-sm text-gray-600">From: {fromPlace}</p>}
        {toPlace && <p className="text-sm text-gray-600">To: {toPlace}</p>}

        {/* Book button */}
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          onClick={() => console.log('Booking taxi with fare:', fare)}
        >
          Book Taxi
        </button>
      </div>
      <div className="w-3/5 h-full">
        <ImageWithOverlay src="/LNM.png" alt="LNMIIT Image" />
      </div>
    </div>
  );
};

export default TaxiSelectedPage;
