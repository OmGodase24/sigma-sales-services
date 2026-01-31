import { useRef, useLayoutEffect, useState } from 'react';
import { Phone, Mail, MapPin, Factory, Navigation, ExternalLink } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Location data with Google Maps coordinates
 */
const locations = [
  {
    name: 'Office - Shahupuri',
    address: 'Shop No. 1, Ground Floor, Royal Plaza, Dabholkar Corner, Shahupuri, Kolhapur',
    coordinates: '16.7050,74.2433', // Shahupuri, Kolhapur coordinates
    mapQuery: 'Royal+Plaza+Dabholkar+Corner+Shahupuri+Kolhapur',
  },
];

/**
 * Footer Component
 * Contains company info, contact details, and interactive Google Maps
 */
const Footer = () => {
  const footerRef = useRef(null);
  const columnsRef = useRef(null);
  const [activeLocation, setActiveLocation] = useState(0);

  // Google Maps directions URL (works on mobile and desktop)
  const getDirectionsUrl = (index) => {
    const loc = locations[index];
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(loc.address + ', Maharashtra, India')}`;
  };

  // Open location in Google Maps app/website
  const openInGoogleMaps = (index) => {
    const loc = locations[index];
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.address)}`;
    window.open(url, '_blank');
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger columns animation
      const columns = columnsRef.current?.querySelectorAll('.footer-col');
      if (columns?.length) {
        gsap.fromTo(
          columns,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Contact items stagger
      const contactItems = footerRef.current?.querySelectorAll('.contact-item');
      if (contactItems?.length) {
        gsap.fromTo(
          contactItems,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="bg-white pt-12 sm:pt-16 md:pt-20 lg:pt-24 border-t border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={columnsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12 lg:gap-16 mb-10 sm:mb-12 lg:mb-16"
        >
          {/* Company Info */}
          <div className="footer-col sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-sm">
                S
              </div>
              <span className="font-bold text-lg sm:text-xl text-gray-900 tracking-tight">
                SIGMA Sales & Services
              </span>
            </div>
            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 max-w-xs">
              Established in 1994. The leading provider of renewable energy and power
              backup solutions in Western Maharashtra.
            </p>
            <div className="flex gap-3 sm:gap-4">
              {/* Social Media - Instagram */}
              <a
                href="https://www.instagram.com/sigmasalesservices?igsh=ZGg0aDRwY3Nuendt"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 sm:w-9 sm:h-9 bg-gray-100 rounded-full hover:bg-gradient-to-br hover:from-purple-500 hover:via-pink-500 hover:to-orange-400 hover:text-white hover:scale-110 transition-all cursor-pointer flex items-center justify-center"
                aria-label="Instagram"
              >
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Contact Information */}
          <div className="footer-col">
            <h4 className="font-bold text-gray-900 mb-4 sm:mb-6 text-base sm:text-lg">Contact Us</h4>
            <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-gray-500">
              <li className="contact-item flex items-start group cursor-pointer" onClick={() => { setActiveLocation(0); openInGoogleMaps(0); }}>
                <MapPin className="text-blue-700 mt-0.5 mr-2 sm:mr-3 shrink-0 w-4 h-4 sm:w-5 sm:h-5 group-hover:text-green-600 transition-colors" />
                <span className="group-hover:text-blue-700 transition-colors">
                  <strong>Office:</strong> Shop No. 1, Ground Floor, Royal Plaza,
                  Dabholkar Corner, Shahupuri, Kolhapur.
                  <span className="text-blue-600 text-[10px] sm:text-xs ml-1 group-hover:underline">(Click for directions)</span>
                </span>
              </li>
              <li className="contact-item flex items-center">
                <Phone className="text-blue-700 mr-2 sm:mr-3 shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
                <a href="tel:+918275001561" className="hover:text-blue-700 transition-colors">
                  +91 8275001561 (Dhairyashil Ekal)
                </a>
              </li>
              <li className="contact-item flex items-center">
                <Mail className="text-blue-700 mr-2 sm:mr-3 shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
                <a href="mailto:sales@sigmasales.in" className="break-all sm:break-normal hover:text-blue-700 transition-colors">
                  desigmasales@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Interactive Map */}
          <div className="footer-col sm:col-span-2 lg:col-span-1">
            {/* Map Container - Using Google Maps Embed (Free, no API key required) */}
            <div className="rounded-xl sm:rounded-2xl overflow-hidden h-52 sm:h-56 lg:h-60 bg-gray-100 relative shadow-inner">
              <iframe
                title="Map - Office Location"
                src={`https://www.google.com/maps?q=${locations[0].mapQuery}&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>

            {/* Get Directions Button */}
            <a
              href={getDirectionsUrl(0)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg text-xs sm:text-sm transition-all shadow-md hover:shadow-lg hover:scale-[1.02]"
            >
              <Navigation className="w-4 h-4" />
              Get Directions to Office
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 py-5 sm:py-6 lg:py-8 flex flex-col md:flex-row justify-between items-center text-xs sm:text-sm text-gray-400 gap-3 sm:gap-4">
          <p className="text-center md:text-left">&copy; 2025 Sigma Sales & Services. All rights reserved.</p>
          <div className="flex space-x-4 sm:space-x-6">
            <a href="#" className="hover:text-blue-700 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-blue-700 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
