import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  Phone,
  Wifi,
  Star,
  Coffee,
  CheckCircle2,
  ArrowUpRight,
} from 'lucide-react';
import { TESTIMONIALS } from '../data/menuData';

export default function FooterAndVisit() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <>
      {/* Testimonials & Visit Section */}
      <section id="visit" className="py-16 lg:py-24 bg-[#FAF6F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {/* Guest Reviews */}
          <div>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B86B43]">
                Community & Regulars
              </span>
              <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#1C1613] mt-1.5">
                Loved by Neighborhood Coffee Lovers
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((review) => (
                <div
                  key={review.id}
                  className="bg-white rounded-3xl p-7 border border-[#E6DDD0] shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-1 text-[#D9822B] mb-4">
                      {Array.from({ length: review.rating }).map((_, idx) => (
                        <Star key={idx} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm text-[#4A3E35] leading-relaxed italic">
                      &ldquo;{review.quote}&rdquo;
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#EFE7DC] flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-[#1C1613]">{review.name}</h4>
                      <span className="text-xs text-[#7A6A5E]">{review.role}</span>
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#F5EFE6] text-[#B86B43]">
                      Orders: {review.favorite}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visit the Roastery Card */}
          <div className="bg-[#EFE7DC] rounded-3xl border border-[#DFD2C3] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B86B43]">
                  Flagship Café & Roastery Lab
                </span>
                <h3 className="font-serif-display text-3xl font-bold text-[#1C1613] mt-2">
                  Pull Up a Chair in the Sunlit Courtyard
                </h3>
                <p className="text-sm sm:text-base text-[#5C4F44] mt-2 max-w-xl">
                  Designed for quiet focus, weekend catch-ups, and sensory coffee tastings. Order
                  ahead online and pick up directly at the brass express bar.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#B86B43] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-[#1C1613]">Location</h4>
                    <p className="text-xs text-[#5C4F44] mt-0.5">
                      248 Artisan Row, Suite 100
                      <br />
                      Arts District · Free Bike & 30-Min Pickup Parking
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#B86B43] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-[#1C1613]">Roastery Hours</h4>
                    <p className="text-xs text-[#5C4F44] mt-0.5">
                      Mon – Fri: 7:00 AM – 7:00 PM
                      <br />
                      Sat – Sun: 7:30 AM – 8:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Wifi className="w-5 h-5 text-[#B86B43] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-[#1C1613]">Work-Friendly</h4>
                    <p className="text-xs text-[#5C4F44] mt-0.5">
                      1 Gbps Fiber Wi-Fi & power outlets at every communal oak table
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#B86B43] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-[#1C1613]">Direct Line & Catering</h4>
                    <p className="text-xs text-[#5C4F44] mt-0.5">
                      (555) 234-8910 · hello@auraroastery.coffee
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative min-h-72 bg-[#231B16]">
              <img
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=900&q=80"
                alt="Aura Roastery warm timber interior"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#E09F7D] font-bold block">
                    Weekly Public Cupping
                  </span>
                  <span className="text-sm font-semibold">Fridays at 10:00 AM · Free RSVP</span>
                </div>
                <a
                  href="#menu"
                  className="px-4 py-2 rounded-full bg-white text-[#1C1613] text-xs font-bold inline-flex items-center gap-1 hover:bg-[#F5EFE6]"
                >
                  Order Ahead <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#140F0C] text-[#C9B9A6] py-14 border-t border-[#2D231E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#2D231E]">
            <div className="md:col-span-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#C87D55] text-white flex items-center justify-center">
                  <Coffee className="w-5 h-5" />
                </div>
                <span className="font-serif-display text-2xl font-bold text-white">
                  AURA ROASTERY
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#A59484] max-w-sm leading-relaxed">
                Small-batch specialty coffee roastery and interactive web ordering experience built
                with React, Vite, and Tailwind CSS.
              </p>
            </div>

            <div className="md:col-span-3 space-y-2 text-xs">
              <h4 className="font-bold text-white uppercase tracking-wider mb-3">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#menu" className="hover:text-white transition-colors">
                    Interactive Menu
                  </a>
                </li>
                <li>
                  <a href="#roastery" className="hover:text-white transition-colors">
                    Signature Roast Profiles
                  </a>
                </li>
                <li>
                  <a href="#story" className="hover:text-white transition-colors">
                    Direct-Trade Sourcing
                  </a>
                </li>
                <li>
                  <a href="#visit" className="hover:text-white transition-colors">
                    Location & Hours
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-4 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Roastery Dispatch & Bean Drops
              </h4>
              <p className="text-xs text-[#A59484]">
                Get notified when rare micro-lot single origins drop + receive a free pastry voucher.
              </p>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold py-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Welcome to the Roastery Club! Check your inbox for 15% off.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="flex-1 px-3.5 py-2 rounded-full bg-[#231B16] border border-[#3B2F29] text-xs text-white placeholder:text-[#7A6A5E] focus:outline-none focus:border-[#C87D55]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-full bg-[#C87D55] hover:bg-[#B56A42] text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8E7D70]">
            <p>© {new Date().getFullYear()} Aura Roastery & Café. Portfolio Showcase Project.</p>
            <p>Built with React 19 · Vite · Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </>
  );
}
