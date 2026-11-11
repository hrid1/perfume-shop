import type { Metadata } from 'next';
import {
  HeroSection,
  BestSellersSection,
  QuizTeaserSection,
  FragranceFamiliesSection,
  DiscoverySetsSection,
  TrendingSection,
  GiftsSection,
  ReviewsSection,
  JournalSection,
} from './_components';

export const metadata: Metadata = {
  title: 'Buy Perfumes Online in Bangladesh',
  description:
    'Discover men’s, women’s and unisex perfumes, attars, and fragrance discovery sets at Amros Perfumes, your online perfume store in Bangladesh.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    title: 'Buy Perfumes Online in Bangladesh',
    description:
      'Discover men’s, women’s and unisex perfumes, attars, and fragrance discovery sets at Amros Perfumes.',
    url: '/',
  },
};

export default function HomePage() {
  return (
    <div className="flex flex-col gap-12 sm:gap-16 md:gap-24 pb-20">
      <HeroSection />
      <BestSellersSection />
      <QuizTeaserSection />
      <FragranceFamiliesSection />
      <DiscoverySetsSection />
      <TrendingSection />
      <GiftsSection />
      <ReviewsSection />
      <JournalSection />
    </div>
  );
}
