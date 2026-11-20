import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import DrinkCustomizerModal from './components/DrinkCustomizerModal';
import CartDrawer from './components/CartDrawer';
import RoasteryStory from './components/RoasteryStory';
import FooterAndVisit from './components/FooterAndVisit';
import { MENU_ITEMS } from './data/menuData';

const STORAGE_KEY = 'aura_roastery_cart_v1';

export default function App() {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customizingItem, setCustomizingItem] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // Ignore storage quota errors
    }
  }, [cartItems]);

  const totalCartCount = cartItems.reduce((sum, entry) => sum + entry.quantity, 0);

  // Quick Add with default options
  const handleQuickAdd = (item) => {
    const defaultCustomizations = item.customizable
      ? {
          size: 'Regular (12 oz)',
          milk:
            item.defaultMilk === 'oat'
              ? 'Barista Oat Milk'
              : item.defaultMilk === 'whole'
              ? 'Organic Whole Milk'
              : 'Standard',
          sweetness: 'Standard Sweet (100%)',
          extra: null,
        }
      : null;

    const signatureKey = `${item.id}__${JSON.stringify(defaultCustomizations)}`;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((entry) => entry.cartItemId === signatureKey);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        };
        return updated;
      }
      return [
        ...prev,
        {
          cartItemId: signatureKey,
          item,
          quantity: 1,
          unitPrice: item.price,
          customizations: defaultCustomizations,
        },
      ];
    });
  };

  // Add from Drink Customizer Modal
  const handleCustomAdd = ({ item, quantity, unitPrice, customizations }) => {
    const signatureKey = `${item.id}__${JSON.stringify(customizations)}`;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((entry) => entry.cartItemId === signatureKey);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }
      return [
        ...prev,
        {
          cartItemId: signatureKey,
          item,
          quantity,
          unitPrice,
          customizations,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((entry) =>
        entry.cartItemId === cartItemId ? { ...entry, quantity: newQty } : entry
      )
    );
  };

  const handleRemoveItem = (cartItemId) => {
    setCartItems((prev) => prev.filter((entry) => entry.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const featuredDrink = MENU_ITEMS[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6F0] text-[#1C1613]">
      <Navbar cartCount={totalCartCount} onOpenCart={() => setIsCartOpen(true)} />

      <main className="flex-1">
        <Hero
          featuredItem={featuredDrink}
          onCustomizeFeatured={(item) => setCustomizingItem(item)}
        />
        <MenuSection
          items={MENU_ITEMS}
          onQuickAdd={handleQuickAdd}
          onOpenCustomizer={(item) => setCustomizingItem(item)}
        />
        <RoasteryStory />
        <FooterAndVisit />
      </main>

      {/* Drink Customizer Modal */}
      <DrinkCustomizerModal
        item={customizingItem}
        onClose={() => setCustomizingItem(null)}
        onConfirmAdd={handleCustomAdd}
      />

      {/* Slide-Over Quick-Order Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
