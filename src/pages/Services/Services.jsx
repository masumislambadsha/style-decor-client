import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import LoadingSpinner from "../../Components/Spinner/LoadingSpinner";
import ServiceCard from "../../Components/ServiceCard/ServiceCard";
motion
const Services = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [maxPrice, setMaxPrice] = useState(0);

  const { data: services = [], isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/services`);
      return res.data;
    },
  });

  useEffect(() => {
    if (services.length) {
      const max = Math.max(...services.map((s) => Number(s.cost) || 0));
      setMaxPrice(max);
      setPriceRange([0, max]);
    }
  }, [services]);

  const filteredServices = services.filter((service) => {
    const name = (service.service_name || "").toLowerCase();
    const category = service.service_category || "";
    const cost = Number(service.cost);

    const matchesSearch = name.includes(searchTerm.toLowerCase());
    const matchesType = !selectedType || category === selectedType;
    const matchesPrice = Number.isNaN(cost) || (cost >= priceRange[0] && cost <= priceRange[1]);

    return matchesSearch && matchesType && matchesPrice;
  });

  const categories = [...new Set(services.map((s) => s.service_category))];

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our Decoration Packages
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Find the perfect design for your space
          </p>
        </motion.div>

        <div className="bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-xl p-6 sm:p-8 mb-8 sm:mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="relative">
              <Search className="absolute left-4 top-4 text-gray-400" size={20} sm:size={24} />
              <input
                type="text"
                placeholder="Search by service name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-bordered w-full pl-12 h-10 sm:h-12 lg:h-14 text-sm sm:text-base lg:text-lg"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-4 top-4 text-gray-400" size={20} sm:size={24} />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="select select-bordered w-full pl-12 h-10 sm:h-12 lg:h-14 text-sm sm:text-base lg:text-lg"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-3 text-sm sm:text-base">
                Price Range: {priceRange[0]} BDT - {priceRange[1]} BDT
              </label>
              <input
                type="range"
                min="0"
                max={maxPrice}
                step="100"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="range range-accent w-full"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
          {filteredServices.map((service, idx) => (
            <motion.div
              key={service._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden transition-all duration-300 group"
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <p className="text-lg sm:text-xl text-gray-500">
              No services found matching your criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
