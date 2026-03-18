import React from "react";
import shipImage from "../assets/ship-Photoroom.png";
const About = () => {
    return (
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden border-b border-white/5">
            <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"></div>
            <div className="relative z-10 text-center px-6">
                <h1 className="text-5xl font-serif-brand font-bold text-white mb-4">
                    About Bodh Prima
                </h1>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                    At Bodh Prima, we are committed to delivering excellence in logistics and supply chain solutions. With a global network and a team of dedicated professionals, we strive to provide innovative and efficient services that meet the unique needs of our clients. Our mission is to connect businesses worldwide, ensuring seamless operations and fostering growth in the ever-evolving world of logistics.
                </p>
            </div>

            {/* Decorative Elements */}
            {/* <div className="absolute -bottom-20 left-1/4 w-40 h-40 bg-brand-accent rounded-full opacity-30 animate-pulse"></div> */}
            {/* <div className="absolute -top-20 right-1/4 w-60 h-60 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div> */}

            <img
                src={shipImage}
                alt="Cargo ship at sea"
                className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[500px] opacity-20 pointer-events-none animate-float"
            />

        </section>
    );  
};

export default About;
