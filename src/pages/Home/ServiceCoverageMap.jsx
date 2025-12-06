import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const ServiceCoverageMap = () => {
  const position = [23.8103, 90.4125]; 

  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-black text-center mb-16">
          Our Service Coverage in Bangladesh
        </h2>

        <div className="h-96 md:h-[600px] rounded-2xl shadow-2xl overflow-hidden">
          <MapContainer center={position} zoom={11} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            <Marker position={position}>
              <Popup>
                <div className="text-center">
                  <h3 className="font-bold">StyleDecor Head Office</h3>
                  <p>Bashundhara R/A, Dhaka</p>
                  <p className="text-[#ff6a4a] font-bold">01767-139529</p>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </section>
  );
};

export default ServiceCoverageMap;
