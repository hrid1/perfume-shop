'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { PRODUCTS } from '@/data/mockData';
import { useWishlist } from '@/context/WishlistContext';
import { FragranceFamily } from '@/types';
import {
  CatalogHeader,
  CatalogControlsBar,
  CatalogFilterSidebar,
  CatalogProductGrid,
  CatalogMobileDrawer,
  type TabItem,
} from './_components';

const ALL_FAMILIES: FragranceFamily[] = [
  'Woody',
  'Floral',
  'Oriental',
  'Fresh',
  'Citrus',
  'Spicy',
  'Aquatic',
  'Sweet',
];

function CatalogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlCategory = searchParams.get('category') || 'all';
  const urlFamily = searchParams.get('family') || 'all';
  const urlFilter = searchParams.get('filter') || 'all';
  const urlSearch = searchParams.get('q') || '';
  const highlightSlug = searchParams.get('highlight');

  const { items: wishlistItems } = useWishlist();

  const [selectedCategory, setSelectedCategory] = useState<string>(urlCategory);
  const [selectedFamily, setSelectedFamily] = useState<string>(urlFamily);
  const [selectedFilter, setSelectedFilter] = useState<string>(urlFilter);
  const [searchQuery, setSearchQuery] = useState<string>(urlSearch);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [priceMax, setPriceMax] = useState<number>(7000);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  // Sync internal state with URL query parameters
  useEffect(() => {
    setSelectedCategory(urlCategory);
  }, [urlCategory]);

  useEffect(() => {
    setSelectedFamily(urlFamily);
  }, [urlFamily]);

  useEffect(() => {
    setSelectedFilter(urlFilter);
  }, [urlFilter]);

  useEffect(() => {
    setSearchQuery(urlSearch);
  }, [urlSearch]);

  const handleTabClick = (tab: TabItem) => {
    const params = new URLSearchParams();
    if (selectedFamily !== 'all') params.set('family', selectedFamily);
    if (searchQuery.trim()) params.set('q', searchQuery.trim());

    if (tab.type === 'category') {
      if (tab.id !== 'all') params.set('category', tab.id);
      setSelectedCategory(tab.id);
      setSelectedFilter('all');
    } else {
      params.set('filter', tab.id);
      setSelectedFilter(tab.id);
      setSelectedCategory('all');
    }

    const query = params.toString();
    router.push(`/catalog${query ? `?${query}` : ''}`, { scroll: false });
  };

  const handleFamilyChange = (fam: string) => {
    setSelectedFamily(fam);
    const params = new URLSearchParams(searchParams.toString());
    if (fam === 'all') {
      params.delete('family');
    } else {
      params.set('family', fam);
    }
    const query = params.toString();
    router.push(`/catalog${query ? `?${query}` : ''}`, { scroll: false });
  };

  // Filter products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // 1. Text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesBrand = product.brand.toLowerCase().includes(q);
        const matchesFamily = product.fragranceFamily.toLowerCase().includes(q);
        const matchesCategory = product.category.toLowerCase().includes(q);
        const matchesNotes =
          product.topNotes?.some((n) => n.toLowerCase().includes(q)) ||
          product.baseNotes?.some((n) => n.toLowerCase().includes(q));

        if (!matchesName && !matchesBrand && !matchesFamily && !matchesCategory && !matchesNotes) {
          return false;
        }
      }

      // 2. Category filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'best-sellers' && !product.bestSeller) return false;
        if (selectedCategory === 'new-arrivals' && !product.newArrival) return false;
        if (
          !['best-sellers', 'new-arrivals'].includes(selectedCategory) &&
          product.category !== selectedCategory
        ) {
          return false;
        }
      }

      // 3. Special Filter
      if (selectedFilter === 'bestseller' && !product.bestSeller) return false;
      if (selectedFilter === 'trending' && !product.trending) return false;
      if (selectedFilter === 'new' && !product.newArrival) return false;
      if (selectedFilter === 'wishlist') {
        const inWishlist = wishlistItems.some((w) => w.productId === product.id);
        if (!inWishlist) return false;
      }

      // 4. Fragrance family
      if (selectedFamily !== 'all' && product.fragranceFamily !== selectedFamily) {
        return false;
      }

      // 5. Price filter
      const effectivePrice = product.discountPrice || product.price;
      if (effectivePrice > priceMax) return false;

      return true;
    }).sort((a, b) => {
      const priceA = a.discountPrice || a.price;
      const priceB = b.discountPrice || b.price;

      if (sortBy === 'price-low') return priceA - priceB;
      if (sortBy === 'price-high') return priceB - priceA;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'bestseller') return (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0);
      if (sortBy === 'newest') return (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, selectedFamily, selectedFilter, priceMax, sortBy, searchQuery, wishlistItems]);

  const activeFiltersCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (selectedFilter !== 'all' ? 1 : 0) +
    (selectedFamily !== 'all' ? 1 : 0) +
    (priceMax < 7000 ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedFamily('all');
    setSelectedFilter('all');
    setSearchQuery('');
    setPriceMax(7000);
    setSortBy('featured');
    router.push('/catalog', { scroll: false });
  };

  const headerInfo = useMemo(() => {
    if (searchQuery.trim()) {
      return {
        badge: 'SEARCH RESULTS',
        title: `Search for "${searchQuery}"`,
        subtitle: `Showing fragrances matching your search query.`,
      };
    }
    if (selectedFilter === 'wishlist') {
      return {
        badge: 'SAVED SELECTION',
        title: 'Your Saved Wishlist',
        subtitle: 'Fragrances saved to your personal collection.',
      };
    }
    if (selectedFilter === 'bestseller' || selectedCategory === 'best-sellers') {
      return {
        badge: 'BEST SELLERS',
        title: 'Best Sellers',
        subtitle: 'Our most loved and requested fragrances.',
      };
    }
    if (selectedFilter === 'new' || selectedCategory === 'new-arrivals') {
      return {
        badge: 'NEW ARRIVALS',
        title: 'New Releases',
        subtitle: 'Explore our latest fragrance launches and seasonal batches.',
      };
    }
    if (selectedFilter === 'trending') {
      return {
        badge: 'TRENDING NOW',
        title: 'Trending Fragrances',
        subtitle: 'The most popular fragrances and blends this season.',
      };
    }
    if (selectedCategory === 'men') {
      return {
        badge: "MEN'S COLLECTION",
        title: "Men's Fragrances",
        subtitle: 'Woody, fresh, spicy, and leather scent profiles crafted for men.',
      };
    }
    if (selectedCategory === 'women') {
      return {
        badge: "WOMEN'S COLLECTION",
        title: "Women's Fragrances",
        subtitle: 'Elegant floral, sweet, fruity, and amber bouquets for women.',
      };
    }
    if (selectedCategory === 'unisex') {
      return {
        badge: 'UNISEX COLLECTION',
        title: 'Unisex Fragrances',
        subtitle: 'Versatile fragrance compositions designed for anyone to wear.',
      };
    }
    if (selectedCategory === 'attar') {
      return {
        badge: 'ATTAR & OILS',
        title: 'Concentrated Attar Oils',
        subtitle: 'Pure non-alcoholic perfume oils with long-lasting projection.',
      };
    }
    if (selectedCategory === 'discovery-sets') {
      return {
        badge: 'DISCOVERY SETS',
        title: 'Discovery & Gift Sets',
        subtitle: 'Sample sets to explore multiple fragrances before choosing your favorite.',
      };
    }
    return {
      badge: 'ALL FRAGRANCES',
      title: 'Fragrance Collection',
      subtitle: 'Browse our complete catalog of long-lasting perfumes, attars, and sets.',
    };
  }, [searchQuery, selectedFilter, selectedCategory]);

  return (
    <div className="container-lux py-10">
      <CatalogHeader
        badge={headerInfo.badge}
        title={headerInfo.title}
        subtitle={headerInfo.subtitle}
        totalCreations={PRODUCTS.length}
        filteredCount={filteredProducts.length}
        selectedCategory={selectedCategory}
        selectedFilter={selectedFilter}
        onTabClick={handleTabClick}
      />

      <CatalogControlsBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeFiltersCount={activeFiltersCount}
        onOpenMobileFilters={() => setFilterDrawerOpen(true)}
        onResetFilters={resetFilters}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <CatalogFilterSidebar
          allFamilies={ALL_FAMILIES}
          selectedFamily={selectedFamily}
          onFamilyChange={handleFamilyChange}
          priceMax={priceMax}
          onPriceChange={setPriceMax}
          activeFiltersCount={activeFiltersCount}
          onResetFilters={resetFilters}
        />

        <CatalogProductGrid
          products={filteredProducts}
          highlightSlug={highlightSlug}
          onResetFilters={resetFilters}
        />
      </div>

      <CatalogMobileDrawer
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        allFamilies={ALL_FAMILIES}
        selectedFamily={selectedFamily}
        onFamilyChange={handleFamilyChange}
        priceMax={priceMax}
        onPriceChange={setPriceMax}
        filteredCount={filteredProducts.length}
        onResetFilters={resetFilters}
      />
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense
      fallback={
        <div className="container-lux py-20 text-center text-noir-400">
          Loading the NOIRÉ collection...
        </div>
      }
    >
      <CatalogContent />
    </Suspense>
  );
}
