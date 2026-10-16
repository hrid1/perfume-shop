import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      {
        source: '/all-products',
        destination: '/catalog',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      { source: '/men', destination: '/catalog?category=men' },
      { source: '/women', destination: '/catalog?category=women' },
      { source: '/unisex', destination: '/catalog?category=unisex' },
      { source: '/attar', destination: '/catalog?category=attar' },
      { source: '/discovery-sets', destination: '/catalog?category=discovery-sets' },
      { source: '/new-arrivals', destination: '/catalog?category=new-arrivals' },
      { source: '/best-sellers', destination: '/catalog?category=best-sellers' },
      { source: '/search', destination: '/catalog' },
      { source: '/wishlist', destination: '/catalog?filter=wishlist' },
      { source: '/cart', destination: '/checkout' },
      { source: '/account', destination: '/admin' },
      { source: '/login', destination: '/admin' },
      { source: '/products', destination: '/catalog' },
    ];
  },
};

export default nextConfig;
