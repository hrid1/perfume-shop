import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export function DiscoverySetsSection() {
  return (
    <section className="container-lux">
      <div className="bg-noir-900 border border-noir-800 rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-8 items-center shadow-2xl">
        <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full min-h-[360px] bg-noir-950">
          <Image
            src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1200&auto=format&fit=crop"
            alt="NOIRÉ Discovery Coffret"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover filter brightness-90 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-noir-950 via-transparent to-transparent lg:hidden" />
        </div>

        <div className="p-8 sm:p-12 lg:pr-14">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-gold-400">
            Try Before You Commit
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-noir-50 mt-2 mb-4 leading-snug">
            NOIRÉ Discovery Sets &amp; Coffrets
          </h2>
          <p className="text-sm text-noir-300 mb-6 leading-relaxed font-light">
            Experience five of our most celebrated master perfumes in travel-ready 2ml glass
            atomizers. Every set includes a complimentary{' '}
            <strong>৳500 voucher</strong> redeemable on your subsequent full-size bottle.
          </p>

          <ul className="space-y-3 mb-8 text-xs sm:text-sm text-noir-300">
            <li className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
              <span>5 curated 2ml decants across woody, oriental &amp; floral families</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
              <span>Includes ৳500 gift coupon towards any 50ml or 100ml flacon</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
              <span>Delivered anywhere in Bangladesh within 48-72 hours</span>
            </li>
          </ul>

          <Link href="/catalog?category=discovery-sets" className="btn-gold text-xs px-8 py-3.5">
            <span>Explore Discovery Coffrets</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
