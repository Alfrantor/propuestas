"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const proposals = [
  {
    id: "v1-editorial",
    title: "Editorial",
    subtitle: "Vogue Aesthetics",
    description: "Inspirada en revistas de alta costura. Tipografía masiva, espacios negativos audaces y acentos dorados.",
    accent: "#C9A96E",
    bgHover: "hover:bg-[#C9A96E]/5",
    borderHover: "group-hover:border-[#C9A96E]/50",
    number: "01",
  },
  {
    id: "v2-esthetician",
    title: "Esthetician",
    subtitle: "Clinical Luxury",
    description: "Diseño limpio y luminoso. Tonos crema y champagne con estructuras que evocan ciencia y cuidado premium.",
    accent: "#C28E66",
    bgHover: "hover:bg-[#C28E66]/5",
    borderHover: "group-hover:border-[#C28E66]/50",
    number: "02",
  },
  {
    id: "v3-artistic",
    title: "Artistic",
    subtitle: "Creative Portfolio",
    description: "Galería inmersiva diseñada para hacer que los colores de tu maquillaje resalten como obras de arte.",
    accent: "#E8D4CC",
    bgHover: "hover:bg-[#E8D4CC]/5",
    borderHover: "group-hover:border-[#E8D4CC]/50",
    number: "03",
  },
];

export default function SelectionPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <main className="min-h-screen bg-[#0A0908] text-[#FDFBF9] selection:bg-[#C9A96E] selection:text-black overflow-hidden font-sans flex flex-col justify-center py-20">

      <div className="fixed inset-0 pointer-events-none flex items-center justify-center">
        <div className="absolute top-0 w-[800px] h-[400px] bg-[#C9A96E]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 w-[600px] h-[500px] bg-[#C28E66]/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <motion.header
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-24"
        >
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#FDFBF9]/40 mb-6 flex items-center justify-center gap-4">
            <span className="w-12 h-px bg-[#FDFBF9]/20" /> Presentación de Diseño <span className="w-12 h-px bg-[#FDFBF9]/20" />
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif tracking-tighter mb-6">
            Adriana <span className="italic text-[#C9A96E] font-light">Nestora</span>
          </h1>
        </motion.header>

        <motion.section variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {proposals.map((proposal) => (
            <Link href={`/${proposal.id}`} key={proposal.id} className="block group">
              <motion.div variants={itemVariants} className={`relative h-[480px] p-8 md:p-10 flex flex-col justify-between border border-[#FDFBF9]/10 rounded-2xl bg-[#FDFBF9]/[0.02] backdrop-blur-sm transition-all duration-700 ease-out ${proposal.bgHover} ${proposal.borderHover} overflow-hidden`}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: `radial-gradient(circle at top right, ${proposal.accent}15, transparent 50%)` }} />
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <span className="font-serif italic text-4xl transition-colors duration-500" style={{ color: proposal.accent }}>{proposal.number}</span>
                    <ArrowRight className="text-[#FDFBF9]/20 group-hover:text-[#FDFBF9] transition-colors duration-500 -rotate-45 group-hover:rotate-0" />
                  </div>
                  <h2 className="text-3xl font-serif mb-2 text-[#FDFBF9] group-hover:tracking-wide transition-all duration-500">{proposal.title}</h2>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#FDFBF9]/40 mb-6">{proposal.subtitle}</p>
                  <p className="text-[#FDFBF9]/60 text-sm font-light leading-relaxed">{proposal.description}</p>
                </div>
                <div className="relative z-10 mt-auto pt-8">
                  <span className="text-[11px] uppercase tracking-widest text-[#FDFBF9]/40 group-hover:text-[#FDFBF9] transition-colors duration-500 flex items-center gap-2">
                    Explorar concepto <span className="w-0 h-px bg-[#FDFBF9] group-hover:w-8 transition-all duration-500 ease-out" />
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.section>
      </div>
    </main>
  );
}