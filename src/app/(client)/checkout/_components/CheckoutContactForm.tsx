'use client';

import React from 'react';

interface CheckoutContactFormProps {
  fullName: string;
  onFullNameChange: (val: string) => void;
  phone: string;
  onPhoneChange: (val: string) => void;
  phoneError: string;
  email: string;
  onEmailChange: (val: string) => void;
}

export function CheckoutContactForm({
  fullName,
  onFullNameChange,
  phone,
  onPhoneChange,
  phoneError,
  email,
  onEmailChange,
}: CheckoutContactFormProps) {
  return (
    <div className="card-lux p-6 border border-noir-800 bg-noir-900/60">
      <h2 className="font-serif text-xl font-medium text-noir-100 mb-4 pb-2 border-b border-noir-800">
        1. Contact Information
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-noir-300 uppercase tracking-wider mb-1">
            Full Name *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Arif Hossain"
            value={fullName}
            onChange={(e) => onFullNameChange(e.target.value)}
            className="input-lux text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-noir-300 uppercase tracking-wider mb-1">
            Phone (Bangladeshi 11 Digits) *
          </label>
          <input
            type="tel"
            required
            placeholder="017XXXXXXXX"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            className={`input-lux text-sm ${phoneError ? 'border-red-500' : ''}`}
          />
          {phoneError && <p className="text-[11px] text-red-400 mt-1">{phoneError}</p>}
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-noir-300 uppercase tracking-wider mb-1">
            Email Address (Optional, for digital receipt)
          </label>
          <input
            type="email"
            placeholder="arif@example.com"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            className="input-lux text-sm"
          />
        </div>
      </div>
    </div>
  );
}
