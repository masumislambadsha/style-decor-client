import React from "react";
import { Link } from "react-router";
const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-black via-slate-900 to-slate-950 text-white flex items-center justify-center px-4 py-10">
      <div className="max-w-3xl w-full flex flex-col sm:flex-row items-center gap-8 sm:gap-10">
        <div className="relative w-full sm:w-1/2 mb-6 sm:mb-0">
          <div className="h-48 sm:h-64 w-48 sm:w-64 mx-auto rounded-4xl sm:rounded-[2.5rem] border border-[#ff6a4a]/30 bg-linear-to-tr from-slate-950 via-slate-900 to-slate-800 shadow-[0_20px_60px_rgba(0,0,0,0.7)] flex items-center justify-center overflow-hidden">
            <div className="" />
            <div className="relative z-10 flex flex-col items-center gap-2 sm:gap-3">
              <div className="h-12 sm:h-16 w-12 sm:w-16 rounded-xl sm:rounded-2xl border border-[#ff6a4a]/50 flex items-center justify-center bg-black/40">
                <span className="text-2xl sm:text-4xl">🪑</span>
              </div>
              <p className="text-xs sm:text-xs text-gray-400">
                This corner is still undecorated.
              </p>
            </div>
          </div>
          <div className="absolute -bottom-3 sm:-bottom-4 left-1/2 -translate-x-1/2 px-4 sm:px-5 py-2 rounded-full bg-[#ff6a4a] text-black text-xs sm:text-sm font-bold shadow-lg">
            404 · Scene not styled
          </div>
        </div>
        <div className="w-full sm:w-1/2 text-center sm:text-left space-y-4 sm:space-y-5">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            This style doesn’t exist yet.
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm md:text-base">
            The page you tried to open isn’t part of our decoration catalogue.
            It may have been moved, removed, or never designed in the first
            place.
          </p>
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
              TRY ONE OF THESE
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
              <Link
                to="/"
                className="btn bg-[#ff6a4a] text-white hover:bg-white hover:text-black border-none px-4 sm:px-6 py-2 text-sm"
              >
                Back to Home
              </Link>
              <Link
                to="/services"
                className="btn btn-ghost border border-white/20 hover:border-white/70 text-xs sm:text-sm px-4 sm:px-6 py-2"
              >
                Browse Decoration Packages
              </Link>
              <Link
                to="/service-coverage"
                className="btn btn-ghost border border-[#ff6a4a]/40 hover:border-[#ff6a4a] text-xs sm:text-sm px-4 sm:px-6 py-2"
              >
                View Service Coverage
              </Link>
            </div>
          </div>
          <p className="text-xs text-gray-500 pt-2">
            If you reached this page from a link inside StyleDecor, please let
            us know so we can fix that broken trail of fairy lights.
          </p>
        </div>
      </div>
    </div>
  );
};
export default ErrorPage;