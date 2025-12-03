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
        "flex min-h-screen flex-col items-center justify-center overflow-hidden bg-brand-dark w-full z-0 pt-32 relative",
        className
      )}
    >
      {/* --- CAMADA DE LUZ AMBIENTE (TELA INTEIRA) --- */}
      {/* Adicionamos 'animate-hue' aqui para o brilho de fundo mudar de cor */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none overflow-hidden animate-hue">
          <div 
            className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[150vw] h-[80vh] bg-cyan-500/20 blur-[120px] rounded-[100%]" 
            style={{ opacity: 0.6 }}
          />
      </div>

      {/* --- A BARRA DE LUZ FÍSICA --- */}
      {/* Adicionamos 'animate-hue' aqui para a lâmpada e o núcleo mudarem de cor */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center -translate-y-20 animate-hue"> 
        
        {/* Glow concentrado na barra */}
        <motion.div
          initial={{ opacity: 0.5, width: "10rem" }}
          whileInView={{ opacity: 1, width: "40rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute top-10 inset-auto h-24 w-[4rem] -translate-y-8 bg-cyan-400 blur-3xl opacity-40 rounded-full"
        />

        {/* A Linha da Lâmpada em si */}
        <motion.div
          initial={{ width: "1rem" }}
          whileInView={{ width: "20rem" }}
          transition={{ delay: .5, duration: 1, ease: "easeInOut" }}
          className="h-1 bg-cyan-300 shadow-[0_0_40px_4px_rgba(6,182,212,1)] rounded-full z-20"
        >
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-full bg-white blur-[2px]" />
        </motion.div>
        
        {/* Núcleo mais forte da luz */}
        <div 
            className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[100vw] h-[40vh] bg-cyan-400/30 blur-[190px] rounded-[100%]" 
        />
      </div>

      {/* --- CONTEÚDO (TEXTO) --- */}
      {/* Adicionamos 'animate-hue' aqui para o Texto e Botões acompanharem a cor da luz */}
      <div className="relative z-50 flex flex-col items-center px-5 -translate-y-10 animate-hue">
        {children}
      </div>
    </div>
  );
};