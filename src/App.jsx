import { Analytics } from '@vercel/analytics/react';
import { Navbar, Footer, WhatsAppButton } from '@components/layout';
import {
  Hero,
  TrustBar,
  TrustStrip,
  PMSuryaGharSection,
  BentoGrid,
  SolarSection,
  BatterySection,
  InvertersSection,
  AboutUs,
} from '@components/sections';

/**
 * Main Application Component
 * Assembles all sections of the SIGMA Sales & Services website
 */
const App = () => {
  return (
    <div className="antialiased font-sans text-gray-900 bg-gray-50 scroll-smooth selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      {/* Navigation */}
      <Navbar />

      {/* Main Sections */}
      <main>
        <Hero />
        <TrustStrip />
        <PMSuryaGharSection />
        <BentoGrid />
        <SolarSection />
        <TrustBar />
        <BatterySection />
        <InvertersSection />
        <AboutUs />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />

      {/* Vercel Analytics */}
      <Analytics />
    </div>
  );
};

export default App;
