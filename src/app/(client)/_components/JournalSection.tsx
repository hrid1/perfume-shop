import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock } from 'lucide-react';

const JOURNAL_POSTS = [
  {
    title: 'Extrait vs EDP vs EDT: Deciphering Oil Concentrations',
    category: 'Haute Guides',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=800&auto=format&fit=crop',
    excerpt: 'Why concentration ratios dictate sillage, longevity, and how top notes evolve over the day.',
  },
  {
    title: 'Mastering Fragrance Longevity in Tropical Bangladeshi Heat',
    category: 'Pro Tips',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=800&auto=format&fit=crop',
    excerpt: 'Pulse-point hydration and layering techniques to ensure your scent projects for 12+ hours.',
  },
  {
    title: 'The Sacred Heritage of Natural Dehn Al Oud & Attar',
    category: 'Heritage',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?q=80&w=800&auto=format&fit=crop',
    excerpt: 'From century-old Assam distillation pots to modern luxury bottles: the golden elixir story.',
  },
];

export function JournalSection() {
  return (
    <section className="container-lux">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-noir-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-gold-400">
            The Olfactory Compendium
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-noir-50 mt-1">
            Perfume Journal &amp; Guides
          </h2>
          <p className="text-sm text-noir-400 mt-1">
            Expert advice on notes, wearability, and layering in Bangladesh&apos;s weather.
          </p>
        </div>
        <Link
          href="/catalog"
          className="mt-4 md:mt-0 text-xs font-mono uppercase tracking-widest text-gold-400 hover:text-gold-300 flex items-center gap-1 group"
        >
          <span>Browse All Articles</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {JOURNAL_POSTS.map((post) => (
          <div
            key={post.title}
            className="group card-lux overflow-hidden border border-noir-800 bg-noir-900/60 flex flex-col justify-between"
          >
            <div className="relative aspect-[16/10] bg-noir-950 overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-85"
              />
            </div>

            <div className="p-5 flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-gold-400 mb-2">
                  <span className="uppercase tracking-widest">{post.category}</span>
                  <span className="flex items-center gap-1 text-noir-500">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-medium text-noir-100 group-hover:text-gold-300 transition-colors leading-snug mb-2">
                  {post.title}
                </h3>
                <p className="text-xs text-noir-400 line-clamp-2 leading-relaxed">{post.excerpt}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-noir-800/80 flex items-center gap-1 text-xs font-mono text-gold-400">
                <span>Read Article</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
