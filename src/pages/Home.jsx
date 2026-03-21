import React from "react";
import Hero from "../components/Hero";
import ServicesGrid from "../components/ServicesGrid";
import About from "../components/About";
import WhyUs from "../components/WhyUs";
import CargoServices from "../components/CargoServices";
import WhatWeDo from "../components/WhatWeDo";
import CTASection from "../components/CTASection";
import GlobalReach from "../components/GlobalReach";
import FAQ from "../components/FAQ";
import FreightSection from "../components/Services";
import HeroMobile from "../components/HeroMobile";
import { Globe, BadgeCheck, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <main className="overflow-hidden">
      {/* <Hero /> */}
      <HeroMobile />
      <About />
      <ServicesGrid />
      <section className="bg-gray-100 py-16">
        <div className="max-w-[1400px] mx-auto text-center px-6">
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-12">
            When you choose us, you choose to step into a world where you can:
          </h2>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="rounded-2xl p-8 text-white bg-gradient-to-br from-teal-600 to-brand-accent shadow-md">
              <Globe className="mx-auto mb-4" size={40} />
              <h3 className="font-semibold text-lg tracking-wide mb-3">
                FACILITATE GROWTH
              </h3>
              <p className="text-sm text-gray-100">
                Unlock new markets and empower your business to expand globally.
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl p-8 text-white bg-gradient-to-br from-teal-600 to-brand-accent shadow-md">
              <BadgeCheck className="mx-auto mb-4" size={40} />
              <h3 className="font-semibold text-lg tracking-wide mb-3">
                ENHANCE EFFICIENCY
              </h3>
              <p className="text-sm text-gray-100">
                Streamline operations and reduce costs through customized
                strategies.
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl p-8 text-white bg-gradient-to-br from-teal-600 to-brand-accent shadow-md">
              <Trophy className="mx-auto mb-4" size={40} />
              <h3 className="font-semibold text-lg tracking-wide mb-3">
                ACHIEVE LASTING SUCCESS
              </h3>
              <p className="text-sm text-gray-100">
                Manage every shipment, partnership, and opportunity with
                industry-leading expertise.
              </p>
            </div>
          </div>

          {/* Bottom Text */}
          <p className="text-gray-600 mt-10 max-w-2xl mx-auto text-sm md:text-base">
            By partnering with Bodn prima, you gain more than just a service
            provider—you gain a trusted ally. We empower you to convert trade
            challenges into competitive advantages.
          </p>

          {/* CTA */}
          <div className="mt-6">
            <Link to="/services" className="text-blue-600 font-medium hover:underline flex items-center justify-center gap-2 mx-auto">
              Explore All Services →
            </Link>
          </div>
        </div>
      </section>
      <WhyUs />
      {/* <CargoServices /> */}
      {/* <WhatWeDo /> */}
      {/* <GlobalReach /> */}
      {/* <FAQ /> */}
      {/* <FreightSection/> */}
      <CTASection />
    </main>
  );
};

export default Home;
