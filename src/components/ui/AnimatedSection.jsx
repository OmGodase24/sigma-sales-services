import { useOnScreen } from '@hooks';

/**
 * AnimatedSection Component
 * Wrapper component that adds fade-in and slide-up animations
 * when the element enters the viewport
 */
const AnimatedSection = ({ children, className = '', delay = 0 }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
