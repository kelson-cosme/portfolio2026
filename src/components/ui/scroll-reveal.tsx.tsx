"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // Permite atrasar a animação se necessário
}

export const ScrollReveal = ({ 
  children, 
  className,
  delay = 0 
}: ScrollRevealProps) => {
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: 80,             // Começa 80px abaixo
        filter: "blur(10px)" // Começa desfocado
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        filter: "blur(0px)" 
      }}
      viewport={{ 
        once: true,        // Anima apenas uma vez
        margin: "-10%"     // Começa a animar quando 10% do elemento estiver visível
      }}
      transition={{ 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1], // Easing suave (cubic-bezier)
        delay: delay
      }}
      className={cn("w-full", className)}
    >
      {children}
    </motion.div>
  );
};