import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/cn';

export type ButtonVariant = 'gold' | 'outline' | 'subtle';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonStyleOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}

const VARIANTS: Record<ButtonVariant, string> = {
  // `.btn-gold` lives in globals.css (gradient, shadow, hover lift).
  gold: 'btn-gold tracking-wider disabled:opacity-50 disabled:cursor-not-allowed',
  outline:
    'inline-flex items-center justify-center gap-2 rounded-full border border-noir-700 font-medium text-noir-300 hover:text-gold-300 hover:border-gold-400/40 transition-colors',
  subtle:
    'inline-flex items-center justify-center gap-2 rounded-full border border-noir-700 bg-noir-900 font-medium text-noir-300 hover:text-cream-50 hover:border-noir-500 transition-colors',
};

const SIZES: Record<ButtonSize, string> = {
  sm: 'text-xs px-5 py-2.5',
  md: 'text-xs px-6 py-3',
  lg: 'text-xs px-8 py-3.5',
};

/** Class string for anything that should look like a button (buttons, links, anchors). */
export function buttonStyles({
  variant = 'gold',
  size = 'md',
  fullWidth = false,
  className,
}: ButtonStyleOptions = {}): string {
  return cn(VARIANTS[variant], SIZES[size], fullWidth && 'w-full', 'cursor-pointer', className);
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & Omit<ButtonStyleOptions, 'className'>;

export function Button({
  variant,
  size,
  fullWidth,
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonStyles({ variant, size, fullWidth, className })}
      {...props}
    />
  );
}

type ButtonLinkProps = React.ComponentProps<typeof Link> & Omit<ButtonStyleOptions, 'className'>;

export function ButtonLink({ variant, size, fullWidth, className, ...props }: ButtonLinkProps) {
  return <Link className={buttonStyles({ variant, size, fullWidth, className })} {...props} />;
}
