'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ImageWithOverlay from '@/components/ImageWithOverlay';
import { RideRequest } from '@/types/RideTypes';

const RideDetailsPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [ride, setRide] = useState<RideRequest | null>(null);
  const [rideStatus, setRideStatus] = useState<'picking_up' | 'in_progress' | 'completed'>(
    'picking_up'
  );
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  const rideId = searchParams.get('id');

  // Simulate fetching ride details
  useEffect(() => {
    if (rideId) {
      // In a real app, you would fetch details from an API
      const mockRide: RideRequest = {
        id: rideId,
        passengerName: 'Student',
        from: 'Academic Block',
        to: 'Boys Hostel',
        fare: '₹50',
        distance: '1.2 km',
        time: '5 mins',
        type: 'auto',
      };

      setRide(mockRide);
    }
  }, [rideId]);

  // Timer for the ride
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (rideStatus !== 'completed') {
      timer = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [rideStatus]);

  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePickedUp = () => {
    setRideStatus('in_progress');
    setElapsedTime(0); // Reset timer for the actual ride
  };

  const handleCompleteRide = () => {
    setRideStatus('completed');
  };

  const handleBackToHome = () => {
    router.push('/driver');
  };

  if (!ride) {
    return <div className="flex justify-center items-center h-screen">Loading ride details...</div>;
  }

  return (
    <div className="flex w-full h-screen">
      <div className="flex flex-col w-2/5 p-6 gap-4 bg-white">
        <h1 className="text-3xl font-bold mb-2 text-black text-center">Ride Details</h1>

        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <div className="flex justify-between mb-3">
            <h2 className="text-lg font-semibold text-black">
              {rideStatus === 'picking_up'
                ? 'Picking up passenger'
                : rideStatus === 'in_progress'
                  ? 'Ride in progress'
                  : 'Ride completed'}
            </h2>
            <div className="rounded-full bg-blue-100 px-3 py-1 text-blue-800 text-sm font-medium">
              {formatTime(elapsedTime)}
            </div>
          </div>

          <div className="flex items-center mb-3">
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
              <span className="font-medium">S</span>
            </div>
            <div>
              <p className="font-medium text-black">{ride.passengerName}</p>
              <p className="text-gray-600 text-sm">Passenger</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <h3 className="font-medium text-black mb-2">Journey Details</h3>
          <div className="flex items-start mb-3">
            <div className="mt-1 mr-3">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Pickup</p>
              <p className="text-black">{ride.from}</p>
            </div>
          </div>

          <div className="border-l-2 border-dashed border-gray-300 h-6 ml-1.5 pl-8 -mt-2 mb-1"></div>

          <div className="flex items-start">
            <div className="mt-1 mr-3">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Destination</p>
              <p className="text-black">{ride.to}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Fare</p>
              <p className="text-xl font-semibold text-black">{ride.fare}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Distance</p>
              <p className="text-black font-medium">{ride.distance}</p>
            </div>
          </div>
        </div>

        {rideStatus === 'picking_up' && (
          <button
            onClick={handlePickedUp}
            className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Picked Up Passenger
          </button>
        )}

        {rideStatus === 'in_progress' && (
          <button
            onClick={handleCompleteRide}
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Complete Ride
          </button>
        )}

        {rideStatus === 'completed' && (
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <span className="text-green-600 text-xl">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-green-800">Ride Completed!</h3>
                  <p className="text-sm text-green-600">Payment collected: {ride.fare}</p>
                </div>
              </div>
            </div>
            <button
              onClick={handleBackToHome}
              className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Back to Home
            </button>
          </div>
        )}
      </div>

      <div className="w-3/5 h-full">
        <ImageWithOverlay src="/LNM.png" alt="Ride Map" />
      </div>
    </div>
  );
};

export default RideDetailsPage;
