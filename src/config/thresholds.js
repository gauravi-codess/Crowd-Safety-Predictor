/**
 * Threshold configuration for crowd index levels (0 - 100 scale).
 * Crowd intensity is an INDEX from 0 to 100, not a visitor count.
 */

export const CROWD_THRESHOLDS = {
  LOW: {
    min: 0,
    max: 39,
    key: 'low',
    label: 'Low Crowd',
    shortLabel: 'Low',
    hex: '#22C55E', // Green
    bgLight: 'bg-emerald-50 dark:bg-emerald-950/30',
    textLight: 'text-emerald-700 dark:text-emerald-300',
    borderLight: 'border-emerald-200 dark:border-emerald-800',
    dotBg: 'bg-emerald-500',
    gaugeColor: '#22C55E',
    description: 'Minimal wait times and ample personal space expected.',
  },
  MODERATE: {
    min: 40,
    max: 69,
    key: 'moderate',
    label: 'Moderate Crowd',
    shortLabel: 'Moderate',
    hex: '#F59E0B', // Amber / Yellow
    bgLight: 'bg-amber-50 dark:bg-amber-950/30',
    textLight: 'text-amber-800 dark:text-amber-300',
    borderLight: 'border-amber-200 dark:border-amber-800',
    dotBg: 'bg-amber-500',
    gaugeColor: '#F59E0B',
    description: 'Steady visitor flow with typical entry delays.',
  },
  HIGH: {
    min: 70,
    max: 100,
    key: 'high',
    label: 'High Crowd',
    shortLabel: 'High',
    hex: '#EF4444', // Red
    bgLight: 'bg-rose-50 dark:bg-rose-950/30',
    textLight: 'text-rose-700 dark:text-rose-300',
    borderLight: 'border-rose-200 dark:border-rose-800',
    dotBg: 'bg-rose-500',
    gaugeColor: '#EF4444',
    description: 'Dense crowding, extended queues, and peak congestion anticipated.',
  },
};

/**
 * Determine crowd level configuration based on a 0-100 crowd index.
 * @param {number} index
 * @returns {typeof CROWD_THRESHOLDS.LOW}
 */
export function getCrowdLevel(index) {
  const numericIndex = Math.max(0, Math.min(100, Math.round(Number(index) || 0)));

  if (numericIndex <= CROWD_THRESHOLDS.LOW.max) {
    return { ...CROWD_THRESHOLDS.LOW, index: numericIndex };
  }
  if (numericIndex <= CROWD_THRESHOLDS.MODERATE.max) {
    return { ...CROWD_THRESHOLDS.MODERATE, index: numericIndex };
  }
  return { ...CROWD_THRESHOLDS.HIGH, index: numericIndex };
}

/**
 * Safety status definitions
 */
export const SAFETY_STATUS_CONFIG = {
  clear: {
    key: 'clear',
    label: 'No major alerts found in available sources',
    shortLabel: 'Clear',
    level: 'normal',
    hex: '#22C55E',
    bgLight: 'bg-emerald-50 dark:bg-emerald-950/30',
    textLight: 'text-emerald-700 dark:text-emerald-300',
    borderLight: 'border-emerald-200 dark:border-emerald-800',
  },
  caution: {
    key: 'caution',
    label: 'Caution: Safety advisory active',
    shortLabel: 'Caution',
    level: 'warning',
    hex: '#F59E0B',
    bgLight: 'bg-amber-50 dark:bg-amber-950/30',
    textLight: 'text-amber-800 dark:text-amber-300',
    borderLight: 'border-amber-200 dark:border-amber-800',
  },
  alert: {
    key: 'alert',
    label: 'Alert: Restriction or serious notice active',
    shortLabel: 'Alert',
    level: 'danger',
    hex: '#EF4444',
    bgLight: 'bg-rose-50 dark:bg-rose-950/30',
    textLight: 'text-rose-700 dark:text-rose-300',
    borderLight: 'border-rose-200 dark:border-rose-800',
  },
  none: {
    key: 'none',
    label: 'No safety data available',
    shortLabel: 'No Data',
    level: 'neutral',
    hex: '#64748B',
    bgLight: 'bg-slate-50 dark:bg-slate-900',
    textLight: 'text-slate-600 dark:text-slate-400',
    borderLight: 'border-slate-200 dark:border-slate-800',
  },
};

export const PLACE_CATEGORIES = [
  'Tourist Attraction',
  'Shopping Mall',
  'Temple',
  'Park',
  'Railway Station',
  'Public Event',
];

export const DISCLAIMER_TEXT =
  'Predictions are estimates and not a guarantee of safety.';
