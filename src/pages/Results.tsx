import React, { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { predict, formatHour } from '../services/api.js';
import { CrowdGauge } from '../components/CrowdGauge.tsx';
import { CrowdBadge } from '../components/CrowdBadge.tsx';
import { HourlyChart } from '../components/HourlyChart.tsx';
import { SafetyStatusCard } from '../components/SafetyStatusCard.tsx';
import { RecommendationCard } from '../components/RecommendationCard.tsx';
import { AlternativePlaceCard } from '../components/AlternativePlaceCard.tsx';
import { SampleDataBanner } from '../components/SampleDataBanner.tsx';
import { DisclaimerBox } from '../components/DisclaimerBox.tsx';
import { DataTag } from '../components/DataTag.tsx';
import { LoadingSkeleton } from '../components/LoadingSkeleton.tsx';
import { SearchForm } from '../components/SearchForm.tsx';
import {
  MapPin,
  Calendar,
  Clock,
  Clock4,
  Flame,
  Feather,
  Info,
  ChevronDown,
  ChevronUp,
  Share2,
  Check,
  TrendingUp,
} from 'lucide-react';

export const Results: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const placeId = searchParams.get('placeId') || 'victoria-memorial';
  const dateParam = searchParams.get('date') || new Date().toISOString().split('T')[0];
  const timeParam = searchParams.get('time') || '14:00';

  const [loading, setLoading] = useState(true);
  const [prediction, setPrediction] = useState<any>(null);
  const [showEditSearch, setShowEditSearch] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    predict(placeId, dateParam, timeParam)
      .then((res) => {
        if (isMounted) {
          setPrediction(res);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Prediction failed:', err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [placeId, dateParam, timeParam]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleHourSelect = (selectedHour: number) => {
    const formatted = `${String(selectedHour).padStart(2, '0')}:00`;
    const params = new URLSearchParams(searchParams);
    params.set('time', formatted);
    navigate(`/results?${params.toString()}`);
  };

  const handleApplyBetterTime = (suggestedTimeStr: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('time', suggestedTimeStr);
    navigate(`/results?${params.toString()}`);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <SampleDataBanner />
        <LoadingSkeleton type="results" />
      </div>
    );
  }

  if (!prediction) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Prediction data unavailable
        </h2>
        <p className="text-sm text-slate-500 mt-2">
          Unable to generate forecast for the requested parameters.
        </p>
        <Link
          to="/"
          className="mt-4 inline-block px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
        >
          Return to Search
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 pb-16">
      {/* Sample Data Notice Banner */}
      <SampleDataBanner />

      {/* Summary Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 md:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                {prediction.category}
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {prediction.city}
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {prediction.date} ({prediction.isWeekend ? 'Weekend' : 'Weekday'})
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {prediction.time}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {prediction.placeName}
            </h1>
          </div>

          {/* Quick Action buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setShowEditSearch(!showEditSearch)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <span>{showEditSearch ? 'Hide Search Controls' : 'Change Time / Place'}</span>
              {showEditSearch ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600">Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Collapsible search card for quick adjustments */}
        {showEditSearch && (
          <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-800">
            <SearchForm
              compact
              initialPlaceId={prediction.placeId}
              initialPlaceName={prediction.placeName}
              initialCategory={prediction.category}
              initialDate={prediction.date}
              initialTime={timeParam}
            />
          </div>
        )}
      </div>

      {/* Main Prediction & Gauge Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Gauge & Core Metrics */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Predicted Crowd Intensity
              </span>
              <DataTag type="Predicted" />
            </div>

            {/* Circular Gauge */}
            <div className="my-2">
              <CrowdGauge index={prediction.index} size={230} />
            </div>

            {/* Structured Stats Grid */}
            <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-xs">
              {/* Expected Wait Time */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 block mb-1">
                  Expected Wait Time
                </span>
                {prediction.waitingTime ? (
                  <span className="font-bold text-slate-900 dark:text-white font-mono text-sm">
                    {prediction.waitingTime}
                  </span>
                ) : (
                  <span className="font-semibold text-slate-400 dark:text-slate-500 italic text-xs">
                    Not enough data
                  </span>
                )}
              </div>

              {/* Confidence Label */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 block mb-1">
                  Prediction Confidence
                </span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400 text-sm">
                  {prediction.confidence} Confidence
                </span>
              </div>
            </div>

            {/* Real-time status disclosure */}
            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <span className="text-slate-400">Live Camera / Gate Sensor:</span>
              <DataTag type="Real-time" />
            </div>
          </div>
        </div>

        {/* Right Column: 24-Hour Comparative Chart */}
        <div className="lg:col-span-7">
          <HourlyChart
            data={prediction.hourlyData}
            selectedHour={prediction.targetHour}
            onSelectHour={handleHourSelect}
          />
        </div>
      </div>

      {/* Insights Row: Busiest/Quietest Periods & "Why This Prediction" */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Busiest Period */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                Peak Operating Period
              </span>
              <Flame className="w-4 h-4 text-rose-500" />
            </div>
            <div className="text-sm font-extrabold text-slate-900 dark:text-white font-mono">
              {prediction.busiestPeriod}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              Heaviest ingress velocity. Turnstiles and surrounding parking lots experience highest demand.
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
            <DataTag type="Historical" />
          </div>
        </div>

        {/* Card 2: Quietest Period */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Optimal Calm Window
              </span>
              <Feather className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-sm font-extrabold text-slate-900 dark:text-white font-mono">
              {prediction.quietestPeriod}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              Lowest recorded visitor density. Minimal waiting time and easiest transit connectivity.
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
            <DataTag type="Historical" />
          </div>
        </div>

        {/* Card 3: Why this prediction */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Why This Prediction?
              </span>
              <Info className="w-4 h-4 text-indigo-500" />
            </div>
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Historical Day-of-Week Modeling
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              {prediction.explanation}
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Calibrated with local capacity thresholds</span>
            <DataTag type="Predicted" />
          </div>
        </div>
      </div>

      {/* "Better Time to Visit" Recommendation Card (if level is RED or safety is Caution/Alert) */}
      {prediction.betterTime && (
        <RecommendationCard
          recommendation={prediction.betterTime}
          onApplyRecommendation={handleApplyBetterTime}
        />
      )}

      {/* Safety Status Card */}
      <SafetyStatusCard
        status={prediction.safetyStatus}
        notices={prediction.notices}
        emergencyContacts={prediction.emergencyContacts}
        accessibilityInfo={prediction.accessibilityInfo}
        verifiedIncidents={prediction.verifiedIncidents}
        placeName={prediction.placeName}
      />

      {/* Alternative Places List */}
      {prediction.alternatives && prediction.alternatives.length > 0 && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                Recommended Alternative Destinations
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Nearby places in similar categories offering lower crowd density or clearer safety status.
              </p>
            </div>
            <DataTag type="Predicted" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {prediction.alternatives.map((alt: any) => (
              <AlternativePlaceCard
                key={alt.id}
                place={alt}
                date={prediction.date}
                time={timeParam}
              />
            ))}
          </div>
        </div>
      )}

      {/* Prominent Disclaimer Box */}
      <DisclaimerBox />
    </div>
  );
};
