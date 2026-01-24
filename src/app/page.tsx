'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  // Configuração das animações
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Tempo entre cada item de texto aparecendo
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' }, // Começa invisível, descido e desfocado
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)', // Fica nítido e sobe
      transition: { duration: 0.8, ease: "easeOut" } 
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0,
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 1.5 
      } 
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      
      <main className="flex-1">
        {/* Seção INÍCIO (Hero) */}
        <section id="inicio" className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 px-4 md:px-8 py-24 md:py-36 text-left">
          {/* Imagem de Perfil */}
          <motion.div 
            className="flex-shrink-0"
            initial="hidden"
            animate="visible"
            variants={imageVariants}
          >
            <Image
              src="/imagens/imgProfile.png"
              alt="Imagem de Perfil"
              width={300}
              height={300}
              className="w-[250px] h-[250px] md:w-[300px] md:h-[300px] rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.2)] object-cover"
              priority
            />
          </motion.div>

          {/* Texto */}
          <motion.div 
            className="text max-w-[500px]"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1 variants={itemVariants} className="text-3xl md:text-4xl lg:text-5xl text-[#86af13] mb-3 font-semibold transition-all duration-300 hover:[text-shadow:0_10px_20px_#2e2cc2]">
              Olá, eu sou o Marcos, Desenvolvedor Front-End.
            </motion.h1>
            <motion.h2 variants={itemVariants} className="text-lg md:text-xl lg:text-2xl text-[rgba(189,192,187,0.856)] mb-6 transition-all duration-300 hover:[text-shadow:0_10px_20px_#2e2cc2]">
              Crio e codifico coisas simples e bonitas, e amo o que faço.
            </motion.h2>
            <motion.div variants={itemVariants}>
              <Link
                href="#projetos" // Isso agora vai deslizar suavemente para a seção abaixo
                className="inline-block px-6 py-4 bg-[#007bff] text-white font-bold rounded-[25px] shadow-[0_4px_6px_rgba(3,3,3,0.733)] transition-all duration-300 hover:bg-[#2e2cc2] hover:scale-105 hover:shadow-[0_4px_6px_rgba(38,17,226,0.856)]"
              >
                My Projects
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* Seção SOBRE */}
        <section id="sobre" className="min-h-screen flex flex-col items-center justify-center px-4 md:px-8 py-20 bg-[#0a0a0a]">
          <h2 className="text-4xl font-bold text-[#86af13] mb-8">Sobre Mim</h2>
          <p className="max-w-2xl text-center text-gray-300 text-lg leading-relaxed">
            Aqui você pode contar um pouco mais sobre sua jornada. Como é um site de página única, 
            essa seção serve para apresentar suas habilidades e paixões sem que o usuário precise sair da tela.
          </p>
        </section>

        {/* Seção PROJETOS */}
        <section id="projetos" className="min-h-screen flex flex-col items-center justify-center px-4 md:px-8 py-20">
          <h2 className="text-4xl font-bold text-[#86af13] mb-12">Meus Projetos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
            {/* Exemplo de Card de Projeto */}
            <div className="bg-[#111] p-6 rounded-2xl border border-white/10 hover:border-[#007bff] transition-all hover:-translate-y-2">
              <div className="h-40 bg-gray-800 rounded-lg mb-4"></div>
              <h3 className="text-xl font-bold mb-2">Nome do Projeto</h3>
              <p className="text-gray-400 text-sm">Uma breve descrição do projeto incrível que você desenvolveu.</p>
            </div>
            {/* Adicione mais cards aqui */}
            <div className="bg-[#111] p-6 rounded-2xl border border-white/10 hover:border-[#007bff] transition-all hover:-translate-y-2">
              <div className="h-40 bg-gray-800 rounded-lg mb-4"></div>
              <h3 className="text-xl font-bold mb-2">Outro Projeto</h3>
              <p className="text-gray-400 text-sm">Tecnologias usadas: React, Next.js, Tailwind.</p>
            </div>
          </div>
        </section>

        {/* Seção CONTATO */}
        <section id="contato" className="min-h-[50vh] flex flex-col items-center justify-center px-4 md:px-8 py-20 bg-[#0a0a0a]">
          <h2 className="text-4xl font-bold text-[#86af13] mb-8">Vamos Conversar?</h2>
          <p className="text-gray-300 mb-8 text-center">
            Estou sempre aberto a novas oportunidades e projetos interessantes.
          </p>
          <a 
            href="mailto:seuemail@exemplo.com" 
            className="px-8 py-4 bg-[#007bff] text-white font-bold rounded-full hover:bg-[#2e2cc2] transition-colors"
          >
            Entrar em Contato
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
}
