"use client";

import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

const StartIcon = L.icon({
  iconUrl: "/start.svg",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const DestIcon = L.icon({
  iconUrl: "/dest.svg",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const ChangeMapCenter = ({ center }) => {
  const map = useMap();
  const [currentCenter, setCurrentCenter] = useState(null);

  useEffect(() => {
    if (
      center &&
      center.lat &&
      center.lon &&
      (currentCenter?.lat !== center.lat || currentCenter?.lon !== center.lon)
    ) {
      map.flyTo([center.lat, center.lon], map.getZoom());
      setCurrentCenter(center);
    }
  }, [center, currentCenter, map]);

  return null;
};

const GoogleMapSection = ({ source, destination }) => {
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const defaultSource = { lat: 34.0834492, lon: 74.8114242 };
  const defaultDest = { lat: 34.1135203, lon: 74.809953 };

  const validSource = source || defaultSource;
  const validDestination = destination || defaultDest;

  useEffect(() => {
    const fetchRoute = async () => {
      setLoading(true);
      setError(null);

      try {
        const apiKey = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY;
        if (!apiKey) {
          throw new Error("Geoapify API Key is missing!");
        }

        const waypoints = `${validSource.lat},${validSource.lon}|${validDestination.lat},${validDestination.lon}`;
        const response = await axios.get(
          `https://api.geoapify.com/v1/routing?waypoints=${waypoints}&mode=walk&apiKey=${apiKey}`
        );

        if (
          response.data.features &&
          response.data.features.length > 0 &&
          response.data.features[0].geometry.coordinates
        ) {
          const coordinates =
            response.data.features[0].geometry.coordinates.flatMap(
              (lineString) => lineString.map(([lon, lat]) => [lat, lon])
            );
          setRouteCoordinates(coordinates);
        } else {
          throw new Error("No valid route data found in API response.");
        }
      } catch (err) {
        setError(err.message || "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchRoute();
  }, [validSource, validDestination]);

  return (
    <div className="map-container ml-28 mt-16 md:block hidden">
      <MapContainer
        center={[validSource.lat, validSource.lon]}
        zoom={13}
        style={{ height: "500px", width: "75%" }}
      >
        <TileLayer
          url={`https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY}`}
          attribution='&copy; <a href="https://www.geoapify.com/">Geoapify</a> contributors'
        />

        <ChangeMapCenter center={validSource} />

        <Marker
          key={`source-${validSource.lat}-${validSource.lon}`}
          icon={StartIcon}
          position={[validSource.lat, validSource.lon]}
        >
          <Popup>
            Source: Latitude: {validSource.lat}, Longitude: {validSource.lon}
          </Popup>
        </Marker>

        <Marker
          key={`destination-${validDestination.lat}-${validDestination.lon}`}
          icon={DestIcon}
          position={[validDestination.lat, validDestination.lon]}
        >
          <Popup>
            Destination: Latitude: {validDestination.lat}, Longitude:{" "}
            {validDestination.lon}
          </Popup>
        </Marker>

        {routeCoordinates.length > 0 && (
          <Polyline positions={routeCoordinates} color="black" weight={4} />
        )}
      </MapContainer>

      <div className="mt-4">
        {loading && <p className="text-lg font-bold">Loading route...</p>}
        {error && <p className="text-lg text-red-500">Error: {error}</p>}
        {!loading && !error && routeCoordinates.length > 0 && (
          <p className="text-lg font-bold">Route Loaded Successfully!</p>
        )}
      </div>
    </div>
  );
};

export default GoogleMapSection;
