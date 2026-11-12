'use client';

import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export function ExclusivePrivilegesSection() {
  const [email, setEmail] = useState('');
  const { success } = useToast();

  const handleSubscribe = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email) return;
    success('Welcome to the Amros Perfumes community. Your private invitation code has been sent.');
    setEmail('');
  };

  return (
    <section className="container-lux w-full">
      <div className="bg-gradient-to-r from-noir-900 via-noir-900/80 to-noir-900 border border-noir-800 rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />
        <span className="text-[11px] uppercase tracking-[0.2em] text-gold-400 font-semibold mb-3 block">
          Exclusive Privileges
        </span>
        <h3 className="font-serif text-3xl md:text-4xl text-noir-50 font-medium mb-3">
          Join the Amros Perfumes Circle
        </h3>
        <p className="text-sm text-noir-400 max-w-md mx-auto mb-6">
          Subscribe to receive private allocations, new batch releases, and 10% off your first order.
        </p>
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email address..."
            className="flex-1 bg-noir-950/90 border border-noir-700 px-4 py-3 text-sm rounded-full text-noir-100 placeholder:text-noir-500 focus:outline-none focus:border-gold-400"
          />
          <button type="submit" className="btn-gold py-3 px-6 whitespace-nowrap">
            <span>Subscribe</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </section>
  );
}
