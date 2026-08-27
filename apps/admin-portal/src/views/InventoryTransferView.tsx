import React, { useState } from 'react';
import { Warehouse, ArrowRightLeft, Check, Clock, Truck, ShieldAlert } from 'lucide-react';

export interface TransferManifest {
  id: string;
  originWarehouse: string;
  destinationWarehouse: string;
  sku: string;
  productName: string;
  quantity: number;
  status: 'IN_TRANSIT' | 'RECEIVED' | 'AWAITING_DISPATCH';
  initiatedBy: string;
  initiatedAt: string;
  estimatedArrival: string;
}

export function InventoryTransferView() {
  const [transfers, setTransfers] = useState<TransferManifest[]>([
    {
      id: 'TRF-2026-081',
      originWarehouse: 'US-EAST-1 (Allentown Hub)',
      destinationWarehouse: 'US-WEST-1 (Reno Logistics)',
      sku: 'AURORA-PRO-001',
      productName: 'Aurora Pro ANC Headphones',
      quantity: 50,
      status: 'IN_TRANSIT',
      initiatedBy: 'Alexander Wright',
      initiatedAt: '2026-08-25',
      estimatedArrival: '2026-08-29',
    },
    {
      id: 'TRF-2026-082',
      originWarehouse: 'US-WEST-1 (Reno Logistics)',
      destinationWarehouse: 'US-EAST-1 (Allentown Hub)',
      sku: 'TITAN-16-MAX-01',
      productName: 'TitanBook 16 Max Creator Workstation',
      quantity: 15,
      status: 'RECEIVED',
      initiatedBy: 'Marcus Brody',
      initiatedAt: '2026-08-21',
      estimatedArrival: '2026-08-26',
    },
  ]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Inter-Warehouse Stock Transfer Protocol</h1>
          <p className="text-sm text-slate-400 mt-1">Rebalance regional inventory hubs and generate transport manifests.</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold shadow-md shadow-blue-500/20">
          + New Stock Transfer Order
        </button>
      </div>

      <div className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-950/60 text-slate-400 text-xs uppercase border-b border-slate-800">
            <tr>
              <th className="px-6 py-3.5">Manifest Code</th>
              <th className="px-6 py-3.5">SKU & Item</th>
              <th className="px-6 py-3.5">Origin &rarr; Destination</th>
              <th className="px-6 py-3.5">Units</th>
              <th className="px-6 py-3.5">Transit Status</th>
              <th className="px-6 py-3.5">ETA</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300">
            {transfers.map(t => (
              <tr key={t.id} className="hover:bg-slate-800/40">
                <td className="px-6 py-4 font-mono font-bold text-blue-400">{t.id}</td>
                <td className="px-6 py-4">
                  <div className="font-semibold text-slate-100">{t.productName}</div>
                  <div className="text-xs text-slate-500 font-mono">{t.sku}</div>
                </td>
                <td className="px-6 py-4 text-xs">
                  <div className="text-slate-300">{t.originWarehouse}</div>
                  <div className="text-slate-500 mt-0.5">&darr; {t.destinationWarehouse}</div>
                </td>
                <td className="px-6 py-4 font-bold text-slate-100 font-mono">{t.quantity} units</td>
                <td className="px-6 py-4">
                  {t.status === 'IN_TRANSIT' && (
                    <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center gap-1.5 w-fit">
                      <Truck className="w-3.5 h-3.5 animate-pulse" /> In Transit
                    </span>
                  )}
                  {t.status === 'RECEIVED' && (
                    <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5 w-fit">
                      <Check className="w-3.5 h-3.5" /> Received
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-xs font-mono text-slate-400">{t.estimatedArrival}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
