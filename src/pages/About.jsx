import React from "react";
import { ArrowRight, Globe, Shield, Zap, Users, Heart, Target, Award, TrendingUp } from "lucide-react";
import { Link } from "react-router";
import bohdPrima from "../assets/bohdprima.avif";
import heroImg from "../assets/hero.jpg";
import shipImage from "../assets/ship-Photoroom.png";
import shipThree from "../assets/ship3.png";
import containerImage from "../assets/container-image.webp";

const About = () => {
    const coreValues = [
        {
            icon: Shield,
            title: "Integrity",
            desc: "We conduct every transaction with full transparency, honesty, and accountability — building trust that lasts for decades.",
            accent: "brand",
        },
        {
            icon: Zap,
            title: "Innovation",
            desc: "We embrace technology and creative thinking to offer smarter, faster, and more efficient global trade solutions.",
            accent: "brand-accent",
        },
        {
            icon: Users,
            title: "Client Focus",
            desc: "Your success is our mission. We tailor every service to meet the unique goals and requirements of each partner.",
            accent: "brand",
        },
        {
            icon: Heart,
            title: "Commitment",
            desc: "We go beyond delivering shipments — we build relationships and stand by our clients at every stage of their journey.",
            accent: "brand-accent",
        },
    ];

    const stats = [
        { num: "50+", label: "Countries Reached" },
        { num: "500+", label: "Shipments Handled" },
        { num: "100%", label: "Client Satisfaction" },
        { num: "2024", label: "Year Founded" },
    ];

    return (
        <>
            {/* =========================================================
                HERO SECTION
            ========================================================= */}
            <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={heroImg}
                        alt="Global trade background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-[hsl(195_70%_20%/0.9)] to-slate-900/90"></div>
                    {/* Subtle grid lines */}
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_60px,rgba(255,255,255,0.02)_60px,rgba(255,255,255,0.02)_61px),repeating-linear-gradient(90deg,transparent,transparent_60px,rgba(255,255,255,0.02)_60px,rgba(255,255,255,0.02)_61px)]"></div>
                </div>

                {/* Glow blobs */}
                <div className="absolute top-1/3 left-[10%] w-80 h-80 bg-brand-accent/10 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute bottom-1/4 right-[10%] w-96 h-96 bg-brand/20 rounded-full blur-[120px] pointer-events-none"></div>

                {/* Floating ship silhouette */}
                <img
                    src={shipImage}
                    alt=""
                    aria-hidden="true"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[680px] opacity-10 pointer-events-none select-none"
                />

                {/* Content */}
                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-20">
                    <span className="inline-block text-brand-accent font-bold tracking-[0.25em] uppercase text-xs mb-8 px-5 py-2 border border-brand-accent/30 rounded-full bg-brand-accent/10 backdrop-blur-sm">
                        Our Story
                    </span>

                    <h1 className="text-6xl md:text-7xl lg:text-[90px] font-serif font-bold text-white leading-none mb-6">
                        About{" "}
                        <span className="text-brand-accent">
                            Bodh Prima
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed mb-12">
                        Bodh prima believes in building trust and lasting business relationships worldwide. We create a positive impact on our clients and customers all around the globe.
                    </p>

                    {/* Key figures */}
                    <div className="flex items-center justify-center gap-10 md:gap-20 pt-8 border-t border-white/10">
                        <div className="text-center">
                            <span className="block text-4xl md:text-5xl font-bold font-serif text-brand-accent">50+</span>
                            <span className="text-white/60 text-xs uppercase tracking-widest mt-1 block">Countries</span>
                        </div>
                        <div className="w-px h-12 bg-white/20"></div>
                        <div className="text-center">
                            <span className="block text-4xl md:text-5xl font-bold font-serif text-brand-accent">500+</span>
                            <span className="text-white/60 text-xs uppercase tracking-widest mt-1 block">Shipments</span>
                        </div>
                        <div className="w-px h-12 bg-white/20"></div>
                        <div className="text-center">
                            <span className="block text-4xl md:text-5xl font-bold font-serif text-brand-accent">2024</span>
                            <span className="text-white/60 text-xs uppercase tracking-widest mt-1 block">Established</span>
                        </div>
                    </div>
                </div>

                {/* Bottom fade */}
                <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#fcfcfc] to-transparent z-10"></div>
            </section>

            {/* =========================================================
                WHO WE ARE
            ========================================================= */}
            <section className="pt-8 pb-24 bg-[#fcfcfc] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-[500px] bg-brand-accent/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-1/4 h-[400px] bg-brand/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>

                <div className="container mx-auto px-6 lg:px-8 max-w-[1400px] relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">

                        {/* Image column */}
                        <div className="relative">
                            <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
                                <img
                                    src={bohdPrima}
                                    alt="Bodh Prima team at work"
                                    className="w-full h-[520px] object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent"></div>
                                <div className="absolute bottom-8 left-8">
                                    <p className="text-brand-accent font-bold text-sm uppercase tracking-widest mb-1">Est. 2024</p>
                                    <h4 className="text-2xl font-bold text-white">Bodh<span className="text-brand-accent">prima</span></h4>
                                </div>
                            </div>

                            {/* Floating stat badge */}
                            <div className="absolute -top-6 -right-6 bg-white rounded-2xl px-6 py-5 shadow-2xl border border-slate-100 z-20">
                                <p className="text-4xl font-bold color-brand-heading leading-none mb-1">50+</p>
                                <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Countries Served</p>
                            </div>

                            {/* Decorative accent line */}
                            {/* <div className="absolute -bottom-4 -left-4 w-24 h-24 border-2 border-brand-accent/30 rounded-2xl pointer-events-none"></div> */}
                        </div>

                        {/* Text column */}
                        <div>
                            <span className="text-brand font-bold tracking-widest uppercase text-sm mb-4 block">Who We Are</span>
                            <h2 className="color-brand-heading text-4xl md:text-5xl font-bold mb-6 leading-tight">
                                Empowering Global Trade Since 2024
                            </h2>

                            <p className="text-slate-600 leading-relaxed mb-8">
                                Bodh prima is a rising export house which believes in building trust and lasting business relationships worldwide. Our approach integrates a dedicated team that enables us to seamlessly cater to the requirements of our international clientele.
                            </p>
                            <p className="text-slate-600 leading-relaxed mb-8">
                                At Bodh prima, our name reflects a blend of timeless wisdom and modern excellence. It drives our mission to deliver innovative solutions that help businesses succeed globally and stay ahead in a changing market.</p>

                            <p className="text-slate-600 leading-relaxed mb-8">
                                Bodh prima symbolizes a fresh awakening in thought, innovation, and global trade, elevating local potential to achieve global standards in pursuit of Your Excellence in Global Enlightenment.                            </p>

                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                NAME MEANING
            ========================================================= */}
            <section className="py-24 bg-[#f3f5f7] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-80 h-80 bg-brand-accent/10 rounded-full blur-[110px] -translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-brand/10 rounded-full blur-[120px] translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

                <div className="container mx-auto px-6 lg:px-8 max-w-[1400px] relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-brand font-bold tracking-widest uppercase text-sm mb-3 block">Brand Meaning</span>
                        <h2 className="color-brand-heading text-4xl md:text-5xl font-bold leading-tight">
                            The Meaning of Bodh Prima
                        </h2>
                        <p className="text-slate-500 max-w-3xl mx-auto mt-4 leading-relaxed">
                            Our name carries a purpose: insight to guide every move, and excellence to deliver lasting results.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        <article className="group h-[430px] [perspective:1200px]">
                            <div className="relative h-full w-full rounded-3xl transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                                <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-xl border border-slate-100 [backface-visibility:hidden]">
                                    <img
                                        src="https://bodh-prima.pages.dev/images/4d31d8abc123f2696f3fa1c587653fa7f6b8720d.avif"
                                        alt="Cargo operations representing Bodh"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/35 to-transparent"></div>
                                    <div className="absolute top-6 left-6 w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center">
                                        <TrendingUp size={24} className="text-brand-accent" />
                                    </div>
                                    <div className="absolute bottom-8 left-8 right-8 text-white">
                                        {/* <span className="inline-block text-brand-accent uppercase text-xs font-bold tracking-[0.2em] mb-3">
                                            "Bodh"
                                        </span> */}
                                        <h3 className="text-3xl font-bold mb-2">Awakening With Insight</h3>
                                        <p className="text-white/80 text-sm uppercase tracking-widest">Hover to flip</p>
                                    </div>
                                </div>

                                <div className="absolute inset-0 rounded-3xl p-9 bg-white border border-slate-100 shadow-2xl [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-center">
                                    <span className="text-brand font-bold uppercase text-xs tracking-[0.2em] mb-4">Meaning</span>
                                    <h3 className="text-3xl font-bold text-slate-900 mb-5">"Bodh"</h3>
                                    <p className="text-slate-600 leading-relaxed text-lg">
                                        Symbolizes awakening, enlightenment, and deep insight - our commitment to continuous learning,
                                        innovation, and guiding you through global markets with clarity and foresight.
                                    </p>
                                </div>
                            </div>
                        </article>

                        <article className="group h-[430px] [perspective:1200px]">
                            <div className="relative h-full w-full rounded-3xl transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                                <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-xl border border-white/10 [backface-visibility:hidden]">
                                    <img
                                        src="https://bodh-prima.pages.dev/images/a6da7076c8328a6d129c36646e705dcb2afebc22.avif"
                                        alt="Container operations representing Prima"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-[hsl(195_70%_25%/0.45)] to-transparent"></div>
                                    <div className="absolute top-6 left-6 w-12 h-12 rounded-xl bg-brand-accent/20 backdrop-blur-sm border border-brand-accent/35 flex items-center justify-center">
                                        <Award size={24} className="text-brand-accent" />
                                    </div>
                                    <div className="absolute bottom-8 left-8 right-8 text-white">
                                        {/* <span className="inline-block text-brand-accent uppercase text-xs font-bold tracking-[0.2em] mb-3">
                                            "prima"
                                        </span> */}
                                        <h3 className="text-3xl font-bold mb-2">First. Best. Trusted.</h3>
                                        <p className="text-white/80 text-sm uppercase tracking-widest">Hover to flip</p>
                                    </div>
                                </div>

                                <div className="absolute inset-0 rounded-3xl p-9 bg-gradient-to-br from-[hsl(195_70%_28%)] to-[hsl(175_60%_33%)] border border-white/10 shadow-2xl [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-center">
                                    <span className="text-brand-accent font-bold uppercase text-xs tracking-[0.2em] mb-4">Meaning</span>
                                    <h3 className="text-3xl font-bold text-white mb-5">"prima"</h3>
                                    <p className="text-white/85 leading-relaxed text-lg">
                                        Means first and best - reflecting our drive for excellence, leadership, and delivering top-tier
                                        services to all our valued partners and clients.
                                    </p>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            {/* =========================================================
                MISSION & VISION
            ========================================================= */}
            <section className="py-24 bg-[#f3f5f7] relative overflow-hidden">
                <div className="container mx-auto px-6 lg:px-8 max-w-[1400px]">
                    <div className="text-center mb-16">
                        <span className="text-brand font-bold tracking-widest uppercase text-sm mb-3 block">Our Purpose</span>
                        <h2 className="color-brand-heading text-4xl md:text-5xl font-bold leading-tight">
                            Mission &amp; Vision
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Mission card — dark brand bg */}
                        <div className="bg-gradient-to-br from-[hsl(195_70%_28%)] to-[hsl(175_60%_33%)] text-white rounded-3xl p-10 lg:p-12 relative overflow-hidden group">
                            <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/5 rounded-full pointer-events-none"></div>
                            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-brand-accent/10 rounded-full pointer-events-none"></div>
                            <div className="w-14 h-14 bg-brand-accent/20 border border-brand-accent/30 rounded-2xl flex items-center justify-center mb-7">
                                <Target size={28} className="text-brand-accent" />
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-5">Our Mission</h3>
                            <p className="text-white/80 leading-relaxed text-lg">
                                Empowering global trade by supporting local businesses, one step at a time.
                            </p>
                            <p className="text-white/80 leading-relaxed text-lg">
                                At Bodh prima, we connect products, shopkeepers, and markets to global trade. We empower small businesses, local manufacturers, and MSMEs with streamlined solutions to break free from traditional boundaries and compete on an international level.
                            </p>
                        </div>

                        {/* Vision card — white bg */}
                        <div className="bg-white border border-slate-100 rounded-3xl p-10 lg:p-12 relative overflow-hidden shadow-lg group">
                            <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand/5 rounded-full pointer-events-none"></div>
                            <div className="w-14 h-14 bg-brand/10 border border-brand/20 rounded-2xl flex items-center justify-center mb-7">
                                <Globe size={28} className="text-brand" />
                            </div>
                            <h3 className="text-3xl font-bold color-brand-heading mb-5">Our Vision</h3>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                Your Excellence in Global Enlightenment.
                            </p>
                            <p className="text-slate-600 leading-relaxed text-lg">

                                We envision a world where every business, regardless of size, has access to the tools and expertise needed to succeed globally. Transforming challenges into opportunities and potential into achievement—that is the Bodh prima promise.                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                CORE VALUES
            ========================================================= */}
            <section className="py-24 bg-[#fcfcfc] relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-1/3 h-[400px] bg-brand/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-1/4 h-[350px] bg-brand-accent/5 rounded-full blur-[80px] -translate-y-1/3 translate-x-1/3 pointer-events-none"></div>

                <div className="container mx-auto px-6 lg:px-8 max-w-[1400px] relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-brand font-bold tracking-widest uppercase text-sm mb-3 block">What Drives Us</span>
                        <h2 className="color-brand-heading text-4xl md:text-5xl font-bold leading-tight">
                            Our Core Values
                        </h2>
                        <p className="text-slate-500 max-w-xl mx-auto mt-4 leading-relaxed">
                            Every decision we make is guided by a set of principles that define who we are and how we serve our global partners.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {coreValues.map(({ icon: Icon, title, desc, accent }, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 cursor-default"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <Icon
                                        size={26}
                                        className={accent === "brand-accent" ? "text-brand-accent" : "text-brand"}
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
                                <p className="text-slate-500 leading-relaxed text-sm">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* =========================================================
                STATS BAND
            ========================================================= */}
            <section className="bg-gradient-to-r from-[hsl(195_70%_28%)] via-[hsl(185_65%_30%)] to-[hsl(175_60%_33%)] py-20 relative overflow-hidden">
                {/* Decorative stripes */}
                <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.03)_0px,rgba(255,255,255,0.03)_2px,transparent_2px,transparent_80px)] pointer-events-none"></div>

                <div className="container mx-auto px-6 lg:px-8 max-w-[1400px] relative z-10">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
                        {stats.map(({ num, label }, i) => (
                            <div key={i} className="text-center group">
                                <p className="text-5xl lg:text-6xl font-bold font-serif text-brand-accent mb-3 group-hover:scale-110 transition-transform duration-300">
                                    {num}
                                </p>
                                <div className="w-8 h-0.5 bg-brand-accent/40 mx-auto mb-3"></div>
                                <p className="text-white/70 font-medium uppercase tracking-widest text-xs">
                                    {label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* =========================================================
                CTA BANNER
            ========================================================= */}
            <section className="py-24 bg-[#f3f5f7]">
                <div className="container mx-auto px-6 lg:px-8 max-w-[1400px]">
                    <div className="relative bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                        {/* Decorative side accent */}
                        <div className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-brand to-brand-accent"></div>
                        {/* Background blob */}
                        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-accent/5 rounded-full blur-[80px] translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>

                        <div className="flex flex-col md:flex-row items-center justify-between gap-10 px-10 md:px-16 py-14">
                            <div className="max-w-xl">
                                <span className="text-brand font-bold tracking-widest uppercase text-xs mb-3 block">Ready to Start?</span>
                                <h2 className="color-brand-heading text-4xl md:text-5xl font-bold leading-tight mb-4">
                                    Let's Build Something Great Together
                                </h2>
                                <p className="text-slate-500 leading-relaxed">
                                    Partner with Bodh Prima and experience seamless global trade. Our team is ready to support your business at every step of the journey.
                                </p>
                            </div>

                            <Link
                                to="/contact"
                                className="flex-shrink-0 inline-flex items-center gap-3 bg-brand-accent text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-400 transition-colors shadow-lg shadow-brand-accent/20 group"
                            >
                                Get in Touch
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default About;
