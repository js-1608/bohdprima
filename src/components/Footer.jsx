import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
    const serviceLinks = [
        { label: 'Export Services', href: '/services' },
        { label: 'Import Services', href: '/services' },
        { label: 'Freight Solutions', href: '/services' },
    ];

    const companyLinks = [
        { label: 'About Us', href: '/about-us' },
        { label: 'Our Services', href: '/services' },
        { label: 'Blog', href: '/blog' },
        { label: 'Trade Guide', href: '/global' },
        { label: 'Support', href: '/contact' },
    ];

    return (
        <footer className="bg-linear-to-t from-[#f5b544] to-[#125c54] pt-10 pb-10 border-t border-white/20">
            {/* Main Footer Content */}
            <div className="container mx-auto px-6 lg:px-8 max-w-[2400px]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-2">

                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-2 mb-6 bg-white p-2 rounded-lg w-max">
                            <Link
                                href="/"
                                className={`text-2xl font-bold tracking-tight text-white flex items-center gap-2`}>
                                <img src="/logo-bp.png" alt="Logo" className="w-auto h-16" />
                            </Link>
                            <span className="text-4xl font-bold tracking-tight text-[#00535A]">
                                Bodh <span className="text-brand-accent">prima </span>
                            </span>
                        </div>
                        <p className="text-white/80 leading-relaxed mb-6">
                            Bodh prima ® — Trade House for Your Global Excellence. We believe in building trust and lasting business relationships worldwide, empowering businesses to succeed globally.
                        </p>
                    </div>

                    {/* Links Column 1 */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">Services</h4>
                        <ul className="space-y-4">
                            {serviceLinks.map((item) => (
                                <li key={item.label}>
                                    <Link href={item.href} className="text-white/80 hover:text-brand-accent transition-colors">{item.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Links Column 2 */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">Company</h4>
                        <ul className="space-y-4">
                            {companyLinks.map((item) => (
                                <li key={item.label}>
                                    <Link href={item.href} className="text-white/80 hover:text-brand-accent transition-colors">{item.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div id="contact">
                        <h4 className="text-white font-bold text-lg mb-6">Let's Connect</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-white/80 group">
                                <MapPin size={20} className="text-brand-accent mt-1 shrink-0" />
                                <span className="group-hover:text-white transition-colors">New Delhi, India</span>
                            </li>
                            <li className="flex items-center gap-3 text-white/80 group">
                                <Phone size={20} className="text-brand-accent shrink-0" />
                                <a href="tel:+919718667757" className="group-hover:text-white transition-colors">97186 67757</a>
                            </li>
                            <li className="flex items-center gap-3 text-white/80 group">
                                <Mail size={20} className="text-brand-accent shrink-0" />
                                <a href="mailto:hello@bodhprima.com" className="group-hover:text-white transition-colors">hello@bodhprima.com</a>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Copyright Bar */}
                <div className="pt-8 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-white/60 text-sm">
                        &copy; 2026 Bodh prima. All Rights Reserved.
                    </p>
                    <div className="flex items-center gap-6 text-sm">
                        <Link href="/privacy-policy" className="text-white/60 hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms-of-service" className="text-white/60 hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
