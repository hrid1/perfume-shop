import { Suspense } from 'react';
import { Metadata } from 'next';
import { AccountPageClient } from './_components';
import { PageLoader } from '@/components/ui';

export const metadata: Metadata = {
  title: 'My Account',
  description: 'Manage your Amros Perfumes profile and view your order history.',
  robots: { index: false, follow: false },
};

export default function AccountPage() {
  return (
    <Suspense
      fallback={<PageLoader message="Loading client dashboard..." />}
    >
      <AccountPageClient />
    </Suspense>
  );
}
