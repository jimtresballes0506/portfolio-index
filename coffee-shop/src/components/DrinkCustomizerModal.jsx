import React, { useState, useEffect } from 'react';
import { X, Coffee, Check, Sparkles } from 'lucide-react';
import { CUSTOMIZATION_OPTIONS } from '../data/menuData';

export default function DrinkCustomizerModal({ item, onClose, onConfirmAdd }) {
  const [size, setSize] = useState('regular');
  const [milk, setMilk] = useState(item?.defaultMilk || 'oat');
  const [sweetness, setSweetness] = useState('100');
  const [extra, setExtra] = useState('none');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (item) {
      setSize('regular');
      setMilk(item.defaultMilk || 'oat');
      setSweetness('100');
      setExtra('none');
      setQuantity(1);
    }
  }, [item]);

  if (!item) return null;

  const sizeObj = CUSTOMIZATION_OPTIONS.sizes.find((s) => s.id === size);
  const milkObj = CUSTOMIZATION_OPTIONS.milks.find((m) => m.id === milk);
  const sweetObj = CUSTOMIZATION_OPTIONS.sweetness.find((sw) => sw.id === sweetness);
  const extraObj = CUSTOMIZATION_OPTIONS.extras.find((ex) => ex.id === extra);

  const unitPrice =
    item.price +
    (sizeObj?.priceDelta || 0) +
    (milkObj?.priceDelta || 0) +
    (extraObj?.priceDelta || 0);

  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    onConfirmAdd({
      item,
      quantity,
      unitPrice,
      customizations: {
        size: sizeObj.label,
        milk: milkObj.label,
        sweetness: sweetObj.label,
        extra: extraObj.id !== 'none' ? extraObj.label : null,
      },
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div
        className="bg-[#FAF6F0] border border-[#DFD2C3] rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header with Image Banner */}
        <div className="relative h-44 bg-[#1C1613]">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1613] via-[#1C1613]/30 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-widest text-[#E09F7D] font-bold">
              <Sparkles className="w-3 h-3" /> Barista Customizer
            </span>
            <h3 className="font-serif-display text-2xl font-bold">{item.name}</h3>
          </div>
        </div>

        {/* Options Body */}
        <div className="p-6 space-y-6">
          {/* 1. Cup Size */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4F44] mb-2.5">
              1. Select Cup Size
            </label>
            <div className="grid grid-cols-2 gap-3">
              {CUSTOMIZATION_OPTIONS.sizes.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSize(option.id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                    size === option.id
                      ? 'bg-[#1C1613] text-white border-[#1C1613]'
                      : 'bg-white text-[#1C1613] border-[#DFD2C3] hover:border-[#C87D55]'
                  }`}
                >
                  <div>
                    <div className="text-sm font-semibold">{option.label}</div>
                    <div
                      className={`text-xs ${
                        size === option.id ? 'text-[#E09F7D]' : 'text-[#7A6A5E]'
                      }`}
                    >
                      {option.priceDelta > 0 ? `+$${option.priceDelta.toFixed(2)}` : 'Base Price'}
                    </div>
                  </div>
                  {size === option.id && <Check className="w-4 h-4 text-[#E09F7D]" />}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Milk Choice */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4F44] mb-2.5">
              2. Milk Preference
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {CUSTOMIZATION_OPTIONS.milks.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setMilk(option.id)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                    milk === option.id
                      ? 'bg-[#1C1613] text-white border-[#1C1613]'
                      : 'bg-white text-[#1C1613] border-[#DFD2C3] hover:border-[#C87D55]'
                  }`}
                >
                  <div>
                    <div className="text-xs font-semibold">{option.label}</div>
                    <div
                      className={`text-[11px] ${
                        milk === option.id ? 'text-[#E09F7D]' : 'text-[#7A6A5E]'
                      }`}
                    >
                      {option.priceDelta > 0 ? `+$${option.priceDelta.toFixed(2)}` : 'Included'}
                    </div>
                  </div>
                  {milk === option.id && <Check className="w-4 h-4 text-[#E09F7D]" />}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Sweetness Level */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4F44] mb-2.5">
              3. Sweetness Balance
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {CUSTOMIZATION_OPTIONS.sweetness.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSweetness(option.id)}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                    sweetness === option.id
                      ? 'bg-[#1C1613] text-white border-[#1C1613]'
                      : 'bg-white text-[#1C1613] border-[#DFD2C3] hover:border-[#C87D55]'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Espresso / Flavor Boost */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4F44] mb-2.5">
              4. Espresso & Flavor Boost
            </label>
            <div className="space-y-2">
              {CUSTOMIZATION_OPTIONS.extras.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setExtra(option.id)}
                  className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                    extra === option.id
                      ? 'bg-[#1C1613] text-white border-[#1C1613]'
                      : 'bg-white text-[#1C1613] border-[#DFD2C3] hover:border-[#C87D55]'
                  }`}
                >
                  <span className="text-xs font-semibold">{option.label}</span>
                  <span
                    className={`text-xs font-medium ${
                      extra === option.id ? 'text-[#E09F7D]' : 'text-[#7A6A5E]'
                    }`}
                  >
                    {option.priceDelta > 0 ? `+$${option.priceDelta.toFixed(2)}` : 'Included'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Footer: Quantity + Confirm Button */}
          <div className="pt-4 border-t border-[#E6DDD0] flex items-center gap-4">
            <div className="inline-flex items-center rounded-full bg-white border border-[#DFD2C3] p-1">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 rounded-full hover:bg-[#F3ECE2] text-[#1C1613] font-bold cursor-pointer"
              >
                -
              </button>
              <span className="px-3 text-sm font-bold text-[#1C1613]">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-8 h-8 rounded-full hover:bg-[#F3ECE2] text-[#1C1613] font-bold cursor-pointer"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-[#C87D55] hover:bg-[#B56A42] text-white py-3.5 px-6 rounded-full text-sm font-bold shadow-md transition-all cursor-pointer"
            >
              <Coffee className="w-4 h-4" />
              <span>Add Custom Drink · ${totalPrice.toFixed(2)}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
