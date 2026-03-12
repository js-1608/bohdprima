import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowRight, Globe } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gradient-hero pt-20 pb-10 border-t border-white/20">

            {/* Newsletter Block */}


            {/* Main Footer Content */}
            <div className="container mx-auto px-6 lg:px-8 max-w-[1400px]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <Globe className="text-brand-accent w-8 h-8" />
                            <span className="text-2xl font-bold tracking-tight text-white">
                                Bodh <span className="text-brand-accent">Prima &reg;</span>
                            </span>
                        </div>
                        <p className="text-white/80 leading-relaxed mb-6">
                            Your Excellence in Global Enlightenment. We believe in building trust and lasting business relationships worldwide, empowering businesses to succeed globally.
                        </p>
                        <div className="flex items-center gap-4">
                            {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-brand-accent hover:text-slate-900 transition-colors">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Column 1 */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">Services</h4>
                        <ul className="space-y-4">
                            {['Export Services', 'Import Services', 'Freight Solutions'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-white/80 hover:text-brand-accent transition-colors">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Links Column 2 */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">Company</h4>
                        <ul className="space-y-4">
                            {['About Us', 'Our Services', 'Blog', 'Trade Guide', 'FAQs', 'Support'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-white/80 hover:text-brand-accent transition-colors">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div id="contact">
                        <h4 className="text-white font-bold text-lg mb-6">Headquarters</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-white/80 group">
                                <MapPin size={20} className="text-brand-accent mt-1 flex-shrink-0" />
                                <span className="group-hover:text-white transition-colors">100 Global Commerce Blvd<br />Trade District, NY 10001</span>
                            </li>
                            <li className="flex items-center gap-3 text-white/80 group">
                                <Phone size={20} className="text-brand-accent flex-shrink-0" />
                                <span className="group-hover:text-white transition-colors">+1 (800) 555-TRADE</span>
                            </li>
                            <li className="flex items-center gap-3 text-white/80 group">
                                <Mail size={20} className="text-brand-accent flex-shrink-0" />
                                <span className="group-hover:text-white transition-colors">contact@globaltrade.example.com</span>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Copyright Bar */}
                <div className="pt-8 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-white/60 text-sm">
                        &copy; 2024 Bodh prima. All Rights Reserved.
                    </p>
                    <div className="flex items-center gap-6 text-sm">
                        <a href="#" className="text-white/60 hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="text-white/60 hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>

        </footer>
    );
};

export default Footer;
