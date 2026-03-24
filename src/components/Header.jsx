import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const navigationItems = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about-us' },
  { label: 'Services', to: '/services' },
  { label: 'Global', to: '/global' },
  { label: 'Blog', to: '/blog' },
];

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
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className={`text-2xl font-bold tracking-tight ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
            <img src="logo-bp.png" alt="Logo" className="w-auto h-16" />
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {navigationItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className={`font-medium transition-colors hover:text-brand-accent ${isScrolled ? 'text-slate-700' : 'text-white/90'}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

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

      <div className={`md:hidden absolute top-full left-0 w-full bg-white shadow-xl transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-96 border-t border-slate-100' : 'max-h-0'}`}>
        <ul className="flex flex-col py-4 px-6 gap-4">
          {navigationItems.map((item) => (
            <li key={item.label}>
              <Link
                to={item.to}
                onClick={toggleMobileMenu}
                className="block text-slate-800 font-medium hover:text-brand"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="pt-4 border-t border-slate-100">
            <Link to="/contact" onClick={toggleMobileMenu} className="flex items-center justify-center gap-2 bg-brand text-white px-6 py-3 rounded-md font-semibold text-center w-full">
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
