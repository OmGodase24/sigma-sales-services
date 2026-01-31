import { useRef, useLayoutEffect, useState } from 'react';
import {
    Sun,
    Zap,
    BatteryCharging,
    Droplet,
    ArrowRight,
    CheckCircle2,
    TrendingUp,
    Sparkles,
    Calculator,
    MessageCircle
} from 'lucide-react';
import { SolarDetailsModal } from '@components/ui';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Solutions data with enhanced details
 */
const solutions = [
    {
        id: 'solar',
        title: 'Solar Rooftop Systems',
        description: 'On-Grid & Hybrid solutions. Save up to 80% on electricity bills with government subsidies.',
        badge: 'MOST POPULAR',
        badgeColor: 'bg-green-500',
        icon: Sun,
        iconColor: 'text-yellow-400',
        bgGradient: 'from-orange-500 via-amber-500 to-yellow-500',
        image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
        ctaText: 'Learn More',
        large: true,
    },
    {
        id: 'lift',
        title: 'Industrial Lift Inverters',
        description: 'Zero-jerk technology for apartments & hospitals.',
        icon: Zap,
        iconColor: 'text-blue-500',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        ctaText: 'View Specs',
        image: '/luminous inverter.png',
    },
    {
        id: 'automotive',
        title: 'Automotive Batteries',
        description: 'Cars, Bikes, & Tractors',
        icon: BatteryCharging,
        iconColor: 'text-emerald-500',
        bgColor: 'bg-emerald-50',
        borderColor: 'border-emerald-200',
        image: '/exide-car-battery.jpg',
    },
    {
        id: 'heater',
        title: 'Solar Water Heaters',
        description: 'Hot water, zero electricity.',
        icon: Droplet,
        iconColor: 'text-orange-500',
        bgGradient: 'from-blue-600 to-blue-700',
        textColor: 'text-white',
        image: '/solar water heater.jpg',
    },
];

const systemTypes = [
    {
        title: 'On-Grid Systems',
        description: 'Best for maximum ROI. Export excess power to MSEDCL grid via Net Metering and reduce bills to zero.',
        icon: TrendingUp,
        gradient: 'from-emerald-600 to-teal-600',
        features: ['Net Metering', 'Zero Bills', 'Maximum ROI', 'No Batteries Needed'],
    },
    {
        title: 'Hybrid Systems',
        description: 'Energy independence. Store solar power to run your home essentials even during long power cuts.',
        icon: Sparkles,
        gradient: 'from-blue-600 to-indigo-600',
        features: ['Battery Backup', 'Power Cut Protection', 'Energy Independence', 'Grid + Solar'],
    },
];

/**
 * SolutionsSection Component
 * Comprehensive energy solutions showcase with ROI calculator
 */
const SolutionsSection = () => {
    const sectionRef = useRef(null);
    const [isSolarModalOpen, setIsSolarModalOpen] = useState(false);
    const [monthlyBill, setMonthlyBill] = useState('');
    const [roiData, setRoiData] = useState(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Animate solution cards
            const cards = sectionRef.current?.querySelectorAll('.solution-card');
            if (cards?.length) {
                gsap.fromTo(
                    cards,
                    {
                        opacity: 0,
                        y: 60,
                        scale: 0.9,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        stagger: 0.12,
                        ease: 'back.out(1.4)',
                        scrollTrigger: {
                            trigger: cards[0],
                            start: 'top 80%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );

                // Floating animation for icons
                cards.forEach((card) => {
                    const icon = card.querySelector('.solution-icon');
                    if (icon) {
                        gsap.to(icon, {
                            y: -10,
                            duration: 2.5,
                            repeat: -1,
                            yoyo: true,
                            ease: 'sine.inOut',
                        });
                    }
                });
            }

            // Animate system type cards
            const systemCards = sectionRef.current?.querySelectorAll('.system-card');
            if (systemCards?.length) {
                gsap.fromTo(
                    systemCards,
                    {
                        opacity: 0,
                        x: -40,
                        scale: 0.95,
                    },
                    {
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        duration: 0.8,
                        stagger: 0.2,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: systemCards[0],
                            start: 'top 80%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            }

            // Animate ROI calculator
            const calculator = sectionRef.current?.querySelector('.roi-calculator');
            if (calculator) {
                gsap.fromTo(
                    calculator,
                    {
                        opacity: 0,
                        scale: 0.9,
                        rotationX: -15,
                    },
                    {
                        opacity: 1,
                        scale: 1,
                        rotationX: 0,
                        duration: 1,
                        ease: 'back.out(1.5)',
                        scrollTrigger: {
                            trigger: calculator,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const calculateROI = () => {
        const bill = parseFloat(monthlyBill);
        if (isNaN(bill) || bill <= 0) return;

        const annualBill = bill * 12;
        const systemCost = bill * 60; // Rough estimate: 5 years payback
        const annualSavings = annualBill * 0.8; // 80% savings
        const paybackYears = (systemCost / annualSavings).toFixed(1);
        const savings25Years = (annualSavings * 25).toFixed(0);

        setRoiData({
            systemCost: systemCost.toFixed(0),
            annualSavings: annualSavings.toFixed(0),
            paybackYears,
            savings25Years,
        });
    };

    const handleSolutionClick = (solutionId) => {
        if (solutionId === 'solar') {
            setIsSolarModalOpen(true);
        }
    };

    return (
        <section ref={sectionRef} className="py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] bg-yellow-100/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] bg-blue-100/20 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16 sm:mb-20 lg:mb-24">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-200/50 backdrop-blur-sm mb-6">
                        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
                        <span className="text-sm sm:text-base font-semibold text-yellow-900">Energy Solutions</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-6">
                        Our
                        <span className="block bg-gradient-to-r from-yellow-500 via-orange-500 to-amber-600 bg-clip-text text-transparent mt-2">
                            Solutions
                        </span>
                    </h2>
                    <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                        Comprehensive energy solutions tailored for residential comfort and industrial reliability.
                    </p>
                </div>

                {/* Solutions Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-7 mb-20 sm:mb-24 lg:mb-28">
                    {solutions.map((solution, idx) => {
                        const Icon = solution.icon;
                        const isLarge = solution.large;

                        if (isLarge) {
                            return (
                                <div
                                    key={solution.id}
                                    onClick={() => handleSolutionClick(solution.id)}
                                    className={`solution-card sm:col-span-2 lg:col-span-2 lg:row-span-2 relative rounded-3xl sm:rounded-[2rem] overflow-hidden group cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-700 min-h-[400px] sm:min-h-[450px] lg:min-h-[500px]`}
                                >
                                    {/* Background Image */}
                                    <img
                                        src={solution.image}
                                        alt={solution.title}
                                        className="absolute inset-0 w-full h-full object-cover transition duration-1000 group-hover:scale-110"
                                    />

                                    {/* Gradient Overlay */}
                                    <div className={`absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent group-hover:from-black/90 transition-colors duration-700`}></div>

                                    {/* Content */}
                                    <div className="absolute inset-0 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                                        {/* Badge and Icon */}
                                        <div className="flex items-start justify-between">
                                            <span className={`${solution.badgeColor} text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-full shadow-lg inline-flex items-center gap-2`}>
                                                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                                                {solution.badge}
                                            </span>
                                            <div className={`solution-icon bg-white/10 backdrop-blur-md p-3 sm:p-4 rounded-2xl`}>
                                                <Icon className={`${solution.iconColor} w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12`} strokeWidth={2} />
                                            </div>
                                        </div>

                                        {/* Bottom Content */}
                                        <div>
                                            <h3 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
                                                {solution.title}
                                            </h3>
                                            <p className="text-gray-200 text-sm sm:text-base lg:text-lg mb-5 sm:mb-6 max-w-lg leading-relaxed">
                                                {solution.description}
                                            </p>
                                            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/20 backdrop-blur-md rounded-xl text-white font-bold text-sm sm:text-base group-hover:bg-white/30 transition-colors duration-300">
                                                <span>{solution.ctaText}</span>
                                                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }

                        return (
                            <div
                                key={solution.id}
                                onClick={() => handleSolutionClick(solution.id)}
                                className={`solution-card relative rounded-2xl sm:rounded-3xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-xl transition-all duration-500 min-h-[200px] sm:min-h-[220px] lg:min-h-[240px] ${solution.image
                                    ? 'bg-gray-900'
                                    : solution.bgGradient
                                        ? `bg-gradient-to-br ${solution.bgGradient}`
                                        : `${solution.bgColor} border-2 ${solution.borderColor}`
                                    }`}
                            >
                                {/* Background Image */}
                                {solution.image && (
                                    <>
                                        <img
                                            src={solution.image}
                                            alt={solution.title}
                                            className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110"
                                        />
                                        {/* Dark overlay for better text readability */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40 group-hover:from-black/80 transition-colors duration-500"></div>
                                    </>
                                )}

                                <div className={`relative h-full p-6 sm:p-7 lg:p-8 flex flex-col justify-between ${solution.image ? 'text-white' : (solution.textColor || 'text-gray-900')}`}>
                                    {/* Icon */}
                                    <div className="flex justify-end">
                                        <div className={`solution-icon ${solution.image ? 'bg-white/20 backdrop-blur-md p-3 rounded-xl' : ''}`}>
                                            <Icon className={`${solution.image ? 'text-white' : (solution.textColor ? 'text-white/90' : solution.iconColor)} w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 group-hover:scale-110 transition-transform duration-500`} strokeWidth={2} />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div>
                                        <h3 className={`font-bold text-lg sm:text-xl lg:text-2xl mb-2 ${solution.image ? 'text-white' : (solution.textColor || 'text-gray-900')}`}>
                                            {solution.title}
                                        </h3>
                                        <p className={`text-sm sm:text-base ${solution.image ? 'text-gray-200' : (solution.textColor ? 'text-white/80' : 'text-gray-600')}`}>
                                            {solution.description}
                                        </p>
                                    </div>

                                    {/* Hover glow effect */}
                                    {(solution.bgGradient || solution.image) && (
                                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Renewable Energy Section - ULTRA PREMIUM */}
                <div className="mb-20 sm:mb-24 lg:mb-28">
                    <div className="relative bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 rounded-3xl sm:rounded-[3rem] p-1 shadow-2xl overflow-hidden group">
                        {/* Animated border glow */}
                        <div className="absolute -inset-2 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-700"></div>

                        {/* Inner content card */}
                        <div className="relative bg-gradient-to-br from-white via-green-50/50 to-emerald-50/50 rounded-[2.8rem] p-8 sm:p-12 lg:p-16 xl:p-20 backdrop-blur-xl">
                            {/* Decorative elements */}
                            <div className="absolute top-0 right-0 w-72 h-72 bg-green-200/30 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl"></div>

                            <div className="relative max-w-5xl mx-auto text-center">
                                {/* Premium badge with glow */}
                                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-xl mb-8 sm:mb-10 group-hover:scale-105 transition-transform duration-300">
                                    <Sun className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
                                    <span className="text-sm sm:text-base lg:text-lg font-bold tracking-wide">Renewable Energy</span>
                                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                                </div>

                                {/* Massive headline */}
                                <h3 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-900 mb-6 sm:mb-8 leading-tight">
                                    Invest in Solar,
                                    <span className="block bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mt-3 sm:mt-4">
                                        Secure Your Future
                                    </span>
                                </h3>

                                {/* Enhanced description */}
                                <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-gray-700 leading-relaxed max-w-4xl mx-auto font-medium">
                                    Whether you are a homeowner in <span className="font-bold text-green-700">Shahupuri</span> or running a farm in the outskirts, our solar solutions are designed for <span className="font-bold text-emerald-700">Kolhapur's unique climate conditions</span>.
                                </p>

                                {/* Stats bar */}
                                <div className="mt-10 sm:mt-12 lg:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                                    {[
                                        { label: 'CO₂ Saved', value: '10,000+', unit: 'tons', icon: '🌱' },
                                        { label: 'Happy Customers', value: '500+', unit: 'homes', icon: '⚡' },
                                        { label: 'Years Warranty', value: '25', unit: 'years', icon: '🛡️' },
                                        { label: 'Savings', value: '80%', unit: 'on bills', icon: '💰' },
                                    ].map((stat, idx) => (
                                        <div key={idx} className="relative bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-green-200/50">
                                            <div className="text-3xl sm:text-4xl mb-2">{stat.icon}</div>
                                            <div className="text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-1">
                                                {stat.value}
                                            </div>
                                            <div className="text-xs sm:text-sm lg:text-base font-bold text-gray-600 uppercase tracking-wide">{stat.label}</div>
                                            <div className="text-[10px] sm:text-xs text-gray-500 mt-1">{stat.unit}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* System Types Comparison - ULTRA PREMIUM */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-20 sm:mb-24 lg:mb-28">
                    {systemTypes.map((system, idx) => {
                        const Icon = system.icon;

                        return (
                            <div
                                key={idx}
                                className="system-card relative group"
                            >
                                {/* Gradient border wrapper */}
                                <div className={`absolute -inset-1 bg-gradient-to-r ${system.gradient} rounded-3xl sm:rounded-[2.5rem] opacity-75 group-hover:opacity-100 blur-lg transition-opacity duration-700`}></div>

                                {/* Main card */}
                                <div className="relative bg-white rounded-3xl sm:rounded-[2.5rem] p-8 sm:p-10 lg:p-14 xl:p-16 shadow-2xl hover:shadow-[0_30px_90px_-15px_rgba(0,0,0,0.3)] transition-all duration-700">
                                    {/* Decorative gradient overlay */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${system.gradient} opacity-0 group-hover:opacity-5 rounded-3xl sm:rounded-[2.5rem] transition-opacity duration-700`}></div>

                                    {/* Content */}
                                    <div className="relative">
                                        {/* Icon with glow */}
                                        <div className="relative inline-block mb-6 sm:mb-8 lg:mb-10">
                                            <div className={`absolute -inset-3 bg-gradient-to-r ${system.gradient} blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-700`}></div>
                                            <div className={`relative inline-flex p-5 sm:p-6 lg:p-7 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${system.gradient} shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                                                <Icon className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-white" strokeWidth={2.5} />
                                            </div>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 mb-4 sm:mb-6 leading-tight">
                                            {system.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-600 mb-8 sm:mb-10 lg:mb-12 leading-relaxed font-medium">
                                            {system.description}
                                        </p>

                                        {/* Features with premium styling */}
                                        <div className="space-y-4 sm:space-y-5">
                                            {system.features.map((feature, featureIdx) => (
                                                <div
                                                    key={featureIdx}
                                                    className="flex items-center gap-4 group/feature"
                                                >
                                                    <div className="relative shrink-0">
                                                        <div className="absolute inset-0 bg-green-400 blur-md opacity-0 group-hover/feature:opacity-50 transition-opacity duration-300"></div>
                                                        <CheckCircle2 className="relative w-6 h-6 sm:w-7 sm:h-7 text-green-500 group-hover/feature:scale-110 transition-transform duration-300" strokeWidth={3} />
                                                    </div>
                                                    <span className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-700 font-semibold group-hover/feature:text-gray-900 transition-colors duration-300">
                                                        {feature}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Premium indicator badge */}
                                        <div className="mt-8 sm:mt-10 lg:mt-12 pt-6 sm:pt-8 border-t-2 border-gray-100">
                                            <div className={`inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r ${system.gradient} text-white shadow-lg text-sm sm:text-base font-bold`}>
                                                <Sparkles className="w-4 h-4" strokeWidth={2.5} />
                                                <span>Best for {idx === 0 ? 'Maximum ROI' : 'Independence'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* ROI Calculator & CTA Section - ULTRA PREMIUM */}
                <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 lg:gap-10 xl:gap-12">
                    {/* ROI Calculator - Takes 3 columns */}
                    <div className="xl:col-span-3 roi-calculator relative overflow-hidden group">
                        {/* Gradient border wrapper */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 rounded-3xl sm:rounded-[2.5rem] opacity-75 group-hover:opacity-100 blur-lg transition-opacity duration-700"></div>

                        {/* Main card */}
                        <div className="relative bg-gradient-to-br from-indigo-600 via-blue-600 to-indigo-700 rounded-3xl sm:rounded-[2.5rem] p-8 sm:p-10 lg:p-12 xl:p-14 shadow-2xl text-white">
                            {/* Animated grid pattern */}
                            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20 group-hover:opacity-30 transition-opacity duration-700" />

                            {/* Floating orbs */}
                            <div className="absolute top-10 right-10 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-10 left-10 w-40 h-40 bg-purple-400/20 rounded-full blur-3xl"></div>

                            <div className="relative">
                                {/* Header with icon */}
                                <div className="flex items-center gap-4 mb-6 sm:mb-8">
                                    <div className="p-3 sm:p-4 bg-white/20 backdrop-blur-md rounded-2xl group-hover:scale-110 transition-transform duration-500">
                                        <Calculator className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" strokeWidth={2.5} />
                                    </div>
                                    <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold">
                                        Solar ROI Calculator
                                    </h3>
                                </div>

                                <p className="text-blue-100 text-base sm:text-lg lg:text-xl mb-8 sm:mb-10 leading-relaxed font-medium">
                                    Estimate your savings based on your current monthly electricity bill. See how fast solar pays for itself.
                                </p>

                                {/* Input section with premium styling */}
                                <div className="mb-6 sm:mb-8">
                                    <label className="block text-base sm:text-lg font-bold mb-4 text-blue-100">Monthly Bill (₹)</label>
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-white/30 rounded-2xl blur-md"></div>
                                        <input
                                            type="number"
                                            value={monthlyBill}
                                            onChange={(e) => setMonthlyBill(e.target.value)}
                                            placeholder="e.g. 2500"
                                            className="relative w-full px-6 py-5 sm:py-6 rounded-2xl text-gray-900 text-xl sm:text-2xl lg:text-3xl font-bold bg-white/95 backdrop-blur-sm border-2 border-white/50 focus:outline-none focus:border-white focus:ring-4 focus:ring-white/30 transition-all placeholder:text-gray-400"
                                        />
                                    </div>
                                </div>

                                {/* Calculate Button - ULTRA PREMIUM */}
                                <button
                                    onClick={calculateROI}
                                    className="w-full group/btn relative overflow-hidden bg-white text-indigo-600 font-extrabold text-lg sm:text-xl lg:text-2xl py-5 sm:py-6 lg:py-7 rounded-2xl transition-all duration-500 hover:scale-[1.02] shadow-2xl mb-8 sm:mb-10"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
                                    <span className="relative flex items-center justify-center gap-3">
                                        <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={3} />
                                        Calculate Savings
                                        <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover/btn:translate-x-2 transition-transform duration-300" strokeWidth={3} />
                                    </span>
                                </button>

                                {/* Results - ULTRA PREMIUM */}
                                {roiData && (
                                    <div className="relative">
                                        {/* Glow effect */}
                                        <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-3xl blur-lg opacity-30"></div>

                                        <div className="relative bg-white/15 backdrop-blur-xl rounded-3xl p-6 sm:p-8 lg:p-10 border-2 border-white/30">
                                            <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6">
                                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 lg:p-6 border border-white/20 hover:scale-105 transition-transform duration-300">
                                                    <p className="text-blue-200 text-xs sm:text-sm lg:text-base font-semibold mb-2">System Cost</p>
                                                    <p className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black">₹{parseInt(roiData.systemCost).toLocaleString('en-IN')}</p>
                                                </div>
                                                <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-2xl p-4 sm:p-5 lg:p-6 border border-green-300/30 hover:scale-105 transition-transform duration-300">
                                                    <p className="text-green-200 text-xs sm:text-sm lg:text-base font-semibold mb-2">Annual Savings</p>
                                                    <p className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-green-300">₹{parseInt(roiData.annualSavings).toLocaleString('en-IN')}</p>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-6 border-t-2 border-white/20">
                                                <div className="bg-gradient-to-br from-yellow-500/20 to-amber-500/20 backdrop-blur-sm rounded-2xl p-4 sm:p-5 lg:p-6 border border-yellow-300/30 hover:scale-105 transition-transform duration-300">
                                                    <p className="text-yellow-200 text-xs sm:text-sm lg:text-base font-semibold mb-2">Payback Period</p>
                                                    <p className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-yellow-300">{roiData.paybackYears} <span className="text-xl sm:text-2xl">yrs</span></p>
                                                </div>
                                                <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-2xl p-4 sm:p-5 lg:p-6 border border-green-300/30 hover:scale-105 transition-transform duration-300">
                                                    <p className="text-green-200 text-xs sm:text-sm lg:text-base font-semibold mb-2">25-Year Savings</p>
                                                    <p className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-green-300">₹{parseInt(roiData.savings25Years).toLocaleString('en-IN')}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Free Site Visit CTA - Takes 2 columns */}
                    <div className="xl:col-span-2 relative overflow-hidden group">
                        {/* Gradient border wrapper */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 rounded-3xl sm:rounded-[2.5rem] opacity-75 group-hover:opacity-100 blur-lg transition-opacity duration-700"></div>

                        {/* Main card */}
                        <div className="relative h-full bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 rounded-3xl sm:rounded-[2.5rem] p-8 sm:p-10 lg:p-12 xl:p-14 shadow-2xl text-white flex flex-col justify-center">
                            {/* Decorative elements */}
                            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-300/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>

                            <div className="relative">
                                {/* Icon with mega glow */}
                                <div className="relative inline-block mb-6 sm:mb-8 lg:mb-10">
                                    <div className="absolute -inset-4 bg-yellow-300 blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-700"></div>
                                    <Sun className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 group-hover:rotate-90 transition-transform duration-700" strokeWidth={2.5} />
                                </div>

                                {/* Title */}
                                <h3 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-5 sm:mb-6 lg:mb-8 leading-tight">
                                    Ready to
                                    <span className="block mt-2">Go Solar?</span>
                                </h3>

                                {/* Description */}
                                <p className="text-amber-100 text-base sm:text-lg lg:text-xl xl:text-2xl mb-8 sm:mb-10 lg:mb-12 leading-relaxed font-medium">
                                    Get a <span className="font-bold text-white">free site visit</span> from our expert team. We'll assess your property and provide a customized solar solution.
                                </p>

                                {/* CTA Button - ULTRA PREMIUM */}
                                <a
                                    href="https://wa.me/918275001561?text=Hi, I need a free site visit for solar installation"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group/cta inline-flex items-center justify-center gap-3 sm:gap-4 w-full px-6 sm:px-8 py-5 sm:py-6 lg:py-7 bg-white text-orange-600 font-extrabold text-base sm:text-lg lg:text-xl rounded-2xl hover:bg-amber-50 transition-all duration-500 hover:scale-105 shadow-2xl relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-100 to-amber-100 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-500"></div>
                                    <MessageCircle className="relative w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 group-hover/cta:rotate-12 transition-transform duration-300" strokeWidth={3} />
                                    <span className="relative">Get Free Site Visit</span>
                                    <ArrowRight className="relative w-5 h-5 sm:w-6 sm:h-6 group-hover/cta:translate-x-2 transition-transform duration-300" strokeWidth={3} />
                                </a>

                                {/* Trust badges */}
                                <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 justify-center">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                                        <CheckCircle2 className="w-4 h-4" strokeWidth={2.5} />
                                        <span className="text-xs sm:text-sm font-bold">No Hidden Costs</span>
                                    </div>
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                                        <CheckCircle2 className="w-4 h-4" strokeWidth={2.5} />
                                        <span className="text-xs sm:text-sm font-bold">Expert Team</span>
                                    </div>
                                </div>
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

export default SolutionsSection;
