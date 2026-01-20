'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { loginUser } from '../actions/auth';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  // Exibe mensagem amigável após registro bem-sucedido
  useEffect(() => {
    const registered = searchParams.get('registered');
    if (registered === '1') {
      setSuccess(
        'Conta criada com sucesso! Verifique seu email para confirmar a conta.'
      );
    }
  }, [searchParams]);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await loginUser(formData);

      if (result.success) {
        // Redireciona para a página protegida após login bem-sucedido
        router.push('/dashboard');
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />
      
      <main className="flex-1 flex items-center justify-center mt-20 px-4 py-12">
        <div className="container max-w-md w-full">
          {/* Separador superior */}
          <div className="h-px bg-gradient-to-r from-transparent via-[rgba(34,21,145,0.856)] to-transparent mb-8"></div>

          {/* Formulário de Login */}
          <div className="form-container bg-[rgba(34,21,145,0.1)] backdrop-blur-sm rounded-lg p-8 border border-[rgba(34,21,145,0.3)]">
            <h2 className="text-3xl font-bold text-[#86af13] mb-6 text-center">
              Login
            </h2>

            {success && (
              <div className="mb-4 p-3 bg-green-500/20 border border-green-500 rounded text-green-300 text-sm">
                {success}
              </div>
            )}

            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded text-red-300 text-sm">
                {error}
              </div>
            )}

            <form action={handleSubmit} className="space-y-4">
              <input
                type="email"
                name="email"
                id="login-email"
                placeholder="Digite seu email"
                required
                className="w-full px-4 py-3 bg-black/50 border border-[rgba(34,21,145,0.5)] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#86af13] focus:ring-2 focus:ring-[#86af13]/50 transition-all"
              />
              
              <input
                type="password"
                name="password"
                id="login-password"
                placeholder="Digite sua senha"
                required
                className="w-full px-4 py-3 bg-black/50 border border-[rgba(34,21,145,0.5)] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#86af13] focus:ring-2 focus:ring-[#86af13]/50 transition-all"
              />
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-3 bg-[#007bff] text-white font-bold rounded-lg shadow-[0_4px_6px_rgba(3,3,3,0.733)] transition-all duration-300 hover:bg-[#2e2cc2] hover:scale-[1.02] hover:shadow-[0_4px_6px_rgba(38,17,226,0.856)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
