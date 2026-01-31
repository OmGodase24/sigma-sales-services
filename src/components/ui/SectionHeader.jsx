import AnimatedSection from './AnimatedSection';

/**
 * SectionHeader Component
 * Reusable header component for sections with title, underline, and subtitle
 */
const SectionHeader = ({ title, subtitle, align = 'center' }) => (
  <AnimatedSection className={`mb-8 sm:mb-10 md:mb-12 lg:mb-16 text-${align}`}>
    <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-2 sm:mb-3 md:mb-4 tracking-tight">
      {title}
    </h2>
    <div
      className={`w-14 sm:w-16 md:w-20 h-1 bg-yellow-400 ${
        align === 'center' ? 'mx-auto' : ''
      } mb-3 sm:mb-4 rounded-full`}
    ></div>
    {subtitle && (
      <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base px-2 sm:px-0">{subtitle}</p>
    )}
  </AnimatedSection>
);

export default SectionHeader;
