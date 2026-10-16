import { Star, Quote } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Arif Hossain',
    location: 'Gulshan, Dhaka',
    product: 'Onyx Noir (EDP)',
    rating: 5,
    comment:
      'Unbelievable projection and longevity. Even in the sweltering Dhaka humidity, Onyx Noir held strong past 10 hours. Truly on par with niche European houses.',
  },
  {
    name: 'Nusrat Jahan',
    location: 'Chattogram',
    product: 'Rose Velvet',
    rating: 5,
    comment:
      "Wore Rose Velvet to my cousin's wedding. Received compliments all evening. The packaging felt like unwrapping luxury jewelry in Paris.",
  },
  {
    name: 'Mahmud Hasan',
    location: 'Sylhet',
    product: 'NOIRÉ Discovery Set',
    rating: 5,
    comment:
      'Ordering the discovery set first was the best decision. The ৳500 voucher on the full bottle made it incredible value. Now hooked on Amber Oud Royale.',
  },
  {
    name: 'Sadia Islam',
    location: 'Dhanmondi, Dhaka',
    product: 'Amber Oud Royale',
    rating: 5,
    comment:
      'Rich, opulent, and warm without being cloying. Fast 24h delivery inside Dhaka and the Cash on Delivery option gives complete peace of mind.',
  },
  {
    name: 'Tanvir Ahmed',
    location: 'Rajshahi',
    product: 'Midnight Spice',
    rating: 5,
    comment:
      'The Scent Quiz matched me with Midnight Spice and it was 100% spot-on. Cinnamon, cognac and rich tobacco. My everyday winter signature now.',
  },
  {
    name: 'Fatima Rahman',
    location: 'Uttara, Dhaka',
    product: 'White Musk Attar',
    rating: 5,
    comment:
      'Pure non-alcoholic perfection. Silk-smooth on the skin and clean for prayer and daily wear. Will definitely repurchase.',
  },
];

export function ReviewsSection() {
  return (
    <section className="container-lux">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-gold-400">
          Client Voices
        </span>
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-noir-50 mt-1">
          Stories from the NOIRÉ Community
        </h2>
        <p className="text-sm text-noir-400 mt-2">
          Real feedback from connoisseurs and fragrance collectors across Bangladesh.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {REVIEWS.map((review, i) => (
          <div
            key={i}
            className="card-lux p-6 border border-noir-800/80 bg-noir-900/50 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <Quote className="w-7 h-7 text-gold-400/40" />
                <div className="flex items-center gap-1 text-gold-400">
                  {Array.from({ length: review.rating }).map((_, idx) => (
                    <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-xs sm:text-sm text-noir-200 leading-relaxed italic mb-6">
                &ldquo;{review.comment}&rdquo;
              </p>
            </div>

            <div className="pt-4 border-t border-noir-800/80 flex items-center justify-between text-xs">
              <div>
                <h4 className="font-medium text-noir-100">{review.name}</h4>
                <p className="text-noir-500 text-[11px]">{review.location}</p>
              </div>
              <span className="text-[10px] font-mono text-gold-400/80 px-2 py-0.5 rounded bg-gold-400/10 border border-gold-400/20">
                {review.product}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
