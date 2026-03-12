import React, { useState, useRef, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQ = () => {
    // Default open the first tab based on screenshot
    const [openIndex, setOpenIndex] = useState(1);

    const questions = [
        {
            q: "How can I start using Bodh prima?",
            a: "Reach out to our team via the contact form or give us a call. We'll set up an initial consultation to understand your logistics needs and provide a tailored solution."
        },
        {
            q: "Do you offer remote consultations?",
            a: "Yes, our team can meet you online, so you can plan your logistics from anywhere in the world with ease."
        },
        {
            q: "Which sectors do you support most?",
            a: "We have extensive experience supporting the manufacturing, agriculture, technology, and retail sectors, though our global network is equipped to handle specialized cargo for any industry."
        },
        {
            q: "Does Bodh prima help new companies?",
            a: "Absolutely. We simplify the complex export-import process, acting as a single point of contact to help emerging businesses scale their operations globally without the traditional overhead."
        }
    ];

    return (
        <section id="faq" className="py-20 lg:py-24 bg-[#f4f5f5]">
            <div className="container mx-auto px-6 lg:px-8 max-w-[1400px]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                    
                    {/* Left Column: Heading */}
                    <div>
                        <span className="text-slate-600 font-bold tracking-widest uppercase text-xs mb-4 block">
                            NEED HELP WITH YOUR SHIPMENT?
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif-brand font-bold text-slate-900 mb-6 leading-tight">
                            Common questions about Bodh prima
                        </h2>
                        <p className="text-slate-500 text-base md:text-lg leading-relaxed max-w-md">
                            Bodh prima moves your cargo worldwide with care, speed, and expert help from start to finish. We keep your goods safe and your plans on track.
                        </p>
                    </div>

                    {/* Right Column: Accordion */}
                    <div className="flex flex-col border-t border-slate-300">
                        {questions.map((item, idx) => {
                            const isOpen = openIndex === idx;

                            return (
                                <div 
                                    key={idx} 
                                    className="border-b border-slate-300 group"
                                >
                                    {/* Accordion Header (Clickable) */}
                                    <button 
                                        className="w-full flex items-center justify-between py-6 md:py-8 text-left focus:outline-none"
                                        onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                                        aria-expanded={isOpen}
                                    >
                                        <h3 className={`text-lg md:text-xl font-bold pr-8 transition-colors duration-300 ${isOpen ? 'text-transparent bg-clip-text bg-gradient-hero' : 'text-slate-800 group-hover:text-brand'}`}>
                                            {item.q}
                                        </h3>
                                        <div className="flex-shrink-0 text-slate-500">
                                            {isOpen ? (
                                                <Minus size={20} className="text-brand stroke-[2.5px]" />
                                            ) : (
                                                <Plus size={20} className="stroke-[2.5px]" />
                                            )}
                                        </div>
                                    </button>

                                    {/* Accordion Body (Animated Height) */}
                                    <div 
                                        className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 pb-6 md:pb-8' : 'grid-rows-[0fr] opacity-0 pb-0'}`}
                                    >
                                        <div className="overflow-hidden">
                                            <p className="text-slate-500 text-sm md:text-base leading-loose max-w-xl">
                                                {item.a}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
