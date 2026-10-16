# NOIRÉ — Luxury Perfume E-Commerce Store: Complete Project Specification

> **Purpose**: This document is a complete, build-from-scratch specification for the NOIRÉ perfume e-commerce platform. It covers every feature — both the customer-facing storefront and the admin panel — with enough detail to recreate the entire app on any platform or framework.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack & Architecture](#2-tech-stack--architecture)
3. [Design System](#3-design-system)
4. [Global Navigation & Layout](#4-global-navigation--layout)
5. [Client-Side Storefront Pages](#5-client-side-storefront-pages)
6. [Admin Panel](#6-admin-panel)
7. [Data Models & Types](#7-data-models--types)
8. [Product Catalog (20 Products)](#8-product-catalog-20-products)
9. [Service Layer](#9-service-layer)
10. [Global State Management](#10-global-state-management)
11. [Reusable Components](#11-reusable-components)
12. [Bangladesh-Specific Features](#12-bangladesh-specific-features)
13. [Coupons System](#13-coupons-system)
14. [Perfume Quiz Engine](#14-perfume-quiz-engine)
15. [Configuration](#15-configuration)
16. [Static & Marketing Content](#16-static--marketing-content)
17. [Animations & Micro-interactions](#17-animations--micro-interactions)
18. [Accessibility & Responsive Design](#18-accessibility--responsive-design)
19. [Future Enhancement Notes](#19-future-enhancement-notes)

---

## 1. Project Overview

**NOIRÉ** is a premium, production-ready e-commerce storefront for a luxury perfume brand based in Bangladesh. The brand identity is dark luxury: deep noir blacks, warm gold accents, cream backgrounds, serif display typography, and elegant animations. The app feels like a high-end boutique, not a generic template.

**Key characteristics:**
- Currency: Bangladeshi Taka (৳), formatted with `en-BD` locale
- Local payment methods: bKash, Nagad, Cash on Delivery, Card
- 20-product catalog across 5 real categories (Men, Women, Unisex, Attar, Discovery Sets) + 2 virtual categories (Best Sellers, New Arrivals)
- Full shopping flow: browse → filter → search → quiz → cart → checkout → order tracking
- User accounts with profile, order history, wishlist, saved addresses, settings
- Complete admin panel with dashboard, product management, order management, customer list, coupon management, and category management
- Cart and wishlist persist to localStorage
- Service layer architecture that can be swapped from mock data to a real backend API

---

## 2. Tech Stack & Architecture

### Current Implementation

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) with React 18 |
| Routing | React Router DOM v6 (client-side, via catch-all page) |
| Styling | Tailwind CSS 3 with fully custom design system |
| Icons | Lucide React |
| Fonts | Cormorant Garamond (serif) + Inter (sans) from Google Fonts |
| State | React Context API (Cart, Wishlist, Auth, Toast) |
| Persistence | localStorage for cart & wishlist |
| Data | Mock data service layer (simulated network delays) |
| Database | Supabase (available, not yet wired up) |

### Architecture Notes

- **Catch-all routing**: A single `app/[[...path]]/page.tsx` mounts the main `App.tsx` which contains the `BrowserRouter` with all routes. This keeps the existing React Router setup working inside Next.js.
- **Service layer pattern**: All data access goes through service modules (`productsService`, `reviewsService`, `couponsService`, `ordersService`, `authService`, `quizService`) that simulate 200–600ms network delay and return Promises. This makes swapping to a real REST/Supabase backend trivial — only the service implementations change, not the components.
- **`'use client'` directive**: Every component using hooks, state, or browser APIs has `'use client'` at the top.

### File Structure

```
app/
  layout.tsx              — Root layout (imports global CSS, sets metadata)
  [[...path]]/page.tsx    — Catch-all page that mounts <App />
src/
  App.tsx                 — Main app with BrowserRouter + all routes
  index.css               — Global styles, Tailwind layers, design system CSS
  config/app.ts           — Central configuration (env vars, delivery, currency)
  types/index.ts          — All TypeScript domain types
  data/mockData.ts        — Mock product catalog, reviews, orders, coupons, etc.
  services/
    api.ts                — Base API client (simulateDelay, response types)
    products.ts           — Product & category service
    reviews.ts            — Review service
    coupons.ts            — Coupon validation service
    orders.ts             — Order creation & management service
    auth.ts               — Auth service (mock login/register/logout)
    quiz.ts               — Quiz recommendation scoring engine
    index.ts              — Barrel export for all services
  context/
    CartContext.tsx       — Shopping cart state + localStorage persistence
    WishlistContext.tsx   — Wishlist state + localStorage persistence
    AuthContext.tsx       — Auth state (mock)
    ToastContext.tsx      — Toast notification system
  components/
    Navbar.tsx            — Sticky navbar + mobile drawer + search overlay
    Footer.tsx            — Footer with newsletter, links, payment badges
    ProductCard.tsx       — Product card (grid + list variants + skeleton)
    ProductImage.tsx      — Image wrapper with moody filter treatment
    Rating.tsx            — Star rating display + rating bar
    Modal.tsx             — Modal, Drawer, ConfirmDialog
    ui.tsx                — SectionHeader, EmptyState, Badge, Spinner, LoadingOverlay
  pages_old/              — All page components
    HomePage.tsx
    ProductListingPage.tsx
    ProductDetailsPage.tsx
    QuizPage.tsx
    CartPage.tsx
    CheckoutPage.tsx
    OrderConfirmationPage.tsx
    AccountPage.tsx
    WishlistPage.tsx
    AuthPage.tsx
    AdminPage.tsx
```

---

## 3. Design System

### 3.1 Color Palette (Tailwind Custom)

#### Noir (Primary Dark)
| Shade | Hex |
|-------|-----|
| 50 | #f6f6f7 |
| 100 | #e9e9eb |
| 200 | #d2d2d6 |
| 300 | #a8a8b0 |
| 400 | #7a7a85 |
| 500 | #545460 |
| 600 | #3d3d47 |
| 700 | #2a2a32 |
| 800 | #1a1a20 |
| 900 | #0d0d12 |
| 950 | #06060a |

#### Gold (Accent)
| Shade | Hex |
|-------|-----|
| 50 | #fbf8ef |
| 100 | #f5ecd6 |
| 200 | #ebd9ad |
| 300 | #dfbf7a |
| 400 | #d4a84e |
| 500 | #c08f2e |
| 600 | #a37223 |
| 700 | #7f5520 |
| 800 | #5e4019 |
| 900 | #3d2a12 |

#### Cream (Light Background)
| Shade | Hex |
|-------|-----|
| 50 | #fdfbf7 |
| 100 | #faf5ec |
| 200 | #f3e9d7 |
| 300 | #ead9c0 |
| 400 | #dcc3a3 |
| 500 | #c9a884 |

#### Semantic Colors
| Type | 500 | 600 |
|------|-----|-----|
| Success | #2f7d4f | #256640 |
| Warning | #c77d2e | #a36221 |
| Error | #c0392b | #a02818 |

### 3.2 Typography

- **Headings** (h1–h5): Cormorant Garamond, weight 600, letter-spacing -0.01em
- **Body**: Inter, weights 300–700
- **Display sizes**: `text-display` = `clamp(2.5rem, 6vw, 5rem)` with line-height 1.05; `text-hero` = `clamp(2rem, 5vw, 4rem)` with line-height 1.1
- **Line spacing**: 150% for body, 120% for headings
- **Maximum 3 font weights** used in practice (400, 500, 600/700)

### 3.3 CSS Variables (Theme System)

```css
:root {
  --header-h: 64px;
  --announce-h: 36px;
  --bottom-nav-h: 60px;
  --max-w: 1280px;
  --color-bg: #faf5ec;        /* cream */
  --color-surface: #ffffff;
  --color-text: #1a1a20;
  --color-muted: #7a7a85;
  --color-border: #e9e9eb;
  --color-accent: #c08f2e;     /* gold */
  --color-accent-text: #5e4019;
}

.theme-dark {
  --color-bg: #06060a;
  --color-surface: #0d0d12;
  --color-text: #f6f6f7;
  --color-muted: #a8a8b0;
  --color-border: #2a2a32;
  --color-accent: #d4a84e;
  --color-accent-text: #ebd9ad;
}
```

### 3.4 Custom Animations (Keyframes)

| Name | Duration | Description |
|------|----------|-------------|
| `fade-in` | 0.6s | Opacity 0→1 |
| `fade-up` | 0.7s | Opacity 0→1 + translateY 24px→0 |
| `slide-in-right` | 0.35s | translateX 100%→0 |
| `slide-in-left` | 0.35s | translateX -100%→0 |
| `scale-in` | 0.3s | Opacity 0→1 + scale 0.95→1 |
| `shimmer` | 1.8s infinite | Background-position sweep for skeletons |
| `scroll-bounce` | 2s infinite | translateY 0→10px with opacity change |
| `marquee` | 28s infinite | translateX 0→-50% for scrolling text |

### 3.5 Custom Shadows

| Name | Value |
|------|-------|
| `soft` | 0 2px 12px rgba(0,0,0,0.04) |
| `card` | 0 4px 24px rgba(0,0,0,0.06) |
| `elevated` | 0 12px 40px rgba(0,0,0,0.12) |
| `gold` | 0 4px 20px rgba(192,143,46,0.18) |

### 3.6 Reusable CSS Component Classes

#### Layout
- `.container-lux` — max-width 1280px, centered, 1rem padding (2rem on md+)

#### Surfaces
- `.surface` — background: var(--color-surface)
- `.card` — surface bg, 1px border, 1rem border-radius, overflow hidden, transition on shadow/transform
- `.glass` — backdrop-blur(16px) saturate(180%), semi-transparent surface (light: rgba(250,245,236,0.8), dark: rgba(6,6,10,0.8))

#### Buttons
- `.btn` — inline-flex, rounded-full, 44px min-height, 0.875rem font, transition-all 0.2s, active scale 0.97, disabled opacity 0.5
- `.btn-primary` — dark bg / light text, hover brightness 1.1 + shadow
- `.btn-gold` — gold bg / white text, hover brightness 1.08 + gold shadow
- `.btn-outline` — transparent bg, 1px border, hover border darkens
- `.btn-ghost` — transparent, hover subtle bg tint
- `.btn-sm` — 36px min-height, 0.8125rem font
- `.btn-lg` — 52px min-height, 0.95rem font

#### Inputs
- `.input-lux` — full width, transparent bg, 1px border, 0.75rem radius, 48px min-height, gold focus border, muted placeholder
- `.chip` — rounded-full pill, 36px min-height, 0.8125rem font, border + hover
- `.chip-active` — dark bg / light text / dark border

#### Utilities
- `.skeleton` — shimmer animation loading placeholder
- `.no-scrollbar` — hidden scrollbars
- `.hide-spin` — remove number input spinners
- `.safe-bottom` — padding for bottom nav + safe area
- `.pb-safe` / `.pt-safe` — safe area insets
- `.text-balance` / `.text-pretty` — text-wrap utilities
- `.mask-fade-r` / `.mask-fade-b` — gradient mask utilities
- `.border-lux` — border-color: var(--color-border)
- `.text-muted` — color: var(--color-muted)

### 3.7 Product Image Treatment

All product images receive a consistent moody, premium look:
```css
filter: brightness(0.82) contrast(1.15) saturate(0.85);
```
Plus a gradient overlay: top 20% noir, bottom 40% noir for text legibility.

---

## 4. Global Navigation & Layout

### 4.1 Announcement Bar

Thin dark bar at the very top of the page:
> "Free Delivery on Orders Over ৳3,000 | Cash on Delivery Available"

### 4.2 Navbar (Sticky, Dark Theme)

**Structure:**
- **Logo**: "NOIR" in serif + "É" in gold — links to /
- **Desktop nav** (lg+): Men, Women, Unisex, Attar, Discovery Sets, New Arrivals, Best Sellers
  - Gold underline animation on hover
  - Active route gets gold text color
  - Centered between logo and action icons
- **Action icons** (right side):
  - Search (magnifying glass) — toggles search overlay
  - Wishlist (heart) — links to /wishlist, shows count badge if items exist
  - Cart (shopping bag) — links to /cart, shows count badge if items exist
  - Account (user) — links to /account if authenticated, /login if not
- **Mobile**: Hamburger menu (left) opens a slide-in drawer
  - Drawer contains: all nav links, "Perfume Quiz" link, Wishlist, Account/Login, Admin link
  - Close button (X) at top right of drawer
- **Scroll behavior**: Navbar becomes more opaque and gains shadow after scrolling down

### 4.3 Search Overlay

- Full-width dropdown panel below navbar with backdrop blur
- Search input with magnifying glass icon, placeholder "Search perfumes, brands, notes..."
- **Debounced search** (250ms) showing up to 6 live results
- Each result: thumbnail image, product name, brand, fragrance family, price
- Clicking a result navigates to `/perfume/:slug`
- Pressing Enter navigates to `/search?q=query`
- **Popular search chips**: Oud, Woody, Fresh, Rose, Citrus, Attar (clickable, fill the search)
- "No results found" message when search yields no matches
- Click outside or ESC to close

### 4.4 Footer

**Newsletter Section:**
- Heading: "Join the NOIRÉ Circle"
- Description about exclusive offers and new arrivals
- Email input + "Subscribe" button
- On submit: shows toast notification "Subscribed successfully!"

**Links Grid (4 columns):**

| Shop | Explore | Help | Contact |
|------|---------|------|---------|
| Men | Perfume Quiz | Delivery Info | Phone: +880 1XXX-XXXXXX |
| Women | Best Sellers | Returns & Exchange | Email: hello@noire.bd |
| Unisex | New Arrivals | FAQ | Address: Gulshan, Dhaka |
| Attar | Wishlist | Contact Us | Instagram / Facebook icons |
| Discovery Sets | | | |

**Bottom Bar:**
- Copyright: "© 2025 NOIRÉ. All rights reserved."
- Links: Privacy Policy, Terms of Service
- Payment method badges: bKash, Nagad, COD (text badges)

### 4.5 Scroll-to-Top

On every route change, the page scrolls to top automatically (via `useLocation` + `window.scrollTo(0, 0)`).

---

## 5. Client-Side Storefront Pages

### 5.1 Home Page (`/`)

The landing page has 9 sections in order:

#### Section 1: Hero
- Full-height (85vh, min 600px) with Pexels perfume background image at 50% opacity
- Gradient overlay: from noir-950/40 via noir-950/30 to noir-950/80
- Content (centered, max-w-3xl):
  - Gold uppercase eyebrow: "Premium Fragrance" (fade-in, 0.1s delay)
  - Display heading: "Find Your Signature." (fade-up, 0.2s delay)
  - Subheading: "Fragrances crafted to become part of your identity." (fade-up, 0.4s delay)
  - Two CTA buttons (fade-up, 0.6s delay):
    - Gold button: "Shop Men" → /men
    - Outline button (white border): "Shop Women" → /women
- Animated scroll-bounce chevron at bottom center

#### Section 2: Best Sellers
- SectionHeader with title "Best Sellers", subtitle "Loved by thousands across Bangladesh", "View all" link → /best-sellers
- 4-column grid (2 on mobile), loads from `productsService.getBestSellers()`
- Skeleton loading state (4 ProductCardSkeleton placeholders) while loading
- Shows first 4 products

#### Section 3: Quiz Teaser
- Dark noir-900 background section
- Centered content (max-w-2xl):
  - Sparkles icon (gold, 10×10)
  - Heading: "Not sure what to wear?"
  - Description: "Tell us what you like, and we'll help you find your signature scent."
  - Gold button: "Take the Perfume Quiz" → /quiz

#### Section 4: Shop By Fragrance
- SectionHeader centered: "Shop By Fragrance", subtitle "Explore scent families"
- 8 circular category tiles (4 cols mobile, 8 cols desktop):
  - Each: colored circle (16×16 mobile, 20×20 desktop) with Lucide icon + name below
  - Hover: scale 110%
  - Links to `/search?family=FamilyName`

| Family | Icon | Color |
|--------|------|-------|
| Fresh | Leaf | bg-success-500/10 text-success-600 |
| Woody | TreePine | bg-noir-700/10 text-noir-700 |
| Floral | Flower2 | bg-gold-400/10 text-gold-600 |
| Sweet | Cookie | bg-gold-500/10 text-gold-700 |
| Spicy | Flame | bg-error-500/10 text-error-500 |
| Citrus | Citrus | bg-gold-300/10 text-gold-600 |
| Aquatic | Droplets | bg-blue-500/10 text-blue-600 |
| Oriental | Moon | bg-noir-800/10 text-noir-800 |

#### Section 5: Discovery Sets
- Two-column card (image left, content right)
- Image: Pexels perfume photo, 4:3 aspect
- Content:
  - Gold eyebrow: "Try Before You Commit"
  - Heading: "Discovery Sets"
  - Description about 5×2ml decants
  - 3 feature bullets with BadgeCheck icons: "5 curated 2ml decants", "Explore all fragrance families", "Find your perfect match"
  - Primary button: "Explore Discovery Sets" → /discovery-sets

#### Section 6: Trending Now
- Same layout as Best Sellers
- Loads from `productsService.getTrending()`
- "View all" links to /best-sellers

#### Section 7: Gifts
- SectionHeader centered: "Gifts", subtitle "The perfect fragrance for every occasion"
- 5-column grid (2 on mobile) of gift occasion cards
- Each card: 4:5 aspect image with gradient overlay (noir-950/80 bottom), name + description overlaid in cream text
- Hover: image scale 110% over 0.7s
- All link to /best-sellers (placeholder)

**Gift Occasions:**
1. Birthday — "Make their day unforgettable"
2. Anniversary — "Celebrate your love story"
3. Eid — "The perfect gift for the festive season"
4. Valentine's Day — "Say it with scent"
5. Corporate Gifts — "Impress clients and colleagues"

#### Section 8: Customer Reviews
- Cream-100 / noir-900 (dark mode) background
- SectionHeader centered: "Customer Reviews", subtitle "Real stories from the NOIRÉ community"
- 3-column grid of review cards:
  - Quote icon (gold) at top
  - Comment text in quotes
  - Bottom: reviewer name + location (left), star rating + verified badge (right)

**6 Customer Reviews (all Bangladeshi names):**
1. Arif Hossain, Dhaka — 5★ — Onyx Noir longevity in Dhaka heat
2. Nusrat Jahan, Chattogram — 5★ — Rose Velvet for wedding, COD convenience
3. Mahmud Hasan, Sylhet — 5★ — Discovery set experience
4. Sadia Islam, Dhaka — 4★ — Amber Oud Royale for winter
5. Tanvir Ahmed, Rajshahi — 5★ — Quiz helped find scent
6. Fatima Rahman, Khulna — 5★ — White Musk Attar as daily scent

#### Section 9: Perfume Journal
- SectionHeader: "Perfume Journal", subtitle "Guides and tips from fragrance experts"
- 4-column grid of article cards (2 on mobile):
  - 4:3 aspect image with hover scale 105%
  - Category tag (gold uppercase)
  - Title in serif (hover: gold color)
  - Excerpt (2-line clamp)
  - Read time

**4 Journal Posts:**
1. "EDP vs EDT: What's the Difference?" — Guides — 5 min read
2. "How to Make Your Perfume Last Longer" — Tips — 4 min read
3. "Best Fragrances for Bangladesh's Climate" — Guides — 6 min read
4. "Understanding Top, Middle & Base Notes" — Education — 7 min read

---

### 5.2 Product Listing Page (`/men`, `/women`, `/unisex`, `/attar`, `/discovery-sets`, `/best-sellers`, `/new-arrivals`, `/search`)

A full-featured shop page with filtering, sorting, and pagination.

#### Header
- Category name (or "Search: query" for search page)
- Product count display

#### Controls Bar (sticky, glass-morphism)
- **Mobile**: Filter button (shows active filter count badge) + sort dropdown
- **Desktop**: "Filters" label + sort dropdown + grid/list view toggle (hidden on mobile)

#### Sort Options
- Featured (default) — featured products first
- Popular — by review count descending
- Newest — by createdAt descending
- Price Low–High
- Price High–Low
- Highest Rated — by rating descending

#### Desktop Filter Sidebar (sticky, 256px wide)

| Filter Section | Control Type | Options |
|---------------|-------------|---------|
| Price Range | Min/max number inputs + range slider | 0 – 10,000 |
| Fragrance Family | Chip toggles (multi-select) | Fresh, Woody, Floral, Sweet, Spicy, Citrus, Aquatic, Oriental |
| Concentration | Chip toggles (multi-select) | EDP, EDT, Parfum, Attar, EDC |
| Rating | Radio-style buttons | All, 4★+, 3★+ |
| Occasion | Chip toggles (multi-select) | Office, Daily, Date, Party, Special Occasion, Evening |
| Season | Chip toggles (multi-select) | Spring, Summer, Autumn, Winter |
| Availability | Checkbox | In stock only |
| Clear All | Button | Shows active count, resets all filters |

#### Mobile Filters
- Slide-in drawer from left side
- Same filter content as desktop sidebar
- Backdrop overlay, ESC to close

#### Product Grid
- 2 columns mobile, 3 on md, 4 on lg
- Cards stagger in with animation delay based on index
- "Load More" button at bottom if `hasMore` is true

#### Product List View (desktop only)
- Horizontal card layout: thumbnail (28×36) + brand + name + rating + description + price + wishlist/add buttons

#### States
- **Loading**: Skeleton card placeholders (shimmer animation)
- **Empty**: EmptyState component with icon, title "No products found", message, CTA button to clear filters

#### URL Parameter Support
- `/search?q=query` — search query
- `/search?family=Woody` — pre-applied family filter
- Category routes auto-filter by category slug

---

### 5.3 Product Details Page (`/perfume/:slug`)

#### Breadcrumb
Home > Category Name > Product Name

#### Main Layout (two-column, stacks on mobile)

**Gallery Column:**
- Main image: 3:4 aspect ratio, noir-950 background, moody image filter
- Discount percentage badge (top-left, red) if `discountPrice` exists
- Video play button overlay (if `videoUrl` present)
- Thumbnail strip below: selectable images, active state with gold border

**Info Column:**
- Brand label (muted text)
- Badges: "Best Seller" (gold) and/or "New Arrival" (success) if applicable
- Product name (serif, large)
- Star rating + review count (links to reviews tab)
- Price: current price large, original price with strikethrough if discounted
- **Size selector**: buttons for each variant (e.g., "50ml", "100ml"), selected state with gold border, shows variant price
- **Quantity stepper**: minus button, number display, plus button (min 1, max stock)
- Stock indicator: "In Stock" (green) or "Only X left" (warning)
- **Action buttons**:
  - "Add to Cart" (primary, full width)
  - "Buy Now" (gold, adds to cart and navigates to /checkout)
  - Wishlist heart button (ghost/outline, filled red when wishlisted)
- **Trust badges** (3 items with icons):
  - Truck icon: "Free delivery over ৳3,000"
  - ShieldCheck icon: "100% Authentic"
  - RefreshCw icon: "Easy returns"
- **Fragrance info card**: grid of properties, each with icon:
  - Fragrance Family
  - Gender
  - Longevity
  - Sillage
  - Season
  - Occasion
- **Fragrance notes card**: Top / Middle / Base notes displayed as colored bars or pills

#### Tabbed Section

**Tab 1: Description**
- Product `description` field as prose text

**Tab 2: How Does It Smell?**
- Product `scentDescription` field in italic serif text

**Tab 3: Reviews**
- **Rating summary**: overall rating (large), total review count, 4 sub-ratings (Longevity, Sillage, Scent, Value) as RatingBar components
- **Distribution bars**: 5★ through 1★ with count and percentage-width bars
- **Individual reviews**: list of review cards showing:
  - User name
  - Star rating
  - Title
  - Comment text
  - Verified badge (if verified)
  - Date
  - Sub-ratings (longevity, sillage, scent, value) as small rating bars
  - Review images (if any)

#### Related Products
- Heading "You May Also Like"
- 4 ProductCards from `productsService.getRelated()` (same family or gender)

#### Similar Products
- Heading "Similar Fragrances"
- 4 ProductCards from `productsService.getSimilar()` (same fragrance family)

---

### 5.4 Perfume Quiz Page (`/quiz`)

#### Quiz Flow
1. **5 sequential questions** (one at a time, full-screen):
   - Q1: "What are you shopping for?" → Men, Women, Unisex
   - Q2: "What type of scent do you prefer?" → Fresh, Sweet, Woody, Floral, Spicy, Oud, Aquatic
   - Q3: "Where will you wear it?" → Office, Daily, Date, Party, Special Occasion
   - Q4: "What is your budget?" → Under ৳1,000, ৳1,000–2,000, ৳2,000–5,000, ৳5,000+
   - Q5: "How strong do you want the fragrance?" → Subtle, Moderate, Strong

2. **Each question screen:**
   - Progress bar showing question X of 5
   - Question heading in serif
   - Large clickable option cards (full width)
   - Selected state: gold border + checkmark icon
   - Auto-advance to next question after short delay
   - Back button (visible after Q1)

3. **Loading state** (after Q5):
   - Sparkles icon (animated)
   - "Finding your perfect match..."
   - Calls `quizService.getRecommendations(answers)`

4. **Results page:**
   - Heading: "Your Perfect Matches"
   - Grid of up to 5 recommended ProductCards
   - "Add All to Cart" button (gold)
   - "Retake Quiz" button (outline)

#### Scoring Algorithm
Each active, non-discovery-set product gets a score:
- +4 if fragrance family matches Q2 answer
- +3 if gender matches Q1 answer
- +2 if unisex and Q1 was "unisex"
- +2 if any occasion matches Q3 answer
- +2 if price falls within Q4 budget range
- +2 if sillage matches "subtle" or "moderate" from Q5
- +3 if sillage matches "strong" from Q5
- +1 if product is featured
- +1 if product is best seller

Top 5 by score are returned as recommendations.

---

### 5.5 Cart Page (`/cart`)

#### Empty State
- Shopping bag icon (large)
- "Your cart is empty" title
- "Start Shopping" CTA button → /

#### Cart Items
Each item row shows:
- Thumbnail image (links to product detail page)
- Brand (muted) + product name (links to detail)
- Size label
- Line total (price × quantity)
- **Quantity stepper**: minus button, number, plus button (min 1)
- "Save for Later" text button
- "Remove" text button (red)

#### Remove Confirmation
- Modal dialog: "Remove Item?", "Are you sure you want to remove this item from your cart?", Cancel + Remove buttons (Remove is red/danger)

#### Saved for Later Section
- Items moved from cart
- Each: thumbnail, name, size, price, "Move to Cart" button, remove button

#### Order Summary (sticky sidebar)
- **Free delivery progress bar**:
  - If under ৳3,000: "Add ৳X more for free delivery" with progress fill (0–100%)
  - If over ৳3,000: "You've unlocked free delivery!" (green)
- **Coupon input**: text input + "Apply" button
  - Hint text: "Try: WELCOME10, NOIRE500, EID15, VIP20"
  - Active coupon display: code + discount amount + remove (X) button
  - Validation errors shown inline
- **Price breakdown**:
  - Subtotal
  - Discount (if coupon applied, green text)
  - Delivery fee (free if eligible, otherwise ৳60/120)
  - Total (bold, serif, large)
- **Buttons**:
  - "Proceed to Checkout" (gold, full width) → /checkout
  - "Continue Shopping" (ghost) → /

---

### 5.6 Checkout Page (`/checkout`)

**Guard**: Redirects to /cart if cart is empty.

#### Layout: 2-column (content left, sticky summary right)

#### Customer Information Card
- Full Name (required) — text input
- Phone Number (required) — validated as Bangladeshi: `01[3-9]XXXXXXXX`
- Email (optional) — text input

#### Delivery Address Card
- Division (required) — dropdown of 8 Bangladesh divisions
- District (required) — dropdown populated based on selected division
- Area / Thana (required):
  - If Division=Dhaka AND District=Dhaka: dropdown of 15 Dhaka areas
  - Otherwise: text input
- Full Address (required) — textarea
- Delivery Instructions (optional) — text input

#### Payment Method Card
4 selectable cards in a 2-column grid:

| Method | Icon | Description |
|--------|------|-------------|
| Cash on Delivery | Banknote | Pay when you receive |
| bKash | Wallet | Mobile financial service |
| Nagad | Wallet | Mobile financial service |
| Card | CreditCard | Visa / Mastercard |

- Selected state: gold border + gold bg tint + checkmark icon
- Note below: "Payment processing is simulated. No real payment will be charged."

#### Order Summary (sticky sidebar)
- Item list with thumbnails, names, sizes, quantities (scrollable, max-h-48)
- Subtotal
- Discount (if applied, green)
- Delivery fee: ৳60 if inside Dhaka, ৳120 if outside
- Total (bold, serif)
- "Place Order" gold button with loading spinner state

#### Form Validation
- Name: required
- Phone: required + regex validation
- Area: required
- Full address: required
- On validation failure: red error text under each field + toast "Please fill in all required fields"

#### Order Submission
1. Validates form
2. Calls `ordersService.create()` with all order data
3. On success: clears cart, shows toast "Order placed successfully!", navigates to `/order/:id` with order data
4. On failure: shows toast "Failed to place order. Please try again."

---

### 5.7 Order Confirmation Page (`/order/:id`)

#### Header
- Green checkmark circle (large, centered)
- "Thank You for Your Order." (serif, large)
- Order number (e.g., "NR-2025-XXXX")
- Order date

#### Order Status Tracker
- 6-step horizontal progress bar:
  1. Placed → 2. Confirmed → 3. Processing → 4. Shipped → 5. Out for Delivery → 6. Delivered
- Completed steps: green with checkmark
- Current step: gold pulsing
- Future steps: gray
- If cancelled/returned: shows red status instead

#### Order Summary Card
- Item list with thumbnails, names, sizes, quantities, line totals
- Subtotal, discount (if any), delivery fee, total

#### Delivery Address Card
- Full name, phone
- Full address, area, district, division
- Delivery instructions (if any)

#### Payment Card
- Payment method
- Payment status (pending/paid/failed) with colored badge
- Estimated delivery date

#### Action
- "Continue Shopping" button → /

---

### 5.8 Wishlist Page (`/wishlist`)

#### Empty State
- Heart icon (large)
- "Your wishlist is empty" title
- "Discover Perfumes" CTA → /

#### Wishlist Grid
- 2 columns mobile, 4 columns desktop
- Each card:
  - Product image (3:4 aspect) with remove (X) button overlay (top-right, glass bg)
  - Brand (muted)
  - Product name (links to detail page)
  - Price (with strikethrough if discounted)
  - "Move to Cart" button (fetches full product data to get variant info, adds to cart, removes from wishlist)

---

### 5.9 Auth Pages (`/login`, `/register`, `/forgot-password`, `/reset-password`)

A single `AuthPage` component with 4 modes, controlled by a `mode` prop.

#### Layout
- Centered card (max-w-md) on a subtle background
- NOIRÉ logo at top
- Mode-specific title and subtitle:

| Mode | Title | Subtitle |
|------|-------|----------|
| login | Welcome Back | Sign in to your account |
| register | Create Account | Join the NOIRÉ circle |
| forgot | Forgot Password? | Enter your email or phone to reset |
| reset | Reset Password | Enter your new password |

#### Login Mode
- Email or Phone input (with Mail/Phone icon prefix)
- Password input (with Lock icon prefix + Eye/EyeOff toggle)
- Remember Me checkbox
- "Forgot Password?" link → /forgot-password
- "Sign In" button (primary, full width, loading state)
- Bottom link: "Don't have an account? Sign up" → /register

#### Register Mode
- Full Name input (with User icon prefix)
- Email or Phone input (with Mail/Phone icon prefix)
- Password input (with Lock icon prefix + Eye/EyeOff toggle)
- "Create Account" button (primary, full width, loading state)
- Bottom link: "Already have an account? Sign in" → /login

#### Forgot Password Mode
- Email or Phone input
- "Send Reset Link" button
- On success: toast "Reset link sent!", redirect to /login
- Bottom link back to login

#### Reset Password Mode
- New Password input (with toggle)
- "Reset Password" button
- On success: toast "Password reset successfully!", redirect to /login

#### Auth Behavior
- On successful login/register: toast notification, redirect to /account
- Loading state on buttons (spinner)
- Password visibility toggle (Eye / EyeOff icons)

---

### 5.10 Account Page (`/account`)

#### Layout: 4-column grid (1 col sidebar, 3 cols content)

#### Sidebar
- User avatar: gold circle with User icon
- User name + email/phone
- Tab navigation (vertical):
  - Profile (User icon)
  - Orders (Package icon)
  - Wishlist (Heart icon) — shows count badge if items exist
  - Addresses (MapPin icon)
  - Settings (Settings icon)
- Logout button (red text, LogOut icon)

#### Profile Tab
- "Profile Information" heading
- Full Name input (pre-filled)
- Phone input (pre-filled)
- Email input (pre-filled)
- "Save Changes" button (primary)

#### Orders Tab
- If empty: EmptyState with "No orders yet" + "Start Shopping" CTA
- Order history cards:
  - Order number + date
  - Status badge (color-coded: placed=gray, confirmed=blue, processing=gold, shipped=purple, out_for_delivery=orange, delivered=green, cancelled/returned=red)
  - Item thumbnails row
  - Item count + total
  - "View Order" link → /order/:id

**Order Status Colors:**
| Status | Label | Color |
|--------|-------|-------|
| placed | Order Placed | noir-100/noir-700 |
| confirmed | Confirmed | blue-100/blue-700 |
| processing | Processing | gold-100/gold-700 |
| shipped | Shipped | purple-100/purple-700 |
| out_for_delivery | Out for Delivery | orange-100/orange-700 |
| delivered | Delivered | success-500/10/success-600 |
| cancelled | Cancelled | error-500/10/error-500 |
| returned | Returned | error-500/10/error-500 |

#### Wishlist Tab
- If empty: EmptyState with heart icon + "Discover Perfumes" CTA
- Grid of wishlisted products (2 cols mobile, 3 cols desktop)
- Each: image, brand, name, price, "View" button, remove (filled heart, red) button

#### Addresses Tab
- "Saved Addresses" heading + "Add New" button
- Address cards (2-column grid):
  - Label (Home/Office) + "Default" badge if applicable
  - Full name, phone
  - Full address text
  - Area, district, division

**Mock Addresses:**
1. Home — Arif Hossain, 01711-234567, House 42 Road 11 Gulshan 1, Gulshan/Dhaka/Dhaka — Default
2. Office — Arif Hossain, 01711-234567, Level 6 ABC Tower Kemal Ataturk Avenue, Banani/Dhaka/Dhaka

#### Settings Tab
- **Notifications section** (4 toggles, all checked by default):
  - Order updates
  - New arrivals
  - Exclusive offers
  - Perfume journal
- **Preferences section** (2 toggles):
  - Dark mode (unchecked)
  - Email newsletter (checked)

---

## 6. Admin Panel

**Route**: `/admin`
**Layout**: Separate from storefront — fixed dark sidebar on left (lg+), content area on right. On mobile, sidebar collapses to top.

### 6.1 Admin Sidebar

- Dark noir-900 background, cream text
- Logo: "NOIRÉ" + "Admin Panel" subtitle
- Navigation tabs with icons:
  1. Dashboard (LayoutDashboard icon)
  2. Products (Package icon)
  3. Orders (ShoppingCart icon)
  4. Customers (Users icon)
  5. Coupons (Tag icon)
  6. Categories (FolderTree icon)
- Active tab: gold background + white text
- Inactive tab: hover noir-800
- "Exit Admin" link (X icon) → /

### 6.2 Dashboard Tab

#### Stat Cards (5 cards, responsive grid: 2 cols mobile → 5 cols lg)

| Stat | Icon | Color | Value Source |
|------|------|-------|-------------|
| Total Revenue | DollarSign | success-600 bg-success-500/10 | Sum of 6 months salesData |
| Total Orders | ShoppingCart | blue-600 bg-blue-500/10 | Sum of monthly orders |
| Total Customers | Users | gold-600 bg-gold-500/10 | adminCustomers.length |
| Products Sold | Package | purple-600 bg-purple-500/10 | products.length |
| Pending Orders | Clock | orange-600 bg-orange-500/10 | Orders with status placed/confirmed |

Each card: colored icon circle, label (muted), value (serif, 2xl)

#### Sales Chart
- Card with "Sales Overview" heading + TrendingUp icon
- Bar chart: 6 months (Mar–Aug)
- Each bar: gold, height proportional to revenue, month label below, revenue value above
- Height: 48px (192px) container, bars animate in

**Sales Data:**
| Month | Revenue | Orders |
|-------|---------|--------|
| Mar | ৳84,000 | 28 |
| Apr | ৳96,000 | 32 |
| May | ৳128,000 | 45 |
| Jun | ৳156,000 | 52 |
| Jul | ৳184,000 | 61 |
| Aug | ৳215,000 | 73 |

#### Recent Orders
- Card with "Recent Orders" heading
- List of mock orders: order number, customer name, total
- Each row separated by border

### 6.3 Products Tab

#### Header
- "Products (N)" heading
- "Add Product" button (primary, Plus icon)

#### Search
- Search input with Search icon prefix
- Filters products by name (case-insensitive)

#### Products Table
| Column | Shown On | Content |
|--------|----------|---------|
| Product | All | Thumbnail (10×14) + name + brand |
| Category | md+ | Category slug (capitalized) |
| Price | All | Discount price if exists, otherwise regular price |
| Stock | md+ | Stock number |
| Status | md+ | Badge (success if active, default otherwise) |
| Actions | All | Edit (gold hover) + Delete (red hover) icons |

- Hover: row background tint
- Scrollable horizontally on mobile

### 6.4 Orders Tab

#### Order Cards
Each order as a card:
- Top row: Order number + customer name/phone (left), status dropdown + total (right)
- Status dropdown: all 8 statuses (placed, confirmed, processing, shipped, out_for_delivery, delivered, cancelled, returned) — select with rounded-full styling
- Item row: thumbnails + "name × quantity" for each item

### 6.5 Customers Tab

#### Customers Table
| Column | Shown On | Content |
|--------|----------|---------|
| Name | All | Customer name (font-medium) |
| Phone | md+ | Phone number (muted) |
| Email | md+ | Email (muted) |
| Orders | All | Order count |
| Total Spent | All | Formatted price (font-medium) |
| Last Order | md+ | Date (muted) |

**6 Mock Customers:**
1. Arif Hossain — 01711-234567 — 5 orders — ৳18,500 — 2025-08-20
2. Nusrat Jahan — 01812-345678 — 3 orders — ৳12,400 — 2025-08-15
3. Mahmud Hasan — 01913-456789 — 2 orders — ৳7,800 — 2025-07-28
4. Sadia Islam — 01514-567890 — 4 orders — ৳15,600 — 2025-08-22
5. Tanvir Ahmed — 01615-678901 — 1 order — ৳4,200 — 2025-08-10
6. Fatima Rahman — 01716-789012 — 6 orders — ৳22,300 — 2025-08-25

### 6.6 Coupons Tab

#### Header
- "Coupons (N)" heading
- "Add Coupon" button (primary, Plus icon)

#### Coupon Cards (3-column grid)
Each card:
- Coupon code (mono font, bold, lg) + Active/Inactive badge
- Discount type: "X% off" or "৳X off"
- Min order: formatted price
- Usage: usedCount/usageLimit
- Expiry date
- Edit (gold hover) + Delete (red hover) icons

### 6.7 Categories Tab

#### Header
- "Categories (N)" heading
- "Add Category" button (primary, Plus icon)

#### Category Cards (3-column grid)
Each card:
- Category name (font-medium)
- Slug + product count (muted)
- Edit (gold hover) + Delete (red hover) icons

**7 Categories:**
Men (8), Women (7), Unisex (3), Attar (2), Discovery Sets (2), Best Sellers (6), New Arrivals (5)

---

## 7. Data Models & Types

### Core Enums

```typescript
type Gender = 'men' | 'women' | 'unisex';
type Concentration = 'EDP' | 'EDT' | 'Parfum' | 'Attar' | 'EDC';
type FragranceFamily = 'Fresh' | 'Woody' | 'Floral' | 'Sweet' | 'Spicy' | 'Citrus' | 'Aquatic' | 'Oriental';
type Season = 'Spring' | 'Summer' | 'Autumn' | 'Winter';
type Occasion = 'Office' | 'Daily' | 'Date' | 'Party' | 'Special Occasion' | 'Evening';
type Sillage = 'Subtle' | 'Moderate' | 'Strong' | 'Very Strong' | 'Varies';
type ProductStatus = 'active' | 'draft' | 'archived';
type OrderStatus = 'placed' | 'confirmed' | 'processing' | 'shipped' | 'out_for_delivery' | 'delivered' | 'cancelled' | 'returned';
type PaymentMethod = 'cod' | 'bkash' | 'nagad' | 'card';
```

### Product

```typescript
interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;              // category slug
  gender: Gender;
  price: number;                 // base price (smallest size)
  discountPrice?: number;
  images: string[];
  videoUrl?: string;
  sizes: ProductVariant[];
  stock: number;
  fragranceFamily: FragranceFamily;
  topNotes: string[];
  middleNotes: string[];
  baseNotes: string[];
  concentration: Concentration;
  longevity: string;             // e.g. "8-10 hours"
  sillage: Sillage;
  occasions: Occasion[];
  seasons: Season[];
  rating: number;                // 0-5
  reviewCount: number;
  description: string;
  scentDescription: string;      // italic "How does it smell?"
  featured: boolean;
  bestSeller: boolean;
  newArrival: boolean;
  trending: boolean;
  status: ProductStatus;
  createdAt: string;             // for "newest" sorting
}

interface ProductVariant {
  id: string;
  size: string;                  // "50ml", "100ml", "12ml", "5×2ml"
  price: number;
  discountPrice?: number;
  stock: number;
  sku: string;
}
```

### Category

```typescript
interface Category {
  id: string;
  slug: string;
  name: string;
  description?: string;
  image?: string;
  gender?: Gender;
  productCount?: number;
}
```

### Review

```typescript
interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;                // 1-5
  title?: string;
  comment: string;
  verified: boolean;
  images?: string[];
  longevityRating?: number;      // 1-5
  sillageRating?: number;
  scentRating?: number;
  valueRating?: number;
  createdAt: string;
}

interface ReviewSummary {
  productId: string;
  overall: number;
  totalReviews: number;
  longevity: number;
  sillage: number;
  scent: number;
  value: number;
  distribution: { rating: number; count: number }[];  // 5★ through 1★
}
```

### User & Address

```typescript
interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  avatar?: string;
  createdAt: string;
}

interface Address {
  id: string;
  label: string;                 // Home, Office
  fullName: string;
  phone: string;
  division: string;
  district: string;
  area: string;
  fullAddress: string;
  instructions?: string;
  isDefault: boolean;
}
```

### Cart

```typescript
interface CartItem {
  id: string;
  productId: string;
  slug: string;
  name: string;
  brand: string;
  image: string;
  size: string;
  variantId: string;
  price: number;
  quantity: number;
}

interface Cart {
  items: CartItem[];
  couponCode?: string;
  discount: number;
}
```

### Wishlist

```typescript
interface WishlistItem {
  id: string;
  productId: string;
  slug: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  discountPrice?: number;
  addedAt: string;
}
```

### Order

```typescript
interface OrderItem {
  productId: string;
  name: string;
  image: string;
  size: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  orderNumber: string;           // e.g. "NR-2025-XXXX"
  userId?: string;
  customer: { name: string; phone: string; email?: string };
  items: OrderItem[];
  address: Omit<Address, 'id' | 'isDefault' | 'label'>;
  paymentMethod: PaymentMethod;
  paymentStatus: 'pending' | 'paid' | 'failed';
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  couponCode?: string;
  status: OrderStatus;
  estimatedDelivery: string;
  createdAt: string;
}
```

### Coupon

```typescript
interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;                 // percentage (10) or fixed amount (500)
  minOrder: number;
  expiryDate: string;
  usageLimit: number;
  usedCount: number;
  active: boolean;
}
```

### Admin Types

```typescript
interface AdminCustomer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  orderCount: number;
  totalSpent: number;
  lastOrderDate?: string;
}

interface SalesData {
  month: string;
  revenue: number;
  orders: number;
}
```

### Other Content Types

```typescript
interface GiftOccasion {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
}

interface JournalPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  image: string;
}

interface CustomerReview {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  product?: string;
  verified: boolean;
}

interface QuizAnswer {
  questionId: string;
  value: string;
}

interface QuizResult {
  answers: QuizAnswer[];
  recommendedProductIds: string[];
}
```

---

## 8. Product Catalog (20 Products)

### Product List

| # | Name | Category | Gender | Family | Conc. | Price | Discount | Sizes | Flags |
|---|------|----------|--------|--------|-------|-------|----------|-------|-------|
| 1 | Onyx Noir | men | men | Woody | EDP | 4200 | 3600 | 50ml, 100ml | featured, bestSeller, trending |
| 2 | Rose Velvet | women | women | Floral | EDP | 3800 | 3200 | 50ml, 100ml | featured, bestSeller, trending |
| 3 | Ocean Mist | men | men | Aquatic | EDT | 3200 | — | 50ml, 100ml | bestSeller |
| 4 | Amber Oud Royale | unisex | unisex | Oriental | Parfum | 6500 | 5500 | 50ml, 100ml | featured, newArrival, trending |
| 5 | Citrus Bloom | women | women | Citrus | EDT | 2800 | — | 50ml, 100ml | newArrival |
| 6 | Midnight Spice | men | men | Spicy | EDP | 4600 | 3900 | 50ml, 100ml | bestSeller, trending |
| 7 | Vanille Orchid | women | women | Sweet | EDP | 3400 | — | 50ml, 100ml | newArrival, trending |
| 8 | Saffron Dusk | unisex | unisex | Oriental | EDP | 5200 | — | 50ml, 100ml | featured, newArrival |
| 9 | Fresh Cotton | unisex | unisex | Fresh | EDT | 2400 | — | 50ml, 100ml | — |
| 10 | Oud Royale Attar | attar | unisex | Oriental | Attar | 3800 | — | 12ml | bestSeller, trending |
| 11 | White Musk Attar | attar | unisex | Fresh | Attar | 2800 | — | 12ml | newArrival |
| 12 | NOIR Signature Discovery Set | discovery-sets | unisex | Oriental | EDP | 1800 | 1500 | 5×2ml | featured, bestSeller, trending |
| 13 | Oud Discovery Set | discovery-sets | unisex | Oriental | EDP | 2200 | — | 5×2ml | newArrival |
| 14 | Leather Noir | men | men | Woody | EDP | 5500 | 4700 | 50ml, 100ml | newArrival, trending |
| 15 | Jasmine Silk | women | women | Floral | EDP | 3600 | — | 50ml, 100ml | bestSeller |
| 16 | Bergamote Verte | men | men | Citrus | EDT | 2900 | — | 50ml, 100ml | — |
| 17 | Patchouli Noir | women | women | Oriental | EDP | 4800 | 4100 | 50ml, 100ml | trending |
| 18 | Santal Blanc | men | men | Woody | EDP | 4400 | — | 50ml, 100ml | bestSeller |
| 19 | Fleur de Nuit | women | women | Floral | EDP | 5200 | 4400 | 50ml, 100ml | featured, trending |
| 20 | Green Tea Breeze | unisex | unisex | Fresh | EDT | 2600 | — | 50ml, 100ml | newArrival |

### Variant Pricing

For standard bottles (50ml, 100ml):
- 50ml = base price
- 100ml = base price + ৳1,200

For Attars: single 12ml size at base price.
For Discovery Sets: single 5×2ml size at base/discount price.

### Notes Structure

Each product has `topNotes`, `middleNotes`, `baseNotes` as string arrays. Examples:

- **Onyx Noir**: Top: Bergamot, Black Pepper, Cardamom | Middle: Cedarwood, Vetiver, Lavender | Base: Oud, Amber, Musk
- **Rose Velvet**: Top: Pink Pepper, Lychee, Bergamot | Middle: Turkish Rose, Peony, Jasmine | Base: Patchouli, White Musk, Vanilla

### Other Product Properties

- **Longevity**: ranges from "4–6 hours" (light EDTs) to "12+ hours" (attars)
- **Sillage**: Subtle (fresh/clean) to Very Strong (oud/attar)
- **Occasions**: Office/Daily for fresh/citrus; Evening/Date/Special Occasion for woody/oriental
- **Seasons**: Spring/Summer for fresh/citrus; Autumn/Winter for woody/spicy/oriental
- **Ratings**: 4.3–4.9
- **Review counts**: 29–142
- **Stock**: 12–60 units
- **Images**: 2–3 Pexels perfume photo URLs per product
- **createdAt**: dates ranging from Jan 2025 to Aug 2025

---

## 9. Service Layer

All services simulate network delay (200–600ms) and return Promises. Structured for easy backend swap.

### 9.1 Products Service

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `getAll()` | — | `Product[]` | All active products |
| `getBySlug(slug)` | slug: string | `Product \| null` | Single product by slug |
| `getById(id)` | id: string | `Product \| null` | Single product by ID |
| `getFeatured()` | — | `Product[]` | Products where featured=true |
| `getBestSellers()` | — | `Product[]` | Products where bestSeller=true |
| `getNewArrivals()` | — | `Product[]` | Products where newArrival=true |
| `getTrending()` | — | `Product[]` | Products where trending=true |
| `getByCategory(slug)` | slug: string | `Product[]` | Products by category (handles best-sellers/new-arrivals virtual categories) |
| `getRelated(productId, limit=4)` | productId, limit | `Product[]` | Same family or gender, excludes self |
| `getSimilar(productId, limit=4)` | productId, limit | `Product[]` | Same fragrance family, excludes self |
| `query(filters, sort, page, pageSize)` | filters, sort, page=1, pageSize=12 | `PaginatedResponse<Product>` | Full filtering + sorting + pagination |
| `search(query)` | query: string | `Product[]` | Search name, brand, family, category, notes |

#### Query Filters

```typescript
interface ProductFilters {
  category?: string;
  gender?: string;
  fragranceFamily?: string[];
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  inStock?: boolean;
  search?: string;
  concentration?: string[];
  sizes?: string[];
  occasions?: string[];
  seasons?: string[];
}
```

#### Sort Options
`'featured' | 'popular' | 'newest' | 'price-asc' | 'price-desc' | 'rating'`

#### PaginatedResponse

```typescript
interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
```

#### Search Logic
Searches across: name, brand, fragranceFamily, description, category, and all notes (top + middle + base). Case-insensitive.

### 9.2 Categories Service

| Method | Returns | Description |
|--------|---------|-------------|
| `getAll()` | `Category[]` | All 7 categories |
| `getBySlug(slug)` | `Category \| null` | Single category |

### 9.3 Reviews Service

| Method | Parameters | Returns |
|--------|-----------|---------|
| `getByProduct(productId)` | productId: string | `Review[]` |
| `getSummary(productId)` | productId: string | `ReviewSummary` |
| `create(data)` | Omit<Review, 'id'\|'createdAt'\|'verified'> | `Review` |

### 9.4 Coupons Service

| Method | Parameters | Returns |
|--------|-----------|---------|
| `validate(code, subtotal)` | code: string, subtotal: number | `CouponValidation` |
| `getAll()` | — | `Coupon[]` |

**CouponValidation:**
```typescript
interface CouponValidation {
  valid: boolean;
  coupon?: Coupon;
  discount: number;
  error?: string;
}
```

**Validation checks:**
1. Code exists and is active → else "Invalid coupon code"
2. Not expired → else "Coupon has expired"
3. Usage limit not reached → else "Coupon usage limit reached"
4. Subtotal meets minimum → else "Minimum order ৳X required"
5. Calculate discount: percentage → `round(subtotal * value / 100)`, fixed → `value`

### 9.5 Orders Service

| Method | Parameters | Returns |
|--------|-----------|---------|
| `create(input)` | `CreateOrderInput` | `Order` |
| `getByUser(userId)` | userId: string | `Order[]` |
| `getById(id)` | id: string | `Order \| null` |
| `getAll()` | — | `Order[]` |
| `updateStatus(id, status)` | id, status | `void` |

**Order creation generates:**
- Order number: `NR-2025-{random 4 digits}`
- Estimated delivery: 3 days from now
- Payment status: `pending` for COD, `paid` for others
- Status: `placed`

### 9.6 Auth Service (Mock)

| Method | Parameters | Returns |
|--------|-----------|---------|
| `login(emailOrPhone, password)` | string, string | `AuthResult { user, token }` |
| `register(name, emailOrPhone, password)` | string, string, string | `AuthResult { user, token }` |
| `forgotPassword(emailOrPhone)` | string | `{ success: boolean }` |
| `resetPassword(token, password)` | string, string | `{ success: boolean }` |
| `logout()` | — | `void` |
| `getCurrentUser()` | — | `User \| null` |

All methods return mock data. Login/register return `mockUser` with a mock JWT token.

### 9.7 Quiz Service

| Method | Parameters | Returns |
|--------|-----------|---------|
| `getRecommendations(answers)` | `QuizAnswer[]` | `Product[]` (max 5) |

**Scoring algorithm** (detailed in section 14).

### 9.8 Base API Client

```typescript
interface ApiResponse<T> { data: T; success: boolean; error?: string; }
interface PaginatedResponse<T> { data: T[]; total: number; page: number; pageSize: number; hasMore: boolean; }
simulateDelay(ms = 300): Promise<void>
```

---

## 10. Global State Management

### 10.1 CartContext

**State:**
- `items: CartItem[]` — cart items
- `savedItems: CartItem[]` — saved for later
- `couponCode: string | undefined`
- `discount: number`

**Methods:**
- `addItem(product, variant, quantity)` — adds item, increments if same product+variant exists
- `removeItem(id)` — removes from cart
- `updateQuantity(id, quantity)` — updates quantity (min 1)
- `saveForLater(id)` — moves item from cart to savedItems
- `moveToCart(id)` — moves item from savedItems to cart
- `removeSaved(id)` — removes from savedItems
- `clear()` — empties cart + removes coupon
- `applyCoupon(code, discount)` — sets coupon code and discount
- `removeCoupon()` — clears coupon

**Computed Values:**
- `subtotal` — sum of (price × quantity) for all items
- `discount` — from applied coupon
- `deliveryFee` — 0 if (subtotal - discount) >= 3000 OR cart empty, otherwise 60 (inside Dhaka) / 120 (outside)
- `total` — subtotal - discount + deliveryFee
- `totalItems` — sum of quantities
- `freeDeliveryProgress` — 0–100 percentage toward free delivery threshold
- `isFreeDelivery` — boolean

**Persistence:** Cart items saved to `localStorage` under key `"noire-cart"`. Loaded on init, saved on every change.

### 10.2 WishlistContext

**State:**
- `items: WishlistItem[]`

**Methods:**
- `toggle(product)` — adds if not present, removes if present
- `isWishlisted(productId)` — returns boolean
- `remove(productId)` — explicit removal
- `count` — total item count (derived)

**Persistence:** Saved to `localStorage` under key `"noire-wishlist"`.

### 10.3 AuthContext

**State:**
- `user: User | null`
- `isAuthenticated: boolean` (derived from user)
- `loading: boolean`

**Methods:**
- `login(emailOrPhone, password)` — async, sets user
- `register(name, emailOrPhone, password)` — async, sets user
- `logout()` — async, clears user

### 10.4 ToastContext

**Methods:**
- `toast(message, type?)` — shows a toast notification

**Toast Types:** `'success' | 'error' | 'info'` (default: success)

**Toast UI:**
- Position: top-right
- Auto-dismiss: 3.5 seconds
- Icons: CheckCircle2 (success), AlertCircle (error), Info (info)
- Each toast has dismiss (X) button
- Slide-in-right animation on enter

---

## 11. Reusable Components

### 11.1 ProductCard

**Grid Variant:**
- Card container with hover shadow
- 3:4 aspect image area (ProductImage component)
- Discount badge (% off, red) or "New" badge (green) — top left
- Wishlist heart button — top right, glass background, fills red when active
- Brand label (muted, uppercase)
- Star rating (small)
- Product name (links to /perfume/:slug, hover gold)
- Description (2-line clamp)
- Fragrance family + concentration (muted)
- Price: current (bold) + original strikethrough (if discounted)
- Quick-add (+) button (gold circle, adds first variant to cart with toast)
- Staggered entrance animation based on index prop

**List Variant:**
- Horizontal layout: thumbnail (28×36) | info (brand, name, rating, description) | price + actions
- Wishlist heart + "Add to Cart" button

**Skeleton Variant (ProductCardSkeleton):**
- Same dimensions, shimmer placeholder for image, lines for text

### 11.2 ProductImage

- Wrapper div with noir-950 background
- Image with brightness/contrast/saturation filter
- Gradient overlay (top 20% noir, bottom 40% noir)
- Accepts className for sizing

### 11.3 Rating

- Star display: filled (gold), half (gold half), empty (muted)
- Props: value (0-5), size ('sm' | 'md' | 'lg'), showValue (boolean), count (review count)
- Renders 5 stars + optional numeric value + optional review count text

### 11.4 RatingBar

- Label (left) + horizontal progress bar (middle) + numeric value (right)
- Bar fill: gold color, width = (value/5) × 100%
- Used for review sub-ratings (longevity, sillage, scent, value)

### 11.5 Modal / Drawer / ConfirmDialog

**Modal:**
- Portal-based (rendered at document root)
- Backdrop: blur + semi-transparent
- Content: surface bg, rounded, max-width based on content
- Title bar with close button OR floating close button (top right)
- ESC key closes
- Scroll lock on body when open
- Scale-in animation

**Drawer:**
- Portal-based
- Slides in from left or right (configurable)
- Backdrop overlay
- ESC + scroll lock
- Slide-in animation (left or right variant)

**ConfirmDialog:**
- Modal with:
  - Title
  - Message
  - Cancel button (ghost/outline)
  - Confirm button (danger variant with red bg for destructive actions)
  - Callback on confirm

### 11.6 UI Components (`ui.tsx`)

**SectionHeader:**
- Title (serif, responsive size)
- Optional subtitle (muted)
- Optional "View all" link with ChevronRight icon
- Optional `center` prop for centered layout

**EmptyState:**
- Icon (centered, large)
- Title (serif)
- Message (muted)
- Optional action button/element

**Badge:**
- 5 variants: default (gray), gold, success (green), error (red), outline
- Small pill shape, rounded-full, text-xs

**Spinner:**
- 3 sizes: sm, md, lg
- Gold top-border, spin animation
- Transparent background

**LoadingOverlay:**
- Centered spinner + label text
- Semi-transparent backdrop

---

## 12. Bangladesh-Specific Features

### Divisions & Districts

All 8 Bangladesh divisions with their districts:

| Division | Districts |
|----------|-----------|
| Dhaka | Dhaka, Gazipur, Narayanganj, Manikganj, Munshiganj, Tangail |
| Chattogram | Chattogram, Cox's Bazar, Comilla, Feni, Rangamati |
| Rajshahi | Rajshahi, Bogra, Pabna, Sirajganj, Natore |
| Khulna | Khulna, Jessore, Satkhira, Bagerhat, Magura |
| Sylhet | Sylhet, Moulvibazar, Habiganj, Sunamganj |
| Barishal | Barishal, Patuakhali, Barguna, Pirojpur |
| Rangpur | Rangpur, Dinajpur, Kurigram, Nilphamari |
| Mymensingh | Mymensingh, Jamalpur, Netrokona, Sherpur |

### Dhaka Areas (Dropdown)

Gulshan, Banani, Dhanmondi, Mirpur, Uttara, Mohakhali, Bashundhara, Motijheel, Farmgate, Tejgaon, Khilgaon, Rampura, Badda, Baridhara, Niketan

Shown as dropdown when Division=Dhaka AND District=Dhaka in checkout. Otherwise, a text input is shown.

### Phone Validation

Regex: `^01[3-9]\d{8}$` (after stripping spaces and dashes)
- Must start with 01
- Second digit must be 3-9
- Total 11 digits

### Delivery Fees

- Inside Dhaka (Division=Dhaka, District=Dhaka): ৳60
- Outside Dhaka: ৳120
- Free delivery if (subtotal - discount) >= ৳3,000
- Estimated delivery: 2–4 business days (inside), 3–6 business days (outside)

### Payment Methods

1. **Cash on Delivery** (cod) — payment status: pending
2. **bKash** (bkash) — payment status: paid (simulated)
3. **Nagad** (nagad) — payment status: paid (simulated)
4. **Card** (card) — payment status: paid (simulated)

Note displayed: "Payment processing is simulated. No real payment will be charged."

---

## 13. Coupons System

### Available Coupons

| Code | Type | Value | Min Order | Expiry | Usage Limit | Used |
|------|------|-------|-----------|--------|------------|------|
| WELCOME10 | percentage | 10% | ৳0 | 2026-12-31 | 1000 | 234 |
| NOIRE500 | fixed | ৳500 | ৳3,000 | 2026-06-30 | 500 | 89 |
| EID15 | percentage | 15% | ৳2,000 | 2026-04-15 | 300 | 156 |
| VIP20 | percentage | 20% | ৳5,000 | 2026-12-31 | 100 | 42 |

### Validation Flow

1. Look up coupon by code (case-insensitive) + active status
2. Check expiry date against current date
3. Check usage count against limit
4. Check subtotal against minimum order
5. Calculate discount:
   - Percentage: `Math.round((subtotal * value) / 100)`
   - Fixed: `value`
6. Return `{ valid: true, coupon, discount }` or `{ valid: false, discount: 0, error: "message" }`

### Cart Integration

- Coupon applied via `applyCoupon(code, discount)` in CartContext
- Cart shows active coupon with code + discount amount + remove button
- Discount subtracted from subtotal before calculating delivery fee eligibility
- Removing coupon clears code and discount

---

## 14. Perfume Quiz Engine

### Questions

| ID | Question | Options |
|----|----------|---------|
| q1 | What are you shopping for? | men, women, unisex |
| q2 | What type of scent do you prefer? | Fresh, Sweet, Woody, Floral, Spicy, Oud, Aquatic |
| q3 | Where will you wear it? | Office, Daily, Date, Party, Special Occasion |
| q4 | What is your budget? | under-1000, 1000-2000, 2000-5000, 5000+ |
| q5 | How strong do you want the fragrance? | subtle, moderate, strong |

### Scoring Algorithm

Filters: only `status === 'active'` and `category !== 'discovery-sets'`

Each product gets a score:

| Match | Points |
|-------|--------|
| Gender matches q1 | +3 |
| Gender is unisex and q1 is "unisex" | +2 (instead of +3) |
| Fragrance family matches q2 | +4 |
| Any occasion matches q3 (case-insensitive contains) | +2 |
| Price in q4 budget range | +2 |
| Sillage is "Subtle" and q5 is "subtle" | +2 |
| Sillage is "Moderate" or "Subtle" and q5 is "moderate" | +2 |
| Sillage is "Strong" or "Very Strong" and q5 is "strong" | +3 |
| Product is featured | +1 |
| Product is best seller | +1 |

**Budget ranges:**
- under-1000: price < 1000
- 1000-2000: 1000 ≤ price ≤ 2000
- 2000-5000: 2000 ≤ price ≤ 5000
- 5000+: price ≥ 5000

Products sorted by score descending, top 5 returned.

---

## 15. Configuration

Central config file reads environment variables with fallback defaults:

```typescript
config = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL ?? '/api',
  brand: {
    name: 'NOIRÉ',
    tagline: 'Find Your Signature.',
  },
  delivery: {
    insideDhaka: 60,                    // ৳
    outsideDhaka: 120,                  // ৳
    freeDeliveryThreshold: 3000,        // ৳
    estimatedDays: '2–4 business days',  // inside Dhaka
    estimatedDaysOutside: '3–6 business days',
    currency: '৳',
    currencyCode: 'BDT',
  },
  quiz: {
    maxRecommendations: 5,
  },
}
```

### Helper Functions

```typescript
formatPrice(amount: number): string    // "৳4,200"
formatPriceDecimal(amount: number): string  // "৳4,200" (same, for flexibility)
```

Uses `toLocaleString('en-BD')` for Bangladesh locale formatting.

---

## 16. Static & Marketing Content

### Mock User

```
Arif Hossain
arif@example.com
01711-234567
Joined: 2025-01-15
```

### Mock Orders (2 sample orders for mock user)

1. **NR-2025-0842** — 2 items (Onyx Noir 100ml + Discovery Set) — ৳6,960 — COD — status: shipped — 2025-08-28
2. **NR-2025-0734** — 1 item (Jasmine Silk 50ml) — ৳3,300 — bKash — status: delivered — 2025-08-05 — coupon: WELCOME10

### Reviews (Auto-generated)

Reviews are auto-generated for each product:
- Up to 4 reviews per product (capped at product's reviewCount)
- Bangladeshi names cycling through: Arif Hossain, Nusrat Jahan, Rahim Ahmed, Tasnia Karim, Sadia Islam, Mahmud Hasan, Fatima Rahman, Imran Khan, Sumaiya Akter, Tanvir Ahmed, Zarin Tasnim, Fahim Chowdhury
- Comments cycling through 10 pre-written review texts
- Sub-ratings (longevity, sillage, scent, value) derived from product rating
- All marked as verified
- Dates spread across 2025

### Review Summary Calculation

For each product:
- Overall = product.rating
- Longevity = round(rating × 10) / 10
- Sillage = round(rating × 10) / 10
- Scent = min(5, round(rating × 10) / 10 + 0.2)
- Value = round(rating × 10) / 10
- Distribution: 5★ gets ~60%, 4★ gets ~60%, 3★ gets ~20%, 2★ gets ~5%, 1★ gets ~5% of review count

---

## 17. Animations & Micro-interactions

### Page-Level
- Route change: scroll to top
- Hero section: staggered fade-in/fade-up with 0.1s, 0.2s, 0.4s, 0.6s delays
- Product cards: staggered entrance based on index (`animationDelay: index * 0.05s`)

### Component-Level
- Buttons: active scale 0.97, hover brightness/shadow
- Cards: hover shadow deepens, image scale 105–110%
- Links: hover color change to gold
- Filter chips: active state with bg/border change
- Navbar: scroll-based opacity/shadow change
- Mobile drawer: slide-in from left
- Search overlay: dropdown with backdrop blur
- Toast: slide-in from right, auto-dismiss
- Modal: scale-in animation
- Skeleton: shimmer animation (1.8s infinite)

### Decorative
- Scroll-bounce chevron on hero
- Marquee animation available (not currently used)
- Gift cards: image zoom on hover (0.7s)
- Journal cards: image zoom on hover (0.7s)
- Fragrance category circles: scale 110% on hover

---

## 18. Accessibility & Responsive Design

### Responsive Breakpoints

| Breakpoint | Tailwind | Behavior |
|-----------|----------|----------|
| < 640px | (default) | 2-col grids, mobile drawer, stacked layouts |
| ≥ 640px | sm | 2-col forms, some tables show more columns |
| ≥ 768px | md | 3-col grids, desktop filters sidebar appears |
| ≥ 1024px | lg | 4-col grids, full desktop nav, admin sidebar fixed |
| ≥ 1280px | xl | Max-width container caps at 1280px |

### Accessibility
- aria-labels on all icon-only buttons
- Semantic HTML (nav, main, aside, section, footer)
- Focus-visible outline: 2px solid gold with 2px offset
- 44px minimum touch targets on all interactive elements
- Alt text on all images
- Form labels associated with inputs
- Color contrast: text always readable on backgrounds (dark text on cream, light text on noir)

### Safe Area Support
- `env(safe-area-inset-bottom)` and `env(safe-area-inset-top)` CSS variables
- `.safe-bottom`, `.pb-safe`, `.pt-safe` utility classes for notched devices

---

## 19. Future Enhancement Notes

The current app uses mock data throughout. The service layer architecture is designed so that swapping to a real backend requires only changing the service implementations — no component changes needed.

### Potential Backend Migration
- Replace `simulateDelay()` calls with real `fetch()` calls to API
- Wire up Supabase for: products table, reviews table, orders table, coupons table, users (auth), addresses
- Replace mock auth with Supabase email/password auth
- Add real payment gateway integration (bKash/Nagad)
- Add real-time order status updates via Supabase subscriptions

### Potential Feature Additions
- Product comparison tool
- Recently viewed products
- Loyalty/rewards program
- Blog/journal with full article pages
- Gift wrapping option at checkout
- Subscription/recurring orders
- AI-powered scent profiling (beyond the current rule-based quiz)
- Multi-language support (Bengali/English)
- PWA / offline support
- Push notifications for order updates

---

*This specification was generated from the complete NOIRÉ codebase and covers every feature, component, page, data structure, and design decision in the project. Both the customer-facing storefront (home, product listing, product details, quiz, cart, checkout, order confirmation, wishlist, auth, account) and the admin panel (dashboard, products, orders, customers, coupons, categories) are fully documented.*
