import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Order Confirmed',
  description: 'Thank you for your order with Amros Perfumes.',
  robots: { index: false, follow: false },
};

export default function OrderConfirmedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
