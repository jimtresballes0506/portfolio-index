import React, { useState } from 'react';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Tag,
  CheckCircle2,
  Clock,
  Store,
  Utensils,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) {
  const [orderMode, setOrderMode] = useState('pickup'); // 'pickup' | 'table'
  const [tableNumber, setTableNumber] = useState('04');
  const [customerName, setCustomerName] = useState('');
  const [promoInput, setPromoInput] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (sum, entry) => sum + entry.unitPrice * entry.quantity,
    0
  );
  const discount = promoApplied ? subtotal * 0.15 : 0;
  const taxable = Math.max(0, subtotal - discount);
  const estimatedTax = taxable * 0.0825;
  const finalTotal = taxable + estimatedTax;

  const handleApplyPromo = (codeToUse) => {
    const code = (codeToUse ?? promoInput).trim().toUpperCase();
    if (code === 'FIRSTBREW') {
      setPromoApplied(true);
      setPromoInput('FIRSTBREW');
      setPromoError('');
    } else {
      setPromoApplied(false);
      setPromoError('Try code FIRSTBREW for 15% off.');
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    const orderNum = `AR-${Math.floor(200 + Math.random() * 780)}`;
    const totalCups = cartItems.reduce((acc, i) => acc + i.quantity, 0);

    setConfirmedOrder({
      orderNum,
      customerName: customerName.trim() || 'Guest Coffee Lover',
      orderMode,
      tableNumber,
      totalCups,
      finalTotal,
      items: [...cartItems],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
    onClearCart();
  };

  const handleResetAndClose = () => {
    setConfirmedOrder(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={handleResetAndClose}
        className="fixed inset-0 bg-black/55 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF6F0] shadow-2xl border-l border-[#DFD2C3] flex flex-col">
          {/* Drawer Header */}
          <div className="p-6 bg-[#1C1613] text-[#FAF6F0] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#312620] flex items-center justify-center text-[#E09F7D]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif-display text-xl font-bold">Quick-Order Bag</h2>
                <p className="text-xs text-[#C9B9A6]">
                  Freshly pulled to order · Instant confirmation
                </p>
              </div>
            </div>
            <button
              onClick={handleResetAndClose}
              className="p-2 rounded-full hover:bg-[#312620] text-[#C9B9A6] hover:text-white transition-colors cursor-pointer"
              aria-label="Close Cart Drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Order Confirmation Screen */}
          {confirmedOrder ? (
            <div className="p-6 flex-1 overflow-y-auto flex flex-col justify-between">
              <div className="space-y-6">
                <div className="bg-emerald-950 text-emerald-100 rounded-3xl p-6 text-center space-y-3 border border-emerald-800">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <span className="inline-block text-[11px] uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-900 text-emerald-300 font-bold">
                    Sent to Roastery Espresso Bar
                  </span>
                  <h3 className="font-serif-display text-2xl font-bold text-white">
                    Order #{confirmedOrder.orderNum} Confirmed!
                  </h3>
                  <p className="text-xs text-emerald-200/90">
                    Barista tickets printed for{' '}
                    <span className="font-bold text-white">{confirmedOrder.customerName}</span>
                  </p>
                </div>

                {/* Pickup / Table Ticket Details */}
                <div className="bg-white rounded-2xl p-5 border border-[#E6DDD0] space-y-4">
                  <div className="flex items-center justify-between border-b border-[#EFE7DC] pb-3">
                    <div>
                      <span className="text-xs text-[#7A6A5E] block">Fulfillment Mode</span>
                      <span className="text-sm font-bold text-[#1C1613]">
                        {confirmedOrder.orderMode === 'pickup'
                          ? 'Express Pickup Bar (Skip the Line)'
                          : `Dine-In Table Service · Table #${confirmedOrder.tableNumber}`}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-[#7A6A5E] block">Est. Ready</span>
                      <span className="text-sm font-bold text-[#B86B43]">~6–8 Mins</span>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#7A6A5E]">
                      Receipt Summary ({confirmedOrder.totalCups} items)
                    </span>
                    {confirmedOrder.items.map((entry) => (
                      <div
                        key={entry.cartItemId}
                        className="flex items-start justify-between text-xs text-[#4A3E35]"
                      >
                        <div>
                          <span className="font-bold text-[#1C1613]">
                            {entry.quantity}x {entry.item.name}
                          </span>
                          {entry.customizations && (
                            <p className="text-[11px] text-[#7A6A5E]">
                              {[
                                entry.customizations.size,
                                entry.customizations.milk,
                                entry.customizations.sweetness,
                                entry.customizations.extra,
                              ]
                                .filter(Boolean)
                                .join(' · ')}
                            </p>
                          )}
                        </div>
                        <span className="font-semibold text-[#1C1613]">
                          ${(entry.unitPrice * entry.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-[#EFE7DC] flex items-center justify-between font-bold text-base text-[#1C1613]">
                    <span>Total Paid</span>
                    <span>${confirmedOrder.finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleResetAndClose}
                className="mt-6 w-full py-3.5 px-6 rounded-full bg-[#1C1613] hover:bg-[#312620] text-white text-sm font-bold transition-all cursor-pointer"
              >
                Back to Café Menu
              </button>
            </div>
          ) : cartItems.length === 0 ? (
            /* Empty Cart View */
            <div className="p-8 flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#EFE7DC] text-[#B86B43] flex items-center justify-center mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-serif-display text-2xl font-bold text-[#1C1613]">
                Your pickup bag is empty
              </h3>
              <p className="text-sm text-[#6E5D50] mt-2 max-w-xs">
                Explore our signature espresso drinks, single-origin pour-overs, or fresh morning
                pastries to start an order.
              </p>
              <button
                onClick={onClose}
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1C1613] text-white text-xs font-bold hover:bg-[#312620] transition-all cursor-pointer"
              >
                <span>Browse Seasonal Menu</span>
                <ArrowRight className="w-4 h-4 text-[#E09F7D]" />
              </button>
            </div>
          ) : (
            /* Active Cart Items + Checkout Form */
            <>
              <div className="p-5 flex-1 overflow-y-auto space-y-5">
                {/* Order Fulfillment Mode Toggle */}
                <div className="bg-white p-1.5 rounded-2xl border border-[#E6DDD0] grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setOrderMode('pickup')}
                    className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      orderMode === 'pickup'
                        ? 'bg-[#1C1613] text-white shadow-xs'
                        : 'text-[#5C4F44] hover:text-[#1C1613]'
                    }`}
                  >
                    <Store className="w-3.5 h-3.5 text-[#E09F7D]" />
                    <span>Express Pickup</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderMode('table')}
                    className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      orderMode === 'table'
                        ? 'bg-[#1C1613] text-white shadow-xs'
                        : 'text-[#5C4F44] hover:text-[#1C1613]'
                    }`}
                  >
                    <Utensils className="w-3.5 h-3.5 text-[#E09F7D]" />
                    <span>Dine-In Table</span>
                  </button>
                </div>

                {/* Cup Name / Table Number Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6E5D50] mb-1">
                      Name for Cup Sleeve
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Alex"
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#DFD2C3] text-xs text-[#1C1613] focus:outline-none focus:border-[#C87D55]"
                    />
                  </div>
                  {orderMode === 'table' ? (
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6E5D50] mb-1">
                        Table Number
                      </label>
                      <select
                        value={tableNumber}
                        onChange={(e) => setTableNumber(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#DFD2C3] text-xs text-[#1C1613] focus:outline-none focus:border-[#C87D55]"
                      >
                        {['01', '02', '03', '04', '05', '06', 'Patio 1', 'Patio 2'].map((t) => (
                          <option key={t} value={t}>
                            Table #{t}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div className="bg-[#EFE7DC] rounded-xl px-3.5 py-2 flex items-center gap-2 border border-[#DFD2C3]">
                      <Clock className="w-4 h-4 text-[#B86B43] shrink-0" />
                      <div>
                        <span className="block text-[10px] uppercase font-bold text-[#6E5D50]">
                          Prep Estimate
                        </span>
                        <span className="text-xs font-bold text-[#1C1613]">Ready in ~6 mins</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Cart Items List */}
                <div className="space-y-3">
                  {cartItems.map((entry) => (
                    <div
                      key={entry.cartItemId}
                      className="bg-white rounded-2xl p-3.5 border border-[#E6DDD0] flex gap-3.5 items-start"
                    >
                      <img
                        src={entry.item.image}
                        alt={entry.item.name}
                        className="w-16 h-16 rounded-xl object-cover shrink-0 border border-[#EFE7DC]"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-serif-display font-bold text-sm text-[#1C1613] leading-snug">
                            {entry.item.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(entry.cartItemId)}
                            className="text-[#8E7D70] hover:text-red-600 transition-colors cursor-pointer"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {entry.customizations && (
                          <p className="text-[11px] text-[#6E5D50] mt-0.5 leading-relaxed">
                            {[
                              entry.customizations.size,
                              entry.customizations.milk,
                              entry.customizations.sweetness,
                              entry.customizations.extra,
                            ]
                              .filter(Boolean)
                              .join(' · ')}
                          </p>
                        )}

                        <div className="mt-2.5 flex items-center justify-between">
                          <div className="inline-flex items-center gap-2 rounded-full bg-[#F5EFE6] border border-[#E6DDD0] px-2 py-0.5">
                            <button
                              onClick={() =>
                                onUpdateQuantity(entry.cartItemId, entry.quantity - 1)
                              }
                              className="p-0.5 text-[#1C1613] hover:text-[#B86B43] cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold text-[#1C1613] min-w-4 text-center">
                              {entry.quantity}
                            </span>
                            <button
                              onClick={() =>
                                onUpdateQuantity(entry.cartItemId, entry.quantity + 1)
                              }
                              className="p-0.5 text-[#1C1613] hover:text-[#B86B43] cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="text-sm font-bold text-[#1C1613]">
                            ${(entry.unitPrice * entry.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promo Code Box */}
                <div className="bg-white rounded-2xl p-3.5 border border-[#E6DDD0] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1C1613] inline-flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-[#C87D55]" />
                      Promo / Member Code
                    </span>
                    {!promoApplied && (
                      <button
                        type="button"
                        onClick={() => handleApplyPromo('FIRSTBREW')}
                        className="text-[11px] font-semibold text-[#B86B43] hover:underline cursor-pointer"
                      >
                        Tap to apply FIRSTBREW (-15%)
                      </button>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Enter FIRSTBREW"
                      className="flex-1 px-3 py-1.5 rounded-xl bg-[#FAF6F0] border border-[#DFD2C3] text-xs font-semibold uppercase"
                    />
                    <button
                      type="button"
                      onClick={() => handleApplyPromo()}
                      className="px-4 py-1.5 rounded-xl bg-[#1C1613] text-white text-xs font-semibold hover:bg-[#312620] cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {promoApplied && (
                    <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> 15% Welcome Roastery Discount applied!
                    </p>
                  )}
                  {promoError && <p className="text-[11px] text-red-600">{promoError}</p>}
                </div>
              </div>

              {/* Drawer Footer: Breakdown & Submit */}
              <form
                onSubmit={handlePlaceOrder}
                className="p-5 bg-white border-t border-[#E6DDD0] space-y-3"
              >
                <div className="space-y-1 text-xs text-[#5C4F44]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#1C1613]">${subtotal.toFixed(2)}</span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Discount (FIRSTBREW 15%)</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Estimated Tax (8.25%)</span>
                    <span>${estimatedTax.toFixed(2)}</span>
                  </div>
                  <div className="pt-2 border-t border-[#EFE7DC] flex justify-between text-base font-bold text-[#1C1613]">
                    <span>Total Due</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-full bg-[#C87D55] hover:bg-[#B56A42] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>
                    Confirm {orderMode === 'pickup' ? 'Pickup' : `Table #${tableNumber}`} Order · $
                    {finalTotal.toFixed(2)}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
