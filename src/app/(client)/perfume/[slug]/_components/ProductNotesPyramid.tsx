'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import { Product } from '@/types';

interface ProductNotesPyramidProps {
  product: Product;
}

export function ProductNotesPyramid({ product }: ProductNotesPyramidProps) {
  const noteLayers = [
    { label: 'Top Notes', notes: product.topNotes, color: 'bg-gold-300' },
    { label: 'Heart / Middle Notes', notes: product.middleNotes, color: 'bg-gold-400' },
    { label: 'Base Notes', notes: product.baseNotes, color: 'bg-gold-600' },
  ];

  return (
    <div className="rounded-2xl bg-noir-900/60 border border-noir-800 p-5">
      <h3 className="font-serif text-base font-medium text-noir-100 mb-4 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-gold-400" />
        Fragrance Notes
      </h3>
      <div className="space-y-4">
        {noteLayers.map(({ label, notes, color }) => (
          <div key={label}>
            <p className="text-[11px] uppercase tracking-wider text-noir-400 font-medium mb-2">{label}</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5">
              {notes.map((note) => (
                <span key={note} className="flex items-center gap-1.5 text-xs text-noir-300">
                  <span className={`w-1.5 h-1.5 rounded-full ${color} flex-shrink-0`} />
                  {note}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
