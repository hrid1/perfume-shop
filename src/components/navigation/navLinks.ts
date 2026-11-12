'use client';

import { usePathname, useSearchParams } from 'next/navigation';

export const NAV_LINKS = [
  { label: 'Men', href: '/catalog?category=men' },
  { label: 'Women', href: '/catalog?category=women' },
  { label: 'Unisex', href: '/catalog?category=unisex' },
  { label: 'Attar', href: '/catalog?category=attar' },
  { label: 'Wax', href: '/catalog?category=wax' },
  { label: 'Body Mist', href: '/catalog?category=body-mist' },
  { label: 'Dkan Perfum', href: '/catalog?category=dkan-perfum' },
];

export const SECONDARY_NAV_LINKS = [
  { label: 'Perfume Quiz', href: '/quiz' },
  { label: 'Wishlist', href: '/wishlist' },
];

/** Returns a predicate telling whether a nav href matches the current route + catalog query. */
export function useIsNavLinkActive() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (href: string): boolean => {
    const [path, query = ''] = href.split('?');
    if (pathname !== path) return false;
    if (path !== '/catalog') return true;

    const target = new URLSearchParams(query);
    const category = searchParams.get('category');
    const filter = searchParams.get('filter');

    if (target.has('category')) return category === target.get('category');
    if (target.has('filter')) return filter === target.get('filter');
    return !category && !filter;
  };
}
