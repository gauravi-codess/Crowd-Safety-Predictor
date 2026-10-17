import React from 'react';
import { getCrowdLevel } from '../config/thresholds.js';

interface CrowdGaugeProps {
  index: number;
  size?: number;
  className?: string;
}

export const CrowdGauge: React.FC<CrowdGaugeProps> = ({
  index,
  size = 220,
  className = '',
}) => {
  const numericIndex = Math.max(0, Math.min(100, Math.round(Number(index) || 0)));
  const config = getCrowdLevel(numericIndex);

  // Gauge calculations for 240 degree arc (from 150 deg to 390 deg / -210 to 30)
  const strokeWidth = 14;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  // Arc angle: 260 degrees out of 360
  const arcFraction = 260 / 360;
  const totalArcLength = circumference * arcFraction;
  const progressLength = (numericIndex / 100) * totalArcLength;
  const strokeDashoffset = totalArcLength - progressLength;

  return (
    <div
      role="progressbar"
      aria-valuenow={numericIndex}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Crowd intensity index: ${numericIndex} out of 100, ${config.label}`}
      className={`flex flex-col items-center justify-center select-none ${className}`}
    >
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="rotate-[140deg] transform transition-all duration-700 ease-out"
        >
          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeDasharray={`${totalArcLength} ${circumference}`}
            strokeLinecap="round"
            className="text-slate-200 dark:text-slate-800"
          />
          {/* Filled progress track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={config.hex}
            strokeWidth={strokeWidth}
            strokeDasharray={`${totalArcLength} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center label content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-2">
          <span className="text-[11px] font-semibold tracking-wider uppercase text-slate-400 dark:text-slate-500">
            Crowd Index
          </span>
          <div className="flex items-baseline justify-center gap-0.5 my-0.5">
            <span
              className="text-4xl md:text-5xl font-extrabold tracking-tight tabular-nums font-mono transition-colors duration-500"
              style={{ color: config.hex }}
            >
              {numericIndex}
            </span>
            <span className="text-xs font-medium text-slate-400 dark:text-slate-500 font-mono">
              /100
            </span>
          </div>
          <span
            className="text-sm font-bold tracking-tight px-2 py-0.5 rounded transition-colors"
            style={{ color: config.hex }}
          >
            {config.label}
          </span>
        </div>
      </div>

      {/* Honesty note below gauge */}
      <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center mt-1">
        Index is based on density models, not visitor headcounts
      </p>
    </div>
  );
};
