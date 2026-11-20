'use client';

import React from 'react';
import {
  ShoppingBag,
  Heart,
  Database,
  Search,
  X,
} from 'lucide-react';
import { CATEGORIES } from '../data/initialProducts';

const SHORT_NAMES = {
  'All Archive': 'All Archive',
  'Outerwear & Jackets': 'Outerwear',
  'Vintage Denim': 'Denim',
  'Graphic & Band Tees': 'Tees',
  'Knitwear & Sweaters': 'Knitwear',
  'Accessories & Bags': 'Accessories',
  Footwear: 'Footwear',
};

export default function Navbar({
  cartCount,
  cartTotal,
  wishlistCount,
  showWishlistOnly,
  onToggleWishlistFilter,
  onOpenCart,
  onOpenAdmin,
  totalAvailableCount,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}) {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-zinc-200">
      {/* Minimalist Top Bar */}
      <div className="bg-zinc-950 text-zinc-300 text-[11px] py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <p className="tracking-wide">
            Complimentary carbon-neutral shipping on orders over $120 •{' '}
            <span className="text-white font-medium">
              {totalAvailableCount} one-of-one pieces available
            </span>
          </p>
          <p className="hidden sm:block text-zinc-400">
            First order 15% off with code{' '}
            <span className="text-white font-mono font-medium">THRIFT15</span>
          </p>
        </div>
      </div>

      {/* Main Boutique Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Left: Clean Brand Wordmark */}
        <a
          href="#"
          onClick={() => onSelectCategory && onSelectCategory('All Archive')}
          className="flex items-baseline gap-2 shrink-0"
        >
          <span className="text-xl font-semibold tracking-tight text-zinc-950">
            RE:THREAD
          </span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
            STUDIO
          </span>
        </a>

        {/* Center: Clean Department Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-zinc-500">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  if (onSelectCategory) onSelectCategory(cat);
                  const el = document.getElementById('catalog');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`py-1 transition-colors cursor-pointer border-b-2 ${
                  isActive
                    ? 'text-zinc-950 border-zinc-950 font-semibold'
                    : 'border-transparent hover:text-zinc-900'
                }`}
              >
                {SHORT_NAMES[cat] || cat}
              </button>
            );
          })}
        </nav>

        {/* Right: Clean Search + Admin + Wishlist + Bag */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Minimal Inline Search */}
          <div className="hidden md:flex items-center bg-zinc-100 rounded-full px-3 py-1.5 w-48 lg:w-56 focus-within:ring-1 focus-within:ring-zinc-900 transition-all">
            <Search className="w-3.5 h-3.5 text-zinc-400 mr-2 shrink-0" />
            <input
              type="text"
              value={searchQuery || ''}
              onChange={(e) => {
                if (onSearchChange) onSearchChange(e.target.value);
              }}
              placeholder="Search brand, era..."
              className="bg-transparent text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none w-full"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange && onSearchChange('')}
                className="text-zinc-400 hover:text-zinc-700 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Curator Admin Button */}
          <button
            type="button"
            onClick={onOpenAdmin}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 transition-colors cursor-pointer"
            title="Curator Admin Studio (SQLite)"
          >
            <Database className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Admin</span>
          </button>

          {/* Wishlist Toggle */}
          <button
            type="button"
            onClick={onToggleWishlistFilter}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
              showWishlistOnly
                ? 'bg-zinc-900 text-white'
                : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
            }`}
            title="Saved Wishlist"
          >
            <Heart
              className={`w-3.5 h-3.5 ${
                showWishlistOnly
                  ? 'fill-white text-white'
                  : wishlistCount > 0
                  ? 'fill-rose-500 text-rose-500'
                  : ''
              }`}
            />
            <span>{wishlistCount}</span>
          </button>

          {/* Bag Trigger */}
          <button
            type="button"
            onClick={onOpenCart}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-medium transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Bag ({cartCount})</span>
            {cartTotal > 0 && (
              <span className="hidden sm:inline text-zinc-400 pl-1 border-l border-zinc-700 font-mono">
                ${cartTotal}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
