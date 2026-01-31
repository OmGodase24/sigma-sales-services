import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook for GSAP scroll-triggered animations
 * @param {Object} options - Animation options
 * @returns {React.RefObject} - Reference to attach to element
 */
export const useGsapScrollTrigger = (options = {}) => {
  const elementRef = useRef(null);

  const {
    animation = 'fadeUp',
    duration = 1,
    delay = 0,
    ease = 'power3.out',
    start = 'top 85%',
    end = 'bottom 20%',
    scrub = false,
    markers = false,
  } = options;

  useLayoutEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      // Set initial state based on animation type
      const animations = {
        fadeUp: {
          from: { opacity: 0, y: 60 },
          to: { opacity: 1, y: 0 },
        },
        fadeDown: {
          from: { opacity: 0, y: -60 },
          to: { opacity: 1, y: 0 },
        },
        fadeLeft: {
          from: { opacity: 0, x: -80 },
          to: { opacity: 1, x: 0 },
        },
        fadeRight: {
          from: { opacity: 0, x: 80 },
          to: { opacity: 1, x: 0 },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        scaleUp: {
          from: { opacity: 0, scale: 0.8 },
          to: { opacity: 1, scale: 1 },
        },
        rotateIn: {
          from: { opacity: 0, rotation: -10, y: 40 },
          to: { opacity: 1, rotation: 0, y: 0 },
        },
      };

      const anim = animations[animation] || animations.fadeUp;

      gsap.fromTo(
        element,
        anim.from,
        {
          ...anim.to,
          duration,
          delay,
          ease,
          scrollTrigger: {
            trigger: element,
            start,
            end,
            scrub,
            markers,
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, element);

    return () => ctx.revert();
  }, [animation, duration, delay, ease, start, end, scrub, markers]);

  return elementRef;
};

/**
 * Custom hook for staggered children animations
 * @param {Object} options - Animation options
 * @returns {React.RefObject} - Reference to attach to parent element
 */
export const useGsapStagger = (options = {}) => {
  const containerRef = useRef(null);

  const {
    childSelector = '.stagger-item',
    animation = 'fadeUp',
    duration = 0.8,
    stagger = 0.15,
    delay = 0,
    ease = 'power3.out',
    start = 'top 85%',
  } = options;

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const children = container.querySelectorAll(childSelector);
      if (children.length === 0) return;

      const animations = {
        fadeUp: { from: { opacity: 0, y: 50 }, to: { opacity: 1, y: 0 } },
        fadeLeft: { from: { opacity: 0, x: -50 }, to: { opacity: 1, x: 0 } },
        fadeRight: { from: { opacity: 0, x: 50 }, to: { opacity: 1, x: 0 } },
        scaleUp: { from: { opacity: 0, scale: 0.8 }, to: { opacity: 1, scale: 1 } },
      };

      const anim = animations[animation] || animations.fadeUp;

      gsap.fromTo(
        children,
        anim.from,
        {
          ...anim.to,
          duration,
          stagger,
          delay,
          ease,
          scrollTrigger: {
            trigger: container,
            start,
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, [childSelector, animation, duration, stagger, delay, ease, start]);

  return containerRef;
};

/**
 * Custom hook for parallax effect
 * @param {Object} options - Parallax options
 * @returns {React.RefObject} - Reference to attach to element
 */
export const useGsapParallax = (options = {}) => {
  const elementRef = useRef(null);

  const {
    speed = 0.5,
    direction = 'vertical', // 'vertical' or 'horizontal'
  } = options;

  useLayoutEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      const movement = direction === 'vertical' ? { y: 100 * speed } : { x: 100 * speed };

      gsap.to(element, {
        ...movement,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, element);

    return () => ctx.revert();
  }, [speed, direction]);

  return elementRef;
};

/**
 * Custom hook for text reveal animation
 * @param {Object} options - Animation options
 * @returns {React.RefObject} - Reference to attach to text element
 */
export const useGsapTextReveal = (options = {}) => {
  const textRef = useRef(null);

  const {
    type = 'words', // 'chars', 'words', or 'lines'
    duration = 0.8,
    stagger = 0.05,
    delay = 0,
    ease = 'power3.out',
    start = 'top 85%',
  } = options;

  useLayoutEffect(() => {
    const element = textRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      // Simple word/character split
      const text = element.textContent;
      let items;

      if (type === 'chars') {
        items = text.split('').map((char) => `<span class="gsap-char" style="display:inline-block">${char === ' ' ? '&nbsp;' : char}</span>`);
      } else {
        items = text.split(' ').map((word) => `<span class="gsap-word" style="display:inline-block">${word}&nbsp;</span>`);
      }

      element.innerHTML = items.join('');
      const spans = element.querySelectorAll(type === 'chars' ? '.gsap-char' : '.gsap-word');

      gsap.fromTo(
        spans,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          delay,
          ease,
          scrollTrigger: {
            trigger: element,
            start,
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, element);

    return () => ctx.revert();
  }, [type, duration, stagger, delay, ease, start]);

  return textRef;
};

/**
 * Custom hook for counter animation
 * @param {Object} options - Counter options
 * @returns {React.RefObject} - Reference to attach to element
 */
export const useGsapCounter = (options = {}) => {
  const counterRef = useRef(null);

  const {
    endValue = 100,
    duration = 2,
    delay = 0,
    prefix = '',
    suffix = '',
    decimals = 0,
    start = 'top 85%',
  } = options;

  useLayoutEffect(() => {
    const element = counterRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      const counter = { value: 0 };

      gsap.to(counter, {
        value: endValue,
        duration,
        delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start,
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          element.textContent = `${prefix}${counter.value.toFixed(decimals)}${suffix}`;
        },
      });
    }, element);

    return () => ctx.revert();
  }, [endValue, duration, delay, prefix, suffix, decimals, start]);

  return counterRef;
};

/**
 * Custom hook for magnetic button effect
 * @returns {Object} - Refs and event handlers
 */
export const useGsapMagnetic = (strength = 0.5) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(element, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return elementRef;
};

/**
 * Initialize smooth scroll for the entire page
 */
export const initSmoothScroll = () => {
  // Native smooth scroll is already enabled via CSS
  // This can be extended with GSAP ScrollSmoother if needed
};

export { gsap, ScrollTrigger };
