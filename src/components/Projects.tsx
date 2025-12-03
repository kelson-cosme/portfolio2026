"use client";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export function Projects() {
  // Mapeia os dados para criar os componentes Card
  const cards = projectData.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    // CORREÇÃO AQUI: 
    // 1. "min-h-screen" garante que a seção tenha pelo menos a altura da tela, mas cresça se precisar.
    // 2. Removido "overflow-hidden" para não cortar os cards em telas menores.
    <section className="w-full min-h-screen py-10 md:py-20 bg-brand-dark snap-start flex flex-col justify-center">
      
      {/* --- TÍTULO COM EFEITO HOVER --- */}
      <div className="h-[10rem] md:h-[15rem] flex items-center justify-center relative z-20">
        <TextHoverEffect text="PROJETOS" />
      </div>

      {/* --- CARROSSEL DE CARDS --- */}
      {/* Ajustei a margem negativa para aproximar o carrossel do título sem cortar */}
      <div className="-mt-4 md:-mt-10 relative z-10 pb-10">
        <Carousel items={cards} />
      </div>

    </section>
  );
}

// --- DADOS DE EXEMPLO (MANTIDOS IGUAIS) ---

const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                Detalhes do Projeto.
              </span>{" "}
              Aqui você pode descrever as tecnologias usadas, o desafio enfrentado e a solução implementada. 
              Este é um espaço rico para mostrar sua expertise.
            </p>
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=3272&auto=format&fit=crop"
              alt="Mockup do projeto"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-cover rounded-xl mt-8"
            />
          </div>
        );
      })}
    </>
  );
};

const projectData = [
  {
    category: "E-commerce",
    title: "Loja Sneakers High-End",
    src: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=3270&auto=format&fit=crop",
    content: <DummyContent />,
  },
  {
    category: "SaaS",
    title: "Dashboard Financeiro",
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    content: <DummyContent />,
  },
  {
    category: "Landing Page",
    title: "Campanha Marketing AI",
    src: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop",
    content: <DummyContent />,
  },
  {
    category: "Mobile App",
    title: "App de Fitness",
    src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=3270&auto=format&fit=crop",
    content: <DummyContent />,
  },
  {
    category: "Institucional",
    title: "Site Advocacia",
    src: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=3270&auto=format&fit=crop",
    content: <DummyContent />,
  },
];