import React from 'react';
import { Search, Bell, UserCheck } from 'lucide-react';

export function Header() {
  return (
    <header className="h-16 border-b border-slate-800 bg-slate-950 px-8 flex items-center justify-between">
      <div className="flex items-center gap-4 w-96">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search orders, SKU, customers, or transactions..."
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-4 py-1.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-900">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-blue-500"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-slate-800">
          <div className="h-8 w-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-sm font-semibold text-slate-300">
            AW
          </div>
          <div className="text-left">
            <div className="text-sm font-medium text-slate-200">Alexander Wright</div>
            <div className="text-xs text-slate-500">Super Administrator</div>
          </div>
        </div>
      </div>
    </header>
  );
}
