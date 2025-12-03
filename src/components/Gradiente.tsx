"use client";
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";
import { ArrowUpRight } from "lucide-react";

export function LampHero() {
  return (
    <LampContainer>
      <div className="flex flex-col items-center justify-center text-center relative z-50">
        
        {/* Tagline de Alerta */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/20 bg-red-500/10 mb-8 mx-auto w-fit"
        >
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          <span className="text-xs font-semibold text-red-400 tracking-wide uppercase">
            Pare de perder dinheiro no digital
          </span>
        </motion.div>

        {/* H1 Principal */}
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="bg-gradient-to-br from-slate-100 to-slate-400 py-4 bg-clip-text text-center text-4xl font-bold tracking-tight text-transparent md:text-7xl leading-tight"
        >
          Não tenha apenas um site. <br />
          <span className="text-cyan-400">
             Tenha uma Máquina de Vendas.
          </span>
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
           initial={{ opacity: 0, y: 100 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.5 }}
           className="mt-6 font-normal text-base md:text-lg text-slate-300 max-w-2xl mx-auto"
        >
            Design amador e sistemas lentos destroem a credibilidade da sua marca. 
            Desenvolvo interfaces de alta performance projetadas para converter visitantes em clientes fiéis.
        </motion.p>

        {/* Botões - MENOS ESPAÇO ABAIXO */}
        <motion.div 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-10 flex flex-col md:flex-row gap-4 w-full md:w-auto items-center justify-center"
          >
            <button className="px-8 py-4 rounded-full bg-cyan-500 text-white font-bold text-sm hover:bg-cyan-400 transition duration-200 flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(6,182,212,0.5)]">
              QUERO VENDER MAIS
              <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
            
            <button className="px-8 py-4 rounded-full border border-slate-700 text-white font-medium text-sm hover:bg-slate-800/50 transition duration-200 flex items-center justify-center gap-2">
              VER PORTFÓLIO
            </button>
        </motion.div>

      </div>
    </LampContainer>
  );
}