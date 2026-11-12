'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { formatPrice } from '@/config/app';
import { useProducts } from '@/context/ProductContext';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { useOverlay } from '@/hooks/useOverlay';
import { getEffectivePrice } from '@/lib/pricing';
import { searchProducts } from '@/lib/search';

const POPULAR_SEARCHES = ['Oud', 'Woody', 'Fresh', 'Rose', 'Citrus', 'Attar'];
const MAX_RESULTS = 6;

export function NavSearchOverlay({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const { products } = useProducts();
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebouncedValue(query.trim(), 250);
  const isSearching = query.trim() !== debouncedQuery;

  const results = useMemo(
    () => searchProducts(products, debouncedQuery, MAX_RESULTS),
    [products, debouncedQuery]
  );

  useOverlay(true, onClose);

  const goToCatalogSearch = (term: string) => {
    router.push(`/catalog?q=${encodeURIComponent(term)}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[80] bg-noir-950/40 backdrop-blur-sm" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search products"
        className="surface border-b border-lux shadow-elevated animate-fade-in"
        onClick={(e) => e.stopPropagation()}
        style={{ marginTop: 52 }}
      >
        <div className="container-lux py-4">
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-muted" />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search perfumes, brands, notes..."
              aria-label="Search perfumes, brands, notes"
              className="flex-1 bg-transparent text-lg outline-none text-cream-50 placeholder:text-noir-500"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && query.trim()) goToCatalogSearch(query.trim());
              }}
            />
            <button
              type="button"
              onClick={onClose}
              className="p-1 text-cream-200 hover:text-cream-50"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {isSearching && <p className="text-sm text-muted mt-4">Searching...</p>}

          {!isSearching && results.length > 0 && (
            <div className="mt-4 space-y-2 max-h-80 overflow-y-auto">
              {results.map((p) => (
                <Link
                  key={p.id}
                  href={`/perfume/${p.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-noir-900 transition-colors"
                >
                  <Image
                    src={p.images[0]}
                    alt={p.name}
                    width={48}
                    height={64}
                    className="w-12 h-16 object-cover rounded bg-noir-900 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-cream-100 truncate">{p.name}</p>
                    <p className="text-xs text-muted truncate">
                      {p.brand} · {p.fragranceFamily}
                    </p>
                  </div>
                  <span className="font-serif font-semibold text-gold-400 whitespace-nowrap">
                    {formatPrice(getEffectivePrice(p))}
                  </span>
                </Link>
              ))}
            </div>
          )}

          {!isSearching && debouncedQuery && results.length === 0 && (
            <p className="text-sm text-muted mt-4">
              No results found for &ldquo;{debouncedQuery}&rdquo;
            </p>
          )}

          {!query.trim() && (
            <div className="mt-4">
              <p className="text-xs text-muted uppercase tracking-wider mb-2">Popular searches</p>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((tag) => (
                  <button key={tag} type="button" onClick={() => goToCatalogSearch(tag)} className="chip">
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
