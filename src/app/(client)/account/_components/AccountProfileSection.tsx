'use client';

import React, { useMemo, useState } from 'react';
import {
  CalendarDays,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Save,
  ShieldCheck,
  Sparkles,
  UserRound,
  X,
} from 'lucide-react';
import { useAuth, type UserProfile } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import type { Order } from '@/types';
import { formatOrderDate } from '@/lib/orders';

interface AccountProfileSectionProps {
  user: UserProfile;
  orders: Order[];
}

function formatMemberSince(value?: string): string {
  if (!value) return 'New Client';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'New Client';
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function AccountProfileSection({ user, orders }: AccountProfileSectionProps) {
  const { updateProfile } = useAuth();
  const { success, error } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const latestOrder = useMemo(() => {
    return orders.reduce<Order | null>((latest, order) => {
      if (!latest) return order;
      return new Date(order.createdAt).getTime() > new Date(latest.createdAt).getTime()
        ? order
        : latest;
    }, null);
  }, [orders]);

  const startEditing = () => {
    setName(user.name);
    setEmail(user.email);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setName(user.name);
    setEmail(user.email);
    setIsEditing(false);
  };

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();

    if (!name.trim()) {
      error('Please enter your full name.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      error('Please enter a valid email address.');
      return;
    }

    updateProfile({ name, email });
    success('Profile updated successfully.');
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="card-lux p-6 md:p-8 border border-noir-800 bg-noir-900/80">
        <div className="flex items-start justify-between gap-4 mb-6 pb-4 border-b border-noir-800">
          <div>
            <h3 className="font-serif text-xl font-semibold text-cream-50">
              Profile Information
            </h3>
            <p className="text-xs text-noir-400 mt-1">
              Your personal details used for orders and concierge updates.
            </p>
          </div>

          {!isEditing && (
            <button
              type="button"
              onClick={startEditing}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-noir-700 text-xs font-medium text-noir-300 hover:text-gold-300 hover:border-gold-400/40 transition-colors cursor-pointer shrink-0"
            >
              <Pencil className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-noir-300 uppercase tracking-wider mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <UserRound className="w-4 h-4 text-noir-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="input-lux text-sm pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-noir-300 uppercase tracking-wider mb-1.5">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-noir-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="input-lux text-sm pl-10"
                  />
                </div>
              </div>
            </div>

            <p className="text-[11px] text-noir-500">
              Orders are linked to this email address. Changing it may hide orders placed under
              the previous email.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button type="submit" className="btn-gold text-xs px-5 py-2.5 tracking-wider cursor-pointer">
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
              <button
                type="button"
                onClick={cancelEditing}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-noir-700 text-xs font-medium text-noir-300 hover:text-cream-50 hover:border-noir-500 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Cancel</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl bg-noir-950 border border-noir-800 p-4">
              <p className="text-[11px] uppercase tracking-wider text-noir-500 mb-1">Full Name</p>
              <p className="text-sm font-medium text-cream-50 flex items-center gap-2">
                <UserRound className="w-3.5 h-3.5 text-gold-400" />
                <span className="truncate">{user.name}</span>
              </p>
            </div>

            <div className="rounded-xl bg-noir-950 border border-noir-800 p-4">
              <p className="text-[11px] uppercase tracking-wider text-noir-500 mb-1">Email</p>
              <p className="text-sm font-medium text-cream-50 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gold-400" />
                <span className="truncate">{user.email}</span>
              </p>
            </div>

            <div className="rounded-xl bg-noir-950 border border-noir-800 p-4">
              <p className="text-[11px] uppercase tracking-wider text-noir-500 mb-1">Account Type</p>
              <p className="text-sm font-medium text-cream-50 flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                <span className="capitalize">{user.role === 'admin' ? 'Administrator' : 'Customer'}</span>
              </p>
            </div>

            <div className="rounded-xl bg-noir-950 border border-noir-800 p-4">
              <p className="text-[11px] uppercase tracking-wider text-noir-500 mb-1">Client Since</p>
              <p className="text-sm font-medium text-cream-50 flex items-center gap-2">
                <CalendarDays className="w-3.5 h-3.5 text-gold-400" />
                <span>{formatMemberSince(user.createdAt)}</span>
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="card-lux p-6 md:p-8 border border-noir-800 bg-noir-900/80">
        <div className="mb-5 pb-4 border-b border-noir-800">
          <h3 className="font-serif text-xl font-semibold text-cream-50">
            Contact &amp; Last Delivery
          </h3>
          <p className="text-xs text-noir-400 mt-1">
            Details from your most recent order, ready for your next checkout.
          </p>
        </div>

        {latestOrder ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-noir-500 mb-1">
                  Contact Phone
                </p>
                <p className="text-sm font-medium text-cream-50 flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-gold-400" />
                  <span className="font-mono">
                    {latestOrder.address.phone || latestOrder.customer.phone}
                  </span>
                </p>
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-wider text-noir-500 mb-1">
                  Last Order
                </p>
                <p className="text-sm font-medium text-cream-50 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                  <span className="font-mono">{latestOrder.orderNumber}</span>
                  <span className="text-[11px] text-noir-500">
                    {formatOrderDate(latestOrder.createdAt)}
                  </span>
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-noir-950 border border-noir-800 p-4">
              <p className="text-[11px] uppercase tracking-wider text-noir-500 mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-gold-400" />
                <span>Delivery Address</span>
              </p>
              <p className="text-sm text-noir-200 leading-relaxed mt-1">
                {latestOrder.address.fullName || latestOrder.customer.name}
              </p>
              <p className="text-sm text-noir-300 leading-relaxed">
                {latestOrder.address.fullAddress}
              </p>
              <p className="text-xs text-noir-500 mt-1">
                {latestOrder.address.area}, {latestOrder.address.district},{' '}
                {latestOrder.address.division}
              </p>
              {latestOrder.address.instructions && (
                <p className="text-xs text-noir-400 italic mt-2 pt-2 border-t border-noir-800">
                  &ldquo;{latestOrder.address.instructions}&rdquo;
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-12 h-12 rounded-full bg-noir-950 border border-noir-800 flex items-center justify-center mx-auto mb-3 text-gold-400/70">
              <MapPin className="w-5 h-5" />
            </div>
            <p className="text-sm text-noir-300">No delivery address saved yet.</p>
            <p className="text-xs text-noir-500 mt-1">
              Your address will appear here after your first order.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
