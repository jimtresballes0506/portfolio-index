'use client';

import React, { useState } from 'react';
import { Check } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-white border-t border-zinc-200 text-zinc-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-semibold tracking-tight text-zinc-950">
                RE:THREAD
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                STUDIO
              </span>
            </div>
            <p className="text-xs text-zinc-500 max-w-sm leading-relaxed">
              Curated 1-of-1 vintage and secondhand garments. Authenticated,
              measured flat, and powered by Next.js 15 &amp; SQLite.
            </p>
            <p className="text-xs font-mono text-zinc-400 pt-1">
              Showroom · 418 Mercer St · New Drops Fridays 10 AM EST
            </p>
          </div>

          <div className="md:col-span-3 space-y-2.5 text-xs">
            <span className="font-mono uppercase tracking-wider text-zinc-950 font-semibold block">
              Navigation
            </span>
            <ul className="space-y-2 text-zinc-500">
              <li>
                <a href="#catalog" className="hover:text-zinc-950">
                  Archive Catalog
                </a>
              </li>
              <li>
                <a href="#grading" className="hover:text-zinc-950">
                  Condition Grading
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-950 font-semibold block">
              Early Drop Access
            </span>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Receive a private preview link 30 minutes before weekly 1-of-1
              vintage drops go live.
            </p>
            {subscribed ? (
              <div className="text-xs text-emerald-800 font-medium flex items-center gap-1.5">
                <Check className="w-4 h-4" />
                <span>Subscribed to Drop 05 early access.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="flex-1 px-3 py-2 border border-zinc-200 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-medium cursor-pointer"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-4 text-[11px] text-zinc-400 font-mono">
          <span>© 2026 RE:THREAD STUDIO. All 1-of-1 rights reserved.</span>
          <span>Next.js 15 · Tailwind CSS · SQLite (prisma/thrift.db)</span>
        </div>
      </div>
    </footer>
  );
}
