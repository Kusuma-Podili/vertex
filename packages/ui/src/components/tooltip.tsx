import React, { useState } from 'react';
import { clsx } from 'clsx';

export interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export function Tooltip({ content, children, position = 'top' }: TooltipProps) {
  const [visible, setVisible] = useState(false);

  const posClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div className="relative inline-block" onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
      {children}
      {visible && (
        <div className={clsx('absolute z-50 whitespace-nowrap rounded-md bg-slate-950 px-2.5 py-1 text-[11px] font-medium text-slate-200 shadow-xl border border-slate-800 animate-in fade-in duration-150', posClasses[position])}>
          {content}
        </div>
      )}
    </div>
  );
}
