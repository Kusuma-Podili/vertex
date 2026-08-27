import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
  defaultExpandedIds?: string[];
}

export function Accordion({ items, allowMultiple = false, className, defaultExpandedIds = [] }: AccordionProps) {
  const [expanded, setExpanded] = useState<string[]>(defaultExpandedIds);

  const toggle = (id: string) => {
    if (allowMultiple) {
      setExpanded(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
    } else {
      setExpanded(prev => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={twMerge('divide-y divide-slate-800 rounded-xl border border-slate-800 bg-slate-900', className)}>
      {items.map(item => {
        const isOpen = expanded.includes(item.id);
        return (
          <div key={item.id} className="overflow-hidden">
            <button
              onClick={() => !item.disabled && toggle(item.id)}
              disabled={item.disabled}
              className={clsx(
                'flex w-full items-center justify-between px-6 py-4 text-left text-sm font-semibold transition-colors',
                item.disabled ? 'cursor-not-allowed opacity-40' : 'text-slate-200 hover:bg-slate-800/60'
              )}
            >
              <span>{item.title}</span>
              <ChevronDown className={clsx('h-4 w-4 text-slate-400 transition-transform duration-200', isOpen && 'rotate-180 text-blue-400')} />
            </button>
            {isOpen && (
              <div className="px-6 pb-5 pt-1 text-xs leading-relaxed text-slate-400 animate-in fade-in duration-150">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
