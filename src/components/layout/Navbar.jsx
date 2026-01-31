import { useState, useRef, useLayoutEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useScrollPosition } from '@hooks';
import { gsap } from 'gsap';

// Logo from public folder - use URL encoded path for spaces
const sigmaLogo = '/Sigma%20Logo.jpg';

/**
 * Navigation links configuration
 */
const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Solar Solutions', href: '#solar' },
  { name: 'Batteries', href: '#batteries' },
  { name: 'Inverters', href: '#inverters' },
  { name: 'About Us', href: '#about' },
];

/**
 * Navbar Component
 * Fixed navigation bar with mobile responsive design and GSAP animations
 */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const scrolled = useScrollPosition(50);
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Initial logo and nav links animation
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out', delay: 0.2 }
      );

      const links = linksRef.current?.querySelectorAll('.nav-link');
      if (links?.length) {
        gsap.fromTo(
          links,
          { opacity: 0, y: -20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
            delay: 0.4,
          }
        );
      }
    }, navRef);

    return () => ctx.revert();
  }, []);

  // Animate mobile menu
  useLayoutEffect(() => {
    if (!mobileMenuRef.current) return;

    if (isOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );

      const items = mobileMenuRef.current.querySelectorAll('.mobile-link');
      gsap.fromTo(
        items,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.3,
          stagger: 0.05,
          ease: 'power2.out',
          delay: 0.1,
        }
      );
    }
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav
      ref={navRef}
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled
        ? 'bg-white shadow-md py-1.5 sm:py-2'
        : 'bg-white/90 backdrop-blur-md py-2 sm:py-3 lg:py-4 shadow-sm'
        }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a ref={logoRef} href="#home" className="flex items-center flex-shrink-0">
            <img
              src={sigmaLogo}
              alt="SIGMA Sales & Services"
              className="w-auto object-contain"
              style={{ height: 'clamp(60px, 8vw, 120px)' }}
            />
          </a>

          {/* Desktop Navigation */}
          <div ref={linksRef} className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="nav-link font-medium text-gray-700 hover:text-blue-700 transition-colors text-sm xl:text-base relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-700 after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="nav-link px-4 xl:px-5 py-2 bg-blue-700 text-white font-bold rounded-full hover:bg-blue-800 hover:scale-105 transition-all shadow-lg hover:shadow-blue-900/20 text-xs xl:text-sm"
            >
              Get Quote
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-700 p-1.5 sm:p-2"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X className="w-6 h-6 sm:w-7 sm:h-7" /> : <Menu className="w-6 h-6 sm:w-7 sm:h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          ref={mobileMenuRef}
          className="lg:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl max-h-[calc(100vh-64px)] overflow-y-auto z-40"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={handleLinkClick}
              className="mobile-link block px-4 sm:px-6 py-3 sm:py-4 text-gray-700 hover:bg-gray-50 font-medium border-b border-gray-50 text-sm sm:text-base"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={handleLinkClick}
            className="mobile-link block px-4 sm:px-6 py-3 sm:py-4 text-blue-700 font-bold bg-blue-50 text-sm sm:text-base"
          >
            Contact Us
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
