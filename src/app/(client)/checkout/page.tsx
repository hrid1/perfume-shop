'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { BANGLADESH_DIVISIONS } from '@/data/mockData';
import { PaymentMethod } from '@/types';
import {
  CheckoutHeader,
  CheckoutEmptyState,
  CheckoutOrderSuccess,
  CheckoutContactForm,
  CheckoutShippingAddress,
  CheckoutPaymentSelection,
  CheckoutOrderSummary,
} from './_components';

export default function CheckoutPage() {
  const {
    items,
    subtotal,
    discount,
    couponCode,
    clearCart,
    freeDeliveryThreshold,
  } = useCart();

  // Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [division, setDivision] = useState('Dhaka');
  const [district, setDistrict] = useState('Dhaka');
  const [area, setArea] = useState('Gulshan');
  const [customArea, setCustomArea] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bkash');
  const [phoneError, setPhoneError] = useState('');

  // Order Placement State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [placedOrderNumber, setPlacedOrderNumber] = useState<string | null>(null);

  const districtsForDivision = BANGLADESH_DIVISIONS[division] || [];
  const isDhakaCity = division === 'Dhaka' && district === 'Dhaka';

  // Calculate delivery fee
  const netSubtotal = Math.max(0, subtotal - discount);
  const isFreeDelivery = netSubtotal >= freeDeliveryThreshold && netSubtotal > 0;
  const deliveryFee =
    items.length === 0 ? 0 : isFreeDelivery ? 0 : isDhakaCity ? 60 : 120;
  const grandTotal = Math.max(0, netSubtotal + deliveryFee);

  const handleDivisionChange = (newDivision: string) => {
    setDivision(newDivision);
    const availableDistricts = BANGLADESH_DIVISIONS[newDivision] || [];
    setDistrict(availableDistricts[0] || '');
  };

  const validatePhone = (num: string): boolean => {
    const cleaned = num.replace(/[\s-]/g, '');
    const regex = /^01[3-9]\d{8}$/;
    if (!regex.test(cleaned)) {
      setPhoneError('Please enter a valid 11-digit Bangladeshi mobile number (e.g. 017XXXXXXXX)');
      return false;
    }
    setPhoneError('');
    return true;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePhone(phone)) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedOrderNumber = `NR-2025-${Math.floor(1000 + Math.random() * 9000)}`;
      setPlacedOrderNumber(generatedOrderNumber);
      clearCart();
      setIsSubmitting(false);
    }, 1200);
  };

  if (placedOrderNumber) {
    return (
      <CheckoutOrderSuccess
        fullName={fullName}
        orderNumber={placedOrderNumber}
        paymentMethod={paymentMethod}
        isDhakaCity={isDhakaCity}
        grandTotal={grandTotal}
      />
    );
  }

  if (items.length === 0) {
    return <CheckoutEmptyState />;
  }

  return (
    <div className="container-lux py-12 max-w-6xl">
      <CheckoutHeader />

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7 space-y-8">
          <CheckoutContactForm
            fullName={fullName}
            onFullNameChange={setFullName}
            phone={phone}
            onPhoneChange={(val) => {
              setPhone(val);
              if (phoneError) validatePhone(val);
            }}
            phoneError={phoneError}
            email={email}
            onEmailChange={setEmail}
          />

          <CheckoutShippingAddress
            division={division}
            onDivisionChange={handleDivisionChange}
            district={district}
            onDistrictChange={setDistrict}
            districtsForDivision={districtsForDivision}
            area={area}
            onAreaChange={setArea}
            customArea={customArea}
            onCustomAreaChange={setCustomArea}
            fullAddress={fullAddress}
            onFullAddressChange={setFullAddress}
            notes={notes}
            onNotesChange={setNotes}
            isDhakaCity={isDhakaCity}
          />

          <CheckoutPaymentSelection
            paymentMethod={paymentMethod}
            onPaymentMethodChange={setPaymentMethod}
          />
        </div>

        <div className="lg:col-span-5">
          <CheckoutOrderSummary
            items={items}
            subtotal={subtotal}
            discount={discount}
            couponCode={couponCode}
            deliveryFee={deliveryFee}
            grandTotal={grandTotal}
            isSubmitting={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
}
