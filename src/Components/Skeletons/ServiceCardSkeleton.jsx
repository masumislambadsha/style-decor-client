import React from "react";

const ServiceCardSkeleton = () => {
  return (
    <div className="block h-90 animate-pulse">
      <div className="bg-base-100 rounded-3xl shadow-md overflow-hidden flex flex-col h-full border border-base-content/5">
        {/* Image Skeleton */}
        <div className="h-48 w-full bg-base-300"></div>

        {/* Content Skeleton */}
        <div className="p-6 flex-1 flex flex-col gap-4">
          {/* Title */}
          <div className="h-7 bg-base-300 rounded-lg w-3/4"></div>

          {/* Description */}
          <div className="space-y-2">
            <div className="h-4 bg-base-300 rounded-md w-full"></div>
            <div className="h-4 bg-base-300 rounded-md w-5/6"></div>
          </div>

          {/* Price and Unit */}
          <div className="mt-auto pt-2 flex items-baseline gap-2">
            <div className="h-6 bg-base-300 rounded-md w-24"></div>
            <div className="h-4 bg-base-300 rounded-md w-12"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCardSkeleton;
