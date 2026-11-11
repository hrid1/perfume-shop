import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';
import { config } from '@/config/app';

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
  metadataBase: new URL(config.siteUrl),
  title: {
    default: 'Amros Perfumes | Buy Perfumes Online in Bangladesh',
    template: '%s | Amros Perfumes',
  },
  description:
    'Shop perfumes online in Bangladesh with Amros Perfumes. Explore men’s, women’s and unisex fragrances, attars, and discovery sets.',
  keywords: [
    'perfume shop Bangladesh',
    'buy perfume online Bangladesh',
    'perfumes for men Bangladesh',
    'perfumes for women Bangladesh',
    'attar Bangladesh',
    'unisex perfume Bangladesh',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_BD',
    siteName: 'Amros Perfumes',
    title: 'Amros Perfumes | Buy Perfumes Online in Bangladesh',
    description:
      'Explore men’s, women’s and unisex fragrances, attars, and discovery sets at Amros Perfumes.',
    url: '/',
    images: [
      {
        url: '/icon.png',
        width: 512,
        height: 512,
        alt: 'Amros Perfumes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amros Perfumes | Buy Perfumes Online in Bangladesh',
    description:
      'Explore fragrances, attars, and discovery sets at Amros Perfumes.',
    images: ['/icon.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  name: 'Amros Perfumes',
                  url: config.siteUrl,
                  logo: `${config.siteUrl}/icon.png`,
                },
                {
                  '@type': 'WebSite',
                  name: 'Amros Perfumes',
                  url: config.siteUrl,
                  inLanguage: 'en-BD',
                },
              ],
            }),
          }}
        />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
