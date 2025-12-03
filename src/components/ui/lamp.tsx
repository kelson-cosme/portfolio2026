"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        // MUDANÇA: min-h-[100dvh] para lidar melhor com barras de navegador mobile
        // MUDANÇA: pt-24 no mobile (antes estava muito grande) e pt-40 no desktop
        "flex min-h-[100dvh] flex-col items-center justify-start md:justify-center overflow-hidden bg-brand-dark w-full z-0 pt-24 md:pt-40 relative",
        className
      )}
    >
      {/* --- CAMADA DE LUZ AMBIENTE --- */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none overflow-hidden animate-hue">
          <div 
            // MUDANÇA: Ajuste de altura/largura da luz no mobile para não estourar a tela
            className="absolute top-[-5%] left-1/2 -translate-x-1/2 w-[180vw] h-[60vh] md:w-[150vw] md:h-[80vh] bg-cyan-500/20 blur-[80px] md:blur-[120px] rounded-[100%]" 
            style={{ opacity: 0.6 }}
          />
      </div>

      {/* --- A BARRA DE LUZ FÍSICA --- */}
      {/* MUDANÇA: translate-y ajustado para subir um pouco a lâmpada no mobile */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center -translate-y-10 md:-translate-y-20 animate-hue scale-75 md:scale-100"> 
        
        <motion.div
          initial={{ opacity: 0.5, width: "10rem" }}
          whileInView={{ opacity: 1, width: "40rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute top-10 inset-auto h-24 w-[4rem] -translate-y-8 bg-cyan-400 blur-3xl opacity-40 rounded-full"
        />

        <motion.div
          initial={{ width: "8rem" }} // Começa menor no mobile
          whileInView={{ width: "20rem" }}
          transition={{ delay: .5, duration: 1, ease: "easeInOut" }}
          className="h-1 bg-cyan-300 shadow-[0_0_40px_4px_rgba(6,182,212,1)] rounded-full z-20"
        >
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-full bg-white blur-[2px]" />
        </motion.div>
        
        <div 
            className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[100vw] h-[40vh] bg-cyan-400/30 blur-[150px] md:blur-[190px] rounded-[100%]" 
        />
      </div>

      {/* --- CONTEÚDO (TEXTO) --- */}
      {/* MUDANÇA: px-4 para garantir margem lateral no mobile */}
      <div className="relative z-50 flex flex-col items-center px-4 md:px-5 -translate-y-4 md:-translate-y-10 animate-hue w-full">
        {children}
      </div>
    </div>
  );
};