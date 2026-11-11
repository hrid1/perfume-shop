import { Metadata } from 'next';
import { WishlistPageClient } from './_components';

export const metadata: Metadata = {
  title: 'My Wishlist',
  description: 'View and manage your curated wishlist of luxury artisanal perfumes and rare attars.',
  robots: { index: false, follow: true },
};

export default function WishlistPage() {
  return <WishlistPageClient />;
}
