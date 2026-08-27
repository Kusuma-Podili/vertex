import React from 'react';
import { LayoutDashboard, ShoppingBag, Package, Warehouse, Users, Tag, BarChart3, Settings, ShieldAlert } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'Orders & Fulfillment', icon: ShoppingBag, badge: '12 New' },
    { id: 'products', label: 'Catalog & Products', icon: Package },
    { id: 'inventory', label: 'Multi-Warehouse Inventory', icon: Warehouse },
    { id: 'customers', label: 'Customer Management', icon: Users },
    { id: 'discounts', label: 'Coupons & Promotions', icon: Tag },
    { id: 'analytics', label: 'Analytics & Revenue', icon: BarChart3 },
  ];

  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-950 flex flex-col justify-between p-4">
      <div>
        <div className="flex items-center gap-3 px-3 py-4 mb-6 border-b border-slate-800">
          <div className="h-9 w-9 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/30">
            EP
          </div>
          <div>
            <div className="font-semibold text-slate-100 text-sm">Enterprise Core</div>
            <div className="text-xs text-blue-400 font-mono">v1.0.0 Enterprise</div>
          </div>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
                  {item.label}
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 text-xs font-semibold bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="pt-4 border-t border-slate-800 text-xs text-slate-500 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>All Services Operational</span>
        </div>
        <div className="text-[11px] text-slate-600">Enterprise Multi-Tenant Node</div>
      </div>
    </aside>
  );
}
