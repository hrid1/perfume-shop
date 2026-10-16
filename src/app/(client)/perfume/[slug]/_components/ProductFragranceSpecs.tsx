'use client';

import React from 'react';
import {
  Droplets,
  Wind,
  Users,
  Clock,
  Sparkles,
  Sun,
  Calendar,
} from 'lucide-react';
import { Product } from '@/types';

interface ProductFragranceSpecsProps {
  product: Product;
}

export function ProductFragranceSpecs({ product }: ProductFragranceSpecsProps) {
  const specs = [
    { icon: Wind, label: 'Family', value: product.fragranceFamily },
    {
      icon: Users,
      label: 'Gender',
      value: product.gender.charAt(0).toUpperCase() + product.gender.slice(1),
    },
    { icon: Clock, label: 'Longevity', value: product.longevity },
    { icon: Sparkles, label: 'Sillage', value: product.sillage },
    { icon: Sun, label: 'Season', value: product.seasons.join(', ') },
    { icon: Calendar, label: 'Occasion', value: product.occasions.join(', ') },
  ];

  return (
    <div className="rounded-2xl bg-noir-900/60 border border-noir-800 p-5">
      <h3 className="font-serif text-base font-medium text-noir-100 mb-4 flex items-center gap-2">
        <Droplets className="w-4 h-4 text-gold-400" />
        Fragrance Information
      </h3>
      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
        {specs.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-start gap-2.5">
            <Icon className="w-3.5 h-3.5 text-gold-400/70 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-noir-500 mb-0.5">
                {label}
              </p>
              <p className="text-sm text-noir-200 font-medium">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
