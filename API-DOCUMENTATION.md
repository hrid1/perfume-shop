# API and Data-Usage Reference

## Current API status

This project currently has **no HTTP API endpoints**: there is no `src/app/api` route tree, and the frontend does not make `fetch`/Axios requests. Data is read from `src/data/mockData.ts`, operations run in the browser, and cart, wishlist, and demo user state are stored in `localStorage`.

The only service module is `src/services/index.ts`. Its methods are asynchronous for service-style use, but they read the in-memory mock product list; they do not make network requests.

## Existing service API

| Method | Input | Result | Current use |
|---|---|---|---|
| `productsService.search(query)` | Search text | `Promise<Product[]>`; empty/whitespace input returns an empty array. Matches product name, brand, fragrance family, category, and top/middle/base notes. | Navbar search suggestions; results are limited to six in the Navbar. |
| `productsService.getAll()` | None | `Promise<Product[]>` containing `PRODUCTS`. | Defined but not currently called by a page or component. |
| `productsService.getBySlug(slug)` | Product slug | `Promise<Product \| undefined>` | Defined but not currently called. Product detail pages look up the product directly in `PRODUCTS`. |
| `productsService.getByCategory(category)` | Category slug | `Promise<Product[]>` filtered by exact category. | Defined but not currently called. Catalog filtering is performed directly in the catalog page. |

## Page and section data/API map

Route groups in parentheses are Next.js organization only; they are not part of the browser URL.

| Page / URL | Section or feature | Current data source / operation | Existing API use |
|---|---|---|---|
| Home `/` | Hero, quiz teaser, fragrance families, discovery sets, gifts, reviews, journal | Content is defined in the respective section components. | No HTTP API. |
| Home `/` | Best sellers | Filters `PRODUCTS` by `bestSeller`, then displays up to four products. | No HTTP API; reads mock data directly. |
| Home `/` | Trending | Filters `PRODUCTS` by `trending`, then displays up to four products. | No HTTP API; reads mock data directly. |
| Shared navigation | Search suggestions | Calls `productsService.search(searchQuery)` after a 250 ms debounce; shows up to six matching products. | **Uses** `productsService.search`. |
| Catalog `/catalog` | Header, filters, product grid | Reads `PRODUCTS`, then applies search, category, featured/new/bestseller/trending/wishlist, fragrance-family, and price filters plus sorting in the page. Filter state is also reflected in URL query parameters such as `category`, `family`, `filter`, and `q`. | No HTTP API; URL changes are client navigation, not API requests. Uses local wishlist state for the wishlist filter. |
| Product detail `/perfume/[slug]` | Product gallery, notes, specs, story, product actions | Finds a product by slug directly in `PRODUCTS`; an unknown slug renders the not-found page. | No HTTP API; `productsService.getBySlug` is not wired here. |
| Quiz `/quiz` | Questions and recommendations | Reads `QUIZ_QUESTIONS` and `PRODUCTS`; scores active non-discovery-set products in the browser and shows the top three. | No HTTP API. Adding a recommendation to cart uses `CartContext.addItem`. |
| Wishlist `/wishlist` | Wishlist grid and cards | Reads and updates `WishlistContext`; state is persisted in browser `localStorage`. Product details for cards are resolved from `PRODUCTS`. | No HTTP API. |
| Checkout `/checkout` | Contact, shipping, payment, order summary, success | Uses `CartContext`; shipping divisions/areas come from mock data. Validates the phone number in the browser. Order submission waits 1.2 seconds, generates a demo order number, and clears the local cart. | **No order endpoint or payment integration exists.** The success screen is a client-side simulation. |
| Admin `/admin` | Dashboard, products, orders, customers, coupons, categories | Reads mock products/categories/coupons and local constants for sales, orders, and customers. Search, filtering, and order-status updates are in component state. | No HTTP API; changes are not persisted to a backend. |

## Client-side context operations (not HTTP endpoints)

These operations are exposed by React contexts and are used by components as in-app APIs. They must not be confused with server endpoints.

| Context | Operations | Storage / behavior | Main consumers |
|---|---|---|---|
| `CartContext` | `addItem`, `removeItem`, `updateQuantity`, `clearCart`, `applyCoupon`, `removeCoupon`, `openCart`, `closeCart` | Cart and coupon are persisted in `localStorage`. Coupon lookup uses mock `COUPONS`; totals and delivery estimates are calculated locally. | Product actions, cart drawer, checkout, quiz recommendations. |
| `WishlistContext` | `toggleWishlist`, `removeItem`, `isInWishlist` | Wishlist is persisted in `localStorage`. | Product actions, navbar count, wishlist page, catalog wishlist filter. |
| `AuthContext` | `login(email)`, `logout()` | Demo profile is persisted in `localStorage`; login creates a local customer profile and does not authenticate with a server. | Navbar/account UI. |
| `ToastContext` | Toast notification helpers | In-memory UI notifications. | Cart, wishlist, and other interactive components. |

## Mock data currently used

| Data | Defined in | Used by |
|---|---|---|
| `PRODUCTS` | `src/data/mockData.ts` | Navbar search service, home best sellers/trending, catalog, product detail, wishlist cards, quiz, and admin product/category views. |
| `CATEGORIES` | `src/data/mockData.ts` | Admin categories section. |
| `COUPONS` | `src/data/mockData.ts` | Cart coupon validation and admin coupons section. |
| `QUIZ_QUESTIONS` | `src/data/mockData.ts` | Quiz page. |
| `BANGLADESH_DIVISIONS`, `DHAKA_AREAS` | `src/data/mockData.ts` | Checkout shipping-address form. |
| Reviews, sales, orders, customers | Section/page component constants or mock data | Homepage reviews and admin dashboard/management sections. No review/order/customer API is connected. |

## Backend endpoints needed for a real API integration

The routes below are a **suggested future API contract**, not routes that currently exist. They map the app's data-dependent user and admin flows to likely backend endpoints.

| Suggested endpoint | Use it for | Page / section |
|---|---|---|
| `GET /api/products` | List products; accept query parameters for search, category, family, flags, price range, sort, and pagination. | Catalog grid, home best sellers/trending, admin products. |
| `GET /api/products/{slug}` | Load one product by slug. | Product detail page. |
| `GET /api/categories` | Load category metadata and counts. | Catalog navigation/filters and admin categories. |
| `GET /api/search?q={query}` | Search products (or use `GET /api/products?q=...` instead if search is combined with product listing). | Navbar suggestions. |
| `GET /api/reviews` | Load published reviews, optionally filtered by product or featured status. | Homepage reviews and product detail reviews. |
| `POST /api/reviews` | Submit a review after adding server-side validation and any required purchase checks. | Product detail review form (not currently present as a connected submission flow). |
| `POST /api/coupons/validate` | Validate coupon status, expiry, usage limits, and minimum order against server-owned prices. | Cart drawer and checkout. |
| `POST /api/orders` | Create an order from validated cart items, address, coupon, and payment method; return a persisted order number/status. | Checkout submission. |
| `GET /api/orders/{orderNumber}` | Retrieve order confirmation/status for a persisted order. | Order confirmation/tracking (tracking page is not currently implemented). |
| `POST /api/payments/{provider}/checkout` | Initiate a supported payment-provider flow and return its redirect/session details. | Checkout payment selection for bKash, Nagad, or card. |
| `POST /api/payments/{provider}/webhook` | Receive and verify payment-provider status callbacks. | Backend payment processing; not called directly by the browser. |
| `POST /api/auth/login` | Authenticate a user and establish a secure server session. | Customer login (the current demo login is local only). |
| `POST /api/auth/logout` | End the server session. | Navbar/account UI. |
| `GET /api/auth/me` | Load the current authenticated profile and role. | Navbar/account UI and protected admin access. |
| `GET /api/cart` | Load a server-side cart for an authenticated user (optional if guest carts remain browser-only). | Cart drawer and checkout. |
| `POST /api/cart/items` | Add an item/variant to a server-side cart. | Product actions, cart drawer, quiz recommendations. |
| `PATCH /api/cart/items/{itemId}` | Change a cart item's quantity. | Cart drawer and checkout. |
| `DELETE /api/cart/items/{itemId}` | Remove a cart item. | Cart drawer and checkout. |
| `GET /api/wishlist` | Load a user's persisted wishlist. | Wishlist page, navbar, catalog wishlist filter. |
| `POST /api/wishlist/items` | Add a product to the wishlist. | Product actions and wishlist page. |
| `DELETE /api/wishlist/items/{productId}` | Remove a product from the wishlist. | Product actions and wishlist page. |
| `POST /api/quiz/recommendations` | Optionally move quiz scoring to the server and return recommended products. | Quiz results. |
| `GET /api/admin/dashboard` | Load sales metrics and dashboard summaries. | Admin dashboard. |
| `GET /api/admin/orders` | Search/filter/paginate persisted orders. | Admin orders section. |
| `PATCH /api/admin/orders/{orderId}` | Update an order status with server-side validation and audit history. | Admin orders section. |
| `GET`, `POST /api/admin/products`; `GET`, `PATCH`, `DELETE /api/admin/products/{id}` | Manage product records. | Admin products section. |
| `GET`, `POST /api/admin/categories`; `PATCH`, `DELETE /api/admin/categories/{id}` | Manage categories. | Admin categories section. |
| `GET`, `POST /api/admin/coupons`; `PATCH`, `DELETE /api/admin/coupons/{id}` | Manage coupons and usage limits. | Admin coupons section. |
| `GET /api/admin/customers` | Search and list customer records and order summaries. | Admin customers section. |

## Where to connect APIs first

Recommended order for replacing the mock behavior with real backend data:

| Priority | Connect this API | Wire it into | Why / implementation notes |
|---|---|---|---|
| 1 — Storefront | `GET /api/products` and `GET /api/products/{slug}` | Catalog page, home best-seller/trending sections, product detail, wishlist product lookup, quiz recommendations, and Navbar search. | Products are the shared source for nearly every shopping page. Replace direct `PRODUCTS` imports with a shared typed service/data-fetching layer; include loading, empty, and error states. Support query filters and pagination for catalog rather than loading the full inventory. |
| 2 — Orders | `POST /api/orders`, then payment checkout/webhook endpoints | Checkout submit and order-success flow. | Do not treat the current generated order number as a placed order. Recalculate prices, stock, discounts, and delivery fees on the server. Only show success after the server confirms the order/payment state. |
| 3 — Admin | Admin dashboard, orders, customers, products, categories, and coupons endpoints | `/admin` tab sections and their search/status controls. | This screen currently shows sample records and local-only changes. Add server-side admin authorization before exposing real business/customer data or mutations. |
| 4 — Customer identity and saved state | Auth, cart, and wishlist endpoints | Navbar account state, CartDrawer/checkout, wishlist page, catalog wishlist filter. | Current state only exists in the browser. Server-backed state can be associated with accounts and shared across devices; keep guest behavior if desired. |
| 5 — Supporting content | Reviews, newsletter subscriptions, and (if needed) journal/content endpoints | Home reviews, product detail, Footer newsletter, and journal links. | These features currently display hard-coded content or a success toast without saving anything. |
| Optional | `GET /api/categories`, shipping options, `/api/quiz/recommendations` | Catalog filters, checkout shipping, quiz results. | Categories and quiz scoring can remain derived from products initially. Add separate endpoints if the backend owns this data or if quiz scoring needs to change independently. |

## Mock data, demo behavior, and empty/missing pages

“Empty state” below means a designed state shown when there is no data; it is not an empty or missing route.

| Area | Current condition | What to connect or build |
|---|---|---|
| Products and catalog | Product cards and catalog filters use mock `PRODUCTS`. Filtering, sorting, and search execute in the browser. | Connect product list/search APIs to the catalog and shared product service. |
| Home best sellers and trending | Derived from mock product flags. | Use product-list filters (for example `isBestSeller=true` / `isTrending=true`) or a curated homepage endpoint. |
| Home reviews | Two fixed arrays of named, rated customer testimonials are rendered as “Real feedback”; they are not loaded from a review API. | Replace with approved/persisted reviews. Avoid publishing sample testimonials as real customer feedback. |
| Home journal | Three fixed article cards; “Browse All Articles” links to `/catalog`, and “Read Article” is not an article-detail link. | Add a content endpoint/CMS and journal index/detail pages, or change the labels/links until article pages exist. |
| Gift occasions | Four fixed occasion cards all link to `/catalog`; no gift-specific catalog flow is connected. | Add gift collection/product data or route each card to an appropriate filtered collection. |
| Discovery sets | Promo copy and voucher/delivery claims are hard-coded in the section. | Confirm these offers against backend-owned product, coupon, and shipping rules before treating them as live terms. |
| Checkout/order | Submit is a timed client-side simulation; it generates a random demo order number and clears the cart. Payment options are UI selections only. | Connect `POST /api/orders` and provider checkout/webhooks before accepting real orders or payments. |
| Coupon validation | Matches the code against local mock `COUPONS`; browser-calculated discount is stored locally. | Connect coupon validation and let the server recalculate the discount at order creation. |
| Cart and wishlist | Functional in the current browser, but backed only by `localStorage`; wishlist cards look up products in mock data. | Connect cart/wishlist APIs if persistence across devices/accounts is required. Otherwise these can intentionally remain guest-only browser features. |
| Authentication | `AuthContext.login` creates a demo profile locally; it does not validate credentials or establish a secure session. | Build real login/logout/session endpoints and protect admin routes on the server. |
| Admin dashboard | Revenue, order counts, and sales chart are hard-coded; orders/customers are sample constants; order status updates only affect React state. | Connect dashboard metrics, orders, customer records, and status mutation endpoints. |
| Admin products/categories/coupons | Products/categories/coupons are read from mock data; the admin controls do not persist backend changes. | Connect corresponding admin CRUD endpoints and enforce permissions server-side. |
| Footer newsletter | Form submit only shows a success toast and clears the email; no subscription request is made or email sent. | Add a newsletter subscription endpoint/provider integration and handle duplicate/invalid/server-error responses. |
| Product reviews | Product detail currently has no review list or review submission section. | Add a review display and submission UI before connecting `GET`/`POST /api/reviews`. |
| Wishlist empty state | Implemented at `/wishlist` when browser wishlist is empty; a loading skeleton appears while local storage is read. | Keep this UX; show it when the connected wishlist API returns an empty list. |
| Checkout empty state | Implemented at `/checkout` when the cart has no items. | Keep this UX; show it when the cart API returns no items. |
| Cart/search empty states | Cart drawer has an empty-bag state; Navbar search has a no-results message. | Keep these states for empty API responses, and add a separate visible error state for failed requests. |
| Routes not currently present | No dedicated customer account/login page, order-history or order-tracking page, journal article page, or product-review section is present in the app route tree. | Build these pages only if those features are in scope; the suggested endpoints alone do not create the UI. |

Protect all `/api/admin/*` routes with server-side authorization. Prices, inventory, coupon eligibility, order totals, and payment status must be checked on the server rather than trusted from browser state.
