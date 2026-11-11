import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock } from 'lucide-react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { JOURNAL_POSTS } from '@/data/journalPosts';

export function generateStaticParams() {
  return JOURNAL_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = JOURNAL_POSTS.find((article) => article.slug === slug);

  if (!post) {
    return {
      title: 'Article not found',
      robots: { index: false, follow: true },
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/journal/${post.slug}`,
    },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function JournalArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = JOURNAL_POSTS.find((article) => article.slug === slug);

  if (!post) notFound();

  return (
    <article className="container-lux max-w-4xl py-12 sm:py-16 md:py-20">
      <Link
        href="/journal"
        className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-wider text-noir-400 transition-colors hover:text-gold-400"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        All Articles
      </Link>

      <header className="mb-8">
        <div className="mb-4 flex items-center gap-4 text-xs font-medium text-gold-400">
          <span className="uppercase tracking-wider">{post.category}</span>
          <span className="flex items-center gap-1 text-noir-500 font-normal">
            <Clock className="h-3 w-3" />
            {post.readTime}
          </span>
        </div>
        <h1 className="font-serif text-3xl font-semibold leading-tight text-noir-50 sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-noir-400">
          {post.excerpt}
        </p>
      </header>

      <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-xl border border-noir-800 bg-noir-900">
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 896px"
          className="object-cover"
        />
      </div>

      <div className="mx-auto max-w-2xl space-y-5 text-base leading-8 text-noir-300">
        {post.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-12 border-t border-noir-800 pt-6">
        <Link
          href="/journal"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-gold-400 transition-colors hover:text-gold-300"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          More from the Journal
        </Link>
      </div>
    </article>
  );
}
