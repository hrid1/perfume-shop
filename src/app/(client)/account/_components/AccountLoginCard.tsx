'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Mail, ShieldCheck, Sparkles, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export function AccountLoginCard() {
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const cleanEmail = email.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    login(cleanEmail, name);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="card-lux relative overflow-hidden p-8 md:p-10 border border-gold-400/20 bg-noir-900/80 text-center">
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-gold-400/5 blur-3xl pointer-events-none" />

        <div className="w-16 h-16 rounded-full bg-gold-400/10 border border-gold-400/30 flex items-center justify-center mx-auto mb-6 text-gold-300">
          <User className="w-7 h-7 stroke-[1.5]" />
        </div>

        <span className="text-xs uppercase tracking-widest text-gold-400 font-medium mb-2 block">
          Client Access
        </span>
        <h1 className="font-serif text-3xl font-semibold text-noir-50 mb-2">
          Welcome Back
        </h1>
        <p className="text-sm text-noir-400 leading-relaxed mb-8">
          Sign in with your email to view your profile, saved addresses, and order history.
        </p>

        <form onSubmit={handleSubmit} className="text-left space-y-4">
          <div>
            <label className="block text-xs font-medium text-noir-300 uppercase tracking-wider mb-1.5">
              Full Name (Optional)
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-noir-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="e.g. Arif Hossain"
                className="input-lux text-sm pl-10"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-noir-300 uppercase tracking-wider mb-1.5">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-noir-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (error) setError('');
                }}
                placeholder="you@example.com"
                className={`input-lux text-sm pl-10 ${error ? 'border-rose-500' : ''}`}
              />
            </div>
            {error && <p className="text-[11px] text-rose-400 mt-1.5">{error}</p>}
          </div>

          <button type="submit" className="btn-gold w-full py-3.5 text-xs tracking-wider cursor-pointer">
            <span>Access My Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-noir-800 space-y-3 text-[11px] text-noir-400">
          <p className="flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>No password is required for this demo experience.</span>
          </p>
          <p className="flex items-center justify-center gap-1.5 text-gold-300/90">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>Use the same email you entered at checkout to see your orders.</span>
          </p>
        </div>
      </div>

      <p className="text-center text-xs text-noir-400 mt-6">
        New to Amros Perfumes?{' '}
        <Link href="/catalog" className="text-gold-400 hover:text-gold-300 transition-colors">
          Explore the collection
        </Link>
      </p>
    </div>
  );
}
