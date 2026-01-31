import { useRef, useLayoutEffect } from 'react';
import { Sun, Battery, ArrowRight } from 'lucide-react';
import SolarCalculator from './SolarCalculator';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * SolarSection Component
 * Detailed section about solar solutions with features and calculator - GSAP animated
 */
const SolarSection = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const calculatorRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation from left
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: -80 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Calculator animation from right
      gsap.fromTo(
        calculatorRef.current,
        { opacity: 0, x: 80 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Stagger feature items
      const features = contentRef.current?.querySelectorAll('.feature-item');
      if (features?.length) {
        gsap.fromTo(
          features,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="solar" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-24 items-center">
          {/* Content */}
          <div ref={contentRef} className="solar-content">
            <span className="text-green-600 font-bold tracking-widest uppercase text-[10px] sm:text-xs mb-2 block">
              Renewable Energy
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 font-sans tracking-tight">
              Invest in Solar, <br className="hidden sm:block" />
              Secure Your Future
            </h2>
            <p className="text-gray-600 mb-6 sm:mb-8 leading-relaxed text-base sm:text-lg">
              We serve customers across Maharashtra with solar solutions designed for our region's climate. From urban homes to rural farms, we deliver reliable renewable energy systems.
            </p>

            <div className="space-y-5 sm:space-y-6 lg:space-y-8">
              {/* On-Grid Systems */}
              <div className="feature-item flex items-start group">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-green-50 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:bg-green-100 group-hover:scale-110 transition-all duration-300">
                  <Sun className="text-green-600 w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="ml-3 sm:ml-4 lg:ml-5">
                  <h4 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                    On-Grid Systems
                  </h4>
                  <p className="text-gray-500 leading-relaxed text-sm sm:text-base">
                    Best for maximum ROI. Export excess power to MSEDCL grid via Net
                    Metering and reduce bills to zero.
                  </p>
                </div>
              </div>

              {/* Hybrid Systems */}
              <div className="feature-item flex items-start group">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-blue-50 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:bg-blue-100 group-hover:scale-110 transition-all duration-300">
                  <Battery className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="ml-3 sm:ml-4 lg:ml-5">
                  <h4 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                    Hybrid Systems
                  </h4>
                  <p className="text-gray-500 leading-relaxed text-sm sm:text-base">
                    Energy independence. Store solar power to run your home
                    essentials even during long power cuts.
                  </p>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/918275001561?text=I%20am%20interested%20in%20a%20Solar%20Quote"
              className="inline-flex items-center mt-10 text-green-600 font-bold hover:text-green-700 transition-colors text-lg group"
            >
              Get a Free Site Visit{' '}
              <ArrowRight
                size={20}
                className="ml-2 group-hover:translate-x-2 transition-transform duration-300"
              />
            </a>
          </div>

          {/* Calculator */}
          <div ref={calculatorRef}>
            <SolarCalculator />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolarSection;
