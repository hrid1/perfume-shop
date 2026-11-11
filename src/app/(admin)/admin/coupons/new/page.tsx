'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Coupon } from '@/types';
import { useCoupons } from '@/context/CouponContext';

export default function NewCouponPage() {
  const router = useRouter();
  const { addCoupon, isLoaded } = useCoupons();
  const [code, setCode] = useState('');
  const [type, setType] = useState<Coupon['type']>('percentage');
  const [value, setValue] = useState('');
  const [minOrder, setMinOrder] = useState('0');
  const [expiryDate, setExpiryDate] = useState('');
  const [usageLimit, setUsageLimit] = useState('');
  const [formError, setFormError] = useState('');
  const [today, setToday] = useState('');

  useEffect(() => {
    setToday(new Date().toISOString().slice(0, 10));
  }, []);
  const inputClass =
    'mt-1 w-full rounded-lg border border-noir-700 bg-noir-950 px-3 py-2.5 text-sm text-noir-100 outline-none focus:border-gold-400';
  const labelClass = 'block text-xs font-medium text-noir-300';

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError('');

    const normalizedCode = code.trim().toUpperCase();
    const numericValue = Number(value);
    const numericMinOrder = Number(minOrder);
    const numericUsageLimit = Number(usageLimit);

    if (!/^[A-Z0-9_-]{3,30}$/.test(normalizedCode)) {
      setFormError('Use 3–30 letters, numbers, hyphens, or underscores for the code.');
      return;
    }

    if (
      !Number.isFinite(numericValue) ||
      numericValue <= 0 ||
      (type === 'percentage' && numericValue > 100)
    ) {
      setFormError(type === 'percentage'
        ? 'Percentage discount must be between 1 and 100.'
        : 'Enter a fixed discount greater than 0.');
      return;
    }

    if (!Number.isFinite(numericMinOrder) || numericMinOrder < 0) {
      setFormError('Minimum order cannot be negative.');
      return;
    }

    const currentDate = new Date().toISOString().slice(0, 10);
    if (!expiryDate || expiryDate < currentDate) {
      setFormError('Choose an expiry date that is today or later.');
      return;
    }

    if (!Number.isInteger(numericUsageLimit) || numericUsageLimit < 1) {
      setFormError('Usage limit must be at least 1.');
      return;
    }

    const coupon: Coupon = {
      id: `coupon-${Date.now()}`,
      code: normalizedCode,
      type,
      value: numericValue,
      minOrder: numericMinOrder,
      expiryDate,
      usageLimit: numericUsageLimit,
      usedCount: 0,
      active: true,
    };

    const result = addCoupon(coupon);
    if (result.success) router.push('/admin/coupons');
    else setFormError(result.message);
  };

  return (
    <div className="mx-auto max-w-4xl p-6 md:p-10">
      <Link
        href="/admin/coupons"
        className="mb-6 inline-flex items-center gap-2 text-sm text-noir-400 transition-colors hover:text-gold-300"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to coupons
      </Link>

      <div className="mb-6">
        <h1 className="font-serif text-3xl font-normal text-cream-50">Create coupon</h1>
        <p className="mt-1 text-sm text-noir-400">
          Set the discount, minimum order, expiry date, and usage limit.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-noir-800 bg-noir-900/80 p-5 text-cream-50 shadow-lg sm:p-8"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <label className={labelClass}>
            Coupon code *
            <input
              required
              maxLength={30}
              value={code}
              onChange={(event) => setCode(event.target.value.toUpperCase())}
              placeholder="e.g. AMROS15"
              className={inputClass}
            />
          </label>
          <label className={labelClass}>
            Discount type *
            <select
              value={type}
              onChange={(event) => setType(event.target.value as Coupon['type'])}
              className={inputClass}
            >
              <option value="percentage">Percentage (%)</option>
              <option value="fixed">Fixed amount (৳)</option>
            </select>
          </label>
          <label className={labelClass}>
            Discount {type === 'percentage' ? 'percentage (%)' : 'amount (৳)'} *
            <input
              required
              min="1"
              max={type === 'percentage' ? '100' : undefined}
              step="1"
              type="number"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              className={inputClass}
            />
          </label>
          <label className={labelClass}>
            Minimum order (৳) *
            <input
              required
              min="0"
              step="1"
              type="number"
              value={minOrder}
              onChange={(event) => setMinOrder(event.target.value)}
              className={inputClass}
            />
          </label>
          <label className={labelClass}>
            Expiry date *
            <input
              required
              min={today}
              type="date"
              value={expiryDate}
              onChange={(event) => setExpiryDate(event.target.value)}
              className={inputClass}
            />
          </label>
          <label className={labelClass}>
            Total usage limit *
            <input
              required
              min="1"
              step="1"
              type="number"
              value={usageLimit}
              onChange={(event) => setUsageLimit(event.target.value)}
              className={inputClass}
            />
          </label>
        </div>

        {formError && (
          <p role="alert" className="mt-5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {formError}
          </p>
        )}

        <div className="mt-8 flex justify-end gap-3 border-t border-noir-800 pt-5">
          <Link
            href="/admin/coupons"
            className="rounded-xl border border-noir-700 px-4 py-2.5 text-sm text-noir-300 transition-colors hover:bg-noir-800"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={!isLoaded}
            className="rounded-xl bg-gold-400 px-5 py-2.5 text-sm font-semibold text-noir-950 transition-colors hover:bg-gold-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoaded ? 'Create coupon' : 'Loading coupons...'}
          </button>
        </div>
      </form>
    </div>
  );
}
