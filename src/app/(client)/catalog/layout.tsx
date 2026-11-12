import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Fragrances | Amros Perfumes Bangladesh',
  description:
    'Explore the complete Amros Perfumes collection in Bangladesh: men’s, women’s and unisex perfumes, pure attar oils, and discovery sets with nationwide cash on delivery.',
  keywords: [
    'amros perfume collection',
    'amros perfumes catalog',
    'buy amros perfume',
    'amros perfume price bangladesh',
    'men perfume bangladesh',
    'women perfume bangladesh',
    'attar bangladesh',
  ],
  alternates: {
    canonical: '/catalog',
  },
  openGraph: {
    type: 'website',
    title: 'All Fragrances | Amros Perfumes Bangladesh',
    description:
      'Explore the complete Amros Perfumes collection in Bangladesh with nationwide cash on delivery.',
    url: '/catalog',
  },
};

export default function CatalogLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
