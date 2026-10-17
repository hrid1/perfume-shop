'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Send, Sparkles, MapPin, Phone, Mail, Globe, MessageCircle } from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { config } from '@/config/app';

export function Footer() {
  const [email, setEmail] = useState('');
  const { success } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    success('Welcome to the NOIRÉ Circle. Your private invitation code has been sent.');
    setEmail('');
  };

  return (
    <footer className="bg-noir-950 border-t border-noir-800 text-noir-300 pt-16 pb-12">
      <div className="container-lux">
        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-noir-900 via-noir-900/80 to-noir-900 border border-noir-800 rounded-2xl p-8 md:p-12 mb-16 text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />
          <span className="text-[11px] uppercase tracking-[0.2em] text-gold-400 font-semibold mb-3 block">
            Exclusive Privileges
          </span>
          <h3 className="font-serif text-3xl md:text-4xl text-noir-50 font-medium mb-3">
            Join the NOIRÉ Circle
          </h3>
          <p className="text-sm text-noir-400 max-w-md mx-auto mb-6">
            Subscribe to receive private allocations, new batch releases, and 10% off your first order.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              className="flex-1 bg-noir-950/90 border border-noir-700 px-4 py-3 text-sm rounded-full text-noir-100 placeholder:text-noir-500 focus:outline-none focus:border-gold-400"
            />
            <button type="submit" className="btn-gold py-3 px-6 whitespace-nowrap">
              <span>Subscribe</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* 4-Column Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Brand Info */}
          <div>
            <Link href="/" className="inline-block font-serif text-2xl font-bold tracking-[0.2em] text-noir-50 mb-4">
              NOIR<span className="text-gold-400">É</span>
            </Link>
            <p className="text-xs text-noir-400 leading-relaxed mb-4">
              Artisanal French & Oriental haute perfumery blended with exceptional maceration protocols. Crafted in limited batches for discerning connoisseurs.
            </p>
            <div className="flex items-center gap-3 text-noir-400">
              <a
                href={config.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-noir-900 border border-noir-800 flex items-center justify-center hover:text-gold-300 hover:border-gold-400/40 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href={config.social.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-noir-900 border border-noir-800 flex items-center justify-center hover:text-gold-300 hover:border-gold-400/40 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs font-semibold text-noir-100 uppercase tracking-widest mb-4">
              The Collection
            </h4>
            <ul className="space-y-2.5 text-xs text-noir-400">
              <li>
                <Link href="/catalog?category=men" className="hover:text-gold-300 transition-colors">
                  Men's Fragrances
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=women" className="hover:text-gold-300 transition-colors">
                  Women's Fragrances
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=unisex" className="hover:text-gold-300 transition-colors">
                  Unisex Fragrances
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=attar" className="hover:text-gold-300 transition-colors">
                  Pure Attar Oils
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=discovery-sets" className="hover:text-gold-300 transition-colors">
                  Discovery Sets
                </Link>
              </li>
            </ul>
          </div>

          {/* Experience */}
          <div>
            <h4 className="text-xs font-semibold text-noir-100 uppercase tracking-widest mb-4">
              Boutique Services
            </h4>
            <ul className="space-y-2.5 text-xs text-noir-400">
              <li>
                <Link href="/quiz" className="hover:text-gold-300 transition-colors flex items-center gap-1.5 text-gold-400">
                  <Sparkles className="w-3 h-3" />
                  <span>Scent Quiz Engine</span>
                </Link>
              </li>
              <li>
                <Link href="/catalog?filter=bestseller" className="hover:text-gold-300 transition-colors">
                  Bestsellers of the House
                </Link>
              </li>
              <li>
                <Link href="/catalog?filter=new" className="hover:text-gold-300 transition-colors">
                  New Extract Releases
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-gold-300 transition-colors">
                  Curated Wishlist
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-gold-300 transition-colors">
                  Boutique Portal (Admin)
                </Link>
              </li>
            </ul>
          </div>

          {/* Bangladesh Contact */}
          <div>
            <h4 className="text-xs font-semibold text-noir-100 uppercase tracking-widest mb-4">
              Dhaka Concierge
            </h4>
            <ul className="space-y-2.5 text-xs text-noir-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span>Gulshan 2, Dhaka 1212, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <span>+880 1700-000000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <span>concierge@noireperfumes.com</span>
              </li>
              <li className="text-[11px] text-noir-500 pt-2 border-t border-noir-800">
                Nationwide express delivery (Dhaka ৳60 &bull; Outside Dhaka ৳120)
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar & Payment Badges */}
        <div className="pt-8 border-t border-noir-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-noir-500">
          <p>© 2025 NOIRÉ Luxury Perfume House. All rights reserved.</p>

          {/* Bangladesh Payment Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] uppercase tracking-wider text-noir-400 font-mono mr-1">
              Secured BD Payments:
            </span>
            <span className="px-2 py-0.5 rounded bg-pink-950/60 border border-pink-500/30 text-pink-300 font-bold font-mono text-[10px]">
              bKash
            </span>
            <span className="px-2 py-0.5 rounded bg-orange-950/60 border border-orange-500/30 text-orange-300 font-bold font-mono text-[10px]">
              Nagad
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 font-medium font-mono text-[10px]">
              Cash on Delivery (COD)
            </span>
            <span className="px-2 py-0.5 rounded bg-noir-900 border border-noir-700 text-noir-300 font-mono text-[10px]">
              Visa / Mastercard
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
