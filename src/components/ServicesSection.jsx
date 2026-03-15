import { Ship, Container, PackageSearch, Truck, Globe, MapPin } from "lucide-react";

const services = [
  {
    icon: Ship,
    title: "Modern cargo services",
    desc: "Boxly is focused on shaping logistics by offering reliable transport."
  },
  {
    icon: Container,
    title: "Smart freight tools",
    desc: "We give firms seamless ways to connect with clients through clear, simple freight moves."
  },
  {
    icon: PackageSearch,
    title: "Custom cargo plans",
    desc: "At Boxly, we shine in giving flexible shipping that fits your needs best."
  },
  {
    icon: Truck,
    title: "Fast delivery systems",
    desc: "Our logistics solutions ensure timely delivery across international routes."
  },
  {
    icon: Globe,
    title: "Global transport",
    desc: "We provide international freight solutions connecting worldwide markets."
  },
  {
    icon: MapPin,
    title: "Route optimization",
    desc: "Smart route planning ensures efficient and cost-effective shipping."
  }
];

export default function ServicesSection() {
  return (
    <section className="py-20 bg-linear-to-b from-[#ffffff] to-[#d1d5db]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-semibold text-gray-800">
            We move goods with
          </h2>
          <h2 className="text-4xl font-semibold text-gray-600">
            speed and care
          </h2>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">

          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow hover:shadow-lg transition duration-300 flex flex-col justify-between"
              >
                <div className="p-8">

                  <Icon className="text-yellow-600 mb-6" size={40} />

                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    {service.title}
                  </h3>

                  <p className="text-gray-500 text-sm">
                    {service.desc}
                  </p>

                </div>

                <div className="border-t px-8 py-4">
                  <button className="text-sm text-gray-700 hover:text-black font-medium">
                    Learn More
                  </button>
                </div>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}