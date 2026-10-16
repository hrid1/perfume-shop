'use client';

import React from 'react';
import { BANGLADESH_DIVISIONS, DHAKA_AREAS } from '@/data/mockData';

interface CheckoutShippingAddressProps {
  division: string;
  onDivisionChange: (val: string) => void;
  district: string;
  onDistrictChange: (val: string) => void;
  districtsForDivision: string[];
  area: string;
  onAreaChange: (val: string) => void;
  customArea: string;
  onCustomAreaChange: (val: string) => void;
  fullAddress: string;
  onFullAddressChange: (val: string) => void;
  notes: string;
  onNotesChange: (val: string) => void;
  isDhakaCity: boolean;
}

export function CheckoutShippingAddress({
  division,
  onDivisionChange,
  district,
  onDistrictChange,
  districtsForDivision,
  area,
  onAreaChange,
  customArea,
  onCustomAreaChange,
  fullAddress,
  onFullAddressChange,
  notes,
  onNotesChange,
  isDhakaCity,
}: CheckoutShippingAddressProps) {
  return (
    <div className="card-lux p-6 border border-noir-800 bg-noir-900/60">
      <h2 className="font-serif text-xl font-medium text-noir-100 mb-4 pb-2 border-b border-noir-800 flex items-center justify-between">
        <span>2. Delivery Address (Bangladesh)</span>
        <span className="text-[11px] font-mono text-gold-400 font-normal">
          {isDhakaCity ? 'Dhaka City (৳60 delivery)' : 'Outside Dhaka (৳120 delivery)'}
        </span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-noir-300 uppercase tracking-wider mb-1">
            Division *
          </label>
          <select
            value={division}
            onChange={(e) => onDivisionChange(e.target.value)}
            className="input-lux text-sm bg-noir-950"
          >
            {Object.keys(BANGLADESH_DIVISIONS).map((div) => (
              <option key={div} value={div}>
                {div}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-noir-300 uppercase tracking-wider mb-1">
            District *
          </label>
          <select
            value={district}
            onChange={(e) => onDistrictChange(e.target.value)}
            className="input-lux text-sm bg-noir-950"
          >
            {districtsForDivision.map((dist) => (
              <option key={dist} value={dist}>
                {dist}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-noir-300 uppercase tracking-wider mb-1">
            Area / Thana *
          </label>
          {isDhakaCity ? (
            <select
              value={area}
              onChange={(e) => onAreaChange(e.target.value)}
              className="input-lux text-sm bg-noir-950"
            >
              {DHAKA_AREAS.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              required
              placeholder="e.g. Nasirabad, Panchlaish, Kotwali"
              value={customArea}
              onChange={(e) => onCustomAreaChange(e.target.value)}
              className="input-lux text-sm"
            />
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-noir-300 uppercase tracking-wider mb-1">
            House, Road, Apartment Details *
          </label>
          <textarea
            required
            rows={2}
            placeholder="e.g. House 42, Road 11, Block D, Apt 4B"
            value={fullAddress}
            onChange={(e) => onFullAddressChange(e.target.value)}
            className="input-lux text-sm"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-noir-300 uppercase tracking-wider mb-1">
            Delivery Notes / Gate Code (Optional)
          </label>
          <input
            type="text"
            placeholder="Call before arrival / Leave with security concierge"
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            className="input-lux text-sm"
          />
        </div>
      </div>
    </div>
  );
}
