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
  ExclusivePrivilegesSection,
  HomepageWhatsAppButton,
} from './_components';

export const metadata: Metadata = {
  title: {
    absolute: 'Amros Perfumes | Premium Long-Lasting Perfumes in Bangladesh',
  },
  description:
    'Official website of Amros Perfumes. Shop premium long-lasting perfumes, luxury inspired fragrances, pure attars, and discovery sets online in Bangladesh with cash on delivery.',
  keywords: [
    'amros perfume',
    'amros perfumes',
    'amros',
    'amros bd',
    'amros perfume bangladesh',
    'amros perfume barisal',
    'amros perfume price in bangladesh',
    'buy perfume online bangladesh',
    'long lasting perfume bangladesh',
    'attar bangladesh',
    'perfume shop bangladesh',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: 'Amros Perfumes',
    title: 'Amros Perfumes | Premium Long-Lasting Perfumes in Bangladesh',
    description:
      'Official website of Amros Perfumes. Shop premium long-lasting perfumes, luxury inspired fragrances, and pure attars online in Bangladesh.',
    url: 'https://www.amrosperfumes.com',
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
      <ExclusivePrivilegesSection />
      <HomepageWhatsAppButton />
    </div>
  );
}
