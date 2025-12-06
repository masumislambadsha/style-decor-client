import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="relative">
        <div
          className="w-20 h-20 border-8 border-gray-200 rounded-full animate-spin"
          style={{
            borderTopColor: "#ff6a4a",
            borderRightColor: "#ff6a4a",
            borderBottomColor: "transparent",
            borderLeftColor: "transparent",
          }}
        ></div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#ff6a4a] rounded-full animate-ping opacity-75"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-lg"></div>
      </div>

      <p className="ml-6 text-xl font-medium text-gray-700 tracking-wider">
        Loading StyleDecor...
      </p>
    </div>
  );
};

export default LoadingSpinner;
