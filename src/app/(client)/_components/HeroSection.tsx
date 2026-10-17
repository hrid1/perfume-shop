import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-black text-center border-b border-noir-800/60 px-4">

      {/* Background — Ken-Burns slow scale */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/7850600/pexels-photo-7850600.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Find Your Signature"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center hero-bg-scale brightness-[0.55] contrast-[1.05]"
        />
        {/* Multi-layer overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-4xl mx-auto pt-6 pb-20 sm:pt-8">

        {/* Eyebrow — delay 0.1s */}
        <p
          className="hero-fade-in text-xs sm:text-sm font-medium tracking-[0.35em] uppercase text-gold-400 mb-5"
          style={{ animationDelay: '0.1s' }}
        >
          Premium Fragrance
        </p>

        {/* Headline — delay 0.2s */}
        <h1
          className="hero-fade-up font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[5.5rem] font-semibold tracking-tight text-white leading-[1.06] mb-5"
          style={{ animationDelay: '0.2s' }}
        >
          Find Your Signature.
        </h1>

        {/* Subtitle — delay 0.4s */}
        <p
          className="hero-fade-up text-base sm:text-lg md:text-xl text-neutral-300 font-light max-w-xl mx-auto mb-10 leading-relaxed"
          style={{ animationDelay: '0.4s' }}
        >
          Fragrances crafted to become part of your identity.
        </p>

        {/* CTAs — delay 0.6s */}
        <div
          className="hero-fade-up flex flex-row items-center justify-center gap-4"
          style={{ animationDelay: '0.6s' }}
        >
          <Link
            href="/catalog?category=men"
            className="px-8 sm:px-10 py-3 sm:py-3.5 rounded-full bg-gold-500 hover:bg-gold-400 text-noir-950 font-semibold text-sm sm:text-base tracking-wide transition-all duration-200 shadow-lg shadow-gold-500/20 hover:scale-[1.03] hover:shadow-gold-400/30"
          >
            Shop Men
          </Link>
          <Link
            href="/catalog?category=women"
            className="px-8 sm:px-10 py-3 sm:py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-medium text-sm sm:text-base tracking-wide border border-white/25 backdrop-blur-sm transition-all duration-200 hover:scale-[1.03]"
          >
            Shop Women
          </Link>
        </div>
      </div>

      {/* Scroll Chevron — bounces infinitely */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1">
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-medium">Scroll</span>
        <ChevronDown className="hero-chevron w-5 h-5 text-gold-400" />
      </div>
    </section>
  );
}
