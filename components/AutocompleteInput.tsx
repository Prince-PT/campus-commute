"use client";

import { useEffect, useRef } from "react";

interface AutocompleteInputProps {
  placeholder: string;
  onPlaceSelected: (place: google.maps.places.PlaceResult) => void;
  className?: string;
}

export const AutocompleteInput = ({
  placeholder,
  onPlaceSelected,
  className,
}: AutocompleteInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    if (!window.google || !inputRef.current) return;

    autocompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        types: ["establishment", "geocode"],
        componentRestrictions: { country: "in" },
      }
    );

    autocompleteRef.current.addListener("place_changed", () => {
      const place = autocompleteRef.current?.getPlace();
      if (place?.geometry) {
        onPlaceSelected(place);
      }
    });

    return () => {
      if (autocompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(
          autocompleteRef.current
        );
      }
    };
  }, [onPlaceSelected]);

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder={placeholder}
      className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    />
  );
};
