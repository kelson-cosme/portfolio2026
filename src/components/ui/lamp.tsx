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
        "relative flex flex-col items-center w-full bg-brand-dark z-0",
        className
      )}
    >
      {/* CONTEÚDO */}
      <div className="relative z-40 flex flex-col items-center px-5 pt-32">
        {children}
      </div>

      {/* BARRA E FEIXE VISÍVEL */}
      <div className="relative z-30 w-full flex flex-col items-center mt-4">
        
        {/* FEIXE "V" MUITO VISÍVEL */}
        <div className="relative w-full h-[100px] flex justify-center items-end mb-2">
          
          {/* FEIXE PRINCIPAL - Cone de luz bem visível */}
          <div 
            className="absolute bottom-0 w-[50%] h-[50vh]"
            style={{
              background: "linear-gradient(to top, rgba(34, 211, 238, 0.35) 0%, rgba(34, 211, 238, 0.18) 30%, rgba(34, 211, 238, 0.05) 50%, transparent 100%)",
              clipPath: "polygon(0% 0%, 100% 0%, 80% 100%, 20% 100%)",
              filter: "blur(1px)",
            }}
          />

          {/* LUZ BRANCA CENTRAL */}
          <div 
            className="absolute bottom-0 w-[30%] h-[60px]"
            style={{
              background: "linear-gradient(to top, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)",
              maskImage: "radial-gradient(ellipse 60% 100% at 50% 100%, black 0%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(ellipse 60% 100% at 50% 100%, black 0%, transparent 100%)",
            }}
          />

          {/* PONTO DE ORIGEM INTENSO */}
          <div className="absolute bottom-0 w-[30%] h-[3px]">
            <div 
              className="w-full h-full"
              style={{
                background: "radial-gradient(ellipse 150% 100% at 50% 100%, rgba(34, 211, 238, 0.8) 0%, rgba(34, 211, 238, 0.4) 50%, transparent 100%)",
                filter: "blur(10px)",
              }}
            />
          </div>
        </div>

        {/* BARRA */}
        <motion.div
          initial={{ width: "5rem", opacity: 0 }}
          whileInView={{ width: "30%", opacity: 1 }}
          transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
          className="relative h-[4px] rounded-full bg-gradient-to-r from-cyan-300 via-cyan-400 to-cyan-300 shadow-[0_0_50px_15px_rgba(34,211,238,0.9),0_0_100px_30px_rgba(34,211,238,0.3)]"
        >
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-[6px] bg-gradient-to-r from-cyan-200 via-white to-cyan-200 opacity-80 blur-[2px]" />
        </motion.div>

        {/* GLOW EXTRA */}
        <div className="absolute -inset-x-8 -top-4 h-10 bg-gradient-to-r from-cyan-500/40 via-cyan-400/50 to-cyan-500/40 blur-2xl" />

      </div>
    </div>
  );
};