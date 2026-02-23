import React from "react";
import {
  Code2,
  Palette,
  Rocket,
  SearchCheck,
  Zap
} from "lucide-react";
// @ts-ignore - jsx sem tipos definidos
import ScrollStack, { ScrollStackItem } from "./ScrollStack.jsx";

const services = [
  {
    id: "01",
    title: "UI/UX Design",
    description: "Interfaces que não são apenas bonitas, mas funcionais. Crio layouts estratégicos focados na experiência do utilizador e conversão.",
    icon: <Palette className="w-8 h-8 md:w-10 md:h-10" />,
    color: "from-cyan-400 to-blue-600",
  },
  {
    id: "02",
    title: "Front-end Dev",
    description: "Transformo design em código limpo e escalável. Utilizo React, Next.js e Tailwind para criar aplicações web responsivas de alta performance.",
    icon: <Code2 className="w-8 h-8 md:w-10 md:h-10" />,
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: "03",
    title: "Motion & Anim",
    description: "Adiciono vida ao seu projeto. Micro-interações e animações fluidas que encantam sem comprometer 1 frame sequer.",
    icon: <Rocket className="w-8 h-8 md:w-10 md:h-10" />,
    color: "from-indigo-500 to-purple-600",
  },
  {
    id: "04",
    title: "Performance",
    description: "Otimização técnica extrema (SEO). A sua plataforma precisa carregar na velocidade da luz para dominar nos motores de busca.",
    icon: <SearchCheck className="w-8 h-8 md:w-10 md:h-10" />,
    color: "from-purple-500 to-pink-600",
  },
];

export function Services() {
  return (
    <section className="relative w-full bg-brand-dark pt-32 pb-32 flex flex-col items-center justify-center overflow-hidden">

      {/* Título da Seção - Fixo no topo enquanto rola */}
      <div className="w-full text-center md:text-left z-20 px-6 md:px-12 pointer-events-none mb-16 md:mb-24">
        <div className="flex items-center justify-center md:justify-start gap-3 mb-4 max-w-6xl mx-auto w-full">
          <span className="p-2 rounded-lg bg-slate-800/50 border border-slate-700 backdrop-blur-md">
            <Zap className="w-5 h-5 text-cyan-400 fill-cyan-400/20" />
          </span>
          <span className="text-cyan-500 font-semibold tracking-wider text-sm uppercase bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">Expertise</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight max-w-6xl mx-auto w-full drop-shadow-lg">
          Resolvo problemas com <br className="hidden md:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-slate-500">
            Design & Tecnologia
          </span>
        </h2>
      </div>

      {/* ScrollStack Ocupando 100% da viewport */}
      <div className="w-full relative z-10 px-6">
        <ScrollStack
          className="w-full"
          itemDistance={80}      // Mais distância para dar tempo ao scroll
          itemScale={0.04}
          baseScale={0.88}
          rotationAmount={3}
          blurAmount={3}
          useWindowScroll={true} // AGORA USA O SCROLL DA PÁGINA INTEIRA NATIVAMENTE
          scaleEndPosition="60%" // Controla onde a carta para de encolher
          stackPosition="25%"    // Onde a carta estaciona no topo da tela
        >
          {services.map((service) => (
            // Usamos !important utilities no itemClassName para quebrar o CSS default do ScrollStack.css
            <ScrollStackItem
              key={service.id}
              itemClassName="!h-auto !p-0 !bg-transparent !shadow-none !rounded-2xl"
            >
              <div className="h-[350px] md:h-[480px] w-full max-w-[90%] md:max-w-4xl rounded-[2rem] border border-white/10 bg-[#0c1220]/95 backdrop-blur-2xl flex flex-col justify-between shadow-2xl relative overflow-hidden p-8 md:p-12 mx-auto">

                {/* Destaque Superior */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />

                {/* Gradiente de fundo super subtil baseado na cor principal */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-[0.06]`} />

                <div className="flex items-start justify-between relative z-10 w-full">
                  <div className={`w-14 h-14 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${service.color} p-4 text-white shadow-[0_0_30px_rgba(0,0,0,0.3)] shadow-cyan-500/20 flex items-center justify-center`}>
                    {service.icon}
                  </div>
                  <span className="text-6xl md:text-8xl font-bold text-white/[0.03] font-mono tracking-tighter">
                    {service.id}
                  </span>
                </div>

                <div className="relative z-10 mt-auto">
                  <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-base md:text-xl text-slate-400/90 leading-relaxed md:max-w-[85%] font-light">
                    {service.description}
                  </p>
                </div>

              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>

    </section>
  );
}