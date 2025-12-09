import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import LoadingSpinner from "../../../Components/Spinner/LoadingSpinner";

// Fix Leaflet default icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const ServiceCoverageArea = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const mapRef = useRef(null);

  const {
    data: serviceCenters = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["serviceCenters"],
    queryFn: async () => {
      const res = await axios.get("/serviceCenter.json");
      return res.data;
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const term = searchTerm.toLowerCase().trim();
    if (!term || !serviceCenters.length) return;

    const found = serviceCenters.find(
      (c) =>
        c.district.toLowerCase().includes(term) ||
        c.city.toLowerCase().includes(term) ||
        c.covered_area.some((a) => a.toLowerCase().includes(term))
    );

    if (found && mapRef.current) {
      mapRef.current.flyTo([found.latitude, found.longitude], 10, {
        duration: 1.8,
      });
    }
  };

  const handleAreaClick = (center) => {
    if (!mapRef.current) return;
    setSearchTerm(center.district);
    mapRef.current.flyTo([center.latitude, center.longitude], 10, {
      duration: 1.8,
    });
  };

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return (
      <div className="text-red-600 text-center py-20">
        Failed to load service areas
      </div>
    );

  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4">
            Our Service Area
          </h2>
          <p className="text-gray-700 text-base sm:text-lg max-w-xl sm:max-w-4xl mx-auto leading-relaxed">
            Please tell us about your residential home space or commercial space requirements. One of our creative, modern interior designers or interior decorators will walk you through our service options.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 justify-center items-center">
          <div className="bg-white rounded-xl sm:rounded-3xl shadow-xl p-6 sm:p-8">
            <form onSubmit={handleSearch} className="mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Search district or area..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="outline-0 input input-bordered flex-1 text-sm sm:text-base"
                />
                <button
                  type="submit"
                  className="btn bg-[#ff6a4a] hover:bg-black text-white font-bold text-sm sm:text-base"
                >
                  Search
                </button>
              </div>
            </form>

            <div className="space-y-4 max-h-72 sm:max-h-96 overflow-y-auto">
              {serviceCenters.map((center, idx) => (
                <div
                  key={idx}
                  className="border-b border-gray-200 pb-4 last:border-0 cursor-pointer hover:bg-gray-50 rounded-lg p-3 -mx-3 sm:-mx-4 transition"
                  onClick={() => handleAreaClick(center)}
                >
                  <h3 className="font-bold text-base sm:text-lg text-gray-900 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="text-red-600">•</span>
                      {center.district}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-500">
                      {center.covered_area.length} areas
                    </span>
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {center.covered_area.map((area, i) => (
                      <span
                        key={i}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSearchTerm(area);
                          handleAreaClick(center);
                        }}
                        className="text-xs px-2 py-1.5 bg-gray-100 rounded-full hover:bg-[#ff6a4a] hover:text-white transition cursor-pointer"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="h-64 sm:h-72 md:h-[490px] rounded-xl sm:rounded-3xl shadow-2xl overflow-hidden">
              <MapContainer
                center={[23.685, 90.3563]}
                zoom={7}
                ref={mapRef}
                className="h-full w-full"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
                {serviceCenters.map((center, idx) => (
                  <Marker
                    key={idx}
                    position={[center.latitude, center.longitude]}
                  >
                    <Popup>
                      <div className="text-center">
                        <h3 className="font-bold text-base sm:text-lg">{center.district}</h3>
                        <p className="text-xs sm:text-sm">{center.city}</p>
                        <p className="text-xs sm:text-xs mt-1 text-gray-600">
                          {center.covered_area.join(", ")}
                        </p>
                        <p className="text-[#ff6a4a] font-bold mt-1">
                          Service Available
                        </p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>

            <button className="absolute top-4 sm:top-6 right-4 sm:right-6 btn bg-[#ff6a4a] hover:bg-black text-white font-bold px-6 sm:px-8 py-2 sm:py-3 rounded-none shadow-lg flex items-center gap-2 z-10 text-xs sm:text-sm">
              SEE ALL AREA
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceCoverageArea;
