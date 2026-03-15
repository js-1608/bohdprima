import React from 'react';
import img1 from "../assets/solution/export.png"
import img2 from "../assets/solution/import.jpg"
import img3 from "../assets/solution/logistics-and-transportatin.jpg"
import img4 from "../assets/solution/supply-chain.png"


const ServicesGrid = () => {
    // Array representing the alternating grid items
    // type: 'text' or 'image'
    const solutions = [
        {
            id: 1,
            type: 'text',
            title: "Export Services",
            description: "We help businesses ship products from their home country to international markets. Our export services include documentation support, customs clearance, freight coordination, and shipment tracking.",
            linkText: "Connect Now"
        },
        {
            id: 2,
            type: 'image',
            imageSrc: img1,
            alt: "Crane lifting shipping container"
        },
        {
            id: 3,
            type: 'text',
            title: "Import Services",
            description: "Importing goods from other countries requires proper documentation, customs procedures, and logistics planning. Bodh Prima assists businesses in managing these processes efficiently.",
            linkText: "Connect Now"
        },
        {
            id: 4,
            type: 'image',
            imageSrc: img2,
            alt: "Ship loading grain"
        },
        {
            id: 5,
            type: 'image',
            imageSrc: img3,
            alt: "Flatbed truck carrying wind turbine part"
        },
        {
            id: 6,
            type: 'text',
            title: "Logistics and Transportation",
            description: "We provide end-to-end logistics services that include transportation planning, route optimization, and shipment coordination.",
            linkText: "Connect Now"
        },
        {
            id: 7,
            type: 'image',
            imageSrc: img4,
            alt: "Hazardous materials barrels"
        },
        {
            id: 8,
            type: 'text',
            title: "Supply Chain Management",
            description: "Our supply chain solutions integrate transportation, warehousing, and inventory management into a seamless system that improves efficiency and reduces operational risks.",
            linkText: "Connect Now"
        }
    ];

    return (
        <section id="services" className="py-10 lg:py-24 bg-white">
            <div className="container mx-auto px-6 lg:px-8 max-w-[1400px]">

                <h2 className="text-5xl md:text-8xl lg:text-[140px] font-bold text-slate-200/50 mb-12 tracking-tighter uppercase leading-none">
                    Solutions
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {solutions.map((item) => {
                        if (item.type === 'text') {
                            return (
                                <div key={item.id} className="bg-gradient-hero text-white p-4 lg:p-6 flex flex-col justify-between h-[320px] lg:h-[350px] w-full">
                                    <h3 className="text-[16px] lg:text-[24px] font-medium text-white leading-[1.15] whitespace-pre-line tracking-tight mb-8">
                                        {item.title}
                                    </h3>

                                    <div>
                                        <p className="text-white/80 mb-8 whitespace-pre-line leading-relaxed text-[15px]">
                                            {item.description}
                                        </p>

                                        {/* Conditionally render or style link if needed. In screenshots, last row doesn't seem to have "Learn More" clearly visible, but it matches the design pattern */}
                                        <a href="#services" className="inline-block text-white font-bold hover:text-brand-accent transition-colors text-sm">
                                            {item.linkText}
                                        </a>
                                    </div>
                                </div>
                            );
                        } else {
                            return (
                                <div key={item.id} className="h-[320px] lg:h-[350px] w-full relative overflow-hidden group">
                                    {/* Using a subtle dark overlay if needed, otherwise just the image */}
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                                    <img
                                        src={item.imageSrc}
                                        alt={item.alt}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                            );
                        }
                    })}
                </div>
            </div>
        </section>
    );
};

export default ServicesGrid;
