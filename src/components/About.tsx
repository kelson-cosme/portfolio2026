import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

// Recebemos a ref do App
export function About({ scrollContainerRef }: { scrollContainerRef: React.RefObject<HTMLElement | null> }) {
  return (
    // REMOVIDO: h-screen e overflow-hidden. 
    // MANTIDO: snap-start (para o ímã puxar para o topo desta seção)
    <section className="flex flex-col bg-brand-dark py-20 snap-start">
      <ContainerScroll
        scrollContainerRef={scrollContainerRef} // Repassamos para a animação
        titleComponent={
          <>
            <h2 className="text-4xl font-semibold text-slate-300">
              Por trás do código <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none text-cyan-500">
                Quem é Kelson?
              </span>
            </h2>
            <p className="mt-8 max-w-2xl mx-auto text-slate-400 text-lg">
              Desenvolvedor apaixonado por criar interfaces que não apenas funcionam, 
              mas encantam. Especialista em transformar problemas complexos em 
              experiências digitais fluidas e performáticas.
            </p>
          </>
        }
      >
        <div className="w-full h-full flex items-center justify-center bg-slate-900">
            <img
              src="/perfil.webp"
              alt="Ambiente de desenvolvimento"
              className="mx-auto rounded-2xl object-cover h-full w-full object-center"
              draggable={false}
            />
        </div>
      </ContainerScroll>
    </section>
  );
}