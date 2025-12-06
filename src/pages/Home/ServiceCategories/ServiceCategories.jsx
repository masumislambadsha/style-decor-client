import React from "react";
import { Link } from "react-router";
import useServices from "../../../Hooks/useServices";
import LoadingSpinner from "../../../Components/Spinner/LoadingSpinner";

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
    <section className="py-16 bg-[#f7f5f3]">
      <div className="max-w-6xl mx-auto px-4 lg:px-0">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-black">
          Interior design & decoration services we provide
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.slice(0,6).map((service) => {
            const accentClass = getAccentColorClass(service.service_category);

            return (
              <Link
                key={service._id}
                to={`/services/${service._id}`}
                className="block transition duration-250 hover:-translate-y-3"
              >
                <article className="bg-white rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col h-full">

                  <div className="h-48 w-full overflow-hidden">
                    <img
                      src={
                        service.image ||
                        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"
                      }
                      alt={service.service_name}
                      className="w-full h-full object-cover"
                    />
                  </div>


                  <div className="p-6 flex-1 flex flex-col">
                    <h3
                      className={`text-xl font-bold mb-2 ${accentClass}`}
                    >
                      {service.service_name}
                    </h3>

                    <p className="text-sm text-gray-700 leading-relaxed mb-4">
                      {service.description}
                    </p>

                    <div className="mt-auto pt-2 flex items-baseline gap-2 text-sm">
                      <span className="text-lg font-bold text-[#ff6a4a]">
                        ৳{service.cost.toLocaleString()}
                      </span>
                      <span className="text-gray-500">/ {service.unit}</span>
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;
