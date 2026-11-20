'use client';

import React, { useState } from 'react';
import {
  X,
  Ruler,
  ShieldCheck,
  Heart,
  ShoppingBag,
  Check,
  MapPin,
  Leaf,
} from 'lucide-react';

export default function GarmentDetailModal({
  item,
  onClose,
  onAddToCart,
  isInCart,
  isWishlisted,
  onToggleWishlist,
}) {
  const [unit, setUnit] = useState('in'); // 'in' | 'cm'

  if (!item) return null;

  const inBag = isInCart(item.id);
  const m = item.measurements || {};
  const isBottoms = Boolean(m.waist && m.inseam);

  const formatVal = (val) => {
    if (!val) return '—';
    if (unit === 'cm') {
      return `${(Number(val) * 2.54).toFixed(1)} cm`;
    }
    return `${val}"`;
  };

  const measurementRows = isBottoms
    ? [
        { label: 'Waist (Measured Flat × 2)', value: formatVal(m.waist) },
        { label: 'Inseam (Crotch to Hem)', value: formatVal(m.inseam) },
        { label: 'Front Rise', value: formatVal(m.rise) },
        { label: 'Leg Opening (Flat)', value: formatVal(m.legOpening) },
      ]
    : [
        { label: 'Pit-to-Pit (Chest Flat)', value: formatVal(m.pitToPit) },
        { label: 'Total Length (Collar to Hem)', value: formatVal(m.length) },
        { label: 'Shoulder-to-Shoulder', value: formatVal(m.shoulder) },
        { label: 'Sleeve Length', value: formatVal(m.sleeve) },
      ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/50 backdrop-blur-xs">
      <div className="bg-white border border-zinc-200 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Top Minimalist Header */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-zinc-200">
          <div className="flex items-center gap-3 font-mono text-xs text-zinc-500">
            <span className="text-zinc-950 font-semibold">{item.sku}</span>
            <span>·</span>
            <span>{item.era}</span>
            <span>·</span>
            <span>{item.category}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-zinc-100 text-zinc-500 hover:text-zinc-950 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Left 5 Cols: Tall Garment Photo */}
          <div className="md:col-span-5 bg-zinc-100">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover aspect-4/5"
            />
          </div>

          {/* Right 7 Cols: Clean Studio Specifications */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              {/* Brand & Title */}
              <div className="border-b border-zinc-200 pb-5">
                <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-zinc-400">
                  <span>{item.brand}</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {item.origin}
                  </span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl text-zinc-950 mt-1">
                  {item.title}
                </h2>

                <div className="flex items-baseline gap-3 mt-3">
                  <span className="text-2xl font-semibold text-zinc-950 font-mono">
                    ${item.price}
                  </span>
                  <span className="text-xs font-mono text-zinc-400 line-through">
                    ${item.originalRetail} est. retail
                  </span>
                  <span className="ml-auto text-xs font-mono px-2.5 py-1 bg-zinc-100 text-zinc-800">
                    Size {item.size} ({item.fitsLike})
                  </span>
                </div>
              </div>

              {/* Condition Report */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold uppercase tracking-wider text-zinc-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-zinc-700" />
                    Condition &amp; Patina
                  </span>
                  <span className="font-mono text-xs text-zinc-600">
                    {item.conditionGrade} ({item.conditionScore}/10)
                  </span>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {item.conditionNotes}
                </p>
                <p className="text-xs font-mono text-zinc-500 pt-1">
                  Material: {item.material}
                </p>
              </div>

              {/* Flat-Lay Measurements Table */}
              <div className="space-y-3 border-t border-zinc-200 pt-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-900 flex items-center gap-1.5">
                    <Ruler className="w-4 h-4 text-zinc-700" />
                    Flat-Lay Measurements
                  </span>

                  <div className="inline-flex border border-zinc-200 rounded-md overflow-hidden font-mono text-[11px]">
                    <button
                      type="button"
                      onClick={() => setUnit('in')}
                      className={`px-2.5 py-1 cursor-pointer ${
                        unit === 'in'
                          ? 'bg-zinc-950 text-white'
                          : 'bg-white text-zinc-600'
                      }`}
                    >
                      IN
                    </button>
                    <button
                      type="button"
                      onClick={() => setUnit('cm')}
                      className={`px-2.5 py-1 cursor-pointer ${
                        unit === 'cm'
                          ? 'bg-zinc-950 text-white'
                          : 'bg-white text-zinc-600'
                      }`}
                    >
                      CM
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {measurementRows.map((row) => (
                    <div
                      key={row.label}
                      className="p-2.5 bg-zinc-50 border border-zinc-200/80 flex items-center justify-between text-xs"
                    >
                      <span className="text-zinc-500">{row.label}</span>
                      <span className="font-mono font-semibold text-zinc-950">
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Circular Impact Line */}
              <div className="p-3 bg-zinc-50 border border-zinc-200/80 flex items-center justify-between text-xs text-zinc-600">
                <span className="flex items-center gap-1.5">
                  <Leaf className="w-3.5 h-3.5 text-emerald-700" />
                  Circular environmental savings
                </span>
                <span className="font-mono text-zinc-900">
                  {item.waterSavedLiters.toLocaleString()}L water ·{' '}
                  {item.co2SavedKg}kg CO₂
                </span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-zinc-200 flex items-center gap-3">
              <button
                type="button"
                onClick={() => onToggleWishlist(item.id)}
                className={`px-4 py-3 border text-xs font-medium flex items-center gap-2 transition-colors cursor-pointer ${
                  isWishlisted
                    ? 'border-zinc-900 bg-zinc-100 text-zinc-950'
                    : 'border-zinc-200 hover:border-zinc-400 text-zinc-700'
                }`}
              >
                <Heart
                  className={`w-4 h-4 ${
                    isWishlisted ? 'fill-rose-500 text-rose-500' : ''
                  }`}
                />
                <span>{isWishlisted ? 'Saved' : 'Save'}</span>
              </button>

              <button
                type="button"
                disabled={item.sold || inBag}
                onClick={() => onAddToCart(item)}
                className={`flex-1 py-3 px-6 text-xs font-medium uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                  item.sold
                    ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
                    : inBag
                    ? 'bg-emerald-900 text-white'
                    : 'bg-zinc-950 hover:bg-zinc-800 text-white'
                }`}
              >
                {item.sold ? (
                  <span>Sold Out</span>
                ) : inBag ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Reserved in Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add 1-of-1 to Bag — ${item.price}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
