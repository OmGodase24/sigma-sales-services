import { useRef, useLayoutEffect, useState } from 'react';
import {
    Sun,
    CheckCircle2,
    FileText,
    UserCheck,
    Zap,
    TrendingUp,
    Shield,
    ArrowRight,
    Sparkles
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Subsidy data for different system capacities
 */
const subsidyData = [
    { capacity: '1 kW', subsidy: 30000, description: 'Perfect for small homes' },
    { capacity: '2 kW', subsidy: 60000, description: 'Ideal for medium homes' },
    { capacity: '3 kW+', subsidy: 78000, description: 'Best for large homes' },
];

/**
 * Group Housing Society subsidy information
 */
const ghsSubsidyInfo = {
    rate: 18000, // per kW
    maxCapacity: 500, // kW
    capacityPerHousehold: 3, // kW
    description: 'For common power utilities like lifts, water pumps, common lighting, gyms, and EV charging stations',
};

/**
 * Example calculation for 50 kW GHS system
 */
const ghsExample = {
    systemCapacity: 50, // kW
    subsidyAmount: 900000, // 50 × 18,000
    projectCostMin: 2000000,
    projectCostMax: 2500000,
};

/**
 * Process steps for getting subsidy
 */
const processSteps = [
    {
        step: 1,
        title: 'Register Online',
        description: 'Quick registration on portal',
        icon: FileText,
        color: 'from-blue-500 to-blue-600',
    },
    {
        step: 2,
        title: 'Choose Us',
        description: 'Registered Vendor',
        icon: UserCheck,
        color: 'from-green-500 to-green-600',
    },
    {
        step: 3,
        title: 'Installation',
        description: 'Net Meter Setup',
        icon: Zap,
        color: 'from-orange-500 to-orange-600',
    },
    {
        step: 4,
        title: 'Get Subsidy',
        description: 'Within ~30 days',
        icon: TrendingUp,
        color: 'from-emerald-500 to-emerald-600',
    },
];

/**
 * PMSuryaGharSection Component
 * Explains PM Surya Ghar Muft Bijli Yojana with interactive subsidy calculator
 */
const PMSuryaGharSection = () => {
    const sectionRef = useRef(null);
    const [selectedCapacity, setSelectedCapacity] = useState(2); // Default to 2kW (index 1)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Animate header
            const header = sectionRef.current?.querySelector('.section-header');
            if (header) {
                gsap.fromTo(
                    header,
                    { opacity: 0, y: -40, scale: 0.95 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 1,
                        ease: 'back.out(1.5)',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            }

            // Animate content columns
            const leftContent = sectionRef.current?.querySelector('.left-content');
            const rightContent = sectionRef.current?.querySelector('.right-content');

            if (leftContent && rightContent) {
                gsap.fromTo(
                    leftContent,
                    { opacity: 0, x: -60 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 70%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );

                gsap.fromTo(
                    rightContent,
                    { opacity: 0, x: 60 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 70%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            }

            // Animate process steps
            const steps = sectionRef.current?.querySelectorAll('.process-step');
            if (steps?.length) {
                gsap.fromTo(
                    steps,
                    { opacity: 0, y: 30, scale: 0.9 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: 'back.out(1.4)',
                        scrollTrigger: {
                            trigger: steps[0],
                            start: 'top 80%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const currentSubsidy = subsidyData[selectedCapacity];

    return (
        <section
            ref={sectionRef}
            className="relative py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-blue-50 via-orange-50 to-white overflow-hidden"
        >
            {/* Decorative elements with government colors */}
            <div className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] bg-blue-200/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] bg-orange-200/30 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 md:w-[450px] md:h-[450px] lg:w-[600px] lg:h-[600px] bg-green-100/20 rounded-full blur-3xl"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Premium Header */}
                <div className="section-header text-center mb-16 sm:mb-20 lg:mb-24">
                    {/* Government badge */}
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 via-white to-orange-500 border-2 border-blue-600 mb-6 shadow-xl">
                        <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" strokeWidth={2.5} />
                        <span className="text-sm sm:text-base lg:text-lg font-black text-gray-900 tracking-wide">GOVERNMENT OF INDIA SCHEME</span>
                        <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" strokeWidth={2.5} />
                    </div>

                    {/* Main heading */}
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-gray-900 mb-6">
                        PM Surya Ghar:
                        <span className="block bg-gradient-to-r from-blue-600 via-orange-500 to-green-600 bg-clip-text text-transparent mt-2">
                            Muft Bijli Yojana
                        </span>
                    </h2>

                    {/* Highlight subsidy */}
                    <div className="inline-flex items-center gap-4 px-8 py-5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-2xl mb-6">
                        <Sun className="w-8 h-8 sm:w-10 sm:h-10 text-white" strokeWidth={2.5} />
                        <div className="text-left">
                            <p className="text-sm sm:text-base text-green-100 font-semibold">Get Direct Subsidy Up To</p>
                            <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">₹78,000</p>
                        </div>
                    </div>

                    <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium">
                        Free electricity for your home with government subsidies
                    </p>
                </div>

                {/* 2-Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-20 mb-20 sm:mb-24 lg:mb-28">
                    {/* Left Column - Information & Process */}
                    <div className="left-content space-y-10 sm:space-y-12 lg:space-y-14">
                        {/* Subsidy Table */}
                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-orange-500 rounded-3xl opacity-20 blur-lg"></div>
                            <div className="relative bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border-2 border-gray-200">
                                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-6 sm:mb-8 flex items-center gap-3">
                                    <TrendingUp className="w-8 h-8 text-green-600" strokeWidth={2.5} />
                                    Subsidy Benefits
                                </h3>

                                <div className="space-y-4">
                                    {subsidyData.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center justify-between p-5 sm:p-6 bg-gradient-to-r from-blue-50 to-orange-50 rounded-2xl border-2 border-blue-200 hover:border-orange-400 transition-all duration-300 hover:scale-105"
                                        >
                                            <div>
                                                <p className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900">{item.capacity} System</p>
                                                <p className="text-sm sm:text-base text-gray-600 font-medium">{item.description}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm sm:text-base text-green-700 font-bold mb-1">Subsidy</p>
                                                <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-green-600">
                                                    ₹{item.subsidy.toLocaleString('en-IN')}
                                                </p>
                                            </div>
                                        </div>
                                    ))}

                                    {/* GHS/RWA Subsidy - Compact Card */}
                                    <div className="mt-6 p-5 sm:p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-300 hover:border-purple-400 transition-all duration-300">
                                        <div className="flex items-start gap-3 mb-3">
                                            <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 flex-shrink-0 mt-1" strokeWidth={2.5} />
                                            <div className="flex-1">
                                                <p className="text-base sm:text-lg lg:text-xl font-black text-purple-900 mb-1">
                                                    GHS/RWA (Housing Societies)
                                                </p>
                                                <p className="text-xs sm:text-sm text-gray-600 font-medium">
                                                    Group Housing Society / Resident Welfare Association
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm sm:text-base text-purple-700 font-bold mb-1">Subsidy Rate</p>
                                                <p className="text-xl sm:text-2xl lg:text-3xl font-black text-purple-600">
                                                    ₹18,000/kW
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm sm:text-base text-purple-700 font-bold mb-1">Up to</p>
                                                <p className="text-xl sm:text-2xl lg:text-3xl font-black text-purple-600">
                                                    500 kW
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Vendor Note - Selling Point */}
                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl opacity-20 blur-lg"></div>
                            <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-6 sm:p-8 border-2 border-green-300 shadow-lg">
                                <div className="flex items-start gap-4">
                                    <div className="shrink-0 p-3 bg-green-500 rounded-xl">
                                        <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-white" strokeWidth={2.5} />
                                    </div>
                                    <div>
                                        <h4 className="text-xl sm:text-2xl font-black text-gray-900 mb-3">We Handle Everything!</h4>
                                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-medium">
                                            As a <span className="font-black text-green-700">Registered Vendor</span>, we manage the entire application and documentation process for you. No paperwork hassle!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Interactive Calculator */}
                    <div className="right-content">
                        <div className="sticky top-24">
                            <div className="relative">
                                <div className="absolute -inset-2 bg-gradient-to-r from-orange-400 to-amber-400 rounded-[2.5rem] opacity-30 blur-2xl"></div>

                                <div className="relative bg-white rounded-[2.5rem] p-8 sm:p-10 lg:p-12 shadow-2xl border-4 border-orange-200">
                                    {/* Calculator Header */}
                                    <div className="text-center mb-8 sm:mb-10">
                                        <div className="inline-flex items-center gap-3 px-6 py-3 bg-orange-100 rounded-full mb-6">
                                            <Sparkles className="w-5 h-5 text-orange-600" strokeWidth={2.5} />
                                            <span className="text-base sm:text-lg font-black text-orange-900">Subsidy Calculator</span>
                                        </div>
                                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-3">
                                            Select Your System
                                        </h3>
                                        <p className="text-base sm:text-lg text-gray-600 font-medium">
                                            Choose capacity to see your subsidy
                                        </p>
                                    </div>

                                    {/* Capacity Toggle Buttons */}
                                    <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-10 sm:mb-12">
                                        {subsidyData.map((item, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setSelectedCapacity(idx)}
                                                className={`relative p-4 sm:p-6 rounded-2xl font-black text-base sm:text-lg lg:text-xl transition-all duration-300 ${selectedCapacity === idx
                                                    ? 'bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-2xl scale-105'
                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                    }`}
                                            >
                                                {item.capacity}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Subsidy Display */}
                                    <div className="relative mb-8 sm:mb-10">
                                        <div className="absolute -inset-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-3xl blur-xl opacity-30"></div>
                                        <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-8 sm:p-10 text-center shadow-2xl">
                                            <p className="text-base sm:text-lg text-green-100 font-bold mb-2">Your Subsidy Amount</p>
                                            <p className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-4">
                                                ₹{currentSubsidy.subsidy.toLocaleString('en-IN')}
                                            </p>
                                            <p className="text-base sm:text-lg text-green-100 font-semibold">
                                                {currentSubsidy.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* CTA Button */}
                                    <a
                                        href="https://wa.me/918275001561?text=Hi, I want to apply for PM Surya Ghar Yojana"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group block w-full bg-gradient-to-r from-blue-600 to-orange-500 text-white font-black text-lg sm:text-xl py-5 sm:py-6 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-center"
                                    >
                                        <span className="flex items-center justify-center gap-3">
                                            Apply Now - Free Consultation
                                            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" strokeWidth={3} />
                                        </span>
                                    </a>

                                    {/* Trust indicators */}
                                    <div className="mt-6 flex flex-wrap gap-3 justify-center">
                                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-200">
                                            <CheckCircle2 className="w-4 h-4 text-blue-600" strokeWidth={2.5} />
                                            <span className="text-xs sm:text-sm font-bold text-blue-900">Registered Vendor</span>
                                        </div>
                                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full border border-green-200">
                                            <CheckCircle2 className="w-4 h-4 text-green-600" strokeWidth={2.5} />
                                            <span className="text-xs sm:text-sm font-bold text-green-900">30-Day Subsidy</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Process Steps - Horizontal */}
                <div className="relative">
                    <div className="text-center mb-12 sm:mb-16">
                        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
                            Simple 4-Step Process
                        </h3>
                        <p className="text-lg sm:text-xl text-gray-600 font-medium">
                            Get your solar system with government subsidy
                        </p>
                    </div>

                    {/* Steps Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
                        {processSteps.map((step, idx) => {
                            const Icon = step.icon;

                            return (
                                <div key={idx} className="process-step relative group">
                                    {/* Connecting line (hidden on mobile, shown on lg+) */}
                                    {idx < processSteps.length - 1 && (
                                        <div className="hidden lg:block absolute top-16 left-full w-10 h-1 bg-gradient-to-r from-gray-300 to-gray-200 z-0"></div>
                                    )}

                                    {/* Step card */}
                                    <div className="relative bg-white rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border-2 border-gray-200 group-hover:border-transparent">
                                        {/* Step number badge */}
                                        <div className="absolute -top-4 -left-4 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-600 to-orange-500 rounded-full flex items-center justify-center text-white font-black text-xl sm:text-2xl shadow-lg">
                                            {step.step}
                                        </div>

                                        {/* Gradient overlay on hover */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}></div>

                                        {/* Icon */}
                                        <div className={`relative inline-flex p-4 sm:p-5 rounded-2xl bg-gradient-to-br ${step.color} shadow-lg mb-6 group-hover:scale-110 transition-transform duration-500`}>
                                            <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" strokeWidth={2.5} />
                                        </div>

                                        {/* Content */}
                                        <h4 className="text-xl sm:text-2xl font-black text-gray-900 mb-2">
                                            {step.title}
                                        </h4>
                                        <p className="text-sm sm:text-base text-gray-600 font-medium">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PMSuryaGharSection;
