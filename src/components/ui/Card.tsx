import React from 'react';
import { cn } from '@/lib/cn';

export type CardTone = 'default' | 'highlight' | 'success';

const TONES: Record<CardTone, string> = {
  default: 'border-noir-800 bg-noir-900/80',
  highlight: 'border-gold-400/20 bg-gradient-to-br from-noir-900 to-noir-950',
  success: 'border-gold-400/40 bg-gradient-to-b from-noir-900 via-noir-950 to-noir-950',
};

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: CardTone;
}

/** Surface panel built on `.card-lux`. Pass padding via className (e.g. "p-6"). */
export function Card({ tone = 'default', className, ...props }: CardProps) {
  return <div className={cn('card-lux border', TONES[tone], className)} {...props} />;
}
