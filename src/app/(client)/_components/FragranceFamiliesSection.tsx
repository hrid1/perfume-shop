import Link from 'next/link';
import {
  Leaf, TreePine, Flower2, Cookie, Flame, Citrus, Droplets, Moon,
} from 'lucide-react';

const FRAGRANCE_FAMILIES = [
  { name: 'Fresh', icon: Leaf, color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  { name: 'Woody', icon: TreePine, color: 'bg-amber-900/20 text-amber-300 border-amber-800/30' },
  { name: 'Floral', icon: Flower2, color: 'bg-pink-500/10 text-pink-300 border-pink-500/20' },
  { name: 'Sweet', icon: Cookie, color: 'bg-yellow-500/10 text-yellow-300 border-yellow-500/20' },
  { name: 'Spicy', icon: Flame, color: 'bg-red-500/10 text-red-400 border-red-500/20' },
  { name: 'Citrus', icon: Citrus, color: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
  { name: 'Aquatic', icon: Droplets, color: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20' },
  { name: 'Oriental', icon: Moon, color: 'bg-purple-500/10 text-purple-300 border-purple-500/20' },
];

export function FragranceFamiliesSection() {
  return (
    <section className="w-full">
      <div className="container-lux">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.16em] text-gold-400 font-medium">
            Fragrance Families
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-noir-50 mt-1">
            Shop by Scent Profile
          </h2>
          <p className="text-sm text-noir-400 mt-2">
            Find your signature scent based on the notes and accords you love.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {FRAGRANCE_FAMILIES.map((family) => {
            const Icon = family.icon;
            return (
              <Link
                key={family.name}
                href={`/catalog?family=${family.name}`}
                className="group flex flex-col items-center p-4 rounded-xl bg-noir-900/50 border border-noir-800 hover:border-gold-400/40 hover:-translate-y-1 transition-all duration-300 text-center"
              >
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center border mb-3 transition-transform duration-300 group-hover:scale-110 ${family.color}`}
                >
                  <Icon className="w-6 h-6 stroke-1.5" />
                </div>
                <span className="text-xs font-medium text-noir-200 group-hover:text-gold-300 transition-colors">
                  {family.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
