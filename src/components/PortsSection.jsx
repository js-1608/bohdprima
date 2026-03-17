import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import Uae from "../assets/ports/uae.png";
import Singapore from "../assets/ports/singpore.png";
import Rotterdam from "../assets/ports/Netherlands.png";
import Shanghai from "../assets/ports/China.png";
import Mumbai from "../assets/ports/Mumbai.png";
import Houston from "../assets/ports/Hoston.png";
import Santos from "../assets/ports/Brazil.png";
import Durban from "../assets/ports/Africa.png";

const ports = [
  { name: "Jebel Ali", country: "UAE", image: Uae },
  { name: "Singapore", country: "Singapore", image: Singapore },
  { name: "Rotterdam", country: "Netherlands", image: Rotterdam },
  { name: "Shanghai", country: "China", image: Shanghai },
  { name: "Mumbai", country: "India", image: Mumbai },
  { name: "Houston", country: "USA", image: Houston },
  { name: "Santos", country: "Brazil", image: Santos },
  { name: "Durban", country: "South Africa", image: Durban },
];

const PortsSection = () => {
  return (
    <section className="py-12  overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-14 color-brand-heading">
          Major Global Trade Ports
        </h2>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          loop={true}
          speed={3000} // smooth continuous motion
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            320: { slidesPerView: 1.2 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {ports.map((port, index) => (
            <SwiperSlide key={index}>
              
              <div className="group relative rounded-lg overflow-hidden bg-gradient-hero p-5 shadow-lg hover:shadow-[0_0_30px_rgba(0,200,255,0.2)] transition">

                {/* Image */}
                <div className=" flex items-center justify-center overflow-hidden">
                  <img
                    src={port.image}
                    alt={port.name}
                    className="h-full object-contain transition duration-500 group-hover:scale-110 group-hover:rotate-1"
                  />
                </div>

                {/* Overlay Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-t from-blue-500/10 to-transparent"></div>

                {/* Text */}
                <div className="mt-4 text-center relative z-10">
                  <h3 className="text-lg font-semibold text-white">{port.name}</h3>
                  <p className="text-sm text-white">{port.country}</p>
                </div>

              </div>

            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
};

export default PortsSection;