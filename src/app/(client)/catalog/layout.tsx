import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop Perfumes, Attars & Fragrance Sets',
  description:
    'Browse the Amros Perfumes collection of men’s, women’s and unisex fragrances, attars, and discovery sets available in Bangladesh.',
  alternates: {
    canonical: '/catalog',
  },
  openGraph: {
    type: 'website',
    title: 'Shop Perfumes, Attars & Fragrance Sets',
    description:
      'Browse men’s, women’s and unisex fragrances, attars, and discovery sets at Amros Perfumes.',
    url: '/catalog',
  },
};

export default function CatalogLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
