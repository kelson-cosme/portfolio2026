import { useRef } from "react";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { TechStack } from "./components/TechStack";
import { Projects } from "./components/Projects";
import { Services } from "./components/Services";
import { Testimonials } from "./components/Testimonials";
import { Contact } from "./components/Contact";
import { ScrollReveal } from "@/components/ui/scroll-reveal.tsx"; // <--- 1. Importa o componente

function App() {
  const scrollRef = useRef<HTMLElement>(null);

  return (
    <main 
      ref={scrollRef as any}
      className="bg-brand-dark min-h-screen h-screen w-full overflow-y-scroll snap-y snap-proximity scroll-smooth"
    >
      {/* Hero já tem animação própria */}
      <Hero scrollContainerRef={scrollRef} />
      
      {/* About já tem ContainerScroll, mas podemos adicionar reveal suave na entrada */}
      <ScrollReveal>
        <About scrollContainerRef={scrollRef} />
      </ScrollReveal>
      
      {/* TechStack entra suavemente */}
      <ScrollReveal>
        <TechStack />
      </ScrollReveal>

      {/* Projects entra suavemente */}
      <ScrollReveal>
        <Projects />
      </ScrollReveal>

      {/* Services e Contact mantêm-se fora do Reveal pois são 'sticky' e complexos */}
      <Services scrollContainerRef={scrollRef} />    
      
      {/* Testimonials entra suavemente */}
      <ScrollReveal>
        <Testimonials />
      </ScrollReveal>

      <Contact scrollContainerRef={scrollRef} />

    </main>
  );
}

export default App;