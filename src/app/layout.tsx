import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';

const cormorant = Cormorant_Garamond({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NOIRÉ | Luxury Perfume House & Haute Parfumerie Dhaka',
  description:
    'Sensory elegance bottled in darkness. Discover artisanal French & Oriental luxury perfumes, rare attars, and discovery coffrets with nationwide express delivery across Bangladesh.',
  keywords: [
    'perfume bangladesh',
    'luxury perfume dhaka',
    'oud perfume dhaka',
    'attar bangladesh',
    'noire perfume house',
    'bkash perfume store',
  ],
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} dark`}>
      <body className="min-h-screen bg-noir-950 text-noir-50 flex flex-col antialiased selection:bg-gold-400 selection:text-noir-950">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
