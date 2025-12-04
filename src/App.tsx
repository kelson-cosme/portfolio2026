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

function App() {
  const scrollRef = useRef<HTMLElement>(null);

  return (
    <main 
      ref={scrollRef as any}
      className="bg-brand-dark min-h-screen h-screen w-full overflow-y-scroll snap-y snap-proximity scroll-smooth"
    >
      {/* 1. SEO Principal da Página */}
      <SEO />

      {/* 2. Hero (Mantido "Eager" - carrega logo para não piscar) */}
      <Hero scrollContainerRef={scrollRef} />
      
      {/* 3. Secções com Lazy Loading */}
      {/* About */}
      <ScrollReveal>
        <Suspense fallback={<SectionLoader />}>
          <About scrollContainerRef={scrollRef} />
        </Suspense>
      </ScrollReveal>
      
      {/* TechStack */}
      <ScrollReveal>
        <Suspense fallback={<SectionLoader />}>
          <TechStack />
        </Suspense>
      </ScrollReveal>

      {/* Projects */}
      <ScrollReveal>
        <Suspense fallback={<SectionLoader />}>
          <Projects />
        </Suspense>
      </ScrollReveal>

      {/* Services (Sticky - Fora do ScrollReveal) */}
      <Suspense fallback={<div className="h-screen w-full bg-brand-dark" />}>
        <Services scrollContainerRef={scrollRef} />    
      </Suspense>
      
      {/* Testimonials */}
      <ScrollReveal>
        <Suspense fallback={<SectionLoader />}>
          <Testimonials />
        </Suspense>
      </ScrollReveal>

      {/* Contact (Sticky - Fora do ScrollReveal) */}
      <Suspense fallback={<div className="h-screen w-full bg-brand-dark" />}>
        <Contact scrollContainerRef={scrollRef} />
      </Suspense>

    </main>
  );
}

export default App;