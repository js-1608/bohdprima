import React, { useEffect, useState, useRef } from 'react';
import { Users, Zap, ClipboardCheck, ShieldCheck, Box } from 'lucide-react';

const WhyUs = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    // Auto-play carousel for mobile
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % 5);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    const features = [
        {
            icon: Users,
            title: "Client-first approach",
            desc: "Personalized service and clear\ncommunication.",
            posDesktop: "top-[15%] left-[2%] lg:left-[5%] text-right",
            align: "items-end"
        },
        {
            icon: Zap,
            title: "Creating\nOpportunities",
            desc: "We create opportunities for\nbusinesses to succeed globally.",
            posDesktop: "top-[25%] right-[2%] lg:right-[5%] text-left",
            align: "items-start"
        },
        {
            icon: ClipboardCheck,
            title: "Compliance &\nreliability",
            desc: "Accurate documentation and on-\ntime performance.",
            posDesktop: "top-[50%] left-[0%] lg:left-[5%] text-right",
            align: "items-end"
        },
        {
            icon: ShieldCheck,
            title: "Making Trade Easy",
            desc: "Simplifying the export-import\nprocess for all businesses.",
            posDesktop: "top-[65%] right-[2%] lg:right-[5%] text-left",
            align: "items-start"
        },
        {
            icon: Box,
            title: "End-to-end capability",
            desc: "Single point of contact from\nprocurement to delivery.",
            posDesktop: "bottom-[0%] left-1/2 -translate-x-1/2 text-center",
            align: "items-center"
        }
    ];

    // SVG Circle Component with precise mathematical 5-segment dash offsets
    const RotateCircle = ({ rotation }) => (
        <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
            {/* The rotating segmented ring */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full drop-shadow-lg" style={{ transform: `rotate(${rotation}deg)`, transition: 'transform 0.1s ease-out' }}>
                <circle cx="50" cy="50" r="40" fill="none" stroke="#22d3ee" strokeWidth="16" strokeDasharray="45 206.32" strokeDashoffset="0" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="16" strokeDasharray="45 206.32" strokeDashoffset="-50.26" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" strokeWidth="16" strokeDasharray="45 206.32" strokeDashoffset="-100.52" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#0ea5e9" strokeWidth="16" strokeDasharray="45 206.32" strokeDashoffset="-150.78" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#2dd4bf" strokeWidth="16" strokeDasharray="45 206.32" strokeDashoffset="-201.04" />
            </svg>

            {/* The inner static center */}
            <div className="absolute w-28 h-28 md:w-36 md:h-36 bg-slate-900 rounded-full border-[6px] border-slate-800 flex flex-col items-center justify-center text-center p-2 shadow-[0_0_30px_rgba(0,0,0,0.5)] z-10">
                <span className="text-brand-accent text-[9px] md:text-[11px] font-bold mb-1 uppercase tracking-widest">Why Us</span>
                <span className="text-white text-xs md:text-sm font-semibold leading-tight">Your Bridge to<br />Global Commerce</span>
            </div>
        </div>
    );

    return (
        <section id="why-us" className="bg-gradient-hero py-20 lg:py-24 relative overflow-hidden">
            <div className="container mx-auto px-6 lg:px-8 max-w-[1400px]">

                {/* Header */}
                <div className="text-center mb-16 md:mb-24 relative z-20">
                    <span className="text-brand-accent font-bold tracking-widest uppercase text-sm mb-4 block">Why Choose Us</span>
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif-brand font-bold text-white mb-6">
                        Why Us
                    </h2>
                </div>

                {/* Mobile Layout (Carousel) */}
                <div className="md:hidden flex flex-col items-center py-10 relative z-20">
                    
                    {/* Rotating Circle (Clickable) */}
                    <div 
                        className="mb-10 relative flex-shrink-0 cursor-pointer touch-manipulation tap-highlight-transparent"
                        onClick={() => setActiveIndex((prev) => (prev + 1) % features.length)}
                    >
                        {/* Target each segment's angle (360/5 = 72 deg). We rotate backwards so it looks like it's spinning to the next one. */}
                        <RotateCircle rotation={-activeIndex * 72} />
                        
                        {/* Interactive hint */}
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-[10px] uppercase tracking-widest font-bold animate-pulse whitespace-nowrap">
                            Tap to Revolve
                        </div>
                    </div>

                    {/* Active Content Container */}
                    <div className="relative w-full min-h-[220px]">
                        {features.map((feature, idx) => {
                            const isActive = activeIndex === idx;
                            return (
                                <div 
                                    key={idx} 
                                    className={`absolute top-0 left-0 right-0 flex flex-col items-center text-center transition-all duration-500 transform ${isActive ? 'opacity-100 translate-x-0 scale-100 pointer-events-auto' : 'opacity-0 translate-x-12 scale-95 pointer-events-none'}`}
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-5 border border-white/20 shadow-lg backdrop-blur-sm">
                                        <feature.icon size={28} className="text-brand-accent" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2 leading-tight">{feature.title.replace('\n', ' ')}</h3>
                                    <p className="text-white/80 text-sm leading-relaxed max-w-sm px-4">{feature.desc.replace('\n', ' ')}</p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Pagination Dots */}
                    <div className="flex items-center gap-3 mt-6">
                        {features.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveIndex(idx)}
                                className={`h-2 rounded-full transition-all duration-300 ${activeIndex === idx ? 'w-8 bg-brand-accent' : 'w-2 bg-white/20'}`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Desktop Layout (Stationary circle, connecting lines) */}
                <div className="hidden md:block relative w-full h-[750px] mb-20 z-10">

                    {/* Background Connecting Lines */}
                    <div className="absolute inset-0 pointer-events-none opacity-40 z-0">
                        <svg className="w-full h-full" viewBox="0 0 1000 800" preserveAspectRatio="none">
                            {/* Assumes circle is exactly in center (500,400) mapping loosely to grid spots */}
                            <line x1="500" y1="400" x2="250" y2="200" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
                            <line x1="500" y1="400" x2="750" y2="250" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
                            <line x1="500" y1="400" x2="200" y2="400" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
                            <line x1="500" y1="400" x2="750" y2="550" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
                            <line x1="500" y1="400" x2="500" y2="700" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
                        </svg>
                    </div>

                    {/* Centered Circle (Static Desktop) */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
                        <RotateCircle rotation={0} />
                    </div>

                    {/* Features Absolute Positioned */}
                    {features.map((feature, idx) => (
                        <div key={idx} className={`absolute ${feature.posDesktop} flex flex-col ${feature.align} max-w-[280px] lg:max-w-xs z-20`}>
                            <div className={`flex items-start gap-4 mb-3 ${feature.align === 'items-center' ? 'flex-col items-center text-center' : ''}`}>
                                {feature.align === 'items-end' ? (
                                    <>
                                        <div>
                                            <h3 className="text-xl lg:text-2xl font-bold text-white whitespace-pre-line leading-tight">{feature.title}</h3>
                                        </div>
                                        <feature.icon size={32} className="text-brand-accent shrink-0 mt-1" />
                                    </>
                                ) : feature.align === 'items-center' ? (
                                    <>
                                        <feature.icon size={32} className="text-brand-accent mb-2" />
                                        <h3 className="text-xl lg:text-2xl font-bold text-white whitespace-pre-line leading-tight w-full">{feature.title}</h3>
                                    </>
                                ) : (
                                    <>
                                        <feature.icon size={32} className="text-brand-accent shrink-0 mt-1" />
                                        <div>
                                            <h3 className="text-xl lg:text-2xl font-bold text-white whitespace-pre-line leading-tight">{feature.title}</h3>
                                        </div>
                                    </>
                                )}
                            </div>
                            <p className="text-white/80 text-[15px] leading-relaxed whitespace-pre-line font-medium drop-shadow-md">{feature.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Footer Paragraph */}
                <div className="text-center md:mt-24 max-w-3xl mx-auto z-20 relative px-4 pb-10 md:pb-0">
                    <p className="text-white/80 text-lg leading-relaxed font-medium">
                        We offer end-to-end export services—from procurement and packaging to documentation and delivery—ensuring every shipment is handled with precision and care.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default WhyUs;
