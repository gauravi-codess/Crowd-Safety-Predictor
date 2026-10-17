import React from 'react';
import { Sparkles, Clock, TrendingDown } from 'lucide-react';
import { DataTag } from './DataTag.tsx';

interface BetterTimeInfo {
  suggestedTime: string;
  suggestedDay: string;
  predictedIndex: number;
  reductionPercent: number;
  reason: string;
}

interface RecommendationCardProps {
  recommendation: BetterTimeInfo;
  className?: string;
  onApplyRecommendation?: (time: string) => void;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
  className = '',
  onApplyRecommendation,
}) => {
  return (
    <div
      className={`p-5 rounded-2xl border border-indigo-200 dark:border-indigo-800/80 bg-gradient-to-br from-indigo-50/90 via-white to-blue-50/60 dark:from-indigo-950/40 dark:via-slate-900 dark:to-slate-900 shadow-sm ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-sm">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Recommended Better Time to Visit
              </h4>
              <DataTag type="Predicted" />
            </div>
            <p className="text-xs text-indigo-900/80 dark:text-indigo-300">
              Significant crowd reduction window identified
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-300/80 dark:border-emerald-800">
          <TrendingDown className="w-3.5 h-3.5" />
          <span>-{recommendation.reductionPercent}% Crowd</span>
        </div>
      </div>

      <div className="mt-4 p-3.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-indigo-100 dark:border-indigo-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
          <div>
            <div className="text-sm font-extrabold text-slate-900 dark:text-white">
              {recommendation.suggestedTime} · {recommendation.suggestedDay}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Projected crowd index:{' '}
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                {recommendation.predictedIndex}/100 (Low)
              </span>
            </div>
          </div>
        </div>

        {onApplyRecommendation && (
          <button
            type="button"
            onClick={() => onApplyRecommendation(recommendation.suggestedTime)}
            className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors whitespace-nowrap self-start sm:self-auto"
          >
            Switch to This Slot
          </button>
        )}
      </div>

      <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
        {recommendation.reason}
      </p>
    </div>
  );
};
