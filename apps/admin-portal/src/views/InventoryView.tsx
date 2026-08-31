import React from 'react';

export function InventoryView() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-100">Multi-Warehouse Inventory Control</h1>
      <p className="text-sm text-slate-400">Stock reservation locks, backorders, and regional fulfillment routing.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800">
          <h2 className="text-base font-semibold text-slate-200">US-EAST-1 (Allentown Hub)</h2>
          <div className="mt-4 space-y-2 text-sm text-slate-400">
            <div className="flex justify-between"><span>Capacity Utilization:</span> <span className="text-slate-100 font-semibold">68%</span></div>
            <div className="flex justify-between"><span>Total SKUs Stocked:</span> <span className="text-slate-100 font-semibold">412</span></div>
            <div className="flex justify-between"><span>Reserved Orders in Queue:</span> <span className="text-blue-400 font-semibold">24</span></div>
          </div>
        </div>
        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800">
          <h2 className="text-base font-semibold text-slate-200">US-WEST-1 (Reno Logistics)</h2>
          <div className="mt-4 space-y-2 text-sm text-slate-400">
            <div className="flex justify-between"><span>Capacity Utilization:</span> <span className="text-slate-100 font-semibold">54%</span></div>
            <div className="flex justify-between"><span>Total SKUs Stocked:</span> <span className="text-slate-100 font-semibold">320</span></div>
            <div className="flex justify-between"><span>Reserved Orders in Queue:</span> <span className="text-blue-400 font-semibold">18</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
