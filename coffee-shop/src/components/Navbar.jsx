import React, { useState, useEffect } from 'react';
import { Coffee, ShoppingBag, Menu, X, Clock, MapPin } from 'lucide-react';

export default function Navbar({ cartCount, onOpenCart }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Interactive Menu', href: '#menu' },
    { label: 'Roast Profiles', href: '#roastery' },
    { label: 'Our Story', href: '#story' },
    { label: 'Visit & Hours', href: '#visit' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FAF6F0]/90 backdrop-blur-md shadow-sm border-b border-[#E6DDD0]'
          : 'bg-[#FAF6F0] border-b border-transparent'
      }`}
    >
      {/* Top announcement bar */}
      <div className="bg-[#1C1613] text-[#F5EBE1] text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Roastery Bar Open Today · 7:00 AM – 7:00 PM
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-[#C9B9A6]">
              <MapPin className="w-3.5 h-3.5 text-[#C87D55]" />
              248 Artisan Row, Arts District
            </span>
          </div>
          <div className="text-[#E6C5AE] font-medium">
            Use code <span className="underline decoration-[#C87D55] font-semibold">FIRSTBREW</span> in cart for 15% off your first pickup order
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-xl bg-[#1C1613] text-[#FAF6F0] flex items-center justify-center shadow-sm group-hover:bg-[#C87D55] transition-colors">
            <Coffee className="w-5 h-5" />
          </div>
          <div>
            <span className="font-serif-display text-2xl font-bold tracking-tight text-[#1C1613] block leading-none">
              AURA
            </span>
            <span className="text-[11px] uppercase tracking-[0.22em] text-[#7A6A5E] font-semibold">
              Roastery & Café
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#4A3E35] hover:text-[#C87D55] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions: Quick Order / Cart Drawer Button */}
        <div className="flex items-center gap-3">
          <a
            href="#menu"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#6E5D50] hover:text-[#1C1613] px-3 py-2"
          >
            <Clock className="w-3.5 h-3.5 text-[#C87D55]" />
            ~8 Min Pickup
          </a>

          <button
            onClick={onOpenCart}
            className="relative inline-flex items-center gap-2.5 bg-[#1C1613] hover:bg-[#312620] text-[#FAF6F0] px-4 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm hover:shadow cursor-pointer"
            aria-label="Open Quick Order Cart"
          >
            <ShoppingBag className="w-4 h-4 text-[#E09F7D]" />
            <span>Quick Order</span>
            <span
              className={`inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full text-xs font-bold transition-transform ${
                cartCount > 0
                  ? 'bg-[#C87D55] text-white scale-105'
                  : 'bg-[#352B25] text-[#C9B9A6]'
              }`}
            >
              {cartCount}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#1C1613] hover:bg-[#EFE7DC]"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF6F0] border-b border-[#E6DDD0] px-4 pt-2 pb-5 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 px-3 rounded-lg text-base font-medium text-[#1C1613] hover:bg-[#EFE7DC]"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
