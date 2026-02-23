import { useRef, useState, useEffect } from "react";
import { PixelTrail } from "@/components/PixelTrail";
import { Database, Layout, TrendingUp, Lock, Unlock } from "lucide-react";
import { useScroll, useTransform, motion, useInView, useMotionValue, useSpring } from "framer-motion";

export function Hero() {
  const targetRef = useRef<HTMLDivElement>(null);
  // PERF: Detect if Hero is in view to pause simulation when off-screen
  const isInView = useInView(targetRef, { margin: "0px 0px -10% 0px" });

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  // Parallax Effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Move the background opposite to the mouse
  const bgX = useTransform(smoothMouseX, [-1, 1], [15, -15]);
  const bgY = useTransform(smoothMouseY, [-1, 1], [15, -15]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      // Normalize to -1 to 1
      const x = (e.clientX / innerWidth) * 2 - 1;
      const y = (e.clientY / innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Tap to Lock state for mobile (prevents scroll so user can draw)
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    if (isLocked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLocked]);

  return (
    // MUDANÇA: h-screen para garantir altura exata da viewport
    <section ref={targetRef} className="relative h-screen w-full bg-[#111112] snap-start flex flex-col md:flex-row overflow-hidden">
      <motion.div
        style={{ x: bgX, y: bgY, scale: 1.05 }}
        className="absolute inset-0 z-0 origin-center overflow-hidden"
      >
        <div className="relative w-full h-full ">
          {/* Pixel Trail Overlay - Renders both Base Image and Reveal Image pixel-perfectly */}
          <PixelTrail
            image1="/perfil.png"
            image2="/Robo.png"
            trailSize={0.15} // Brush size needs to be smaller in UV space (0-1)
            maxAge={200} // Faster decay so face returns quickly
            className="absolute inset-0 w-full h-full"
            active={isInView} // PERF: Only render when visible
          />
        </div>
      </motion.div>

      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 w-full h-full flex flex-col md:flex-row justify-between items-center px-6 pt-24 pb-12 md:px-12 md:py-0 pointer-events-none"
      >
        {/* Left Column: Name & Title */}
        <div className="pointer-events-auto flex flex-col items-start text-left md:w-1/3 mt-8 md:mt-0">
          <h1 className="text-[12vw] sm:text-6xl md:text-8xl font-bold tracking-tighter text-white mb-2 md:mb-6 uppercase leading-tight">
            Kelson <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 block md:inline mt-1 md:mt-0">
              Cosme
            </span>
          </h1>
          <p className="text-sm md:text-xl text-slate-300 max-w-[280px] md:max-w-md leading-relaxed font-light mb-6 md:mb-8">
            Creative Developer.<br className="hidden md:block" />Interactive Experiences.<br className="hidden md:block" />Digital Innovation.
          </p>
        </div>

        {/* Center: Empty for Face */}
        <div className="flex-1 md:w-1/3 h-full"></div>

        {/* Right Column: Buttons */}
        <div className="pointer-events-auto flex flex-row md:flex-col items-center md:items-end md:w-1/3 gap-4 w-full md:w-auto mt-auto md:mt-0 mb-24 md:mb-0">
          <button className="flex-1 md:flex-none px-6 py-3 md:px-8 md:py-4 rounded-full bg-cyan-600 text-white text-sm md:text-base font-bold tracking-wide hover:bg-cyan-500 transition-all flex justify-center items-center gap-2 transform hover:scale-105 shadow-lg shadow-cyan-500/20 whitespace-nowrap">
            SOBRE MIM <TrendingUp className="w-4 h-4 hidden sm:block" />
          </button>
          <button className="flex-1 md:flex-none px-6 py-3 md:px-8 md:py-4 rounded-full border border-slate-700 text-slate-300 text-sm md:text-base font-medium hover:bg-white/5 hover:border-white transition-all transform hover:scale-105 whitespace-nowrap text-center">
            PROJETOS
          </button>
        </div>

        {/* TAP TO LOCK - Mobile Only (Bottom Right) */}
        <button
          onClick={() => setIsLocked(!isLocked)}
          className="pointer-events-auto md:hidden absolute bottom-24 right-6 flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white/10 text-white text-xs font-semibold tracking-wide backdrop-blur-md active:bg-white/20 transition-all shadow-lg z-50 border border-white/20"
          style={{
            backgroundColor: isLocked ? 'rgba(6, 182, 212, 0.4)' : 'rgba(255, 255, 255, 0.1)', // Cyan tint when locked
            borderColor: isLocked ? 'rgba(6, 182, 212, 0.8)' : 'rgba(255, 255, 255, 0.2)'
          }}
        >
          {isLocked ? <Unlock className="w-3.5 h-3.5 text-cyan-400" /> : <Lock className="w-3.5 h-3.5" />}
          {isLocked ? "UNLOCK SCROLL" : "LOCK SCROLL"}
        </button>

        {/* Rodapé do Hero */}
        <div className="absolute bottom-6 left-0 w-full px-6 md:px-24 flex justify-between items-center gap-4">
          <div className="flex gap-4 md:gap-8 text-slate-500 text-xs md:text-sm font-mono uppercase tracking-widest">
            <span>// Developer</span>
            <span className="hidden sm:inline">// Designer</span>
          </div>
          <div className="flex gap-4">
            <Database className="w-4 h-4 md:w-5 md:h-5 text-slate-600" />
            <Layout className="w-4 h-4 md:w-5 md:h-5 text-slate-600" />
          </div>
        </div>

      </motion.div>
    </section>
  );
}