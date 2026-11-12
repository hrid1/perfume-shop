import React from 'react';
import { cn } from '@/lib/cn';

export function Spinner({ className }: { className?: string }) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        'w-10 h-10 border-2 border-gold-400 border-t-transparent rounded-full animate-spin',
        className
      )}
    />
  );
}

/** Full-width centered spinner with a message, for page-level loading and Suspense fallbacks. */
export function PageLoader({ message = 'Loading…' }: { message?: string }) {
  return (
    <div className="container-lux py-24 text-center">
      <Spinner className="mx-auto mb-4" />
      <p className="text-sm font-mono text-noir-400">{message}</p>
    </div>
  );
}
