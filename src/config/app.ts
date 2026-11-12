export const config = {
  brand: {
    name: 'Amros Perfumes',
    tagline: 'Premium Long-Lasting Fragrances for Everyday Luxury.',
    description: 'Amros Perfumes is a premium fragrance house in Bangladesh, crafting long-lasting luxury perfumes, pure attar oils, and inspired scents.',
  },
  siteUrl: 'https://www.amrosperfumes.com',
  delivery: {
    insideDhaka: 60,
    outsideDhaka: 120,
    freeDeliveryThreshold: 3000,
    estimatedDays: '2–4 business days',
    estimatedDaysOutside: '3–6 business days',
    currency: '৳',
    currencyCode: 'BDT',
  },
  /**
   * ⚠️ PLACEHOLDERS: replace with the real shop details before launch.
   * Every page (footer, WhatsApp buttons, SEO structured data) reads from here.
   */
  contact: {
    phone: '+880 1700-000000',
    /** International format without '+', as wa.me expects. */
    whatsapp: '8801700000000',
    email: 'concierge@amrosperfumes.com',
    address: 'Gulshan 2, Dhaka 1212, Bangladesh',
    /** Structured address for Google (JSON-LD). Keep in sync with `address`. */
    streetAddress: 'Gulshan 2',
    locality: 'Dhaka',
    postalCode: '1212',
    countryCode: 'BD',
  },
  social: {
    instagram: 'https://instagram.com/amrosbd',
    facebook: 'https://facebook.com/amrosperfumes',
  },
};

export const formatPrice = (amount: number): string => {
  return `৳${amount.toLocaleString('en-BD')}`;
};
