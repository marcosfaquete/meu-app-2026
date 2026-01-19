import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-[rgba(34,21,145,0.856)] backdrop-blur-sm shadow-[0_1px_1px_rgb(20,67,223)] z-10">
      <nav>
        <ul className="flex justify-center items-center gap-8 md:gap-24 lg:gap-36 px-4 py-4">
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
              href="/login"
              className="text-xl font-semibold transition-all duration-300 text-transparent [text-shadow:0_0_1px_#bad80d] hover:text-white hover:[text-shadow:0_0_5px_#bad80d]"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              href="/register"
              className="text-xl font-semibold transition-all duration-300 text-transparent [text-shadow:0_0_1px_#bad80d] hover:text-white hover:[text-shadow:0_0_5px_#bad80d]"
            >
              Cadastrar
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
