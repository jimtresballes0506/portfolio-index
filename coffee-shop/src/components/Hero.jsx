import React from 'react';
import { ArrowRight, Sparkles, Award, Flame, ShieldCheck, SlidersHorizontal } from 'lucide-react';

export default function Hero({ onCustomizeFeatured, featuredItem }) {
  return (
    <section className="relative overflow-hidden pt-6 pb-16 lg:pt-12 lg:pb-24">
      {/* Subtle decorative radial glow */}
      <div
        className="pointer-events-none absolute -top-32 right-0 w-[34rem] h-[34rem] rounded-full opacity-25 blur-3xl"
        style={{
          background: 'radial-gradient(circle, #D8946B 0%, rgba(250,246,240,0) 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Editorial Headline & CTAs */}
          <div className="lg:col-span-7 space-y-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE7DC] border border-[#DFD2C3] text-[#5C4B3E] text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-[#C87D55]" />
              Small-Batch Micro-Roastery · Autumn / Winter Harvest
            </div>

            <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1C1613] tracking-tight leading-[1.08]">
              Crafted for slow mornings &{' '}
              <span className="italic font-normal text-[#B86B43]">effortless</span> pickup.
            </h1>

            <p className="text-base sm:text-lg text-[#5C4F44] max-w-2xl leading-relaxed">
              We source single-origin Arabica lots directly from high-altitude family farms, roast
              in small batches every 48 hours, and pull each cup to order. Browse our seasonal menu
              below to customize your drink and skip the morning queue.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <a
                href="#menu"
                className="inline-flex items-center gap-2.5 bg-[#1C1613] hover:bg-[#312620] text-[#FAF6F0] px-7 py-4 rounded-full text-sm font-semibold transition-all shadow-md hover:shadow-lg"
              >
                <span>Explore Interactive Menu</span>
                <ArrowRight className="w-4 h-4 text-[#E09F7D]" />
              </a>

              {featuredItem && (
                <button
                  onClick={() => onCustomizeFeatured(featuredItem)}
                  className="inline-flex items-center gap-2.5 bg-white hover:bg-[#F3ECE2] text-[#1C1613] border border-[#DDD0C0] px-6 py-4 rounded-full text-sm font-semibold transition-all cursor-pointer"
                >
                  <SlidersHorizontal className="w-4 h-4 text-[#C87D55]" />
                  <span>Customize Today&apos;s Signature</span>
                </button>
              )}
            </div>

            {/* Key Trust / Craft Metrics */}
            <div className="pt-6 border-t border-[#E6DDD0] grid grid-cols-3 gap-4 sm:gap-8 max-w-xl">
              <div>
                <div className="flex items-center gap-1.5 text-[#C87D55] font-serif-display text-2xl sm:text-3xl font-bold">
                  <Flame className="w-5 h-5" />
                  <span>48h</span>
                </div>
                <p className="text-xs sm:text-sm text-[#6E5D50] mt-0.5">
                  Peak roast-to-cup freshness guarantee
                </p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-[#1C1613] font-serif-display text-2xl sm:text-3xl font-bold">
                  <Award className="w-5 h-5 text-[#C87D55]" />
                  <span>88.5+</span>
                </div>
                <p className="text-xs sm:text-sm text-[#6E5D50] mt-0.5">
                  SCA Specialty Grade cup score minimum
                </p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-[#1C1613] font-serif-display text-2xl sm:text-3xl font-bold">
                  <ShieldCheck className="w-5 h-5 text-[#C87D55]" />
                  <span>100%</span>
                </div>
                <p className="text-xs sm:text-sm text-[#6E5D50] mt-0.5">
                  Direct-trade ethical farm partnerships
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase + Featured Drink Floating Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#231B16] aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1100&q=85"
                alt="Barista pouring latte art at Aura Roastery"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#140F0C]/85 via-[#140F0C]/20 to-transparent" />

              {/* Top pill overlay */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-black/55 backdrop-blur-md text-white text-xs font-medium border border-white/15">
                  Barista Spotlight · Pouring Live
                </span>
                <span className="px-3 py-1 rounded-full bg-[#C87D55] text-white text-xs font-bold shadow">
                  ★ 4.9 (1.4k+ Reviews)
                </span>
              </div>

              {/* Bottom Featured Drink Card inside Hero Image */}
              {featuredItem && (
                <div className="absolute bottom-4 left-4 right-4 bg-[#FAF6F0]/95 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-[#E6DDD0]">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={featuredItem.image}
                      alt={featuredItem.name}
                      className="w-16 h-16 rounded-xl object-cover flex-shrink-0 border border-[#DFD2C3]"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#B86B43]">
                          #1 Most Ordered Today
                        </span>
                        <span className="text-sm font-bold text-[#1C1613]">
                          ${featuredItem.price.toFixed(2)}
                        </span>
                      </div>
                      <h3 className="font-serif-display font-bold text-base text-[#1C1613] truncate">
                        {featuredItem.name}
                      </h3>
                      <p className="text-xs text-[#6E5D50] truncate">
                        {featuredItem.tastingNotes.join(' · ')}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-[#E6DDD0] flex items-center justify-between">
                    <span className="text-xs text-[#5C4F44] font-medium">
                      Ready in ~6 mins for express pickup
                    </span>
                    <button
                      onClick={() => onCustomizeFeatured(featuredItem)}
                      className="text-xs font-bold text-[#1C1613] hover:text-[#B86B43] inline-flex items-center gap-1 cursor-pointer"
                    >
                      Customize & Add <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
