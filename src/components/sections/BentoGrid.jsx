import { useRef, useLayoutEffect, useState } from 'react';
import { ArrowRight, BatteryCharging, Sun, Settings } from 'lucide-react';
import { SectionHeader, SolarDetailsModal } from '@components/ui';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * BentoGrid Component
 * Grid layout showcasing main service offerings with GSAP animations
 */
const BentoGrid = () => {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const [isSolarModalOpen, setIsSolarModalOpen] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate cards with stagger
      const cards = gridRef.current?.querySelectorAll('.bento-card');
      if (cards?.length) {
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 80,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Animate icons on hover
      cards?.forEach((card) => {
        const icon = card.querySelector('.card-icon');
        if (icon) {
          card.addEventListener('mouseenter', () => {
            gsap.to(icon, {
              scale: 1.2,
              rotation: 10,
              duration: 0.4,
              ease: 'back.out(2)',
            });
          });
          card.addEventListener('mouseleave', () => {
            gsap.to(icon, {
              scale: 1,
              rotation: 0,
              duration: 0.3,
              ease: 'power2.out',
            });
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Our Solutions"
          subtitle="Comprehensive energy solutions tailored for residential comfort and industrial reliability."
        />

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-4 sm:gap-5 lg:gap-6 h-auto lg:h-[600px]"
        >
          {/* Solar Card - Large */}
          <div
            onClick={() => setIsSolarModalOpen(true)}
            className="bento-card sm:col-span-2 lg:col-span-2 lg:row-span-2 relative rounded-2xl sm:rounded-3xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-2xl transition-shadow duration-500 min-h-[300px] sm:min-h-[350px] lg:min-h-0"
          >            <img
              src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
              alt="Solar Rooftop Systems"
              className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4 sm:p-6 lg:p-8 w-full">
              <span className="bg-green-500 text-white text-[10px] font-bold px-3 py-1 rounded-full mb-2 sm:mb-3 inline-block shadow-sm">
                MOST POPULAR
              </span>
              <h3 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 tracking-tight">
                Solar Rooftop Systems
              </h3>
              <p className="text-gray-200 text-xs sm:text-sm mb-4 sm:mb-6 max-w-sm leading-relaxed">
                On-Grid & Hybrid solutions. Save up to 80% on electricity bills
                with government subsidies.
              </p>
              <span className="text-yellow-400 font-bold text-sm flex items-center gap-2 group-hover:gap-4 transition-all">
                Learn More <ArrowRight size={16} />
              </span>
            </div>
          </div>

          {/* Lift Inverter Card - With Background Image */}
          <div className="bento-card sm:col-span-2 lg:col-span-2 lg:row-span-1 relative rounded-2xl sm:rounded-3xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all min-h-[180px] sm:min-h-[200px] lg:min-h-0">
            {/* Background Image */}
            <img
              src="/luminous inverter.png"
              alt="Industrial Lift Inverters"
              className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110"
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40 group-hover:from-black/70 transition-colors duration-500"></div>

            {/* Content */}
            <div className="relative z-10 h-full p-4 sm:p-6 lg:p-8 flex items-center justify-between">
              <div className="w-2/3 pr-2">
                <h3 className="text-white text-lg sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2 tracking-tight">
                  Inverters
                </h3>
                <p className="text-gray-200 text-xs sm:text-sm mb-2 sm:mb-4">
                  Pure sine wave inverters for homes, offices, and industrial applications.
                </p>
                {/* <span className="text-yellow-400 font-bold text-xs sm:text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                  View Specs <ArrowRight size={14} />
                </span> */}
              </div>
              <div className="w-1/3 flex items-center justify-center">
                <div className="bg-white/10 backdrop-blur-md p-3 sm:p-4 rounded-2xl">
                  <Settings className="card-icon text-white w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16" />
                </div>
              </div>
            </div>
          </div>

          {/* Battery Card - With Background Image */}
          <div className="bento-card lg:col-span-1 lg:row-span-1 relative rounded-2xl sm:rounded-3xl overflow-hidden group shadow-sm hover:shadow-xl transition-all min-h-[180px] sm:min-h-[200px] lg:min-h-0">
            {/* Background Image */}
            <img
              src="/exide-car-battery.jpg"
              alt="Automotive Batteries"
              className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110"
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 group-hover:from-black/80 transition-colors duration-500"></div>

            {/* Content */}
            <div className="relative z-10 h-full p-4 sm:p-6 lg:p-8 flex flex-col justify-between">
              <div className="flex justify-end">
                <div className="bg-white/10 backdrop-blur-md p-2 sm:p-3 rounded-xl">
                  <BatteryCharging className="card-icon text-white w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
                </div>
              </div>
              <div>
                <h3 className="text-white font-bold text-base sm:text-lg lg:text-xl mb-1">
                  Inverter, Automotive & Lithium-ion Batteries
                </h3>
                <p className="text-gray-200 text-[10px] sm:text-xs font-medium">
                  Power backup, vehicles & advanced energy storage solutions
                </p>
              </div>
            </div>
          </div>

          {/* Water Heater Card - With Background Image */}
          <div className="bento-card lg:col-span-1 lg:row-span-1 relative rounded-2xl sm:rounded-3xl overflow-hidden group shadow-sm hover:shadow-xl transition-all min-h-[180px] sm:min-h-[200px] lg:min-h-0">
            {/* Background Image */}
            <img
              src="/solar water heater.jpg"
              alt="Solar Water Heaters"
              className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110"
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 group-hover:from-black/80 transition-colors duration-500"></div>

            {/* Content */}
            <div className="relative z-10 h-full p-4 sm:p-6 lg:p-8 flex flex-col justify-between text-white">
              <div className="flex justify-end">
                <div className="bg-white/10 backdrop-blur-md p-2 sm:p-3 rounded-xl">
                  <Sun className="card-icon text-yellow-400 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-base sm:text-lg lg:text-xl mb-1">Solar Water Heaters</h3>
                <p className="text-gray-200 text-[10px] sm:text-xs font-medium">
                  Hot water, zero electricity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Solar Details Modal */}
      <SolarDetailsModal
        isOpen={isSolarModalOpen}
        onClose={() => setIsSolarModalOpen(false)}
      />
    </section>
  );
};

export default BentoGrid;
