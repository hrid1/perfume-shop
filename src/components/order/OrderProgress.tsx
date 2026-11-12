import React from 'react';
import { Check, CheckCircle2, Package, Truck } from 'lucide-react';
import type { OrderStatus } from '@/types';
import { TRACKING_STEPS, trackingStepIndex } from '@/lib/orders';
import { cn } from '@/lib/cn';

const DETAILED_STEPS = [
  { label: 'Order Received', icon: Check },
  { label: 'Wax Seal & Pack', icon: Package },
  { label: 'Handed to Courier', icon: Truck },
  { label: 'Delivered', icon: CheckCircle2 },
];

interface OrderProgressProps {
  status: OrderStatus;
  /** "compact": numbered dots (order history). "detailed": icon tiles with state text (receipt). */
  variant?: 'compact' | 'detailed';
}

export function OrderProgress({ status, variant = 'compact' }: OrderProgressProps) {
  const activeStep = trackingStepIndex(status);

  if (variant === 'compact') {
    return (
      <div className="grid grid-cols-4 gap-2">
        {TRACKING_STEPS.map((step, index) => {
          const isComplete = index <= activeStep;
          return (
            <div key={step} className="text-center">
              <div
                className={cn(
                  'w-8 h-8 rounded-full mx-auto mb-1.5 flex items-center justify-center border',
                  isComplete
                    ? 'bg-gold-400/20 border-gold-400/40 text-gold-300'
                    : 'bg-noir-900 border-noir-700 text-noir-500'
                )}
              >
                {isComplete ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span className="text-[10px] font-mono">{index + 1}</span>
                )}
              </div>
              <p className={cn('text-[10px]', isComplete ? 'text-cream-100' : 'text-noir-500')}>
                {step}
              </p>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {DETAILED_STEPS.map(({ label, icon: Icon }, index) => {
        const state =
          index <= activeStep ? 'complete' : index === activeStep + 1 ? 'current' : 'pending';
        return (
          <div
            key={label}
            className={cn(
              'flex flex-col items-center text-center p-3 rounded-xl border',
              state === 'complete' && 'bg-noir-950 border-emerald-500/30',
              state === 'current' && 'bg-noir-950 border-gold-400/40',
              state === 'pending' && 'bg-noir-950/60 border-noir-800 opacity-60'
            )}
          >
            <div
              className={cn(
                'relative w-10 h-10 rounded-full flex items-center justify-center mb-2',
                state === 'complete' && 'bg-emerald-500/20 text-emerald-400',
                state === 'current' && 'bg-gold-400/20 text-gold-300',
                state === 'pending' && 'bg-noir-900 text-noir-400'
              )}
            >
              {state === 'complete' ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
              {state === 'current' && (
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gold-400 animate-ping" />
              )}
            </div>
            <p
              className={cn(
                'text-xs font-semibold',
                state === 'pending' ? 'text-noir-300' : 'text-cream-50'
              )}
            >
              {label}
            </p>
            <p
              className={cn(
                'text-[11px] mt-0.5 font-mono',
                state === 'complete' && 'text-emerald-400/90',
                state === 'current' && 'text-gold-300',
                state === 'pending' && 'text-noir-500'
              )}
            >
              {state === 'complete' ? 'Complete' : state === 'current' ? 'In Progress' : 'Pending'}
            </p>
          </div>
        );
      })}
    </div>
  );
}
