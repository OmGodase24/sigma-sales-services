import { useRef, useLayoutEffect } from 'react';
import { Phone } from 'lucide-react';
import { gsap } from 'gsap';

/**
 * WhatsApp Button Component
 * Floating action button with GSAP animations
 */
const WhatsAppButton = () => {
  const buttonRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Initial entrance animation
      gsap.fromTo(
        buttonRef.current,
        { scale: 0, opacity: 0, rotation: -180 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.8,
          delay: 1.5,
          ease: 'elastic.out(1, 0.5)',
        }
      );

      // Continuous pulse animation
      gsap.to(buttonRef.current, {
        scale: 1.1,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2.5,
      });

      // Add hover effect
      const button = buttonRef.current;
      if (button) {
        button.addEventListener('mouseenter', () => {
          gsap.to(button, {
            scale: 1.2,
            duration: 0.3,
            ease: 'back.out(2)',
          });
        });

        button.addEventListener('mouseleave', () => {
          gsap.to(button, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
          });
        });
      }
    }, buttonRef);

    return () => ctx.revert();
  }, []);

  return (
    <a
      ref={buttonRef}
      href="https://wa.me/918275001561"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 md:bottom-6 md:right-6 lg:bottom-8 lg:right-8 bg-green-500 hover:bg-green-600 text-white w-14 h-14 sm:w-14 sm:h-14 md:w-15 md:h-15 lg:w-16 lg:h-16 rounded-full flex items-center justify-center shadow-xl shadow-green-500/30 transition-colors z-[9999] max-w-[64px] max-h-[64px]"
      aria-label="Contact on WhatsApp"
      style={{ touchAction: 'manipulation' }}
    >
      <Phone className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" fill="currentColor" />
    </a>
  );
};

export default WhatsAppButton;
