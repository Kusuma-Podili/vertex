import React from 'react';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';

export default function CheckoutSuccessPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <div className="h-16 w-16 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-8 h-8" />
      </div>
      <h1 className="text-3xl font-extrabold text-white">Payment Authorized & Confirmed!</h1>
      <p className="text-slate-400 mt-2 text-sm">
        Order confirmation has been dispatched to <span className="text-slate-200 font-semibold">john.doe@enterprise-dev.com</span>.
      </p>

      <div className="mt-8 p-6 rounded-xl bg-slate-900 border border-slate-800 text-left text-sm space-y-3">
        <div className="flex justify-between"><span className="text-slate-400">Order Number:</span> <span className="font-mono text-blue-400 font-bold">ORD-9824-AX7</span></div>
        <div className="flex justify-between"><span className="text-slate-400">Total Captured:</span> <span className="text-white font-bold">$382.36</span></div>
        <div className="flex justify-between"><span className="text-slate-400">Carrier Dispatch:</span> <span className="text-slate-300">FedEx Priority Overnight</span></div>
        <div className="flex justify-between"><span className="text-slate-400">Tracking Code:</span> <span className="font-mono text-emerald-400 font-semibold">FDX-99882211</span></div>
      </div>

      <div className="mt-8 flex justify-center gap-4">
        <a href="/shop" className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white rounded-lg text-sm font-medium">
          Continue Shopping
        </a>
        <a href="/account/orders" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium">
          Track Live Dispatch
        </a>
      </div>
    </div>
  );
}
