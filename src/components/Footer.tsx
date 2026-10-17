import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, AlertTriangle } from 'lucide-react';
import { DISCLAIMER_TEXT } from '../config/thresholds.js';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Mandatory Honesty & Safety Disclaimer in Footer */}
        <div className="p-4 rounded-xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/60 mb-8 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900 dark:text-amber-200">
            <span className="font-bold">Important Notice: </span>
            {DISCLAIMER_TEXT} Crowd index readings reflect historical and statistical models for planning guidance. Real-time conditions may vary. In emergency scenarios, always obey on-site security personnel and municipal directives.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Brand & Mission */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                <Shield className="w-3.5 h-3.5" />
              </div>
              <span>Crowd &amp; Safety</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Plan Smart. Avoid Crowds. Stay Safer. Transparent crowd density intelligence and public safety advisories.
            </p>
            <div className="inline-block text-[11px] font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md">
              Frontend Prototype v1.0
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Home Predictor
                </Link>
              </li>
              <li>
                <Link to="/explore" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Explore Places
                </Link>
              </li>
              <li>
                <Link to="/trends" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Crowd Trends &amp; Heatmaps
                </Link>
              </li>
              <li>
                <Link to="/safety" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Safety Bulletins &amp; Notices
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Honesty & Standards */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Methodology
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  0-100 Index Scale
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Configurable Thresholds
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Sample Data Policy
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Data Limitations
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Prototype API notes */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              API Service Architecture
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
              Data is served via <code className="text-indigo-600 dark:text-indigo-400 font-mono text-[11px]">src/services/api.js</code> ready for plug-and-play Node.js / MySQL backend integration.
            </p>
            <div className="text-[11px] text-slate-400 dark:text-slate-500">
              No backend required for preview.
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-2">
          <div>
            &copy; {new Date().getFullYear()} Crowd &amp; Safety Predictor. Sample data – not verified real-world information.
          </div>
          <div>
            Built with React, Vite &amp; Recharts
          </div>
        </div>
      </div>
    </footer>
  );
};
