'use client';

import React, { useState } from 'react';
import {
  X,
  ShoppingBag,
  Trash2,
  Leaf,
  Tag,
  Truck,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

const FREE_SHIPPING_THRESHOLD = 120;

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onRemoveFromCart,
  onClearCart,
  onSubmitOrder,
  isSubmittingOrder,
  lastOrderReceipt,
  onDismissReceipt,
}) {
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('Carbon-Neutral Ground');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + Number(item.price), 0);
  const totalWaterLiters = cartItems.reduce(
    (sum, item) => sum + Number(item.waterSavedLiters || 0),
    0
  );
  const totalCo2Kg = cartItems
    .reduce((sum, item) => sum + Number(item.co2SavedKg || 0), 0)
    .toFixed(1);

  let discount = 0;
  if (appliedPromo === 'THRIFT15') {
    discount = Math.round(subtotal * 0.15);
  } else if (appliedPromo === 'CIRCULAR10') {
    discount = Math.min(10, subtotal);
  }

  const baseShipping =
    deliveryMethod === 'Local Archive Studio Pickup'
      ? 0
      : deliveryMethod === 'Express Climate-Offset Courier'
      ? 16
      : subtotal >= FREE_SHIPPING_THRESHOLD
      ? 0
      : 8;

  const shippingCost = cartItems.length === 0 ? 0 : baseShipping;
  const total = Math.max(0, subtotal - discount + shippingCost);
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const handleApplyPromo = (codeToApply) => {
    const clean = (codeToApply ?? promoInput).trim().toUpperCase();
    setPromoError('');
    if (clean === 'THRIFT15' || clean === 'CIRCULAR10') {
      setAppliedPromo(clean);
      setPromoInput(clean);
    } else {
      setPromoError('Invalid code. Try THRIFT15 (15% off) or CIRCULAR10 ($10 off).');
    }
  };

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    await onSubmitOrder({
      customerName: customerName.trim() || 'Archive Collector',
      customerEmail: customerEmail.trim() || 'collector@rethread.studio',
      shippingAddress:
        deliveryMethod === 'Local Archive Studio Pickup'
          ? 'Flagship Archive Studio Pickup'
          : shippingAddress.trim() || '418 Mercer St',
      deliveryMethod,
      promoCode: appliedPromo,
      subtotal,
      discount,
      shippingCost,
      total,
      waterSavedLiters: totalWaterLiters,
      co2SavedKg: Number(totalCo2Kg),
      items: cartItems,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-zinc-950/45 backdrop-blur-xs">
      <div className="bg-white w-full max-w-md h-full flex flex-col border-l border-zinc-200 shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-4 h-4 text-zinc-950" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-950">
              Shopping Bag ({cartItems.length})
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-zinc-100 text-zinc-500 hover:text-zinc-950 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {lastOrderReceipt ? (
          <div className="p-6 flex-1 overflow-y-auto space-y-6">
            <div className="border border-zinc-200 p-6 space-y-4">
              <div className="w-10 h-10 bg-zinc-950 text-white flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400">
                  Order Confirmed
                </span>
                <h3 className="font-serif text-2xl text-zinc-950 mt-0.5">
                  #{lastOrderReceipt.orderNumber}
                </h3>
                <p className="text-xs text-zinc-500 mt-1">
                  Recorded in SQLite &amp; 1-of-1 items marked as Sold.
                </p>
              </div>

              <div className="bg-zinc-50 border border-zinc-200 p-4 space-y-1">
                <span className="text-[11px] font-mono uppercase text-emerald-800 flex items-center gap-1">
                  <Leaf className="w-3.5 h-3.5" />
                  Circular Impact Certificate
                </span>
                <p className="text-xs text-zinc-700">
                  Your order saved{' '}
                  <strong>
                    {Number(lastOrderReceipt.waterSavedLiters).toLocaleString()}L
                  </strong>{' '}
                  of water and offset{' '}
                  <strong>{lastOrderReceipt.co2SavedKg} kg</strong> of CO₂.
                </p>
              </div>

              <div className="border-t border-b border-zinc-200 py-3 space-y-2">
                {(lastOrderReceipt.items || []).map((it) => (
                  <div
                    key={it.id}
                    className="flex items-center justify-between text-xs"
                  >
                    <span className="text-zinc-800 truncate pr-2">
                      {it.title} ({it.size})
                    </span>
                    <span className="font-mono font-semibold text-zinc-950">
                      ${it.price}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between text-sm font-semibold text-zinc-950 font-mono">
                <span>Total Paid</span>
                <span>${lastOrderReceipt.total}</span>
              </div>

              <button
                type="button"
                onClick={() => {
                  onDismissReceipt();
                  onClose();
                }}
                className="w-full py-3 bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-medium uppercase tracking-wider cursor-pointer"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="p-8 flex-1 flex flex-col items-center justify-center text-center space-y-4">
            <ShoppingBag className="w-8 h-8 text-zinc-300" />
            <div className="space-y-1">
              <h3 className="font-serif text-2xl text-zinc-950">
                Your Bag is Empty
              </h3>
              <p className="text-xs text-zinc-500 max-w-xs">
                Every piece in RE:THREAD is one-of-one. Reserve your favorite
                vintage garment from the catalog.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-zinc-950 text-white text-xs font-medium cursor-pointer"
            >
              Explore Archive
            </button>
          </div>
        ) : (
          <>
            {/* Free Shipping Progress */}
            <div className="bg-zinc-50 px-6 py-3 border-b border-zinc-200">
              <div className="flex items-center justify-between text-xs text-zinc-600">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-zinc-900" />
                  {amountToFreeShipping === 0 ? (
                    <span className="text-zinc-950 font-medium">
                      Complimentary carbon-neutral shipping unlocked
                    </span>
                  ) : (
                    <span>
                      Add <strong>${amountToFreeShipping}</strong> more for free
                      shipping
                    </span>
                  )}
                </span>
                <span className="font-mono">
                  ${subtotal}/${FREE_SHIPPING_THRESHOLD}
                </span>
              </div>
              <div className="w-full h-1 bg-zinc-200 mt-2">
                <div
                  className="h-full bg-zinc-950 transition-all"
                  style={{
                    width: `${Math.min(
                      100,
                      (subtotal / FREE_SHIPPING_THRESHOLD) * 100
                    )}%`,
                  }}
                />
              </div>
            </div>

            {/* Items & Checkout Form */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono uppercase text-zinc-400">
                    1-of-1 Pieces ({cartItems.length})
                  </span>
                  <button
                    type="button"
                    onClick={onClearCart}
                    className="text-zinc-400 hover:text-zinc-950 cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>

                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3.5 items-center pb-4 border-b border-zinc-100"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-20 object-cover bg-zinc-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-mono text-zinc-400">
                        {item.brand} · Size {item.size}
                      </p>
                      <h4 className="text-xs font-medium text-zinc-950 truncate mt-0.5">
                        {item.title}
                      </h4>
                      <span className="font-mono text-xs font-semibold text-zinc-950 block mt-1">
                        ${item.price}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemoveFromCart(item.id)}
                      className="p-1.5 text-zinc-400 hover:text-zinc-950 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Promo Code */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-600 flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" />
                    Promo Code
                  </span>
                  <div className="flex gap-1.5 font-mono text-[10px]">
                    <button
                      type="button"
                      onClick={() => handleApplyPromo('THRIFT15')}
                      className="px-2 py-0.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 cursor-pointer"
                    >
                      THRIFT15
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplyPromo('CIRCULAR10')}
                      className="px-2 py-0.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 cursor-pointer"
                    >
                      CIRCULAR10
                    </button>
                  </div>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="THRIFT15 or CIRCULAR10"
                    className="flex-1 px-3 py-2 border border-zinc-200 text-xs font-mono uppercase focus:outline-none focus:border-zinc-900"
                  />
                  <button
                    type="button"
                    onClick={() => handleApplyPromo()}
                    className="px-4 py-2 bg-zinc-950 text-white text-xs font-medium cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {promoError && (
                  <p className="text-[11px] text-rose-600">{promoError}</p>
                )}
                {appliedPromo && (
                  <p className="text-[11px] text-emerald-700 font-medium">
                    ✓ Code {appliedPromo} applied (-${discount})
                  </p>
                )}
              </div>

              {/* Checkout Details */}
              <form
                id="thrift-checkout-form"
                onSubmit={handleCheckoutSubmit}
                className="space-y-3 border-t border-zinc-200 pt-5"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-950 block">
                  Shipping &amp; Contact
                </span>

                <select
                  value={deliveryMethod}
                  onChange={(e) => setDeliveryMethod(e.target.value)}
                  className="w-full px-3 py-2 border border-zinc-200 text-xs text-zinc-800 focus:outline-none focus:border-zinc-900"
                >
                  <option value="Carbon-Neutral Ground">
                    Carbon-Neutral Ground ({subtotal >= 120 ? 'Free' : '$8'})
                  </option>
                  <option value="Local Archive Studio Pickup">
                    Studio Pickup — 418 Mercer St (Free)
                  </option>
                  <option value="Express Climate-Offset Courier">
                    Express Courier ($16)
                  </option>
                </select>

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Full name"
                    className="px-3 py-2 border border-zinc-200 text-xs focus:outline-none focus:border-zinc-900"
                  />
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="Email address"
                    className="px-3 py-2 border border-zinc-200 text-xs focus:outline-none focus:border-zinc-900"
                  />
                </div>

                {deliveryMethod !== 'Local Archive Studio Pickup' && (
                  <input
                    type="text"
                    required
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    placeholder="Shipping address"
                    className="w-full px-3 py-2 border border-zinc-200 text-xs focus:outline-none focus:border-zinc-900"
                  />
                )}
              </form>
            </div>

            {/* Footer Totals */}
            <div className="border-t border-zinc-200 p-6 space-y-4 bg-zinc-50/50">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-zinc-500">
                  <span>Subtotal</span>
                  <span className="font-mono">${subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount ({appliedPromo})</span>
                    <span className="font-mono">-${discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-500">
                  <span>Shipping</span>
                  <span className="font-mono">
                    {shippingCost === 0 ? 'Free' : `$${shippingCost}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-zinc-950 pt-2 border-t border-zinc-200">
                  <span>Total</span>
                  <span className="font-mono">${total}</span>
                </div>
              </div>

              <button
                type="submit"
                form="thrift-checkout-form"
                disabled={isSubmittingOrder}
                className="w-full py-3.5 bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-medium uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
              >
                <span>
                  {isSubmittingOrder
                    ? 'Processing...'
                    : `Complete Purchase · $${total}`}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
