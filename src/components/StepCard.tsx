import React from 'react';

interface StepCardProps {
  stepNumber: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

export const StepCard: React.FC<StepCardProps> = ({
  stepNumber,
  title,
  description,
  icon,
  className = '',
}) => {
  return (
    <div
      className={`p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between ${className}`}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            {icon}
          </div>
          <span className="text-2xl font-extrabold text-slate-300 dark:text-slate-700 font-mono">
            {stepNumber}
          </span>
        </div>

        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
          {title}
        </h3>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-medium text-indigo-600 dark:text-indigo-400">
        Continuous calibration
      </div>
    </div>
  );
};
