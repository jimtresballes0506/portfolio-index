'use client';

import React, { useState } from 'react';
import {
  X,
  Database,
  PlusCircle,
  Package,
  RotateCcw,
  Trash2,
  Star,
  ShoppingBag,
} from 'lucide-react';
import {
  CATEGORIES,
  SIZES,
  CONDITION_GRADES,
  ERAS,
  PRESET_DROP_IMAGES,
} from '../data/initialProducts';

export default function CuratorAdminModal({
  isOpen,
  onClose,
  products,
  orders,
  onCreateProduct,
  onToggleProductSold,
  onToggleProductFeatured,
  onDeleteProduct,
  onResetArchive,
  isBusy,
}) {
  const [activeTab, setActiveTab] = useState('add');
  const [form, setForm] = useState({
    title: '',
    brand: 'Levi’s Vintage Clothing',
    category: 'Outerwear & Jackets',
    era: '1990s',
    size: 'L',
    fitsLike: 'Boxy Medium / True Large',
    conditionGrade: 'Excellent Vintage',
    conditionNotes:
      'Clean archival state with natural vintage fade, all original hardware verified.',
    price: 115,
    originalRetail: 250,
    material: '100% Heavyweight Vintage Cotton',
    origin: 'Made in USA',
    pitToPit: 22.5,
    length: 27.0,
    shoulder: 19.0,
    sleeve: 24.0,
    image: PRESET_DROP_IMAGES[0].url,
    featured: true,
  });

  if (!isOpen) return null;

  const handleSubmitNew = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    await onCreateProduct({
      ...form,
      price: Number(form.price) || 85,
      originalRetail: Number(form.originalRetail) || 190,
      measurements: {
        pitToPit: Number(form.pitToPit) || 22,
        length: Number(form.length) || 27,
        shoulder: Number(form.shoulder) || 19,
        sleeve: Number(form.sleeve) || 24,
      },
    });

    setForm((prev) => ({
      ...prev,
      title: '',
    }));
    setActiveTab('inventory');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/50 backdrop-blur-xs">
      <div className="bg-white border border-zinc-200 max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Top Bar */}
        <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Database className="w-4 h-4 text-zinc-950" />
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-950">
                Curator Admin Studio — SQLite Manager
              </h2>
              <p className="text-[11px] font-mono text-zinc-400">
                prisma/thrift.db · Next.js App Router API
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-zinc-100 text-zinc-500 hover:text-zinc-950 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-zinc-50 px-6 py-2.5 border-b border-zinc-200 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('add')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium cursor-pointer ${
                activeTab === 'add'
                  ? 'bg-zinc-950 text-white'
                  : 'bg-white text-zinc-600 border border-zinc-200'
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>+ New Listing</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('inventory')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium cursor-pointer ${
                activeTab === 'inventory'
                  ? 'bg-zinc-950 text-white'
                  : 'bg-white text-zinc-600 border border-zinc-200'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>Inventory ({products.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('orders')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-zinc-950 text-white'
                  : 'bg-white text-zinc-600 border border-zinc-200'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Orders ({orders.length})</span>
            </button>
          </div>

          <button
            type="button"
            disabled={isBusy}
            onClick={onResetArchive}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-zinc-100 text-zinc-700 border border-zinc-200 text-xs font-medium cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset 16 Demo Items</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'add' && (
            <form onSubmit={handleSubmitNew} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-8">
                  <label className="text-xs font-mono uppercase text-zinc-500 block mb-1">
                    Garment Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    placeholder="e.g. 1993 Nirvana In Utero Single-Stitch Tour Tee"
                    className="w-full px-3 py-2 border border-zinc-200 text-xs focus:outline-none focus:border-zinc-900"
                  />
                </div>

                <div className="md:col-span-4">
                  <label className="text-xs font-mono uppercase text-zinc-500 block mb-1">
                    Brand / Tag
                  </label>
                  <input
                    type="text"
                    value={form.brand}
                    onChange={(e) =>
                      setForm({ ...form, brand: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-zinc-200 text-xs focus:outline-none focus:border-zinc-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="text-xs font-mono uppercase text-zinc-500 block mb-1">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-zinc-200 text-xs"
                  >
                    {CATEGORIES.slice(1).map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-zinc-500 block mb-1">
                    Era
                  </label>
                  <select
                    value={form.era}
                    onChange={(e) => setForm({ ...form, era: e.target.value })}
                    className="w-full px-3 py-2 border border-zinc-200 text-xs"
                  >
                    {ERAS.slice(1).map((era) => (
                      <option key={era} value={era}>
                        {era}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-zinc-500 block mb-1">
                    Size
                  </label>
                  <select
                    value={form.size}
                    onChange={(e) => setForm({ ...form, size: e.target.value })}
                    className="w-full px-3 py-2 border border-zinc-200 text-xs"
                  >
                    {SIZES.slice(1).map((sz) => (
                      <option key={sz} value={sz}>
                        {sz}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-zinc-500 block mb-1">
                    Condition Grade
                  </label>
                  <select
                    value={form.conditionGrade}
                    onChange={(e) =>
                      setForm({ ...form, conditionGrade: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-zinc-200 text-xs"
                  >
                    {CONDITION_GRADES.slice(1).map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
                <div>
                  <label className="text-xs font-mono uppercase text-zinc-500 block mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-zinc-200 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-zinc-500 block mb-1">
                    Est. Retail ($)
                  </label>
                  <input
                    type="number"
                    value={form.originalRetail}
                    onChange={(e) =>
                      setForm({ ...form, originalRetail: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-zinc-200 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-zinc-500 block mb-1">
                    Pit-to-Pit (&quot;)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={form.pitToPit}
                    onChange={(e) =>
                      setForm({ ...form, pitToPit: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-zinc-200 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-zinc-500 block mb-1">
                    Length (&quot;)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={form.length}
                    onChange={(e) =>
                      setForm({ ...form, length: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-zinc-200 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-zinc-500 block mb-1">
                    Shoulder (&quot;)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={form.shoulder}
                    onChange={(e) =>
                      setForm({ ...form, shoulder: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-zinc-200 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-zinc-500 block mb-1">
                    Sleeve (&quot;)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={form.sleeve}
                    onChange={(e) =>
                      setForm({ ...form, sleeve: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-zinc-200 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-zinc-500 block">
                  Image URL or Preset Template
                </label>
                <input
                  type="url"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="w-full px-3 py-2 border border-zinc-200 text-xs font-mono"
                />
                <div className="flex flex-wrap gap-1.5">
                  {PRESET_DROP_IMAGES.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setForm({ ...form, image: preset.url })}
                      className={`px-2.5 py-1 text-xs border cursor-pointer ${
                        form.image === preset.url
                          ? 'bg-zinc-950 text-white border-zinc-950'
                          : 'bg-white text-zinc-600 border-zinc-200'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-zinc-500 block mb-1">
                  Condition Notes
                </label>
                <textarea
                  rows={2}
                  value={form.conditionNotes}
                  onChange={(e) =>
                    setForm({ ...form, conditionNotes: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-zinc-200 text-xs"
                />
              </div>

              <button
                type="submit"
                disabled={isBusy}
                className="w-full py-3 bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer"
              >
                {isBusy ? 'Saving...' : 'Publish 1-of-1 Listing to SQLite'}
              </button>
            </form>
          )}

          {activeTab === 'inventory' && (
            <div className="divide-y divide-zinc-200">
              {products.map((item) => (
                <div
                  key={item.id}
                  className="py-3 flex flex-wrap items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-11 h-14 object-cover bg-zinc-100 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-[11px] font-mono text-zinc-400">
                        {item.sku} · {item.category} · Size {item.size}
                      </p>
                      <h4 className="text-xs font-medium text-zinc-950 truncate">
                        {item.title}
                      </h4>
                      <span className="font-mono text-xs font-semibold text-zinc-950">
                        ${item.price}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        onToggleProductFeatured(item.id, !item.featured)
                      }
                      className={`px-2.5 py-1 text-xs border flex items-center gap-1 cursor-pointer ${
                        item.featured
                          ? 'bg-zinc-950 text-white border-zinc-950'
                          : 'bg-white text-zinc-600 border-zinc-200'
                      }`}
                    >
                      <Star className="w-3 h-3" />
                      <span>{item.featured ? 'Featured' : 'Feature'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onToggleProductSold(item.id, !item.sold)}
                      className={`px-3 py-1 text-xs font-mono border cursor-pointer ${
                        item.sold
                          ? 'bg-zinc-100 text-zinc-500 border-zinc-200'
                          : 'bg-emerald-900 text-white border-emerald-900'
                      }`}
                    >
                      {item.sold ? 'Sold (Click to Restock)' : 'Available'}
                    </button>

                    <button
                      type="button"
                      onClick={() => onDeleteProduct(item.id)}
                      className="p-1.5 text-zinc-400 hover:text-rose-600 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-3">
              {orders.length === 0 ? (
                <div className="p-8 text-center border border-dashed border-zinc-200">
                  <p className="text-sm font-medium text-zinc-900">
                    No orders recorded yet
                  </p>
                </div>
              ) : (
                orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-4 border border-zinc-200 space-y-1"
                  >
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="font-semibold text-zinc-950">
                        #{ord.orderNumber}
                      </span>
                      <span className="font-semibold text-zinc-950">
                        ${ord.total}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500">
                      {ord.customerName} ({ord.customerEmail}) ·{' '}
                      {ord.deliveryMethod}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
