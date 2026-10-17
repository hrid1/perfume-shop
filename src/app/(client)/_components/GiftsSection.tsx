import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const GIFT_OCCASIONS = [
  {
    title: 'Eid Al-Fitr & Adha',
    desc: 'The timeless royal gift of pure oud and concentrated attars for festive reunions.',
    image: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: 'Weddings & Anniversaries',
    desc: 'Bespoke romantic flacons to mark monumental milestones and unforgettable memories.',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: 'Birthdays & Celebrations',
    desc: 'Signature perfumes that make their milestone truly extraordinary and celebrated.',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: 'Executive Corporate',
    desc: 'Commanding signature scents designed to impress distinguished partners.',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop',
  },
];

export function GiftsSection() {
  return (
    <section className="w-full">
      <div className="container-lux">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.16em] text-gold-400 font-medium">
            Gifting &amp; Sets
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-noir-50 mt-1">
            Luxury Fragrance Gifts
          </h2>
          <p className="text-sm text-noir-400 mt-2">
            Every order arrives in our signature dark packaging, ready for gifting.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-6">
          {GIFT_OCCASIONS.map((occasion) => (
            <Link
              key={occasion.title}
              href="/catalog"
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden border border-noir-800 shadow-xl"
            >
              <Image
                src={occasion.image}
                alt={occasion.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-75 contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noir-950 via-noir-950/40 to-transparent" />
              <div className="absolute inset-x-5 bottom-5 z-10">
                <h3 className="font-serif text-xl font-medium text-cream-50 group-hover:text-gold-300 transition-colors mb-1">
                  {occasion.title}
                </h3>
                <p className="text-xs text-noir-300 line-clamp-2 font-light">{occasion.desc}</p>
                <div className="mt-3 flex items-center gap-1 text-[11px] text-gold-400 uppercase tracking-wider font-medium">
                  <span>Explore Gifts</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
