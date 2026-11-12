import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock } from 'lucide-react';
import { JOURNAL_POSTS } from '@/data/journalPosts';
import { SectionHeader } from '@/components/ui';

export function JournalSection() {
  return (
    <section className="w-full">
      <div className="container-lux">
        <SectionHeader
          eyebrow="Fragrance Guides"
          title="The Amros Perfumes Journal"
          description="Guides on fragrance notes, longevity, and seasonal choices."
          action={{ href: '/journal', label: 'Browse All Articles' }}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {JOURNAL_POSTS.map((post) => (
            <article
              key={post.slug}
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

                <Link
                  href={`/journal/${post.slug}`}
                  className="mt-4 pt-3 border-t border-noir-800/80 flex items-center gap-1 text-xs text-gold-400 font-medium"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
