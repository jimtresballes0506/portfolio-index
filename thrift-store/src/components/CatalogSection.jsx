'use client';

import React, { useState, useMemo } from 'react';
import {
  Search,
  Heart,
  Ruler,
  ShoppingBag,
  Check,
  X,
  RotateCcw,
  LayoutGrid,
  List,
} from 'lucide-react';
import {
  CATEGORIES,
  SIZES,
  CONDITION_GRADES,
  ERAS,
} from '../data/initialProducts';

function formatMeasurementsPreview(measurements) {
  if (!measurements) return 'Measured flat';
  if (measurements.waist && measurements.inseam) {
    return `W ${measurements.waist}" · L ${measurements.inseam}"`;
  }
  if (measurements.pitToPit && measurements.length) {
    return `P2P ${measurements.pitToPit}" · Len ${measurements.length}"`;
  }
  return 'Verified sizing';
}

export default function CatalogSection({
  products,
  filters,
  onUpdateFilter,
  onResetFilters,
  onInspectItem,
  onAddToCart,
  isInCart,
  wishlistIds,
  onToggleWishlist,
}) {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  const categoryCounts = useMemo(() => {
    const counts = { 'All Archive': products.length };
    for (const cat of CATEGORIES.slice(1)) {
      counts[cat] = products.filter((p) => p.category === cat).length;
    }
    return counts;
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((item) => {
        if (filters.hideSold && item.sold) return false;
        if (filters.showWishlistOnly && !wishlistIds.includes(item.id)) {
          return false;
        }
        if (
          filters.category !== 'All Archive' &&
          item.category !== filters.category
        ) {
          return false;
        }
        if (filters.size !== 'All Sizes' && item.size !== filters.size) {
          return false;
        }
        if (
          filters.conditionGrade !== 'All Conditions' &&
          item.conditionGrade !== filters.conditionGrade
        ) {
          return false;
        }
        if (filters.era !== 'All Eras' && item.era !== filters.era) {
          return false;
        }
        if (item.price > filters.maxPrice) {
          return false;
        }
        if (filters.search.trim() !== '') {
          const q = filters.search.toLowerCase();
          const inTitle = item.title.toLowerCase().includes(q);
          const inBrand = item.brand.toLowerCase().includes(q);
          const inSku = item.sku.toLowerCase().includes(q);
          const inMaterial = (item.material || '').toLowerCase().includes(q);
          const inTags = (item.tags || []).some((t) =>
            t.toLowerCase().includes(q)
          );
          if (!inTitle && !inBrand && !inSku && !inMaterial && !inTags) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'price-asc') return a.price - b.price;
        if (filters.sortBy === 'price-desc') return b.price - a.price;
        if (filters.sortBy === 'condition-desc')
          return b.conditionScore - a.conditionScore;
        if (filters.sortBy === 'eco-desc')
          return b.waterSavedLiters - a.waterSavedLiters;
        if (a.sold !== b.sold) return a.sold ? 1 : -1;
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return 0;
      });
  }, [products, filters, wishlistIds]);

  const hasActiveFilters =
    filters.category !== 'All Archive' ||
    filters.size !== 'All Sizes' ||
    filters.conditionGrade !== 'All Conditions' ||
    filters.era !== 'All Eras' ||
    filters.maxPrice < 220 ||
    filters.search.trim() !== '' ||
    filters.showWishlistOnly ||
    filters.hideSold;

  return (
    <section
      id="catalog"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* LEFT 3 COLS: Clean Minimalist Filter Sidebar */}
        <aside className="lg:col-span-3">
          <div className="lg:sticky lg:top-24 space-y-7">
            {/* Filter Header */}
            <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-900">
                Filters
              </span>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={onResetFilters}
                  className="text-xs text-zinc-500 hover:text-zinc-950 flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={filters.search}
                onChange={(e) => onUpdateFilter('search', e.target.value)}
                placeholder="Search garment, brand..."
                className="w-full pl-9 pr-8 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 transition-colors"
              />
              {filters.search && (
                <button
                  type="button"
                  onClick={() => onUpdateFilter('search', '')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Category List */}
            <div className="space-y-2.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block">
                Category
              </span>
              <ul className="space-y-1">
                {CATEGORIES.map((category) => {
                  const isActive = filters.category === category;
                  return (
                    <li key={category}>
                      <button
                        type="button"
                        onClick={() => onUpdateFilter('category', category)}
                        className={`w-full py-1.5 text-left text-xs flex items-center justify-between transition-colors cursor-pointer ${
                          isActive
                            ? 'text-zinc-950 font-semibold'
                            : 'text-zinc-500 hover:text-zinc-900'
                        }`}
                      >
                        <span>{category}</span>
                        <span className="font-mono text-[11px] text-zinc-400">
                          {categoryCounts[category] ?? 0}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Size Pills */}
            <div className="space-y-2.5 border-t border-zinc-100 pt-5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block">
                Size
              </span>
              <div className="grid grid-cols-4 gap-1.5">
                {SIZES.map((sz) => {
                  const active = filters.size === sz;
                  const label =
                    sz === 'All Sizes'
                      ? 'All'
                      : sz === 'One Size'
                      ? 'OS'
                      : sz;
                  return (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => onUpdateFilter('size', sz)}
                      className={`py-1.5 text-xs font-medium rounded-md border transition-colors cursor-pointer ${
                        sz === 'All Sizes' ? 'col-span-2' : ''
                      } ${
                        active
                          ? 'bg-zinc-950 text-white border-zinc-950'
                          : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Condition Grade */}
            <div className="space-y-2.5 border-t border-zinc-100 pt-5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block">
                Condition Grade
              </span>
              <div className="space-y-1">
                {CONDITION_GRADES.map((g) => {
                  const active = filters.conditionGrade === g.id;
                  return (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => onUpdateFilter('conditionGrade', g.id)}
                      className={`w-full py-1.5 text-left text-xs flex items-center justify-between transition-colors cursor-pointer ${
                        active
                          ? 'text-zinc-950 font-semibold'
                          : 'text-zinc-500 hover:text-zinc-900'
                      }`}
                    >
                      <span>{g.label}</span>
                      {g.score && (
                        <span className="font-mono text-[11px] text-zinc-400">
                          {g.score}/10
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Decade Era */}
            <div className="space-y-2.5 border-t border-zinc-100 pt-5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block">
                Era / Decade
              </span>
              <div className="flex flex-wrap gap-1.5">
                {ERAS.map((era) => {
                  const active = filters.era === era;
                  return (
                    <button
                      key={era}
                      type="button"
                      onClick={() => onUpdateFilter('era', era)}
                      className={`px-2.5 py-1 rounded-md text-xs border transition-colors cursor-pointer ${
                        active
                          ? 'bg-zinc-950 text-white border-zinc-950'
                          : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400'
                      }`}
                    >
                      {era === 'All Eras' ? 'All' : era.replace(' / 2000s', '')}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Max Price Slider */}
            <div className="space-y-2.5 border-t border-zinc-100 pt-5">
              <div className="flex items-center justify-between text-[11px] font-mono uppercase text-zinc-400">
                <span>Price Ceiling</span>
                <span className="text-zinc-900 font-semibold">
                  {filters.maxPrice >= 220
                    ? 'All ($220+)'
                    : `Up to $${filters.maxPrice}`}
                </span>
              </div>
              <input
                type="range"
                min={50}
                max={220}
                step={5}
                value={filters.maxPrice}
                onChange={(e) =>
                  onUpdateFilter('maxPrice', Number(e.target.value))
                }
                className="w-full accent-zinc-950 cursor-pointer"
              />
            </div>

            {/* Availability & Wishlist Switches */}
            <div className="space-y-2.5 border-t border-zinc-100 pt-5 text-xs text-zinc-600">
              <label className="flex items-center justify-between cursor-pointer">
                <span>Available pieces only</span>
                <input
                  type="checkbox"
                  checked={filters.hideSold}
                  onChange={(e) => onUpdateFilter('hideSold', e.target.checked)}
                  className="w-3.5 h-3.5 accent-zinc-950 rounded"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span>Saved wishlist only</span>
                <input
                  type="checkbox"
                  checked={filters.showWishlistOnly}
                  onChange={(e) =>
                    onUpdateFilter('showWishlistOnly', e.target.checked)
                  }
                  className="w-3.5 h-3.5 accent-zinc-950 rounded"
                />
              </label>
            </div>
          </div>
        </aside>

        {/* RIGHT 9 COLS: Clean Garment Gallery */}
        <div className="lg:col-span-9 space-y-6">
          {/* Top Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 pb-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-zinc-500">
                Showing{' '}
                <strong className="text-zinc-950 font-semibold">
                  {filteredProducts.length}
                </strong>{' '}
                of {products.length} archival pieces
              </span>

              {filters.category !== 'All Archive' && (
                <button
                  type="button"
                  onClick={() => onUpdateFilter('category', 'All Archive')}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-800 text-xs cursor-pointer"
                >
                  <span>{filters.category}</span>
                  <X className="w-3 h-3" />
                </button>
              )}
              {filters.size !== 'All Sizes' && (
                <button
                  type="button"
                  onClick={() => onUpdateFilter('size', 'All Sizes')}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-800 text-xs cursor-pointer"
                >
                  <span>Size {filters.size}</span>
                  <X className="w-3 h-3" />
                </button>
              )}
              {filters.conditionGrade !== 'All Conditions' && (
                <button
                  type="button"
                  onClick={() =>
                    onUpdateFilter('conditionGrade', 'All Conditions')
                  }
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-800 text-xs cursor-pointer"
                >
                  <span>{filters.conditionGrade}</span>
                  <X className="w-3 h-3" />
                </button>
              )}
              {filters.era !== 'All Eras' && (
                <button
                  type="button"
                  onClick={() => onUpdateFilter('era', 'All Eras')}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-800 text-xs cursor-pointer"
                >
                  <span>{filters.era}</span>
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-3 ml-auto">
              <select
                aria-label="Sort Archive"
                value={filters.sortBy}
                onChange={(e) => onUpdateFilter('sortBy', e.target.value)}
                className="text-xs text-zinc-700 bg-transparent border border-zinc-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-zinc-900 cursor-pointer"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="condition-desc">Condition: 10/10 to 7/10</option>
              </select>

              <div className="inline-flex rounded-lg border border-zinc-200 p-0.5 bg-zinc-50">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-white text-zinc-950 shadow-2xs'
                      : 'text-zinc-400 hover:text-zinc-700'
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                    viewMode === 'list'
                      ? 'bg-white text-zinc-950 shadow-2xs'
                      : 'text-zinc-400 hover:text-zinc-700'
                  }`}
                  title="Index List View"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center space-y-3 border border-dashed border-zinc-200 rounded-xl">
              <p className="font-serif text-2xl text-zinc-900">
                No pieces match your current selection
              </p>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                Try clearing one of your active size, era, or condition filters.
              </p>
              <button
                type="button"
                onClick={onResetFilters}
                className="px-4 py-2 rounded-full bg-zinc-950 text-white text-xs font-medium cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : viewMode === 'list' ? (
            /* Clean Minimalist Index Table View */
            <div className="divide-y divide-zinc-200 border-t border-b border-zinc-200">
              {filteredProducts.map((item) => {
                const inBag = isInCart(item.id);
                return (
                  <div
                    key={item.id}
                    className={`py-4 flex flex-wrap items-center justify-between gap-4 hover:bg-zinc-50/80 px-2 transition-colors ${
                      item.sold ? 'opacity-50' : ''
                    }`}
                  >
                    <div
                      onClick={() => onInspectItem(item)}
                      className="flex items-center gap-4 min-w-0 flex-1 cursor-pointer"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-14 h-18 object-cover bg-zinc-100 shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400">
                          <span>{item.sku}</span>
                          <span>·</span>
                          <span>{item.brand}</span>
                          <span>·</span>
                          <span>{item.era}</span>
                        </div>
                        <h3 className="text-sm font-medium text-zinc-950 truncate mt-0.5">
                          {item.title}
                        </h3>
                        <p className="text-xs text-zinc-500 mt-0.5 font-mono">
                          Size {item.size} ({item.fitsLike}) ·{' '}
                          {formatMeasurementsPreview(item.measurements)} ·{' '}
                          {item.conditionGrade} ({item.conditionScore}/10)
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <div className="text-right">
                        <span className="text-sm font-semibold text-zinc-950 font-mono block">
                          ${item.price}
                        </span>
                        <span className="text-[11px] text-zinc-400 line-through font-mono">
                          ${item.originalRetail}
                        </span>
                      </div>

                      <button
                        type="button"
                        disabled={item.sold || inBag}
                        onClick={() => onAddToCart(item)}
                        className={`px-4 py-2 text-xs font-medium transition-colors cursor-pointer ${
                          item.sold
                            ? 'bg-zinc-100 text-zinc-400'
                            : inBag
                            ? 'bg-emerald-900 text-white'
                            : 'bg-zinc-950 hover:bg-zinc-800 text-white'
                        }`}
                      >
                        {item.sold ? 'Sold' : inBag ? 'In Bag' : 'Add to Bag'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Clean Editorial 3-Column Fashion Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10">
              {filteredProducts.map((item) => {
                const inBag = isInCart(item.id);
                const isWishlisted = wishlistIds.includes(item.id);

                return (
                  <article
                    key={item.id}
                    className={`group flex flex-col ${
                      item.sold ? 'opacity-65' : ''
                    }`}
                  >
                    {/* Tall 4:5 Studio Image Container */}
                    <div className="relative aspect-4/5 w-full bg-zinc-100 overflow-hidden mb-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        onClick={() => onInspectItem(item)}
                        className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500 cursor-pointer"
                      />

                      {/* Subtle Top-Left Era & Size Tag */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <span className="px-2 py-0.5 bg-white/95 backdrop-blur-xs text-zinc-900 font-mono text-[11px] font-medium">
                          {item.era}
                        </span>
                        <span className="px-2 py-0.5 bg-zinc-950/90 text-white font-mono text-[11px]">
                          {item.size}
                        </span>
                      </div>

                      {/* Subtle Top-Right Wishlist Button */}
                      <button
                        type="button"
                        onClick={() => onToggleWishlist(item.id)}
                        aria-label="Save to Wishlist"
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-zinc-700 transition-transform active:scale-95 cursor-pointer"
                      >
                        <Heart
                          className={`w-3.5 h-3.5 ${
                            isWishlisted
                              ? 'fill-rose-500 text-rose-500'
                              : 'text-zinc-700'
                          }`}
                        />
                      </button>

                      {/* Sold / Reserved Status or Hover Action Bar */}
                      {item.sold ? (
                        <div className="absolute inset-x-3 bottom-3 py-2 bg-zinc-950/90 text-white text-center font-mono text-[11px] uppercase tracking-wider">
                          Sold / Archived
                        </div>
                      ) : inBag ? (
                        <div className="absolute inset-x-3 bottom-3 py-2 bg-emerald-900/95 text-white text-center font-mono text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5">
                          <Check className="w-3.5 h-3.5" />
                          <span>Reserved in Bag</span>
                        </div>
                      ) : (
                        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 grid grid-cols-2 gap-1.5">
                          <button
                            type="button"
                            onClick={() => onInspectItem(item)}
                            className="py-2 bg-white/95 hover:bg-white text-zinc-900 text-xs font-medium text-center shadow-xs cursor-pointer"
                          >
                            Measurements
                          </button>
                          <button
                            type="button"
                            onClick={() => onAddToCart(item)}
                            className="py-2 bg-zinc-950/95 hover:bg-zinc-950 text-white text-xs font-medium text-center shadow-xs cursor-pointer"
                          >
                            + Add 1-of-1
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Clean Minimalist Caption Beneath Photo */}
                    <div className="flex items-start justify-between gap-3">
                      <div
                        onClick={() => onInspectItem(item)}
                        className="min-w-0 cursor-pointer space-y-0.5"
                      >
                        <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 truncate">
                          {item.brand}
                        </p>
                        <h3 className="text-sm font-medium text-zinc-900 group-hover:underline line-clamp-1">
                          {item.title}
                        </h3>
                        <p className="text-xs text-zinc-500 font-mono">
                          {formatMeasurementsPreview(item.measurements)} ·{' '}
                          {item.conditionScore}/10
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-sm font-semibold text-zinc-950 font-mono block">
                          ${item.price}
                        </span>
                        <span className="text-[11px] font-mono text-zinc-400 line-through">
                          ${item.originalRetail}
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
