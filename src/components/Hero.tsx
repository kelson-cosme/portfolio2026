import React, { useRef } from "react";
import { PixelTrail } from "@/components/PixelTrail";
import { Database, Layout, TrendingUp } from "lucide-react";
import { useScroll, useTransform, motion } from "framer-motion";

export function Hero({ scrollContainerRef }: { scrollContainerRef: React.RefObject<HTMLElement | null> }) {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    container: scrollContainerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  return (
    // MUDANÇA: h-screen para garantir altura exata da viewport
    <section ref={targetRef} className="relative h-screen w-full bg-[#111112] snap-start flex flex-col md:flex-row">
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Imagem de Fundo (Base) - Alta Qualidade, Sem Pixelização */}
        <img
          src="/perfil.png"
          alt="Eduardo Amui Background"
          className="absolute inset-0 w-full h-full object-cover opacity-60 md:opacity-100"
        />

        {/* Pixel Trail Overlay - Revela o Capacete ao passar o mouse */}
        {/* image1 não é usado no modo smooth, apenas image2 para o reveal */}
        <PixelTrail
          image2="/perfilCapacete.png"
          trailSize={0.15} // Brush size needs to be smaller in UV space (0-1)
          maxAge={200} // Faster decay so face returns quickly
          className="absolute inset-0 z-10 w-full h-full mix-blend-normal"
        />
      </div>

      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 w-full h-full flex flex-col md:flex-row justify-between items-center px-4 md:px-12 pointer-events-none"
      >
        {/* Left Column: Name & Title */}
        <div className="pointer-events-auto flex flex-col items-start text-left md:w-1/3">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-6 uppercase leading-tight">
            Kelson <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
              Cosme
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-md leading-relaxed font-light">
            Creative Developer.<br />Interactive Experiences.<br />Digital Innovation.
          </p>
        </div>

        {/* Center: Empty for Face */}
        <div className="md:w-1/3 h-full"></div>

        {/* Right Column: Buttons */}
        <div className="pointer-events-auto flex flex-col items-end md:w-1/3 gap-6">
          <button className="px-8 py-4 rounded-full bg-cyan-600 text-white font-bold tracking-wide hover:bg-cyan-500 transition-all flex items-center gap-2 transform hover:scale-105 shadow-lg shadow-cyan-500/20">
            SOBRE MIM <TrendingUp className="w-4 h-4" />
          </button>
          <button className="px-8 py-4 rounded-full border border-slate-700 text-slate-300 font-medium hover:bg-white/5 hover:border-white transition-all transform hover:scale-105">
            PROJETOS
          </button>
        </div>

        {/* Rodapé do Hero */}
        <div className="absolute bottom-8 left-0 w-full px-8 md:px-24 flex flex-col md:flex-row justify-between items-end md:items-center gap-4 border-t border-white/10 pt-8 mt-12">
          <div className="flex gap-8 text-slate-500 text-sm font-mono uppercase tracking-widest">
            <span>// Developer</span>
            <span>// Designer</span>
          </div>
          <div className="flex gap-4">
            <Database className="w-5 h-5 text-slate-600" />
            <Layout className="w-5 h-5 text-slate-600" />
          </div>
        </div>

      </motion.div>
    </section>
  );
}