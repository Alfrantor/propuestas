"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Instagram, Mail, MessageCircle } from "lucide-react";

/* ─────────── CUSTOM CURSOR COMPONENT ─────────── */
const CustomCursor = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
        const handleHover = () => setIsHovered(true);
        const handleUnhover = () => setIsHovered(false);

        window.addEventListener("mousemove", handleMouseMove);
        document.querySelectorAll("a, button, .interactive").forEach(el => {
            el.addEventListener("mouseenter", handleHover);
            el.addEventListener("mouseleave", handleUnhover);
        });

        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#c9a96e] pointer-events-none z-[9999] hidden md:block"
            animate={{
                x: mousePos.x - 16,
                y: mousePos.y - 16,
                scale: isHovered ? 2.5 : 1,
                backgroundColor: isHovered ? "rgba(201, 169, 110, 0.1)" : "transparent",
            }}
            transition={{ type: "spring", stiffness: 150, damping: 20, mass: 0.5 }}
        />
    );
};

/* ─────────── DATA ─────────── */
const services = [
    { id: "01", title: "The Makeup Edit", category: "Personalized Consulting" },
    { id: "02", title: "Editorial Artistry", category: "Fashion & Media" },
    { id: "03", title: "Bridal Signature", category: "Luxury Weddings" },
];

export default function V1Editorial() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef });
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    // Parallax for huge text
    const textX = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

    return (
        <div ref={containerRef} className="bg-[#0a0a0a] text-white selection:bg-[#c9a96e] selection:text-black overflow-hidden">
            <CustomCursor />

            {/* ──── PROGRESS BAR ──── */}
            <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-[#c9a96e] origin-left z-[100]" style={{ scaleX }} />

            {/* ──── NAV ──── */}
            <nav className="fixed top-0 w-full p-8 flex justify-between items-center z-50 mix-blend-difference">
                <motion.h2
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="font-serif text-2xl tracking-tighter uppercase font-bold"
                >
                    AN <span className="text-[#c9a96e]">.</span>
                </motion.h2>
                <div className="flex gap-10 text-[10px] uppercase tracking-[0.3em] font-light">
                    {["Work", "About", "Contact"].map((item) => (
                        <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[#c9a96e] transition-colors">{item}</a>
                    ))}
                </div>
            </nav>

            {/* ──── HERO: THE VOGUE LOOK ──── */}
            <section className="relative h-screen flex flex-col justify-center px-6 md:px-20 overflow-hidden">
                <div className="absolute top-0 right-0 w-full md:w-1/2 h-full grayscale opacity-60">
                    <Image
                        src="/images/hero.jpg" // Asegúrate de tener esta ruta
                        alt="Editorial model"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                <div className="relative z-10">
                    <motion.p
                        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                        className="text-[#c9a96e] uppercase tracking-[0.6em] text-xs mb-4"
                    >
                        Dallas, Texas — Based
                    </motion.p>
                    <motion.h1
                        initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[12vw] leading-[0.85] font-serif italic font-bold tracking-tighter"
                    >
                        Adriana <br />
                        <span className="ml-[10vw]">Nestora</span>
                    </motion.h1>

                    <div className="mt-12 max-w-md">
                        <p className="text-white/50 text-sm leading-relaxed font-light tracking-wide italic">
                            "Licensed Esthetician and Makeup Artist. 18 years of creating confidence through clean, elevated aesthetics."
                        </p>
                    </div>
                </div>

                {/* Huge background text moving on scroll */}
                <motion.div
                    style={{ x: textX }}
                    className="absolute -bottom-10 left-0 whitespace-nowrap text-[25vw] font-bold text-white/[0.02] pointer-events-none uppercase"
                >
                    Sophisticated Elevated Clean
                </motion.div>
            </section>

            {/* ──── SERVICES: THE EDITORIAL LIST ──── */}
            <section className="py-40 px-6 md:px-20 border-t border-white/10">
                <div className="flex justify-between items-end mb-20">
                    <h3 className="text-5xl font-serif italic">Services</h3>
                    <p className="text-white/30 text-xs uppercase tracking-widest max-w-[200px]">
                        Tailored beauty solutions for your lifestyle.
                    </p>
                </div>

                <div className="space-y-0">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="group border-b border-white/10 py-12 flex flex-col md:flex-row md:items-center justify-between interactive cursor-pointer hover:px-8 transition-all duration-500"
                        >
                            <div className="flex items-center gap-10">
                                <span className="text-[#c9a96e] font-serif italic text-xl">{service.id}</span>
                                <h4 className="text-4xl md:text-6xl font-serif tracking-tight group-hover:italic transition-all">
                                    {service.title}
                                </h4>
                            </div>
                            <div className="flex items-center gap-4 mt-4 md:mt-0 opacity-40 group-hover:opacity-100 transition-opacity">
                                <span className="text-xs uppercase tracking-widest">{service.category}</span>
                                <ArrowUpRight size={20} className="text-[#c9a96e]" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ──── THE "ABOUT" REVEAL ──── */}
            <section className="py-40 bg-white text-black h-screen flex items-center relative overflow-hidden">
                <div className="container mx-auto px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-20">
                    <div className="relative aspect-[3/4] w-full max-w-sm mx-auto">
                        <Image
                            src="/images/artist.jpg"
                            alt="Adriana"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex flex-col justify-center">
                        <h2 className="text-6xl font-serif leading-tight mb-8 tracking-tighter">
                            18 Years of <br /> <span className="italic text-[#c9a96e]">Passion & Craft</span>
                        </h2>
                        <p className="text-black/60 font-light leading-loose text-lg mb-10">
                            I’m here to fuel my passion as a makeup artist and beauty educator.
                            My signature style is characterized by clean, elevated looks that enhance your natural beauty.
                        </p>
                        <button className="self-start border-b-2 border-black pb-2 uppercase text-xs tracking-[0.4em] font-bold hover:text-[#c9a96e] transition-colors">
                            Read the story
                        </button>
                    </div>
                </div>
            </section>

            {/* ──── FINAL CTA ──── */}
            <section className="py-60 text-center relative">
                <motion.div
                    whileInView={{ scale: [0.9, 1], opacity: [0, 1] }}
                    className="relative z-10"
                >
                    <h2 className="text-7xl md:text-[10vw] font-serif italic tracking-tighter leading-none mb-10">
                        Let's create <br /> together.
                    </h2>
                    <div className="flex justify-center gap-10 mt-10">
                        {[
                            { icon: <Instagram size={20} />, label: "Instagram" },
                            { icon: <Mail size={20} />, label: "Email" }
                        ].map((social) => (
                            <a
                                key={social.label}
                                href="#"
                                className="flex items-center gap-2 text-white/40 hover:text-[#c9a96e] transition-colors uppercase text-[10px] tracking-widest"
                            >
                                {social.icon} {social.label}
                            </a>
                        ))}
                    </div>
                </motion.div>
            </section>

            <footer className="p-10 border-t border-white/5 text-center text-[10px] text-white/20 uppercase tracking-[0.5em]">
                © 2026 Adriana Nestora — Clean & Elevated Artistry
            </footer>
        </div>
    );
}