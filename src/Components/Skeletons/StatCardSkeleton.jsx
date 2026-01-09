import React from "react";

const StatCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-4 animate-pulse">
      <div className="p-4 rounded-xl bg-base-300 w-14 h-14"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-base-300 rounded-md w-24"></div>
        <div className="h-7 bg-base-300 rounded-md w-12"></div>
      </div>
    </div>
  );
};

export default StatCardSkeleton;
