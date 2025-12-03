import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, MessageCircle, Database, Layout, TrendingUp } from "lucide-react";
import {LampDemo} from "@/components/Gradiente"

export function Hero() {
  return (
    <div className="h-screen w-full flex md:items-center md:justify-center bg-brand-dark antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <LampDemo/>
      {/* 1. O Spotlight (Efeito de Luz Lateral - Opção A) */}
      <div className="animate-spotlight pointer-events-none absolute -top-40 left-0 md:left-60 md:-top-20 h-[138vh] w-[138vh] rounded-full bg-gradient-to-tr from-brand-primary/40 to-brand-secondary/20 blur-[100px] opacity-0" />
      
      {/* 2. Grid Background (A textura de engenharia) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Conteúdo Principal */}
      <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0">
        
        {/* Header/Nav Simples */}
        <nav className="absolute top-0 left-0 w-full flex justify-between items-center py-6 px-4 md:px-0 mb-20 md:mb-0">
            <h2 className="text-xl font-bold tracking-tight text-white">
              kelson<span className="text-brand-primary">.dev</span>
            </h2>
            <div className="hidden md:flex gap-6 text-sm text-slate-400">
                <a href="#" className="hover:text-white transition-colors">Serviços</a>
                <a href="#" className="hover:text-white transition-colors">Projetos</a>
                <a href="#" className="hover:text-white transition-colors">Contato</a>
            </div>
        </nav>

        <div className="flex flex-col items-center justify-center text-center mt-10 md:mt-0">
          
          {/* Tagline de Alerta */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/20 bg-red-500/10 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span className="text-xs font-semibold text-red-400 tracking-wide uppercase">
              Pare de perder dinheiro no digital
            </span>
          </motion.div>

          {/* H1 Principal com Gradiente */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 pb-4 leading-tight"
          >
            Não tenha apenas um site. <br />
            <span className="bg-gradient-to-r from-brand-primary to-purple-400 bg-clip-text text-transparent">
              Tenha uma Máquina de Vendas.
            </span>
          </motion.h1>

          {/* Subtítulo Atacando a Dor */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 font-normal text-base md:text-lg text-slate-400 max-w-2xl mx-auto"
          >
            Design amador e sistemas lentos destroem a credibilidade da sua marca. 
            Desenvolvo interfaces de alta performance projetadas para converter visitantes em clientes fiéis.
          </motion.p>

          {/* Botões CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col md:flex-row gap-4 w-full md:w-auto"
          >
            <button className="px-8 py-4 rounded-full bg-white text-black font-bold text-sm hover:bg-slate-200 transition duration-200 flex items-center justify-center gap-2 group">
              QUERO VENDER MAIS
              <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
            
            <button className="px-8 py-4 rounded-full border border-slate-700 text-white font-medium text-sm hover:bg-slate-800/50 transition duration-200 flex items-center justify-center gap-2">
              VER PORTFÓLIO
            </button>
          </motion.div>
        </div>

        {/* Rodapé do Hero (Social Proof & Pilares) */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="absolute bottom-10 md:bottom-20 w-full flex flex-col md:flex-row justify-between items-end md:items-center px-4 md:px-0 pointer-events-none"
        >
            {/* Pilares */}
            <div className="flex flex-col gap-3 text-left pointer-events-auto">
                <div className="flex items-center gap-2 text-slate-400">
                    <Layout className="w-4 h-4 text-brand-primary" />
                    <span className="text-sm">Design de Autoridade</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                    <Database className="w-4 h-4 text-brand-primary" />
                    <span className="text-sm">Sistemas Robustos</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                    <TrendingUp className="w-4 h-4 text-brand-primary" />
                    <span className="text-sm">Foco em Conversão</span>
                </div>
            </div>

            {/* Social Proof */}
            <div className="mt-8 md:mt-0 flex items-center gap-4 pointer-events-auto">
                <div className="flex -space-x-3">
                   {/* Placeholders para avatares - use imagens reais depois */}
                   {[1,2,3,4].map((i) => (
                       <div key={i} className="w-8 h-8 rounded-full border-2 border-brand-dark bg-slate-700 flex items-center justify-center text-[10px] text-white">C{i}</div>
                   ))}
                </div>
                <div>
                    <p className="text-white font-bold text-sm">+30 Projetos</p>
                    <p className="text-slate-500 text-xs">Entregues com sucesso</p>
                </div>
            </div>
        </motion.div>

      </div>
    </div>
  );
}