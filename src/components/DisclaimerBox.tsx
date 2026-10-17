import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { DISCLAIMER_TEXT } from '../config/thresholds.js';

interface DisclaimerBoxProps {
  className?: string;
  variant?: 'card' | 'minimal';
}

export const DisclaimerBox: React.FC<DisclaimerBoxProps> = ({
  className = '',
  variant = 'card',
}) => {
  if (variant === 'minimal') {
    return (
      <p className={`text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 ${className}`}>
        <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-500" />
        <span>{DISCLAIMER_TEXT}</span>
      </p>
    );
  }

  return (
    <div
      role="region"
      aria-label="Safety Disclaimer"
      className={`p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm text-slate-600 dark:text-slate-300 ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 shrink-0">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
            Honest Prediction Disclaimer
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
            {DISCLAIMER_TEXT} Crowd intensity is an index from 0 to 100 based on historical patterns, not a live visitor count. Conditions at physical venues can fluctuate abruptly due to weather, transport disruptions, or unannounced events. Always consult on-site officials and local municipal advisories.
          </p>
        </div>
      </div>
    </div>
  );
};
