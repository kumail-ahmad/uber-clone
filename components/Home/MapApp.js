"use client";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Custom hook to move the map center
const ChangeMapCenter = ({ center }) => {
  const map = useMap();
  map.setView([center.lat, center.lon], map.getZoom());
  return null;
};

const MapComponent = ({ center }) => {
  return (
    <div className="map-container mt-4">
      <MapContainer
        center={[center.lat, center.lon]}
        zoom={12}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url={`https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY}`}
          attribution='&copy; <a href="https://www.geoapify.com/">Geoapify</a> contributors'
        />
        <ChangeMapCenter center={center} />
        <Marker position={[center.lat, center.lon]}>
          <Popup>
            Latitude: {center.lat}, Longitude: {center.lon}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
