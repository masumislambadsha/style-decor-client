import React from "react";

const LoadingSpinner = () => {
 return (
    <div className="min-h-[50vh] flex items-center justify-center bg-linear-to-b from-gray-50 to-white px-4">
      <div className="flex flex-col items-center gap-4">

        <div className="relative w-24 h-24 rounded-3xl bg-white/70 backdrop-blur-md shadow-[0_18px_45px_rgba(15,23,42,0.15)] border border-white/60 overflow-hidden">

          <div className="absolute inset-0 bg-linear-to-tr from-[#ff6a4a] via-[#fb923c] to-[#0f172a] opacity-20" />

          <div className="absolute inset-4 rounded-full border border-white/40" />
          <div className="absolute inset-2 animate-spin-slow">
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#ff6a4a] shadow-[0_0_12px_rgba(248,113,113,0.9)]" />
            <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.9)]" />
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.9)]" />
          </div>

          <div className="absolute inset-6 rounded-2xl bg-white/80 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-[#ff6a4a]" />
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-gray-400">
            Loading
          </p>
          <p className="text-sm text-gray-600 mt-1"></p>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
