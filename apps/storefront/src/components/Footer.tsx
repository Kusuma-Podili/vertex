import React from 'react';

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-16 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="text-xl font-black tracking-widest text-white mb-4">AURA</div>
          <p className="text-xs leading-relaxed text-slate-500">
            Engineered precision instruments for high-output creators, software architects, and audiophiles worldwide.
          </p>
        </div>

        <div>
          <div className="text-white font-semibold text-xs uppercase tracking-wider mb-4">Store Navigation</div>
          <ul className="space-y-2 text-xs">
            <li><a href="/shop" className="hover:text-white">All Products</a></li>
            <li><a href="/categories/electronics" className="hover:text-white">High-Performance Computing</a></li>
            <li><a href="/categories/audio" className="hover:text-white">Audiophile Spatial Sound</a></li>
            <li><a href="/categories/living" className="hover:text-white">Ergonomic Architecture</a></li>
          </ul>
        </div>

        <div>
          <div className="text-white font-semibold text-xs uppercase tracking-wider mb-4">Client Support</div>
          <ul className="space-y-2 text-xs">
            <li><a href="/account/orders" className="hover:text-white">Order Tracking</a></li>
            <li><a href="/shipping" className="hover:text-white">Global Dispatch Rates</a></li>
            <li><a href="/returns" className="hover:text-white">30-Day Hassle-Free Returns</a></li>
            <li><a href="/warranty" className="hover:text-white">12-Year Hardware Warranty</a></li>
          </ul>
        </div>

        <div>
          <div className="text-white font-semibold text-xs uppercase tracking-wider mb-4">Newsletter Dispatch</div>
          <p className="text-xs text-slate-500 mb-3">Receive early notifications for limited hardware drops.</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter email address"
              className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500 flex-1"
            />
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600">
        <div>&copy; 2026 AURA Enterprise E-Commerce Platform. All Rights Reserved.</div>
        <div className="flex gap-6 mt-4 sm:mt-0">
          <a href="/privacy" className="hover:text-slate-400">Privacy Policy</a>
          <a href="/terms" className="hover:text-slate-400">Terms of Service</a>
          <a href="/security" className="hover:text-slate-400">Security Architecture</a>
        </div>
      </div>
    </footer>
  );
}
