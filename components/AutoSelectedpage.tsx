import React from "react";
import { useLoadGoogleMaps } from "@/hooks/useLoadGoogleMaps";
import { useState } from "react";
import { AutocompleteInput } from "@/components/AutocompleteInput";
import Image from "next/image";
import ImageWithOverlay from "@/components/ImageWithOverlay";

const AutoSelectedpage = () => {
  const [fromPlace, setFromPlace] =
    useState<google.maps.places.PlaceResult | null>(null);
  const [toPlace, setToPlace] = useState<google.maps.places.PlaceResult | null>(
    null
  );
  const [fare, setFare] = useState<string>("");
  const isLoaded = useLoadGoogleMaps();

  // Log the selected places (you can remove this if not needed)
  React.useEffect(() => {
    if (fromPlace) {
      console.log("From place selected:", fromPlace);
    }
    if (toPlace) {
      console.log("To place selected:", toPlace);
    }
  }, [fromPlace, toPlace]);

  const handleFareChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFare(e.target.value);
    console.log("Fare amount:", e.target.value);
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
        <div className="items-center justify-center flex"> 
            <Image
              src="/auto_icon.png"
              width={100}
              height={100}
              alt="Auto Icon"
              className="flex flex-col"
            />
            <h1 className="text-2xl text-black ml-3">Auto</h1>
        </div>

        <AutocompleteInput
          className="text-black"
          placeholder="From"
          onPlaceSelected={setFromPlace}
        />
        <AutocompleteInput
          className="text-black"
          placeholder="To"
          onPlaceSelected={setToPlace}
        />
        
        {/* Fare input with similar styling to AutocompleteInput */}
        <div className="relative w-full">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded text-black"
            placeholder="Fare (₹)"
            value={fare}
            onChange={handleFareChange}
          />
        </div>
        
        {/* Display selected locations if you want */}
        {fromPlace && (
          <p className="text-sm text-gray-600">From: {fromPlace.name}</p>
        )}
        {toPlace && <p className="text-sm text-gray-600">To: {toPlace.name}</p>}
        
        {/* Book button */}
        <button 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          onClick={() => console.log("Booking auto with fare:", fare)}
        >
          Book Auto
        </button>
      </div>
      <div className="w-3/5 h-full">
        <ImageWithOverlay src="/LNM.png" alt="LNMIIT Image" />
      </div>
    </div>
  );
};

export default AutoSelectedpage;
