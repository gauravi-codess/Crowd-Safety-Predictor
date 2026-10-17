/**
 * API Service Layer for Crowd & Safety Predictor
 *
 * All frontend components consume data exclusively through these exported functions.
 * To connect to a live Node.js/Express + MySQL backend later:
 * 1. Import axios from 'axios'
 * 2. Configure baseURL: const client = axios.create({ baseURL: process.env.VITE_API_URL || '/api' })
 * 3. Replace the mock body of each function with client.get(...) or client.post(...)
 *
 * Components will remain 100% unchanged!
 */

import { MOCK_PLACES } from '../data/mockData.js';
import { getCrowdLevel, CROWD_THRESHOLDS } from '../config/thresholds.js';

// Simulated network latency (in ms) to mirror real-world async API behavior
const SIMULATED_LATENCY_MS = 180;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fetch list of places with optional search, category, and city filters.
 *
 * Backend Replacement Example:
 * return (await client.get('/places', { params: { search, category, city } })).data;
 */
export async function getPlaces({ search = '', category = '', city = '' } = {}) {
  await delay(SIMULATED_LATENCY_MS);

  let results = [...MOCK_PLACES];

  if (category && category !== 'All') {
    results = results.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  if (city && city !== 'All') {
    results = results.filter((p) => p.city.toLowerCase() === city.toLowerCase());
  }

  if (search && search.trim() !== '') {
    const q = search.toLowerCase().trim();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  return results;
}

/**
 * Fetch a single place by ID.
 *
 * Backend Replacement Example:
 * return (await client.get(`/places/${placeId}`)).data;
 */
export async function getPlaceById(placeId) {
  await delay(SIMULATED_LATENCY_MS);
  const found = MOCK_PLACES.find((p) => p.id === placeId);
  return found || null;
}

/**
 * Format hour number (0-23) to human readable string (e.g. 14 -> "2:00 PM")
 */
export function formatHour(h) {
  const hour = Number(h) || 0;
  if (hour === 0) return '12:00 AM';
  if (hour < 12) return `${hour}:00 AM`;
  if (hour === 12) return '12:00 PM';
  return `${hour - 12}:00 PM`;
}

/**
 * Parse time string "14:00" or "2:00 PM" into integer 0-23
 */
export function parseHourFromTime(timeString) {
  if (!timeString) return 12; // default noon
  if (timeString.includes(':')) {
    const parts = timeString.split(':');
    let h = parseInt(parts[0], 10);
    const rest = parts[1].toLowerCase();
    if (rest.includes('pm') && h < 12) h += 12;
    if (rest.includes('am') && h === 12) h = 0;
    return isNaN(h) ? 12 : Math.max(0, Math.min(23, h));
  }
  const numeric = parseInt(timeString, 10);
  return isNaN(numeric) ? 12 : Math.max(0, Math.min(23, numeric));
}

/**
 * Check if a date string is a weekend
 */
export function isWeekend(dateString) {
  if (!dateString) return false;
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return false;
  const day = d.getDay();
  return day === 0 || day === 6; // Sunday or Saturday
}

/**
 * Predict crowd intensity and safety status for a place, date, and time.
 *
 * Backend Replacement Example:
 * return (await client.post('/predict', { placeId, date, time })).data;
 */
export async function predict(placeId, date, time) {
  await delay(SIMULATED_LATENCY_MS + 80);

  const place = MOCK_PLACES.find((p) => p.id === placeId) || MOCK_PLACES[0];
  const targetHour = parseHourFromTime(time);
  const weekend = isWeekend(date);

  // Baseline hourly curve from mock data
  const baseCurve = weekend ? place.hourlyWeekend : place.hourlyWeekday;
  const baseIndex = baseCurve[targetHour] ?? 50;

  // Add deterministic variance based on date string hash (to demonstrate day-to-day variance)
  const dateHash = (date || '2026-10-17')
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const variance = ((dateHash % 9) - 4); // -4 to +4
  const predictedIndex = Math.max(2, Math.min(99, baseIndex + variance));

  // Determine level from configurable thresholds
  const crowdLevelConfig = getCrowdLevel(predictedIndex);

  // Build full 24-hour comparative data array
  const hourlyData = baseCurve.map((val, h) => {
    const hourVal = Math.max(0, Math.min(100, val + Math.round(variance * 0.7)));
    const lvl = getCrowdLevel(hourVal);
    return {
      hour: h,
      displayHour: formatHour(h),
      shortHour: h === 0 ? '12A' : h < 12 ? `${h}A` : h === 12 ? '12P' : `${h - 12}P`,
      index: hourVal,
      level: lvl.key,
      levelLabel: lvl.label,
      hex: lvl.hex,
      isSelected: h === targetHour,
    };
  });

  // Calculate busiest period (highest 3-hour sliding window between 8 AM and 10 PM)
  let maxWindowSum = -1;
  let maxWindowStart = 16;
  for (let i = 8; i <= 20; i++) {
    const sum = (hourlyData[i]?.index || 0) + (hourlyData[i + 1]?.index || 0) + (hourlyData[i + 2]?.index || 0);
    if (sum > maxWindowSum) {
      maxWindowSum = sum;
      maxWindowStart = i;
    }
  }
  const busiestAvg = Math.round(maxWindowSum / 3);
  const busiestPeriod = `${formatHour(maxWindowStart)} - ${formatHour(maxWindowStart + 3)} (Avg index: ${busiestAvg})`;

  // Calculate quietest operational period (lowest 3-hour sliding window between 7 AM and 9 PM)
  let minWindowSum = 999;
  let minWindowStart = 8;
  for (let i = 7; i <= 19; i++) {
    const sum = (hourlyData[i]?.index || 0) + (hourlyData[i + 1]?.index || 0) + (hourlyData[i + 2]?.index || 0);
    if (sum < minWindowSum) {
      minWindowSum = sum;
      minWindowStart = i;
    }
  }
  const quietestAvg = Math.round(minWindowSum / 3);
  const quietestPeriod = `${formatHour(minWindowStart)} - ${formatHour(minWindowStart + 3)} (Avg index: ${quietestAvg})`;

  // Confidence calculation
  let confidence = 'High';
  if (place.category === 'Public Event') {
    confidence = 'Medium'; // Event schedules have variable turnout
  } else if (place.waitingTime === null) {
    confidence = 'Medium';
  }

  // Explanation rationale
  let explanation = '';
  if (weekend) {
    explanation = `High historical weekend turnout observed for ${place.category.toLowerCase()}s in ${place.city}. Peak arrival velocity clusters between ${formatHour(maxWindowStart)} and ${formatHour(maxWindowStart + 2)}.`;
  } else {
    explanation = `Typical weekday cadence for ${place.name}. Entry flow remains moderate with steady transit and visitor patterns during normal daytime hours.`;
  }

  // "Better time to visit" recommendation (if level is RED or safety status is Caution/Alert)
  let betterTime = null;
  const isHighCrowd = crowdLevelConfig.key === 'high';
  const hasSafetyNotice = place.safetyStatus === 'caution' || place.safetyStatus === 'alert';

  if (isHighCrowd || hasSafetyNotice) {
    // Find slot with index < 40 in daytime (7 AM - 6 PM)
    const quietHour = hourlyData.find((h) => h.hour >= 7 && h.hour <= 18 && h.index < 45);
    const suggestedHour = quietHour ? quietHour.hour : 8;
    const suggestedIndex = hourlyData[suggestedHour]?.index || 25;
    const diffPct = Math.max(15, Math.round(((predictedIndex - suggestedIndex) / predictedIndex) * 100));

    betterTime = {
      suggestedTime: formatHour(suggestedHour),
      suggestedDay: weekend ? 'Weekday Morning' : 'Earlier in the day',
      predictedIndex: suggestedIndex,
      reductionPercent: diffPct,
      reason: `Historical crowd index drops from ${predictedIndex} to ${suggestedIndex} (~${diffPct}% lower density). Allows quicker entry and better physical distancing.`,
    };
  }

  // Alternative places recommendations (same or nearby category, lower crowd index or clear safety)
  const otherPlaces = MOCK_PLACES.filter((p) => p.id !== place.id);
  const categoryMatches = otherPlaces.filter((p) => p.category === place.category);
  const candidatePool = categoryMatches.length >= 2 ? categoryMatches : otherPlaces;

  const alternatives = candidatePool.slice(0, 3).map((alt) => {
    const altCurve = weekend ? alt.hourlyWeekend : alt.hourlyWeekday;
    const altIndex = Math.max(5, Math.min(95, altCurve[targetHour] + (variance % 3)));
    const altLevel = getCrowdLevel(altIndex);
    const noticeCount = alt.notices?.length || 0;

    let reason = '';
    if (altIndex < predictedIndex) {
      reason = `Predicted index ${altIndex} vs ${predictedIndex} (${predictedIndex - altIndex} pts lower) · ${noticeCount === 0 ? 'No active advisories' : `${noticeCount} advisory active`}`;
    } else {
      reason = `Alternative ${alt.category.toLowerCase()} in ${alt.city} · ${alt.waitingTime ? `Wait time: ${alt.waitingTime}` : 'Open entry'}`;
    }

    return {
      id: alt.id,
      name: alt.name,
      category: alt.category,
      city: alt.city,
      image: alt.image,
      predictedIndex: altIndex,
      predictedLevel: altLevel.key,
      predictedLevelLabel: altLevel.label,
      safetyStatus: alt.safetyStatus,
      waitingTime: alt.waitingTime,
      reason,
    };
  });

  return {
    placeId: place.id,
    placeName: place.name,
    category: place.category,
    city: place.city,
    description: place.description,
    image: place.image,
    date: date || new Date().toISOString().split('T')[0],
    time: formatHour(targetHour),
    targetHour,
    isWeekend: weekend,
    index: predictedIndex,
    level: crowdLevelConfig.key,
    levelConfig: crowdLevelConfig,
    confidence,
    explanation,
    waitingTime: place.waitingTime,
    safetyStatus: place.safetyStatus,
    emergencyContacts: place.emergencyContacts,
    accessibilityInfo: place.accessibilityInfo,
    verifiedIncidents: place.verifiedIncidents,
    notices: place.notices,
    hourlyData,
    busiestPeriod,
    quietestPeriod,
    betterTime,
    alternatives,
  };
}

/**
 * Fetch all safety notices aggregated across places with optional filters.
 *
 * Backend Replacement Example:
 * return (await client.get('/safety/notices', { params: { placeId, type, severity } })).data;
 */
export async function getAllNotices({ placeId = '', type = '', severity = '' } = {}) {
  await delay(SIMULATED_LATENCY_MS);

  let noticesList = [];
  MOCK_PLACES.forEach((p) => {
    p.notices.forEach((n) => {
      noticesList.push({
        ...n,
        placeId: p.id,
        placeName: p.name,
        category: p.category,
        city: p.city,
        placeSafetyStatus: p.safetyStatus,
        emergencyContacts: p.emergencyContacts,
        accessibilityInfo: p.accessibilityInfo,
        verifiedIncidents: p.verifiedIncidents,
      });
    });
  });

  if (placeId && placeId !== 'All') {
    noticesList = noticesList.filter((n) => n.placeId === placeId);
  }
  if (type && type !== 'All') {
    noticesList = noticesList.filter((n) => n.type.toLowerCase() === type.toLowerCase());
  }
  if (severity && severity !== 'All') {
    noticesList = noticesList.filter((n) => n.severity.toLowerCase() === severity.toLowerCase());
  }

  // Sort by severity (high first) then date desc
  const severityScore = { high: 3, medium: 2, low: 1 };
  noticesList.sort((a, b) => {
    const diff = (severityScore[b.severity] || 0) - (severityScore[a.severity] || 0);
    if (diff !== 0) return diff;
    return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
  });

  return noticesList;
}

/**
 * Fetch weekly 7-day x 24-hour crowd intensity heatmap for a place.
 *
 * Backend Replacement Example:
 * return (await client.get(`/trends/heatmap/${placeId}`)).data;
 */
export async function getWeeklyHeatmap(placeId) {
  await delay(SIMULATED_LATENCY_MS);

  const place = MOCK_PLACES.find((p) => p.id === placeId) || MOCK_PLACES[0];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const matrix = days.map((dayName, dayIndex) => {
    const isWeekendDay = dayIndex >= 5;
    const baseArray = isWeekendDay ? place.hourlyWeekend : place.hourlyWeekday;
    // Add small day-specific deterministic bias
    const dayBias = dayIndex === 4 ? 4 : dayIndex === 0 ? -3 : 0; // Friday slightly busier, Monday slightly calmer

    const hours = baseArray.map((val, h) => {
      const computedIndex = Math.max(0, Math.min(100, val + dayBias));
      const lvl = getCrowdLevel(computedIndex);
      return {
        hour: h,
        displayHour: formatHour(h),
        index: computedIndex,
        level: lvl.key,
        hex: lvl.hex,
      };
    });

    return {
      day: dayName,
      isWeekend: isWeekendDay,
      hours,
    };
  });

  return {
    placeId: place.id,
    placeName: place.name,
    category: place.category,
    city: place.city,
    typicalCrowdLevel: place.typicalCrowdLevel,
    typicalCrowdIndex: place.typicalCrowdIndex,
    matrix,
  };
}

/**
 * Helper to fetch all unique cities from mock places
 */
export async function getCities() {
  const cities = Array.from(new Set(MOCK_PLACES.map((p) => p.city))).sort();
  return ['All', ...cities];
}

/**
 * Helper to fetch all unique categories
 */
export async function getCategories() {
  const categories = Array.from(new Set(MOCK_PLACES.map((p) => p.category))).sort();
  return ['All', ...categories];
}
