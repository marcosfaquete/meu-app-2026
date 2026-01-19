import Image from 'next/image';
import Link from 'next/link';
import Header from './components/Header';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />
      
      <main className="flex-1 mt-20">
        <section className="hero flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 px-4 md:px-8 py-24 md:py-36 text-left mb-32">
          {/* Imagem de Perfil */}
          <div className="flex-shrink-0">
            <Image
              src="/imagens/imgProfile.png"
              alt="Imagem de Perfil"
              width={300}
              height={300}
              className="w-[250px] h-[250px] md:w-[300px] md:h-[300px] rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.2)] object-cover"
              priority
            />
          </div>

          {/* Texto */}
          <div className="text max-w-[500px]">
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-[#86af13] mb-3 font-semibold transition-all duration-300 hover:[text-shadow:0_10px_20px_#2e2cc2]">
              Olá, eu sou o Marcos, Desenvolvedor Front-End.
            </h1>
            <h2 className="text-lg md:text-xl lg:text-2xl text-[rgba(189,192,187,0.856)] mb-6 transition-all duration-300 hover:[text-shadow:0_10px_20px_#2e2cc2]">
              Crio e codifico coisas simples e bonitas, e amo o que faço.
            </h2>
            <Link
              href="#projetos"
              className="inline-block px-6 py-4 bg-[#007bff] text-white font-bold rounded-[25px] shadow-[0_4px_6px_rgba(3,3,3,0.733)] transition-all duration-300 hover:bg-[#2e2cc2] hover:scale-105 hover:shadow-[0_4px_6px_rgba(38,17,226,0.856)]"
            >
              My Projects
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
