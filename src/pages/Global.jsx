import React from "react";
import PortsSection from "../components/PortsSection";
import HeroSection from "../components/HeroSection";
import global_bg from "../assets/global_bg.png";
import ServicesSection from "../components/ServicesSection";
import { Ship, Truck, ShieldCheck, MapPin, ArrowRight } from 'lucide-react';
import TradeSection from "../components/TradeSection";
import vietnamImg from "../assets/global/vietnam.jpg";
import germanyImg from "../assets/global/germany.jpg";
import indonesiaImg from "../assets/global/indonesia.jpg";
import uaeImg from "../assets/global/uae.jpg";
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

      <TradeSection
        title="GERMANY"
        image={germanyImg}
        imageLeft={false}
        content={`Germany’s strategic market provides robust opportunities and offers significant access to European trade networks. Our services equip businesses with insights to thrive in this competitive environment.`}
        highlights={[
          {
            label: "Market Strength",
            value:
              "Germany is Europe's largest economy and a global leader in industrial production and exports",
          },
          {
            label: "Trade Access",
            value:
              "Provides strong connectivity to the entire European Union market",
          },
          {
            label: "Key Sectors",
            value:
              "Automotive, machinery, chemicals, electronics, and renewable energy",
          },
          {
            label: "Opportunities",
            value:
              "High demand for quality imports and advanced technology partnerships",
          },
          {
            label: "Business Advantage",
            value:
              "Stable economy, strong infrastructure, and innovation-driven environment",
          },
        ]}
      />

      <TradeSection
        title="INDONESIA"
        image={indonesiaImg}
        imageLeft={true}
        content={`Indonesia represents a dynamic trade landscape with emerging market trends that open up new growth avenues for our partners. Our expertise ensures that you can effectively navigate this promising market.`}
        highlights={[
          {
            label: "Market Growth",
            value:
              "One of Southeast Asia’s fastest-growing economies with rising consumer demand",
          },
          {
            label: "Trade Potential",
            value:
              "Strong opportunities in agriculture, mining, manufacturing, and digital economy",
          },
          {
            label: "Strategic Location",
            value:
              "Key maritime hub connecting Asia-Pacific trade routes",
          },
          {
            label: "Key Exports",
            value:
              "Palm oil, coal, rubber, textiles, and electronic goods",
          },
          {
            label: "Business Advantage",
            value:
              "Large population, growing middle class, and increasing foreign investment",
          },
        ]}
      />

      <TradeSection
        title="UAE"
        image={uaeImg}
        imageLeft={false}
        content={`The UAE is your gateway to the Middle East and North Africa. Its strategic location and business-friendly policies create powerful opportunities for global commerce.`}
        highlights={[
          {
            label: "Strategic Hub",
            value:
              "Acts as a global trade gateway connecting Asia, Europe, and Africa",
          },
          {
            label: "Business Environment",
            value:
              "Tax-friendly policies, free zones, and ease of doing business",
          },
          {
            label: "Key Sectors",
            value:
              "Oil & gas, logistics, tourism, real estate, and financial services",
          },
          {
            label: "Trade Advantage",
            value:
              "World-class ports like Jebel Ali and advanced logistics infrastructure",
          },
          {
            label: "Growth Opportunity",
            value:
              "Expanding non-oil economy with strong import-export demand",
          },
        ]}
      />

      <PortsSection />
      <ServicesSection />
    </>
  );
};

export default Global;


