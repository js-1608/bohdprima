import { Globe, Lightbulb, TrendingUp } from 'lucide-react';

const WhatWeDo = () => {
    const features = [
        {
            icon: Globe,
            title: "Global Connectivity",
            desc: "Seamlessly bridging local commerce with international markets, opening doors to fresh opportunities and expanded reach.",
            color: "text-blue-500",
            bg: "bg-blue-500/10"
        },
        {
            icon: Lightbulb,
            title: "Innovative Solutions",
            desc: "Custom-tailored strategies convert everyday trade challenges into competitive advantages.",
            color: "text-brand",
            bg: "bg-brand/10"
        },
        {
            icon: TrendingUp,
            title: "Sustainable Growth",
            desc: "By fostering partnerships built on trust and strategic insight, we empower your business to achieve remarkable, sustainable success.",
            color: "text-emerald-500",
            bg: "bg-emerald-500/10"
        }
    ];

    return (
        <section id="what-we-do" className="py-20 lg:py-24 bg-slate-50 relative">
            <div className="container mx-auto px-6 lg:px-8 max-w-[2400px] relative z-10">
                <div className="text-left lg:text-center mb-16 max-w-3xl mx-auto">
                    <span className="text-brand font-bold tracking-widest uppercase text-sm mb-4 block">What We Do</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                        Enhancing Your Global Trade with Our <span className="text-brand">Tailored Solutions</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <div key={idx} className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl shadow-slate-200/50 border border-slate-100 hover:-translate-y-2 transition-transform duration-500 group relative overflow-hidden">
                            {/* Decorative top border */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-hero transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                            <div className={`w-16 h-16 rounded-2xl ${feature.bg} ${feature.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                                <feature.icon size={32} />
                            </div>

                            <h3 className="text-2xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhatWeDo;
