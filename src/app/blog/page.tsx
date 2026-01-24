import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />
      
      <main className="flex-1 mt-20 px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-[#86af13] mb-8 text-center">
            Blog
          </h1>
          <p className="text-[rgba(189,192,187,0.856)] text-center">
            Página do blog em desenvolvimento...
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
