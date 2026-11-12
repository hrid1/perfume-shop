import React from 'react';
import { cn } from '@/lib/cn';

export function BrandLogo({ className }: { className?: string }) {
  return (
    <span className={cn('font-serif font-semibold tracking-tight text-cream-50', className)}>
      AMROS<span className="text-gold-500"> PERFUMES</span>
    </span>
  );
}
