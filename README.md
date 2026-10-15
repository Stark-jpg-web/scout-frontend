<div align="center">

# 📽️ Scout — Frontend Client
### Modern Cinematic Discovery & Personal Film Journal Web Application

[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite_8-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![TailwindCSS v4](https://img.shields.io/badge/TailwindCSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query_v5-FF4154?style=for-the-badge&logo=react-query&logoColor=white)](https://tanstack.com/query/latest)
[![Zustand](https://img.shields.io/badge/Zustand_v5-443E3B?style=for-the-badge&logo=zustand&logoColor=white)](https://zustand.docs.pmnd.rs/)
[![i18next](https://img.shields.io/badge/i18next-26A69A?style=for-the-badge&logo=i18next&logoColor=white)](https://www.i18next.com/)
[![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

<p align="center">
  <b>Built from scratch with React 19, zero-CLS design tokens, automated scrolling intelligence, and bi-directional localization.</b>
</p>

[Live Demo](#) • [Explore Features](#-feature-showcase) • [State Architecture](#-the-4-pillars-of-state-management) • [Design System](#-cinematic-design-system-tokens) • [Testing Recipes](#-testing-suite) • [Backend Repo](https://github.com/Stark-jpg-web/scout-backend)

---

</div>

## 🌟 Feature Showcase

### 🎬 1. Automated Scrolling Hero Spotlight (`TrendingSpotlight.jsx`)
* **Dual-Engine Viewport Intelligence**: Uses `IntersectionObserver` paired with a custom `SmoothScrollbar` listener to monitor screen visibility.
* **Auto-Scroll to Area**: Whenever a new movie/show is selected or auto-advances, the viewport smoothly scrolls to frame the spotlight area into full view.
* **Scroll-Past Autoplay Pausing**: When the user scrolls down to browse lower carousels, the autoplay timer **pauses automatically** to prevent disruptive shifts or skipped titles, and resumes the instant the spotlight returns to view.
* **Interactive Quick-Jump Rail**: Horizontal thumbnail rail with smooth centering on the active title.

### 🎠 2. High-Performance Horizontal Carousels (`MediaCarousel.jsx`)
* **4 Primary Categories**: Dedicated snap-scrolling carousels for **Trending Now**, **Popular**, **Top Rated (All-Time)**, and **New Releases**.
* **Curated Genre Feeds**: Action, Sci-Fi, Drama, Animation, and Comedy.
* **Zero-CLS Layout Guarantees**: Fixed `aspect-[2/3]` portrait poster cards with animated pulse skeleton placeholders eliminate Cumulative Layout Shift.
* **DOM Containment**: Styled with `content-visibility: auto` to drastically reduce GPU memory consumption on long lists.

### 🔍 3. Debounced Search & URL Synchronization
* Custom 300ms `useDebounce` hook prevents request spamming while typing.
* Automatic two-way binding between search input and URL query parameters (`/search?q=oppenheimer`).
* Dedicated category explore views with responsive vertical grids (`/discover/:category`).

### 🌍 4. Bi-Directional Internationalization (i18n & RTL)
* Fully translated English (LTR) and Arabic (RTL) via `react-i18next`.
* Arabic typography styled using Google’s Cairo font family.
* 100% compliant with Tailwind CSS **logical properties** (`ms-*`, `me-*`, `start-*`, `end-*`, `text-start`) guaranteeing zero flipped layout bugs.

### 💾 5. Dual-Phase Persistence & Film Journal
* **Optimistic Local Storage (Phase 1)**: Instant 0ms toggling for Favorites ❤️, Watchlist 🔖, and 1–10 Star Ratings stored via Zustand (`persist`).
* **MERN Cloud Integration (Phase 2)**: Designed to seamlessly sync offline guest data to MongoDB Atlas via `POST /api/v1/library/sync`.

---

## 🎨 Cinematic Design System Tokens

Scout uses a warm, theater-inspired color palette configured directly in `src/index.css` via TailwindCSS v4 `@theme inline` and CSS Custom Properties:

| Semantic Token | Dark Mode (Default) | Light Mode (Warm Ivory) | Intended Usage |
| :--- | :--- | :--- | :--- |
| `background` | `#171312` | `#F8F3EB` | Root viewport & app background |
| `foreground` | `#F8F4EF` | `#2A211D` | Headings and primary high-contrast text |
| `surface` | `#2A2422` | `#FFFFFF` | Cards, input fields, header bar |
| `surface-elevated` | `#342B28` | `#FFFAF4` | Raised popovers, menus, and modals |
| `primary` | `#E5A93C` | `#C88514` | Gold star highlights, active indicators, CTA buttons |
| `accent` | `#D9534F` | `#C9302C` | Fire badges, active favorite ❤️ indicators |
| `muted` | `#9E928B` | `#7D726A` | Subtitles, release years, helper text |
| `border` | `#3D3532` | `#E2D9CC` | Subtle component borders and dividers |

---

## 🏛 The 4 Pillars of State Management

| State Category | Mechanism | Examples in Scout | Why It Belongs Here |
| :--- | :--- | :--- | :--- |
| **1. Server State** | `TanStack React Query v5` | Trending, top rated, genre lists, search results | Remote data requiring automated caching, 5m stale-times, deduplication, and retries. |
| **2. Persistent State** | `Zustand v5` (`persist`) | Favorites, Watchlist, 1–10 Ratings, Theme | Fast client-side optimistic UI with zero prop drilling; syncs to MongoDB in Phase 2. |
| **3. URL State** | `React Router DOM v7` | `?q=dune`, `/movie/:id`, `/discover/:category` | Single source of truth for sharable, bookmarkable browser history states. |
| **4. Local UI State** | React `useState`, `useRef` | Drawer open/close, hover star preview, touch drag | Ephemeral component-only state that unmounts with the component. |

---

## 📁 Directory Architecture

```text
scout-frontend/
├── public/                       # Static public assets & favicon
├── src/
│   ├── app/                      # App router, AppLayout shell, QueryClient setup
│   │   ├── App.jsx
│   │   ├── AppLayout.jsx
│   │   └── queryClient.js
│   ├── components/
│   │   ├── layout/               # Navbar, Footer
│   │   ├── media/                # TrendingSpotlight, MediaCard, MediaCarousel, MediaGrid
│   │   └── ui/                   # RatingBadge, Watchlist, FavoriteBadge, SmoothScrollContainer
│   ├── hooks/                    # useMovies, useLibrary, useDebounce
│   ├── locales/                  # en/common.json & ar/common.json
│   ├── pages/                    # HomePage, SearchPage, MediaDetailsPage, FavoritesPage
│   ├── services/                 # tmdb/movieApi.js (authenticated API fetch client)
│   ├── store/                    # useStore.js (Zustand state slices)
│   ├── utils/                    # constants.js, helpers.js (formatters, image CDN URLs)
│   ├── i18n.js                   # i18next configuration & language detector
│   ├── index.css                 # Tailwind v4 theme tokens & CSS variables
│   └── main.jsx                  # Entry point
├── vercel.json                   # SPA rewrite rules for production deployment
└── vite.config.js                # Vite build configuration & plugins
```

---

## 🚀 Installation & Local Development

### 1. Prerequisites
* **Node.js**: `v18.0.0` or higher
* **TMDB API Key**: Free API key from [The Movie Database](https://www.themoviedb.org/)

### 2. Setup

```bash
# Clone the repository
git clone https://github.com/Stark-jpg-web/scout-frontend.git
cd scout-frontend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
```

### 3. Environment Variables (`.env`)

```env
# TMDB API Base URL
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3

# TMDB v4 Bearer Read Access Token
VITE_TMDB_ACCESS_TOKEN=your_v4_bearer_access_token_here

# TMDB Image CDN Base URL
VITE_TMDB_IMAGE_BASE=https://image.tmdb.org/t/p
```

### 4. Running the App

```bash
# Start local development server with Hot Module Replacement (HMR)
npm run dev

# App runs locally at http://localhost:5173
```

---

## 🧪 Testing Suite & Quality Checks

Scout includes an automated unit and integration test suite configured with **Vitest** and **React Testing Library**:

```bash
# Execute unit tests
npm run test

# Run tests in interactive watch mode
npm run test:watch

# Validate Airbnb ESLint rules
npm run lint

# Auto-format codebase with Prettier
npm run format

# Compile optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🌐 Production Deployment

This frontend is optimized for deployment on **Vercel** or **Netlify**:

* Includes [`vercel.json`](file:///C:/Users/PC/Desktop/HTML/scout/scout-frontend/vercel.json) with single-page application (SPA) rewrite rules preventing `404` errors on deep routes (e.g. `/movie/:id`, `/discover/:category`).
* Production assets are compressed with Gzip/Brotli, utilizing modern ES module chunk splitting.

---

## 📄 License & Attribution

* **License**: ISC License
* **Author**: [Stark-jpg-web](https://github.com/Stark-jpg-web)
* **Notice**: This product uses the TMDB API but is not endorsed or certified by TMDB.
