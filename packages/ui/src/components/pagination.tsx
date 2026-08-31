import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}

export function Pagination({ currentPage, totalPages, onPageChange, siblingCount = 1 }: PaginationProps) {
  if (totalPages <= 1) return null;

  const range = (start: number, end: number) => Array.from({ length: end - start + 1 }, (_, idx) => idx + start);

  const pages = range(1, totalPages);

  return (
    <div className="flex items-center justify-center gap-1.5 py-4">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={clsx(
            'flex h-9 w-9 items-center justify-center rounded-lg text-xs font-semibold transition-all',
            currentPage === page
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
              : 'border border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-100 hover:bg-slate-800'
          )}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
