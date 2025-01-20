"use client";

import React, { useState } from "react";
import axios from "axios";
import CarListOption from "./CarListOption";

const SearchSection = ({ source, destination }) => {
  const [distance, setDistance] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    console.log("The Source you selected is:", source);
    console.log("The Destination you selected is :", destination);

    if (!source || !destination) {
      setError("Please select both source and destination.");
      return;
    }

    setError(null);

    if (!source.lat || !source.lon || !destination.lat || !destination.lon) {
      setError("Invalid source or destination coordinates.");
      console.error("Invalid source or destination structure:", {
        source,
        destination,
      });
      return;
    }

    const apiKey = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY;
    const waypoints = `${source.lat},${source.lon}|${destination.lat},${destination.lon}`;

    try {
      console.log("Fetching distance...");
      const url = `https://api.geoapify.com/v1/routing?waypoints=${waypoints}&mode=walk&apiKey=${apiKey}`;
      // console.log("Request URL:", url);

      const response = await axios.get(url);
      // console.log("API Response:", response.data);

      if (
        response.data.features &&
        response.data.features.length > 0 &&
        response.data.features[0].properties.distance
      ) {
        const distanceInKm =
          response.data.features[0].properties.distance / 1000;
        setDistance(distanceInKm);
        console.log("Distance:", distanceInKm);
      } else {
        setError("Unable to calculate distance.");
        console.error("Invalid response structure:", response.data);
      }
    } catch (err) {
      setError("Failed to fetch distance data.");
      console.error(
        "Error fetching distance:",
        err.response?.data || err.message
      );
    }
  };

  return (
    <div>
      <div className="p-4">
        <button
          className="bg-black text-white font-bold w-full p-3 rounded-2xl mt-5"
          onClick={handleSearch}
        >
          Search
        </button>
        
        {distance !== null && (
          <p className="mt-3 text-lg">Distance: {distance} km</p>
        )}
        {error && <p className="mt-3 text-red-500">{error}</p>}
      </div>
      {distance !== null ? <CarListOption distance={distance} /> : null}
    </div>
  );
};

export default SearchSection;
