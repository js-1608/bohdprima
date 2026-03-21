import { TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import BohdPrima from '../assets/bohdprima.avif'
const About = () => {
    return (
        <section className="py-5 lg:pt-20 pb-4 bg-[#fcfcfc] relative overflow-hidden">
            {/* Soft decorative background shapes */}
            <div className="absolute top-0 right-0 w-1/3 h-[500px] bg-brand-light/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-1/4 h-[400px] bg-brand-accent/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>

            <div className="container mx-auto px-6 lg:px-8 max-w-[1400px] relative z-10">
                <div className="flex flex-col-reverse  lg:flex-row items-start gap-16 lg:gap-24">

                    {/* Visual Section */}
                    <div className="w-full lg:w-1/2 relative">
                        <div className="relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 group">
                            <img
                                src={BohdPrima}
                                alt="Global Trade Team"
                                className="w-full h-[500px] object-cover transform 
                                group-hover:scale-105 transition-transform duration-700"
                            />
                            {/* Overlay gradient for modern feel */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>

                            <div className="absolute bottom-8 left-8 text-white">
                                <h4 className="text-2xl font-bold mb-1 tracking-tight">Bodh<span className="text-brand-accent">prima</span></h4>
                                <p className="text-white/80 font-medium">Established 2024</p>
                            </div>
                        </div>

                        {/* Floating Metric */}
                        {/* <div className="absolute -top-10 -right-8 md:-top-12 md:-right-12 bg-white text-slate-900 p-6 md:p-8 rounded-2xl shadow-2xl z-20 border border-slate-100 flex items-center gap-5 translate-y-8 animate-[pullUp_1s_ease-out_forwards]">
                            <div className="w-14 h-14 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand">
                                <TrendingUp size={32} />
                            </div>
                            <div>
                                <span className="block text-3xl font-extrabold text-slate-900 leading-none mb-1">7+</span>
                                <span className="text-slate-500 font-medium text-sm block">Years of<br />Experience</span>
                            </div>
                        </div> */}
                    </div>

                    {/* Content Section */}
                    <div className="w-full lg:w-1/2 lg:mt-0">
                        <span className="text-brand font-bold tracking-widest uppercase text-xl mb-4 block mt-0">Who We Are</span>
                        <h2 className="color-brand-heading text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                            Empowering global trade since 2024.
                        </h2>
                        <p className="lg:text-left text-justify text-lg text-slate-600 mb-6 leading-relaxed">
                            At <strong className="text-slate-900">Bodh prima</strong>, we believe in building trust and lasting business relationships worldwide. Our journey is focused on empowering businesses to succeed in the international market.
                        </p>

                        {/* Brand Meaning Blocks */}
                        <div className="grid grid-cols-2 sm:grid-cols-2 gap-6 mb-8 text-center sm:text-left">
                            <div className="bg-slate-50 border border-slate-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group">
                                <h3 className="text-2xl font-extrabold text-transparent text-gradient mb-2 group-hover:scale-105 transition-transform origin-left">Bodh</h3>
                                <p className="text-slate-700 text-sm font-medium">Awakening & Insight</p>
                            </div>
                            <div className="bg-slate-50 border border-slate-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group">
                                <h3 className="text-2xl font-extrabold text-transparent text-gradient mb-2 group-hover:scale-105 transition-transform origin-left">prima</h3>
                                <p className="text-slate-700 text-sm font-medium">First & Best</p>
                            </div>
                        </div>

                        <Link to="/about-us" className="inline-flex m-auto items-center justify-center gap-3 bg-brand-accent text-slate-900 px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-lg shadow-brand/20 group">
                            <span className='font-semibold'>Learn More About Us</span>
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
