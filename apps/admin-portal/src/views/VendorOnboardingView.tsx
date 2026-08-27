import React, { useState } from 'react';
import { CheckCircle2, XCircle, AlertTriangle, FileText, DollarSign, ShieldCheck, Store, ArrowRight, UserCheck } from 'lucide-react';

export interface VendorApplication {
  id: string;
  storeName: string;
  applicantName: string;
  email: string;
  country: string;
  taxId: string;
  annualTurnoverUsd: number;
  commissionRate: number;
  status: 'PENDING_REVIEW' | 'VERIFIED' | 'REJECTED' | 'DOCS_REQUESTED';
  submittedAt: string;
  documents: { name: string; url: string; type: string }[];
}

export function VendorOnboardingView() {
  const [vendors, setVendors] = useState<VendorApplication[]>([
    {
      id: 'ven-app-001',
      storeName: 'AeroAcoustics Sound Labs',
      applicantName: 'Elena Rostova',
      email: 'merchant@aeroacoustics.io',
      country: 'Germany',
      taxId: 'DE-998822110',
      annualTurnoverUsd: 1250000,
      commissionRate: 0.10,
      status: 'VERIFIED',
      submittedAt: '2026-08-20',
      documents: [
        { name: 'Business_Registration_Certificate.pdf', url: '#', type: 'PDF' },
        { name: 'Tax_Exemption_Form_W8BEN.pdf', url: '#', type: 'PDF' },
      ],
    },
    {
      id: 'ven-app-002',
      storeName: 'QuantumTech Hardware Systems',
      applicantName: 'Marcus Brody',
      email: 'mbrody@quantumtech.io',
      country: 'United States',
      taxId: 'US-849201992',
      annualTurnoverUsd: 4800000,
      commissionRate: 0.08,
      status: 'PENDING_REVIEW',
      submittedAt: '2026-08-26',
      documents: [
        { name: 'Certificate_of_Incorporation_Delaware.pdf', url: '#', type: 'PDF' },
      ],
    },
    {
      id: 'ven-app-003',
      storeName: 'Nordic Heritage Knits & Apparel',
      applicantName: 'Astrid Lindgren',
      email: 'astrid@nordic-heritage.se',
      country: 'Sweden',
      taxId: 'SE-556012345',
      annualTurnoverUsd: 650000,
      commissionRate: 0.12,
      status: 'PENDING_REVIEW',
      submittedAt: '2026-08-27',
      documents: [
        { name: 'VAT_Registration_Certificate.pdf', url: '#', type: 'PDF' },
      ],
    },
  ]);

  const [selectedVendor, setSelectedVendor] = useState<VendorApplication | null>(null);

  const updateStatus = (id: string, newStatus: VendorApplication['status']) => {
    setVendors(prev => prev.map(v => v.id === id ? { ...v, status: newStatus } : v));
    if (selectedVendor && selectedVendor.id === id) {
      setSelectedVendor(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Vendor Marketplace & KYC Approvals</h1>
          <p className="text-sm text-slate-400 mt-1">Review merchant merchant credentials, verify tax certificates, and set custom commission tiers.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold">
            Export Merchant Ledger
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-xs font-semibold text-slate-400 uppercase">Active Approved Merchants</div>
          <div className="text-2xl font-bold text-emerald-400 mt-2">48 Stores</div>
          <div className="text-xs text-slate-500 mt-1">Generating $182,400 monthly volume</div>
        </div>
        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-xs font-semibold text-slate-400 uppercase">Applications In Queue</div>
          <div className="text-2xl font-bold text-amber-400 mt-2">6 Pending</div>
          <div className="text-xs text-slate-500 mt-1">Average review time: 4.2 hours</div>
        </div>
        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-xs font-semibold text-slate-400 uppercase">Avg Platform Commission</div>
          <div className="text-2xl font-bold text-blue-400 mt-2">9.4%</div>
          <div className="text-xs text-slate-500 mt-1">Tiered based on annual volume</div>
        </div>
      </div>

      <div className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-950/60 text-slate-400 text-xs uppercase border-b border-slate-800">
            <tr>
              <th className="px-6 py-3.5">Store / Brand</th>
              <th className="px-6 py-3.5">Contact Lead</th>
              <th className="px-6 py-3.5">Country</th>
              <th className="px-6 py-3.5">Annual GMV</th>
              <th className="px-6 py-3.5">Commission</th>
              <th className="px-6 py-3.5">KYC Status</th>
              <th className="px-6 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300">
            {vendors.map(v => (
              <tr key={v.id} className="hover:bg-slate-800/40 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-100">{v.storeName}</div>
                  <div className="text-xs text-slate-500 font-mono">Tax ID: {v.taxId}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-slate-200">{v.applicantName}</div>
                  <div className="text-xs text-slate-500">{v.email}</div>
                </td>
                <td className="px-6 py-4 text-xs text-slate-300">{v.country}</td>
                <td className="px-6 py-4 font-mono font-semibold text-slate-100">
                  ${v.annualTurnoverUsd.toLocaleString()}
                </td>
                <td className="px-6 py-4 font-mono text-blue-400 font-bold">
                  {(v.commissionRate * 100).toFixed(1)}%
                </td>
                <td className="px-6 py-4">
                  {v.status === 'VERIFIED' && (
                    <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      APPROVED
                    </span>
                  )}
                  {v.status === 'PENDING_REVIEW' && (
                    <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      PENDING REVIEW
                    </span>
                  )}
                  {v.status === 'REJECTED' && (
                    <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
                      REJECTED
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => setSelectedVendor(v)}
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs font-semibold"
                  >
                    Inspect KYC
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedVendor && (
        <div className="p-8 rounded-2xl bg-slate-900 border border-blue-500/30 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white">{selectedVendor.storeName} — KYC Dossier</h2>
              <p className="text-xs text-slate-400 mt-1">Application ID: {selectedVendor.id} | Submitted on {selectedVendor.submittedAt}</p>
            </div>
            <button onClick={() => setSelectedVendor(null)} className="text-slate-400 hover:text-white">&times;</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="space-y-1">
              <span className="text-xs text-slate-500">Legal Representative</span>
              <div className="font-semibold text-slate-200">{selectedVendor.applicantName}</div>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-slate-500">Tax Identification</span>
              <div className="font-semibold font-mono text-slate-200">{selectedVendor.taxId}</div>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-slate-500">Operating Jurisdiction</span>
              <div className="font-semibold text-slate-200">{selectedVendor.country}</div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-300 mb-3">Submitted Verification Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {selectedVendor.documents.map((doc, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-400" />
                    <div>
                      <div className="text-xs font-semibold text-slate-200">{doc.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{doc.type} Document • Verified Signature</div>
                    </div>
                  </div>
                  <button className="text-xs text-blue-400 hover:text-blue-300 font-semibold">Download</button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              onClick={() => updateStatus(selectedVendor.id, 'REJECTED')}
              className="px-4 py-2 bg-rose-600/20 text-rose-400 hover:bg-rose-600/30 border border-rose-500/30 rounded-lg text-xs font-bold"
            >
              Reject Application
            </button>
            <button
              onClick={() => updateStatus(selectedVendor.id, 'VERIFIED')}
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold shadow-lg shadow-emerald-500/20"
            >
              Approve Storefront & Activate Payouts
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
