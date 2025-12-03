import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { 
  Code2, 
  Palette, 
  Rocket, 
  SearchCheck, // Garante que este import está correto, ou usa 'Search'
  Zap
} from "lucide-react";

const services = [
  {
    id: "01",
    title: "UI/UX Design",
    description: "Interfaces que não são apenas bonitas, mas funcionais. Crio layouts estratégicos focados na experiência do utilizador e conversão.",
    icon: <Palette className="w-8 h-8" />,
    color: "from-cyan-400 to-blue-500",
    shadow: "shadow-cyan-500/20"
  },
  {
    id: "02",
    title: "Front-end Dev",
    description: "Transformo design em código limpo e escalável. Utilizo React, Next.js e Tailwind para criar aplicações web rápidas e responsivas.",
    icon: <Code2 className="w-8 h-8" />,
    color: "from-blue-400 to-indigo-500",
    shadow: "shadow-blue-500/20"
  },
  {
    id: "03",
    title: "Motion & Anim",
    description: "Adiciono vida e interatividade. Micro-interações e animações fluidas que guiam o olhar e encantam sem comprometer a performance.",
    icon: <Rocket className="w-8 h-8" />,
    color: "from-indigo-400 to-purple-500",
    shadow: "shadow-purple-500/20"
  },
  {
    id: "04",
    title: "Performance",
    description: "Otimização técnica para o Google (SEO) e velocidade de carregamento. O seu site precisa de ser encontrado e carregar instantaneamente.",
    icon: <SearchCheck className="w-8 h-8" />, 
    color: "from-purple-400 to-pink-500",
    shadow: "shadow-pink-500/20"
  },
];

export function Services({ scrollContainerRef }: { scrollContainerRef: React.RefObject<HTMLElement | null> }) {
  const targetRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    container: scrollContainerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const step = 1 / services.length;
      const newIndex = Math.min(
        Math.floor(latest / step),
        services.length - 1
      );
      setActiveIndex(newIndex);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const activeService = services[activeIndex];

  return (
    <section 
      ref={targetRef} 
      className="relative h-[300vh] bg-brand-dark snap-start" 
    >
      {/* Container Sticky - Ocupa 100vh e fica preso no topo */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* --- CAMADA 1: FUNDO DECORATIVO --- */}
        
        {/* Padrão de Grelha (Grid) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

        {/* Marca d'água Gigante (SERVICES) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 select-none pointer-events-none">
          <h1 className="text-[15vw] font-bold text-transparent stroke-text opacity-[0.03] leading-none whitespace-nowrap">
            EXPERTISE
          </h1>
        </div>
        
        {/* Glow Dinâmico de Fundo */}
        <div 
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r ${activeService.color} opacity-15 blur-[100px] rounded-full transition-colors duration-700`} 
        />

        {/* --- CAMADA 2: CONTEÚDO --- */}
        <div className="relative z-10 w-full max-w-6xl px-6 flex flex-col h-full justify-center">
            
            {/* Título da Seção */}
            <div className="mb-12 md:mb-20 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                    <span className="p-2 rounded-lg bg-slate-800/50 border border-slate-700">
                        <Zap className="w-5 h-5 text-cyan-400 fill-cyan-400/20" />
                    </span>
                    <span className="text-cyan-500 font-semibold tracking-wider text-sm uppercase">O que eu faço</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white">
                    Resolvo problemas com <br className="hidden md:block"/> 
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-slate-500">
                        Design & Tecnologia
                    </span>
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            
                {/* TIMELINE (Lado Esquerdo) */}
                <div className="hidden md:flex flex-col gap-6 md:col-span-4 relative pl-4">
                    {/* Linha vertical */}
                    <div className="absolute left-[34px] top-4 bottom-4 w-0.5 bg-slate-800/50 -z-10 rounded-full" />
                    {/* Barra de progresso vertical que se move (opcional, visual) */}
                    <motion.div 
                        className="absolute left-[34px] top-4 w-0.5 bg-cyan-500 -z-10 rounded-full" 
                        style={{ height: `${(activeIndex / (services.length - 1)) * 100}%`, transition: "height 0.5s ease" }}
                    />

                    {services.map((service, index) => {
                    const isActive = index === activeIndex;
                    return (
                        <button 
                            key={service.id} 
                            onClick={() => {
                                // Opcional: Implementar clique para scroll se desejado, 
                                // mas num sticky scroll é complexo. Deixamos apenas visual por agora.
                            }}
                            className={`group flex items-center gap-6 text-left transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
                        >
                        <div 
                            className={`
                            relative z-10 w-12 h-12 rounded-full flex items-center justify-center border-2 
                            transition-all duration-500 bg-brand-dark
                            ${isActive 
                                ? 'border-cyan-500 text-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.4)] scale-110' 
                                : 'border-slate-800 text-slate-600 group-hover:border-slate-600'
                            }
                            `}
                        >
                            <span className="font-bold text-sm font-mono">{service.id}</span>
                        </div>
                        
                        <span className={`text-xl font-bold tracking-tight transition-colors ${isActive ? 'text-white' : 'text-slate-400'}`}>
                            {service.title}
                        </span>
                        </button>
                    );
                    })}
                </div>

                {/* CARD (Lado Direito) */}
                <div className="md:col-span-8 h-[380px] w-full relative perspective-1000">
                    {services.map((service, index) => {
                    const isActive = index === activeIndex;
                    
                    return (
                        <motion.div
                        key={service.id}
                        initial={{ opacity: 0, x: 20, rotateY: -10 }}
                        animate={{ 
                            opacity: isActive ? 1 : 0, 
                            x: isActive ? 0 : 20,
                            rotateY: isActive ? 0 : -10,
                            zIndex: isActive ? 10 : 0,
                            pointerEvents: isActive ? 'auto' : 'none'
                        }}
                        transition={{ duration: 0.5, type: "spring", stiffness: 100, damping: 20 }}
                        className="absolute inset-0 w-full h-full"
                        >
                            <div className="h-full w-full p-8 md:p-12 rounded-[2rem] border border-white/10 bg-slate-900/40 backdrop-blur-md flex flex-col justify-center gap-6 shadow-2xl relative overflow-hidden">
                                
                                {/* Gradiente de borda subtil */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-[0.03]`} />

                                <div className="flex items-start justify-between">
                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} p-4 text-white shadow-lg flex items-center justify-center`}>
                                        {service.icon}
                                    </div>
                                    <span className="text-6xl font-bold text-white/5 font-mono">
                                        {service.id}
                                    </span>
                                </div>

                                <div>
                                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                        {service.title}
                                    </h3>
                                    <p className="text-lg text-slate-400 leading-relaxed">
                                        {service.description}
                                    </p>
                                </div>
                                
                                {/* Linha decorativa inferior */}
                                <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${service.color}`} style={{ width: isActive ? '100%' : '0%', transition: 'width 0.8s ease' }} />
                            </div>
                        </motion.div>
                    )
                    })}
                </div>
            </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 6, 0] }} 
            transition={{ delay: 2, repeat: Infinity, duration: 2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-600 flex flex-col items-center gap-2"
        >
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Role para explorar</span>
            <div className="w-[1px] h-6 bg-slate-800 overflow-hidden">
                <div className="w-full h-1/2 bg-cyan-500/50 animate-movedown"></div>
            </div>
        </motion.div>
      </div>
      
      {/* Estilo CSS in-line para o texto com stroke (fundo) */}
      <style>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.5);
          color: transparent;
        }
        @keyframes movedown {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
        }
        .animate-movedown {
            animation: movedown 1.5s linear infinite;
        }
      `}</style>
    </section>
  );
}