import { useEffect, useRef } from 'react';
import { X, TrendingUp, Shield, Gift, Wifi, Zap, CreditCard, Sparkles, Award } from 'lucide-react';
import { gsap } from 'gsap';

/**
 * Features data for solar rooftop systems
 */
const features = [
  {
    icon: TrendingUp,
    title: 'Rapid ROI',
    description: 'Recover your entire investment in just 3-5 years.',
    gradient: 'from-emerald-500 to-teal-600',
    bgGlow: 'group-hover:shadow-emerald-500/20',
  },
  {
    icon: Shield,
    title: '25-Year Warranty',
    description: 'Long-term performance warranty on solar panels.',
    gradient: 'from-blue-500 to-indigo-600',
    bgGlow: 'group-hover:shadow-blue-500/20',
  },
  {
    icon: Gift,
    title: 'Government Subsidy',
    description: 'Eligible for PM Suryaghar & MNRE subsidies.',
    gradient: 'from-violet-500 to-purple-600',
    bgGlow: 'group-hover:shadow-violet-500/20',
  },
  {
    icon: Wifi,
    title: 'Smart Monitoring',
    description: '24/7 Online remote monitoring of your generation.',
    gradient: 'from-cyan-500 to-blue-600',
    bgGlow: 'group-hover:shadow-cyan-500/20',
  },
  {
    icon: Zap,
    title: 'Net Metering',
    description: 'Export excess power to the grid for credits.',
    gradient: 'from-amber-500 to-orange-600',
    bgGlow: 'group-hover:shadow-amber-500/20',
  },
  {
    icon: CreditCard,
    title: 'Easy Financing',
    description: 'Bank loan facilities available.',
    gradient: 'from-pink-500 to-rose-600',
    bgGlow: 'group-hover:shadow-pink-500/20',
  },
];

/**
 * SolarDetailsModal Component
 * Ultra-premium modal with advanced GSAP animations and sophisticated design
 */
const SolarDetailsModal = ({ isOpen, onClose }) => {
  const overlayRef = useRef(null);
  const modalRef = useRef(null);
  const contentRef = useRef(null);
  const headerRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const ctx = gsap.context(() => {
      // Advanced overlay animation with blur
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0, backdropFilter: 'blur(0px)' },
        { 
          opacity: 1, 
          backdropFilter: 'blur(8px)',
          duration: 0.4, 
          ease: 'power2.out' 
        }
      );

      // Sophisticated modal entrance with 3D effect
      gsap.fromTo(
        modalRef.current,
        { 
          scale: 0.8, 
          opacity: 0, 
          y: 40,
          rotationX: 15,
          transformPerspective: 1000,
        },
        { 
          scale: 1, 
          opacity: 1, 
          y: 0,
          rotationX: 0,
          duration: 0.7, 
          ease: 'elastic.out(1, 0.7)',
          delay: 0.1,
        }
      );

      // Animated header with wave effect
      const headerElements = headerRef.current?.querySelectorAll('.header-element');
      if (headerElements?.length) {
        gsap.fromTo(
          headerElements,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'back.out(1.7)',
            delay: 0.3,
          }
        );
      }

      // Premium feature cards with sophisticated stagger
      const featureCards = contentRef.current?.querySelectorAll('.feature-card');
      if (featureCards?.length) {
        gsap.fromTo(
          featureCards,
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
            duration: 0.8, 
            stagger: {
              amount: 0.6,
              from: 'start',
              ease: 'power2.out',
            },
            delay: 0.5, 
            ease: 'back.out(1.4)',
          }
        );

        // Continuous floating animation for icons
        featureCards.forEach((card) => {
          const icon = card.querySelector('.feature-icon');
          if (icon) {
            gsap.to(icon, {
              y: -8,
              duration: 2,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
              delay: Math.random() * 0.5,
            });
          }
        });
      }

      // Stats counter animation
      const statNumbers = statsRef.current?.querySelectorAll('.stat-number');
      if (statNumbers?.length) {
        gsap.fromTo(
          statNumbers,
          { scale: 0.5, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(2)',
            delay: 0.8,
          }
        );
      }

      // Sparkle animation
      const sparkles = contentRef.current?.querySelectorAll('.sparkle');
      if (sparkles?.length) {
        sparkles.forEach((sparkle) => {
          gsap.to(sparkle, {
            scale: 1.5,
            opacity: 0,
            duration: 1.5,
            repeat: -1,
            ease: 'power2.out',
            delay: Math.random() * 2,
          });
        });
      }
    });

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
      ctx.revert();
    };
  }, [isOpen]);

  const handleClose = () => {
    // Sophisticated exit animation
    gsap.to(modalRef.current, {
      scale: 0.9,
      opacity: 0,
      y: 20,
      duration: 0.4,
      ease: 'power3.in',
    });
    gsap.to(overlayRef.current, {
      opacity: 0,
      backdropFilter: 'blur(0px)',
      duration: 0.4,
      ease: 'power2.in',
      onComplete: onClose,
    });
  };

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-gradient-to-br from-black/60 via-blue-900/40 to-black/60 z-50 flex items-start justify-center p-4 sm:p-6 overflow-y-auto"
      style={{ opacity: 0 }}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-5xl my-4 sm:my-6 lg:my-8 relative overflow-hidden"
        style={{ opacity: 0, transform: 'scale(0.8)' }}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 bg-blue-500/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 bg-indigo-500/10 rounded-full blur-3xl -z-10" />

        {/* Close Button - Ultra Premium */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 bg-white/95 backdrop-blur-md p-2.5 sm:p-3 rounded-xl sm:rounded-2xl hover:bg-white transition-all shadow-xl hover:shadow-2xl hover:scale-110 active:scale-95 group border border-gray-100"
          aria-label="Close modal"
        >
          <X size={20} className="sm:w-6 sm:h-6 text-gray-700 group-hover:text-gray-900 transition-colors group-hover:rotate-90 duration-300" />
        </button>

        {/* Premium Header Section with Animated Background */}
        <div className="relative bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white rounded-t-2xl sm:rounded-t-3xl p-6 sm:p-10 lg:p-16 overflow-hidden">
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-blue-500/20 to-purple-500/20 animate-pulse" />
          
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
          
          {/* Floating shapes */}
          <div className="absolute top-10 right-10 w-20 sm:w-28 lg:w-32 h-20 sm:h-28 lg:h-32 bg-yellow-400/20 rounded-full blur-2xl animate-pulse" />
          <div className="absolute bottom-10 left-10 w-24 sm:w-32 lg:w-40 h-24 sm:h-32 lg:h-40 bg-cyan-400/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />

          <div ref={headerRef} className="relative z-10">
            {/* Premium Badge */}
            <div className="header-element inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400/30 to-amber-400/30 backdrop-blur-md px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full mb-4 sm:mb-6 border border-yellow-400/30 shadow-lg">
              <Award size={14} className="sm:w-4 sm:h-4 text-yellow-300" strokeWidth={2.5} />
              <p className="text-xs sm:text-sm font-bold text-yellow-200 uppercase tracking-widest">Premium Solar Solution</p>
              <Sparkles size={14} className="sm:w-4 sm:h-4 text-yellow-300 sparkle" />
            </div>

            {/* Main Headline */}
            <h2 className="header-element text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-black mb-3 sm:mb-4 leading-tight bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              Achieve Zero Electricity Bills
            </h2>

            {/* Sub-headline with glow effect */}
            <p className="header-element text-base sm:text-xl lg:text-2xl text-blue-100 font-light mb-6 sm:mb-8 leading-relaxed">
              Generate your own power and secure your future.
            </p>

            {/* Premium guarantee badges */}
            <div className="header-element flex flex-wrap gap-2 sm:gap-3">
              <div className="bg-white/10 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border border-white/20 shadow-lg">
                <p className="text-xs sm:text-sm font-semibold text-white">✓ ISO Certified</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border border-white/20 shadow-lg">
                <p className="text-xs sm:text-sm font-semibold text-white">✓ Government Approved</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border border-white/20 shadow-lg">
                <p className="text-xs sm:text-sm font-semibold text-white">✓ 30+ Years Experience</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div ref={contentRef} className="p-6 sm:p-8 lg:p-12 xl:p-14 bg-gradient-to-b from-gray-50 to-white">
          {/* Features Grid - Ultra Premium */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-10 lg:mb-12">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className={`feature-card group relative bg-white p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border-2 border-gray-100 hover:border-transparent transition-all duration-500 shadow-lg hover:shadow-2xl ${feature.bgGlow}`}
                  style={{ opacity: 0 }}
                >
                  {/* Animated gradient border on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10`} />
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-xl sm:rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-20`} />

                  <div className="relative">
                    {/* Icon with gradient background and floating animation */}
                    <div className={`feature-icon bg-gradient-to-br ${feature.gradient} w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-5 shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:scale-110`}>
                      <Icon size={24} className="sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" strokeWidth={2.5} />
                    </div>

                    {/* Title with gradient on hover */}
                    <h3 className="text-base sm:text-lg lg:text-xl font-black text-gray-900 mb-2 sm:mb-3 group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                      {feature.description}
                    </p>

                    {/* Animated checkmark */}
                    <div className="mt-3 sm:mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${feature.gradient}`} />
                      <span className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider">Verified</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Ultra-Premium Statistics Bar */}
          <div ref={statsRef} className="relative bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 mb-8 sm:mb-10 lg:mb-12 shadow-2xl overflow-hidden">
            {/* Animated background pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImRvdHMiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IndoaXRlIiBvcGFjaXR5PSIwLjIiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZG90cykiLz48L3N2Zz4=')] opacity-50" />
            
            <div className="relative">
              <h4 className="text-center text-white/90 font-bold text-xs sm:text-sm uppercase tracking-widest mb-6 sm:mb-8">Performance Metrics</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 xl:gap-8 text-center">
                <div className="stat-number bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 border border-white/20 shadow-xl hover:bg-white/20 transition-all hover:scale-105">
                  <p className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-1 sm:mb-2">3-5</p>
                  <p className="text-[10px] sm:text-xs lg:text-sm text-emerald-100 font-bold uppercase tracking-wide">Years ROI</p>
                </div>
                <div className="stat-number bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 border border-white/20 shadow-xl hover:bg-white/20 transition-all hover:scale-105">
                  <p className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-1 sm:mb-2">25+</p>
                  <p className="text-[10px] sm:text-xs lg:text-sm text-emerald-100 font-bold uppercase tracking-wide">Year Warranty</p>
                </div>
                <div className="stat-number bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 border border-white/20 shadow-xl hover:bg-white/20 transition-all hover:scale-105">
                  <p className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-1 sm:mb-2">80%</p>
                  <p className="text-[10px] sm:text-xs lg:text-sm text-emerald-100 font-bold uppercase tracking-wide">Bill Savings</p>
                </div>
                <div className="stat-number bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 border border-white/20 shadow-xl hover:bg-white/20 transition-all hover:scale-105">
                  <p className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-1 sm:mb-2">24/7</p>
                  <p className="text-[10px] sm:text-xs lg:text-sm text-emerald-100 font-bold uppercase tracking-wide">Monitoring</p>
                </div>
              </div>
            </div>
          </div>

          {/* Ultra-Premium CTA Section */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
            <a
              href="https://wa.me/918275001561?text=I%20want%20a%20quote%20for%20Solar%20Rooftop%20System"
              className="flex-1 group/cta relative overflow-hidden rounded-xl sm:rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 active:scale-100"
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 transition-all duration-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-500" />
              
              {/* Content */}
              <div className="relative px-6 sm:px-8 py-5 sm:py-6 text-center">
                <div className="flex items-center justify-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                  <Sparkles size={20} className="sm:w-6 sm:h-6 text-yellow-300 group-hover/cta:animate-spin" />
                  <p className="text-white font-black text-base sm:text-xl lg:text-2xl">Get Free Expert Consultation</p>
                  <Sparkles size={20} className="sm:w-6 sm:h-6 text-yellow-300 group-hover/cta:animate-spin" style={{ animationDelay: '0.5s' }} />
                </div>
                <p className="text-blue-100 text-xs sm:text-sm font-medium">
                  WhatsApp our solar experts • Instant response • Free site survey
                </p>
              </div>

              {/* Animated border shimmer */}
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl ring-2 sm:ring-4 ring-white/20 group-hover/cta:ring-white/40 transition-all" />
            </a>

            <button
              onClick={handleClose}
              className="sm:w-auto px-8 sm:px-10 py-5 sm:py-6 border-2 sm:border-3 border-gray-300 bg-white text-gray-700 rounded-xl sm:rounded-2xl hover:bg-gray-50 hover:border-gray-400 hover:scale-105 active:scale-95 transition-all font-bold text-base sm:text-lg shadow-lg hover:shadow-xl"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarDetailsModal;
