import React from "react";

const DecoratorCardSkeleton = () => {
  return (
    <div className="text-center animate-pulse h-[200px] md:h-auto">
      <div className="relative mx-auto w-24 sm:w-32 h-24 sm:h-32 mb-4">
        <div className="rounded-full bg-base-300 w-full h-full"></div>
      </div>

      {/* Name */}
      <div className="h-5 bg-base-300 rounded-md w-24 mx-auto mb-2"></div>

      {/* Specialty */}
      <div className="h-4 bg-base-300 rounded-md w-20 mx-auto mb-3"></div>

      {/* Stars */}
      <div className="flex justify-center gap-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-4 h-4 bg-base-300 rounded-full"></div>
        ))}
      </div>
    </div>
  );
};

export default DecoratorCardSkeleton;
