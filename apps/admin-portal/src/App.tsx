import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './views/DashboardView';
import { OrdersView } from './views/OrdersView';
import { ProductsView } from './views/ProductsView';
import { InventoryView } from './views/InventoryView';
import { CustomersView } from './views/CustomersView';
import { DiscountsView } from './views/DiscountsView';
import { AnalyticsView } from './views/AnalyticsView';

export function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'products' | 'inventory' | 'customers' | 'discounts' | 'analytics'>('dashboard');

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-8 bg-slate-900/50">
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'orders' && <OrdersView />}
          {activeTab === 'products' && <ProductsView />}
          {activeTab === 'inventory' && <InventoryView />}
          {activeTab === 'customers' && <CustomersView />}
          {activeTab === 'discounts' && <DiscountsView />}
          {activeTab === 'analytics' && <AnalyticsView />}
        </main>
      </div>
    </div>
  );
}

export default App;
