'use client';

import React from 'react';
import { CONDITION_GRADES } from '../data/initialProducts';

export default function GradingAndImpactSection({ stats }) {
  return (
    <section
      id="grading"
      className="border-t border-zinc-200 bg-zinc-50/60 py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
              Authentication &amp; Quality Standards
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-zinc-950">
              Archival Condition Grading
            </h2>
          </div>
          <p className="text-xs text-zinc-500 max-w-md leading-relaxed">
            Every garment is ozone-sanitized, inspected for seam integrity, and
            graded on a transparent 10-point scale before being photographed.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CONDITION_GRADES.slice(1).map((tier) => (
            <div
              key={tier.id}
              className="bg-white border border-zinc-200 p-6 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-zinc-950">
                    {tier.label}
                  </span>
                  <span className="font-mono text-xs text-zinc-500">
                    {tier.score}/10
                  </span>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  {tier.description}
                </p>
              </div>
              <div className="w-full h-1 bg-zinc-100">
                <div
                  className="h-full bg-zinc-950"
                  style={{ width: `${tier.score * 10}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Clean Minimalist Circular Ledger Strip */}
        <div className="bg-white border border-zinc-200 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1 max-w-xl">
            <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-800">
              Circular Wardrobe Impact
            </span>
            <h3 className="font-serif text-2xl text-zinc-950">
              Choosing secondhand preserves water and prevents virgin textile
              emissions.
            </h3>
          </div>
          <div className="flex items-center gap-8 font-mono">
            <div>
              <span className="text-2xl font-semibold text-zinc-950 block">
                {stats.totalWaterLiters.toLocaleString()}L
              </span>
              <span className="text-[11px] text-zinc-500">
                Water preserved in Drop 04
              </span>
            </div>
            <div className="border-l border-zinc-200 pl-8">
              <span className="text-2xl font-semibold text-zinc-950 block">
                {stats.totalCo2Kg.toFixed(1)} kg
              </span>
              <span className="text-[11px] text-zinc-500">
                CO₂e emissions offset
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
