import type { QuizQuestion } from '@/types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    title: 'Who are you discovering fragrance for?',
    subtitle: 'Select the primary wearer to calibrate notes and body chemistry compatibility.',
    options: [
      { label: 'For Him', value: 'men', description: 'Deep woods, amber, crisp leather & sharp aromatics' },
      { label: 'For Her', value: 'women', description: 'Velvet florals, bourbon vanilla & sensual amber bouquets' },
      { label: 'Universally Unisex', value: 'unisex', description: 'Artisanal niche blends that transcend gender' },
    ],
  },
  {
    id: 'q2',
    title: 'What olfactory family calls to you most?',
    subtitle: 'Close your eyes and choose the scent landscape that evokes emotion.',
    options: [
      { label: 'Smoky Oud & Orientals', value: 'Oriental', description: 'Aged agarwood, incense smoke & resinous amber' },
      { label: 'Rich Woods & Leather', value: 'Woody', description: 'Cedar, sandalwood, patchouli & birch tar' },
      { label: 'Sensual Velvet Florals', value: 'Floral', description: 'Damask rose, white jasmine & midnight tuberose' },
      { label: 'Warm & Sweet Gourmands', value: 'Sweet', description: 'Madagascar vanilla, orchid & caramelized almond' },
      { label: 'Bold Warm Spices', value: 'Spicy', description: 'Nutmeg, Ceylon cinnamon, cognac & cured tobacco' },
      { label: 'Crisp Citrus & Fresh Herbs', value: 'Citrus', description: 'Calabrian bergamot, blood orange & fresh sage' },
      { label: 'Marine & Oceanic Breeze', value: 'Aquatic', description: 'Sea salt spray, mineral driftwood & cool air' },
      { label: 'Pure Airy Linen & Musk', value: 'Fresh', description: 'White musk, fresh cotton & clean rain' },
    ],
  },
  {
    id: 'q3',
    title: 'When and where will you predominantly wear it?',
    subtitle: 'Different occasions demand distinct projection and warmth.',
    options: [
      { label: 'Executive Office & Boardroom', value: 'Office', description: 'Refined, discreet, polished authority' },
      { label: 'Daily Signature & Daytime', value: 'Daily', description: 'Effortless, fresh, versatile companion' },
      { label: 'Intimate Evenings & Date Nights', value: 'Date', description: 'Alluring, sensual, close-quarter warmth' },
      { label: 'Black-Tie Galas & Weddings', value: 'Special Occasion', description: 'Unforgettable, royal, opulent sillage' },
      { label: 'Nightclub & Celebration Parties', value: 'Party', description: 'Commanding, electric, room-filling presence' },
    ],
  },
  {
    id: 'q4',
    title: 'What is your preferred investment budget?',
    subtitle: 'Every Amros Perfumes bottle contains authentic high-concentration fragrance oils.',
    options: [
      { label: 'Under ৳3,000', value: 'under-3000', description: 'Accessible luxury (EDTs and Discovery Sets)' },
      { label: '৳3,000 – ৳5,000', value: '3000-5000', description: 'Signature Eau de Parfum standard editions' },
      { label: '৳5,000 and Above', value: '5000+', description: 'Haute Parfumerie & Extrait de Parfum flagships' },
    ],
  },
  {
    id: 'q5',
    title: 'How commanding should your scent trail (sillage) be?',
    subtitle: 'From an intimate personal halo to room-filling royalty.',
    options: [
      { label: 'Subtle & Discreet', value: 'subtle', description: 'Only noticed upon an intimate embrace' },
      { label: 'Moderate & Balanced', value: 'moderate', description: 'Leaves a pleasant, memorable trail within arm’s length' },
      { label: 'Strong & Commanding', value: 'strong', description: 'Unmistakable room-filling presence that lingers for hours' },
    ],
  },
];
