'use client';

import React from 'react';

interface ProductStoryProps {
  description: string;
}

export function ProductStory({ description }: ProductStoryProps) {
  return (
    <div className="rounded-2xl bg-noir-900/40 border border-noir-800/60 p-5">
      <h3 className="font-serif text-base font-medium text-noir-100 mb-3">About this Fragrance</h3>
      <p className="text-sm text-noir-300 leading-relaxed">{description}</p>
    </div>
  );
}
