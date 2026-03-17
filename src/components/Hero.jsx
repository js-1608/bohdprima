// import { ArrowRight, MoveDown } from 'lucide-react';
// import heroImage from '../assets/hero.jpg'
// const Hero = () => {
//     return (
//         <section id="home" className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">

//             {/* Full-screen Background Image with subtle overlay */}
//             <div className="absolute inset-0 z-0">
//                 <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/50 to-slate-900/80 z-10"></div>
//                 <img
//                     src={heroImage}
//                     alt="Cargo ship at sea"
//                     className="w-full h-full object-cover"
//                 />
//             </div>

//             {/* Centered Content */}
//             <div className="relative z-20 flex flex-col items-center text-center px-4 w-full mt-10 lg:mt-0">

//                 <span className="text-white text-lg md:text-xl font-medium mb-3 tracking-wide">
//                     Welcome to
//                 </span>

//                 <h1 className="text-7xl md:text-8xl lg:text-[130px] font-serif-brand font-bold text-brand-accent mb-6 leading-none tracking-tight flex items-start">
//                     Bodh prima
//                     <span className="text-white text-2xl lg:text-4xl ml-2 font-normal mt-2 lg:mt-6">&reg;</span>
//                 </h1>

//                 <p className="text-white text-lg md:text-2xl font-light mb-12 tracking-wide">
//                     Your Global Excellence
//                 </p>

//                 <button className="px-8 py-3 bg-brand-accent hover:bg-yellow-400 text-slate-900 rounded-[20px] font-bold text-[17px] transition-colors shadow-lg flex items-center justify-center gap-2">
//                     Start Your Journey
//                     <ArrowRight size={18} className="mt-0.5" />
//                 </button>

//                 {/* Statistics Container (Moved below button) */}
//                 <div className="flex items-center gap-12 md:gap-20 mt-16 pt-8 border-t border-white/20">
//                     <div className="flex flex-col items-center text-center">
//                         <span className="text-brand-accent text-3xl md:text-5xl font-serif-brand font-bold mb-1 block">2024</span>
//                         <span className="text-white text-xs md:text-sm tracking-wide font-light">Established</span>
//                     </div>

//                     <div className="flex flex-col items-center text-center">
//                         <span className="text-brand-accent text-3xl md:text-5xl font-serif-brand font-bold mb-1 block">7+</span>
//                         <span className="text-white text-xs md:text-sm tracking-wide font-light">Years of Experience</span>
//                     </div>
//                 </div>
//             </div>



//             {/* Scroll Indicator (Centered Bottom) */}
//             <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex justify-center">
//                 <div className="w-6 h-10 rounded-full border-2 border-white/50 flex justify-center pt-2">
//                     <div className="w-1 h-2 bg-white/70 rounded-full animate-bounce"></div>
//                 </div>
//             </div>

//         </section>
//     );
// };

// export default Hero;




import { ArrowRight } from "lucide-react";
import React from "react";
import WaterWave from "react-water-wave";

import waterImage from "../assets/water.jpg";
import shipImage from "../assets/ship-Photoroom.png";

const Hero = () => {
  return (
    <section className="relative w-full h-[600px] lg:h-screen  flex items-center justify-center overflow-hidden">

      {/* WATER RIPPLE BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <WaterWave
          imageUrl={waterImage}
          dropRadius={20}
          perturbance={0.04}
          resolution={512}
          style={{
            width: "100%",
            height: "100%",
            backgroundSize: "cover",
            backgroundPosition: "bottom",
          }}
        >
          {() => (
            <div className="absolute inset-0 bg-slate-900/60"></div>
          )}
        </WaterWave>
      </div>

      {/* SHIP IMAGE (NO RIPPLE) */}
      {/* <img
        src={shipImage}
        alt="ship"
        className="absolute bottom-1/4 left-1/2 -translate-x-1/2 z-1 
        w-full md:w-[55%] lg:w-[90%] object-contain pointer-events-none"
      /> */}

      {/* CONTENT */}
      <div className="relative z-20 flex flex-col items-center text-center px-6 ">

        <span className="text-white text-sm md:text-lg  tracking-widest">
          Welcome to
        </span>

        <h1 className="text-6xl md:text-7xl lg:text-7xl font-serif font-bold text-yellow-400 leading-none mb-4">
          Bodh prima
          <span className="text-white text-sm md:text-lg ml-2 align-top">
            ®
          </span>
        </h1>
        <img
          src={shipImage}
          alt="ship"
          className="
           w-full md:w-[55%] lg:w-[90%] object-contain opacity-80 pointer-events-none"
          draggable={false}
        />
        <p className="text-white text-base md:text-xl mt-4 mb-2 font-light">
          Your Global Excellence
        </p>

        <button className="py-3 px-8 lg:px-7 lg:py-3 text-sm bg-linear-to-r from-[#0f6b80] to-[#918d3e] hover:to-[#0f6b80] hover:from-[#918d3e] text-white rounded-full font-semibold flex items-center gap-2 transition cursor-pointer shadow-lg  ">
          Start Your Journey
          <ArrowRight size={18} />
        </button>

        {/* STATS */}
        {/* <div className="flex gap-10 md:gap-20 mt-12 border-t border-white/20 pt-8">

          <div>
            <p className="text-yellow-400 text-2xl md:text-4xl font-bold">
              2024
            </p>
            <p className="text-white text-xs md:text-sm">
              Established
            </p>
          </div>

          <div>
            <p className="text-yellow-400 text-2xl md:text-4xl font-bold">
              7+
            </p>
            <p className="text-white text-xs md:text-sm">
              Years Experience
            </p>
          </div>

        </div> */}
      </div>

      {/* SCROLL INDICATOR */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;