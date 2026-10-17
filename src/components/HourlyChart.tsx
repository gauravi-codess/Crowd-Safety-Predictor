import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  ReferenceLine,
} from 'recharts';
import { CROWD_THRESHOLDS } from '../config/thresholds.js';
import { DataTag } from './DataTag.tsx';

interface HourlyDataPoint {
  hour: number;
  displayHour: string;
  shortHour: string;
  index: number;
  level: string;
  levelLabel: string;
  hex: string;
  isSelected?: boolean;
}

interface HourlyChartProps {
  data: HourlyDataPoint[];
  selectedHour?: number;
  onSelectHour?: (hour: number) => void;
  className?: string;
}

export const HourlyChart: React.FC<HourlyChartProps> = ({
  data,
  selectedHour,
  onSelectHour,
  className = '',
}) => {
  const [hoveredHour, setHoveredHour] = useState<HourlyDataPoint | null>(null);

  // Custom Tooltip component for Recharts
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item: HourlyDataPoint = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white text-xs rounded-lg p-2.5 shadow-xl border border-slate-800 z-50">
          <div className="font-semibold text-slate-200">{item.displayHour}</div>
          <div className="flex items-center gap-2 mt-1">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: item.hex }}
            />
            <span className="text-slate-300">{item.levelLabel}</span>
            <span className="font-mono tabular-nums font-bold text-white">
              {item.index}/100
            </span>
          </div>
          {item.isSelected && (
            <div className="text-[10px] text-indigo-400 mt-1 font-medium">
              ★ Selected prediction time
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`p-4 md:p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Hourly Crowd Profile (24 Hours)
            </h3>
            <DataTag type="Predicted" />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Click any bar to inspect specific hour crowd density. Selected hour highlighted with ring.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#22C55E]" />
            <span className="text-slate-600 dark:text-slate-400 font-medium">Low (0-39)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#F59E0B]" />
            <span className="text-slate-600 dark:text-slate-400 font-medium">Moderate (40-69)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#EF4444]" />
            <span className="text-slate-600 dark:text-slate-400 font-medium">High (70-100)</span>
          </div>
        </div>
      </div>

      {/* Recharts container */}
      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 12, right: 8, left: -24, bottom: 4 }}
            onClick={(state: any) => {
              const anyState = state as any;
              if (anyState && anyState.activePayload && anyState.activePayload[0]) {
                const hour = anyState.activePayload[0].payload?.hour;
                if (typeof hour === 'number' && onSelectHour) {
                  onSelectHour(hour);
                }
              }
            }}
          >
            <XAxis
              dataKey="shortHour"
              tickLine={false}
              axisLine={{ stroke: '#cbd5e1' }}
              tick={{ fontSize: 11, fill: '#64748b' }}
              interval={2}
            />
            <YAxis
              domain={[0, 100]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: '#94a3b8' }}
              ticks={[0, 25, 50, 75, 100]}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99, 102, 241, 0.08)' }} />
            {/* Moderate & High Threshold Reference Lines */}
            <ReferenceLine
              y={CROWD_THRESHOLDS.MODERATE.min}
              stroke="#F59E0B"
              strokeDasharray="3 3"
              strokeOpacity={0.4}
            />
            <ReferenceLine
              y={CROWD_THRESHOLDS.HIGH.min}
              stroke="#EF4444"
              strokeDasharray="3 3"
              strokeOpacity={0.4}
            />
            <Bar dataKey="index" radius={[4, 4, 0, 0]} maxBarSize={28}>
              {data.map((entry) => {
                const isSelected = selectedHour !== undefined && entry.hour === selectedHour;
                return (
                  <Cell
                    key={`cell-${entry.hour}`}
                    fill={entry.hex}
                    stroke={isSelected ? '#1e1b4b' : 'none'}
                    strokeWidth={isSelected ? 2 : 0}
                    className="cursor-pointer transition-opacity hover:opacity-85"
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-2 pt-2 border-t border-slate-100 dark:border-slate-800">
        <span>Scale: Crowd Intensity Index (0–100)</span>
        <span>Peak Threshold: &ge; 70 High</span>
      </div>
    </div>
  );
};
