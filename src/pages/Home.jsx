import React, { Suspense, lazy, useEffect, useRef, useState } from "react";
import HeroMobile from "../components/HeroMobile";
import { Globe, BadgeCheck, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

const About = lazy(() => import("../components/About"));
const ServicesGrid = lazy(() => import("../components/ServicesGrid"));
const WhyUs = lazy(() => import("../components/WhyUs"));
const CTASection = lazy(() => import("../components/CTASection"));

const SectionFallback = ({ minHeight = "320px" }) => (
  <div className="w-full animate-pulse bg-slate-100" style={{ minHeight }} />
);

const DeferredSection = ({ children, minHeight = "320px", rootMargin = "500px 0px" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element || isVisible) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [isVisible, rootMargin]);

  return (
    <div ref={sectionRef}>
      {isVisible ? children : <SectionFallback minHeight={minHeight} />}
    </div>
  );
};

const Home = () => {
  return (
    <main className="overflow-hidden">
      <HeroMobile />

      <DeferredSection minHeight="520px">
        <Suspense fallback={<SectionFallback minHeight="520px" />}>
          <About />
        </Suspense>
      </DeferredSection>

      <DeferredSection minHeight="560px">
        <Suspense fallback={<SectionFallback minHeight="560px" />}>
          <ServicesGrid />
        </Suspense>
      </DeferredSection>

      <section className="bg-gray-100 py-16">
        <div className="max-w-[2400px] mx-auto text-center px-6">
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-12">
            When you choose us, you choose to step into a world where you can:
          </h2>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="rounded-2xl p-8 text-white  bg-gradient-to-br from-brand via-[#2a8e9e] to-brand-accent shadow-md">
              <Globe className="mx-auto mb-4" size={40} />
              <h3 className="font-semibold text-lg tracking-wide mb-3">
                FACILITATE GROWTH
              </h3>
              <p className="text-sm text-gray-100">
                Unlock new markets and empower your business to expand globally.
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl p-8 text-white  bg-gradient-to-br from-brand via-[#2a8e9e] to-brand-accent shadow-md">
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
            <div className="rounded-2xl p-8 text-white  bg-gradient-to-br from-brand via-[#2a8e9e] to-brand-accent shadow-md">
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

      <DeferredSection minHeight="520px">
        <Suspense fallback={<SectionFallback minHeight="520px" />}>
          <WhyUs />
        </Suspense>
      </DeferredSection>

      <DeferredSection minHeight="380px" rootMargin="650px 0px">
        <Suspense fallback={<SectionFallback minHeight="380px" />}>
          <CTASection />
        </Suspense>
      </DeferredSection>
    </main>
  );
};

export default Home;
