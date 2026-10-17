import React from 'react';
import { Link } from 'react-router-dom';
import { CrowdBadge } from './CrowdBadge.tsx';
import { SAFETY_STATUS_CONFIG } from '../config/thresholds.js';
import { ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { DataTag } from './DataTag.tsx';

interface AlternativePlace {
  id: string;
  name: string;
  category: string;
  city: string;
  image?: string;
  predictedIndex: number;
  predictedLevel: string;
  safetyStatus: string;
  waitingTime?: string | null;
  reason: string;
}

interface AlternativePlaceCardProps {
  place: AlternativePlace;
  date?: string;
  time?: string;
  className?: string;
}

export const AlternativePlaceCard: React.FC<AlternativePlaceCardProps> = ({
  place,
  date,
  time,
  className = '',
}) => {
  const safetyConf = SAFETY_STATUS_CONFIG[place.safetyStatus as keyof typeof SAFETY_STATUS_CONFIG] || SAFETY_STATUS_CONFIG.none;

  return (
    <div
      className={`p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all shadow-xs flex flex-col justify-between ${className}`}
    >
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-0.5">
              <span>{place.category}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                {place.city}
              </span>
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
              {place.name}
            </h4>
          </div>
          <DataTag type="Predicted" />
        </div>

        {/* Crowd & Safety Tags */}
        <div className="flex flex-wrap items-center gap-2 my-2.5">
          <CrowdBadge index={place.predictedIndex} level={place.predictedLevel} size="sm" />
          <span
            className={`text-[11px] font-medium px-2 py-0.5 rounded border ${safetyConf.bgLight} ${safetyConf.textLight} ${safetyConf.borderLight}`}
          >
            {safetyConf.shortLabel}
          </span>
          {place.waitingTime ? (
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
              Wait: {place.waitingTime}
            </span>
          ) : (
            <span className="text-[11px] text-slate-400 dark:text-slate-500 italic">
              Wait time: Not enough data
            </span>
          )}
        </div>

        {/* Reason highlight */}
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
          💡 {place.reason}
        </p>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end">
        <Link
          to={`/results?placeId=${encodeURIComponent(place.id)}&date=${encodeURIComponent(
            date || ''
          )}&time=${encodeURIComponent(time || '')}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
        >
          <span>View prediction for this place</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
