"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AutocompleteInput } from "@/components/AutocompleteInput";
import { useLoadGoogleMaps } from "@/hooks/useLoadGoogleMaps";
import { useRouter } from "next/navigation";
import ImageWithOverlay from "@/components/ImageWithOverlay";

const Homepage: React.FC = () => {
  const [fromPlace, setFromPlace] =
    useState<google.maps.places.PlaceResult | null>(null);
  const [toPlace, setToPlace] = useState<google.maps.places.PlaceResult | null>(
    null
  );
  const isLoaded = useLoadGoogleMaps();
  const router = useRouter();

  // Log the selected places (you can remove this if not needed)
  React.useEffect(() => {
    if (fromPlace) {
      console.log("From place selected:", fromPlace);
    }
    if (toPlace) {
      console.log("To place selected:", toPlace);
    }
  }, [fromPlace, toPlace]);

  const handleAutoSelect = () => {
    router.push("/auto-selected");
  };

  const handleTaxiSelect = () => {
    router.push("/taxi-selected");
  };

  if (!isLoaded) {
    return (
      <div className="flex w-full h-screen items-center justify-center">
        <p>Loading map services...</p>
      </div>
    );
  }

  return (
    <div className="flex w-full h-screen">
      <div className="flex flex-col w-2/5 p-6 gap-4 bg-white">
        <h1 className="text-3xl font-bold mb-6 text-black text-center">
          Campus Commute
        </h1>
        <div className="mb-6 justify-between flex">
          <button className="mr-4 px-4 py-2 bg-blue-500 text-white rounded-md">
            Daily Rides
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
            Book Rides
          </button>
        </div>

        <AutocompleteInput
          className=" text-black"
          placeholder="From"
          onPlaceSelected={setFromPlace}
        />
        <AutocompleteInput
          className=" text-black"
          placeholder="To"
          onPlaceSelected={setToPlace}
        />

        {/* Display selected locations if you want */}
        {fromPlace && (
          <p className="text-sm text-gray-600">From: {fromPlace.name}</p>
        )}
        {toPlace && <p className="text-sm text-gray-600">To: {toPlace.name}</p>}

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
            <Image
              src="/taxi_icon.png"
              width={70}
              height={70}
              alt="Taxi Icon"
              className="ml-3"
            />
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
