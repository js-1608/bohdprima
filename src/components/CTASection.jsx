import { ArrowRight } from 'lucide-react';

const CTASection = () => {
    return (
        <section className="py-20 lg:py-24 relative overflow-hidden bg-brand-light">
            {/* Immersive background overlay */}
            <div className="absolute inset-0 bg-gradient-hero mix-blend-multiply opacity-50 z-0"></div>
            
            {/* Large background typography */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-0 pointer-events-none">
                <h2 className="text-[120px] md:text-[200px] font-black text-white/5 whitespace-nowrap tracking-tighter">
                    COMMITMENT
                </h2>
            </div>
            
            <div className="container mx-auto px-6 lg:px-8 max-w-[1400px] relative z-10 text-center">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white mb-8 mx-auto text-sm font-bold tracking-widest uppercase shadow-xl">
                    <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
                    Your Success, Our Commitment
                </span>
                
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-8 leading-tight">
                    Ready to Transform <br className="hidden md:block"/> Your Trade?
                </h2>
                
                <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-12">
                    At Bodh prima, we build global trade on trust and innovation. Partner with us to enter a collaborative journey where your success story is our guiding force. Transform challenges into opportunities and unlock the potential of your local business on the international stage. 
                    <br/><br/>
                    <strong className="text-white font-bold">At Bodh prima, your success is our commitment.</strong>
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <a href="#contact" className="w-full sm:w-auto px-10 py-5 bg-brand-accent hover:bg-yellow-400 text-slate-900 rounded-xl font-bold text-lg transition-transform hover:-translate-y-1 shadow-[0_0_30px_rgba(234,179,8,0.3)] flex items-center justify-center gap-3">
                        <span>Contact Us Today</span>
                        <ArrowRight size={22} />
                    </a>
                    <a href="#insights" className="w-full sm:w-auto px-10 py-5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-xl font-bold text-lg transition-colors flex items-center justify-center">
                        Explore Insights
                    </a>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
