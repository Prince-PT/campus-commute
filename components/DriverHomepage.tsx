'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ImageWithOverlay from '@/components/ImageWithOverlay';
import { Toast } from '@/components/ui/Toast';
import { RideRequest } from '@/types/RideTypes';
import { useAuth } from '@/contexts/AuthContext';

const DriverHomepage: React.FC = () => {
  const { logout } = useAuth();
  const router = useRouter();
  const [isOnline, setIsOnline] = useState(false);
  const [currentLocation] = useState<string>('LNMIIT Campus');
  const [showToast, setShowToast] = useState<boolean>(false);
  const [currentRequest, setCurrentRequest] = useState<RideRequest | null>(null);
  const [rideRequests, setRideRequests] = useState<RideRequest[]>([]);

  // Simulate receiving a ride request
  useEffect(() => {
    if (isOnline) {
      const timer = setTimeout(() => {
        const newRequest: RideRequest = {
          id: `ride-${Date.now()}`,
          passengerName: 'Student',
          from: 'Academic Block',
          to: 'Boys Hostel',
          fare: '₹50',
          distance: '1.2 km',
          time: '5 mins',
          type: Math.random() > 0.5 ? 'auto' : 'taxi',
        };

        setCurrentRequest(newRequest);
        setShowToast(true);

        // Add sound effect
        const audio = new Audio('/notification-sound.mp3');
        audio.play();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isOnline]); // Removed rideRequests from dependencies

  const handleGoOnline = () => {
    setIsOnline(true);
  };

  const handleGoOffline = () => {
    setIsOnline(false);
  };

  const handleAcceptRide = () => {
    if (currentRequest) {
      setRideRequests([...rideRequests, currentRequest]);
      setShowToast(false);
      router.push(`/driver/ride-details?id=${currentRequest.id}`);
    }
  };

  const handleRejectRide = () => {
    setShowToast(false);
    setCurrentRequest(null);
  };

  function handleLogout(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    event.preventDefault();
    logout(); // Use the AuthContext's logout method
    router.push('/'); // Redirect to the root page which handles auth state
  }

  return (
    <div className="flex w-full h-screen">
      <div className="flex flex-col w-2/5 p-6 gap-4 bg-white">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-black">
            Campus Commute <span className="text-xl">Driver</span>
          </h1>
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

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div
              className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'} mr-2`}
            ></div>
            <p className="text-lg font-medium text-black">{isOnline ? 'Online' : 'Offline'}</p>
          </div>

          {isOnline ? (
            <button
              onClick={handleGoOffline}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            >
              Go Offline
            </button>
          ) : (
            <button
              onClick={handleGoOnline}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              Go Online
            </button>
          )}
        </div>

        <div className="bg-gray-100 p-3 rounded-lg mb-4">
          <p className="text-black text-lg mb-1">Current Location:</p>
          <div className="flex items-center">
            <Image src="/Location-pin.png" width={24} height={24} alt="Location" className="mr-2" />
            <p className="text-black">{currentLocation}</p>
          </div>
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-semibold text-black mb-3">Your Vehicle</h2>
          <div className="flex items-center bg-gray-100 p-4 rounded-lg">
            <Image src="/auto_icon.png" width={80} height={80} alt="Vehicle" className="mr-4" />
            <div>
              <h3 className="text-lg font-medium text-black">Auto #A-123</h3>
              <p className="text-gray-600">Status: {isOnline ? 'Available' : 'Unavailable'}</p>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-semibold text-black mb-3">Recent Rides</h2>
          {rideRequests.length > 0 ? (
            rideRequests.map((ride, index) => (
              <div key={index} className="mb-3 bg-gray-100 p-3 rounded-lg">
                <div className="flex justify-between">
                  <p className="text-black font-medium">
                    {ride.from} → {ride.to}
                  </p>
                  <p className="text-green-600 font-medium">{ride.fare}</p>
                </div>
                <p className="text-gray-600 text-sm">Distance: {ride.distance}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">No recent rides</p>
          )}
        </div>
      </div>

      <div className="w-3/5 h-full">
        <ImageWithOverlay src="/LNM.png" alt="Campus Map" />
      </div>

      {showToast && currentRequest && (
        <Toast
          title={`New ${currentRequest.type === 'auto' ? 'Auto' : 'Taxi'} Ride Request!`}
          description={`From ${currentRequest.from} to ${currentRequest.to}`}
          fare={currentRequest.fare}
          distance={currentRequest.distance}
          time={currentRequest.time}
          onAccept={handleAcceptRide}
          onReject={handleRejectRide}
        />
      )}
    </div>
  );
};

export default DriverHomepage;
