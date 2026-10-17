import React from 'react';

export type DataTagType = 'Historical' | 'Predicted' | 'Real-time';

interface DataTagProps {
  type: DataTagType;
  className?: string;
}

export const DataTag: React.FC<DataTagProps> = ({ type, className = '' }) => {
  if (type === 'Real-time') {
    return (
      <span
        title="Real-time sensor/live feed is not connected"
        className={`inline-flex items-center text-[11px] font-medium tracking-tight text-slate-500 dark:text-slate-400 ${className}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mr-1.5 opacity-60"></span>
        Real-time data not available
      </span>
    );
  }

  const isPredicted = type === 'Predicted';

  return (
    <span
      className={`inline-flex items-center text-[11px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded border ${
        isPredicted
          ? 'bg-indigo-50/80 border-indigo-200/80 text-indigo-700 dark:bg-indigo-950/40 dark:border-indigo-800/80 dark:text-indigo-300'
          : 'bg-slate-100/90 border-slate-200 text-slate-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300'
      } ${className}`}
    >
      {type}
    </span>
  );
};
