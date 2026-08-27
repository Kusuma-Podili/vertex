import React from 'react';
import { Trash2, ArrowRight, ShieldCheck } from 'lucide-react';

export default function CartPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-extrabold text-white mb-8">Your Hardware Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 flex gap-6 items-center">
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
              alt="Aurora Pro ANC"
              className="w-24 h-24 object-cover rounded-lg bg-slate-950"
            />
            <div className="flex-1">
              <div className="text-xs font-semibold text-blue-400">AURORA-PRO-001</div>
              <h2 className="text-base font-bold text-white">Aurora Pro ANC Wireless Headphones</h2>
              <div className="text-xs text-slate-400 mt-0.5">Variant: Midnight Black / Beryllium Drivers</div>
              <div className="text-sm font-bold text-slate-100 mt-2">$349.99</div>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="number"
                defaultValue={1}
                min={1}
                className="w-16 bg-slate-950 border border-slate-800 rounded px-2 py-1 text-sm text-center text-white"
              />
              <button className="text-slate-500 hover:text-red-400 p-2">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ORDER SUMMARY */}
        <div className="p-8 rounded-xl bg-slate-900 border border-slate-800 h-fit space-y-6">
          <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-4">Order Summary</h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-slate-400">
              <span>Subtotal</span>
              <span className="text-white font-medium">$349.99</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Estimated Tax (CA 9.25%)</span>
              <span className="text-white font-medium">$32.37</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Express Freight</span>
              <span className="text-emerald-400 font-semibold">FREE</span>
            </div>
            <div className="pt-4 border-t border-slate-800 flex justify-between text-base font-bold text-white">
              <span>Estimated Total</span>
              <span className="text-blue-400 text-lg">$382.36</span>
            </div>
          </div>

          <a
            href="/checkout"
            className="w-full block text-center py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold shadow-lg shadow-blue-500/20"
          >
            Proceed to Secure Checkout &rarr;
          </a>

          <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            256-Bit Encrypted SSL Checkout
          </div>
        </div>
      </div>
    </div>
  );
}
