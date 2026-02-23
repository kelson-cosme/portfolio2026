import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { Mail, Github, Linkedin, Instagram, ArrowRight } from "lucide-react";

export function Contact() {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end end"],
  });

  // OTIMIZAÇÃO 1: Reduzimos a escala máxima de 30 para 15.
  // Isso reduz drasticamente a carga na GPU sem perder o efeito visual de "preenchimento total".
  const scale = useTransform(scrollYProgress, [0, 0.9], [12, 1]);

  // OTIMIZAÇÃO 2: A opacidade entra um pouco mais tarde para evitar renderizar
  // elementos gigantes enquanto ainda estão invisíveis.
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  const socialLinks = [
    { name: "LinkedIn", icon: <Linkedin className="w-5 h-5" />, href: "#" },
    { name: "GitHub", icon: <Github className="w-5 h-5" />, href: "#" },
    { name: "Instagram", icon: <Instagram className="w-5 h-5" />, href: "#" },
    { name: "Email", icon: <Mail className="w-5 h-5" />, href: "mailto:contato@kelson.com" },
  ];

  return (
    // Mantivemos a altura alta (250vh) para o scroll ser suave
    <section ref={targetRef} className="h-[250vh] bg-[#020617] relative z-20">

      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden perspective-1000">

        {/* OTIMIZAÇÃO 3: Fundo estático simplificado para não competir processamento com a animação principal */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617] pointer-events-none" />

        {/* Glow central estático */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />

        <motion.div
          style={{ scale, opacity }}
          // OTIMIZAÇÃO 4: 'will-change-transform' força o navegador a promover este elemento
          // para uma camada separada na GPU. 'backface-visibility-hidden' evita flickering.
          className="flex flex-col items-center justify-center relative z-10 w-full px-4 text-center will-change-transform backface-visibility-hidden"
        >

          <h2 className="text-[12vw] md:text-[9vw] font-black leading-[0.85] tracking-tighter text-white uppercase mix-blend-overlay">
            Vamos <br />
            {/* OTIMIZAÇÃO 5: Removemos sombras pesadas do texto durante a escala */}
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-cyan-200 to-cyan-600">
              Criar?
            </span>
          </h2>

          <p className="mt-8 mb-12 text-lg md:text-2xl text-slate-400 font-medium max-w-2xl">
            Tens um projeto em mente? Vamos transformar essa ideia numa <span className="text-cyan-400 font-bold">experiência digital</span>.
          </p>

          <a
            href="mailto:contato@kelson.com"
            className="group relative inline-flex items-center gap-4 px-12 py-6 rounded-full bg-cyan-500 text-white font-black text-xl md:text-2xl tracking-wide overflow-hidden transition-all duration-300 hover:scale-105 hover:bg-cyan-400
            shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] border border-cyan-200/50"
          >
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent z-10" />

            <span className="relative z-20">INICIAR PROJETO</span>
            <ArrowRight className="w-8 h-8 relative z-20 group-hover:translate-x-2 transition-transform" />
          </a>

          <div className="flex flex-wrap justify-center gap-4 mt-16">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 text-slate-400 hover:text-cyan-400 hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1"
                aria-label={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>

        </motion.div>

        <div className="absolute bottom-6 text-slate-600 text-xs font-semibold tracking-widest uppercase opacity-50">
          © 64.477.041 KELSON COSME DE ALMEIDA • 2026 • Feito com paixão e código.
        </div>

      </div>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .backface-visibility-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `}</style>
    </section>
  );
}