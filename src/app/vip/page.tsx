'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface VipUser {
  id: string;
  email: string;
  user_metadata?: {
    name?: string;
    nick?: string;
  };
}

export default function VipPage() {
  const router = useRouter();
  const [user, setUser] = useState<VipUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    async function loadUser() {
      setIsLoading(true);
      setError('');

      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        router.replace('/login');
        return;
      }

      setUser({
        id: user.id,
        email: user.email ?? '',
        user_metadata: {
          name: (user.user_metadata as any)?.name,
          nick: (user.user_metadata as any)?.nick,
        },
      });

      setIsLoading(false);
    }

    loadUser();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/login');
  }

  const displayName =
    user?.user_metadata?.name || user?.user_metadata?.nick || user?.email;

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />

      <main className="flex-1 flex items-center justify-center mt-20 px-4 py-12">
        <div className="container max-w-md w-full">
          <div className="h-px bg-gradient-to-r from-transparent via-[rgba(34,21,145,0.856)] to-transparent mb-8"></div>

          <div className="bg-[rgba(34,21,145,0.1)] backdrop-blur-sm rounded-lg p-8 border border-[rgba(34,21,145,0.3)]">
            <h2 className="text-3xl font-bold text-[#86af13] mb-4 text-center">
              Área VIP
            </h2>

            {isLoading && (
              <p className="text-center text-gray-300 text-sm">
                Carregando suas informações...
              </p>
            )}

            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded text-red-300 text-sm">
                {error}
              </div>
            )}

            {!isLoading && user && (
              <div className="space-y-4">
                <p className="text-lg text-white">
                  Olá,{' '}
                  <span className="font-semibold text-[#86af13]">
                    {displayName}
                  </span>{' '}
                  👋
                </p>

                <div className="text-sm text-gray-300 space-y-1">
                  <p>
                    <span className="font-semibold text-[#86af13]">Email:</span>{' '}
                    {user.email}
                  </p>
                  {user.user_metadata?.nick && (
                    <p>
                      <span className="font-semibold text-[#86af13]">
                        Nickname:
                      </span>{' '}
                      {user.user_metadata.nick}
                    </p>
                  )}
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full mt-6 px-6 py-3 bg-red-600 text-white font-bold rounded-lg shadow-[0_4px_6px_rgba(3,3,3,0.733)] transition-all duration-300 hover:bg-red-700 hover:scale-[1.02] hover:shadow-[0_4px_6px_rgba(220,38,38,0.8)]"
                >
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

