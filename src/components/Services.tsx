import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion"; // removi useTransform se não for usado
import { 
  Code2, 
  Palette, 
  Rocket, 
  SearchCheck // <--- CORRIGIDO AQUI (estava SearchCHECK)
} from "lucide-react";

// Dados dos serviços
const services = [
  {
    id: "01",
    title: "UI/UX Design",
    description: "Criação de interfaces intuitivas e modernas. Não é apenas beleza, é sobre guiar o utilizador até à conversão com um design estratégico.",
    icon: <Palette className="w-8 h-8" />,
    color: "from-cyan-400 to-blue-500"
  },
  {
    id: "02",
    title: "Front-end Dev",
    description: "Transformo design em código pixel-perfect. React, TypeScript e Tailwind garantindo interfaces rápidas, responsivas e escaláveis.",
    icon: <Code2 className="w-8 h-8" />,
    color: "from-blue-400 to-indigo-500"
  },
  {
    id: "03",
    title: "Animações & Motion",
    description: "A internet não é estática. Adiciono vida ao projeto com animações fluidas (como esta) que encantam sem prejudicar a performance.",
    icon: <Rocket className="w-8 h-8" />,
    color: "from-indigo-400 to-purple-500"
  },
  {
    id: "04",
    title: "SEO & Performance",
    description: "Um site bonito que ninguém encontra não serve de nada. Estrutura otimizada para o Google e carregamento instantâneo.",
    icon: <SearchCheck className="w-8 h-8" />, // <--- CORRIGIDO AQUI TAMBÉM
    color: "from-purple-400 to-pink-500"
  },
];

export function Services() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Monitoriza o scroll deste componente específico
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Atualiza o índice ativo baseado no progresso do scroll (0 a 1)
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // Dividimos o scroll em fatias iguais para cada serviço
      const step = 1 / services.length;
      const newIndex = Math.min(
        Math.floor(latest / step),
        services.length - 1
      );
      setActiveIndex(newIndex);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  // Transforma o background levemente baseado no ativo (efeito de luz ambiente)
  const bgGradient = services[activeIndex].color;

  return (
    // 1. O Container Principal (scroll longo para dar tempo de ler)
    <section 
      ref={targetRef} 
      className="relative h-[300vh] bg-brand-dark" 
    >
      
      {/* 2. O Conteúdo Sticky (O que fica 'preso' na tela) */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        
        {/* Luz de fundo dinâmica */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r ${bgGradient} opacity-20 blur-[120px] rounded-full transition-colors duration-1000 ease-in-out`} />

        <div className="relative z-10 w-full max-w-6xl px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* LADO ESQUERDO: A Timeline (Igual à imagem de referência) */}
          <div className="hidden md:flex flex-col gap-8 md:col-span-4 relative">
            {/* Linha vertical conectora */}
            <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-slate-800 -z-10" />

            {services.map((service, index) => {
              const isActive = index === activeIndex;
              return (
                <div 
                  key={service.id} 
                  className={`flex items-center gap-6 transition-all duration-500 ${isActive ? 'opacity-100 translate-x-2' : 'opacity-40'}`}
                >
                  {/* O Círculo com o ícone/número */}
                  <div 
                    className={`
                      w-14 h-14 rounded-full flex items-center justify-center border-2 
                      transition-all duration-500 bg-brand-dark
                      ${isActive 
                        ? 'border-cyan-500 text-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.5)] scale-110' 
                        : 'border-slate-700 text-slate-500'
                      }
                    `}
                  >
                   <span className="font-bold text-lg">{service.id}</span>
                  </div>
                  
                  {/* Título na timeline */}
                  <span className={`text-2xl font-bold uppercase tracking-wider ${isActive ? 'text-white' : 'text-slate-600'}`}>
                    {service.title}
                  </span>
                </div>
              );
            })}
          </div>

          {/* LADO DIREITO: O Card com o conteúdo que muda */}
          <div className="md:col-span-8 h-[400px] relative flex items-center">
            {services.map((service, index) => {
               // Apenas mostramos o card ativo
               const isActive = index === activeIndex;
               
               return (
                 <motion.div
                   key={service.id}
                   initial={{ opacity: 0, y: 50, scale: 0.9 }}
                   animate={{ 
                     opacity: isActive ? 1 : 0, 
                     y: isActive ? 0 : 50,
                     scale: isActive ? 1 : 0.9,
                     zIndex: isActive ? 10 : 0,
                     pointerEvents: isActive ? 'auto' : 'none' // Evita clicar em cards invisíveis
                   }}
                   transition={{ duration: 0.5, ease: "easeOut" }}
                   className="absolute inset-0 w-full"
                 >
                    <div className="h-full w-full p-8 md:p-12 rounded-3xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl flex flex-col justify-center gap-6 shadow-2xl relative overflow-hidden group">
                      
                      {/* Borda brilhante no hover */}
                      <div className="absolute inset-0 border border-white/5 rounded-3xl group-hover:border-cyan-500/30 transition-colors duration-500" />
                      
                      {/* Icone Grande */}
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} p-4 text-white shadow-lg mb-4`}>
                        {service.icon}
                      </div>

                      <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                        {service.title}
                      </h3>
                      
                      <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
                        {service.description}
                      </p>

                      {/* Decoração visual (fundo do card) */}
                      <div className={`absolute -right-20 -bottom-20 w-64 h-64 bg-gradient-to-br ${service.color} opacity-10 blur-[80px] rounded-full`} />
                    </div>
                 </motion.div>
               )
            })}
          </div>

        </div>

        {/* Indicador de scroll (Seta para baixo) - Apenas visual */}
        <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 text-sm flex flex-col items-center gap-2"
        >
            <span className="text-xs uppercase tracking-[0.2em]">Role para descobrir</span>
            <div className="w-[1px] h-8 bg-gradient-to-b from-cyan-500 to-transparent"></div>
        </motion.div>
      </div>
    </section>
  );
}