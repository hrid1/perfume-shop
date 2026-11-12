import { Suspense } from 'react';
import { Metadata } from 'next';
import { AccountPageClient } from './_components';

export const metadata: Metadata = {
  title: 'My Account',
  description: 'Manage your Amros Perfumes profile and view your order history.',
  robots: { index: false, follow: false },
};

export default function AccountPage() {
  return (
    <Suspense
      fallback={
        <div className="container-lux py-16 text-center text-noir-400 font-mono text-sm">
          Loading client dashboard...
        </div>
      }
    >
      <AccountPageClient />
    </Suspense>
  );
}
