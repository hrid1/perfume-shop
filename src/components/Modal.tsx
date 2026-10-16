'use client';

import React, { useEffect } from 'react';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  side?: 'left' | 'right';
  width?: string;
  className?: string;
}

export function Drawer({
  open,
  onClose,
  children,
  side = 'left',
  width = '320px',
  className = '',
}: DrawerProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex animate-fade-in">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        className={`relative h-full bg-noir-950 border-r border-noir-800 text-cream-50 shadow-2xl z-10 overflow-y-auto flex flex-col ${
          side === 'left' ? 'mr-auto' : 'ml-auto border-l border-r-0'
        } ${className}`}
        style={{ width, maxWidth: '85vw' }}
      >
        {children}
      </div>
    </div>
  );
}

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ open, onClose, children, className = '' }: ModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 animate-fade-in">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`relative z-10 w-full max-w-lg bg-noir-900 border border-noir-700 rounded-2xl shadow-2xl p-6 ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
