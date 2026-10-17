import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '@/data/mockData';
import { ProductCard } from '@/components/ProductCard';

export function TrendingSection() {
  const trendingProducts = PRODUCTS.filter((p) => p.trending).slice(0, 4);

  return (
    <section className="w-full">
      <div className="container-lux">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-noir-800">
          <div>
            <span className="text-xs uppercase tracking-[0.15em] text-gold-400 font-medium">
              Trending Blends
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-noir-50 mt-1">
              Popular Fragrances
            </h2>
            <p className="text-sm text-noir-400 mt-1">
              The season&apos;s most sought-after perfumes and rare attars.
            </p>
          </div>
          <Link
            href="/catalog?filter=trending"
            className="mt-4 md:mt-0 text-xs uppercase tracking-wider text-gold-400 hover:text-gold-300 flex items-center gap-1 group font-medium"
          >
            <span>View All Trending</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
