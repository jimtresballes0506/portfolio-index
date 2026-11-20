# ☕ Aura Roastery & Café — Landing Page & Quick-Order System

A modern specialty coffee shop landing page and interactive ordering web application built with **React 19**, **Vite**, and **Tailwind CSS v4**. Designed as a high-converting hospitality showcase combined with a reactive quick-order system.

---

## ✨ Key Features

- **Interactive Seasonal Menu**:
  - Filter across 6 categories (*All Menu*, *Signature Espresso*, *Cold Brew & Iced*, *Single Origin Pour Over*, *Matcha & Botanicals*, *Artisanal Bakery*) with live item counts.
  - Real-time search by drink name, description, or tasting notes (e.g., *Jasmine*, *Maple*, *Matcha*).
  - Quick dietary & popularity toggles (*All*, *★ Bestsellers*, *Plant-Based*).
- **Barista Drink Customizer Modal**:
  - Customize **Cup Size** (Regular 12oz / Large 16oz), **Milk Preference** (Whole, Barista Oat, Roasted Almond, Black), **Sweetness Level** (100%, 50%, Unsweetened), and **Espresso / Flavor Boosts** with real-time price calculation.
- **Persistent Slide-Over Quick-Order Drawer (`localStorage`)**:
  - Switch between **Express Pickup (Skip the Line)** and **Dine-In Table Service (Table #)**.
  - Add customer name for the cup sleeve, adjust quantities, or remove items.
  - Built-in promo code engine (try **`FIRSTBREW`** for 15% off).
  - Generates an instant **Barista Order Confirmation Receipt** with unique order ID (`#AR-XXX`) and prep time estimate.
- **Sensory Roast Profile Comparator & Direct-Trade Story**:
  - Visualizes brightness/acidity, body, and sweetness across Light, Omni, and Dark Espresso roasts.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **UI Library** | React 19 (Functional Components, Hooks: `useState`, `useMemo`, `useEffect`) |
| **Build Tool** | Vite 6 |
| **Styling** | Tailwind CSS v4 + Editorial Typography (`Fraunces` & `Plus Jakarta Sans`) |
| **Icons** | `lucide-react` |
| **State Persistence** | Browser `localStorage` |

---

## 📂 Project Architecture

```text
coffee-shop/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── index.css
    ├── App.jsx
    ├── data/
    │   └── menuData.js              # Structured menu items, customization pricing, roast profiles
    └── components/
        ├── Navbar.jsx               # Sticky header with live cart counter & announcement bar
        ├── Hero.jsx                 # Editorial showcase + #1 daily featured drink card
        ├── MenuSection.jsx          # Category tabs, search, dietary filters, product cards
        ├── DrinkCustomizerModal.jsx # Dynamic drink builder with real-time price deltas
        ├── CartDrawer.jsx           # Slide-over quick-order drawer, promo engine & receipt
        ├── RoasteryStory.jsx        # Sensory roast profile meters & farm-to-cup process
        └── FooterAndVisit.jsx       # Customer reviews, flagship café hours & newsletter
```

---

## 🚀 Getting Started Locally

```bash
# 1. Navigate into the project folder
cd coffee-shop

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Build for production
npm run build
```
