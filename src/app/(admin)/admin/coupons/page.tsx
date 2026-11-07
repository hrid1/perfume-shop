'use client';

import { useCoupons } from '@/context/CouponContext';
import { CouponsSection } from '../_components/CouponsSection';

export default function CouponsPage() {
  const { coupons } = useCoupons();

  return (
    <div className="mx-auto max-w-7xl p-6 md:p-10">
      <CouponsSection coupons={coupons} />
    </div>
  );
}
