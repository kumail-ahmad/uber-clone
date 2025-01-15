"use client";
import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

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

  useEffect(() => {
    if (center && center.lat && center.lon) {
      map.flyTo([center.lat, center.lon], map.getZoom());
    }
  }, [center, map]);

  return null;
};

const GoogleMapSection = ({ source, destination }) => {
  const defaultSource = { lat: 34.0768854, lon: 74.8093683 };
  const defaultDest = { lat: 34.07615854, lon: 74.802683 };

  const validSource = source || defaultSource;
  const validDestination = destination || defaultDest;

  return (
    <div className="map-container ml-28 mt-16 ">
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

        {validSource && (
          <Marker
            key={`source-${validSource.lat}-${validSource.lon}`}
            icon={StartIcon}
            position={[validSource.lat, validSource.lon]}
          >
            <Popup>
              Source: Latitude: {validSource.lat}, Longitude: {validSource.lon}
            </Popup>
          </Marker>
        )}

        {validDestination && (
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
        )}
      </MapContainer>
    </div>
  );
};

export default GoogleMapSection;
