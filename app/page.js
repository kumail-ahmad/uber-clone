"use client";
import { useState } from "react";
import GoogleMapSection from "@/components/Home/GoogleMapSection";
import SearchSection from "@/components/Home/SearchSection";
import InputBox from "@/components/Home/InputBox";

export default function Page() {
  const [mapCenter, setMapCenter] = useState({
    lat: 34.0768854,
    lon: 74.8093683,
  });
  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);

  const handleLocationSelect = (location, type) => {
    if (type === "source") {
      setSource(location);
    } else if (type === "destination") {
      setDestination(location);
    }
    setMapCenter(location);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div className="search ml-10">
        <div className="p-2 md:pd-6 mt-16 md:ml-8 ml-1 rounded-xl">

      <p className="md:text-5xl text-4xl font-extrabold">Go anywhere with Hoppr</p>
      <p className=" md:hidden block mt-6 font-bold  ">Request a ride , hop in hoppr</p>
        </div>
        <InputBox
          type="source"
          onLocationSelect={(location) =>
            handleLocationSelect(location, "source")
          }
        />
        <InputBox
          type="destination"
          onLocationSelect={(location) =>
            handleLocationSelect(location, "destination")
          }
        />
        <div className="inputsdateandtime flex flex-row">
          <input
            type="date"
            placeholder="Today"
            className="px-3 ml-1 mt-3 py-2 border bg-gray-100 rounded-lg outline-none  md:block hidden"
          />
          <input
            type="time"
            placeholder="now"
            id="time"
            className="px-3 ml-7 mt-3 py-2 border bg-gray-100 w-full rounded-lg outline-none md:block hidden"
          />
        </div>
        <SearchSection source={source} destination={destination} />
      </div>

      <div className="googlemap col-span-2">
        <GoogleMapSection source={source} destination={destination} />
      </div>
    </div>
  );
}
