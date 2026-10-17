import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock } from 'lucide-react';

const JOURNAL_POSTS = [
  {
    title: 'Extrait vs Eau de Parfum: What Concentration Means',
    category: 'Guide',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop',
    excerpt: 'Understanding oil concentrations, longevity, and how high-potency perfumes interact with skin.',
  },
  {
    title: 'Fragrance Longevity in Tropical Climates',
    category: 'Tips',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=800&auto=format&fit=crop',
    excerpt: 'Practical advice on pulse points, moisture prep, and fabrics to keep your scent projecting all day.',
  },
  {
    title: 'The Art of Natural Attar & Aged Oud Oils',
    category: 'Heritage',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?q=80&w=800&auto=format&fit=crop',
    excerpt: 'Traditional hydro-distillation and natural aging: the craftsmanship behind authentic attars.',
  },
];

export function JournalSection() {
  return (
    <section className="w-full">
      <div className="container-lux">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-noir-800">
          <div>
            <span className="text-xs uppercase tracking-[0.16em] text-gold-400 font-medium">
              Fragrance Guides
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-noir-50 mt-1">
              The NOIRÉ Journal
            </h2>
            <p className="text-sm text-noir-400 mt-1">
              Guides on fragrance notes, longevity, and seasonal choices.
            </p>
          </div>
          <Link
            href="/catalog"
            className="mt-4 md:mt-0 text-xs uppercase tracking-wider text-gold-400 hover:text-gold-300 flex items-center gap-1 group font-medium"
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
                  <div className="flex items-center justify-between text-xs text-gold-400 mb-2 font-medium">
                    <span className="uppercase tracking-wider">{post.category}</span>
                    <span className="flex items-center gap-1 text-noir-500 font-normal">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-medium text-noir-100 group-hover:text-gold-300 transition-colors leading-snug mb-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-noir-400 line-clamp-2 leading-relaxed font-light">{post.excerpt}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-noir-800/80 flex items-center gap-1 text-xs text-gold-400 font-medium">
                  <span>Read Article</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
