import { useState, useEffect } from 'react';
import { Menu, X, Globe, Phone } from 'lucide-react';
import { Link } from 'react-router';
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className={`text-2xl font-bold tracking-tight ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
            {/* Bodh <span className="text-brand-accent">Prima &reg;</span> */}
            <img src="https://bodhprima.vercel.app/assets/bodh-prima-logo-C9xp6Q-h.png" alt="Logo" className="w-auto h-16" />
          </Link>
          {/* <Registered className={`w-2 h-2 ${isScrolled ? 'text-brand' : 'text-white'}`} /> */}

        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {['Home', 'About Us', 'Services', 'Global', 'Blog'].map((item) => (
            <Link
              key={item}
              to={`${item.toLowerCase().replace(' ', '-')}`}
              className={`font-medium transition-colors hover:text-brand-accent ${isScrolled ? 'text-slate-700' : 'text-white/90'}`}
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* CTA Banner & Mobile Toggle */}
        <div className="flex items-center gap-4">
                         

          <Link to="/contact" className="hidden md:flex items-center gap-2 bg-brand-accent text-slate-900 px-6 py-2.5 rounded-full font-semibold hover:bg-yellow-400 transition-colors shadow-sm">
            <Phone size={18} />
            <span>Contact Us</span>
          </Link>

          <button className={`md:hidden ${isScrolled ? 'text-slate-900' : 'text-white'}`} onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-white shadow-xl transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-96 border-t border-slate-100' : 'max-h-0'}`}>
        <ul className="flex flex-col py-4 px-6 gap-4">
          {['Home', 'About Us', 'Services', 'Global', 'Blog'].map((item) => (
            <li key={item}>
              <Link 
                to={`/${item.toLowerCase().replace(' ', '-')}`}
                onClick={toggleMobileMenu}
                className="block text-slate-800 font-medium hover:text-brand"
              >
                {item}
              </Link>
            </li>
          ))}
          <li className="pt-4 border-t border-slate-100">
            <a href="#contact" className="flex items-center justify-center gap-2 bg-brand text-white px-6 py-3 rounded-md font-semibold text-center w-full">
              Contact Us
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
