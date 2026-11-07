'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Concentration, FragranceFamily, Gender, Product } from '@/types';
import { useProducts } from '@/context/ProductContext';

const PRODUCT_CATEGORIES = [
  'men',
  'women',
  'unisex',
  'attar',
  'wax',
  'body-mist',
  'discovery-sets',
];
const FAMILIES: FragranceFamily[] = [
  'Woody',
  'Floral',
  'Oriental',
  'Fresh',
  'Citrus',
  'Spicy',
  'Aquatic',
  'Sweet',
];
const CONCENTRATIONS: Concentration[] = ['EDP', 'EDT', 'Parfum', 'Attar', 'EDC'];

export function CreateProductForm() {
  const router = useRouter();
  const { addProduct, isLoaded } = useProducts();
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('men');
  const [gender, setGender] = useState<Gender>('men');
  const [family, setFamily] = useState<FragranceFamily>('Woody');
  const [concentration, setConcentration] = useState<Concentration>('EDP');
  const [size, setSize] = useState('50ml');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [topNotes, setTopNotes] = useState('');
  const [imageError, setImageError] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setImageError('');

    let image: URL;
    try {
      image = new URL(imageUrl);
    } catch {
      setImageError('Enter a valid image URL.');
      return;
    }

    if (
      image.protocol !== 'https:' ||
      !['images.unsplash.com', 'images.pexels.com'].includes(image.hostname)
    ) {
      setImageError('Use an HTTPS image from Unsplash or Pexels.');
      return;
    }

    const slug = name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    const createdAt = new Date().toISOString();
    const id = `custom-${Date.now()}`;
    const numericPrice = Number(price);
    const numericStock = Number(stock);
    const notes = topNotes.split(',').map((note) => note.trim()).filter(Boolean);

    const product: Product = {
      id,
      slug,
      name: name.trim(),
      brand: brand.trim(),
      category,
      gender,
      price: numericPrice,
      images: [image.toString()],
      sizes: [{
        id: `${id}-variant`,
        size: size.trim(),
        price: numericPrice,
        stock: numericStock,
        sku: `CUSTOM-${id}`,
      }],
      stock: numericStock,
      fragranceFamily: family,
      topNotes: notes,
      middleNotes: [],
      baseNotes: [],
      concentration,
      longevity: 'Not specified',
      sillage: 'Moderate',
      occasions: ['Daily'],
      seasons: ['Summer'],
      rating: 0,
      reviewCount: 0,
      description: description.trim(),
      scentDescription: description.trim(),
      featured: false,
      bestSeller: false,
      newArrival: true,
      trending: false,
      status: 'active',
      createdAt,
    };

    const result = addProduct(product);
    if (result.success) router.push('/admin/products');
  };

  const inputClass =
    'mt-1 w-full rounded-lg border border-noir-700 bg-noir-950 px-3 py-2.5 text-sm text-noir-100 outline-none focus:border-gold-400';
  const labelClass = 'block text-xs font-medium text-noir-300';

  return (
    <div className="mx-auto max-w-4xl p-6 md:p-10">
      <Link
        href="/admin/products"
        className="mb-6 inline-flex items-center gap-2 text-sm text-noir-400 transition-colors hover:text-gold-300"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to products
      </Link>

      <div className="mb-6">
        <h1 className="font-serif text-3xl font-normal text-cream-50">Add product</h1>
        <p className="mt-1 text-sm text-noir-400">
          Add an item to your catalog. Products are saved in this browser.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-noir-800 bg-noir-900/80 p-5 text-cream-50 shadow-lg sm:p-8"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <label className={labelClass}>
            Product name *
            <input required value={name} onChange={(event) => setName(event.target.value)} className={inputClass} />
          </label>
          <label className={labelClass}>
            Brand *
            <input required value={brand} onChange={(event) => setBrand(event.target.value)} className={inputClass} />
          </label>
          <label className={labelClass}>
            Product type *
            <select value={category} onChange={(event) => setCategory(event.target.value)} className={inputClass}>
              {PRODUCT_CATEGORIES.map((item) => (
                <option key={item} value={item}>
                  {item === 'discovery-sets' ? 'Discovery sets' : item.replace(/-/g, ' ')}
                </option>
              ))}
            </select>
          </label>
          <label className={labelClass}>
            For *
            <select value={gender} onChange={(event) => setGender(event.target.value as Gender)} className={inputClass}>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="unisex">Unisex</option>
            </select>
          </label>
          <label className={labelClass}>
            Fragrance family *
            <select value={family} onChange={(event) => setFamily(event.target.value as FragranceFamily)} className={inputClass}>
              {FAMILIES.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label className={labelClass}>
            Concentration *
            <select value={concentration} onChange={(event) => setConcentration(event.target.value as Concentration)} className={inputClass}>
              {CONCENTRATIONS.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label className={labelClass}>
            Size *
            <input required value={size} onChange={(event) => setSize(event.target.value)} placeholder="50ml" className={inputClass} />
          </label>
          <label className={labelClass}>
            Price (৳) *
            <input required min="1" step="1" type="number" value={price} onChange={(event) => setPrice(event.target.value)} className={inputClass} />
          </label>
          <label className={labelClass}>
            Stock quantity *
            <input required min="0" step="1" type="number" value={stock} onChange={(event) => setStock(event.target.value)} className={inputClass} />
          </label>
          <label className={labelClass}>
            Image URL *
            <input required type="url" value={imageUrl} onChange={(event) => setImageUrl(event.target.value)} placeholder="https://images.unsplash.com/..." className={inputClass} />
            {imageError && <span className="mt-1 block text-xs text-red-400">{imageError}</span>}
          </label>
          <label className={`${labelClass} sm:col-span-2`}>
            Top notes <span className="font-normal text-noir-500">(comma-separated)</span>
            <input value={topNotes} onChange={(event) => setTopNotes(event.target.value)} placeholder="Bergamot, saffron" className={inputClass} />
          </label>
          <label className={`${labelClass} sm:col-span-2`}>
            Description *
            <textarea required rows={4} value={description} onChange={(event) => setDescription(event.target.value)} className={inputClass} />
          </label>
        </div>

        <div className="mt-8 flex justify-end gap-3 border-t border-noir-800 pt-5">
          <Link
            href="/admin/products"
            className="rounded-xl border border-noir-700 px-4 py-2.5 text-sm text-noir-300 transition-colors hover:bg-noir-800"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={!isLoaded}
            className="rounded-xl bg-gold-400 px-5 py-2.5 text-sm font-semibold text-noir-950 transition-colors hover:bg-gold-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoaded ? 'Save product' : 'Loading catalog...'}
          </button>
        </div>
      </form>
    </div>
  );
}
