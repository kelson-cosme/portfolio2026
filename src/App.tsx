import React, { useRef } from "react";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { TechStack } from "./components/TechStack";
import { Projects } from "./components/Projects"; // <--- Importe aqui
import { Services } from "./components/Services"; // <--- Importa aqui

function App() {
  const scrollRef = useRef<HTMLElement>(null);

  return (
    <main 
      ref={scrollRef as any}
className="bg-brand-dark min-h-screen h-screen w-full overflow-y-scroll snap-y snap-proximity scroll-smooth"    >
      <Hero scrollContainerRef={scrollRef} />
      
      <About scrollContainerRef={scrollRef} />
      
      <TechStack />

      {/* Nova seção adicionada aqui */}
      <Projects />

<Services scrollContainerRef={scrollRef} />    
</main>
  );
}

export default App;