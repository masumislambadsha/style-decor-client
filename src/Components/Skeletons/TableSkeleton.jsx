import React from "react";
const TableSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden animate-pulse">
      <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
        <div className="h-7 bg-base-300 rounded-lg w-32"></div>
        <div className="h-5 bg-base-300 rounded-md w-16"></div>
      </div>
      <div className="overflow-x-auto p-6 space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex justify-between items-center py-4 border-b border-gray-100 dark:border-gray-800 last:border-0">
            <div className="space-y-2">
              <div className="h-5 bg-base-300 rounded-md w-40"></div>
              <div className="h-3 bg-base-300 rounded-md w-24"></div>
            </div>
            <div className="h-5 bg-base-300 rounded-md w-20"></div>
            <div className="h-6 bg-base-300 rounded-full w-24"></div>
            <div className="h-5 bg-base-300 rounded-md w-16"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default TableSkeleton;