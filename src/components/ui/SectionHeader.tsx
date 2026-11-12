import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';

interface SectionHeaderProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** "split": title left, link right, divider below. "center": centered block. */
  align?: 'split' | 'center';
  action?: { href: string; label: string };
  className?: string;
}

/** Eyebrow + heading block used at the top of homepage and landing sections. */
export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'split',
  action,
  className,
}: SectionHeaderProps) {
  const centered = align === 'center';

  return (
    <div
      className={cn(
        centered
          ? 'text-center max-w-2xl mx-auto mb-12'
          : 'flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-noir-800',
        className
      )}
    >
      <div>
        <span className="text-xs uppercase tracking-[0.16em] text-gold-400 font-medium">
          {eyebrow}
        </span>
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-noir-50 mt-1">{title}</h2>
        {description && (
          <p className={cn('text-sm text-noir-400', centered ? 'mt-2' : 'mt-1')}>{description}</p>
        )}
      </div>

      {action && (
        <Link
          href={action.href}
          className={cn(
            'text-xs uppercase tracking-wider text-gold-400 hover:text-gold-300 flex items-center gap-1 group font-medium',
            centered ? 'justify-center mt-4' : 'mt-4 md:mt-0'
          )}
        >
          <span>{action.label}</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
