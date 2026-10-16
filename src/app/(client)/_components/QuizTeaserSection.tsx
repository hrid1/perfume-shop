import Link from 'next/link';
import { Sparkles, Compass } from 'lucide-react';

export function QuizTeaserSection() {
  return (
    <section className="container-lux">
      <div className="bg-gradient-to-br from-noir-900 via-noir-900/90 to-noir-950 border border-gold-400/20 rounded-3xl p-8 sm:p-14 relative overflow-hidden shadow-2xl text-center max-w-4xl mx-auto">
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="inline-flex p-3 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-300 mb-6">
          <Compass className="w-8 h-8 stroke-1 text-gold-400" />
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-noir-50 mb-4">
          Unsure of your signature aroma?
        </h2>
        <p className="text-sm sm:text-base text-noir-300 max-w-xl mx-auto mb-8 font-light leading-relaxed">
          Our algorithmic Olfactory Engine analyzes your personal chemistry, occasion preferences,
          and favorite scent notes to curate your bespoke fragrance match.
        </p>
        <Link href="/quiz" className="btn-gold px-8 py-3.5 text-sm tracking-widest">
          <span>Launch Fragrance Finder Quiz</span>
          <Sparkles className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
