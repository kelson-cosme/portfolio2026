import React from "react";
import { CometCard } from "@/components/ui/comet-card";

const stack = [
  {
    name: "React",
    description: "Biblioteca para interfaces reativas.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Next.js",
    description: "Framework React para produção e SEO.",
    // Usando versão branca para contraste no fundo escuro
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-line.svg",
    className: "invert" // Inverte para branco se necessário (ou use o logo 'line' que já é branco/transparente)
  },
  {
    name: "TypeScript",
    description: "Tipagem estática para código robusto.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    name: "Tailwind CSS",
    description: "Estilização utility-first rápida.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    name: "Framer Motion",
    description: "Animações complexas e fluidas.",
    // Logo SVG direto
    icon: "https://www.vectorlogo.zone/logos/framer/framer-icon.svg",
  },
  {
    name: "Node.js",
    description: "Runtime JavaScript para Backend.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
];

export function TechStack() {
  return (
    <section className="min-h-screen bg-brand-dark py-24 snap-start flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Título */}
      <div className="relative z-10 text-center mb-16 px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-300">
          O <span className="text-cyan-500">Motor</span> da Máquina
        </h2>
        <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-lg">
          As tecnologias mais modernas do mercado garantindo performance e escala.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full px-6 relative z-10">
        {stack.map((item, index) => (
          // Usando o componente isolado
          <CometCard key={index}>
            <div className="flex flex-col items-start h-full">
              {/* Container do Ícone */}
              <div className="mb-6 p-3 rounded-lg bg-slate-900/50 border border-slate-800">
                <img 
                  src={item.icon} 
                  alt={item.name} 
                  className={`w-12 h-12 object-contain ${item.name === "Next.js" ? "invert" : ""}`} 
                />
              </div>
              
              <h3 className="text-xl font-bold text-slate-100 mb-2">{item.name}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          </CometCard>
        ))}
      </div>

      {/* Glow de fundo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.08),transparent_70%)] pointer-events-none" />
    </section>
  );
}