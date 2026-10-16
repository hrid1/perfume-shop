'use client';

import React, { useState, useEffect, useRef, ComponentProps } from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import { productsService } from '@/services';
import { formatPrice } from '@/config/app';
import type { Product } from '@/types';
import { Drawer } from './Modal';

// Next.js Link adapter supporting both `to` and `href`
function Link({
  to,
  href,
  ...props
}: Omit<ComponentProps<typeof NextLink>, 'href'> & { to?: string; href?: string }) {
  const target = href || to || '/';
  return <NextLink href={target} {...props} />;
}

const navLinks = [
  { label: 'Men', to: '/catalog?category=men' },
  { label: 'Women', to: '/catalog?category=women' },
  { label: 'Unisex', to: '/catalog?category=unisex' },
  { label: 'Attar', to: '/catalog?category=attar' },
  { label: 'Discovery Sets', to: '/catalog?category=discovery-sets' },
  { label: 'New Arrivals', to: '/catalog?filter=new' },
  { label: 'Best Sellers', to: '/catalog?filter=bestseller' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [searching, setSearching] = useState(false);
  const { totalItems, openCart } = useCart();
  const { count: wishCount } = useWishlist();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchRef = useRef<HTMLInputElement>(null);

  const isLinkActive = (linkTo: string) => {
    if (pathname !== '/catalog') {
      return pathname === linkTo;
    }
    const currentCategory = searchParams ? searchParams.get('category') : null;
    const currentFilter = searchParams ? searchParams.get('filter') : null;

    if (linkTo === '/catalog') {
      return !currentCategory && !currentFilter;
    }
    if (linkTo.includes('category=')) {
      const targetCat = linkTo.split('category=')[1]?.split('&')[0];
      return currentCategory === targetCat;
    }
    if (linkTo.includes('filter=')) {
      const targetFilter = linkTo.split('filter=')[1]?.split('&')[0];
      return currentFilter === targetFilter;
    }
    return false;
  };

  const navigate = (path: string) => {
    router.push(path);
  };

  const location = { pathname };

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSearchResults([]);
      return;
    }
    setSearching(true);
    const timer = setTimeout(async () => {
      const results = await productsService.search(searchQuery);
      setSearchResults(results.slice(0, 6));
      setSearching(false);
    }, 250);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-noir-900 text-cream-50 text-xs md:text-sm py-2 text-center px-4">
        <p className="font-medium tracking-wide">
          Free Delivery on Orders Over ৳3,000 <span className="hidden sm:inline">|</span>{' '}
          <span className="sm:hidden"> · </span> Cash on Delivery Available
        </p>
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-noir-950/95 shadow-elevated' : 'bg-noir-950'
        } text-cream-50 border-b border-noir-800`}
        style={{ top: 0 }}
      >
        <nav className="container-lux">
          <div className="flex items-center justify-between h-16 min-h-16">
            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 text-cream-100 hover:text-gold-400 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <span className="font-serif text-2xl md:text-3xl font-semibold tracking-tight text-cream-50">
                NOIR<span className="text-gold-500">É</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-6 flex-1 justify-center">
              {navLinks.map((link) => {
                const active = isLinkActive(link.to);
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`text-sm font-medium transition-colors relative group py-1 ${
                      active ? 'text-gold-400 font-semibold' : 'text-cream-200 hover:text-gold-400'
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-gold-400 transition-all duration-300 ${
                        active ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 md:gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-cream-100 hover:text-gold-400 transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <Link
                to="/wishlist"
                className="p-2 text-cream-100 hover:text-gold-400 transition-colors relative"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishCount > 0 && <CountBadge count={wishCount} />}
              </Link>
              <button
                type="button"
                onClick={() => {
                  if (openCart) {
                    openCart();
                  } else {
                    navigate('/cart');
                  }
                }}
                className="p-2 text-cream-100 hover:text-gold-400 transition-colors relative cursor-pointer"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && <CountBadge count={totalItems} />}
              </button>
              <Link
                to={isAuthenticated ? '/account' : '/login'}
                className="p-2 text-cream-100 hover:text-gold-400 transition-colors"
                aria-label="Account"
              >
                <User className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Search Overlay */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[80] bg-noir-950/40 backdrop-blur-sm"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="surface border-b border-lux shadow-elevated animate-fade-in"
            onClick={(e) => e.stopPropagation()}
            style={{ marginTop: 52 }}
          >
            <div className="container-lux py-4">
              <div className="flex items-center gap-3">
                <Search className="w-5 h-5 text-muted" />
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search perfumes, brands, notes..."
                  className="flex-1 bg-transparent text-lg outline-none text-cream-50 placeholder:text-noir-500"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      navigate(`/catalog?q=${encodeURIComponent(searchQuery.trim())}`);
                      setSearchOpen(false);
                    }
                  }}
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="p-1 text-cream-200 hover:text-cream-50"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {searching && <p className="text-sm text-muted mt-4">Searching...</p>}

              {!searching && searchResults.length > 0 && (
                <div className="mt-4 space-y-2 max-h-80 overflow-y-auto">
                  {searchResults.map((p) => (
                    <Link
                      key={p.id}
                      to={`/perfume/${p.slug}`}
                      onClick={() => setSearchOpen(false)}
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
                        {formatPrice(p.discountPrice ?? p.price)}
                      </span>
                    </Link>
                  ))}
                </div>
              )}

              {!searching && searchQuery && searchResults.length === 0 && (
                <p className="text-sm text-muted mt-4">No results found for &ldquo;{searchQuery}&rdquo;</p>
              )}

              {!searchQuery && (
                <div className="mt-4">
                  <p className="text-xs text-muted uppercase tracking-wider mb-2">
                    Popular searches
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Oud', 'Woody', 'Fresh', 'Rose', 'Citrus', 'Attar'].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => {
                          navigate(`/catalog?q=${encodeURIComponent(tag)}`);
                          setSearchOpen(false);
                        }}
                        className="chip"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu Drawer */}
      <Drawer open={menuOpen} onClose={() => setMenuOpen(false)} side="left" width="320px">
        <div className="p-4 flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <span className="font-serif text-2xl font-semibold text-cream-50">
              NOIR<span className="text-gold-500">É</span>
            </span>
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 text-cream-200 hover:text-cream-50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-1 overflow-y-auto flex-1">
            {navLinks.map((link) => {
              const active = isLinkActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center justify-between py-3 px-3 rounded-lg transition-colors ${
                    active
                      ? 'bg-gold-500/10 text-gold-400 font-semibold border-l-2 border-gold-400'
                      : 'text-cream-200 hover:text-gold-400 hover:bg-noir-900'
                  }`}
                >
                  <span className="font-medium">{link.label}</span>
                  <ChevronRight className={`w-4 h-4 ${active ? 'text-gold-400' : 'text-muted'}`} />
                </Link>
              );
            })}
          </div>

          <div className="mt-6 pt-6 border-t border-lux space-y-1 shrink-0">
            <Link
              to="/quiz"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between py-3 px-3 rounded-lg hover:bg-noir-900 text-cream-200 hover:text-gold-400 transition-colors"
            >
              <span className="font-medium">Perfume Quiz</span>
              <ChevronRight className="w-4 h-4 text-muted" />
            </Link>
            <Link
              to="/wishlist"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between py-3 px-3 rounded-lg hover:bg-noir-900 text-cream-200 hover:text-gold-400 transition-colors"
            >
              <span className="font-medium">Wishlist</span>
              <ChevronRight className="w-4 h-4 text-muted" />
            </Link>
            <Link
              to={isAuthenticated ? '/account' : '/login'}
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between py-3 px-3 rounded-lg hover:bg-noir-900 text-cream-200 hover:text-gold-400 transition-colors"
            >
              <span className="font-medium">
                {isAuthenticated ? 'My Account' : 'Login / Register'}
              </span>
              <ChevronRight className="w-4 h-4 text-muted" />
            </Link>
            <Link
              to="/admin"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between py-3 px-3 rounded-lg hover:bg-noir-900 text-cream-200 hover:text-gold-400 transition-colors"
            >
              <span className="font-medium text-muted">Admin</span>
              <ChevronRight className="w-4 h-4 text-muted" />
            </Link>
          </div>
        </div>
      </Drawer>
    </>
  );
}

function CountBadge({ count }: { count: number }) {
  return (
    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
      {count > 9 ? '9+' : count}
    </span>
  );
}
