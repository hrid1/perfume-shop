'use client';

import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { Coupon } from '@/types';
import { formatPrice } from '@/config/app';
import { CreateCouponModal } from './CreateCouponModal';

interface CouponsSectionProps {
  coupons: Coupon[];
}

export function CouponsSection({ coupons }: CouponsSectionProps) {
  const [today, setToday] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToday(new Date().toISOString().slice(0, 10));
  }, []);

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-serif text-3xl font-normal text-cream-50">
              Promotional Coupons ({coupons.length})
            </h1>
            <p className="text-xs text-noir-400 mt-1">
              Create and manage promotional discount codes for boutique clients.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold-400 px-4 py-2.5 text-sm font-semibold text-noir-950 transition-colors hover:bg-gold-300"
          >
            <Plus className="h-4 w-4" />
            Create coupon
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {coupons.map((cpn) => (
          <div
            key={cpn.code}
            className="bg-noir-900/80 text-cream-50 rounded-2xl p-6 shadow-lg border border-noir-800 hover:border-gold-500/30 transition-all flex flex-col justify-between backdrop-blur-sm"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-sm font-bold px-3 py-1 bg-gold-500/15 text-gold-300 rounded-lg border border-gold-500/30">
                  {cpn.code}
                </span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
                  !cpn.active || cpn.usedCount >= cpn.usageLimit || (today && cpn.expiryDate < today)
                    ? 'text-noir-400 bg-noir-800 border-noir-700'
                    : 'text-emerald-400 bg-emerald-500/15 border-emerald-500/20'
                }`}>
                  {!cpn.active
                    ? 'Inactive'
                    : cpn.usedCount >= cpn.usageLimit
                    ? 'Limit reached'
                    : today && cpn.expiryDate < today
                    ? 'Expired'
                    : 'Active'}
                </span>
              </div>
              <p className="text-xs text-noir-400 mb-1">Promo Code &bull; Valid for boutique orders</p>
              <p className="font-serif text-2xl font-bold text-cream-50">
                {cpn.type === 'percentage'
                  ? `${cpn.value}% OFF`
                  : `৳${cpn.value} OFF`}
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-noir-800 text-xs text-noir-400 flex items-center justify-between">
              <span>Min order: {formatPrice(cpn.minOrder)}</span>
              <span className="font-mono">Used: {cpn.usedCount}/{cpn.usageLimit}</span>
            </div>
          </div>
        ))}
      </div>

      {isCreateModalOpen && (
        <CreateCouponModal
          open={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />
      )}
    </div>
  );
}
