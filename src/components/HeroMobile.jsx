import { ArrowRight, MoveDown } from 'lucide-react';
import heroImage from '../assets/hero.jpg'
import { Link } from 'react-router';
const HeroMobile = () => {
    return (
        <section id="home" className="relative h-screen w-full flex  flex-col items-center justify-center overflow-hidden bg-white">

            {/* Full-screen Background Image with subtle overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/10 to-slate-900/60 z-10"></div>
                <img
                    src={heroImage}
                    alt="Cargo ship at sea"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Centered Content */}
            <div className="relative z-20 flex flex-col items-center text-center px-4 w-full mt-10 lg:mt-0">

                <span className="text-white text-lg md:text-xl font-medium tracking-wide pt-4">
                    Welcome to
                </span>

                <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-color-brand-light text-yellow-500 leading-tight mb-3 sm:mb-4 inline-block tracking-[0.02em] [font-variant-ligatures:none]">
                    Bodh prima
                    <span className="text-white text-2xl lg:text-4xl ml-2 font-normal mt-2 lg:mt-6">&reg;</span>
                </h1>

                <p className="text-white text-lg md:text-2xl font-light mb-4 tracking-wide">
                    Your Global Excellence
                </p>

                <Link to="/contact" className="px-8 py-3 bg-gradient-to-r from-[#f5b544] to-[#125c54] hover:to-[#f5b544] hover:from-[#125c54] text-white rounded-[20px] font-medium text-[17px] transition-colors shadow-lg flex items-center justify-center gap-2">
                    Start Your Journey
                    <ArrowRight size={18} className="mt-0.5" />
                </Link>


                {/* Statistics Container (Moved below button) */}
                <div className="flex items-center gap-12 md:gap-20 mt-16 pt-8 border-t border-white/20">
                    <div className="flex flex-col items-center text-center">
                        <span className="text-brand-accent text-3xl md:text-5xl font-serif-brand font-bold mb-1 block">2021</span>
                        <span className="text-white text-xs md:text-sm tracking-wide font-light">Established</span>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <span className="text-brand-accent text-3xl md:text-5xl font-serif-brand font-bold mb-1 block">5+</span>
                        <span className="text-white text-xs md:text-sm tracking-wide font-light">Years of Experience</span>
                    </div>
                </div>
            </div>



            {/* Scroll Indicator (Centered Bottom) */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex justify-center">
                <div className="w-6 h-10 rounded-full border-2 border-white/50 flex justify-center pt-2">
                    <div className="w-1 h-2 bg-white/70 rounded-full animate-bounce"></div>
                </div>
            </div>

        </section>
    );
};

export default HeroMobile;

