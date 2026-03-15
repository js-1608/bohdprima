import React from "react";

const ports = [
  {
    name: "Jebel Ali",
    country: "UAE",
    image: "https://images.unsplash.com/photo-1581093588401-12c0d5e9c4b1"
  },
  {
    name: "Singapore",
    country: "Singapore",
    image: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13"
  },
  {
    name: "Rotterdam",
    country: "Netherlands",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e"
  },
  {
    name: "Shanghai",
    country: "China",
    image: "https://images.unsplash.com/photo-1530518119128-ca0bd1a06482"
  },
  {
    name: "Mumbai",
    country: "India",
    image: "https://images.unsplash.com/photo-1526481280691-7d0bfa9c5cfa"
  },
  {
    name: "Houston",
    country: "USA",
    image: "https://images.unsplash.com/photo-1578574577315-3fbeb0cecdc2"
  },
  {
    name: "Santos",
    country: "Brazil",
    image: "https://images.unsplash.com/photo-1580674285054-bed31e145f59"
  },
  {
    name: "Durban",
    country: "South Africa",
    image: "https://images.unsplash.com/photo-1542317854-3b9b37f7c2a4"
  }
];

const PortsSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1400px]">

        <h2 className="text-4xl font-bold text-center mb-14">
          Major Global Trade Ports
        </h2>

        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-8">

          {ports.map((port, index) => (
            <div
              key={index}
              className="group rounded-xl overflow-hidden bg-gradient-hero  transition duration-300 shadow-lg hover:shadow-2xl"
            >
              
              <div className="h-48 overflow-hidden">
                <img
                  src={port.image}
                  alt={port.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              <div className="p-4 text-center text-white">
                <h3 className="text-xl font-semibold">{port.name}</h3>
                <p className="text-sm text-white">{port.country}</p>
              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default PortsSection;