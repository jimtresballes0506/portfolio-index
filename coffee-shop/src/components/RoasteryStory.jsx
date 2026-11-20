import React from 'react';
import { Flame, Compass, Sprout, Coffee } from 'lucide-react';
import { ROAST_PROFILES } from '../data/menuData';

export default function RoasteryStory() {
  return (
    <section id="roastery" className="py-16 lg:py-24 bg-[#1C1613] text-[#FAF6F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#E09F7D]">
            Small-Batch Craft & Transparency
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold mt-2 leading-tight">
            Three Signature Roast Profiles, Dialed In Daily
          </h2>
          <p className="text-[#C9B9A6] text-sm sm:text-base mt-3 leading-relaxed">
            Every lot is sample-roasted on our Loring Smart Roaster and cupped by our Q-Grader team
            to highlight origin terroir, natural sweetness, and clean finish.
          </p>
        </div>

        {/* Roast Profile Cards */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {ROAST_PROFILES.map((roast) => (
            <div
              key={roast.id}
              className="rounded-3xl bg-[#271F1B] border border-[#3B2F29] p-7 flex flex-col justify-between hover:border-[#C87D55] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#E09F7D] font-bold uppercase tracking-wider">
                  <span>{roast.process}</span>
                  <Flame className="w-4 h-4" />
                </div>
                <h3 className="font-serif-display text-2xl font-bold text-white mt-2">
                  {roast.title}
                </h3>
                <p className="text-xs text-[#C9B9A6] mt-1">{roast.origin}</p>

                <div className="mt-4 py-2.5 px-3.5 rounded-xl bg-[#1C1613] border border-[#3B2F29] text-xs font-medium text-[#E6C5AE]">
                  Tasting Notes: {roast.notes}
                </div>
              </div>

              {/* Sensory Bars */}
              <div className="mt-6 space-y-3 pt-4 border-t border-[#3B2F29]">
                {[
                  { label: 'Brightness & Acidity', value: roast.acidity },
                  { label: 'Body & Texture', value: roast.body },
                  { label: 'Caramelized Sweetness', value: roast.sweetness },
                ].map((metric) => (
                  <div key={metric.label}>
                    <div className="flex justify-between text-xs text-[#C9B9A6] mb-1">
                      <span>{metric.label}</span>
                      <span className="font-semibold text-white">{metric.value}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-[#140F0D] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#C87D55] to-[#E8B28F]"
                        style={{ width: `${metric.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Farm to Cup Story Strip */}
        <div
          id="story"
          className="mt-16 pt-14 border-t border-[#332823] grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#2D231E] border border-[#463730] flex items-center justify-center text-[#E09F7D] shrink-0">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif-display text-lg font-bold text-white">
                1. Direct-Trade Harvest
              </h4>
              <p className="text-sm text-[#C9B9A6] mt-1 leading-relaxed">
                We pay 45% above Fair Trade minimums directly to partner micro-mills in Ethiopia,
                Colombia, and Guatemala.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#2D231E] border border-[#463730] flex items-center justify-center text-[#E09F7D] shrink-0">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif-display text-lg font-bold text-white">
                2. Precision Convection Roast
              </h4>
              <p className="text-sm text-[#C9B9A6] mt-1 leading-relaxed">
                Low-emission convection roasting locks in delicate aromatics without bitter smoky
                aftertastes.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#2D231E] border border-[#463730] flex items-center justify-center text-[#E09F7D] shrink-0">
              <Coffee className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif-display text-lg font-bold text-white">
                3. Remineralized Water & Extraction
              </h4>
              <p className="text-sm text-[#C9B9A6] mt-1 leading-relaxed">
                Custom magnesium-balanced water and gravimetric espresso scales ensure every shot
                extracts with sweet clarity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
