import React from 'react';
import { Info } from 'lucide-react';

interface SampleDataBannerProps {
  className?: string;
  variant?: 'banner' | 'inline';
}

export const SampleDataBanner: React.FC<SampleDataBannerProps> = ({
  className = '',
  variant = 'banner',
}) => {
  if (variant === 'inline') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 text-xs text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/60 px-2.5 py-1 rounded-md font-medium ${className}`}
      >
        <Info className="w-3.5 h-3.5 shrink-0 text-amber-600 dark:text-amber-400" />
        <span>Sample data – not verified real-world information</span>
      </span>
    );
  }

  return (
    <div
      role="note"
      className={`flex items-center justify-between gap-3 px-4 py-2.5 bg-amber-50/90 dark:bg-amber-950/30 border border-amber-200/90 dark:border-amber-800/60 rounded-lg text-xs text-amber-900 dark:text-amber-200 ${className}`}
    >
      <div className="flex items-center gap-2">
        <Info className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
        <span className="font-semibold">Sample data – not verified real-world information</span>
      </div>
      <span className="hidden sm:inline text-amber-700 dark:text-amber-400 text-[11px]">
        Index values &amp; schedules are mock prototypes for testing
      </span>
    </div>
  );
};
