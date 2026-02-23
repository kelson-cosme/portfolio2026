
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





function App() {



  return (
    <main
      data-scroll-container
      className="bg-brand-dark min-h-screen w-full"
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