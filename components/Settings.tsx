'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

const Settings: React.FC = () => {
  const { userRole, logout, switchRole } = useAuth();
  const router = useRouter();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleSwitchRole = () => {
    setIsConfirmOpen(true);
  };

  const confirmSwitchRole = () => {
    switchRole();

    // Redirect to the appropriate page
    if (userRole === 'passenger') {
      // Currently passenger, switching to driver
      router.push('/driver');
    } else {
      // Currently driver, switching to passenger
      router.push('/');
    }

    setIsConfirmOpen(false);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-black mb-6">Settings</h1>

      <div className="bg-white p-4 rounded-lg shadow-md mb-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-medium text-black">Current Role</h2>
            <p className="text-gray-600 capitalize">{userRole}</p>
          </div>
          <button
            onClick={handleSwitchRole}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Switch to {userRole === 'passenger' ? 'Driver' : 'Passenger'} Mode
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md mb-4">
        <h2 className="text-lg font-medium text-black mb-2">Account</h2>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Log Out
        </button>
      </div>

      {isConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-bold text-black mb-2">Switch Role?</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to switch to {userRole === 'passenger' ? 'Driver' : 'Passenger'}{' '}
              mode?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsConfirmOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmSwitchRole}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Switch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
