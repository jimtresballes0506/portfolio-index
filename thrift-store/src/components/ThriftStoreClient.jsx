'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import CatalogSection from './CatalogSection';
import GarmentDetailModal from './GarmentDetailModal';
import CartDrawer from './CartDrawer';
import CuratorAdminModal from './CuratorAdminModal';
import GradingAndImpactSection from './GradingAndImpactSection';
import Footer from './Footer';

const CART_STORAGE_KEY = 'rethread_archive_bag_v1';
const WISHLIST_STORAGE_KEY = 'rethread_archive_wishlist_v1';

const DEFAULT_FILTERS = {
  category: 'All Archive',
  size: 'All Sizes',
  conditionGrade: 'All Conditions',
  era: 'All Eras',
  maxPrice: 220,
  search: '',
  sortBy: 'featured',
  hideSold: false,
  showWishlistOnly: false,
};

export default function ThriftStoreClient({
  initialProducts = [],
  initialOrders = [],
}) {
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(initialOrders);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [cartIds, setCartIds] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [inspectingItem, setInspectingItem] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [lastOrderReceipt, setLastOrderReceipt] = useState(null);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) setCartIds(JSON.parse(savedCart));
      const savedWish = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (savedWish) setWishlistIds(JSON.parse(savedWish));
    } catch {
      // Ignore storage errors
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartIds));
    } catch {
      // Ignore storage errors
    }
  }, [cartIds]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistIds));
    } catch {
      // Ignore storage errors
    }
  }, [wishlistIds]);

  const cartItems = useMemo(() => {
    return products.filter((p) => cartIds.includes(p.id) && !p.sold);
  }, [products, cartIds]);

  const cartTotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + Number(item.price), 0);
  }, [cartItems]);

  const stats = useMemo(() => {
    const availableCount = products.filter((p) => !p.sold).length;
    const totalWaterLiters = products.reduce(
      (sum, p) => sum + Number(p.waterSavedLiters || 0),
      0
    );
    const totalCo2Kg = products.reduce(
      (sum, p) => sum + Number(p.co2SavedKg || 0),
      0
    );
    return {
      availableCount,
      totalWaterLiters,
      totalCo2Kg,
    };
  }, [products]);

  const featuredItems = useMemo(() => {
    const featured = products.filter((p) => p.featured && !p.sold);
    return featured.length >= 3 ? featured : products.filter((p) => !p.sold);
  }, [products]);

  const isInCart = (productId) => cartIds.includes(productId);

  const handleAddToCart = (item) => {
    if (!item || item.sold) return;
    setLastOrderReceipt(null);
    setCartIds((prev) => (prev.includes(item.id) ? prev : [...prev, item.id]));
  };

  const handleRemoveFromCart = (productId) => {
    setCartIds((prev) => prev.filter((id) => id !== productId));
  };

  const handleClearCart = () => {
    setCartIds([]);
  };

  const handleToggleWishlist = (productId) => {
    setWishlistIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleUpdateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const handleQuickFilter = (partialFilters) => {
    setFilters({
      ...DEFAULT_FILTERS,
      ...partialFilters,
    });
    const el = document.getElementById('catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmitOrder = async (orderPayload) => {
    setIsBusy(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.products) setProducts(data.products);
        if (data.order) {
          setOrders((prev) => [data.order, ...prev]);
          setLastOrderReceipt(data.order);
        }
        setCartIds([]);
      }
    } finally {
      setIsBusy(false);
    }
  };

  const handleCreateProduct = async (newProductData) => {
    setIsBusy(true);
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProductData),
      });
      if (res.ok) {
        const { product } = await res.json();
        setProducts((prev) => [product, ...prev]);
      }
    } finally {
      setIsBusy(false);
    }
  };

  const handleToggleProductSold = async (id, sold) => {
    setIsBusy(true);
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sold }),
      });
      if (res.ok) {
        const { product } = await res.json();
        setProducts((prev) => prev.map((p) => (p.id === id ? product : p)));
      }
    } finally {
      setIsBusy(false);
    }
  };

  const handleToggleProductFeatured = async (id, featured) => {
    setIsBusy(true);
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured }),
      });
      if (res.ok) {
        const { product } = await res.json();
        setProducts((prev) => prev.map((p) => (p.id === id ? product : p)));
      }
    } finally {
      setIsBusy(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    setIsBusy(true);
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        setCartIds((prev) => prev.filter((cid) => cid !== id));
      }
    } finally {
      setIsBusy(false);
    }
  };

  const handleResetArchive = async () => {
    setIsBusy(true);
    try {
      const res = await fetch('/api/seed', { method: 'POST' });
      if (res.ok) {
        const { products: freshProducts } = await res.json();
        setProducts(freshProducts);
      }
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-zinc-900">
      <Navbar
        cartCount={cartItems.length}
        cartTotal={cartTotal}
        wishlistCount={wishlistIds.length}
        showWishlistOnly={filters.showWishlistOnly}
        onToggleWishlistFilter={() => {
          handleUpdateFilter('showWishlistOnly', !filters.showWishlistOnly);
          const el = document.getElementById('catalog');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        totalAvailableCount={stats.availableCount}
        activeCategory={filters.category}
        onSelectCategory={(cat) => handleUpdateFilter('category', cat)}
        searchQuery={filters.search}
        onSearchChange={(q) => handleUpdateFilter('search', q)}
      />

      <main className="flex-1">
        <Hero
          featuredItems={featuredItems}
          onInspectItem={(item) => setInspectingItem(item)}
          onAddToCart={handleAddToCart}
          isInCart={isInCart}
          onQuickFilter={handleQuickFilter}
          stats={stats}
        />

        <CatalogSection
          products={products}
          filters={filters}
          onUpdateFilter={handleUpdateFilter}
          onResetFilters={handleResetFilters}
          onInspectItem={(item) => setInspectingItem(item)}
          onAddToCart={handleAddToCart}
          isInCart={isInCart}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
        />

        <GradingAndImpactSection stats={stats} />
      </main>

      <Footer />

      {inspectingItem && (
        <GarmentDetailModal
          item={inspectingItem}
          onClose={() => setInspectingItem(null)}
          onAddToCart={handleAddToCart}
          isInCart={isInCart}
          isWishlisted={wishlistIds.includes(inspectingItem.id)}
          onToggleWishlist={handleToggleWishlist}
        />
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onSubmitOrder={handleSubmitOrder}
        isSubmittingOrder={isBusy}
        lastOrderReceipt={lastOrderReceipt}
        onDismissReceipt={() => setLastOrderReceipt(null)}
      />

      <CuratorAdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        orders={orders}
        onCreateProduct={handleCreateProduct}
        onToggleProductSold={handleToggleProductSold}
        onToggleProductFeatured={handleToggleProductFeatured}
        onDeleteProduct={handleDeleteProduct}
        onResetArchive={handleResetArchive}
        isBusy={isBusy}
      />
    </div>
  );
}
