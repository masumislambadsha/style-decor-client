import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";

const ServiceCoverage = () => {
  const position = [23.8041, 90.4152];
  const serviceCenters = useLoaderData();
  const mapRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value.trim();
    if (!location) return;

    const district = serviceCenters.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase())
    );

    if (district && mapRef.current) {
      const coord = [district.latitude, district.longitude];
      mapRef.current.flyTo(coord, 9, { duration: 1.2 });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6 sm:space-y-8">
        <div className="text-center space-y-3">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-gray-900">
            Service Coverage
          </h1>
          <p className="text-gray-600 text-xs sm:text-sm md:text-base">
            StyleDecor is available in all{" "}
            <span className="font-semibold text-[#ff6a4a]">
              {serviceCenters.length}
            </span>{" "}
            districts of Bangladesh.
          </p>
        </div>

        <div className="bg-white rounded-xl sm:rounded-3xl shadow-md p-4 sm:p-6">
          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row gap-3 items-stretch"
          >
            <label className="input input-bordered flex items-center gap-2 flex-1 bg-gray-50 outline-0">
              <svg
                className="h-[1.1em] opacity-60 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input
                name="location"
                type="search"
                className="grow h-10 md:h-15 text-xs sm:text-sm "
                placeholder="Search by district name (e.g. Dhaka, Chattogram)..."
              />
            </label>
            <button
              type="submit"
              className="btn bg-[#ff6a4a] hover:bg-black text-white px-6 sm:px-8 h-10 sm:h-12"
            >
              Search
            </button>
          </form>
          <p className="mt-2 text-xs text-gray-500">
            Tip: Start typing a district name to quickly zoom to that area on the map.
          </p>
        </div>

        <div className="bg-white rounded-xl sm:rounded-3xl shadow-md overflow-hidden">
          <div className="w-full h-64 sm:h-72 md:h-80 lg:h-[560px]">
            <MapContainer
              center={position}
              zoom={7}
              ref={mapRef}
              className="w-full h-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {serviceCenters.map((center, idx) => (
                <Marker
                  key={idx}
                  position={[center.latitude, center.longitude]}
                >
                  <Popup>
                    <p className="font-semibold text-gray-900 mb-1">
                      {center.district}
                    </p>
                    <p className="text-xs text-gray-700">
                      Covered areas:{" "}
                      <span className="font-medium">
                        {center.covered_area.join(", ")}
                      </span>
                    </p>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCoverage;
