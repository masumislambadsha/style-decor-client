import React from "react";
import { Link } from "react-router";
const ServiceCard = ({ service, accentClass }) => {
  return (
    <div>
      <Link
        key={service._id}
        to={`/services/${service._id}`}
        className="block transition duration-250 h-90 hover:-translate-y-3"
      >
        <article className="bg-base-100 rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col h-full">
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
            <h3 className={`text-xl font-bold mb-2 ${accentClass}`}>
              {service.service_name}
            </h3>
            <p className="text-sm text-base-content/70 leading-relaxed mb-4">
              {service.description}
            </p>
            <div className="mt-auto pt-2 flex items-baseline gap-2 text-sm">
              <span className="text-lg font-bold text-[#ff6a4a]">
                {service.cost.toLocaleString()} BDT
              </span>
              <span className="text-base-content/60">/ {service.unit}</span>
            </div>
          </div>
        </article>
      </Link>
    </div>
  );
};
export default ServiceCard;