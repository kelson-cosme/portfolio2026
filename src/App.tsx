import { useRef } from "react";
import { Hero } from "./components/Hero";
import { SEO } from "./components/SEO";

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
      <SEO />

      <Hero />
      <TechStack />
      <Projects />
      <Services />
      <Testimonials />
      <Contact />
    </main>
  );
}

export default App;