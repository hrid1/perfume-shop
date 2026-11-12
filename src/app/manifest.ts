import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Amros Perfumes',
    short_name: 'Amros',
    description:
      'Official store of Amros Perfumes. Buy premium long-lasting perfumes, pure attar oils, and luxury inspired fragrances in Bangladesh.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0c',
    theme_color: '#d4a84e',
    icons: [
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
