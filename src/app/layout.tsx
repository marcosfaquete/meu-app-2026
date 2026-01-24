import type { Metadata } from "next";
import { Parkinsans } from "next/font/google";
import "./globals.css";
import { VisitorTracker } from "@/VisitorTracker";
import VisitorCounterDisplay from "@/components/VisitorCounterDisplay";
import SmoothScrolling from "@/components/SmoothScrolling";

const parkinsans = Parkinsans({
  variable: "--font-parkinsans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Marcos Faquete - Desenvolvedor Front-End",
  description: "Crio e codifico coisas simples e bonitas, e amo o que faço.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${parkinsans.variable} antialiased`}
      >
        <SmoothScrolling />
        <VisitorTracker />
        <VisitorCounterDisplay />
        {children}
      </body>
    </html>
  );
}
