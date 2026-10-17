import { Metadata } from 'next';
import { WishlistPageClient } from './_components';

export const metadata: Metadata = {
  title: 'My Wishlist | NOIRÉ - Artisanal Haute Perfumery',
  description: 'View and manage your curated wishlist of luxury artisanal perfumes and rare attars.',
};

export default function WishlistPage() {
  return <WishlistPageClient />;
}
