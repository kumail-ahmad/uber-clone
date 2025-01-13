"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

const InputBox = ({ type, onLocationSelect }) => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const geoapifyApiKey = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY;

  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&limit=5&apiKey=${geoapifyApiKey}`
      );
      if (response.data.features) {
        setSuggestions(response.data.features);
      }
    } catch (error) {
      console.error("Error fetching autocomplete data:", error);
    }
  };

  useEffect(() => {
    fetchSuggestions(value);
  }, [value]);

  const handleSelect = (selectedAddress) => {
    setValue(selectedAddress.properties.formatted);
    setSuggestions([]);
    const { lat, lon } = selectedAddress.properties;
    if (onLocationSelect) {
      onLocationSelect({ lat, lon });
      console.log("Selected Address:", selectedAddress.properties.formatted);
      console.log("Latitude:", lat);
      console.log("Longitude:", lon);
    }
  };

  return (
    <div className="relative p-2 bg-gray-100 rounded-2xl mt-3 flex items-center gap-4 ml-2">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={type === "source" ? "Pickup location" : "Drop location"}
        className="bg-transparent w-[270px] px-3 py-2 rounded-lg outline-none"
      />
      {suggestions.length > 0 && (
        <div className="autocomplete-suggestions absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-lg w-full z-10">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.properties.place_id}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSelect(suggestion)}
            >
              {suggestion.properties.formatted}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InputBox;
