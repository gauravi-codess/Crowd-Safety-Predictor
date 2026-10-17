import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAllNotices, getPlaces } from '../services/api.js';
import { SafetyNoticeItem, SafetyNotice } from '../components/SafetyNoticeItem.tsx';
import { SafetyStatusCard } from '../components/SafetyStatusCard.tsx';
import { SampleDataBanner } from '../components/SampleDataBanner.tsx';
import { DataTag } from '../components/DataTag.tsx';
import { EmptyState } from '../components/EmptyState.tsx';
import { LoadingSkeleton } from '../components/LoadingSkeleton.tsx';
import { SAFETY_STATUS_CONFIG } from '../config/thresholds.js';
import { Shield, AlertTriangle, AlertCircle, Phone, Filter, X, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const Safety: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [notices, setNotices] = useState<any[]>([]);
  const [places, setPlaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlaceForPanel, setSelectedPlaceForPanel] = useState<any>(null);

  // Filter params
  const placeFilter = searchParams.get('placeId') || 'All';
  const typeFilter = searchParams.get('type') || 'All';
  const severityFilter = searchParams.get('severity') || 'All';

  useEffect(() => {
    let isMounted = true;
    getPlaces().then((res) => {
      if (isMounted) {
        setPlaces(res);
        if (res.length > 0) setSelectedPlaceForPanel(res[0]);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    getAllNotices({
      placeId: placeFilter === 'All' ? '' : placeFilter,
      type: typeFilter === 'All' ? '' : typeFilter,
      severity: severityFilter === 'All' ? '' : severityFilter,
    }).then((res) => {
      if (isMounted) {
        setNotices(res);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [placeFilter, typeFilter, severityFilter]);

  const updateFilter = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (!value || value === 'All') {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    setSearchParams(next);
  };

  const handleResetFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  const hasActiveFilters =
    placeFilter !== 'All' || typeFilter !== 'All' || severityFilter !== 'All';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 pb-16">
      {/* Sample data banner */}
      <SampleDataBanner />

      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 mb-1 text-xs text-slate-500">
          <span className="font-semibold text-indigo-600 dark:text-indigo-400">
            Public Safety Intelligence
          </span>
          <span aria-hidden="true">·</span>
          <DataTag type="Historical" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Safety Notices &amp; Facility Advisories
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
          Aggregated and verified safety notices, crowd restrictions, maintenance advisories, and emergency protocols across all monitored destinations.
        </p>
      </div>

      {/* Status Legend Reference Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.values(SAFETY_STATUS_CONFIG).map((cfg) => (
          <div
            key={cfg.key}
            className={`p-4 rounded-xl border ${cfg.bgLight} ${cfg.borderLight} flex flex-col justify-between`}
          >
            <div>
              <span className={`text-[11px] font-bold uppercase tracking-wider ${cfg.textLight}`}>
                {cfg.shortLabel}
              </span>
              <p className={`text-xs font-semibold ${cfg.textLight} mt-1 leading-snug`}>
                {cfg.label}
              </p>
            </div>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-3 block">
              Official status standard
            </span>
          </div>
        ))}
      </div>

      {/* Notice Filter Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
            <Filter className="w-4 h-4 text-indigo-600" />
            <span>Filter Safety Notices</span>
          </div>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 transition-colors"
            >
              Reset filters
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Destination Filter */}
          <div>
            <label htmlFor="filter-place" className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
              Destination
            </label>
            <select
              id="filter-place"
              value={placeFilter}
              onChange={(e) => updateFilter('placeId', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
            >
              <option value="All">All Places</option>
              {places.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <label htmlFor="filter-type" className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
              Notice Type
            </label>
            <select
              id="filter-type"
              value={typeFilter}
              onChange={(e) => updateFilter('type', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
            >
              <option value="All">All Types</option>
              <option value="advisory">Advisory</option>
              <option value="restriction">Restriction</option>
              <option value="incident">Incident</option>
              <option value="notice">Notice</option>
            </select>
          </div>

          {/* Severity Filter */}
          <div>
            <label htmlFor="filter-severity" className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
              Severity Level
            </label>
            <select
              id="filter-severity"
              value={severityFilter}
              onChange={(e) => updateFilter('severity', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
            >
              <option value="All">All Severities</option>
              <option value="high">High Severity</option>
              <option value="medium">Medium Severity</option>
              <option value="low">Low Severity</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Notice List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Active Notice Feed ({notices.length})
          </h2>
          <DataTag type="Historical" />
        </div>

        {loading ? (
          <LoadingSkeleton type="list" count={4} />
        ) : notices.length === 0 ? (
          <EmptyState
            title="No notices found matching filters"
            description="There are no active advisories or restrictions matching your chosen filter parameters."
            actionText="Clear Notice Filters"
            onAction={handleResetFilters}
          />
        ) : (
          <div className="space-y-3">
            {notices.map((n) => (
              <SafetyNoticeItem
                key={`${n.placeId}-${n.id}`}
                notice={n}
                showPlaceName
              />
            ))}
          </div>
        )}
      </div>

      {/* Per-Place Deep Safety Directory Panel */}
      <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Per-Place Emergency &amp; Accessibility Directory
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Select any place below to inspect its on-site emergency dispatch lines, verified incident history, and entry guidelines.
            </p>
          </div>

          <div className="w-full sm:w-72">
            <select
              value={selectedPlaceForPanel?.id || ''}
              onChange={(e) => {
                const found = places.find((p) => p.id === e.target.value);
                if (found) setSelectedPlaceForPanel(found);
              }}
              className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
            >
              {places.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {selectedPlaceForPanel && (
          <SafetyStatusCard
            status={selectedPlaceForPanel.safetyStatus}
            notices={selectedPlaceForPanel.notices}
            emergencyContacts={selectedPlaceForPanel.emergencyContacts}
            accessibilityInfo={selectedPlaceForPanel.accessibilityInfo}
            verifiedIncidents={selectedPlaceForPanel.verifiedIncidents}
            placeName={selectedPlaceForPanel.name}
          />
        )}
      </div>
    </div>
  );
};
