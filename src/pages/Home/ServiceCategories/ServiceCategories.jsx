import React from "react";
import { Link } from "react-router";
import useServices from "../../../Hooks/useServices";
import LoadingSpinner from "../../../Components/Spinner/LoadingSpinner";
import ServiceCard from "../../../Components/ServiceCard/ServiceCard";

const ServiceCategories = () => {
  const { services, loading } = useServices();

  if (loading) return <LoadingSpinner />;

  const getAccentColorClass = (category) => {
    switch (category?.toLowerCase()) {
      case "home":
      case "residential":
        return "text-purple-600";
      case "office":
      case "commercial":
        return "text-blue-600";
      case "hospitality":
      case "restaurant":
      case "hotel":
        return "text-green-600";
      case "wedding":
      case "event":
        return "text-pink-600";
      default:
        return "text-[#ff6a4a]";
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-[#f7f5f3]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-10 text-black capitalize">
          Interior design & decoration services we provide
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {services.slice(0, 6).map((service) => {
            const accentClass = getAccentColorClass(service.service_category);

            return (
              <ServiceCard
                accentClass={accentClass}
                service={service}
                key={service._id}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;
