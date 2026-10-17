import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPlaces, getWeeklyHeatmap, getPlaceById } from '../services/api.js';
import { HeatmapGrid } from '../components/HeatmapGrid.tsx';
import { HourlyChart } from '../components/HourlyChart.tsx';
import { SampleDataBanner } from '../components/SampleDataBanner.tsx';
import { DataTag } from '../components/DataTag.tsx';
import { LoadingSkeleton } from '../components/LoadingSkeleton.tsx';
import { CrowdBadge } from '../components/CrowdBadge.tsx';
import { getCrowdLevel } from '../config/thresholds.js';
import { MapPin, Calendar, Layers, TrendingUp, BarChart3 } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ReferenceLine,
} from 'recharts';

export const Trends: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedPlaceId = searchParams.get('placeId') || 'victoria-memorial';

  const [places, setPlaces] = useState<any[]>([]);
  const [heatmapData, setHeatmapData] = useState<any>(null);
  const [currentPlace, setCurrentPlace] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [comparisonDay, setComparisonDay] = useState<'weekday' | 'weekend' | 'both'>('both');

  useEffect(() => {
    let isMounted = true;
    getPlaces().then((res) => {
      if (isMounted) setPlaces(res);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    Promise.all([getPlaceById(selectedPlaceId), getWeeklyHeatmap(selectedPlaceId)])
      .then(([placeRes, heatmapRes]) => {
        if (isMounted) {
          setCurrentPlace(placeRes);
          setHeatmapData(heatmapRes);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to load trend data:', err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [selectedPlaceId]);

  const handlePlaceChange = (newPlaceId: string) => {
    setSearchParams({ placeId: newPlaceId });
  };

  // Prepare 24-hr comparative dataset for line chart
  const comparativeHourlyData = currentPlace
    ? Array.from({ length: 24 }).map((_, h) => {
        const weekdayVal = currentPlace.hourlyWeekday[h] ?? 0;
        const weekendVal = currentPlace.hourlyWeekend[h] ?? 0;
        const hourStr =
          h === 0 ? '12 AM' : h < 12 ? `${h} AM` : h === 12 ? '12 PM' : `${h - 12} PM`;

        return {
          hour: h,
          hourLabel: hourStr,
          weekday: weekdayVal,
          weekend: weekendVal,
        };
      })
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 pb-16">
      {/* Sample data banner */}
      <SampleDataBanner />

      {/* Header and Place Selector */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 md:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 text-xs text-slate-500">
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                Crowd Density Analytics
              </span>
              <span aria-hidden="true">·</span>
              <DataTag type="Historical" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Crowd Trends &amp; Weekly Heatmaps
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Analyze historical cyclical density patterns across all 7 days and 24 hourly intervals.
            </p>
          </div>

          {/* Place Selector Dropdown */}
          <div className="w-full md:w-80">
            <label htmlFor="place-selector" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Select Destination
            </label>
            <div className="relative">
              <Layers className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                id="place-selector"
                value={selectedPlaceId}
                onChange={(e) => handlePlaceChange(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              >
                {places.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.city})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Place metadata bar */}
        {currentPlace && (
          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {currentPlace.category}
              </span>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
              <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {currentPlace.city}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500">Typical Index Baseline:</span>
              <CrowdBadge
                index={currentPlace.typicalCrowdIndex}
                level={currentPlace.typicalCrowdLevel}
                size="sm"
              />
            </div>
          </div>
        )}
      </div>

      {loading ? (
        <LoadingSkeleton type="chart" count={2} />
      ) : heatmapData ? (
        <div className="space-y-8">
          {/* Weekly Heatmap Grid (7 days x 24 hours) */}
          <HeatmapGrid
            matrix={heatmapData.matrix}
            placeName={heatmapData.placeName}
          />

          {/* Comparative Weekday vs Weekend Hourly Curve */}
          <div className="p-5 md:p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Weekday vs Weekend Hourly Comparison
                  </h3>
                  <DataTag type="Historical" />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Visualizes the weekend rush vs weekday commuter/visitor cadence on a 0-100 index scale.
                </p>
              </div>

              {/* Day filter tabs */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setComparisonDay('both')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    comparisonDay === 'both'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Both Curves
                </button>
                <button
                  type="button"
                  onClick={() => setComparisonDay('weekday')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    comparisonDay === 'weekday'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Weekday
                </button>
                <button
                  type="button"
                  onClick={() => setComparisonDay('weekend')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    comparisonDay === 'weekend'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Weekend
                </button>
              </div>
            </div>

            {/* Line chart */}
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={comparativeHourlyData}
                  margin={{ top: 12, right: 12, left: -24, bottom: 4 }}
                >
                  <XAxis
                    dataKey="hourLabel"
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
                  <Tooltip
                    content={({ active, payload, label }: any) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-slate-900 text-white text-xs rounded-xl p-3 shadow-xl border border-slate-800">
                            <div className="font-bold text-slate-200">{label}</div>
                            {payload.map((p: any) => (
                              <div key={p.name} className="flex items-center gap-2 mt-1">
                                <span
                                  className="w-2.5 h-2.5 rounded-full"
                                  style={{ backgroundColor: p.color }}
                                />
                                <span className="text-slate-300 capitalize">{p.name}:</span>
                                <span className="font-mono tabular-nums font-bold">
                                  {p.value}/100
                                </span>
                              </div>
                            ))}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <ReferenceLine y={40} stroke="#F59E0B" strokeDasharray="3 3" opacity={0.4} />
                  <ReferenceLine y={70} stroke="#EF4444" strokeDasharray="3 3" opacity={0.4} />

                  {(comparisonDay === 'both' || comparisonDay === 'weekday') && (
                    <Line
                      type="monotone"
                      dataKey="weekday"
                      name="Weekday Index"
                      stroke="#4F46E5" // Indigo
                      strokeWidth={2.5}
                      dot={false}
                      activeDot={{ r: 5 }}
                    />
                  )}
                  {(comparisonDay === 'both' || comparisonDay === 'weekend') && (
                    <Line
                      type="monotone"
                      dataKey="weekend"
                      name="Weekend Index"
                      stroke="#EF4444" // Crimson
                      strokeWidth={2.5}
                      dot={false}
                      activeDot={{ r: 5 }}
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
