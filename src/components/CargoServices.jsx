import { ArrowRight } from 'lucide-react';
import Container from "../assets/container-image.png";
import Container2 from "../assets/container-image2.png";

const CargoServices = () => {
    const services = [
        {
            id: '01',
            title: 'Reliable Global Network',
            desc: 'We work with trusted logistics partners and carriers to ensure smooth transportation across multiple countries and regions.'
        },
        {
            id: '02',
            title: 'Technology Driven Operations',
            desc: 'Our modern tracking and inventory systems provide real-time updates, helping clients monitor their goods throughout the supply chain.'
        },
        {
            id: '03',
            title: 'Customer Focused Approach',
            desc: 'Every business is different. We provide customized logistics and export-import solutions tailored to the specific needs of our clients.'
        },
        {
            id: '04',
            title: 'Secure Handling',
            desc: 'From storage to transportation, every step of the process follows strict safety and quality standards to protect your goods.'
        }
    ];

    return (
        <section id="cargo-services" className="relative pt-16 lg:pt-16 bg-white">
            <div className=" container mx-auto px-6 lg:px-8 max-w-[2400px]">

                {/* Header Section */}
                <div className="">
                    <span className="text-slate-500 font-bold tracking-widest uppercase text-xl mb-6 block">
                        Logistics Vision
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold color-brand-heading mb-6 leading-tight">
                        Why Choose Bodh prima
                    </h2>
                </div>

                {/* Services List */}
                <div className="flex flex-col relative z-10 bg-white">
                    {/* Top border for the first item container */}
                    <div className="border-t border-slate-200 w-full"></div>

                    {services.map((service, idx) => (
                        <div key={idx} className="group border-b border-slate-200 transition-colors duration-300">
                            <div className="py-2 md:py-8 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start md:items-center cursor-pointer">

                                {/* Number */}
                                <div className="md:col-span-2 lg:col-span-2">
                                    <span className="text-3xl md:text-4xl font-medium text-slate-300 group-hover:text-brand-accent transition-colors">
                                        {service.id}
                                    </span>
                                </div>

                                {/* Title */}
                                <div className="md:col-span-4 lg:col-span-4">
                                    <h3 className="text-2xl md:text-3xl font-semibold text-slate-900">
                                        {service.title}
                                    </h3>
                                </div>

                                {/* Description */}
                                <div className="md:col-span-5 lg:col-span-5">
                                    <p className="text-slate-500 text-lg leading-relaxed max-w-lg">
                                        {service.desc}
                                    </p>
                                </div>

                                {/* Arrow Button */}
                                <div className="hidden md:col-span-1 lg:col-span-1 md:flex justify-start md:justify-end mt-4 md:mt-0">
                                    <div className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-brand-accent group-hover:border-brand-accent group-hover:text-slate-900 transition-all duration-300">
                                        <ArrowRight size={24} className="text-slate-400 group-hover:text-slate-900 transition-colors" />
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>

            </div>
             <img
                src={Container}
                alt="Cargo Container"
                className="absolute right-[-120px] top-[0px] w-[800px] z-20 containerSwing z-0 opacity-20 pointer-events-none"
                />
             <img
                src={Container2}
                alt="Cargo Container"
                className="w-full containerFloatSlow z-0 pointer-events-none"
                />
        </section>
    );
};

export default CargoServices;
