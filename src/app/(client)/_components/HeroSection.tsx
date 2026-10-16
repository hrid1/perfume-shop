import Link from 'next/link';
import Image from 'next/image';

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden bg-black text-center border-b border-noir-800/80 px-4">
      {/* Background Perfume Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="https://images.pexels.com/photos/7850600/pexels-photo-7850600.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Find Your Signature"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-85 filter contrast-105"
        />
        {/* Dark shadow overlay for text readability */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30" />
      </div>

      {/* Hero Content */}
      <div className="container-lux relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center pt-6 pb-8 sm:pt-8 sm:pb-12">
        {/* Eyebrow */}
        <p className="text-xs sm:text-sm font-medium tracking-[0.3em] uppercase text-[#c89b3c] mb-3">
          PREMIUM FRAGRANCE
        </p>

        {/* Headline */}
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[5.5rem] font-normal tracking-tight text-white leading-[1.08] mb-4">
          Find Your Signature.
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-neutral-300 font-light max-w-xl mx-auto mb-8 sm:mb-9 leading-relaxed">
          Fragrances crafted to become part of your identity.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-row items-center justify-center gap-4">
          <Link
            href="/men"
            className="px-7 sm:px-9 py-3 sm:py-3.5 rounded-full bg-[#b8862d] hover:bg-[#a67724] text-white font-medium text-sm sm:text-base tracking-wide transition-all duration-200 shadow-lg shadow-black/50 hover:scale-[1.02]"
          >
            Shop Men
          </Link>
          <Link
            href="/women"
            className="px-7 sm:px-9 py-3 sm:py-3.5 rounded-full bg-[#2a2d36]/90 hover:bg-[#343844] text-white font-medium text-sm sm:text-base tracking-wide border border-[#444856] backdrop-blur-sm transition-all duration-200 shadow-lg shadow-black/50 hover:scale-[1.02]"
          >
            Shop Women
          </Link>
        </div>
      </div>
    </section>
  );
}
