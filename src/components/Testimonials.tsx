import { CometCard } from "@/components/ui/comet-card";
import { Quote, Star } from "lucide-react";

// Dados fictícios dos depoimentos (podes alterar depois)
const testimonials = [
  {
    name: "Ana Silva",
    role: "CEO da TechStart",
    text: "O Kelson transformou completamente a nossa presença digital. O site não só ficou lindo, como a performance aumentou as nossas conversões em 40% na primeira semana.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
  },
  {
    name: "Carlos Mendes",
    role: "Fundador, Creative Studio",
    text: "Trabalhar com este nível de profissionalismo é raro. A atenção aos detalhes nas animações e a fluidez da interface superaram todas as nossas expectativas.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
  },
  {
    name: "Juliana Costa",
    role: "Diretora de Marketing",
    text: "Precisávamos de algo que se destacasse no mercado saturado. O resultado foi uma 'Máquina de Vendas' visualmente impactante e extremamente funcional.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop",
  },
];

export function Testimonials() {
  return (
    <section className="min-h-screen w-full bg-brand-dark py-24 snap-start flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Fundo Decorativo (Glow) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
         <div className="absolute top-[20%] right-[-10%] w-[30rem] h-[30rem] bg-cyan-500/10 blur-[100px] rounded-full" />
         <div className="absolute bottom-[20%] left-[-10%] w-[30rem] h-[30rem] bg-blue-600/10 blur-[100px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Cabeçalho da Secção */}
        <div className="text-center mb-16 md:mb-24">
          <span className="text-cyan-500 font-semibold tracking-wider text-sm uppercase mb-2 block">
            Feedback Real
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-200">
            O que dizem os <span className="text-cyan-500">Parceiros</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-lg">
            Histórias de sucesso de quem confiou na união entre design e tecnologia.
          </p>
        </div>

        {/* Grelha de Depoimentos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <CometCard key={index} className="w-full h-full">
              <div className="relative h-full w-full p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-[#0B1121] border border-slate-800/60 flex flex-col justify-between group">
                
                {/* Ícone de Citação Decorativo */}
                <div className="absolute top-6 right-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                    <Quote size={80} className="text-cyan-500 fill-cyan-500" />
                </div>

                {/* Conteúdo do Texto */}
                <div>
                    <div className="flex gap-1 mb-6">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={16} className="text-cyan-500 fill-cyan-500" />
                        ))}
                    </div>
                    <p className="text-slate-300 text-lg leading-relaxed relative z-10 font-light italic">
                      "{item.text}"
                    </p>
                </div>

                {/* Autor */}
                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-slate-800/50">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-slate-700 group-hover:border-cyan-500 transition-colors duration-300">
                      <img 
                        src={item.avatar} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Indicador Online (opcional) */}
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></div>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-bold text-base group-hover:text-cyan-400 transition-colors">
                        {item.name}
                    </h4>
                    <span className="text-slate-500 text-sm">
                        {item.role}
                    </span>
                  </div>
                </div>

              </div>
            </CometCard>
          ))}
        </div>

      </div>
    </section>
  );
}