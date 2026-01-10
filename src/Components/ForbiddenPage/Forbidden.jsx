import React, { useEffect } from "react";
import { Link } from "react-router";
const Forbidden = () => {
  useEffect(()=>{
    document.title = "Style Decor | Forbidden Page"
  },[])
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-slate-950 to-black -mt-5 px-4">
      <div className="max-w-md w-full text-center">
        <p className="text-sm font-semibold tracking-[0.3em] text-[#ff6a4a]/70 uppercase">
          Error 403
        </p>
        <h1 className="mt-4 text-4xl md:text-5xl font-extrabold text-white">
          Access Forbidden
        </h1>
        <p className="mt-4 text-sm md:text-base text-slate-300">
          You do not have permission to view this page. If you think this is a
          mistake, please contact support or try logging in with a different
          account.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#ff6a4a] text-white font-semibold shadow-lg hover:bg-white hover:text-black transition"
          >
            Go to Home
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-slate-600 text-slate-200 font-semibold hover:bg-slate-800 transition"
          >
            Switch Account
          </Link>
        </div>
        <p className="mt-6 text-xs text-slate-500">
          If you are a decorator or admin, make sure you are logged into the
          correct account.
        </p>
      </div>
    </div>
  );
};
export default Forbidden;