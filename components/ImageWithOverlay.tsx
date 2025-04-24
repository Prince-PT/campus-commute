import React from 'react';
import Image from 'next/image';

interface ImageWithOverlayProps {
  src: string;
  alt: string;
}

const ImageWithOverlay: React.FC<ImageWithOverlayProps> = ({ src, alt }) => {
  return (
    <div className="w-full h-full relative">
      <Image src={src} fill style={{ objectFit: 'cover' }} alt={alt} priority />
      <div className="absolute inset-x-0 bottom-8 text-center">
        <h1 className="text-4xl font-bold text-white drop-shadow-lg">CampusCommute</h1>
        <p className="text-xl text-white mt-2 drop-shadow-lg">Affordable Cab Rides at LNMIIT</p>
      </div>
    </div>
  );
};

export default ImageWithOverlay;
