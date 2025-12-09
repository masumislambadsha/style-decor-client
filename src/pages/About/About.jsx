import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff6a4a]/10 text-[#ff6a4a] text-xs font-semibold uppercase tracking-[0.2em]">
            About us
          </span>
          <h1 className="mt-4 text-3xl md:text-4xl font-extrabold text-slate-900">
            StyleDecor – Home, Event & Interior
          </h1>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto text-sm md:text-base">
            StyleDecor connects homeowners and brands with professional
            decorators to design memorable homes and events with zero hassle.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-5">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-2">
                What we do
              </h2>
              <p className="text-slate-600 text-sm md:text-base">
                From cozy living rooms and modern kitchens to full wedding
                venues and corporate stages, our curated decorators handle
                planning, materials, setup, and execution so clients can relax
                and enjoy the moment.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
                <p className="text-xs font-semibold text-slate-500 uppercase mb-1">
                  Residential
                </p>
                <p className="text-sm text-slate-700">
                  Living rooms, bedrooms, kitchens, rooftop gardens, and more.
                </p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
                <p className="text-xs font-semibold text-slate-500 uppercase mb-1">
                  Events
                </p>
                <p className="text-sm text-slate-700">
                  Weddings, birthdays, mehendi, receptions, and private parties.
                </p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
                <p className="text-xs font-semibold text-slate-500 uppercase mb-1">
                  Commercial
                </p>
                <p className="text-sm text-slate-700">
                  Offices, showrooms, restaurants, and brand activations.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
              <h3 className="text-sm font-semibold text-slate-500 uppercase mb-3">
                Why clients choose us
              </h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>• Curated, verified decorators across multiple cities.</li>
                <li>• Transparent pricing and clear project tracking.</li>
                <li>• End‑to‑end support from planning to setup.</li>
              </ul>
            </div>
            <div className="bg-[#ff6a4a] rounded-3xl text-white p-6">
              <h3 className="text-lg font-semibold mb-2">
                Color your life with StyleDecor
              </h3>
              <p className="text-sm text-white/90">
                Tell us your vision and budget; our decorators handle the rest
                with creative, practical designs tailored to your space.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
