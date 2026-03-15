import React from "react";
import PortsSection from "../components/PortsSection";
import HeroSection from "../components/HeroSection";
import global_bg from "../assets/global_bg.png";
import ServicesSection from "../components/ServicesSection";
const Global = () => {
  return (
    <>
 
      <HeroSection
        image={global_bg}
        heading="Global Import & Export Solutions"
        subheading="Connecting businesses across continents with reliable logistics and maritime trade services."
        // buttonText="Explore Services"
        // buttonLink="/services"
      />
      <PortsSection />
      <ServicesSection/>
    </>
  );
};

export default Global;
