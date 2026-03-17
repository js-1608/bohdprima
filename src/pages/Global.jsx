import React from "react";
import PortsSection from "../components/PortsSection";
import HeroSection from "../components/HeroSection";
import global_bg from "../assets/global_bg.png";
import ServicesSection from "../components/ServicesSection";
import {  Ship, Truck, ShieldCheck, MapPin, ArrowRight} from 'lucide-react';
import TradeSection from "../components/TradeSection";
import vietnamImg from "../assets/ship.png";

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

      <TradeSection
      title="VIETNAM"
      image={vietnamImg}
      imageLeft={true}
      content={`India and Vietnam have a growing trade relationship, with bilateral trade reaching $14.82 billion in 2023-2024—a 0.76% increase from the previous year. India's exports to Vietnam amount to $5.47 billion, while imports from Vietnam stand at $9.34 billion.`}
      highlights={[
        {
          label: "India's Ranking",
          value:
            "21st largest trading partner and 22nd largest export destination globally",
        },
        {
          label: "Vietnam's Ranking",
          value:
            "7th largest trading partner, 7th biggest importer, and 11th biggest import source",
        },
        {
          label: "Top Indian Exports",
          value:
            "Frozen bovine meat, cereals, iron and steel, cotton, and animal fodder & materials",
        },
        {
          label: "Top Vietnamese Exports",
          value:
            "Electronic equipment, telecom gear, machinery, and mechanical appliances",
        },
        {
          label: "Trade Target",
          value:
            "$15 billion supported by JCM and Sub-Committee on Trade",
        },
      ]}
    />

      <PortsSection />
      <ServicesSection/>
    </>
  );
};

export default Global;


