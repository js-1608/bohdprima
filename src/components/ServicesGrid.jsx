import React from 'react';
import img1 from "../assets/service/plane.webp"
import img2 from "../assets/service/railway.jpeg"
import img3 from "../assets/service/shipfreight.webp"
import img4 from "../assets/service/truck.jpeg"



const ServicesGrid = () => {
    // Array representing the alternating grid items
    // type: 'text' or 'image'
    const solutions = [
        {
            id: 1,
            type: 'text',
            title: "Rail Freight",
            description: "Efficient and cost-effective transport for large volumes across vast distances. Our rail freight service ensures timely delivery with a focus on reliability and sustainability.",
            linkText: "Connect Now"
        },
        {
            id: 2,
            type: 'image',
            imageSrc: img2,
            alt: "Crane lifting shipping container"
        },
        {
            id: 3,
            type: 'text',
            title: "Ocean Freight",
            description: "Ideal for global trade and bulk shipments. Bogix provides secure and scalable ocean freight solutions, supported by a trusted international shipping network.",
            linkText: "Connect Now"
        },
        {
            id: 4,
            type: 'image',
            imageSrc: img3,
            alt: "Ship loading grain"
        },
        {
            id: 5,
            type: 'image',
            imageSrc: img1,
            alt: "Flatbed truck carrying wind turbine part"
        },
        {
            id: 6,
            type: 'text',
            title: "Air Freight",
            description: "When time matters, our air freight service delivers speed and precision. We connect your business to major global hubs with fast, safe, and trackable air transport.",
            linkText: "Connect Now"
        },
        {
            id: 7,
            type: 'image',
            imageSrc: img2,
            alt: "Hazardous materials barrels"
        },
        {
            id: 8,
            type: 'text',
            title: "Road Freight",
            description: "Flexible ground transportation for domestic and cross-border logistics. Our road freight service offers full-truckload and less-than-truckload options to meet your delivery needs.",
            linkText: "Connect Now"
        }
    ];

    return (
        <section className="py-5 lg:py-16 bg-[#f8f8f8] relative overflow-hidden">
            <div className="container mx-auto px-6 lg:px-8 max-w-[1400px]">

                <h2 className="text-5xl md:text-8xl lg:text-[100px] font-bold color-brand-heading mb-12 tracking-tighter uppercase leading-none">
                    What We Do
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {solutions.map((item) => {
                        if (item.type === 'text') {
                            return (
                                <div key={item.id} className="bg-gradient-hero text-white p-4 lg:p-6 flex flex-col justify-between h-[320px] lg:h-[350px] w-full">
                                    <h3 className="text-2xl lg:text-3xl font-medium text-white leading-[1.15] whitespace-pre-line tracking-tight mb-8">
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
