import React from 'react';

const ServicesGrid = () => {
    // Array representing the alternating grid items
    // type: 'text' or 'image'
    const solutions = [
        {
            id: 1,
            type: 'text',
            title: "International\nfreight\nforwarding",
            description: "Move goods worldwide with\nease and full real-time\ncontrol.",
            linkText: "Learn More"
        },
        {
            id: 2,
            type: 'image',
            imageSrc: "https://images.unsplash.com/photo-1586528116311-ad8ed7c80a30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            alt: "Crane lifting shipping container"
        },
        {
            id: 3,
            type: 'text',
            title: "Warehousing\nand logistics",
            description: "Keep stock secure and\ntrack items with smart\nwarehouse tools.",
            linkText: "Learn More"
        },
        {
            id: 4,
            type: 'image',
            imageSrc: "https://images.unsplash.com/photo-1562234502-3ff5442ce310?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            alt: "Ship loading grain"
        },
        {
            id: 5,
            type: 'image',
            imageSrc: "https://images.unsplash.com/photo-1582239460295-a2269c2ece12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            alt: "Flatbed truck carrying wind turbine part"
        },
        {
            id: 6,
            type: 'text',
            title: "Last-mile\ndelivery\nsolutions",
            description: "Get parcels to clients fast\nwith live route and ETA\nupdates.",
            linkText: "Learn More" // Hidden in UI but added for completeness or if hovering
        },
        {
            id: 7,
            type: 'image',
            imageSrc: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            alt: "Hazardous materials barrels"
        },
        {
            id: 8,
            type: 'text',
            title: "Custom logistics\nsolutions",
            description: "Tailor services for unique\ncargo needs or special\nprojects.",
            linkText: "Learn More" // Hidden in UI but added for completeness or if hovering
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
                                <div key={item.id} className="bg-gradient-hero text-white p-10 lg:p-6 flex flex-col justify-between h-[320px] lg:h-[350px] w-full">
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
