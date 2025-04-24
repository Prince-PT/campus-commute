import React, { useEffect } from 'react';
import Image from 'next/image';

interface ToastProps {
  title: string;
  description: string;
  fare: string;
  distance: string;
  time: string;
  onAccept: () => void;
  onReject: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  title,
  description,
  fare,
  distance,
  time,
  onAccept,
  onReject,
}) => {
  // Auto-dismiss toast after 30 seconds if no action is taken
  useEffect(() => {
    const timer = setTimeout(() => {
      onReject();
    }, 30000);

    return () => clearTimeout(timer);
  }, [onReject]);

  return (
    <div className="fixed top-5 right-5 w-96 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Image src="/notification-icon.png" width={40} height={40} alt="Notification" />
          </div>
          <div className="ml-3 w-full">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold text-black">{title}</h3>
              <button onClick={onReject} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            <p className="mt-1 text-gray-600">{description}</p>

            <div className="mt-2 bg-gray-100 p-2 rounded flex justify-between">
              <div>
                <p className="text-gray-700 text-sm">Fare:</p>
                <p className="font-semibold text-black">{fare}</p>
              </div>
              <div>
                <p className="text-gray-700 text-sm">Distance:</p>
                <p className="font-semibold text-black">{distance}</p>
              </div>
              <div>
                <p className="text-gray-700 text-sm">ETA:</p>
                <p className="font-semibold text-black">{time}</p>
              </div>
            </div>

            <div className="mt-3 flex justify-between gap-3">
              <button
                onClick={onReject}
                className="flex-1 py-2 px-4 border border-red-500 text-red-500 rounded-md hover:bg-red-50 transition-colors"
              >
                Reject
              </button>
              <button
                onClick={onAccept}
                className="flex-1 py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
