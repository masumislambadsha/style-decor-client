import React from "react";

const BookingCardSkeleton = () => {
  return (
    <div className="bg-base-100 rounded-xl sm:rounded-3xl shadow-xl p-4 sm:p-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 animate-pulse">
      <div className="flex-1 space-y-3">
        {/* Service Name */}
        <div className="h-7 bg-base-300 rounded-lg w-1/2"></div>
        {/* Date */}
        <div className="h-4 bg-base-300 rounded-md w-1/3"></div>
        {/* Location */}
        <div className="h-4 bg-base-300 rounded-md w-1/4"></div>
        {/* Status Badge */}
        <div className="h-8 bg-base-300 rounded-full w-24"></div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-start sm:items-center">
        {/* Action Buttons */}
        <div className="h-10 bg-base-300 rounded-xl w-24"></div>
        <div className="h-10 bg-base-300 rounded-xl w-24"></div>
      </div>
    </div>
  );
};

export default BookingCardSkeleton;
