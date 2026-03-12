import { Globe2, Package, Truck, Users } from 'lucide-react';

const Stats = () => {
    const statsList = [
        { id: 1, icon: Globe2, count: "150+", label: "Countries Served" },
        { id: 2, icon: Package, count: "2M+", label: "Tons Exported" },
        { id: 3, icon: Truck, count: "10K+", label: "Deliveries Monthly" },
        { id: 4, icon: Users, count: "500+", label: "Global Partners" }
    ];

    return (
        <section className="py-20 bg-slate-900 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-hero mix-blend-multiply opacity-40"></div>
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-50"></div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
                    {statsList.map((stat) => {
                        const IconComponent = stat.icon;
                        return (
                            <div key={stat.id} className="flex flex-col items-center text-center group">
                                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-brand-accent/20 transition-colors duration-300 shadow-[0_0_15px_rgba(234,179,8,0.1)] group-hover:shadow-[0_0_25px_rgba(234,179,8,0.3)]">
                                    <IconComponent size={32} className="text-brand-accent group-hover:scale-110 transition-transform duration-300" />
                                </div>
                                <div className="text-4xl lg:text-5xl font-extrabold text-white mb-2 tracking-tight">
                                    {stat.count}
                                </div>
                                <div className="text-slate-400 font-medium uppercase tracking-wider text-sm">
                                    {stat.label}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Stats;
