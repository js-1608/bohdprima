import { CheckCircle2, TrendingUp, Anchor, PackageCheck } from 'lucide-react';

const Features = () => {
    const featuresList = [
        "Global Network Operating in 150+ Countries",
        "Real-Time Cargo Tracking & Analytics",
        "Automated Customs Clearance Processing",
        "Secure Storage & Warehousing Solutions"
    ];

    return (
        <section id="about" className="py-24 bg-white relative">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                    
                    {/* Image Section */}
                    <div className="w-full lg:w-1/2 relative">
                        {/* Abstract background blobs */}
                        <div className="absolute -top-10 -left-10 w-48 h-48 bg-brand-light/30 rounded-full mix-blend-multiply filter blur-2xl opacity-70"></div>
                        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-brand-accent/30 rounded-full mix-blend-multiply filter blur-2xl opacity-70"></div>
                        
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-10">
                            <img
                                src="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                                alt="Warehouse and Shipping"
                                className="w-full h-[500px] object-cover"
                            />
                        </div>

                        {/* Experience Badge */}
                        <div className="absolute -bottom-8 -right-8 md:bottom-8 md:-right-12 bg-slate-900 text-white p-8 rounded-2xl shadow-xl z-20 border border-slate-700 animate-fade-in flex items-center gap-6 group hover:border-brand-accent transition-colors">
                            <div className="text-brand-accent group-hover:scale-110 transition-transform">
                                <TrendingUp size={48} />
                            </div>
                            <div>
                                <span className="block text-4xl font-extrabold mb-1">20+</span>
                                <span className="text-slate-300 font-medium leading-tight block">Years of<br />Global Trade</span>
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="w-full lg:w-1/2 mt-12 lg:mt-0">
                        <span className="text-brand font-bold tracking-wider uppercase text-sm mb-3 block">Why Choose Us</span>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                            Your Reliable Partner in <span className="text-brand">Global Commerce</span>
                        </h2>
                        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                            We don't just move boxes; we empower your business to scale globally. 
                            Our innovative logistics frameworks and deep industry connections ensure 
                            your supply chain is resilient, cost-effective, and surprisingly fast.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                            {featuresList.map((item, index) => (
                                <div key={index} className="flex items-start gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                    <CheckCircle2 className="text-brand flex-shrink-0 mt-0.5" size={24} />
                                    <span className="text-slate-800 font-medium">{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center gap-6">
                            <button className="bg-brand hover:bg-brand-dark text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-brand/30 hover:-translate-y-1">
                                Discover Our Vision
                            </button>
                            <div className="flex items-center gap-3 text-slate-600 font-medium">
                                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                                    <PackageCheck size={24} className="text-brand"/>
                                </div>
                                <span>ISO 9001<br/>Certified</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Features;
