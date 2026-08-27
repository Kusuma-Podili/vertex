import React, { useState } from 'react';
import { Webhook, Play, CheckCircle2, XCircle, RefreshCw, Lock } from 'lucide-react';

export interface WebhookEndpoint {
  id: string;
  url: string;
  events: string[];
  status: 'ACTIVE' | 'FAILING' | 'DISABLED';
  secret: string;
  successRate: number;
  lastFiredAt: string;
}

export function ApiWebhooksView() {
  const [endpoints] = useState<WebhookEndpoint[]>([
    {
      id: 'wh-ep-001',
      url: 'https://erp-connector.enterprise.internal/webhooks/orders',
      events: ['order.confirmed', 'order.shipped', 'order.refunded'],
      status: 'ACTIVE',
      secret: 'whsec_enterprise_2026_prod_998822',
      successRate: 99.8,
      lastFiredAt: '2026-08-27 10:14:22',
    },
    {
      id: 'wh-ep-002',
      url: 'https://crm-analytics.partner.io/events/capture',
      events: ['user.registered', 'payment.captured'],
      status: 'ACTIVE',
      secret: 'whsec_partner_2026_feed_441122',
      successRate: 100.0,
      lastFiredAt: '2026-08-27 09:48:10',
    },
  ]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Outgoing API Webhook Event Relays</h1>
          <p className="text-sm text-slate-400 mt-1">Real-time webhook event dispatching with HMAC SHA-256 signature security and exponential backoff retry.</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold shadow-md shadow-blue-500/20">
          + Register Webhook Endpoint
        </button>
      </div>

      <div className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-950/60 text-slate-400 text-xs uppercase border-b border-slate-800">
            <tr>
              <th className="px-6 py-3.5">Endpoint URL</th>
              <th className="px-6 py-3.5">Subscribed Topics</th>
              <th className="px-6 py-3.5">Delivery Success</th>
              <th className="px-6 py-3.5">HMAC Signing Key</th>
              <th className="px-6 py-3.5">Last Dispatched</th>
              <th className="px-6 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300">
            {endpoints.map(e => (
              <tr key={e.id} className="hover:bg-slate-800/40">
                <td className="px-6 py-4 font-mono text-xs font-semibold text-slate-100">{e.url}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {e.events.map(ev => (
                      <span key={ev} className="px-2 py-0.5 text-[10px] font-mono bg-slate-800 text-slate-300 rounded border border-slate-700">
                        {ev}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-mono font-bold text-emerald-400">{e.successRate}%</span>
                </td>
                <td className="px-6 py-4 font-mono text-xs text-slate-500">
                  ••••••••••••••••{e.secret.slice(-6)}
                </td>
                <td className="px-6 py-4 text-xs font-mono text-slate-400">{e.lastFiredAt}</td>
                <td className="px-6 py-4 text-right">
                  <button className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs font-semibold">
                    Test Ping
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
