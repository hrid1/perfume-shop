import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import type { Metadata } from 'next';
import { JOURNAL_POSTS } from '@/data/journalPosts';

export const metadata: Metadata = {
  title: 'Fragrance Guides & Perfume Journal',
  description:
    'Read fragrance guides, perfume tips, and stories about attars, oud, and choosing scents for Bangladesh’s climate from Amros Perfumes.',
  alternates: {
    canonical: '/journal',
  },
};

export default function JournalPage() {
  return (
    <div className="container-lux py-12 sm:py-16 md:py-20">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-wider text-noir-400 transition-colors hover:text-gold-400"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Home
      </Link>

      <header className="mb-10 border-b border-noir-800 pb-6 sm:mb-12">
        <span className="text-xs font-medium uppercase tracking-[0.16em] text-gold-400">
          Fragrance Guides
        </span>
        <h1 className="mt-2 font-serif text-4xl font-semibold text-noir-50 sm:text-5xl">
          The Amros Perfumes Journal
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-noir-400">
          Explore fragrance guides, practical tips, and stories behind the art of perfumery.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {JOURNAL_POSTS.map((post) => (
          <article
            key={post.slug}
            className="card-lux flex flex-col overflow-hidden border border-noir-800 bg-noir-900/60"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-noir-950">
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <div className="mb-3 flex items-center justify-between text-xs font-medium text-gold-400">
                <span className="uppercase tracking-wider">{post.category}</span>
                <span className="flex items-center gap-1 font-normal text-noir-500">
                  <Clock className="h-3 w-3" />
                  {post.readTime}
                </span>
              </div>
              <h2 className="font-serif text-xl font-medium leading-snug text-noir-100">
                {post.title}
              </h2>
              <p className="mt-2 text-sm font-light leading-relaxed text-noir-400">
                {post.excerpt}
              </p>
              <Link
                href={`/journal/${post.slug}`}
                className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-gold-400 transition-colors hover:text-gold-300"
              >
                Read Article
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
