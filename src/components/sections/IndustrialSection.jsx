import { useRef, useLayoutEffect } from 'react';
import { Factory, Zap, Settings, Check, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Industrial products data
 */
const industrialProducts = [
  {
    title: 'Lift Inverters (ERD)',
    icon: Zap,
    features: [
      '3-Phase Operation (400V)',
      'Regenerative Braking Support',
      'Zero-Jerk Technology',
    ],
  },
  {
    title: 'Servo Voltage Stabilizers',
    icon: Settings,
    features: [
      'Precise Output ±1%',
      'Air & Oil Cooled Variants',
      'Ideal for CNC & Medical Equip.',
    ],
  },
];

/**
 * IndustrialSection Component
 * Showcases industrial-grade products with GSAP animations
 */
const IndustrialSection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef(null);
  const blurRef1 = useRef(null);
  const blurRef2 = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animated blur backgrounds
      gsap.to(blurRef1.current, {
        x: 50,
        y: -30,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to(blurRef2.current, {
        x: -50,
        y: 30,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Header animation
      gsap.fromTo(
        headerRef.current?.querySelectorAll('.header-item'),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards stagger animation
      const cards = cardsRef.current?.querySelectorAll('.industrial-card');
      if (cards?.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Feature items stagger within each card
        cards.forEach((card) => {
          const features = card.querySelectorAll('.feature-item');
          gsap.fromTo(
            features,
            { opacity: 0, x: -20 },
            {
              opacity: 1,
              x: 0,
              duration: 0.4,
              stagger: 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="industrial"
      className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-900 text-white relative overflow-hidden"
    >
      {/* Background Effects */}
      <div
        ref={blurRef1}
        className="absolute top-0 right-0 w-[250px] sm:w-[350px] lg:w-[500px] h-[250px] sm:h-[350px] lg:h-[500px] bg-blue-600/30 rounded-full blur-[80px] sm:blur-[100px] lg:blur-[120px] pointer-events-none"
      />
      <div
        ref={blurRef2}
        className="absolute bottom-0 left-0 w-[250px] sm:w-[350px] lg:w-[500px] h-[250px] sm:h-[350px] lg:h-[500px] bg-purple-600/20 rounded-full blur-[80px] sm:blur-[100px] lg:blur-[120px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 sm:gap-8 mb-8 sm:mb-12 lg:mb-16"
        >
          <div className="header-item w-full md:w-1/2">
            <span className="text-yellow-400 font-bold tracking-widest uppercase text-[10px] sm:text-xs mb-1 sm:mb-2 block">
              Industrial Grade
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-1 sm:mt-2 font-sans tracking-tight">
              Factory Solutions
            </h2>
            <p className="text-gray-400 mt-3 sm:mt-4 lg:mt-6 text-sm sm:text-base lg:text-lg max-w-lg leading-relaxed">
              Direct from our Kagal Five Star MIDC facility. Engineered for heavy
              machinery and critical infrastructure.
            </p>
          </div>
          <div className="header-item w-full md:w-auto flex items-center gap-3 sm:gap-4 lg:gap-5 bg-white/5 p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
            <Factory className="text-gray-300 w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 flex-shrink-0" />
            <div className="text-left md:text-right">
              <p className="text-sm sm:text-base font-bold text-gray-100">Manufacturing Unit</p>
              <p className="text-xs sm:text-sm text-gray-400">Plot No. P-52, Kagal MIDC</p>
            </div>
          </div>
        </div>

        {/* Product Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {industrialProducts.map((product) => {
            const IconComponent = product.icon;
            return (
              <div
                key={product.title}
                className="industrial-card bg-gray-800/50 p-5 sm:p-6 md:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border border-gray-700/50 hover:border-blue-500/50 transition-all group backdrop-blur-sm hover:bg-gray-800"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-blue-900/30 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 lg:mb-8 group-hover:bg-blue-900/50 group-hover:scale-110 transition-all duration-300">
                  <IconComponent className="text-blue-400 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 lg:mb-4 text-white">
                  {product.title}
                </h3>
                <ul className="space-y-2 sm:space-y-3 lg:space-y-4 text-gray-300 text-xs sm:text-sm mb-4 sm:mb-6 lg:mb-8">
                  {product.features.map((feature) => (
                    <li key={feature} className="feature-item flex items-center">
                      <Check className="text-green-500 mr-2 sm:mr-3 flex-shrink-0 w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className="inline-flex items-center text-xs sm:text-sm font-bold text-blue-400 hover:text-white transition-colors group-hover:translate-x-2 duration-300"
                >
                  Request Industrial Quote <ChevronRight className="ml-1 w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IndustrialSection;
