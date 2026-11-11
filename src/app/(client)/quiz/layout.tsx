import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Perfume Finder Quiz',
  description:
    'Find fragrance recommendations based on your preferred scent family, occasion, and budget with the Amros Perfumes scent quiz.',
  alternates: {
    canonical: '/quiz',
  },
  openGraph: {
    type: 'website',
    title: 'Perfume Finder Quiz',
    description:
      'Get fragrance recommendations based on your scent preferences, occasion, and budget.',
    url: '/quiz',
  },
};

export default function QuizLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
