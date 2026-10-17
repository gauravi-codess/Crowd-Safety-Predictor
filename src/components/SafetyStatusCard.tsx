import React, { useState } from 'react';
import { SAFETY_STATUS_CONFIG } from '../config/thresholds.js';
import { ShieldCheck, AlertTriangle, AlertCircle, HelpCircle, Phone, Accessibility, CheckCircle2 } from 'lucide-react';
import { SafetyNoticeItem, SafetyNotice } from './SafetyNoticeItem.tsx';
import { DataTag } from './DataTag.tsx';

interface EmergencyContacts {
  police: string;
  ambulance: string;
  fire: string;
  localHelpDesk?: string;
}

interface AccessibilityInfo {
  wheelchairAccessible: boolean;
  rampsElevators: string;
  parking: string;
  entryNotes: string;
}

interface VerifiedIncident {
  id: string;
  date: string;
  type: string;
  summary: string;
  status: string;
}

interface SafetyStatusCardProps {
  status: 'clear' | 'caution' | 'alert' | 'none' | string;
  notices?: SafetyNotice[];
  emergencyContacts?: EmergencyContacts;
  accessibilityInfo?: AccessibilityInfo;
  verifiedIncidents?: VerifiedIncident[];
  placeName?: string;
  className?: string;
}

export const SafetyStatusCard: React.FC<SafetyStatusCardProps> = ({
  status = 'clear',
  notices = [],
  emergencyContacts,
  accessibilityInfo,
  verifiedIncidents = [],
  placeName,
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState<'notices' | 'emergency' | 'accessibility' | 'incidents'>('notices');
  const config = SAFETY_STATUS_CONFIG[status as keyof typeof SAFETY_STATUS_CONFIG] || SAFETY_STATUS_CONFIG.none;

  const StatusIcon =
    status === 'clear'
      ? ShieldCheck
      : status === 'caution'
      ? AlertTriangle
      : status === 'alert'
      ? AlertCircle
      : HelpCircle;

  return (
    <div className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 md:p-6 shadow-sm ${className}`}>
      {/* Top Banner Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Safety Information &amp; Status
            </h3>
            <DataTag type="Historical" />
          </div>
          {placeName && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Verified security guidelines and active advisories for {placeName}
            </p>
          )}
        </div>

        {/* Status indicator badge */}
        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold ${config.bgLight} ${config.textLight} ${config.borderLight}`}
        >
          <StatusIcon className="w-4 h-4 shrink-0" />
          <span>{config.label}</span>
        </div>
      </div>

      {/* Tabs / Segmented controls for deeper safety info */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 my-4 overflow-x-auto text-xs font-medium pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('notices')}
          className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'notices'
              ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 font-semibold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Active Notices ({notices.length})
        </button>
        {emergencyContacts && (
          <button
            type="button"
            onClick={() => setActiveTab('emergency')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'emergency'
                ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Emergency Contacts
          </button>
        )}
        {accessibilityInfo && (
          <button
            type="button"
            onClick={() => setActiveTab('accessibility')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'accessibility'
                ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Accessibility &amp; Entry
          </button>
        )}
        <button
          type="button"
          onClick={() => setActiveTab('incidents')}
          className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'incidents'
              ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 font-semibold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Verified Incidents ({verifiedIncidents.length})
        </button>
      </div>

      {/* Tab 1: Notices */}
      {activeTab === 'notices' && (
        <div className="space-y-3">
          {notices.length === 0 ? (
            <div className="text-center py-6 text-slate-500 dark:text-slate-400">
              <ShieldCheck className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              <p className="text-sm font-medium">No active restrictions or warning notices</p>
              <p className="text-xs text-slate-400 mt-0.5">
                Standard facility safety regulations apply.
              </p>
            </div>
          ) : (
            notices.map((n) => <SafetyNoticeItem key={n.id} notice={n} />)
          )}
        </div>
      )}

      {/* Tab 2: Emergency Contacts */}
      {activeTab === 'emergency' && emergencyContacts && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Local Police</span>
            <div className="text-sm font-bold font-mono text-slate-900 dark:text-white mt-1 flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-blue-500" />
              {emergencyContacts.police}
            </div>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Medical / Ambulance</span>
            <div className="text-sm font-bold font-mono text-slate-900 dark:text-white mt-1 flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-rose-500" />
              {emergencyContacts.ambulance}
            </div>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Fire Brigade</span>
            <div className="text-sm font-bold font-mono text-slate-900 dark:text-white mt-1 flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              {emergencyContacts.fire}
            </div>
          </div>
          {emergencyContacts.localHelpDesk && (
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Venue Help Desk</span>
              <div className="text-sm font-bold font-mono text-slate-900 dark:text-white mt-1 flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-500" />
                {emergencyContacts.localHelpDesk}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Accessibility */}
      {activeTab === 'accessibility' && accessibilityInfo && (
        <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
            <Accessibility className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span>
              Wheelchair Access:{' '}
              <strong className="font-semibold text-slate-900 dark:text-white">
                {accessibilityInfo.wheelchairAccessible ? 'Accessible routes available' : 'Limited / Special assistance required'}
              </strong>
            </span>
          </div>
          <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="font-semibold text-slate-800 dark:text-slate-200">Ramps &amp; Elevators: </span>
            {accessibilityInfo.rampsElevators}
          </div>
          <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="font-semibold text-slate-800 dark:text-slate-200">Parking &amp; Arrival: </span>
            {accessibilityInfo.parking}
          </div>
          <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="font-semibold text-slate-800 dark:text-slate-200">Entry &amp; Security: </span>
            {accessibilityInfo.entryNotes}
          </div>
        </div>
      )}

      {/* Tab 4: Verified Incidents */}
      {activeTab === 'incidents' && (
        <div className="space-y-2.5">
          {verifiedIncidents.length === 0 ? (
            <div className="text-center py-6 text-slate-500 dark:text-slate-400">
              <CheckCircle2 className="w-7 h-7 text-emerald-500 mx-auto mb-1.5" />
              <p className="text-sm font-medium">No verified safety incidents recorded</p>
              <p className="text-xs text-slate-400">All recent operational checks logged normal.</p>
            </div>
          ) : (
            verifiedIncidents.map((inc) => (
              <div
                key={inc.id}
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-xs"
              >
                <div className="flex items-center justify-between font-medium">
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {inc.type}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{inc.status}</span>
                    <span className="text-slate-400 font-mono">{inc.date}</span>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-300 mt-1">{inc.summary}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
