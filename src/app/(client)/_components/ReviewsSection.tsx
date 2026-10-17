'use client';

import React from 'react';
import Marquee from 'react-fast-marquee';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

interface ReviewItem {
  name: string;
  location: string;
  product: string;
  rating: number;
  comment: string;
  verified?: boolean;
}

const REVIEWS_ROW_1: ReviewItem[] = [
  {
    name: 'Arif Hossain',
    location: 'Gulshan, Dhaka',
    product: 'Onyx Noir (EDP)',
    rating: 5,
    comment:
      'Unbelievable projection and longevity. Even in the sweltering Dhaka humidity, Onyx Noir held strong past 10 hours. Truly on par with niche European perfume houses.',
    verified: true,
  },
  {
    name: 'Nusrat Jahan',
    location: 'Chattogram',
    product: 'Rose Velvet',
    rating: 5,
    comment:
      "Wore Rose Velvet to my cousin's wedding. Received compliments all evening. The packaging felt like unwrapping luxury jewelry in Paris.",
    verified: true,
  },
  {
    name: 'Mahmud Hasan',
    location: 'Sylhet',
    product: 'NOIRÉ Discovery Set',
    rating: 5,
    comment:
      'Ordering the discovery set first was the best decision. The ৳500 voucher on the full bottle made it incredible value. Now completely hooked on Amber Oud Royale.',
    verified: true,
  },
  {
    name: 'Sadia Islam',
    location: 'Dhanmondi, Dhaka',
    product: 'Amber Oud Royale',
    rating: 5,
    comment:
      'Rich, opulent, and warm without being cloying. Fast 24h delivery inside Dhaka and the Cash on Delivery option gives complete peace of mind.',
    verified: true,
  },
  {
    name: 'Zayan Karim',
    location: 'Banani, Dhaka',
    product: 'Saffron Dusk',
    rating: 5,
    comment:
      'The leather and saffron combination is astonishingly refined. Leaves a hypnotic sillage during evening galas. Exceptional artisanal craftsmanship.',
    verified: true,
  },
];

const REVIEWS_ROW_2: ReviewItem[] = [
  {
    name: 'Tanvir Ahmed',
    location: 'Rajshahi',
    product: 'Midnight Spice',
    rating: 5,
    comment:
      'The Scent Quiz matched me with Midnight Spice and it was 100% spot-on. Cinnamon, cognac and rich tobacco. My everyday winter signature now.',
    verified: true,
  },
  {
    name: 'Fatima Rahman',
    location: 'Uttara, Dhaka',
    product: 'White Musk Attar',
    rating: 5,
    comment:
      'Pure non-alcoholic perfection. Silk-smooth on the skin and clean for prayer and daily wear. Will definitely repurchase.',
    verified: true,
  },
  {
    name: 'Mehedi Hasan',
    location: 'Khulna',
    product: 'Leather Noir',
    rating: 5,
    comment:
      'Smells like entering a private bespoke club in London. Heavy Italian leather, cardamom, and birch smoke. A masterpiece for cold weather.',
    verified: true,
  },
  {
    name: 'Sabrina Chowdhury',
    location: "Cox's Bazar",
    product: 'Ocean Mist',
    rating: 5,
    comment:
      'Clean, crisp aquatic with real depth. Not synthetic at all. It feels like a cool coastal breeze meeting sun-warmed driftwood.',
    verified: true,
  },
  {
    name: 'Asifur Rahman',
    location: 'Mymensingh',
    product: 'Oud Royale Attar',
    rating: 5,
    comment:
      'Just one tiny swipe on the pulse points and the scent easily lasts past 14 hours. The Cambodian agarwood quality is unmatched in Bangladesh.',
    verified: true,
  },
];

function ReviewCard({ review }: { review: ReviewItem }) {
  return (
    <div className="w-[330px] sm:w-[380px] md:w-[420px] mx-3 h-[220px] p-6 rounded-2xl border border-noir-800/80 bg-noir-900/60 hover:bg-noir-900/90 hover:border-gold-400/40 transition-all duration-300 flex flex-col justify-between group shadow-xl">
      <div>
        <div className="flex items-center justify-between mb-3">
          <Quote className="w-6 h-6 text-gold-400/40 group-hover:text-gold-400 transition-colors" />
          <div className="flex items-center gap-1 text-gold-400">
            {Array.from({ length: review.rating }).map((_, idx) => (
              <Star key={idx} className="w-3.5 h-3.5 fill-current" />
            ))}
          </div>
        </div>
        <p className="text-xs sm:text-sm text-noir-200 leading-relaxed italic line-clamp-3">
          &ldquo;{review.comment}&rdquo;
        </p>
      </div>

      <div className="pt-3 border-t border-noir-800/80 flex items-center justify-between text-xs">
        <div>
          <div className="flex items-center gap-1.5">
            <h4 className="font-medium text-noir-100">{review.name}</h4>
            {review.verified && (
              <span title="Verified Connoisseur">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 shrink-0" />
              </span>
            )}
          </div>
          <p className="text-noir-500 text-[11px] font-sans">{review.location}</p>
        </div>
        <span className="text-[11px] text-gold-400/90 font-medium px-2.5 py-0.5 rounded-full bg-gold-400/10 border border-gold-400/20 max-w-[150px] truncate">
          {review.product}
        </span>
      </div>
    </div>
  );
}

export function ReviewsSection() {
  return (
    <section className="w-full relative overflow-hidden py-4">
      <div className="container-lux mb-12">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.2em] text-gold-400 font-medium font-mono">
            Client Voices
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-semibold text-noir-50 mt-1">
            Stories from the NOIRÉ Community
          </h2>
          <p className="text-sm text-noir-400 mt-2">
            Real feedback from fragrance connoisseurs and collectors across Bangladesh.
          </p>
        </div>
      </div>

      {/* Marquee Wrapper with Smooth Left & Right Edge Vignettes */}
      <div className="relative w-full overflow-hidden space-y-5">
        {/* Left & Right Fade Masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-noir-950 via-noir-950/80 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-noir-950 via-noir-950/80 to-transparent z-10" />

        {/* Row 1: Right to Left */}
        <Marquee
          direction="left"
          speed={38}
          pauseOnHover={true}
          autoFill={true}
          className="py-1 overflow-hidden"
        >
          {REVIEWS_ROW_1.map((review, i) => (
            <ReviewCard key={`r1-${i}`} review={review} />
          ))}
        </Marquee>

        {/* Row 2: Left to Right */}
        <Marquee
          direction="right"
          speed={35}
          pauseOnHover={true}
          autoFill={true}
          className="py-1 overflow-hidden"
        >
          {REVIEWS_ROW_2.map((review, i) => (
            <ReviewCard key={`r2-${i}`} review={review} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
