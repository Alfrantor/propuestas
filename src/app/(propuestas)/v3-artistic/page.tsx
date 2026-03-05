"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

/* ─────────── Intersection Observer Hook ─────────── */
function useInView(threshold = 0.15) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [threshold]);

    return { ref, isVisible };
}

/* ─────────── FAQ Data ─────────── */
const faqData = [
    {
        q: "Do you travel to me?",
        a: "Yes! A makeup artistry application is performed at the location of your choice. I will come fully prepared with a chair and lighting in order to create the ideal set-up for the application. For The Makeup Edit, I always suggest doing it in the comfort of your own home. It's important for me to see you in your element, see your makeup drawer, and take into account the lighting in the space where you apply makeup.",
    },
    {
        q: "What brands of makeup do you use?",
        a: "In my makeup artistry kit, I carry the following brands, but not limited to Armani Beauty, Cle de Peau, Charlotte Tilbury, Dior, Hourglass, Jouer, MAC cosmetics, NARS, Sisley, Tom Ford, YSL. As new products come to market, I'm constantly on the hunt to find the best products that align with my style and my clients' needs.",
    },
    {
        q: "How much time do you take on a makeup artistry application?",
        a: "A makeup artistry application is usually 1-1.5 hours depending on the style and look we are trying to achieve.",
    },
    {
        q: "How do I make an appointment with you?",
        a: "At the moment, an email or a DM on Instagram is the easiest way to get in contact with me. A scheduling system through my website will be available soon to make it even easier to book your appointments.",
    },
    {
        q: "Are makeup lessons included with The Makeup Edit?",
        a: "Absolutely! Nothing makes me more excited than to fully equip my clients with the tools and skills to be able to execute looks on their own. The Makeup Edit is truly a passion project that I'm so lucky to call my job. This concept was born from the gap found between a makeup counter sales associate and a makeup artist. No more buying beauty products recommended from an influencer or from a sales associate that knows very little about your skill level, personal style or skin type. I'm a believer that conscious shopping is what we crave after years of being in the era of fast fashion that infiltrated into the beauty industry. Know that I will find a routine that you absolutely love and feel most beautiful in.",
    },
];

const portfolioItems = [
    { src: "/images/hero.jpg", title: "NEON BRIDE", category: "Bridal" },
    { src: "/images/portfolio1.png", title: "DARK GLAM", category: "Editorial" },
    { src: "/images/portfolio2.png", title: "SOFT GLOW", category: "Beauty" },
    { src: "/images/working.jpg", title: "THE PROCESS", category: "BTS" },
    { src: "/images/portfolio3.png", title: "ART FUSION", category: "Creative" },
    { src: "/images/artist.jpg", title: "THE ARTIST", category: "Portrait" },
];

/* ─────────── Animated Gradient Text ─────────── */
function GlitchText({ text, className = "" }: { text: string; className?: string }) {
    return (
        <span className={`relative inline-block ${className}`}>
            <span className="relative z-10">{text}</span>
            <span
                className="absolute top-0 left-0 text-[#ff007f] opacity-70 z-0"
                style={{ clipPath: "inset(10% 0 60% 0)", transform: "translate(-2px, 2px)" }}
                aria-hidden
            >
                {text}
            </span>
            <span
                className="absolute top-0 left-0 text-[#00e5ff] opacity-70 z-0"
                style={{ clipPath: "inset(50% 0 20% 0)", transform: "translate(2px, -1px)" }}
                aria-hidden
            >
                {text}
            </span>
        </span>
    );
}

/* ─────────── Particle Background ─────────── */
function ParticleField() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles: { x: number; y: number; vx: number; vy: number; size: number; color: string; alpha: number }[] = [];

        for (let i = 0; i < 60; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 0.5,
                color: ["#ff007f", "#7b2ff7", "#00e5ff"][Math.floor(Math.random() * 3)],
                alpha: Math.random() * 0.5 + 0.1,
            });
        }

        let animId: number;
        function draw() {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p) => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.alpha;
                ctx.fill();

                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
            });

            ctx.globalAlpha = 1;
            animId = requestAnimationFrame(draw);
        }

        draw();
        return () => cancelAnimationFrame(animId);
    }, []);

    useEffect(() => {
        const cleanup = animate();
        const handleResize = () => animate();
        window.addEventListener("resize", handleResize);
        return () => {
            cleanup?.();
            window.removeEventListener("resize", handleResize);
        };
    }, [animate]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ opacity: 0.6 }}
        />
    );
}

/* ─────────── MAIN PAGE ─────────── */
export default function V3Artistic() {
    const [openFAQ, setOpenFAQ] = useState<number | null>(null);
    const [scrollY, setScrollY] = useState(0);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const heroSection = useInView(0.1);
    const aboutSection = useInView(0.15);
    const processSection = useInView(0.1);
    const portfolioSection = useInView(0.1);
    const faqSection = useInView(0.15);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        const handleMouse = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("mousemove", handleMouse);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("mousemove", handleMouse);
        };
    }, []);

    return (
        <div className="min-h-screen bg-[#0a0014] text-white font-[family-name:var(--font-outfit)] overflow-hidden">
            <ParticleField />

            {/* Mouse follow gradient */}
            <div
                className="fixed pointer-events-none z-[1] w-[400px] h-[400px] rounded-full blur-[120px] opacity-20"
                style={{
                    left: mousePos.x - 200,
                    top: mousePos.y - 200,
                    background: "radial-gradient(circle, #ff007f 0%, #7b2ff7 50%, transparent 70%)",
                }}
            />

            {/* ──── NAVIGATION ──── */}
            <nav className="fixed top-0 left-0 right-0 z-50">
                <div
                    className={`transition-all duration-500 ${scrollY > 80 ? "bg-[#0a0014]/80 backdrop-blur-xl border-b border-[#ff007f]/10" : ""}`}
                >
                    <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
                        <Link
                            href="/"
                            className="text-white/30 hover:text-[#ff007f] transition-colors duration-300 text-xs tracking-[0.2em] uppercase"
                        >
                            ← Proposals
                        </Link>
                        <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold tracking-[0.3em] uppercase">
                            <span className="bg-gradient-to-r from-[#ff007f] via-[#7b2ff7] to-[#00e5ff] bg-clip-text text-transparent">
                                ADRIANA
                            </span>
                        </h2>
                        <div className="hidden md:flex gap-8 text-xs tracking-[0.15em] uppercase text-white/30">
                            <a href="#about" className="hover:text-[#ff007f] transition-colors duration-300">About</a>
                            <a href="#process" className="hover:text-[#7b2ff7] transition-colors duration-300">Process</a>
                            <a href="#portfolio" className="hover:text-[#00e5ff] transition-colors duration-300">Work</a>
                            <a href="#faq" className="hover:text-[#ff007f] transition-colors duration-300">FAQ</a>
                        </div>
                    </div>
                </div>
            </nav>

            {/* ──── HERO SECTION ──── */}
            <section
                ref={heroSection.ref}
                className="relative min-h-screen flex items-center justify-center"
            >
                {/* Background image with overlay */}
                <div className="absolute inset-0" style={{ transform: `translateY(${scrollY * 0.2}px)` }}>
                    <Image
                        src="/images/portfolio3.png"
                        alt="Creative makeup"
                        fill
                        className="object-cover opacity-30"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0a0014] via-[#0a0014]/50 to-[#0a0014]" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#0a0014_70%)]" />
                </div>

                {/* Neon lines decoration */}
                <div className="absolute left-0 top-1/3 w-full h-px bg-gradient-to-r from-transparent via-[#ff007f]/20 to-transparent" />
                <div className="absolute left-0 top-2/3 w-full h-px bg-gradient-to-r from-transparent via-[#00e5ff]/20 to-transparent" />

                {/* Hero Content */}
                <div className="relative z-10 text-center px-6 max-w-5xl">
                    <div className={`transition-all duration-1000 ${heroSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                        <p className="text-[#ff007f] text-xs tracking-[0.6em] uppercase mb-8 font-mono">
                            {"// MAKEUP ARTISTRY"}
                        </p>
                    </div>

                    <div className={`transition-all duration-1000 delay-200 ${heroSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black leading-[0.85] mb-8 tracking-tight">
                            <GlitchText
                                text="ADRIANA"
                                className="bg-gradient-to-r from-[#ff007f] via-[#7b2ff7] to-[#00e5ff] bg-clip-text text-transparent"
                            />
                        </h1>
                    </div>

                    <div className={`transition-all duration-1000 delay-400 ${heroSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                        <p className="text-white/40 text-lg md:text-xl max-w-xl mx-auto mb-12 font-light">
                            I don't just do makeup{" "}
                            <span className="text-[#ff007f]">—</span> I create art on your
                            face. Every look is a bold statement of beauty.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <a
                                href="#portfolio"
                                className="group relative px-8 py-4 text-sm tracking-[0.2em] uppercase overflow-hidden"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-[#ff007f] to-[#7b2ff7] transition-all duration-500" />
                                <span className="absolute inset-0 bg-gradient-to-r from-[#7b2ff7] to-[#00e5ff] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <span className="relative z-10">See My Art</span>
                            </a>
                            <a
                                href="#about"
                                className="px-8 py-4 border border-[#ff007f]/30 text-[#ff007f] text-sm tracking-[0.2em] uppercase hover:bg-[#ff007f]/10 hover:border-[#ff007f]/60 transition-all duration-500"
                            >
                                My Story
                            </a>
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-white/20">Scroll</span>
                    <div className="w-px h-12 bg-gradient-to-b from-[#ff007f] to-transparent animate-pulse" />
                </div>
            </section>

            {/* ──── ABOUT SECTION ──── */}
            <section id="about" className="py-32 px-6 md:px-12 relative" ref={aboutSection.ref}>
                {/* Neon accent line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7b2ff7]/30 to-transparent" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        {/* Image with neon border */}
                        <div className={`transition-all duration-1000 ${aboutSection.isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>
                            <div className="relative group">
                                {/* Neon glow behind image */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-[#ff007f] via-[#7b2ff7] to-[#00e5ff] rounded-lg opacity-50 blur-sm group-hover:opacity-75 transition-opacity duration-500" />
                                <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                                    <Image
                                        src="/images/artist.jpg"
                                        alt="Adriana - Makeup Artist"
                                        fill
                                        className="object-cover"
                                    />
                                    {/* Scan line effect */}
                                    <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />
                                </div>
                            </div>
                        </div>

                        {/* Text */}
                        <div className={`transition-all duration-1000 delay-300 ${aboutSection.isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>
                            <p className="text-[#ff007f] text-xs tracking-[0.5em] uppercase mb-6 font-mono">
                                {"// ABOUT ME"}
                            </p>
                            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
                                Art without
                                <br />
                                <span className="bg-gradient-to-r from-[#ff007f] via-[#7b2ff7] to-[#00e5ff] bg-clip-text text-transparent">
                                    boundaries
                                </span>
                            </h2>
                            <div className="space-y-4 text-white/40 leading-relaxed font-light">
                                <p>
                                    18 years breaking rules in the beauty industry. I don't follow trends—I create them. Every face is a blank canvas waiting for a story that only I can tell.
                                </p>
                                <p>
                                    From high fashion editorials to dream weddings, my approach is unique: I combine flawless technique with artistic vision to create looks that defy the conventional.
                                </p>
                            </div>

                            {/* Stats with neon styling */}
                            <div className="grid grid-cols-3 gap-6 mt-12">
                                {[
                                    { number: "500+", label: "Clients", color: "#ff007f" },
                                    { number: "18+", label: "Years", color: "#7b2ff7" },
                                    { number: "50+", label: "Editorials", color: "#00e5ff" },
                                ].map((stat) => (
                                    <div
                                        key={stat.label}
                                        className="text-center p-4 border border-white/5 rounded-lg hover:border-white/10 transition-all duration-300 group"
                                    >
                                        <p
                                            className="text-3xl font-black mb-1"
                                            style={{ color: stat.color }}
                                        >
                                            {stat.number}
                                        </p>
                                        <p className="text-[10px] tracking-[0.3em] uppercase text-white/30">
                                            {stat.label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ──── PROCESS SECTION (Timeline style) ──── */}
            <section
                id="process"
                className="py-32 px-6 md:px-12 relative"
                ref={processSection.ref}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0014] via-[#0d001a] to-[#0a0014]" />

                <div className="max-w-5xl mx-auto relative z-10">
                    {/* Header */}
                    <div className={`text-center mb-20 transition-all duration-1000 ${processSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                        <p className="text-[#7b2ff7] text-xs tracking-[0.5em] uppercase mb-6 font-mono">
                            {"// WORKFLOW"}
                        </p>
                        <h2 className="text-4xl md:text-5xl font-black">
                            My{" "}
                            <span className="bg-gradient-to-r from-[#7b2ff7] to-[#00e5ff] bg-clip-text text-transparent">
                                process
                            </span>
                        </h2>
                    </div>

                    {/* Timeline */}
                    <div className="relative">
                        {/* Vertical neon line */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#ff007f] via-[#7b2ff7] to-[#00e5ff] hidden md:block" />

                        {[
                            {
                                step: "01",
                                title: "CONSULTATION",
                                desc: "We discuss your vision. We analyze references, your style, and the event to design a look that represents you 100%.",
                                color: "#ff007f",
                            },
                            {
                                step: "02",
                                title: "PREP & PRIME",
                                desc: "Your skin is the foundation of everything. I prep it with premium skincare rituals for a perfect canvas.",
                                color: "#c94fff",
                            },
                            {
                                step: "03",
                                title: "CREATION",
                                desc: "With surgical precision and artistic vision, every stroke builds the masterpiece you deserve.",
                                color: "#7b2ff7",
                            },
                            {
                                step: "04",
                                title: "SLAY",
                                desc: "Professional setting, microscopic touch-ups, and you're ready to conquer. Guaranteed lasting wear of 12-16 hours.",
                                color: "#00e5ff",
                            },
                        ].map((item, i) => (
                            <div
                                key={item.step}
                                className={`relative flex flex-col md:flex-row items-center gap-8 mb-16 last:mb-0 transition-all duration-700 ${processSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                                style={{
                                    transitionDelay: processSection.isVisible ? `${i * 200}ms` : "0ms",
                                    flexDirection: i % 2 === 0 ? "row" : "row-reverse",
                                }}
                            >
                                {/* Content */}
                                <div className={`flex-1 ${i % 2 === 0 ? "text-right pr-12" : "text-left pl-12"} hidden md:block`}>
                                    <h3 className="text-2xl font-black mb-2" style={{ color: item.color }}>
                                        {item.title}
                                    </h3>
                                    <p className="text-white/40 text-sm leading-relaxed font-light max-w-sm inline-block">
                                        {item.desc}
                                    </p>
                                </div>

                                {/* Node */}
                                <div
                                    className="w-14 h-14 rounded-full flex items-center justify-center z-10 text-sm font-bold border-2 bg-[#0a0014] flex-shrink-0"
                                    style={{
                                        borderColor: item.color,
                                        boxShadow: `0 0 20px ${item.color}40, 0 0 40px ${item.color}20`,
                                        color: item.color,
                                    }}
                                >
                                    {item.step}
                                </div>

                                {/* Spacer for desktop */}
                                <div className="flex-1 hidden md:block" />

                                {/* Mobile content */}
                                <div className="md:hidden text-center">
                                    <h3 className="text-xl font-black mb-2" style={{ color: item.color }}>
                                        {item.title}
                                    </h3>
                                    <p className="text-white/40 text-sm leading-relaxed font-light">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ──── PORTFOLIO SECTION ──── */}
            <section
                id="portfolio"
                className="py-32 px-6 md:px-12 relative"
                ref={portfolioSection.ref}
            >
                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Header */}
                    <div className={`text-center mb-20 transition-all duration-1000 ${portfolioSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                        <p className="text-[#00e5ff] text-xs tracking-[0.5em] uppercase mb-6 font-mono">
                            {"// PORTFOLIO"}
                        </p>
                        <h2 className="text-4xl md:text-5xl font-black">
                            My{" "}
                            <span className="bg-gradient-to-r from-[#ff007f] to-[#00e5ff] bg-clip-text text-transparent">
                                work
                            </span>
                        </h2>
                    </div>

                    {/* Grid with hover reveal */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {portfolioItems.map((item, i) => (
                            <div
                                key={i}
                                className={`group relative overflow-hidden aspect-[4/5] cursor-pointer transition-all duration-700 ${portfolioSection.isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
                                style={{
                                    transitionDelay: portfolioSection.isVisible ? `${i * 100}ms` : "0ms",
                                }}
                            >
                                <Image
                                    src={item.src}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-50"
                                />

                                {/* Neon border on hover */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{
                                        boxShadow: `inset 0 0 30px ${["#ff007f", "#7b2ff7", "#00e5ff"][i % 3]}40`,
                                    }}
                                />

                                {/* Content overlay */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                                    <span
                                        className="text-xs tracking-[0.4em] uppercase mb-2"
                                        style={{ color: ["#ff007f", "#7b2ff7", "#00e5ff"][i % 3] }}
                                    >
                                        {item.category}
                                    </span>
                                    <h3 className="text-2xl font-black tracking-wider">
                                        {item.title}
                                    </h3>
                                    <div
                                        className="w-12 h-0.5 mt-3"
                                        style={{
                                            background: `linear-gradient(to right, ${["#ff007f", "#7b2ff7", "#00e5ff"][i % 3]}, transparent)`,
                                        }}
                                    />
                                </div>

                                {/* Scan lines */}
                                <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,rgba(0,0,0,0.05)_1px,rgba(0,0,0,0.05)_2px)] pointer-events-none" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ──── FAQ SECTION ──── */}
            <section
                id="faq"
                className="py-32 px-6 md:px-12 relative"
                ref={faqSection.ref}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0014] via-[#0d001a] to-[#0a0014]" />

                <div className="max-w-3xl mx-auto relative z-10">
                    <div className={`text-center mb-16 transition-all duration-1000 ${faqSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                        <p className="text-[#ff007f] text-xs tracking-[0.5em] uppercase mb-6 font-mono">
                            {"// FAQ"}
                        </p>
                        <h2 className="text-4xl md:text-5xl font-black">
                            Frequently Asked{" "}
                            <span className="bg-gradient-to-r from-[#ff007f] to-[#7b2ff7] bg-clip-text text-transparent">
                                Questions
                            </span>
                        </h2>
                    </div>

                    <div className={`space-y-2 transition-all duration-1000 delay-300 ${faqSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                        {faqData.map((item, i) => (
                            <div
                                key={i}
                                className={`border border-white/5 overflow-hidden transition-all duration-500 ${openFAQ === i ? "border-[#ff007f]/20 bg-[#ff007f]/5" : "hover:border-white/10"}`}
                            >
                                <button
                                    onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                                    className="w-full p-6 flex items-center justify-between text-left cursor-pointer"
                                >
                                    <div className="flex items-center gap-4 pr-4">
                                        <span
                                            className="text-xs font-mono flex-shrink-0"
                                            style={{ color: ["#ff007f", "#c94fff", "#7b2ff7", "#3db8ff", "#00e5ff"][i] }}
                                        >
                                            0{i + 1}
                                        </span>
                                        <span className="text-base font-semibold text-white/80">
                                            {item.q}
                                        </span>
                                    </div>
                                    <span
                                        className={`text-[#ff007f] text-xl transition-transform duration-500 flex-shrink-0 font-mono ${openFAQ === i ? "rotate-45" : ""}`}
                                    >
                                        +
                                    </span>
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-500 ease-in-out ${openFAQ === i ? "max-h-full pb-6" : "max-h-0"}`}
                                >
                                    <p className="px-6 pl-16 text-white/40 text-sm leading-relaxed font-light">
                                        {item.a}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ──── CTA / FOOTER ──── */}
            <section className="py-32 px-6 md:px-12 text-center relative overflow-hidden">
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#ff007f]/10 via-[#7b2ff7]/10 to-[#00e5ff]/10 animate-gradient" />
                <div className="absolute inset-0 bg-[#0a0014]/80" />

                {/* Neon lines */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ff007f]/40 to-transparent" />

                <div className="relative z-10 max-w-2xl mx-auto">
                    <p className="text-[#ff007f] text-xs tracking-[0.5em] uppercase mb-8 font-mono">
                        {"// LET'S CREATE"}
                    </p>
                    <h2 className="text-4xl md:text-7xl font-black mb-6 leading-tight">
                        READY TO
                        <br />
                        <span className="bg-gradient-to-r from-[#ff007f] via-[#7b2ff7] to-[#00e5ff] bg-clip-text text-transparent">
                            SHINE?
                        </span>
                    </h2>
                    <p className="text-white/40 mb-12 max-w-md mx-auto font-light">
                        Every look is a story. Let's write yours together.
                    </p>

                    <a
                        href="#"
                        className="group relative inline-flex items-center gap-3 px-10 py-5 text-sm tracking-[0.2em] uppercase font-bold overflow-hidden"
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-[#ff007f] via-[#7b2ff7] to-[#00e5ff] animate-gradient" />
                        <span className="absolute inset-[2px] bg-[#0a0014] transition-all duration-300 group-hover:bg-transparent" />
                        <span className="relative z-10 group-hover:text-white transition-colors duration-300 bg-gradient-to-r from-[#ff007f] to-[#00e5ff] bg-clip-text text-transparent group-hover:bg-none">
                            Contact Now
                        </span>
                    </a>

                    {/* Social */}
                    <div className="flex justify-center gap-8 mt-16">
                        {[
                            { name: "Instagram", color: "#ff007f" },

                        ].map((social) => (
                            <a
                                key={social.name}
                                href="#"
                                className="text-white/30 text-xs tracking-[0.2em] uppercase transition-colors duration-300 hover:drop-shadow-[0_0_8px_currentColor]"
                                style={{ ["--tw-drop-shadow-color" as string]: social.color }}
                                onMouseEnter={(e) => {
                                    (e.target as HTMLElement).style.color = social.color;
                                }}
                                onMouseLeave={(e) => {
                                    (e.target as HTMLElement).style.color = "";
                                }}
                            >
                                {social.name}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="relative z-10 mt-20 pt-8 border-t border-white/5 text-white/20 text-xs font-mono">
                    <p>© 2026 ADRIANA MAKEUP ARTIST // ALL RIGHTS RESERVED</p>
                    <p className="mt-2 text-[#ff007f]/30">PROPOSAL V3 — ARTISTIC</p>
                </div>
            </section>
        </div>
    );
}