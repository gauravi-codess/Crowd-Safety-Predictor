import React from 'react';
import { CROWD_THRESHOLDS, DISCLAIMER_TEXT } from '../config/thresholds.js';
import { SampleDataBanner } from '../components/SampleDataBanner.tsx';
import { DisclaimerBox } from '../components/DisclaimerBox.tsx';
import { DataTag } from '../components/DataTag.tsx';
import { ShieldCheck, Scale, AlertTriangle, Database, Info, Layers } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 pb-20">
      {/* Sample data banner */}
      <SampleDataBanner />

      {/* Main Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
          <Scale className="w-3.5 h-3.5" />
          <span>Transparency &amp; Methodology</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          About Crowd &amp; Safety Predictor
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Crowd &amp; Safety Predictor was built to empower everyday citizens, travelers, families, and students to plan smarter journeys, avoid peak physical congestion, and make safety-informed choices before stepping out.
        </p>
      </div>

      {/* Prediction Mechanism & Index Scale */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-600" />
          <span>How the 0–100 Crowd Intensity Index Works</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Unlike raw visitor counters which vary wildly by venue acreage, the <strong>Crowd Intensity Index</strong> normalizes density onto a universal <strong>0 to 100</strong> scale. It represents relative venue throughput pressure against effective capacity.
        </p>

        {/* Configurable Thresholds Table */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400">
                <th className="py-3 px-4 font-bold">Level</th>
                <th className="py-3 px-4 font-bold">Index Range</th>
                <th className="py-3 px-4 font-bold">Hex Color</th>
                <th className="py-3 px-4 font-bold">User Experience &amp; Delay Guidance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                <td className="py-3 px-4 flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold">
                  <span className="w-3 h-3 rounded-full bg-[#22C55E]" />
                  <span>Low Crowd</span>
                </td>
                <td className="py-3 px-4 font-mono font-bold">
                  {CROWD_THRESHOLDS.LOW.min} – {CROWD_THRESHOLDS.LOW.max}
                </td>
                <td className="py-3 px-4 font-mono text-slate-500">#22C55E</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                  Minimal queuing; open walkways; unrestricted movement.
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                <td className="py-3 px-4 flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold">
                  <span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                  <span>Moderate Crowd</span>
                </td>
                <td className="py-3 px-4 font-mono font-bold">
                  {CROWD_THRESHOLDS.MODERATE.min} – {CROWD_THRESHOLDS.MODERATE.max}
                </td>
                <td className="py-3 px-4 font-mono text-slate-500">#F59E0B</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                  Steady foot traffic; standard ticket holding intervals; expect 10-25 min waits.
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                <td className="py-3 px-4 flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold">
                  <span className="w-3 h-3 rounded-full bg-[#EF4444]" />
                  <span>High Crowd</span>
                </td>
                <td className="py-3 px-4 font-mono font-bold">
                  {CROWD_THRESHOLDS.HIGH.min} – {CROWD_THRESHOLDS.HIGH.max}
                </td>
                <td className="py-3 px-4 font-mono text-slate-500">#EF4444</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                  Peak physical congestion; long queues; automated detour recommendations triggered.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Honesty Rules & Data Limitations */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Database className="w-5 h-5 text-indigo-600" />
          <span>Core Honesty Principles &amp; Data Limitations</span>
        </h2>

        <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-start gap-3">
            <span className="font-bold text-slate-900 dark:text-white shrink-0">1. Data Labeling:</span>
            <span>
              Every visual block explicitly indicates whether it represents <DataTag type="Historical" className="mx-1" /> or <DataTag type="Predicted" className="mx-1" /> models.
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-start gap-3">
            <span className="font-bold text-slate-900 dark:text-white shrink-0">2. No Fake Real-Time Feeds:</span>
            <span>
              Live gate feeds are marked as <em>"Real-time data not available"</em>. We never synthesize fraudulent live camera counters.
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-start gap-3">
            <span className="font-bold text-slate-900 dark:text-white shrink-0">3. Honest Omissions:</span>
            <span>
              If a venue does not track entrance queuing, we display <em>"Not enough data"</em> rather than inventing false waiting estimates.
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-start gap-3">
            <span className="font-bold text-slate-900 dark:text-white shrink-0">4. Sample Data Context:</span>
            <span>
              This installation operates on mock prototype datasets located in <code className="font-mono text-indigo-600 dark:text-indigo-400">src/data/mockData.js</code> accessed through <code className="font-mono text-indigo-600 dark:text-indigo-400">src/services/api.js</code>.
            </span>
          </div>
        </div>
      </section>

      {/* Safety Disclaimer */}
      <DisclaimerBox />
    </div>
  );
};
