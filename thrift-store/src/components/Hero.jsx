'use client';

import React from 'react';
import { ArrowDownRight, Ruler, Check } from 'lucide-react';
import { ERAS } from '../data/initialProducts';

export default function Hero({
  featuredItems = [],
  onInspectItem,
  onAddToCart,
  isInCart,
  onQuickFilter,
  stats,
}) {
  const triptych = featuredItems.slice(0, 3);

  return (
    <section className="border-b border-zinc-200 bg-zinc-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 space-y-10">
        {/* Top Minimalist Editorial Header Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-zinc-200 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-zinc-500">
              <span>ARCHIVE DROP 04</span>
              <span>•</span>
              <span>1-OF-1 AUTHENTICATED VINTAGE</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl font-normal tracking-tight text-zinc-950 leading-[1.05]">
              Curated Vintage &amp;{' '}
              <span className="italic text-zinc-500">Pre-Loved</span> Archival
              Garments.
            </h1>
          </div>

          <div className="flex flex-col sm:items-end justify-between gap-4">
            <p className="text-xs sm:text-sm text-zinc-600 max-w-sm lg:text-right leading-relaxed">
              Every piece is individually sourced, ozone-sanitized, graded on a
              10-point condition scale, and measured flat in inches &amp;
              centimeters.
            </p>

            {/* Clean Era Quick-Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-mono text-zinc-400 mr-1">
                Shop by Era:
              </span>
              {ERAS.slice(1).map((era) => (
                <button
                  key={era}
                  type="button"
                  onClick={() => onQuickFilter({ era })}
                  className="px-3 py-1 rounded-full bg-white hover:bg-zinc-950 text-zinc-700 hover:text-white border border-zinc-200 text-xs font-medium transition-colors cursor-pointer"
                >
                  {era.replace(' / 2000s', '')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Clean 3-Piece Editorial Lookbook Triptych */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">
              Curator&apos;s Featured Lookbook ({triptych.length} Pieces)
            </span>
            <a
              href="#catalog"
              className="text-xs font-medium text-zinc-900 hover:underline inline-flex items-center gap-1"
            >
              <span>View all {stats.availableCount} available garments</span>
              <ArrowDownRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {triptych.map((item, idx) => {
              const inBag = isInCart(item.id);
              const m = item.measurements || {};
              const specText =
                m.waist && m.inseam
                  ? `W ${m.waist}" × L ${m.inseam}"`
                  : m.pitToPit && m.length
                  ? `P2P ${m.pitToPit}" × Len ${m.length}"`
                  : item.fitsLike;

              return (
                <div
                  key={item.id}
                  className="group bg-white border border-zinc-200/90 hover:border-zinc-400 transition-all flex flex-col"
                >
                  {/* 4:5 Lookbook Portrait */}
                  <div
                    onClick={() => onInspectItem(item)}
                    className="relative aspect-4/5 w-full bg-zinc-100 overflow-hidden cursor-pointer"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="px-2.5 py-1 bg-white/95 backdrop-blur-xs text-zinc-900 font-mono text-[11px] font-medium">
                        0{idx + 1} / {item.era}
                      </span>
                      <span className="px-2.5 py-1 bg-zinc-950/90 text-white font-mono text-[11px]">
                        Size {item.size}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-2.5 py-1 bg-white/95 backdrop-blur-xs text-zinc-800 font-mono text-[11px] flex items-center gap-1">
                        <Ruler className="w-3 h-3 text-zinc-500" />
                        {specText}
                      </span>
                      <span className="px-2.5 py-1 bg-white/95 backdrop-blur-xs text-zinc-900 font-mono text-[11px] font-semibold">
                        {item.conditionScore}/10
                      </span>
                    </div>
                  </div>

                  {/* Minimal Caption & Quick Action */}
                  <div className="p-4 flex items-center justify-between gap-4">
                    <div
                      onClick={() => onInspectItem(item)}
                      className="min-w-0 cursor-pointer"
                    >
                      <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 truncate">
                        {item.brand}
                      </p>
                      <h2 className="text-sm font-medium text-zinc-900 truncate group-hover:underline mt-0.5">
                        {item.title}
                      </h2>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-sm font-semibold text-zinc-950 font-mono">
                        ${item.price}
                      </span>
                      <button
                        type="button"
                        disabled={item.sold || inBag}
                        onClick={() => onAddToCart(item)}
                        className={`px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                          item.sold
                            ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
                            : inBag
                            ? 'bg-emerald-900 text-white'
                            : 'bg-zinc-950 hover:bg-zinc-800 text-white'
                        }`}
                      >
                        {item.sold ? (
                          'Sold'
                        ) : inBag ? (
                          <span className="inline-flex items-center gap-1">
                            <Check className="w-3 h-3" /> In Bag
                          </span>
                        ) : (
                          '+ Bag'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
