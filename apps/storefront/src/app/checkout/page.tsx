import React from 'react';
import { ShieldCheck, CreditCard, Lock } from 'lucide-react';

export default function CheckoutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-white">Express Encrypted Checkout</h1>
        <p className="text-sm text-slate-400 mt-2">Order #ORD-9824-AX7 | Reserved Stock Confirmed</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
          <h2 className="text-lg font-bold text-white">1. Shipping Address</h2>
          <input type="text" placeholder="Full Name" defaultValue="John Doe" className="w-full bg-slate-950 border border-slate-800 rounded p-2.5 text-sm text-white" />
          <input type="text" placeholder="Street Address" defaultValue="742 Evergreen Terrace" className="w-full bg-slate-950 border border-slate-800 rounded p-2.5 text-sm text-white" />
          <div className="grid grid-cols-2 gap-3">
            <input type="text" placeholder="City" defaultValue="Springfield" className="bg-slate-950 border border-slate-800 rounded p-2.5 text-sm text-white" />
            <input type="text" placeholder="Postal Code" defaultValue="97477" className="bg-slate-950 border border-slate-800 rounded p-2.5 text-sm text-white" />
          </div>
        </div>

        <div className="p-8 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
          <h2 className="text-lg font-bold text-white">2. Payment Method</h2>
          <div className="p-4 rounded-lg bg-slate-950 border border-blue-500/50 flex items-center justify-between text-sm">
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-blue-400" />
              <span>Credit Card (Stripe Secured)</span>
            </div>
            <span className="text-emerald-400 font-bold">✓</span>
          </div>

          <input type="text" placeholder="Card Number" defaultValue="•••• •••• •••• 4242" className="w-full bg-slate-950 border border-slate-800 rounded p-2.5 text-sm text-white font-mono" />
          <div className="grid grid-cols-2 gap-3">
            <input type="text" placeholder="MM/YY" defaultValue="12/28" className="bg-slate-950 border border-slate-800 rounded p-2.5 text-sm text-white font-mono" />
            <input type="text" placeholder="CVC" defaultValue="888" className="bg-slate-950 border border-slate-800 rounded p-2.5 text-sm text-white font-mono" />
          </div>

          <a
            href="/checkout/success"
            className="w-full block text-center py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold shadow-lg shadow-emerald-500/20 mt-4 flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" /> Authorize & Pay $382.36
          </a>
        </div>
      </div>
    </div>
  );
}
