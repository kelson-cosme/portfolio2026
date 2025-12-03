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
    className: "invert" 
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
      
      {/* Título da Seção */}
      <div className="relative z-10 text-center mb-16 px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-300">
          O <span className="text-cyan-500">Motor</span> da Máquina
        </h2>
        <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-lg">
          As tecnologias mais modernas do mercado garantindo performance e escala.
        </p>
      </div>

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full px-6 relative z-10">
        {stack.map((item, index) => (
          <CometCard key={index} className="w-full h-full">
            {/* Cartão Interno com Estilo da Identidade:
               - bg-gradient-to-br: Gradiente sutil escuro (igual à imagem de referência)
               - border: Borda fina e escura
               - group: Permite controlar o hover dos filhos
               - hover:border-cyan-500/30: A borda brilha em ciano ao passar o mouse
            */}
            <div className="group relative flex flex-col items-start justify-between h-full w-full p-6 md:p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-[#0B1121] border border-slate-800/60 hover:border-cyan-500/30 transition-colors duration-500">
              
              {/* Efeito de brilho no fundo ao passar o mouse (opcional, bem sutil) */}
              <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

              <div className="relative z-10 w-full">
                {/* Ícone com fundo e brilho */}
                <div className="mb-6 w-14 h-14 flex items-center justify-center rounded-xl bg-slate-950 border border-slate-800 group-hover:border-cyan-500/50 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all duration-300">
                  <img 
                    src={item.icon} 
                    alt={item.name} 
                    className={`w-8 h-8 object-contain ${item.name === "Next.js" ? "invert opacity-80" : ""}`} 
                  />
                </div>
                
                {/* Texto */}
                <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                  {item.name}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>

              {/* Detalhe visual decorativo no canto inferior */}
              <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-slate-800 group-hover:bg-cyan-500 transition-colors duration-500" />
            </div>
          </CometCard>
        ))}
      </div>

      {/* Glow de fundo da seção (Ambiente) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.05),transparent_60%)] pointer-events-none" />
    </section>
  );
}