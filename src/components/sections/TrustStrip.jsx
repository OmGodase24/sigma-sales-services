import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Award, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/**
 * TrustStrip Component
 * Displays government certifications and approvals with official logos
 * Shows client is a registered vendor for major government schemes
 */
const TrustStrip = () => {
  const sectionRef = useRef(null);
  const logosRef = useRef(null);
  const badgeRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate badge entrance
      if (badgeRef.current) {
        gsap.fromTo(
          badgeRef.current,
          { opacity: 0, y: -20, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Sophisticated certification cards animation
      const logos = logosRef.current?.querySelectorAll('.trust-logo');
      if (logos?.length) {
        gsap.fromTo(
          logos,
          {
            opacity: 0,
            y: 40,
            scale: 0.9,
            rotationY: -15,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationY: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Continuous subtle floating animation
        logos.forEach((logo, index) => {
          gsap.to(logo, {
            y: -6,
            duration: 2.5 + (index * 0.3),
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.2,
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const certifications = [
    {
      name: 'PM Suryaghar',
      fullName: 'PM Suryaghar Muft Bijli Yojana',
      description: 'Rooftop Solar Subsidy Scheme',
      logo: '/PM Suryaghar.png',
      icon: '☀️',
      color: 'from-orange-500 to-green-500',
    },
    {
      name: 'MNRE',
      fullName: 'Ministry of New & Renewable Energy',
      description: 'Government of India',
      logo: '/MNRE_India.svg.png',
      color: 'from-green-500 to-emerald-600',
    },
    {
      name: 'MEDA',
      fullName: 'Maharashtra Energy Development Agency',
      description: 'State Government Authority',
      logo: '/meda_logo.png',
      color: 'from-blue-500 to-indigo-600',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-gradient-to-b from-white via-gray-50/50 to-white py-10 sm:py-14 lg:py-20 border-y border-gray-100 overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-green-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Premium Header */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-14">
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full text-sm sm:text-base font-bold mb-4 sm:mb-5 shadow-lg shadow-green-500/30 hover:shadow-xl hover:scale-105 transition-all"
          >
            <Shield className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
            <span>Government Approved Vendor</span>
            <Award className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
          </div>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-3 sm:mb-4">
            Official Certifications
          </h3>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 font-medium max-w-2xl mx-auto">
            Registered & Authorized by Leading Government Energy Agencies
          </p>
        </div>

        {/* Premium Certification Cards Grid */}
        <div
          ref={logosRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8"
        >
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="trust-logo group relative"
            >
              {/* Main Card */}
              <div className="relative flex flex-col items-center justify-center p-6 sm:p-8 lg:p-10 bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl border-2 border-gray-200 hover:border-transparent shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden">
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} blur-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10`} />

                {/* Logo/Icon Container */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 mb-5 sm:mb-6 flex items-center justify-center">
                  {cert.logo ? (
                    // Official Logo
                    <div className="w-full h-full flex items-center justify-center p-2">
                      <img
                        src={cert.logo}
                        alt={`${cert.name} Logo`}
                        className="w-full h-full object-contain filter drop-shadow-lg group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    // Icon fallback for PM Suryaghar
                    <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${cert.color} rounded-2xl sm:rounded-3xl text-4xl sm:text-5xl shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110`}>
                      {cert.icon}
                    </div>
                  )}

                  {/* Verified Badge */}
                  <div className="absolute -top-2 -right-2 bg-green-500 text-white p-1.5 sm:p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <CheckCircle2 size={16} className="sm:w-5 sm:h-5" strokeWidth={3} />
                  </div>
                </div>

                {/* Organization Name */}
                <h3 className="text-base sm:text-lg lg:text-xl font-black text-gray-900 text-center mb-2 sm:mb-3 group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                  {cert.name}
                </h3>

                {/* Full Name (hidden on mobile) */}
                <p className="hidden sm:block text-xs lg:text-sm font-bold text-gray-700 text-center mb-2">
                  {cert.fullName}
                </p>

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-600 text-center font-medium">
                  {cert.description}
                </p>

                {/* Decorative line on hover */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${cert.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
              </div>
            </div>
          ))}
        </div>

        {/* Premium Trust Indicators */}
        <div className="mt-10 sm:mt-12 lg:mt-16">
          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 sm:gap-4 lg:gap-6">
            <div className="flex items-center gap-2 sm:gap-3 bg-white/90 backdrop-blur-sm px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl border-2 border-green-100 shadow-sm hover:shadow-lg transition-all hover:scale-105">
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm font-bold text-gray-700">All Installations Certified</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 bg-white/90 backdrop-blur-sm px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl border-2 border-blue-100 shadow-sm hover:shadow-lg transition-all hover:scale-105">
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm font-bold text-gray-700">Subsidy Assistance Available</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 bg-white/90 backdrop-blur-sm px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl border-2 border-purple-100 shadow-sm hover:shadow-lg transition-all hover:scale-105">
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-purple-500 rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm font-bold text-gray-700">Government Standards</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;
