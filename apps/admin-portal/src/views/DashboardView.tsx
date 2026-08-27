import React from 'react';
import { TrendingUp, DollarSign, ShoppingCart, Users, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export function DashboardView() {
  const metrics = [
    { title: 'Total Gross Revenue', value: '$284,950.40', change: '+24.5%', isPos: true, icon: DollarSign },
    { title: 'Total Orders Placed', value: '1,420', change: '+18.2%', isPos: true, icon: ShoppingCart },
    { title: 'Active Customer Base', value: '8,940', change: '+12.4%', isPos: true, icon: Users },
    { title: 'Avg Order Value (AOV)', value: '$200.67', change: '+5.1%', isPos: true, icon: TrendingUp },
  ];

  const recentOrders = [
    { id: 'ORD-9824-AX7', customer: 'John Doe', items: '1 item', total: '$382.36', status: 'CONFIRMED', date: '5 min ago' },
    { id: 'ORD-9823-KP2', customer: 'Elena Rostova', items: '3 items', total: '$1,240.00', status: 'FULFILLING', date: '22 min ago' },
    { id: 'ORD-9822-ZZ9', customer: 'Marcus Brody', items: '2 items', total: '$599.00', status: 'SHIPPED', date: '1 hour ago' },
    { id: 'ORD-9821-MM4', customer: 'Sarah Connor', items: '1 item', total: '$2,499.00', status: 'DELIVERED', date: '3 hours ago' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Executive Commerce Overview</h1>
        <p className="text-slate-400 text-sm mt-1">Real-time telemetric stream across all regional storefronts and fulfillment hubs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <div key={i} className="p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{m.title}</span>
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-slate-100">{m.value}</div>
                <div className="flex items-center gap-1 mt-2 text-xs font-medium text-emerald-400">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>{m.change}</span>
                  <span className="text-slate-500 ml-1">vs last month</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-200">Recent Order Activity</h2>
            <p className="text-xs text-slate-500 mt-0.5">Live order transitions and payment captures</p>
          </div>
          <button className="text-xs font-semibold text-blue-400 hover:text-blue-300">View All Orders &rarr;</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-950/50 text-slate-400 text-xs uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-6 py-3">Order Number</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Volume</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {recentOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 font-mono font-medium text-blue-400">{ord.id}</td>
                  <td className="px-6 py-4">{ord.customer}</td>
                  <td className="px-6 py-4 text-slate-400">{ord.items}</td>
                  <td className="px-6 py-4 font-semibold text-slate-100">{ord.total}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {ord.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-xs">{ord.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
