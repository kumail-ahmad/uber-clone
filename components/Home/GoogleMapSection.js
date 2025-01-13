"use client";
import React from "react";
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
  map.setView([center.lat, center.lon], map.getZoom());
  return null;
};

const GoogleMapSection = ({ center, type }) => {
  return (
    <div className="map-container ml-28 mt-16">
      <MapContainer
        center={[center.lat, center.lon]}
        zoom={12}
        style={{ height: "500px", width: "75%" }}
      >
        <TileLayer
          url={`https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY}`}
          attribution='&copy; <a href="https://www.geoapify.com/">Geoapify</a> contributors'
        />
        <ChangeMapCenter center={center} />
        {type === "source" ? (
          <Marker icon={StartIcon} position={[center.lat, center.lon]}>
            <Popup>
              Latitude: {center.lat}, Longitude: {center.lon}
            </Popup>
          </Marker>
        ) : (
          <Marker icon={DestIcon} position={[center.lat, center.lon]}>
            <Popup>
              Latitude: {center.lat}, Longitude: {center.lon}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default GoogleMapSection;
