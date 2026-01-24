'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

interface HeaderUser {
  email: string;
  name?: string;
  nick?: string;
}

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState<HeaderUser | null>(null);

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setUser(null);
        return;
      }

      setUser({
        email: user.email ?? '',
        name: (user.user_metadata as any)?.name,
        nick: (user.user_metadata as any)?.nick,
      });
    }

    loadUser();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/login');
  }

  const displayName =
    user?.nick || user?.name || (user?.email ? user.email.split('@')[0] : '');

  return (
    <header className="fixed top-0 w-full bg-[rgba(34,21,145,0.856)] backdrop-blur-sm shadow-[0_1px_1px_rgb(20,67,223)] z-10">
      <nav className="px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <ul className="flex items-center gap-6 md:gap-10 lg:gap-16">
            <li>
              <Link
                href="/"
                className="text-xl font-semibold transition-all duration-300 text-transparent [text-shadow:0_0_1px_#bad80d] hover:text-white hover:[text-shadow:0_0_5px_#bad80d]"
              >
                Ínicio
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-xl font-semibold transition-all duration-300 text-transparent [text-shadow:0_0_1px_#bad80d] hover:text-white hover:[text-shadow:0_0_5px_#bad80d]"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="text-xl font-semibold transition-all duration-300 text-transparent [text-shadow:0_0_1px_#bad80d] hover:text-white hover:[text-shadow:0_0_5px_#bad80d]"
              >
                Blog
              </Link>
            </li>
          </ul>

          {user ? (
            <div className="flex items-center gap-3 text-sm text-white">
              <div className="text-right">
                <p className="font-semibold text-[#bad80d]">
                  {displayName || 'Usuário'}
                </p>
                <p className="text-xs text-gray-200 truncate max-w-[180px]">
                  {user.email}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 text-xs font-semibold bg-red-600 rounded-md shadow-[0_2px_4px_rgba(0,0,0,0.4)] hover:bg-red-700 transition-all"
              >
                Logout
              </button>
            </div>
          ) : (
            <ul className="flex items-center gap-4">
              <li>
                <Link
                  href="/login"
                  className="text-sm md:text-base font-semibold transition-all duration-300 text-transparent [text-shadow:0_0_1px_#bad80d] hover:text-white hover:[text-shadow:0_0_5px_#bad80d]"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-sm md:text-base font-semibold transition-all duration-300 text-transparent [text-shadow:0_0_1px_#bad80d] hover:text-white hover:[text-shadow:0_0_5px_#bad80d]"
                >
                  Cadastrar
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
}
