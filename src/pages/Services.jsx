import React, { useState } from "react";
import {
	ArrowRight,
	Plane,
	Ship,
	Truck,
	ChevronLeft,
	ChevronRight,
	ShieldCheck,
	PackageCheck,
	FileCheck,
	CircleDollarSign,
	Sparkles,
	Handshake,
	Network,
} from "lucide-react";
import { Link } from "react-router-dom";
import heroImg from "../assets/hero.jpg";
import craneImg from "../assets/ship.jpg";
import containerPortImg from "../assets/ship2.png";
import madeinindia from "../assets/madeinindia.png";

const Services = () => {
	const [activeTradeTab, setActiveTradeTab] = useState(0);

	const expertiseItems = [
		{
			icon: PackageCheck,
			title: "Handling All Types of Shipments",
			description:
				"Air, land, and sea freight solutions tailored to your specific cargo requirements.",
		},
		{
			icon: FileCheck,
			title: "Navigating Export Regulations",
			description:
				"Assistance in complex export regulations and procedures to ensure compliance.",
		},
		{
			icon: ShieldCheck,
			title: "Expert Guidance",
			description:
				"Guidance on packaging, labeling, and documentation requirements for smooth operations.",
		},
	];

	const freightModes = [
		{
			icon: Plane,
			title: "Air Freight",
			description:
				"Fast and reliable air cargo solutions for time-sensitive shipments across global destinations.",
			bullets: ["Express delivery", "Real-time tracking", "Secure handling"],
		},
		{
			icon: Ship,
			title: "Sea Freight",
			description:
				"Cost-effective ocean shipping for large volume cargo. Full container and LCL options available.",
			bullets: ["FCL & LCL options", "Port-to-port service", "Bulk shipping"],
		},
		{
			icon: Truck,
			title: "Land Transport",
			description:
				"Efficient overland logistics connecting regional markets with reliable trucking networks.",
			bullets: ["Cross-border transit", "Door-to-door delivery", "Warehousing"],
		},
	];

	const benefits = [
		"Enhanced competitiveness in the global market",
		"Improved customer satisfaction and loyalty",
		"Access to an extensive network of global trade connections",
		"Personalized support and expertise from our experienced team",
	];

	const whyUs = [
		{
			icon: CircleDollarSign,
			title: "Affordable Pricing",
			description: "We offer competitive market rates.",
		},
		{
			icon: Sparkles,
			title: "Creating Opportunities",
			description: "We create opportunities for businesses big and small.",
		},
		{
			icon: Handshake,
			title: "Making Trade Easy",
			description: "Simplifying the entire export-import process.",
		},
		{
			icon: Network,
			title: "Bridge to Global Commerce",
			description: "We are dedicated to connecting you with the world.",
		},
	];

	const tradeServiceTabs = [
		{
			label: "Export Services",
			tag: "From India to the World",
			title: "Export Services",
			description:
				"Scale your exports with an execution-first team that handles every step from booking to border compliance.",
			items: [
				"Comprehensive logistics solutions",
				"Customs clearance services",
				"Freight forwarding",
				"Export documentation",
			],
			metric: "98%",
			metricLabel: "On-time shipment planning",
		},
		{
			label: "Import Services",
			tag: "Global Markets to India",
			title: "Import Services",
			description:
				"Import confidently with transparent coordination, better timelines, and complete support from port to warehouse.",
			items: [
				"End-to-end import solutions",
				"Import customs processing",
				"Freight Management",
				"Import documentation",
			],
			metric: "24/7",
			metricLabel: "Shipment visibility and updates",
		},
	];

	const currentTradeService = tradeServiceTabs[activeTradeTab];

	const goToPreviousTradeTab = () => {
		setActiveTradeTab((prev) => (prev === 0 ? tradeServiceTabs.length - 1 : prev - 1));
	};

	const goToNextTradeTab = () => {
		setActiveTradeTab((prev) => (prev === tradeServiceTabs.length - 1 ? 0 : prev + 1));
	};

	return (
		<>
			<section className="relative min-h-[84vh] flex items-center justify-center overflow-hidden">
				<div className="absolute inset-0">
					<img
						src={heroImg}
						alt="Global logistics background"
						className="w-full h-full object-cover"
					/>
					<div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-[hsl(195_70%_20%/0.88)] to-slate-900/90" />
					<div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_64px,rgba(255,255,255,0.025)_64px,rgba(255,255,255,0.025)_65px)]" />
				</div>

				<div className="absolute top-1/3 -left-12 w-72 h-72 bg-brand-accent/15 rounded-full blur-[90px] pointer-events-none" />
				<div className="absolute bottom-8 -right-10 w-96 h-96 bg-brand/20 rounded-full blur-[120px] pointer-events-none" />

				<div className="relative z-10 text-center px-6 max-w-4xl pt-20">
					<span className="inline-block text-brand-accent font-bold tracking-[0.22em] uppercase text-xs mb-8 px-5 py-2 border border-brand-accent/30 rounded-full bg-brand-accent/10 backdrop-blur-sm">
						Services We Offer
					</span>
					<h1 className="text-5xl md:text-7xl lg:text-[86px] font-serif font-bold text-white leading-none mb-6">
						Our Expertise
					</h1>
					<p className="text-white/75 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-10">
						We provide top-notch export and import services to help your business
						thrive in the global market. Our expert services are designed to simplify
						international trade.
					</p>

					<Link
						to="/contact"
						className="inline-flex items-center gap-3 bg-brand-accent text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-yellow-400 transition-colors shadow-lg"
					>
						Get Started
						<ArrowRight size={18} />
					</Link>
				</div>

				<div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#fcfcfc] to-transparent" />
			</section>

			<section className="py-24 bg-[#fcfcfc] relative overflow-hidden">
				<div className="absolute top-0 right-0 w-1/3 h-[450px] bg-brand-accent/5 rounded-full blur-[110px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

				<div className="container mx-auto px-6 lg:px-8 max-w-[2400px] relative z-10">
					<div className="text-center mb-14">
						<span className="text-brand font-bold tracking-widest uppercase text-sm mb-3 block">
							Our Expert Services
						</span>
						<h2 className="color-brand-heading text-4xl md:text-5xl font-bold">
							Comprehensive Trade Solutions
						</h2>
						<p className="text-slate-500 max-w-3xl mx-auto mt-4">
							Our expert services include everything you need to succeed in international trade.
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-6">
						{expertiseItems.map(({ icon: Icon, title, description }, index) => (
							<article
								key={index}
								className="group h-[280px] [perspective:1200px]"
							>
								<div className="relative h-full w-full rounded-2xl transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
									<div className="absolute inset-0 bg-white border border-slate-100 rounded-2xl p-8 shadow-sm hover:shadow-xl [backface-visibility:hidden] flex flex-col justify-center">
										<div className="w-14 h-14 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center mb-6">
											<Icon size={26} className="text-brand" />
										</div>
										<h3 className="text-2xl font-bold text-slate-900 mb-3">{title}</h3>
										<p className="text-xs uppercase tracking-[0.2em] text-slate-400 font-semibold">
											Hover to flip
										</p>
									</div>

									<div className="absolute inset-0 rounded-2xl p-8 bg-gradient-to-br from-[hsl(195_70%_28%)] to-[hsl(175_60%_33%)] shadow-xl [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-center border border-white/10">
										<p className="text-brand-accent text-xs uppercase tracking-[0.2em] font-bold mb-4">
											Details
										</p>
										<h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
										<p className="text-white/85 leading-relaxed">{description}</p>
									</div>
								</div>
							</article>
						))}
					</div>
				</div>
			</section>

			<section className="py-24 bg-[#f3f5f7]">
				<div className="container mx-auto px-6 lg:px-8 max-w-[2400px]">
					<div className="text-center mb-14">
						<span className="text-brand font-bold tracking-widest uppercase text-sm mb-3 block">
							Freight Solutions
						</span>
						<h2 className="color-brand-heading text-4xl md:text-5xl font-bold mb-3">
							Multi-Modal Transportation
						</h2>
						<p className="text-slate-500 max-w-3xl mx-auto">
							We handle all types of shipments-air, land, and sea-ensuring your cargo reaches
							its destination safely and on time.
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-6">
						{freightModes.map(({ icon: Icon, title, description, bullets }, index) => (
							<article
								key={index}
								className="rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-md hover:shadow-2xl transition-all duration-300"
							>
								<div className="h-2 bg-gradient-to-r from-brand to-brand-accent" />
								<div className="p-8">
									<div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center mb-6">
										<Icon size={26} className="text-brand" />
									</div>
									<h3 className="text-2xl font-bold text-slate-900 mb-3">{title}</h3>
									<p className="text-slate-500 leading-relaxed mb-6">{description}</p>
									<ul className="space-y-3">
										{bullets.map((bullet, i) => (
											<li key={i} className="flex items-center gap-3 text-slate-700">
												<span className="w-2 h-2 rounded-full bg-brand-accent" />
												{bullet}
											</li>
										))}
									</ul>
								</div>
							</article>
						))}
					</div>
				</div>
			</section>

			<section className="py-24 bg-[linear-gradient(160deg,#e9f7fc_0%,#f8fbfd_40%,#eef8f6_100%)] relative overflow-hidden">
				<div className="absolute -top-24 -left-20 w-72 h-72 rounded-full bg-brand/15 blur-[90px] pointer-events-none" />
				<div className="absolute -bottom-20 -right-10 w-72 h-72 rounded-full bg-brand-accent/20 blur-[100px] pointer-events-none" />

				<div className="container mx-auto px-6 lg:px-8 max-w-[2400px] relative z-10">
					<div className="text-center mb-12">
						<span className="text-brand font-bold tracking-widest uppercase text-sm mb-3 block">
							Service Focus
						</span>
						<h2 className="color-brand-heading text-4xl md:text-5xl font-bold mb-4">
							Export and Import Command Center
						</h2>
						<p className="text-slate-600 max-w-3xl mx-auto">
							Choose your trade lane to explore the exact operational support we provide.
						</p>
					</div>

					<div className="rounded-3xl border border-slate-200/70 bg-white/80 backdrop-blur-sm p-4 sm:p-6 lg:p-8 shadow-[0_20px_70px_-30px_rgba(15,23,42,0.35)]">
						<div className="grid grid-cols-2 gap-3 mb-6 sm:mb-8">
							{tradeServiceTabs.map((tab, index) => (
								<button
									key={tab.label}
									type="button"
									onClick={() => setActiveTradeTab(index)}
									className={`rounded-xl px-4 py-3 sm:px-6 sm:py-4 text-sm sm:text-lg font-semibold transition-all duration-300 border ${
										activeTradeTab === index
											? "bg-slate-950 text-white border-slate-950 shadow-lg"
											: "bg-white text-slate-700 border-slate-200 hover:border-brand/40 hover:text-brand"
									}`}
								>
									{tab.label}
								</button>
							))}
						</div>

						<div className="grid lg:grid-cols-[1.6fr_1fr] gap-6 lg:gap-8 items-stretch">
							<div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
								<p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-brand font-bold mb-4">
									{currentTradeService.tag}
								</p>
								<h3 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
									{currentTradeService.title}
								</h3>
								<p className="text-slate-600 leading-relaxed mb-6">
									{currentTradeService.description}
								</p>

								<ul className="space-y-3">
									{currentTradeService.items.map((item) => (
										<li key={item} className="flex items-start gap-3 text-slate-800">
											<span className="mt-1.5 w-2.5 h-2.5 rounded-full bg-brand-accent flex-shrink-0" />
											<span className="leading-relaxed">{item}</span>
										</li>
									))}
								</ul>
							</div>

							<div className="rounded-2xl bg-gradient-to-br from-slate-900 via-[hsl(195_70%_24%)] to-[hsl(175_60%_31%)] p-6 sm:p-8 text-white flex flex-col justify-between min-h-[250px]">
								<div>
									<p className="text-brand-accent uppercase tracking-[0.2em] text-xs font-bold mb-4">
										Performance Snapshot
									</p>
									<p className="text-5xl sm:text-6xl font-bold leading-none mb-2">
										{currentTradeService.metric}
									</p>
									<p className="text-white/80">{currentTradeService.metricLabel}</p>
								</div>

								<div className="mt-8 flex items-center gap-3">
									<button
										type="button"
										onClick={goToPreviousTradeTab}
										aria-label="Previous service"
										className="w-11 h-11 rounded-full border border-white/35 hover:bg-white/10 transition-colors flex items-center justify-center"
									>
										<ChevronLeft size={20} />
									</button>
									<button
										type="button"
										onClick={goToNextTradeTab}
										aria-label="Next service"
										className="w-11 h-11 rounded-full border border-white/35 hover:bg-white/10 transition-colors flex items-center justify-center"
									>
										<ChevronRight size={20} />
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="py-24 bg-[#fcfcfc]">
				<div className="container mx-auto px-6 lg:px-8 max-w-[2400px]">
					<div className="grid lg:grid-cols-2 gap-12 items-center">
						<div>
							<span className="text-brand font-bold tracking-widest uppercase text-sm mb-3 block">
								Benefits of Partnering with Us
							</span>
							<h2 className="color-brand-heading text-4xl md:text-5xl font-bold mb-6 leading-tight">
								Why Choose Bodh prima?
							</h2>

							<ul className="space-y-4 mb-10">
								{benefits.map((benefit, index) => (
									<li key={index} className="flex items-start gap-4">
										<div className="w-8 h-8 rounded-lg bg-brand-accent/15 flex items-center justify-center mt-0.5 flex-shrink-0">
											<ShieldCheck size={18} className="text-brand" />
										</div>
										<p className="text-slate-600 leading-relaxed">{benefit}</p>
									</li>
								))}
							</ul>

							<Link
								to="/contact"
								className="inline-flex items-center gap-3 bg-brand text-white px-8 py-4 rounded-xl font-semibold hover:bg-brand-dark transition-colors"
							>
								Partner With Us
								<ArrowRight size={18} />
							</Link>
						</div>

						<div className="relative">
							<img
								src="https://bodh-prima.pages.dev/images/b721e71e2a503205e92c9e936b45d4662a26b6d1.avif"
								alt="Port crane loading container"
								className="w-full h-[500px] object-cover rounded-3xl shadow-xl"
							/>
							<div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-slate-900/35 to-transparent" />
							<div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-5 border border-white/60 shadow-lg">
								<p className="text-brand font-bold uppercase tracking-widest text-xs mb-1">Why Us?</p>
								<p className="text-slate-900 text-xl font-bold">Your Bridge to Global Commerce</p>
								<p className="text-slate-600 mt-2 text-sm">
									International trade fuels business growth and global innovation.
									Our mission is to simplify every step of the international trade process.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="py-20 bg-[#f3f5f7]">
				<div className="container mx-auto px-6 lg:px-8 max-w-[2400px]">
					<div className="text-center mb-12">
						<span className="text-brand font-bold tracking-widest uppercase text-sm mb-3 block">
							Why Us?
						</span>
						<h2 className="color-brand-heading text-4xl md:text-5xl font-bold mb-4">
							Your Bridge to Global Commerce
						</h2>
						<p className="text-slate-500 max-w-3xl mx-auto">
							International trade fuels business growth and global innovation. Our mission is to simplify every
							step of the international trade process.
						</p>
					</div>

					<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
						{whyUs.map(({ icon: Icon, title, description }, index) => (
							<article
								key={index}
								className="bg-white rounded-2xl border border-slate-100 shadow-sm p-7 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
							>
								<div className="w-12 h-12 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center mb-5">
									<Icon size={22} className="text-brand" />
								</div>
								<h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
								<p className="text-slate-500 text-sm leading-relaxed">{description}</p>
							</article>
						))}
					</div>
				</div>
			</section>

			<section className="py-24 bg-gradient-to-r from-[hsl(195_70%_28%)] via-[hsl(185_65%_30%)] to-[hsl(175_60%_33%)] relative overflow-hidden">
				<div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.035)_0px,rgba(255,255,255,0.035)_2px,transparent_2px,transparent_78px)] pointer-events-none" />

				<div className="container mx-auto px-6 lg:px-8 max-w-[2400px] relative z-10">
					<div className="grid lg:grid-cols-2 gap-12 items-center">
						<div className="text-white">
							<span className="text-brand-accent font-bold tracking-widest uppercase text-sm mb-3 block">
								Boosting Global Trade
							</span>
							<h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
								Empowering Local Manufacturing
							</h2>
							<p className="text-white/80 leading-relaxed mb-5">
								Boosting Make in India with Exports: Empowering local manufacturing and
								fueling global growth. We help Indian businesses reach international markets
								with confidence.
							</p>
							<p className="text-white/80 leading-relaxed mb-8">
								International trade fuels business growth and global innovation, yet navigating
								its complexities can be overwhelming. Our mission is to simplify every
								step-making it accessible, transparent, and hassle-free for businesses of all sizes.
							</p>

							<Link
								to="/contact"
								className="inline-flex items-center gap-3 bg-brand-accent text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-yellow-400 transition-colors"
							>
								Start Your Export Journey
								<ArrowRight size={18} />
							</Link>
						</div>

						<div className="relative">
							<img
								src={madeinindia}
								alt="Container ship at port"
								className="w-auto h-[460px] object-contain"
							/>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Services;
