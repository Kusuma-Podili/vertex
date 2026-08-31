import React, { useState } from 'react';
import { Tag, Percent, DollarSign, Calendar, Plus, Trash2, CheckCircle2 } from 'lucide-react';

export interface PromotionRule {
  id: string;
  code: string;
  type: 'PERCENTAGE' | 'FIXED' | 'FREE_SHIPPING';
  value: number;
  minSpendUsd: number;
  maxCapUsd?: number;
  usageLimitTotal?: number;
  currentUsageCount: number;
  isActive: boolean;
  expiresAt: string;
}

export function CouponRuleBuilderView() {
  const [coupons, setCoupons] = useState<PromotionRule[]>([
    { id: 'c-01', code: 'WELCOME10', type: 'PERCENTAGE', value: 10, minSpendUsd: 50, maxCapUsd: 50, currentUsageCount: 420, isActive: true, expiresAt: '2026-12-31' },
    { id: 'c-02', code: 'PRO-AUDIO-50', type: 'FIXED', value: 50, minSpendUsd: 300, currentUsageCount: 89, isActive: true, expiresAt: '2026-10-15' },
    { id: 'c-03', code: 'FREESHIP-2026', type: 'FREE_SHIPPING', value: 0, minSpendUsd: 100, currentUsageCount: 1250, isActive: true, expiresAt: '2026-12-31' },
  ]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Promotion & Dynamic Coupon Rules</h1>
          <p className="text-sm text-slate-400 mt-1">Configure threshold rules, tiered multi-buy promotions, and automated expiration windows.</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold shadow-md shadow-blue-500/20 flex items-center gap-2">
          <Plus className="w-4 h-4" /> Create Coupon Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {coupons.map(c => (
          <div key={c.id} className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-lg text-blue-400 bg-blue-500/10 px-3 py-1 rounded-lg border border-blue-500/20">
                {c.code}
              </span>
              <span className="px-2 py-0.5 text-xs font-semibold rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Active
              </span>
            </div>

            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex justify-between">
                <span>Discount Type:</span>
                <span className="text-slate-200 font-semibold">{c.type}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount Value:</span>
                <span className="text-slate-200 font-semibold">{c.type === 'PERCENTAGE' ? `${c.value}%` : `$${c.value}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Min Order Spend:</span>
                <span className="text-slate-200 font-semibold">${c.minSpendUsd}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Redemptions:</span>
                <span className="text-blue-400 font-semibold">{c.currentUsageCount} orders</span>
              </div>
              <div className="flex justify-between">
                <span>Expiration Date:</span>
                <span className="text-slate-300 font-mono">{c.expiresAt}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
              <button className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded font-semibold">
                Edit Rules
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
