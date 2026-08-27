import React from 'react';

export function ProductsView() {
  const products = [
    { sku: 'AURORA-PRO-001', name: 'Aurora Pro ANC Wireless Headphones', category: 'Audio', price: '$349.99', stock: 127, status: 'Active' },
    { sku: 'TITAN-16-MAX-01', name: 'TitanBook 16 Max Creator Workstation', category: 'Laptops', price: '$2,499.00', stock: 25, status: 'Active' },
    { sku: 'ERGO-SYNC-M01', name: 'AeroSync Ergonomic Posture Task Chair', category: 'Furniture', price: '$599.00', stock: 54, status: 'Active' },
    { sku: 'VELOCE-DB-PID', name: 'Veloce Dual-Boiler PID Espresso Machine', category: 'Kitchen', price: '$1,850.00', stock: 14, status: 'Active' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Product Catalog Management</h1>
          <p className="text-sm text-slate-400">Manage SKUs, variants, multi-tiered pricing, and inventory allocations.</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium">
          + Add New Product
        </button>
      </div>

      <div className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-950/60 text-slate-400 text-xs uppercase border-b border-slate-800">
            <tr>
              <th className="px-6 py-3.5">SKU</th>
              <th className="px-6 py-3.5">Product Title</th>
              <th className="px-6 py-3.5">Category</th>
              <th className="px-6 py-3.5">MSRP</th>
              <th className="px-6 py-3.5">Total Inventory</th>
              <th className="px-6 py-3.5">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300">
            {products.map((p) => (
              <tr key={p.sku} className="hover:bg-slate-800/40">
                <td className="px-6 py-4 font-mono text-xs text-slate-400">{p.sku}</td>
                <td className="px-6 py-4 font-medium text-slate-100">{p.name}</td>
                <td className="px-6 py-4 text-slate-400">{p.category}</td>
                <td className="px-6 py-4 font-bold text-emerald-400">{p.price}</td>
                <td className="px-6 py-4">{p.stock} units</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-0.5 text-xs font-semibold rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
