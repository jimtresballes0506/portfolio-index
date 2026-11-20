# 🧥 RE:THREAD ARCHIVE — Curated Vintage & Online Thrift Store

A full-stack single-storefront online vintage and circular thrift store built with **Next.js 15 (App Router)**, **React 19**, **Tailwind CSS v4**, and **SQLite (`prisma/schema.prisma` + `prisma/thrift.db`)**.

---

## ✨ Key Features

- **Multi-Dimensional Thrift Catalog & Filter Console**:
  - Filter across **7 Garment Categories** (*All Archive*, *Outerwear & Jackets*, *Vintage Denim*, *Graphic & Band Tees*, *Knitwear & Sweaters*, *Accessories & Bags*, *Footwear*) with live item counts.
  - Filter by **Tagged Size** (`XS`, `S`, `M`, `L`, `XL`, `One Size`), **4-Tier Archival Condition Grade** (`Deadstock / Mint 10/10`, `Excellent Vintage 9/10`, `Good / Gently Worn 8/10`, `Distressed / Patina 7/10`), **Decade / Era** (`1970s`, `1980s`, `1990s`, `Y2K / 2000s`, `Modern Archive`), and **Interactive Price Ceiling Slider** (`$50 – $220+`).
  - Real-time search across brand label, title, fabric composition, archival SKU, and tags.
  - Sort by *Curator Featured*, *Price (Low → High / High → Low)*, *Condition Score (10 → 7)*, or *Highest Water Saved*.
- **Archival Garment Dossier & Interactive Flat-Lay Measurements Modal**:
  - Instant unit toggle between **Inches (`"`)** and **Centimeters (`cm`)** for flat-lay garment measurements (*Pit-to-Pit / Waist*, *Total Length / Inseam*, *Shoulder / Front Rise*, *Sleeve / Leg Opening*).
  - Transparent **Curator's Condition & Patina Inspection** report with visual score meter.
  - Verified **Circular Fashion Impact Card** quantifying freshwater liters saved and $\text{CO}_2\text{e}$ offset per garment.
- **1-of-1 Thrift Bag Drawer & SQLite Checkout (`POST /api/orders`)**:
  - Live free carbon-neutral shipping meter ($120 threshold).
  - Built-in promo code engine (try **`THRIFT15`** for 15% off or **`CIRCULAR10`** for $10 off).
  - Submitting an order persists the transaction in SQLite (`Order` table) and marks purchased 1-of-1 garments as **`SOLD / ARCHIVED`** in real time.
- **Single-Storefront Curator Admin Studio (`SQLite CRUD`)**:
  - Publish new 1-of-1 vintage drops (`POST /api/products`) with preset photography templates and flat-lay measurements.
  - Toggle items between `Available` and `Sold`, star/unstar featured pieces (`PATCH /api/products/[id]`), delete listings (`DELETE /api/products/[id]`), or reset the 16-item demo archive (`POST /api/seed`).

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 15 (App Router, Server Components & REST API Route Handlers) |
| **UI Library** | React 19 (`useState`, `useMemo`, `useEffect`) |
| **Styling** | Tailwind CSS v4 + Archival Editorial Typography (`Fraunces`, `Plus Jakarta Sans`, `JetBrains Mono`) |
| **Database** | SQLite (`prisma/thrift.db` + `prisma/schema.prisma` via native `node:sqlite`) |
| **Icons** | `lucide-react` |

---

## 📂 Project Architecture

```text
thrift-store/
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── prisma/
│   ├── schema.prisma                  # Prisma data model for Product & Order tables
│   └── thrift.db                      # Auto-initialized & seeded SQLite database
└── src/
    ├── data/
    │   └── initialProducts.js         # 16 curated 1-of-1 vintage pieces, eras & grading tiers
    ├── lib/
    │   └── db.js                      # SQLite connection, auto-seeding & CRUD queries
    ├── app/
    │   ├── globals.css                # Tailwind CSS v4 & typography setup
    │   ├── layout.js                  # Root layout & Google Fonts
    │   ├── page.js                    # Server Component fetching initial SQLite inventory
    │   └── api/
    │       ├── products/route.js      # GET all listings / POST new vintage listing
    │       ├── products/[id]/route.js # PATCH sold/featured status / DELETE listing
    │       ├── orders/route.js        # GET orders / POST checkout & mark 1-of-1 items sold
    │       └── seed/route.js          # POST reset & re-seed 16 archival listings
    └── components/
        ├── ThriftStoreClient.jsx      # Stateful client coordinator for filters, bag & modals
        ├── Navbar.jsx                 # Sticky archival header, Curator Studio & Bag triggers
        ├── Hero.jsx                   # Drop 04 editorial showcase & #1 Grail Spotlight card
        ├── CatalogSection.jsx         # Category tabs, multi-faceted filter console & grid
        ├── GarmentDetailModal.jsx     # Flat-lay measurement modal with IN ↔ CM unit switcher
        ├── CartDrawer.jsx             # 1-of-1 Thrift Bag, promo engine & SQLite checkout
        ├── CuratorAdminModal.jsx      # Admin portal to list drops, manage stock & view orders
        ├── GradingAndImpactSection.jsx# 4-tier condition guide & circular water/carbon ledger
        └── Footer.jsx                 # Showroom hours & early drop access signup
```

---

## 🚀 Getting Started Locally

```bash
# 1. Navigate into the project folder
cd thrift-store

# 2. Install dependencies
npm install

# 3. Start the Next.js development server
npm run dev

# 4. Build for production
npm run build
```
