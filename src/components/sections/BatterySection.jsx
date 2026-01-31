import { useRef, useLayoutEffect } from 'react';
import { Battery, Zap, Server, CheckCircle2, MessageCircle, Award, Shield } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Product categories with their brands and logos
 */
const productCategories = [
  {
    title: 'Inverter Batteries',
    subtitle: '60+ Models Available',
    icon: Battery,
    brands: [
      { name: 'EXIDE', logo: '/exide-logo.jpg' },
      { name: 'AMARON', logo: '/amaron-logo-png_seeklogo-292269.png' },
      { name: 'OKAYA', logo: '/okaya download.jpg' },
      { name: 'MICROTEK', logo: '/microtek.jpg' },
      { name: 'LUMINOUS', logo: '/luminous-logo-png_seeklogo-512774.png' },
    ],
    gradient: 'from-blue-600 to-indigo-600',
  },
];

/**
 * BatterySection Component
 * Premium product catalog showcasing authorized brands and partnerships
 * Three full-width horizontal sections stacked vertically
 */
const BatterySection = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section headers
      const sectionHeaders = sectionRef.current?.querySelectorAll('.section-header');
      if (sectionHeaders?.length) {
        gsap.fromTo(
          sectionHeaders,
          {
            opacity: 0,
            x: -60,
            scale: 0.95,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Animate brand logo grids
      const brandSections = sectionRef.current?.querySelectorAll('.brands-container');
      brandSections?.forEach((container, index) => {
        const logos = container.querySelectorAll('.brand-logo');
        if (logos?.length) {
          gsap.fromTo(
            logos,
            {
              opacity: 0,
              y: 40,
              scale: 0.8,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: 'back.out(1.4)',
              scrollTrigger: {
                trigger: container,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );

          // Continuous floating animation
          logos.forEach((logo, idx) => {
            gsap.to(logo, {
              y: -8,
              duration: 2.5 + (idx * 0.2),
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
              delay: (index * 0.3) + (idx * 0.15),
            });
          });
        }
      });

      // Animate CTAs
      const ctas = sectionRef.current?.querySelectorAll('.cta-button');
      if (ctas?.length) {
        gsap.fromTo(
          ctas,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Animate Lithium-ion Battery Card
      const lithiumCard = sectionRef.current?.querySelector('.lithium-card');
      if (lithiumCard) {
        gsap.fromTo(
          lithiumCard,
          {
            opacity: 0,
            y: 60,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: lithiumCard,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Animate lithium card features
        const lithiumFeatures = lithiumCard.querySelectorAll('.lithium-feature');
        if (lithiumFeatures?.length) {
          gsap.fromTo(
            lithiumFeatures,
            { opacity: 0, x: -30, scale: 0.9 },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: 'back.out(1.4)',
              scrollTrigger: {
                trigger: lithiumCard,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        // Floating animation for lithium icon
        const lithiumIcon = lithiumCard.querySelector('.lithium-icon');
        if (lithiumIcon) {
          gsap.to(lithiumIcon, {
            y: -10,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="batteries" className="py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] bg-blue-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] bg-indigo-100/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 md:w-[450px] md:h-[450px] lg:w-[600px] lg:h-[600px] bg-purple-100/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Premium Main Header */}
        <div className="text-center mb-16 sm:mb-20 lg:mb-24">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-200/50 backdrop-blur-sm mb-6">
            <Battery className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            <span className="text-sm sm:text-base font-semibold text-blue-900">Premium Power Solutions</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-6">
            Premium Battery
            <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mt-2">
              Solutions
            </span>
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Premium inverter batteries from world-leading manufacturers. 60+ certified models for every power backup need.
          </p>
        </div>

        {/* Three Full-Width Horizontal Sections */}
        <div className="space-y-12 sm:space-y-16 lg:space-y-20">
          {productCategories.map((category, idx) => {
            const Icon = category.icon;

            return (
              <div key={idx} className="relative group">
                {/* Full-Width Section Container */}
                <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl sm:rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-700 border border-gray-200/50 overflow-hidden">
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700 pointer-events-none`}></div>

                  {/* Animated glow effect */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-700 -z-10`}></div>

                  <div className="relative p-8 sm:p-10 lg:p-14 xl:p-16">
                    {/* Section Header */}
                    <div className="section-header flex flex-col lg:flex-row items-start lg:items-center justify-between mb-10 sm:mb-12 lg:mb-14 gap-6 lg:gap-8">
                      <div className="flex items-start sm:items-center gap-4 sm:gap-6">
                        {/* Icon with premium styling */}
                        <div className="relative shrink-0">
                          <div className={`relative p-5 sm:p-6 lg:p-7 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${category.gradient} shadow-2xl group-hover:scale-110 transition-all duration-700`}>
                            <Icon className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-white" strokeWidth={2} />
                          </div>
                          {/* Glow effect */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} rounded-2xl sm:rounded-3xl blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-700`}></div>
                        </div>

                        {/* Title and Description */}
                        <div>
                          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-3">
                            {category.title}
                          </h3>
                          <p className="text-sm sm:text-base lg:text-lg text-gray-600 font-medium">
                            {category.subtitle}
                          </p>
                          <div className="flex items-center gap-2 mt-3">
                            <CheckCircle2 className="w-4 h-4 text-green-600" strokeWidth={2.5} />
                            <span className="text-xs sm:text-sm font-semibold text-gray-700">
                              {category.brands.length} Authorized Brands
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <a
                        href={`https://wa.me/918275001561?text=Hi, I'm interested in ${category.title}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`cta-button group/cta shrink-0 inline-flex items-center gap-3 px-7 sm:px-8 lg:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl bg-gradient-to-r ${category.gradient} text-white font-bold text-sm sm:text-base lg:text-lg shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 whitespace-nowrap relative overflow-hidden`}
                      >
                        {/* Button overlay animation */}
                        <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover/cta:translate-x-full transition-transform duration-700"></div>
                        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 group-hover/cta:rotate-12 transition-transform duration-300" strokeWidth={2.5} />
                        <span className="relative z-10">Get Expert Quote</span>
                      </a>
                    </div>

                    {/* Brands Grid */}
                    <div className="brands-container">
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5 lg:gap-6">
                        {category.brands.map((brand, brandIdx) => (
                          <div
                            key={brandIdx}
                            className="brand-logo group/logo relative"
                          >
                            {/* Glow effect */}
                            <div className={`absolute -inset-1 bg-gradient-to-br ${category.gradient} opacity-0 group-hover/logo:opacity-20 blur-lg rounded-2xl transition-opacity duration-500`}></div>

                            {/* Logo Card */}
                            <div className="relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 border-2 border-gray-200 hover:border-gray-400 transition-all duration-500 hover:scale-105 hover:shadow-xl cursor-pointer">
                              {/* Logo Image Container */}
                              <div className="aspect-[3/2] mb-3 sm:mb-4 overflow-hidden rounded-lg">
                                <img
                                  src={brand.logo}
                                  alt={`${brand.name} Logo`}
                                  loading="lazy"
                                  className="w-full h-full object-contain filter grayscale group-hover/logo:grayscale-0 transition-all duration-700 p-2"
                                />
                              </div>

                              {/* Brand Name */}
                              <p className="text-[10px] sm:text-xs font-bold text-gray-700 uppercase tracking-wider text-center truncate">
                                {brand.name}
                              </p>

                              {/* Hover gradient overlay */}
                              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover/logo:opacity-5 rounded-xl sm:rounded-2xl transition-opacity duration-500 pointer-events-none`}></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Feature Tags */}
                    <div className="mt-10 sm:mt-12 lg:mt-14 pt-8 sm:pt-10 border-t border-gray-200/70">
                      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:gap-5">
                        <div className="inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-green-50/80 backdrop-blur-sm border border-green-200 hover:scale-105 transition-transform duration-300">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                          <span className="text-xs sm:text-sm font-bold text-green-900">100% Genuine</span>
                        </div>
                        <div className="inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-blue-50/80 backdrop-blur-sm border border-blue-200 hover:scale-105 transition-transform duration-300">
                          <Award className="w-4 h-4 text-blue-600" strokeWidth={2.5} />
                          <span className="text-xs sm:text-sm font-bold text-blue-900">ISO Certified</span>
                        </div>
                        <div className="inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-amber-50/80 backdrop-blur-sm border border-amber-200 hover:scale-105 transition-transform duration-300">
                          <Shield className="w-4 h-4 text-amber-600" strokeWidth={2.5} />
                          <span className="text-xs sm:text-sm font-bold text-amber-900">Factory Warranty</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Lithium-ion Battery Card */}
        <div className="lithium-card mt-12 sm:mt-16 lg:mt-20">
          <div className="relative group">
            {/* Gradient glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400 opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-700"></div>

            <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl sm:rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-700 border border-gray-200/50 overflow-hidden">
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-fuchsia-500 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700 pointer-events-none"></div>

              {/* Animated glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-fuchsia-600 opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-700 -z-10"></div>

              <div className="relative p-6 sm:p-8 lg:p-10">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-6">
                  {/* Icon */}
                  <div className="lithium-icon relative shrink-0">
                    <div className="relative p-4 sm:p-5 lg:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-purple-500 to-fuchsia-600 shadow-2xl group-hover:scale-110 transition-all duration-700">
                      <Zap className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" strokeWidth={2} />
                    </div>
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-2xl sm:rounded-3xl blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-700"></div>
                  </div>

                  {/* Title and Description */}
                  <div className="flex-1">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-2 sm:mb-3">
                      Lithium-ion Batteries
                    </h3>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-600 font-medium mb-2">
                      For EV and Hybrid Solar Systems
                    </p>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" strokeWidth={2.5} />
                      <span className="text-xs sm:text-sm font-semibold text-gray-700">
                        Advanced Energy Storage Technology
                      </span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <a
                    href="https://wa.me/918275001561?text=Hi, I'm interested in Lithium-ion Battery"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-button group/cta shrink-0 inline-flex items-center gap-3 px-6 sm:px-8 lg:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white font-bold text-sm sm:text-base lg:text-lg shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 whitespace-nowrap relative overflow-hidden"
                  >
                    {/* Button overlay animation */}
                    <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover/cta:translate-x-full transition-transform duration-700"></div>
                    <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 group-hover/cta:rotate-12 transition-transform duration-300" strokeWidth={2.5} />
                    <span className="relative z-10">Get Expert Quote</span>
                  </a>
                </div>

                {/* Feature Tags */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-6 sm:pt-8 border-t border-gray-200/70">
                  <div className="lithium-feature inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-purple-50/80 backdrop-blur-sm border border-purple-200 hover:scale-105 transition-transform duration-300">
                    <Zap className="w-4 h-4 text-purple-600" strokeWidth={2.5} />
                    <span className="text-xs sm:text-sm font-bold text-purple-900">High Efficiency</span>
                  </div>
                  <div className="lithium-feature inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-fuchsia-50/80 backdrop-blur-sm border border-fuchsia-200 hover:scale-105 transition-transform duration-300">
                    <Battery className="w-4 h-4 text-fuchsia-600" strokeWidth={2.5} />
                    <span className="text-xs sm:text-sm font-bold text-fuchsia-900">Long Life Cycle</span>
                  </div>
                  <div className="lithium-feature inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-violet-50/80 backdrop-blur-sm border border-violet-200 hover:scale-105 transition-transform duration-300">
                    <CheckCircle2 className="w-4 h-4 text-violet-600" strokeWidth={2.5} />
                    <span className="text-xs sm:text-sm font-bold text-violet-900">Eco-Friendly</span>
                  </div>
                  <div className="lithium-feature inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-pink-50/80 backdrop-blur-sm border border-pink-200 hover:scale-105 transition-transform duration-300">
                    <Shield className="w-4 h-4 text-pink-600" strokeWidth={2.5} />
                    <span className="text-xs sm:text-sm font-bold text-pink-900">Fast Charging</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trust Banner */}
        <div className="mt-16 sm:mt-20 lg:mt-24">
          <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-900 rounded-3xl sm:rounded-[2.5rem] p-8 sm:p-10 lg:p-14 shadow-2xl relative overflow-hidden">
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />

            <div className="relative text-center max-w-4xl mx-auto">
              <div className="inline-block bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-full mb-6">
                <p className="text-xs sm:text-sm font-bold text-white/90 uppercase tracking-widest">Premium Service Guarantee</p>
              </div>
              <h4 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-5 sm:mb-6">
                Expert Guidance for Your Power Needs
              </h4>
              <p className="text-base sm:text-lg lg:text-xl text-blue-100 leading-relaxed mb-8 sm:mb-10">
                With 60+ certified battery models in stock, our technical team will analyze your power backup requirements and recommend the optimal battery solution for your specific application.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 justify-center items-center">
                <div className="flex items-center gap-3 text-white">
                  <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
                  </div>
                  <span className="font-semibold text-sm sm:text-base">ISO 9001:2015 Certified</span>
                </div>
                <div className="hidden sm:block w-px h-10 bg-white/30" />
                <div className="flex items-center gap-3 text-white">
                  <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
                  </div>
                  <span className="font-semibold text-sm sm:text-base">30+ Years Experience</span>
                </div>
                <div className="hidden sm:block w-px h-10 bg-white/30" />
                <div className="flex items-center gap-3 text-white">
                  <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
                  </div>
                  <span className="font-semibold text-sm sm:text-base">24/7 Support Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BatterySection;
