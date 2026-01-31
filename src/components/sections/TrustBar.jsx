import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Brand partners data with logo images
 */
const brands = [
  { name: 'ADANI', logo: '/Adani.jpg' },
  { name: 'EXIDE', logo: '/exide-logo.jpg' },
  { name: 'LUMINOUS', logo: '/luminous-logo-png_seeklogo-512774.png' },
  { name: 'MICROTEK', logo: '/microtek.jpg' },
  { name: 'AMARON', logo: '/amaron-logo-png_seeklogo-292269.png' },
  { name: 'SUDARSHAN', logo: '/sudarshan.jpg' },
  { name: 'NOVASYS', logo: '/novasys.png' },
];

/**
 * TrustBar Component
 * Displays authorized partner/dealer brands with premium logo showcase and GSAP animations
 */
const TrustBar = () => {
  const sectionRef = useRef(null);
  const brandsRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Sophisticated stagger animation for brand items
      const brandItems = brandsRef.current?.querySelectorAll('.brand-item');
      if (brandItems?.length) {
        gsap.fromTo(
          brandItems,
          {
            opacity: 0,
            y: 40,
            scale: 0.85,
            rotationY: -15,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationY: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Continuous subtle floating animation
        brandItems.forEach((item, index) => {
          gsap.to(item, {
            y: -8,
            duration: 2.5 + (index * 0.2),
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.15,
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative bg-gradient-to-b from-white via-gray-50/30 to-white py-10 sm:py-12 md:py-16 lg:py-20 border-b border-gray-100 overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-100/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-indigo-100/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        {/* Premium Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-14">
          <div className="inline-block bg-blue-50 px-4 py-2 rounded-full mb-4">
            <p className="text-xs sm:text-sm text-blue-600 font-bold uppercase tracking-widest">Trusted Partnerships</p>
          </div>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-3">
            Authorized Partners & Dealers
          </h3>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Proud to represent India's leading power solution brands with genuine products and certified service.
          </p>
        </div>

        {/* Premium Brand Showcase */}
        <div
          ref={brandsRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3 sm:gap-4 md:gap-6 lg:gap-8"
        >
          {brands.map((brand, i) => (
            <div
              key={i}
              className="brand-item group relative"
            >
              {/* Card with glassmorphism effect */}
              <div className="relative bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl lg:rounded-3xl p-3 sm:p-4 md:p-6 lg:p-8 border border-gray-100 sm:border-2 hover:border-blue-300 shadow-md hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-default">
                {/* Gradient glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Logo Container */}
                <div className="relative aspect-[3/2] w-full flex items-center justify-center">
                  <img
                    src={brand.logo}
                    alt={`${brand.name} Logo`}
                    className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>

                {/* Brand Name - Hidden on mobile, shown on larger screens */}
                <div className="hidden sm:block mt-4 text-center">
                  <p className="text-xs lg:text-sm font-bold text-gray-400 group-hover:text-blue-600 transition-colors uppercase tracking-wider">
                    {brand.name}
                  </p>
                </div>

                {/* Verified Badge on Hover */}
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-green-500 text-white text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                  ✓ Authorized
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 sm:mt-10 lg:mt-12 xl:mt-16 flex flex-wrap justify-center items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8">
          <div className="flex items-center gap-1.5 sm:gap-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-gray-200 shadow-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[11px] sm:text-xs md:text-sm font-semibold text-gray-700">100% Genuine Products</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-gray-200 shadow-sm">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-[11px] sm:text-xs md:text-sm font-semibold text-gray-700">Certified Service</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-gray-200 shadow-sm">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
            <span className="text-[11px] sm:text-xs md:text-sm font-semibold text-gray-700">Factory Warranties</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustBar;
