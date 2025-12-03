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
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-transparent w-full rounded-md z-0",
        className
      )}
    >
      <div className="relative flex w-full flex-1 items-center justify-center isolate z-0">
        {/* --- CAMADAS DE SUAVIZAÇÃO E BRILHO --- */}

        {/* 1. Borrão de fundo para atmosfera */}
        <div className="absolute top-1/2 h-[20rem] w-full translate-y-12 scale-x-[2] bg-brand-dark blur-[150px] opacity-30"></div>
        
        {/* 2. LUZ ESQUERDA - MODIFICADA para vir de baixo */}
        <motion.div
          initial={{ opacity: 0.3, height: "10rem" }}
          whileInView={{ opacity: 0.8, height: "25rem" }}
          transition={{
            delay: 0.3,
            duration: 1.2,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 bottom-0 w-[30rem] h-[25rem] bg-gradient-conic from-cyan-500 via-blue-500/40 to-transparent text-white [--conic-position:from_0deg_at_center_bottom]"
        >
          {/* Máscara para limitar a direção da luz (apenas para cima) */}
          <div className="absolute w-full left-0 bg-brand-dark h-32 top-0 z-20 [mask-image:linear-gradient(to_bottom,white,transparent)]" />
          {/* Máscara lateral para suavizar bordas */}
          <div className="absolute h-full right-0 bg-brand-dark w-16 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
        </motion.div>

        {/* 3. LUZ DIREITA - MODIFICADA para vir de baixo */}
        <motion.div
          initial={{ opacity: 0.3, height: "10rem" }}
          whileInView={{ opacity: 0.8, height: "25rem" }}
          transition={{
            delay: 0.3,
            duration: 1.2,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 bottom-0 w-[30rem] h-[25rem] bg-gradient-conic from-purple-500 via-blue-500/40 to-transparent text-white [--conic-position:from_180deg_at_center_bottom]"
        >
          <div className="absolute w-full right-0 bg-brand-dark h-32 top-0 z-20 [mask-image:linear-gradient(to_bottom,white,transparent)]" />
          <div className="absolute h-full left-0 bg-brand-dark w-16 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>

        {/* 4. Neblina na base para esconder origem */}
        <div className="absolute bottom-0 z-40 h-32 w-full bg-brand-dark opacity-60 blur-[80px] translate-y-8"></div>
        
        {/* 5. Glow circular principal - MAIOR e mais intenso na base */}
        <div className="absolute inset-auto z-50 h-48 w-[40rem] bottom-0 translate-y-1/2 rounded-full bg-gradient-to-r from-cyan-400/30 via-blue-500/30 to-purple-500/30 blur-[100px]"></div>
        
        {/* 6. Brilho adicional na base */}
        <motion.div
          initial={{ width: "12rem", opacity: 0 }}
          whileInView={{ width: "24rem", opacity: 1 }}
          transition={{
            delay: 0.4,
            duration: 1,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-32 w-96 bottom-0 translate-y-[4rem] rounded-full bg-gradient-to-r from-cyan-400/20 to-purple-500/20 blur-3xl"
        ></motion.div>
        
        {/* 7. A LINHA BRILHANTE - Agora na base, iluminando para cima */}
        <motion.div
          initial={{ width: "20rem", opacity: 0 }}
          whileInView={{ width: "40rem", opacity: 1 }}
          transition={{
            delay: 0.3,
            duration: 1,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-50 h-1 w-[40rem] bottom-0 translate-y-[3.5rem] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_-20px_80px_10px_rgba(6,182,212,0.8)]"
        ></motion.div>

        {/* 8. Linha secundária para mais profundidade */}
        <motion.div
          initial={{ width: "15rem", opacity: 0 }}
          whileInView={{ width: "35rem", opacity: 0.5 }}
          transition={{
            delay: 0.5,
            duration: 1,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-40 h-[2px] w-[35rem] bottom-0 translate-y-[4rem] bg-gradient-to-r from-transparent via-blue-300/50 to-transparent blur-sm"
        ></motion.div>

        {/* 9. Fundo superior para cobrir completamente a parte de cima */}
        <div className="absolute inset-auto z-40 h-64 w-full top-0 -translate-y-[15rem] bg-gradient-to-t from-transparent to-brand-dark"></div>

        {/* 10. Barreira na base para bloquear luz para baixo */}
        <div className="absolute bottom-0 z-50 h-8 w-full bg-brand-dark"></div>
      </div>

      {/* Conteúdo dos textos - posicionado acima da luz */}
      <div className="relative z-50 flex mb-40 flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
};