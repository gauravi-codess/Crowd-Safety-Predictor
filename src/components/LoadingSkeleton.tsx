import React from 'react';

interface LoadingSkeletonProps {
  type?: 'card' | 'chart' | 'results' | 'list';
  count?: number;
  className?: string;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  type = 'card',
  count = 1,
  className = '',
}) => {
  const items = Array.from({ length: count });

  if (type === 'results') {
    return (
      <div className={`space-y-6 animate-pulse ${className}`}>
        <div className="h-28 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-72 bg-slate-200 dark:bg-slate-800 rounded-2xl md:col-span-1" />
          <div className="h-72 bg-slate-200 dark:bg-slate-800 rounded-2xl md:col-span-2" />
        </div>
        <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
      </div>
    );
  }

  if (type === 'chart') {
    return (
      <div className={`p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl animate-pulse ${className}`}>
        <div className="h-6 w-48 bg-slate-200 dark:bg-slate-800 rounded mb-4" />
        <div className="h-56 bg-slate-100 dark:bg-slate-800/60 rounded-xl" />
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div className={`space-y-3 animate-pulse ${className}`}>
        {items.map((_, i) => (
          <div key={i} className="h-20 bg-slate-200 dark:bg-slate-800 rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {items.map((_, i) => (
        <div
          key={i}
          className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 animate-pulse flex flex-col justify-between"
        >
          <div>
            <div className="h-44 bg-slate-200 dark:bg-slate-800" />
            <div className="p-5 space-y-3">
              <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
              <div className="h-3 bg-slate-100 dark:bg-slate-800/60 rounded w-full" />
              <div className="h-3 bg-slate-100 dark:bg-slate-800/60 rounded w-2/3" />
            </div>
          </div>
          <div className="p-5 pt-0">
            <div className="h-9 bg-slate-200 dark:bg-slate-800 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
};
