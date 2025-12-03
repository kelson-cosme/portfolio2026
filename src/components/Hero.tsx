import React, { useRef } from "react";
import { LampHero } from "@/components/Gradiente";
import { Database, Layout, TrendingUp } from "lucide-react";
import { useScroll, useTransform, motion } from "framer-motion";

// 1. Recebemos a prop scrollContainerRef
export function Hero({ scrollContainerRef }: { scrollContainerRef: React.RefObject<HTMLElement | null> }) {
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    container: scrollContainerRef, // 2. AVISAMOS: "Olhe para o scroll do container App, não da janela!"
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  return (
    <section ref={targetRef} className="relative h-screen w-full bg-brand-dark snap-start">
      <motion.div 
        style={{ opacity, scale, y }}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] z-10 pointer-events-none"></div>

        <LampHero />

        <div className="absolute bottom-6 w-full flex justify-center px-4 z-30">
           <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-slate-500 border-t border-slate-800/50 pt-6 w-full max-w-5xl">
              <div className="flex items-center gap-2">
                  <Layout className="w-4 h-4 text-cyan-500" />
                  <span className="text-sm font-medium">Design de Autoridade</span>
              </div>
              <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-cyan-500" />
                  <span className="text-sm font-medium">Sistemas Robustos</span>
              </div>
              <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-cyan-500" />
                  <span className="text-sm font-medium">Foco em Conversão</span>
              </div>
              <div className="flex items-center gap-2 border-l border-slate-800 pl-6 ml-6 hidden md:flex">
                   <span className="text-white font-bold text-sm">+30 Projetos</span>
                   <span className="text-xs">Entregues</span>
              </div>
           </div>
        </div>

      </motion.div>
    </section>
  );
}