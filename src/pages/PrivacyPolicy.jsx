import React from "react";
import { ShieldCheck, FileText, Lock, Globe, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImg from "../assets/hero.jpg";

const PrivacyPolicy = () => {
    const sections = [
        {
            icon: FileText,
            title: "Information We Collect",
            content:
                "We may collect contact details, company information, shipment requirements, trade documentation details, billing information, and communications you submit through our forms, calls, or direct business interactions.",
        },
        {
            icon: ShieldCheck,
            title: "How We Use Information",
            content:
                "We use this information to respond to inquiries, coordinate logistics, process import-export service requests, prepare quotations, manage documentation, improve client support, and comply with applicable legal and regulatory obligations.",
        },
        {
            icon: Lock,
            title: "Data Protection",
            content:
                "We take reasonable administrative and operational measures to protect business and personal information from unauthorized access, misuse, alteration, or disclosure. Access is limited to authorized personnel and service functions only.",
        },
        {
            icon: Globe,
            title: "Third-Party Sharing",
            content:
                "Information may be shared only when necessary to deliver services, including with logistics providers, customs agents, freight partners, payment processors, or regulatory authorities involved in legitimate import-export operations.",
        },
    ];

    return (
        <>
            <section className="relative min-h-[52vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img src={heroImg} alt="Privacy policy background" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-[hsl(195_70%_22%/0.9)] to-slate-900/88" />
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_64px,rgba(255,255,255,0.025)_64px,rgba(255,255,255,0.025)_65px)]" />
                </div>

                <div className="relative z-10 text-center px-6 max-w-4xl pt-24">
                    <span className="inline-block text-brand-accent font-bold tracking-[0.22em] uppercase text-xs mb-8 px-5 py-2 border border-brand-accent/30 rounded-full bg-brand-accent/10 backdrop-blur-sm">
                        Legal Information
                    </span>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-none mb-6">
                        Privacy Policy
                    </h1>
                    <p className="text-white/75 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-4">
                        This Privacy Policy explains how Bodh prima handles business and personal information in connection with our import-export, logistics, documentation, and trade support services.
                    </p>
                    <p className="text-white/60 text-sm uppercase tracking-widest">Effective Date: March 20, 2026</p>
                </div>

                <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#fcfcfc] to-transparent" />
            </section>

            <section className="py-24 bg-[#fcfcfc] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-[420px] bg-brand-accent/5 rounded-full blur-[110px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="container mx-auto px-6 lg:px-8 max-w-[2400px] relative z-10">
                    <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start mb-14">
                        <div>
                            <span className="text-brand font-bold tracking-widest uppercase text-sm mb-3 block">Overview</span>
                            <h2 className="color-brand-heading text-4xl md:text-5xl font-bold leading-tight mb-6">
                                Responsible Handling of Trade Information
                            </h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                In the import-export business, information accuracy and confidentiality are essential. We collect only the information reasonably required to support inquiries, shipments, compliance processes, documentation workflows, client servicing, and lawful business administration.
                            </p>
                            <p className="text-slate-600 leading-relaxed">
                                By using our website or contacting our team, you acknowledge that certain business information may need to be processed so we can coordinate services with shipping lines, customs representatives, logistics partners, and other authorized stakeholders.
                            </p>
                        </div>

                        <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-lg">
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Privacy Principles</h3>
                            <ul className="space-y-4 text-slate-600">
                                <li className="flex items-start gap-3"><span className="mt-2 h-2 w-2 rounded-full bg-brand-accent" />We collect relevant information only.</li>
                                <li className="flex items-start gap-3"><span className="mt-2 h-2 w-2 rounded-full bg-brand-accent" />We use information for legitimate service delivery.</li>
                                <li className="flex items-start gap-3"><span className="mt-2 h-2 w-2 rounded-full bg-brand-accent" />We protect business communications responsibly.</li>
                                <li className="flex items-start gap-3"><span className="mt-2 h-2 w-2 rounded-full bg-brand-accent" />We share data only when operationally or legally required.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {sections.map(({ icon: Icon, title, content }, index) => (
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
                <div className="container mx-auto px-6 lg:px-8 max-w-[2400px]">
                    <div className="bg-white border border-slate-100 rounded-3xl shadow-lg p-10 md:p-12">
                        <h2 className="color-brand-heading text-3xl md:text-4xl font-bold mb-6">Retention, Rights, and Contact</h2>
                        <div className="space-y-5 text-slate-600 leading-relaxed">
                            <p>
                                We retain information only for as long as reasonably necessary for operational, accounting, customer support, risk management, and regulatory purposes.
                            </p>
                            <p>
                                If you want to update your contact information, ask a question about how your business information is used, or request clarification on this policy, you may contact us directly.
                            </p>
                            <p>
                                Bodh prima may revise this Privacy Policy from time to time to reflect operational, legal, or service changes. The latest version published on this website will apply.
                            </p>
                        </div>

                        <div className="mt-8">
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

export default PrivacyPolicy;