import React from "react";
import Hero from "../components/Hero";
import ServicesGrid from "../components/ServicesGrid";
import About from "../components/About";
import WhyUs from "../components/WhyUs";
import CargoServices from "../components/CargoServices";

const Home = () => {
    return (
        <main>
            <Hero />
            <ServicesGrid />
            <About />
            <WhyUs />
            <CargoServices />
            {/* <WhatWeDo /> */}
            {/* <CTASection /> */}
        </main>
    );
};

export default Home;
