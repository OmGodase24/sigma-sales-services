import { useState, useRef, useLayoutEffect } from 'react';
import { Calculator, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * SolarCalculator Component
 * Interactive calculator with GSAP animations
 */
const SolarCalculator = () => {
  const [bill, setBill] = useState('');
  const [result, setResult] = useState(null);
  const calculatorRef = useRef(null);
  const resultRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Calculator entrance animation
      gsap.fromTo(
        calculatorRef.current,
        { opacity: 0, scale: 0.95, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: calculatorRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, calculatorRef);

    return () => ctx.revert();
  }, []);

  // Animate result when it appears
  useLayoutEffect(() => {
    if (result && resultRef.current) {
      gsap.fromTo(
        resultRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.5)' }
      );

      // Animate the individual result cards
      const cards = resultRef.current.querySelectorAll('.result-card');
      gsap.fromTo(
        cards,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: 'back.out(2)',
          delay: 0.2,
        }
      );

      // Counter animation for numbers
      const systemSize = { value: 0 };
      const savings = { value: 0 };

      gsap.to(systemSize, {
        value: result.systemSize,
        duration: 1,
        ease: 'power2.out',
        onUpdate: () => {
          const el = resultRef.current?.querySelector('.system-size');
          if (el) el.textContent = `${systemSize.value.toFixed(1)} kW`;
        },
      });

      gsap.to(savings, {
        value: result.annualSavings,
        duration: 1.5,
        ease: 'power2.out',
        onUpdate: () => {
          const el = resultRef.current?.querySelector('.annual-savings');
          if (el) el.textContent = `₹${Math.floor(savings.value).toLocaleString('en-IN')}`;
        },
      });
    }
  }, [result]);

  const calculate = () => {
    const billAmount = parseFloat(bill);
    if (!billAmount || billAmount <= 0) return;

    // Logic: Avg rate ~8 INR/unit. 1kW generates ~4 units/day => ~120 units/month.
    // System needed = (Bill / 8) / 120
    const unitsConsumed = billAmount / 8;
    const kwNeeded = unitsConsumed / 120;
    const systemSize = Math.ceil(kwNeeded * 2) / 2; // Round to nearest 0.5
    const annualSavings = systemSize * 4 * 365 * 8;

    setResult({ systemSize, annualSavings });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      calculate();
    }
  };

  return (
    <div
      ref={calculatorRef}
      className="bg-gray-50 p-4 sm:p-6 lg:p-8 xl:p-10 rounded-2xl sm:rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-500"
    >
      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="p-2 sm:p-3 bg-green-100 rounded-lg sm:rounded-xl">
          <Calculator className="text-green-600 w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
        </div>
        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">Solar ROI Calculator</h3>
      </div>
      <p className="text-xs sm:text-sm text-gray-500 mb-5 sm:mb-6 lg:mb-8 leading-relaxed">
        Estimate your savings based on your current monthly electricity bill. See
        how fast solar pays for itself.
      </p>

      <div className="space-y-4 sm:space-y-5">
        <div>
          <label className="block text-[10px] sm:text-xs font-bold text-gray-500 uppercase mb-1.5 sm:mb-2 tracking-wider">
            Monthly Bill (₹)
          </label>
          <input
            type="number"
            value={bill}
            onChange={(e) => setBill(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g. 2500"
            className="w-full px-3 sm:px-4 lg:px-5 py-3 sm:py-4 rounded-lg sm:rounded-xl border border-gray-200 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all text-base sm:text-lg font-medium"
          />
        </div>
        <button
          onClick={calculate}
          className="w-full py-3 sm:py-4 bg-green-500 text-white font-bold rounded-lg sm:rounded-xl hover:bg-green-600 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg hover:shadow-green-500/30 flex justify-center items-center gap-2 text-base sm:text-lg"
        >
          Calculate Savings <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {result && (
        <div
          ref={resultRef}
          className="mt-5 sm:mt-6 lg:mt-8 pt-5 sm:pt-6 lg:pt-8 border-t border-gray-200"
        >
          <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4 text-center">
            <div className="result-card bg-white p-2.5 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <span className="block text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-wider mb-0.5 sm:mb-1">
                Rec. System
              </span>
              <span className="system-size block text-lg sm:text-xl lg:text-2xl font-black text-blue-900">
                0 kW
              </span>
            </div>
            <div className="result-card bg-white p-2.5 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <span className="block text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-wider mb-0.5 sm:mb-1">
                Annual Savings
              </span>
              <span className="annual-savings block text-lg sm:text-xl lg:text-2xl font-black text-green-600">
                ₹0
              </span>
            </div>
          </div>
          <p className="text-[9px] sm:text-[10px] text-center text-gray-400 mt-3 sm:mt-4 italic">
            *Estimates based on ₹8/unit tariff.
          </p>
        </div>
      )}
    </div>
  );
};

export default SolarCalculator;
