import React from 'react';
import { getCrowdLevel } from '../config/thresholds.js';
import { ShieldCheck, ShieldAlert, AlertTriangle } from 'lucide-react';

interface CrowdBadgeProps {
  index?: number;
  level?: string;
  showIndex?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const CrowdBadge: React.FC<CrowdBadgeProps> = ({
  index,
  level,
  showIndex = true,
  size = 'md',
  className = '',
}) => {
  const config = getCrowdLevel(index ?? (level === 'high' ? 85 : level === 'moderate' ? 55 : 20));

  const Icon =
    config.key === 'low'
      ? ShieldCheck
      : config.key === 'moderate'
      ? AlertTriangle
      : ShieldAlert;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1.5',
    md: 'text-xs px-2.5 py-1 gap-2 font-medium',
    lg: 'text-sm px-3.5 py-1.5 gap-2.5 font-semibold',
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-4.5 h-4.5',
  };

  return (
    <span
      className={`inline-flex items-center rounded-md border ${config.bgLight} ${config.textLight} ${config.borderLight} ${sizeClasses[size]} ${className}`}
    >
      <Icon className={`${iconSizes[size]} shrink-0`} aria-hidden="true" />
      <span className="font-semibold whitespace-nowrap">{config.label}</span>
      {showIndex && index !== undefined && (
        <span className="tabular-nums font-mono opacity-80 text-[0.9em] border-l border-current/20 pl-1.5">
          {Math.round(index)}/100
        </span>
      )}
    </span>
  );
};
