"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Droplets, Heart, ShieldCheck, ChevronDown, ArrowRight } from "lucide-react";

/* ─────────── DATA ─────────── */
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
    { src: "/images/hero.jpg", title: "Flawless Skin", category: "Bridal" },
    { src: "/images/portfolio1.png", title: "Soft Glam", category: "Social" },
    { src: "/images/portfolio2.png", title: "Glass Skin", category: "Editorial" },
];

/* ─────────── MAIN COMPONENT ─────────── */
export default function V2Esthetician() {
    const [openFAQ, setOpenFAQ] = useState<number | null>(0); // The first one open by default

    // Variants for smooth animations
    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    return (
        <div className="min-h-screen bg-[#FDFBF9] text-[#4A3C31] selection:bg-[#E8D4CC] selection:text-[#4A3C31] font-sans">

            {/* ──── NAVIGATION (Ultra Minimal) ──── */}
            <nav className="fixed top-0 w-full z-50 bg-[#FDFBF9]/80 backdrop-blur-md border-b border-[#E8D4CC]/30">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <Link href="/" className="text-[10px] uppercase tracking-[0.2em] hover:text-[#CBA592] transition-colors">
                        ← Proposals
                    </Link>
                    <div className="text-center">
                        <h2 className="font-serif text-xl tracking-widest text-[#2C2420]">Adriana</h2>
                    </div>
                    <button className="text-[10px] uppercase tracking-[0.2em] hover:text-[#CBA592] transition-colors">
                        Book
                    </button>
                </div>
            </nav>

            {/* ──── HERO SECTION (Airy & Clean) ──── */}
            <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 pt-20 overflow-hidden">
                {/* Soft Background Orbs */}
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#F5EBE6] rounded-full blur-[100px] -z-10" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#FAF0E6] rounded-full blur-[120px] -z-10" />

                <motion.div
                    initial="hidden" animate="visible" variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
                    }}
                    className="max-w-4xl mx-auto flex flex-col items-center"
                >
                    <motion.p variants={fadeUp} className="text-[#CBA592] text-[10px] uppercase tracking-[0.4em] mb-6 flex items-center gap-4">
                        <span className="w-12 h-[1px] bg-[#CBA592]/50" />
                        Licensed Esthetician & MUA
                        <span className="w-12 h-[1px] bg-[#CBA592]/50" />
                    </motion.p>

                    <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-8xl font-serif text-[#2C2420] leading-[1.1] tracking-tight mb-8">
                        Skin First. <br />
                        <span className="italic text-[#CBA592] font-light">Artistry Second.</span>
                    </motion.h1>

                    <motion.p variants={fadeUp} className="text-[#7A6B63] max-w-lg text-sm md:text-base leading-relaxed font-light mb-12">
                        Elevating your natural beauty through the science of skincare and the art of premium makeup. A clinical approach for flawless results.
                    </motion.p>

                    <motion.a
                        variants={fadeUp}
                        href="#book"
                        className="group flex items-center gap-4 bg-[#2C2420] text-[#FDFBF9] px-8 py-4 rounded-full text-[11px] uppercase tracking-[0.2em] hover:bg-[#CBA592] transition-colors duration-500"
                    >
                        Discover the Experience
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </motion.a>
                </motion.div>
            </section>

            {/* ──── BENTO GRID (The Esthetician Approach) ──── */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                        variants={fadeUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-serif text-[#2C2420]">The Clinical Standard</h2>
                    </motion.div>

                    {/* Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:auto-rows-[300px]">

                        {/* Card 1: Large Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                            className="md:col-span-2 relative rounded-3xl overflow-hidden group"
                        >
                            <Image src="/images/working.jpg" alt="Skin Prep" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#2C2420]/80 via-transparent to-transparent" />
                            <div className="absolute bottom-0 left-0 p-8">
                                <h3 className="text-[#FDFBF9] text-2xl font-serif mb-2">Skin Preparation</h3>
                                <p className="text-[#FDFBF9]/80 font-light text-sm max-w-md">Every session begins with deep hydration and a lymphatic massage for a perfect canvas.</p>
                            </div>
                        </motion.div>

                        {/* Card 2: License */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
                            className="bg-[#F5EBE6] rounded-3xl p-8 flex flex-col justify-between"
                        >
                            <ShieldCheck className="text-[#CBA592] w-8 h-8" />
                            <div>
                                <h4 className="font-serif text-xl mb-2 text-[#2C2420]">Licensed Esthetician</h4>
                                <p className="text-[#7A6B63] text-sm font-light leading-relaxed">Expert knowledge in facial anatomy, skin conditions, and the chemistry of cosmetic ingredients.</p>
                            </div>
                        </motion.div>

                        {/* Card 3: Experience */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-white rounded-3xl p-8 border border-[#E8D4CC]/30 flex flex-col justify-between items-center text-center"
                        >
                            <div className="w-16 h-16 rounded-full bg-[#FAF0E6] flex items-center justify-center mb-4">
                                <span className="text-2xl font-serif text-[#CBA592]">18</span>
                            </div>
                            <h4 className="font-serif text-xl mb-2 text-[#2C2420]">Years of Mastery</h4>
                            <p className="text-[#7A6B63] text-sm font-light">Perfecting the art of timeless and long-lasting beauty.</p>
                        </motion.div>

                        {/* Card 4: Products */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
                            className="md:col-span-2 bg-[#2C2420] rounded-3xl p-8 flex items-center gap-8 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#CBA592]/10 rounded-full blur-[60px]" />
                            <Droplets className="text-[#CBA592] w-12 h-12 flex-shrink-0" />
                            <div className="relative z-10">
                                <h4 className="font-serif text-2xl mb-2 text-[#FDFBF9]">Hygiene & Premium Products</h4>
                                <p className="text-[#FDFBF9]/60 text-sm font-light max-w-lg leading-relaxed">
                                    We exclusively use dermatologically tested, non-comedogenic brands and tools sterilized under medical standards.
                                </p>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* ──── MINIMALIST PORTFOLIO ──── */}
            <section className="py-32 bg-white px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <motion.h2 initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-serif text-[#2C2420]">
                            The Visual Signature
                        </motion.h2>
                        <motion.a initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} href="#" className="border-b border-[#CBA592] text-[#CBA592] pb-1 text-[11px] uppercase tracking-widest hover:text-[#2C2420] hover:border-[#2C2420] transition-colors">
                            View Full Gallery
                        </motion.a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {portfolioItems.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }}
                                className="group cursor-pointer"
                            >
                                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-4 bg-[#FAF0E6]">
                                    <Image src={item.src} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                                </div>
                                <p className="text-[10px] uppercase tracking-[0.2em] text-[#CBA592] mb-1">{item.category}</p>
                                <h3 className="font-serif text-xl text-[#2C2420] group-hover:italic transition-all">{item.title}</h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ──── FAQ (Clean Accordion) ──── */}
            <section className="py-32 px-6 max-w-3xl mx-auto">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif text-[#2C2420] mb-4">Philosophy & Care</h2>
                    <p className="text-[#7A6B63] font-light">Answers to your questions about the clinical and creative process.</p>
                </motion.div>

                <div className="space-y-2">
                    {faqData.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                            className="border-b border-[#E8D4CC]/50"
                        >
                            <button
                                onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                                className="w-full py-6 flex justify-between items-center text-left group"
                            >
                                <span className={`font-serif text-lg transition-colors ${openFAQ === i ? "text-[#CBA592] italic" : "text-[#2C2420] group-hover:text-[#CBA592]"}`}>
                                    {item.q}
                                </span>
                                <ChevronDown className={`text-[#CBA592] transition-transform duration-500 ${openFAQ === i ? "rotate-180" : ""}`} size={20} />
                            </button>

                            <AnimatePresence>
                                {openFAQ === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <p className="pb-8 text-[#7A6B63] font-light leading-relaxed text-sm md:text-base pr-8">
                                            {item.a}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ──── CTA & FOOTER ──── */}
            <section className="bg-[#2C2420] text-[#FDFBF9] py-32 px-6 rounded-t-[3rem] relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#CBA592]/20 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <Heart className="w-8 h-8 text-[#CBA592] mx-auto mb-8 opacity-50" />
                    <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">
                        Your face deserves the care <br /> of an <span className="italic text-[#CBA592]">expert.</span>
                    </h2>
                    <button className="bg-[#FDFBF9] text-[#2C2420] px-10 py-4 rounded-full text-[11px] uppercase tracking-[0.2em] font-bold hover:scale-105 transition-transform duration-300">
                        Book Consultation
                    </button>
                </div>

                <footer className="mt-32 pt-8 border-t border-[#FDFBF9]/10 text-center flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-[#FDFBF9]/40 max-w-7xl mx-auto">
                    <p>© 2026 Adriana Nestora</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-[#CBA592]">Instagram</a>
                        <a href="#" className="hover:text-[#CBA592]">Tiktok</a>
                    </div>
                    <p>Proposal V2 — Clinical Luxury</p>
                </footer>
            </section>
        </div>
    );
}