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
    default: 'Amros Perfumes | Official Online Perfume Store Bangladesh',
    template: '%s | Amros Perfumes',
  },
  description:
    'Official website of Amros Perfumes. Buy premium long-lasting perfumes, inspired luxury fragrances, pure attars, and discovery sets online in Bangladesh with cash on delivery.',
  keywords: [
    'amros perfume',
    'amros perfumes',
    'amros',
    'amros bd',
    'amros perfume bangladesh',
    'amros perfume barisal',
    'amros perfumes online',
    'amros perfume price in bangladesh',
    'buy perfume online bangladesh',
    'perfume shop bangladesh',
    'perfumes for men bangladesh',
    'perfumes for women bangladesh',
    'attar bangladesh',
    'unisex perfume bangladesh',
    'long lasting perfume bd',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_BD',
    siteName: 'Amros Perfumes',
    title: 'Amros Perfumes | Official Online Perfume Store Bangladesh',
    description:
      'Official website of Amros Perfumes. Explore premium long-lasting perfumes, attars, and inspired luxury fragrances across Bangladesh.',
    url: 'https://www.amrosperfumes.com',
    images: [
      {
        url: '/icon.png',
        width: 512,
        height: 512,
        alt: 'Amros Perfumes Bangladesh',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amros Perfumes | Official Online Perfume Store Bangladesh',
    description:
      'Official store of Amros Perfumes. Premium long-lasting perfumes, attars, and discovery sets in Bangladesh.',
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
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
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
                  '@type': ['Organization', 'OnlineStore'],
                  '@id': `${config.siteUrl}/#organization`,
                  name: 'Amros Perfumes',
                  alternateName: ['Amros', 'Amros BD', 'Amros Perfumes Bangladesh', 'Amros Perfume'],
                  url: config.siteUrl,
                  logo: `${config.siteUrl}/icon.png`,
                  image: `${config.siteUrl}/icon.png`,
                  description:
                    'Amros Perfumes is a premium fragrance house in Bangladesh offering long-lasting luxury perfumes, pure attar oils, and inspired scents.',
                  telephone: config.contact.phone,
                  email: config.contact.email,
                  address: {
                    '@type': 'PostalAddress',
                    streetAddress: config.contact.streetAddress,
                    addressLocality: config.contact.locality,
                    postalCode: config.contact.postalCode,
                    addressCountry: config.contact.countryCode,
                  },
                  sameAs: [config.social.facebook, config.social.instagram],
                  priceRange: '৳৳',
                },
                {
                  '@type': 'WebSite',
                  '@id': `${config.siteUrl}/#website`,
                  name: 'Amros Perfumes',
                  alternateName: 'Amros Perfume',
                  url: config.siteUrl,
                  inLanguage: 'en-BD',
                  publisher: {
                    '@id': `${config.siteUrl}/#organization`,
                  },
                  potentialAction: {
                    '@type': 'SearchAction',
                    target: `${config.siteUrl}/catalog?q={search_term_string}`,
                    'query-input': 'required name=search_term_string',
                  },
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
