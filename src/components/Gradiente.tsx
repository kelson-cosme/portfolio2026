"use client";
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";
import { ArrowUpRight } from "lucide-react";

export function LampHero() {
  return (
    <LampContainer>
      <div className="flex flex-col items-center justify-center text-center relative z-50 w-full max-w-4xl">
        
        {/* Tagline - Menor e mais delicada no mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-red-500/30 bg-red-900/10 mb-6 md:mb-8 mx-auto w-fit backdrop-blur-sm"
        >
          <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]"></span>
          <span className="text-[10px] md:text-xs font-semibold text-red-300 tracking-wide uppercase shadow-red-500/20">
            Pare de perder dinheiro no digital
          </span>
        </motion.div>

        {/* H1 Principal - Ajuste de Tamanhos Mobile */}
        <motion.h1
          initial={{ opacity: 0.5, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 2, ease: "easeInOut" }}
          // MUDANÇA: text-3xl no mobile (era 4xl) para evitar quebra excessiva, leading ajustado
          className="text-center text-4xl sm:text-5xl md:text-5xl font-bold tracking-tight leading-[1.1] md:leading-tight"
        >
          <span className="text-7xl bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-slate-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] block mb-1 md:mb-2">
            Não tenha apenas um Site.
          </span>
          
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-cyan-200 via-cyan-400 to-cyan-600 drop-shadow-[0_0_25px_rgba(6,182,212,0.6)]">
             Tenha uma  Máquina de Vendas.
          </span>
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.5 }}
           className="mt-6 font-normal text-sm md:text-lg text-slate-300 max-w-2xl mx-auto drop-shadow-lg px-2 leading-relaxed"
        >
            Design amador e sistemas lentos destroem a credibilidade da sua marca. 
            Desenvolvo interfaces de alta performance projetadas para converter visitantes em clientes fiéis.
        </motion.p>

        {/* Botões - Full width no mobile para facilitar o toque */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center justify-center px-4 sm:px-0"
          >
            <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-cyan-500 text-white font-bold text-sm hover:bg-cyan-400 transition duration-200 flex items-center justify-center gap-2 group shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:shadow-[0_0_40px_rgba(6,182,212,0.8)] border border-cyan-400/50">
              QUERO VENDER MAIS
              <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
            
            <button className="w-full sm:w-auto px-8 py-4 rounded-full border border-slate-700 text-slate-300 font-medium text-sm hover:bg-slate-800/50 hover:text-white transition duration-200 flex items-center justify-center gap-2">
              VER PORTFÓLIO
            </button>
        </motion.div>

      </div>
    </LampContainer>
  );
}