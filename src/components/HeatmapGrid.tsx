import React, { useState } from 'react';
import { getCrowdLevel } from '../config/thresholds.js';
import { DataTag } from './DataTag.tsx';

interface HeatmapHour {
  hour: number;
  displayHour: string;
  index: number;
  level: string;
  hex: string;
}

interface HeatmapDay {
  day: string;
  isWeekend: boolean;
  hours: HeatmapHour[];
}

interface HeatmapGridProps {
  matrix: HeatmapDay[];
  placeName?: string;
  className?: string;
  onCellClick?: (day: string, hour: number, index: number) => void;
}

export const HeatmapGrid: React.FC<HeatmapGridProps> = ({
  matrix,
  placeName,
  className = '',
  onCellClick,
}) => {
  const [activeCell, setActiveCell] = useState<{
    day: string;
    displayHour: string;
    index: number;
    level: string;
    label: string;
  } | null>(null);

  // Hours to show in header row
  const hourLabels = [
    '12A', '1A', '2A', '3A', '4A', '5A', '6A', '7A', '8A', '9A', '10A', '11A',
    '12P', '1P', '2P', '3P', '4P', '5P', '6P', '7P', '8P', '9P', '10P', '11P',
  ];

  return (
    <div className={`p-4 md:p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Weekly Crowd Heatmap {placeName ? `· ${placeName}` : ''}
            </h3>
            <DataTag type="Historical" />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Historical intensity index mapped across 168 hours of the standard weekly operating cycle.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-[#22C55E]" />
            <span className="text-slate-600 dark:text-slate-400">Low (0-39)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-[#F59E0B]" />
            <span className="text-slate-600 dark:text-slate-400">Moderate (40-69)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-[#EF4444]" />
            <span className="text-slate-600 dark:text-slate-400">High (70-100)</span>
          </div>
        </div>
      </div>

      {/* Responsive scroll container */}
      <div className="overflow-x-auto pb-2">
        <div className="min-w-[680px]">
          {/* Header with hour marks */}
          <div className="grid grid-cols-[80px_repeat(24,_1fr)] gap-1 mb-1 text-[10px] text-slate-400 dark:text-slate-500 font-mono">
            <div className="text-left font-medium">Day</div>
            {hourLabels.map((lbl, idx) => (
              <div key={idx} className="text-center">
                {idx % 3 === 0 ? lbl : '·'}
              </div>
            ))}
          </div>

          {/* Matrix rows */}
          <div className="space-y-1">
            {matrix.map((row) => (
              <div
                key={row.day}
                className="grid grid-cols-[80px_repeat(24,_1fr)] gap-1 items-center"
              >
                <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate pr-2">
                  <span className={row.isWeekend ? 'text-indigo-600 dark:text-indigo-400 font-bold' : ''}>
                    {row.day.slice(0, 3)}
                  </span>
                </div>

                {row.hours.map((cell) => {
                  const lvl = getCrowdLevel(cell.index);

                  return (
                    <button
                      key={cell.hour}
                      type="button"
                      onClick={() => onCellClick && onCellClick(row.day, cell.hour, cell.index)}
                      onMouseEnter={() =>
                        setActiveCell({
                          day: row.day,
                          displayHour: cell.displayHour,
                          index: cell.index,
                          level: lvl.key,
                          label: lvl.label,
                        })
                      }
                      onMouseLeave={() => setActiveCell(null)}
                      title={`${row.day} at ${cell.displayHour}: ${lvl.label} (${cell.index}/100)`}
                      className="h-7 rounded-sm transition-transform hover:scale-110 hover:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 relative cursor-pointer"
                      style={{
                        backgroundColor: lvl.hex,
                        opacity: cell.index === 0 ? 0.2 : Math.max(0.35, cell.index / 100),
                      }}
                      aria-label={`${row.day} at ${cell.displayHour}: ${lvl.label} index ${cell.index}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tooltip / Active inspection indicator bar */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs min-h-[28px]">
        {activeCell ? (
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-900 dark:text-white">
              {activeCell.day} at {activeCell.displayHour}:
            </span>
            <span
              className="font-bold px-2 py-0.5 rounded text-white"
              style={{
                backgroundColor:
                  activeCell.level === 'low'
                    ? '#22C55E'
                    : activeCell.level === 'moderate'
                    ? '#F59E0B'
                    : '#EF4444',
              }}
            >
              {activeCell.label}
            </span>
            <span className="font-mono tabular-nums text-slate-700 dark:text-slate-300">
              Index: {activeCell.index}/100
            </span>
          </div>
        ) : (
          <span className="text-slate-400 dark:text-slate-500">
            Hover over any grid tile to inspect specific day &amp; hour crowd metrics
          </span>
        )}
        <span className="text-[11px] text-slate-400 dark:text-slate-500">
          Source: Historical aggregated patterns
        </span>
      </div>
    </div>
  );
};
