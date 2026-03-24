import { useState } from "react";
import WaterWave from "react-water-wave";

// import railImg from "https://demo.7iquid.com/apexus/wp-content/uploads/2025/11/img10-home2-424x239.webp";
// import oceanImg from "../assets/ocean.jpg";
// import airImg from "../assets/air.jpg";
// import roadImg from "ttps://demo.7iquid.com/apexus/wp-content/uploads/2025/11/img7-home2-424x239.webp";

const services = [
  {
    id: "01",
    title: "Rail Freight",
    image: 'https://demo.7iquid.com/apexus/wp-content/uploads/2025/11/img10-home2-424x239.webp',
    desc: "Efficient and reliable rail freight solutions connecting major trade hubs."
  },
  {
    id: "02",
    title: "Ocean Freight",
    image: 'https://demo.7iquid.com/apexus/wp-content/uploads/2025/11/img9-home2-424x239.webp',
    desc: "Global sea logistics for large shipments with optimized shipping routes."
  },
  {
    id: "03",
    title: "Air Freight",
    image: 'https://demo.7iquid.com/apexus/wp-content/uploads/2025/11/img8-home2-424x239.webp',
    desc: "Fast and secure air freight services for urgent deliveries worldwide."
  },
  {
    id: "04",
    title: "Road Freight",
    image: 'https://demo.7iquid.com/apexus/wp-content/uploads/2025/11/img7-home2-424x239.webp',
    desc: "Flexible ground transportation for domestic and cross-border logistics."
  }
];

export default function FreightSection() {

  const [active, setActive] = useState(3);

  return (
    <section className="relative h-[700px] overflow-hidden text-white">

      {/* WATER RIPPLE BACKGROUND */}
      <WaterWave
        imageUrl={services[active].image}
        dropRadius={25}
        perturbance={0.04}
        resolution={512}
      >
        {() => (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm  freight-bg"></div>
        )}
      </WaterWave>

      {/* CONTENT */}
      <div className="relative z-10 max-w-[2400px] mx-auto px-6 h-full grid lg:grid-cols-2 items-center">

        {/* LEFT TEXT */}
        <div className="transition-all duration-700">

          <p className="text-gray-400 mb-2">
            {services[active].title}
          </p>

          <p className="max-w-md text-lg leading-relaxed">
            {services[active].desc}
          </p>

        </div>

        {/* RIGHT MENU */}
        <div className="space-y-10">

          {services.map((service, index) => (
            <div
              key={service.id}
              onMouseEnter={() => setActive(index)}
              className={`cursor-pointer transition-all duration-500 
              ${active === index
                ? "text-white scale-105"
                : "text-gray-500 hover:text-gray-300"
              }`}
            >

              <div className="flex justify-between items-center border-b border-white/10 pb-6">

                <h2 className="text-5xl font-semibold tracking-tight">
                  {service.title}
                </h2>

                <span className="text-blue-400 text-sm">
                  [{service.id}]
                </span>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}