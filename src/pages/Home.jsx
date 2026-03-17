import React from "react";
import Hero from "../components/Hero";
import ServicesGrid from "../components/ServicesGrid";
import About from "../components/About";
import WhyUs from "../components/WhyUs";
import CargoServices from "../components/CargoServices";
import WhatWeDo from "../components/WhatWeDo";
import CTASection from "../components/CTASection";
import GlobalReach from "../components/GlobalReach";
import FAQ from '../components/FAQ';
import FreightSection from "../components/Services";
import HeroMobile from "../components/HeroMobile";

const Home = () => {
    return (
        <main className="overflow-hidden">
            <Hero />
            <HeroMobile />
            <About />
            <ServicesGrid />
            <WhyUs />
            <CargoServices />
            {/* <WhatWeDo /> */}
            {/* <GlobalReach /> */}
            {/* <FAQ /> */}
            {/* <FreightSection/> */}
            <CTASection />
        </main>
    );
};

export default Home;
