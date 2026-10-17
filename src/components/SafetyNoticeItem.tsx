import React from 'react';
import { AlertCircle, AlertTriangle, ShieldCheck, Info } from 'lucide-react';

export interface SafetyNotice {
  id: string;
  title: string;
  type: 'advisory' | 'restriction' | 'incident' | 'notice' | string;
  severity: 'low' | 'medium' | 'high' | string;
  description: string;
  source: string;
  lastUpdated: string;
  placeName?: string;
}

interface SafetyNoticeItemProps {
  notice: SafetyNotice;
  showPlaceName?: boolean;
  className?: string;
}

export const SafetyNoticeItem: React.FC<SafetyNoticeItemProps> = ({
  notice,
  showPlaceName = false,
  className = '',
}) => {
  const isHigh = notice.severity === 'high';
  const isMedium = notice.severity === 'medium';

  const typeConfig: Record<string, { label: string; icon: any; badgeClass: string }> = {
    restriction: {
      label: 'Restriction',
      icon: AlertCircle,
      badgeClass: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-300 dark:border-rose-800',
    },
    advisory: {
      label: 'Advisory',
      icon: AlertTriangle,
      badgeClass: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300 dark:border-amber-800',
    },
    incident: {
      label: 'Incident Report',
      icon: AlertCircle,
      badgeClass: 'bg-orange-100 text-orange-800 dark:bg-orange-950/60 dark:text-orange-300 border-orange-300 dark:border-orange-800',
    },
    notice: {
      label: 'Public Notice',
      icon: Info,
      badgeClass: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-300 dark:border-slate-700',
    },
  };

  const currentType = typeConfig[notice.type.toLowerCase()] || typeConfig.notice;
  const Icon = currentType.icon;

  const severityBadge = {
    high: 'text-rose-700 dark:text-rose-400 font-bold',
    medium: 'text-amber-700 dark:text-amber-400 font-semibold',
    low: 'text-slate-500 dark:text-slate-400 font-medium',
  }[notice.severity.toLowerCase()] || 'text-slate-500';

  return (
    <article
      className={`p-4 rounded-xl border ${
        isHigh
          ? 'border-rose-200 dark:border-rose-900/60 bg-rose-50/40 dark:bg-rose-950/20'
          : isMedium
          ? 'border-amber-200 dark:border-amber-900/60 bg-amber-50/30 dark:bg-amber-950/20'
          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
      } ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <div
            className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
              isHigh
                ? 'bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400'
                : isMedium
                ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            <Icon className="w-4 h-4" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span
                className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${currentType.badgeClass}`}
              >
                {currentType.label}
              </span>
              <span className={`text-[11px] uppercase tracking-wide ${severityBadge}`}>
                Severity: {notice.severity}
              </span>
              {showPlaceName && notice.placeName && (
                <span className="text-xs font-semibold text-slate-900 dark:text-white">
                  · {notice.placeName}
                </span>
              )}
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
              {notice.title}
            </h4>
          </div>
        </div>
        <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono shrink-0 whitespace-nowrap">
          {notice.lastUpdated}
        </span>
      </div>

      <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 pl-9 leading-relaxed">
        {notice.description}
      </p>

      <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 pl-9 flex flex-wrap items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
        <span>Verified Source: <strong className="font-semibold text-slate-700 dark:text-slate-300">{notice.source}</strong></span>
        <span>Last updated: {notice.lastUpdated}</span>
      </div>
    </article>
  );
};
