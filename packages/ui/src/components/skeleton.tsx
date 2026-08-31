import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'rectangular' | 'circular' | 'rounded';
}

export function Skeleton({ className, variant = 'rounded', ...props }: SkeletonProps) {
  const base = 'animate-pulse bg-slate-800/80';
  const variants = {
    rectangular: 'rounded-none',
    circular: 'rounded-full',
    rounded: 'rounded-xl',
  };
  return <div className={twMerge(clsx(base, variants[variant], className))} {...props} />;
}
