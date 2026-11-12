'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Heart, ShoppingBag, User, Menu } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { config, formatPrice } from '@/config/app';
import { cn } from '@/lib/cn';
import { BrandLogo } from './navigation/BrandLogo';
import { MobileNavDrawer } from './navigation/MobileNavDrawer';
import { NavSearchOverlay } from './navigation/NavSearchOverlay';
import { NAV_LINKS, useIsNavLinkActive } from './navigation/navLinks';

const ICON_BUTTON =
  'p-1.5 sm:p-2 text-cream-100 hover:text-gold-400 transition-colors relative cursor-pointer';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { totalItems, openCart } = useCart();
  const { count: wishCount } = useWishlist();
  const isActive = useIsNavLinkActive();
  const pathname = usePathname();

  // Close overlays when the route changes (adjusting state during render, per React docs).
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
    setSearchOpen(false);
  }

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <div className="bg-noir-900 text-cream-50 text-xs md:text-sm py-2 text-center px-4">
        <p className="font-medium tracking-wide">
          Free Delivery on Orders Over {formatPrice(config.delivery.freeDeliveryThreshold)}{' '}
          <span className="hidden sm:inline">|</span>
          <span className="sm:hidden"> · </span> Cash on Delivery Available
        </p>
      </div>

      <header
        className={cn(
          'sticky top-0 z-50 transition-all duration-300 text-cream-50 border-b border-noir-800',
          scrolled ? 'bg-noir-950/95 shadow-elevated' : 'bg-noir-950'
        )}
      >
        <nav className="container-lux">
          <div className="flex items-center justify-between h-16 min-h-16">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 text-cream-100 hover:text-gold-400 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <Link href="/" className="flex-shrink-0">
              <BrandLogo className="text-xl sm:text-2xl md:text-3xl" />
            </Link>

            <div className="hidden lg:flex items-center gap-6 flex-1 justify-center">
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'text-sm font-medium transition-colors relative group py-1',
                      active ? 'text-gold-400 font-semibold' : 'text-cream-200 hover:text-gold-400'
                    )}
                  >
                    {link.label}
                    <span
                      className={cn(
                        'absolute -bottom-1 left-0 h-0.5 bg-gold-400 transition-all duration-300',
                        active ? 'w-full' : 'w-0 group-hover:w-full'
                      )}
                    />
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-0.5 sm:gap-1 md:gap-2">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className={ICON_BUTTON}
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <Link href="/wishlist" className={ICON_BUTTON} aria-label="Wishlist">
                <Heart className="w-5 h-5" />
                {wishCount > 0 && <CountBadge count={wishCount} />}
              </Link>
              <button type="button" onClick={openCart} className={ICON_BUTTON} aria-label="Cart">
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && <CountBadge count={totalItems} />}
              </button>
              {/* On phones, Account lives in the menu drawer to keep the header within the screen. */}
              <Link href="/account" className={cn(ICON_BUTTON, 'hidden sm:block')} aria-label="Account">
                <User className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {searchOpen && <NavSearchOverlay onClose={() => setSearchOpen(false)} />}
      <MobileNavDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
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
