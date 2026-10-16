'use client';

import React from 'react';
import { Truck, Shield, RotateCcw } from 'lucide-react';

const TRUST_ITEMS = [
  { icon: Truck, label: 'Free over ৳3,000' },
  { icon: Shield, label: '100% Authentic' },
  { icon: RotateCcw, label: 'Easy Returns' },
];

export function ProductTrustBadges() {
  return (
    <div className="grid grid-cols-3 gap-3 py-4 border-t border-b border-noir-800/80">
      {TRUST_ITEMS.map(({ icon: Icon, label }) => (
        <div key={label} className="flex flex-col items-center gap-1.5 text-center">
          <Icon className="w-4 h-4 text-gold-400" />
          <span className="text-[10px] font-mono text-noir-400 uppercase tracking-wide">{label}</span>
        </div>
      ))}
    </div>
  );
}
