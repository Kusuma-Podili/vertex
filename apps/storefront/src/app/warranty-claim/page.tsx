import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

export default function WarrantyClaimPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold border border-blue-500/20 mb-4">
          <ShieldCheck className="w-4 h-4" /> 10-Year Global Express Warranty
        </div>
        <h1 className="text-3xl font-extrabold text-white">Submit Hardware Warranty Claim</h1>
        <p className="text-sm text-slate-400 mt-2">Zero-deductible advance replacement for registered hardware owners.</p>
      </div>

      {submitted ? (
        <div className="p-8 rounded-2xl bg-slate-900 border border-emerald-500/30 text-center space-y-4">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
          <h2 className="text-xl font-bold text-white">Warranty Claim RMA-88992 Approved</h2>
          <p className="text-sm text-slate-400">Pre-paid FedEx return shipping label has been dispatched to your email.</p>
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Hardware Serial Number / Barcode</label>
            <input required type="text" placeholder="e.g. AURA-AUD-0001-STD" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white font-mono" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Original Order Number</label>
            <input required type="text" placeholder="e.g. ORD-9824-AX7" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white font-mono" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Detailed Description of Diagnostic Fault</label>
            <textarea required rows={4} placeholder="Describe the transducer or power delivery issue observed..." className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white" />
          </div>
          <button type="submit" className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-sm shadow-lg shadow-blue-500/20">
            Submit RMA Claim & Generate Return Label
          </button>
        </form>
      )}
    </div>
  );
}
