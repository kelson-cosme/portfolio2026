import React, { useRef } from "react";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { TechStack } from "./components/TechStack"; // <--- Importe aqui

function App() {
  const scrollRef = useRef<HTMLElement>(null);

  return (
    <main 
      ref={scrollRef as any}
      className="bg-brand-dark min-h-screen h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth"
    >
      <Hero scrollContainerRef={scrollRef} />
      
      <About scrollContainerRef={scrollRef} />
      
      {/* Nova seção adicionada aqui */}
      <TechStack />
    </main>
  );
}

export default App;