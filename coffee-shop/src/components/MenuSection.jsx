import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Coffee,
  GlassWater,
  Flame,
  Leaf,
  Croissant,
  Search,
  Plus,
  Check,
  SlidersHorizontal,
  Star,
} from 'lucide-react';
import { CATEGORIES } from '../data/menuData';

const ICON_MAP = {
  Sparkles,
  Coffee,
  GlassWater,
  Flame,
  Leaf,
  Croissant,
};

export default function MenuSection({ items, onQuickAdd, onOpenCustomizer }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState('all');
  const [recentlyAddedId, setRecentlyAddedId] = useState(null);

  const categoryCounts = useMemo(() => {
    const counts = { all: items.length };
    items.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.tastingNotes.some((n) => n.toLowerCase().includes(query));

      const matchesDietary =
        dietaryFilter === 'all' ||
        (dietaryFilter === 'bestseller' && item.badge === 'Bestseller') ||
        (dietaryFilter === 'dairy-free' && item.dietary.includes('Dairy-Free'));

      return matchesCategory && matchesSearch && matchesDietary;
    });
  }, [items, activeCategory, searchQuery, dietaryFilter]);

  const handleQuickAddClick = (item) => {
    onQuickAdd(item);
    setRecentlyAddedId(item.id);
    setTimeout(() => {
      setRecentlyAddedId((prev) => (prev === item.id ? null : prev));
    }, 1100);
  };

  return (
    <section id="menu" className="py-16 lg:py-24 bg-[#F5EFE6] border-y border-[#E6DDD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B86B43]">
              Interactive Menu & Express Order
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#1C1613] mt-1.5">
              Curated Seasonal Offerings
            </h2>
            <p className="text-[#5C4F44] text-sm sm:text-base mt-2 max-w-xl">
              Filter by category or flavor profile. Add straight to your pickup bag with one click,
              or customize milk, size, and espresso shots.
            </p>
          </div>

          {/* Search & Quick Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-[#7A6A5E] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search drink or tasting note..."
                className="w-full sm:w-64 pl-10 pr-4 py-2.5 rounded-full bg-white border border-[#DDD0C0] text-sm text-[#1C1613] placeholder:text-[#8E7D70] focus:outline-none focus:border-[#C87D55]"
              />
            </div>

            <div className="inline-flex rounded-full bg-[#EAE0D3] p-1 border border-[#DDD0C0]">
              {[
                { id: 'all', label: 'All' },
                { id: 'bestseller', label: '★ Bestsellers' },
                { id: 'dairy-free', label: 'Plant-Based' },
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => setDietaryFilter(pill.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    dietaryFilter === pill.id
                      ? 'bg-[#1C1613] text-white shadow-xs'
                      : 'text-[#5C4F44] hover:text-[#1C1613]'
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {CATEGORIES.map((category) => {
            const IconComponent = ICON_MAP[category.icon] || Coffee;
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#1C1613] text-[#FAF6F0] shadow-sm'
                    : 'bg-white text-[#4A3E35] border border-[#DFD2C3] hover:border-[#C87D55] hover:bg-[#FAF6F0]'
                }`}
              >
                <IconComponent
                  className={`w-4 h-4 ${isActive ? 'text-[#E09F7D]' : 'text-[#B86B43]'}`}
                />
                <span>{category.label}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-[#352B25] text-[#E6C5AE]'
                      : 'bg-[#F3ECE2] text-[#7A6A5E]'
                  }`}
                >
                  {categoryCounts[category.id] || 0}
                </span>
              </button>
            );
          })}
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E6DDD0]">
            <Coffee className="w-10 h-10 text-[#C87D55] mx-auto mb-3" />
            <h3 className="font-serif-display text-xl font-bold text-[#1C1613]">
              No matching menu items found
            </h3>
            <p className="text-sm text-[#6E5D50] mt-1">
              Try clearing your search filter or switching to &ldquo;All Menu&rdquo;.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setDietaryFilter('all');
              }}
              className="mt-4 px-5 py-2.5 rounded-full bg-[#1C1613] text-white text-xs font-semibold cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const isJustAdded = recentlyAddedId === item.id;
              return (
                <article
                  key={item.id}
                  className="group bg-white rounded-3xl overflow-hidden border border-[#E5DBD0] hover:border-[#C87D55] transition-all duration-300 shadow-xs hover:shadow-xl flex flex-col"
                >
                  {/* Product Image Container */}
                  <div className="relative h-56 overflow-hidden bg-[#231B16]">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                      {item.badge && (
                        <span className="px-3 py-1 rounded-full bg-[#1C1613]/85 backdrop-blur-md text-[#FAF6F0] text-xs font-semibold">
                          {item.badge}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#1C1613] text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-[#D9822B] text-[#D9822B]" />
                        {item.rating.toFixed(1)}
                      </span>
                    </div>

                    {/* Dietary & Calorie overlay bottom left */}
                    <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-xs">
                      <div className="flex flex-wrap gap-1.5">
                        {item.dietary.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-md bg-black/50 backdrop-blur-xs border border-white/20 text-[11px] font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-white/90 font-medium">{item.calories} cal</span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-serif-display text-xl font-bold text-[#1C1613] group-hover:text-[#B86B43] transition-colors">
                          {item.name}
                        </h3>
                        <span className="font-serif-display text-xl font-bold text-[#1C1613] shrink-0">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>

                      {/* Tasting Note Pills */}
                      <div className="flex flex-wrap gap-1.5 mt-2.5">
                        {item.tastingNotes.map((note) => (
                          <span
                            key={note}
                            className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#F5EFE6] text-[#6E5D50] border border-[#E6DDD0]"
                          >
                            {note}
                          </span>
                        ))}
                      </div>

                      <p className="text-sm text-[#5C4F44] mt-3 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 pt-4 border-t border-[#EFE7DC] flex items-center gap-2.5">
                      {item.customizable && (
                        <button
                          onClick={() => onOpenCustomizer(item)}
                          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-[#F5EFE6] hover:bg-[#EAE0D3] text-[#1C1613] text-xs font-semibold transition-colors cursor-pointer"
                        >
                          <SlidersHorizontal className="w-3.5 h-3.5 text-[#B86B43]" />
                          <span>Customize</span>
                        </button>
                      )}

                      <button
                        onClick={() => handleQuickAddClick(item)}
                        className={`flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                          isJustAdded
                            ? 'bg-emerald-700 text-white'
                            : 'bg-[#1C1613] hover:bg-[#312620] text-[#FAF6F0]'
                        }`}
                      >
                        {isJustAdded ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Added to Order</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4 text-[#E09F7D]" />
                            <span>Quick Add</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
