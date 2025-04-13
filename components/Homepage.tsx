"use client";

import React from "react";
import PlaceholdersAndVanishInput from "./ui/placeholders-and-vanish-input";
import Image from "next/image";

const Homepage: React.FC = () => (
  <div className="flex w-full h-screen">
    <div className="flex flex-col w-2/5 p-6 gap-4 bg-white">
      <h1 className="text-3xl font-bold mb-6 text-black text-center">
        Campus Commute
      </h1>
      <div className="mb-6 justify-between flex">
        <button className="mr-4 px-4 py-2 bg-blue-500 text-white rounded-md ">
          Daily Rides
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Book Rides
        </button>
      </div>
      <PlaceholdersAndVanishInput
        placeholders={["From"]}
        onChange={(e) => console.log(e.target.value)}
        onSubmit={(e) => {
          e.preventDefault();
          console.log(
            "From Location : " + (e.target as HTMLInputElement).value
          );
        }}
      />
      <PlaceholdersAndVanishInput
        placeholders={["To"]}
        onChange={(e) => console.log(e.target.value)}
        onSubmit={(e) => {
          e.preventDefault();
          console.log("To Location : " + (e.target as HTMLInputElement).value);
        }}
      />
      <p className=" text-black text-2xl mt-2">Available Rides</p>
      <button className="mt-4 px-4 py-2 bg-white text-white rounded-md flex border-solid border-2 border-gray-400">
        <div className=" flex ">
          <Image
            src="/auto_icon.png"
            width={100}
            height={100}
            alt="Auto Icon"
            className=" flex flex-col"
          />
          <div className="flex flex-col ml-5">
            <h2 className="text-black text-xl">Auto</h2>
            <p className="text-gray-500">Available: 5</p>
            <p className="text-gray-500">Fare: ₹50</p>
          </div>
        </div>
      </button>
      <button className="mt-4 px-4 py-2 bg-white text-white rounded-md flex border-solid border-2 border-gray-400">
        <div className=" flex">
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
    <div className="w-3/5 h-full relative">
      <Image
        src="/LNM.png"
        fill
        style={{ objectFit: "cover" }}
        alt="LNMIIT Image"
        priority
      />
    </div>
  </div>
);

export default Homepage;
