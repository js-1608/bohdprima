import React from "react";

const regions = [
  { name: "Asia Pacific", countries: "15 Countries" },
  { name: "North America", countries: "08 Countries" },
  { name: "Europe", countries: "12 Countries" },
  { name: "Middle East", countries: "06 Countries" },
  { name: "Africa", countries: "04 Countries" },
];

import global from "../assets/global.png";
const GlobalReach = () => {
  return (
    <section className="relative py-12 overflow-hidden">
      

      <div className="container mx-auto px-6 lg:px-8 max-w-[1400px] relative z-10">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Global Reach
          </h2>
          <p className="text-slate-500 font-bold tracking-widest uppercase text-sm mb-6 block">
            Our extensive network spans across continents, connecting businesses
            worldwide with reliable trade partnerships
          </p>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Cards */}
          <div className="space-y-5">
            {regions.map((region, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white shadow-md rounded-xl px-6 py-5 hover:shadow-lg transition"
              >
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-gradient-to-r from-brand-accent to-brand"></span>
                  <span className="font-medium text-gray-800">
                    {region.name}
                  </span>
                </div>

                <span className="text-gray-500 text-sm">
                  {region.countries}
                </span>
              </div>
            ))}
          </div>

          {/* Right Illustration */}
          <div className="flex justify-center lg:justify-end">
            <img
              src={global}
              alt="Global logistics network"
              className="w-full max-w-full"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default GlobalReach;