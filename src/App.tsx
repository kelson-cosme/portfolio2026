import { useRef, Suspense, lazy } from "react";
import { Hero } from "./components/Hero";
import { SEO } from "./components/SEO";
import { ScrollReveal } from "@/components/ui/scroll-reveal.tsx"; // <--- 1. Importa o componente

// --- LAZY LOADING (Carregamento Preguiçoso) ---
// Importamos os componentes pesados apenas quando necessário para o site carregar rápido.
// O ".then(module => ...)" é necessário porque são exportações nomeadas (export function X).

const About = lazy(() => import("./components/About").then(module => ({ default: module.About })));
const TechStack = lazy(() => import("./components/TechStack").then(module => ({ default: module.TechStack })));
const Projects = lazy(() => import("./components/Projects").then(module => ({ default: module.Projects })));
const Services = lazy(() => import("./components/Services").then(module => ({ default: module.Services })));
const Testimonials = lazy(() => import("./components/Testimonials").then(module => ({ default: module.Testimonials })));
const Contact = lazy(() => import("./components/Contact").then(module => ({ default: module.Contact })));

// Componente de Carregamento Simples (Skeleton/Loader)
const SectionLoader = () => (
  <div className="w-full h-40 flex items-center justify-center text-slate-600">
    <div className="animate-pulse">A carregar secção...</div>
  </div>
);

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