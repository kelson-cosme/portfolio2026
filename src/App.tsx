import React, { useRef } from "react";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { TechStack } from "./components/TechStack";
import { Projects } from "./components/Projects";
import { Services } from "./components/Services";
import { Testimonials } from "./components/Testimonials";
import { Contact } from "./components/Contact"; // <--- 1. Importa aqui

function App() {
  const scrollRef = useRef<HTMLElement>(null);

  return (
    <main 
      ref={scrollRef as any}
      className="bg-brand-dark min-h-screen h-screen w-full overflow-y-scroll snap-y snap-proximity scroll-smooth"
    >
      <Hero scrollContainerRef={scrollRef} />
      
      <About scrollContainerRef={scrollRef} />
      
      <TechStack />

      <Projects />

      <Services scrollContainerRef={scrollRef} />    
      
      <Testimonials />

      {/* 2. Adiciona o componente aqui (O Grande Final) */}
      <Contact scrollContainerRef={scrollRef} />

    </main>
  );
}

export default App;