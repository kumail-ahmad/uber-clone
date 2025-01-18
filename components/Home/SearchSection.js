"use client";

import React, { useState } from "react";
import axios from "axios";

const SearchSection = ({ source, destination }) => {
  const [distance, setDistance] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!source || !destination) {
      setError("Please select both source and destination.");
      return;
    }

    setError(null);
    const apiKey = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY;
    const waypoints = `${source.lat},${source.lon}|${destination.lat},${destination.lon}`;

    try {
      const response = await axios.get(
        `https://api.geoapify.com/v1/routing?waypoints=${waypoints}&mode=walk&apiKey=${apiKey}`
      );

      if (
        response.data.features &&
        response.data.features.length > 0 &&
        response.data.features[0].properties.distance
      ) {
        const distanceInKm = response.data.features[0].properties.distance / 1000;
        setDistance(distanceInKm);
        console.log("Distance:", distanceInKm);  // Logging the calculated distance
      } else {
        setError("Unable to calculate distance.");
      }
    } catch (err) {
      setError("Failed to fetch distance data.");
    }
  };

  return (
    <div className="p-4">
      <button
        className="bg-black text-white font-bold w-full p-3 rounded-2xl mt-5"
        onClick={handleSearch}
      >
        Search
      </button>
      {distance !== null && <p className="mt-3 text-lg">Distance: {distance} km</p>}
      {error && <p className="mt-3 text-red-500">{error}</p>}
    </div>
  );
};

export default SearchSection;
