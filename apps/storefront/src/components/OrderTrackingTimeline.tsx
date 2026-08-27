import React from 'react';
import { CheckCircle2, Circle, Truck, Package, Clock, ShieldCheck } from 'lucide-react';
import { TrackingDetailDto } from '@enterprise/types';

export interface OrderTrackingTimelineProps {
  tracking: TrackingDetailDto;
}

export function OrderTrackingTimeline({ tracking }: OrderTrackingTimelineProps) {
  return (
    <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <div className="text-xs text-slate-500 font-mono">Carrier: {tracking.carrier}</div>
          <h3 className="text-lg font-bold text-white mt-0.5">Tracking Number: {tracking.trackingNumber}</h3>
        </div>
        <span className="px-3 py-1 bg-blue-500/10 text-blue-400 font-bold text-xs rounded-full border border-blue-500/20">
          {tracking.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 text-xs">
        <div><span className="text-slate-500">Origin Hub:</span> <span className="text-slate-200 font-semibold">{tracking.origin}</span></div>
        <div><span className="text-slate-500">Destination:</span> <span className="text-slate-200 font-semibold">{tracking.destination}</span></div>
      </div>

      {/* Checkpoints Timeline */}
      <div className="space-y-6 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-800">
        {tracking.checkpoints.map((cp, idx) => (
          <div key={idx} className="flex gap-4 items-start relative z-10">
            <div className="h-7 w-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-md shadow-blue-500/25 shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-100">{cp.description}</div>
              <div className="text-xs text-slate-400 mt-0.5">{cp.location}</div>
              <div className="text-[11px] text-slate-500 font-mono mt-1">{new Date(cp.timestamp).toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
