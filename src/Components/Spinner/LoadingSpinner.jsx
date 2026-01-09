import React from "react";

const LoadingSpinner = () => {
 return (
    <div className="flex-1 min-h-[70vh] flex items-center justify-center px-4">
      <div className="flex flex-col items-center gap-4">

        <div className="relative w-24 h-24 rounded-3xl bg-base-100/70 backdrop-blur-md shadow-xl border border-base-300 overflow-hidden">
          {/* Animated Background Mesh */}
          <div className="absolute inset-0 bg-linear-to-tr from-[#ff6a4a] via-[#fb923c] to-base-content/5 opacity-20" />

          {/* Inner Circle Decoration */}
          <div className="absolute inset-4 rounded-full border border-base-content/10" />

          {/* Spinner Ring */}
          <div className="absolute inset-2 animate-spin-slow">
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#ff6a4a] shadow-[0_0_12px_rgba(248,113,113,0.9)]" />
            <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.9)]" />
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.9)]" />
          </div>

          {/* Center Point */}
          <div className="absolute inset-6 rounded-2xl bg-base-100 flex items-center justify-center shadow-inner">
            <div className="w-3 h-3 rounded-full bg-[#ff6a4a] animate-pulse" />
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-base-content/40">
            Loading
          </p>
          <div className="flex gap-1 justify-center mt-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-[#ff6a4a]/40 animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
