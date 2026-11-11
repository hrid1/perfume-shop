import { Suspense } from 'react';
import type { Metadata } from 'next';
import { PRODUCTS } from '@/data/mockData';
import { config } from '@/config/app';
import { ProductDetailClient } from './ProductDetailClient';
import { ProductDetailLookup } from './ProductDetailLookup';

// This route uses client-side context (cart, wishlist) via localStorage,
// so it must not be prerendered at build time.
export const instant = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find(
    (item) => item.slug === slug && item.status === 'active',
  );

  if (!product) {
    return {
      title: 'Fragrance',
      robots: { index: false, follow: true },
    };
  }

  return {
    title: `${product.name} ${product.concentration} Perfume in Bangladesh`,
    description: product.description,
    alternates: {
      canonical: `/perfume/${product.slug}`,
    },
    openGraph: {
      type: 'website',
      title: `${product.name} | Amros Perfumes`,
      description: product.description,
      images: product.images.slice(0, 1),
    },
  };
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = PRODUCTS.find(
    (item) => item.slug === slug && item.status === 'active',
  );

  return (
    <Suspense
      fallback={
        <div className="container-lux py-20 text-center text-noir-400 font-mono">
          Loading fragrance details…
        </div>
      }
    >
      {product ? (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Product',
                name: product.name,
                description: product.description,
                image: product.images,
                brand: {
                  '@type': 'Brand',
                  name: 'Amros Perfumes',
                },
                offers: {
                  '@type': 'Offer',
                  url: `${config.siteUrl}/perfume/${product.slug}`,
                  priceCurrency: 'BDT',
                  price: product.discountPrice ?? product.price,
                  availability:
                    product.stock > 0
                      ? 'https://schema.org/InStock'
                      : 'https://schema.org/OutOfStock',
                  itemCondition: 'https://schema.org/NewCondition',
                },
              }),
            }}
          />
          <ProductDetailClient product={product} />
        </>
      ) : (
        <ProductDetailLookup slug={slug} />
      )}
    </Suspense>
  );
}
