export const config = {
  brand: {
    name: 'Amros Perfumes',
    tagline: 'Sensory Elegance Bottled in Darkness.',
    description: 'Artisanal haute perfumery crafted with pure extracts and timeless allure.',
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
  contact: {
    phone: '+880 1700-000000',
    email: 'concierge@amrosperfumes.com',
    address: 'Gulshan 2, Dhaka 1212, Bangladesh',
  },
  social: {
    instagram: 'https://instagram.com/amrosperfumes',
    facebook: 'https://facebook.com/amrosperfumes',
  },
};

export const formatPrice = (amount: number): string => {
  return `৳${amount.toLocaleString('en-BD')}`;
};
