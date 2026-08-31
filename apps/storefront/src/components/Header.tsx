import React from 'react';
import { ShoppingBag, Search, User, Menu, Heart } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="/" className="flex items-center gap-2 text-2xl font-black tracking-widest text-white">
            <span className="text-blue-500">AURA</span>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <a href="/shop" className="hover:text-white transition-colors">Catalog</a>
            <a href="/categories/electronics" className="hover:text-white transition-colors">Electronics</a>
            <a href="/categories/audio" className="hover:text-white transition-colors">Audio</a>
            <a href="/categories/furniture" className="hover:text-white transition-colors">Workspace</a>
            <a href="/about" className="hover:text-white transition-colors">Heritage</a>
          </nav>
        </div>

        <div className="flex items-center gap-5">
          <div className="relative hidden sm:block w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-slate-900 border border-slate-800 rounded-full pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <a href="/account/wishlist" className="p-2 text-slate-400 hover:text-white">
            <Heart className="w-5 h-5" />
          </a>

          <a href="/account" className="p-2 text-slate-400 hover:text-white">
            <User className="w-5 h-5" />
          </a>

          <a href="/cart" className="relative p-2 text-slate-400 hover:text-white flex items-center gap-1.5">
            <ShoppingBag className="w-5 h-5" />
            <span className="h-5 w-5 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center">
              1
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
