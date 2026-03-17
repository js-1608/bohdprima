import React from "react";

const About = () => {
    return (
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden border-b border-white/5">
            <div className="absolute inset-0 opacity-40">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a]"></div>
                {/* Placeholder for a high-quality architectural background image */}
                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80')] bg-cover bg-center" />
            </div>

            <div className="relative z-10 text-center px-4">
                <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
                    Global <span className="text-transparent border-t border-b border-white italic px-4">Impact</span>
                </h1>
                <p className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl font-light leading-relaxed">
                    Redefining the boundaries of design and architecture through a borderless approach to innovation and sustainable infrastructure.
                </p>
            </div>
        </section>
    )
};

export default About;
