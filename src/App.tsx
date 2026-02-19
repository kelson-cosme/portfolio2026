import { useRef } from "react";
import { Hero } from "./components/Hero";
import { SEO } from "./components/SEO";
import { ScrollReveal } from "@/components/ui/scroll-reveal.tsx"; // <--- 1. Importa o componente

// --- STATIC IMPORTS (Prevenção de Erros de Runtime e Build) ---
// O usuário removeu o Suspense, então lazy loading causaria erro. 
// Voltamos para imports normais.

// import { About } from "./components/About"; 
import { TechStack } from "./components/TechStack";
import { Projects } from "./components/Projects";
import { Services } from "./components/Services";
import { Testimonials } from "./components/Testimonials";
import { Contact } from "./components/Contact";



import { useEffect } from "react";
// Import Locomotive Scroll (ensure it's installed via npm install locomotive-scroll)
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css'; // Optional if you need base styles

function App() {
  const scrollRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Locomotive Scroll v5 initialization
    const scroll = new LocomotiveScroll();

    return () => {
      if (scroll) scroll.destroy();
    }
  }, []);

  return (
    <main
      ref={scrollRef as any}
      data-scroll-container
      className="bg-brand-dark min-h-screen w-full" // Removed overflow-y-scroll, snap-y, scroll-smooth
    >
      {/* 1. SEO Principal da Página */}
      <SEO />

      {/* 2. Hero (Mantido "Eager" - carrega logo para não piscar) */}
      <Hero scrollContainerRef={scrollRef} />

      {/* 3. Secções com Lazy Loading */}
      {/* About */}
      {/* <div data-scroll-section>
        <ScrollReveal>
         
            <About scrollContainerRef={scrollRef} />
          
        </ScrollReveal>
      </div> */}

      {/* TechStack */}
      <div data-scroll-section>
        <ScrollReveal>

          <TechStack />

        </ScrollReveal>
      </div>

      {/* Projects */}
      <div data-scroll-section>
        <ScrollReveal>

          <Projects />

        </ScrollReveal>
      </div>

      {/* Services (Sticky - Fora do ScrollReveal) */}
      <div data-scroll-section>
        <Services scrollContainerRef={scrollRef} />

      </div>

      {/* Testimonials */}
      <div data-scroll-section>
        <ScrollReveal>

          <Testimonials />

        </ScrollReveal>
      </div>

      {/* Contact (Sticky - Fora do ScrollReveal) */}
      <div data-scroll-section>
        <Contact scrollContainerRef={scrollRef} />

      </div>

    </main>
  );
}

export default App;