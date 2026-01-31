import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Hero background image from public folder (spaces encoded for URL)
const heroBgUrl = '/Hero%20image.jpg';

/**
 * Hero Component
 * Main landing section with GSAP animated content and CTA buttons
 */
const Hero = () => {
  const sectionRef = useRef(null);
  const overlayRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const bgRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set([badgeRef.current, headingRef.current, descRef.current, ctaRef.current], {
        opacity: 0,
        y: 50,
      });

      // Create entrance timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.3 });

      tl.to(badgeRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
      })
        .to(
          headingRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
          },
          '-=0.5'
        )
        .to(
          descRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          '-=0.6'
        )
        .to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          '-=0.5'
        );

      // Parallax effect on scroll for background image
      gsap.to(bgRef.current, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Floating animation for decorative elements
      gsap.to('.hero-float', {
        y: -20,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-sky-100 via-sky-50 to-white"
      style={{
        paddingTop: 'clamp(7rem, 12vw, 10rem)', // Increased responsive padding for larger logo in header
      }}
    >
      {/* Background Image - Always show full image, positioned at bottom */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full flex items-end justify-center"
      >
        <img
          src={heroBgUrl}
          alt="Sigma Sales & Services - Solar, Batteries, Industrial Power"
          className="w-full h-auto max-h-full object-contain object-bottom"
        />
      </div>

      {/* Overlay for text readability - gradient from top */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-b from-blue-900/80 via-blue-900/50 to-transparent"
      />

      {/* Animated floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="hero-float absolute top-20 left-10 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl" />
        <div className="hero-float absolute bottom-20 right-10 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-white py-6 sm:py-8 md:py-10 lg:py-12 mb-24 sm:mb-32 md:mb-40 lg:mb-48 xl:mb-56">
        {/* ISO Certification Image Badge - Fully Responsive */}
        <div ref={badgeRef} className="flex justify-center mb-6 sm:mb-8">
          <div className="inline-block hover:scale-105 transition-transform duration-300">
            <img
              src="/ISO 9001-2015.png"
              alt="ISO 9001:2015 Certified"
              className="h-14 sm:h-16 md:h-20 lg:h-24 xl:h-28 w-auto object-contain drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Heading - Optimized for all screen sizes */}
        <h1
          ref={headingRef}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black leading-tight mb-4 sm:mb-6 md:mb-8 drop-shadow-2xl"
        >
          <span className="text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
            Empowering Kolhapur
          </span>
          <br />
          <span className="text-yellow-400 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
            Since 1994
          </span>
        </h1>

        {/* Description - Responsive text sizing */}
        <p
          ref={descRef}
          className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-8 sm:mb-10 md:mb-12 text-white font-medium max-w-3xl mx-auto leading-relaxed px-2 sm:px-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
        >
          ISO 9001:2015 certified leader in renewable energy solutions. From solar rooftops to advanced batteries, inverters, and industrial power backup—empowering homes, businesses, and industries across Maharashtra.
        </p>

        {/* CTA Buttons - Responsive spacing and sizing */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 justify-center px-2 sm:px-4 md:px-0"
        >
          <a
            href="#solar"
            className="group px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 font-black rounded-lg sm:rounded-xl shadow-2xl hover:from-yellow-300 hover:to-yellow-400 transition-all transform hover:scale-105 hover:shadow-[0_20px_50px_rgba(234,179,8,0.5)] text-sm sm:text-base md:text-lg relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Calculate Savings
              <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </a>
          <a
            href="#batteries"
            className="group px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-white/95 backdrop-blur-md border-2 border-white text-blue-900 font-black rounded-lg sm:rounded-xl hover:bg-white hover:scale-105 transition-all shadow-2xl hover:shadow-[0_20px_50px_rgba(255,255,255,0.4)] text-sm sm:text-base md:text-lg"
          >
            <span className="flex items-center justify-center gap-2">
              View Catalog
              <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </a>
        </div>
      </div>

      {/* Scroll indicator - Hidden on small screens, visible on larger */}
      <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 hero-float">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-white/60 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
