import React from 'react';

export function OrdersView() {
  const orders = [
    { id: 'ORD-9824-AX7', customer: 'John Doe', email: 'john.doe@enterprise-dev.com', amount: '$382.36', payment: 'STRIPE (Credit Card)', status: 'CONFIRMED', date: '2026-08-27 10:14' },
    { id: 'ORD-9823-KP2', customer: 'Elena Rostova', email: 'merchant@aeroacoustics.io', amount: '$1,240.00', payment: 'PAYPAL', status: 'FULFILLING', date: '2026-08-27 09:45' },
    { id: 'ORD-9822-ZZ9', customer: 'Marcus Brody', email: 'mbrody@museum.edu', amount: '$599.00', payment: 'STRIPE (Apple Pay)', status: 'SHIPPED', date: '2026-08-27 08:30' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Order Management & Fulfillment</h1>
          <p className="text-sm text-slate-400">Process, fulfill, and track customer shipments across all carrier networks.</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium shadow-md shadow-blue-500/20">
          Export CSV Ledger
        </button>
      </div>

      <div className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-950/60 text-slate-400 text-xs uppercase border-b border-slate-800">
            <tr>
              <th className="px-6 py-3.5">Order ID</th>
              <th className="px-6 py-3.5">Customer</th>
              <th className="px-6 py-3.5">Gateway</th>
              <th className="px-6 py-3.5">Total</th>
              <th className="px-6 py-3.5">State Machine</th>
              <th className="px-6 py-3.5">Placed At</th>
              <th className="px-6 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300">
            {orders.map((o) => (
              <tr key={o.id} className="hover:bg-slate-800/40">
                <td className="px-6 py-4 font-mono text-blue-400 font-semibold">{o.id}</td>
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-200">{o.customer}</div>
                  <div className="text-xs text-slate-500">{o.email}</div>
                </td>
                <td className="px-6 py-4 text-xs font-mono text-slate-400">{o.payment}</td>
                <td className="px-6 py-4 font-bold text-slate-100">{o.amount}</td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {o.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs text-slate-400">{o.date}</td>
                <td className="px-6 py-4 text-right">
                  <button className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs font-medium">
                    Manage
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
