'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ShoppingBag, RotateCcw } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice } from '@/config/app';

export interface ScoredProduct {
  product: Product;
  score: number;
  matchPercentage: number;
}

interface QuizResultsSectionProps {
  results: ScoredProduct[];
  onAddToCart: (product: Product) => void;
  onRestart: () => void;
}

export function QuizResultsSection({
  results,
  onAddToCart,
  onRestart,
}: QuizResultsSectionProps) {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-300 font-mono text-xs uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>CONSULTATION COMPLETE</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-noir-50 mb-3">
          Your Bespoke Scent Matches
        </h1>
        <p className="text-sm text-noir-300">
          Based on your olfactory taste and daily occasions, our perfumer has curated these master signatures for you:
        </p>
      </div>

      <div className="space-y-6">
        {results.map(({ product, matchPercentage }, index) => {
          const currentPrice = product.discountPrice || product.price;
          return (
            <div
              key={product.id}
              className={`card-lux p-6 border rounded-2xl flex flex-col md:flex-row items-center gap-6 ${
                index === 0
                  ? 'border-gold-400/50 bg-gradient-to-r from-noir-900 via-noir-900 to-noir-950 shadow-2xl ring-1 ring-gold-400/30'
                  : 'border-noir-800 bg-noir-900/60'
              }`}
            >
              <div className="relative w-36 h-44 rounded-xl overflow-hidden bg-noir-950 shrink-0">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="144px"
                  className="object-cover filter brightness-90"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-gold-400 text-noir-950 font-bold font-mono text-[10px]">
                  {matchPercentage}% Match
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-gold-400">
                      {product.fragranceFamily} &bull; {product.concentration}
                    </span>
                    <h3 className="font-serif text-2xl font-semibold text-noir-50">
                      {product.name}
                    </h3>
                  </div>
                  <div className="font-mono text-xl font-bold text-gold-300">
                    {formatPrice(currentPrice)}
                  </div>
                </div>

                <p className="text-xs text-noir-300 mb-3 italic font-serif">
                  &ldquo;{product.scentDescription}&rdquo;
                </p>

                <div className="grid grid-cols-3 gap-2 text-center bg-noir-950/70 p-2.5 rounded-lg border border-noir-800/80 mb-4 text-[11px]">
                  <div>
                    <span className="text-noir-500 block text-[9px] uppercase">Top Notes</span>
                    <span className="text-noir-200 line-clamp-1">{product.topNotes[0]}</span>
                  </div>
                  <div>
                    <span className="text-noir-500 block text-[9px] uppercase">Heart</span>
                    <span className="text-noir-200 line-clamp-1">{product.middleNotes[0]}</span>
                  </div>
                  <div>
                    <span className="text-noir-500 block text-[9px] uppercase">Longevity</span>
                    <span className="text-gold-300 font-mono">{product.longevity}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <button
                    onClick={() => onAddToCart(product)}
                    className="btn-gold text-xs py-2.5 px-5 flex items-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add {product.sizes[0]?.size} to Bag</span>
                  </button>
                  <Link
                    href={`/catalog?highlight=${product.slug}`}
                    className="btn-outline text-xs py-2.5 px-5"
                  >
                    View Full Details
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center pt-6">
        <button
          onClick={onRestart}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-noir-400 hover:text-gold-300 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Retake the Consultation Quiz</span>
        </button>
      </div>
    </div>
  );
}
