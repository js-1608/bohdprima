import { ArrowRight } from 'lucide-react';

const CargoServices = () => {
    const services = [
        {
            id: '01',
            title: 'Freight services',
            desc: 'At Bodh prima, we deliver trusted cargo services that help your business reach new markets. Our solutions ensure safe, quick, and cost-effective delivery every time.'
        },
        {
            id: '02',
            title: 'Storage solutions',
            desc: 'Bodh prima offers flexible storage and inventory services that keep your goods safe and always accessible. Our team uses smart tools to manage your stock with accuracy and speed.'
        },
        {
            id: '03',
            title: 'Last-mile care',
            desc: 'Bodh prima excels at fast, green last-mile delivery so your cargo arrives on time, every time. We make sure your goods reach their final stop safe and hassle-free.'
        }
    ];

    return (
        <section id="cargo-services" className="py-5 lg:py-16 bg-white">
            <div className="container mx-auto px-6 lg:px-8 max-w-[1400px]">

                {/* Header Section */}
                <div className="mb-8 md:mb-12">
                    <span className="text-slate-500 font-bold tracking-widest uppercase text-sm mb-6 block">
                        Logistics Vision
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                        We transform cargo services
                    </h2>
                </div>

                {/* Services List */}
                <div className="flex flex-col">
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
                                <div className="md:col-span-1 lg:col-span-1 flex justify-start md:justify-end mt-4 md:mt-0">
                                    <div className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-brand-accent group-hover:border-brand-accent group-hover:text-slate-900 transition-all duration-300">
                                        <ArrowRight size={24} className="text-slate-400 group-hover:text-slate-900 transition-colors" />
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default CargoServices;
