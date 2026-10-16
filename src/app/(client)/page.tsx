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
