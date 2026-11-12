'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin, Phone, Truck } from 'lucide-react';
import type { Order } from '@/types';
import { formatOrderDate, normalize } from '@/lib/orders';

interface AccountAddressesSectionProps {
  orders: Order[];
}

interface SavedAddress {
  key: string;
  fullName: string;
  phone: string;
  fullAddress: string;
  area: string;
  district: string;
  division: string;
  instructions?: string;
  orderNumber: string;
  addedAt: string;
}

export function AccountAddressesSection({ orders }: AccountAddressesSectionProps) {
  const addresses = useMemo(() => {
    const seen = new Set<string>();
    const result: SavedAddress[] = [];

    const sorted = [...orders].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    for (const order of sorted) {
      const key = normalize(
        `${order.address.fullAddress}|${order.address.area}|${order.address.district}|${order.address.division}`
      );

      if (!key || seen.has(key)) continue;
      seen.add(key);

      result.push({
        key,
        fullName: order.address.fullName || order.customer.name,
        phone: order.address.phone || order.customer.phone,
        fullAddress: order.address.fullAddress,
        area: order.address.area,
        district: order.address.district,
        division: order.address.division,
        instructions: order.address.instructions,
        orderNumber: order.orderNumber,
        addedAt: order.createdAt,
      });
    }

    return result;
  }, [orders]);

  if (addresses.length === 0) {
    return (
      <div className="card-lux p-6 md:p-8 border border-noir-800 bg-noir-900/80 animate-fade-in">
        <div className="py-16 text-center max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-noir-950 border border-noir-800 flex items-center justify-center mx-auto mb-5 text-gold-400/80">
            <MapPin className="w-7 h-7 stroke-[1.5]" />
          </div>
          <h3 className="font-serif text-2xl text-noir-50 font-medium mb-2">
            No Saved Addresses
          </h3>
          <p className="text-sm text-noir-400 leading-relaxed mb-7">
            Delivery addresses from your orders will be collected here for quick reference.
          </p>
          <Link
            href="/catalog"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gold-400 hover:bg-gold-300 text-noir-950 text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-lg shadow-gold-500/20"
          >
            <span>Start Shopping</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="pb-4 border-b border-noir-800">
        <h3 className="font-serif text-xl font-semibold text-cream-50">Saved Addresses</h3>
        <p className="text-xs text-noir-400 mt-1">
          Addresses used across your orders, most recent first.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {addresses.map((address, index) => (
          <div
            key={address.key}
            className="card-lux p-5 border border-noir-800 bg-noir-900/80 flex flex-col"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-gold-400/10 border border-gold-400/25 flex items-center justify-center text-gold-300 shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              {index === 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/25 text-emerald-300">
                  Most Recent
                </span>
              )}
            </div>

            <p className="text-sm font-semibold text-cream-50">{address.fullName}</p>
            <p className="text-xs text-noir-300 leading-relaxed mt-1 flex-1">
              {address.fullAddress}
            </p>
            <p className="text-xs text-noir-500 mt-0.5">
              {address.area}, {address.district}, {address.division}
            </p>

            <p className="text-xs text-noir-300 mt-3 flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-gold-400" />
              <span className="font-mono">{address.phone}</span>
            </p>

            {address.instructions && (
              <p className="text-[11px] text-noir-400 italic mt-2 leading-relaxed">
                &ldquo;{address.instructions}&rdquo;
              </p>
            )}

            <div className="mt-4 pt-3 border-t border-noir-800 text-[11px] text-noir-500 flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-gold-400/80" />
              <span className="font-mono">{address.orderNumber}</span>
              <span>·</span>
              <span>{formatOrderDate(address.addedAt)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
