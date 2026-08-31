import React, { useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  content: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  defaultTabId?: string;
  onChange?: (id: string) => void;
  className?: string;
}

export function Tabs({ tabs, defaultTabId, onChange, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTabId || tabs[0]?.id);

  const handleSelect = (id: string) => {
    setActiveTab(id);
    onChange?.(id);
  };

  return (
    <div className={twMerge('w-full space-y-6', className)}>
      <div className="flex border-b border-slate-800 gap-2">
        {tabs.map(tab => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => handleSelect(tab.id)}
              className={clsx(
                'flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-all',
                isActive
                  ? 'border-blue-500 text-blue-400 font-semibold'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
              )}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span className="rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-300">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div>
        {tabs.find(t => t.id === activeTab)?.content}
      </div>
    </div>
  );
}
