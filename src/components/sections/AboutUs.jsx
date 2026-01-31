import { useRef, useLayoutEffect } from 'react';
import { Building2, Factory, Award, Users, ShieldCheck, Briefcase } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * AboutUs Section Component
 * Company history, services, and infrastructure
 */
const AboutUs = () => {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const contentRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Header animation
            gsap.fromTo(
                headerRef.current?.querySelectorAll('.header-item'),
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );

            // Content sections stagger animation
            const sections = contentRef.current?.querySelectorAll('.about-section');
            if (sections?.length) {
                gsap.fromTo(
                    sections,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: contentRef.current,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="about"
            className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white to-gray-50"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div ref={headerRef} className="text-center mb-10 sm:mb-12 lg:mb-16">
                    <span className="header-item text-blue-600 font-bold tracking-widest uppercase text-[10px] sm:text-xs mb-1 sm:mb-2 block">
                        About Us
                    </span>
                    <h2 className="header-item text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-1 sm:mt-2 font-sans tracking-tight text-gray-900">
                        Our Legacy & Commitment
                    </h2>
                </div>

                {/* Content */}
                <div ref={contentRef} className="space-y-8 sm:space-y-10 lg:space-y-12">
                    {/* Legacy Statement */}
                    <div className="about-section bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg border border-gray-100">
                        <div className="flex items-start gap-4 sm:gap-6">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-blue-100 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                                <Building2 className="text-blue-600 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                            </div>
                            <div>
                                <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
                                    Established in <span className="font-bold text-blue-600">1994</span>, Sigma Sales & Services has grown to become a leading manufacturer and service provider in the field of electrical power conditioning equipment in South Maharashtra. We are an{' '}
                                    <span className="font-bold text-blue-600">ISO 9001:2015 Certified Company</span> committed to delivering high-quality energy solutions. Under the leadership of our Proprietor,{' '}
                                    <span className="font-bold">Mr. Dhanajirao Ekal</span>, we strive to provide reliable power backup and solar solutions to a diverse range of clients.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* What We Do */}
                    <div className="about-section">
                        <div className="flex items-center gap-3 mb-6">
                            <Briefcase className="text-blue-600 w-7 h-7 sm:w-8 sm:h-8" />
                            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                                What We Do
                            </h3>
                        </div>
                        <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-6 leading-relaxed">
                            We specialize in both manufacturing and distribution, ensuring a complete range of power solutions for our customers:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-blue-200">
                                <Factory className="text-blue-600 w-8 h-8 sm:w-10 sm:h-10 mb-3 sm:mb-4" />
                                <h4 className="font-bold text-base sm:text-lg text-gray-900 mb-2">Manufacturing</h4>
                                <p className="text-sm sm:text-base text-gray-700">
                                    We produce high-quality Inverters and Batteries.
                                </p>
                            </div>
                            <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-green-200">
                                <ShieldCheck className="text-green-600 w-8 h-8 sm:w-10 sm:h-10 mb-3 sm:mb-4" />
                                <h4 className="font-bold text-base sm:text-lg text-gray-900 mb-2">Authorized Distribution</h4>
                                <p className="text-sm sm:text-base text-gray-700">
                                    Authorized distributors for Novasys, Swastik, Microtek, Luminous, APC, Exide, and Amaron.
                                </p>
                            </div>
                            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100/50 rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-yellow-200">
                                <Award className="text-yellow-600 w-8 h-8 sm:w-10 sm:h-10 mb-3 sm:mb-4" />
                                <h4 className="font-bold text-base sm:text-lg text-gray-900 mb-2">Solar & Power Solutions</h4>
                                <p className="text-sm sm:text-base text-gray-700">
                                    Online & Offline UPS, Lift UPS, Servo Stabilizers, Solar UPS, Solar Roof Top Systems, and Solar Water Heating Systems.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Infrastructure & Quality */}
                    <div className="about-section">
                        <div className="flex items-center gap-3 mb-6">
                            <Building2 className="text-blue-600 w-7 h-7 sm:w-8 sm:h-8" />
                            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                                Infrastructure & Quality
                            </h3>
                        </div>
                        <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-6 leading-relaxed">
                            Our operations are backed by robust infrastructure designed for quality and efficiency:
                        </p>
                        <div className="space-y-4 sm:space-y-5">
                            <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                                <h4 className="font-bold text-base sm:text-lg text-gray-900 mb-2">
                                    🏢 Head Office
                                </h4>
                                <p className="text-sm sm:text-base text-gray-700">
                                    Located at Shahupuri, 6th Lane, Kolhapur.
                                </p>
                            </div>
                            <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                                <h4 className="font-bold text-base sm:text-lg text-gray-900 mb-2">
                                    🏭 Manufacturing Plant
                                </h4>
                                <p className="text-sm sm:text-base text-gray-700">
                                    Our factory is situated at Plot No. A-248, Five Star M.I.D.C, Kagal. The plant is fully equipped with modern machinery and automation to enforce our strict commitment to quality.
                                </p>
                            </div>
                            <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                                <h4 className="font-bold text-base sm:text-lg text-gray-900 mb-2">
                                    ✓ Certifications
                                </h4>
                                <p className="text-sm sm:text-base text-gray-700">
                                    We are registered with the Ministry of New & Renewable Energy Sources (MNRE), New Delhi, and the Maharashtra Energy Development Agency (MEDA).
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Our Clientele */}
                    <div className="about-section bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 text-white shadow-xl">
                        <div className="flex items-start gap-4 sm:gap-6">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                                <Users className="text-white w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                            </div>
                            <div>
                                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">
                                    Our Clientele
                                </h3>
                                <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-blue-50">
                                    With a strong expert technical team, we provide services throughout the region. Our satisfied client base includes hospitals, government and semi-government corporations, sugar factories, educational institutions, banks, shops, and end-users.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
