import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '@/data/mockData';
import { ProductCard } from '@/components/ProductCard';

export function BestSellersSection() {
  const bestSellers = PRODUCTS.filter((p) => p.bestSeller).slice(0, 4);

  return (
    <section className="container-lux">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-noir-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-gold-400">
            The Sovereign Scents
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-noir-50 mt-1">
            Best Sellers
          </h2>
          <p className="text-sm text-noir-400 mt-1">
            Celebrated flacons adored by thousands of connoisseurs across Bangladesh.
          </p>
        </div>
        <Link
          href="/catalog?filter=bestseller"
          className="mt-4 md:mt-0 text-xs font-mono uppercase tracking-widest text-gold-400 hover:text-gold-300 flex items-center gap-1 group"
        >
          <span>View All Bestsellers</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {bestSellers.map((product, idx) => (
          <ProductCard key={product.id} product={product} priority={idx < 2} />
        ))}
      </div>
    </section>
  );
}
