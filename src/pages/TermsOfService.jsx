import React from "react";
import { FileCheck, ShieldCheck, Globe, PackageCheck, CircleDollarSign, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImg from "../assets/hero.jpg";

const TermsOfService = () => {
    const terms = [
        {
            icon: FileCheck,
            title: "Use of Services",
            content:
                "Our services are intended for lawful import-export, logistics, documentation, sourcing, and trade support activities. Clients are responsible for ensuring that the goods, documents, and instructions they provide are accurate, complete, and legally permissible.",
        },
        {
            icon: PackageCheck,
            title: "Shipments and Documentation",
            content:
                "Clients must provide correct shipment details, product descriptions, classifications, invoices, declarations, permits, and any other required documents. Delays, penalties, or losses arising from inaccurate or incomplete information remain the responsibility of the client.",
        },
        {
            icon: Globe,
            title: "Compliance and Restricted Goods",
            content:
                "Clients agree not to request services involving prohibited, restricted, unsafe, misdeclared, or non-compliant goods. Bodh prima may refuse or suspend services where compliance, safety, legal, or reputational concerns arise.",
        },
        {
            icon: CircleDollarSign,
            title: "Quotes, Charges, and Payments",
            content:
                "Quotations are subject to change based on shipping conditions, carrier rates, duties, taxes, inspections, storage, documentation requirements, and other operational variables. Payment terms, where applicable, must be honored according to agreed commercial arrangements.",
        },
        {
            icon: ShieldCheck,
            title: "Liability and Service Scope",
            content:
                "Bodh prima coordinates services with external logistics and trade partners where required. While we work to ensure reliable execution, we are not liable for delays, disruptions, inspections, port congestion, regulatory actions, or third-party failures beyond our reasonable control.",
        },
    ];

    return (
        <>
            <section className="relative min-h-[52vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img src={heroImg} alt="Terms of service background" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-linear-to-br from-slate-900/95 via-[hsl(195_70%_22%/0.9)] to-slate-900/88" />
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_64px,rgba(255,255,255,0.025)_64px,rgba(255,255,255,0.025)_65px)]" />
                </div>

                <div className="relative z-10 text-center px-6 max-w-4xl pt-24">
                    <span className="inline-block text-brand-accent font-bold tracking-[0.22em] uppercase text-xs mb-8 px-5 py-2 border border-brand-accent/30 rounded-full bg-brand-accent/10 backdrop-blur-sm">
                        Legal Information
                    </span>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-none mb-6">
                        Terms of Service
                    </h1>
                    <p className="text-white/75 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-4">
                        These Terms of Service govern the use of Bodh prima's website and our general import-export, logistics, documentation, and trade facilitation support services.
                    </p>
                    <p className="text-white/60 text-sm uppercase tracking-widest">Effective Date: March 20, 2026</p>
                </div>

                <div className="absolute bottom-0 inset-x-0 h-20 bg-linear-to-t from-[#fcfcfc] to-transparent" />
            </section>

            <section className="py-24 bg-[#fcfcfc] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1/3 h-105 bg-brand/5 rounded-full blur-[110px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                <div className="container mx-auto px-6 lg:px-8 max-w-350 relative z-10">
                    <div className="text-center mb-14">
                        <span className="text-brand font-bold tracking-widest uppercase text-sm mb-3 block">Service Terms</span>
                        <h2 className="color-brand-heading text-4xl md:text-5xl font-bold mb-4">
                            General Conditions for Trade Services
                        </h2>
                        <p className="text-slate-500 max-w-3xl mx-auto">
                            These terms are written to provide a practical legal framework for professional import-export business engagements and website usage.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {terms.map(({ icon: Icon, title, content }, index) => (
                            <article key={index} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 hover:shadow-xl transition-all duration-300">
                                <div className="w-14 h-14 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center mb-6">
                                    <Icon size={26} className="text-brand" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">{title}</h3>
                                <p className="text-slate-600 leading-relaxed">{content}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-[#f3f5f7]">
                <div className="container mx-auto px-6 lg:px-8 max-w-350">
                    <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
                        <div className="bg-linear-to-br from-[hsl(195_70%_28%)] to-[hsl(175_60%_33%)] text-white rounded-3xl p-10 md:p-12 shadow-xl">
                            <h2 className="text-3xl md:text-4xl font-bold mb-5">Important Notes</h2>
                            <div className="space-y-4 text-white/85 leading-relaxed">
                                <p>
                                    Service-specific contracts, quotations, invoices, shipping instructions, and commercial documents may include additional terms that apply alongside these general Terms of Service.
                                </p>
                                <p>
                                    Continued use of this website or our services indicates acceptance of these terms. If you do not agree, please discontinue use and contact us before engaging services.
                                </p>
                                <p>
                                    We may update these terms periodically to reflect operational, commercial, or regulatory changes.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-lg">
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Need Clarification?</h3>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                If you need clarification regarding our service scope, documentation responsibilities, or commercial processes, our team can help before engagement.
                            </p>
                            <Link to="/contact" className="inline-flex items-center gap-3 bg-brand-accent text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-yellow-400 transition-colors shadow-lg">
                                Contact Our Team
                                <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default TermsOfService;