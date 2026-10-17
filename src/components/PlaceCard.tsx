import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CrowdBadge } from './CrowdBadge.tsx';
import { useAuth } from '../context/AuthContext.tsx';
import { Heart, MapPin, ArrowRight, ShieldCheck, AlertTriangle, AlertCircle } from 'lucide-react';
import { SAFETY_STATUS_CONFIG } from '../config/thresholds.js';
import { DataTag } from './DataTag.tsx';

export interface Place {
  id: string;
  name: string;
  category: string;
  city: string;
  description: string;
  image?: string;
  waitingTime?: string | null;
  typicalCrowdIndex: number;
  typicalCrowdLevel: string;
  safetyStatus: string;
  notices?: any[];
}

interface PlaceCardProps {
  place: Place;
  className?: string;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({ place, className = '' }) => {
  const { isLoggedIn, isFavorite, toggleFavorite } = useAuth();
  const [imageError, setImageError] = useState(false);
  const favorited = isFavorite(place.id);
  const safetyConf = SAFETY_STATUS_CONFIG[place.safetyStatus as keyof typeof SAFETY_STATUS_CONFIG] || SAFETY_STATUS_CONFIG.none;

  return (
    <article
      className={`group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-md transition-all flex flex-col justify-between ${className}`}
    >
      <div>
        {/* Place visual header */}
        <div className="relative h-44 sm:h-48 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          {!imageError && place.image ? (
            <img
              src={place.image}
              alt={place.name}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-tr from-slate-200 via-slate-100 to-indigo-50 dark:from-slate-800 dark:via-slate-850 dark:to-indigo-950/40 text-slate-500">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {place.category}
              </span>
              <span className="text-sm font-bold text-slate-700 dark:text-slate-300 mt-1 text-center">
                {place.name}
              </span>
            </div>
          )}

          {/* Scrim for contrast overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

          {/* Top floating indicators */}
          <div className="absolute top-3 inset-x-3 flex items-center justify-between">
            <span className="text-[11px] font-semibold text-white/95 px-2 py-0.5 rounded bg-black/50 backdrop-blur-md">
              {place.category}
            </span>

            {/* Favorite button (visible if logged in, or tooltip prompt) */}
            {isLoggedIn ? (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleFavorite(place.id);
                }}
                aria-label={favorited ? 'Remove from favorites' : 'Save to favorites'}
                className={`p-2 rounded-full backdrop-blur-md transition-all ${
                  favorited
                    ? 'bg-rose-500 text-white shadow-md scale-105'
                    : 'bg-black/40 hover:bg-black/60 text-white'
                }`}
              >
                <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
              </button>
            ) : (
              <span
                title="Log in to save favorites"
                className="p-2 rounded-full bg-black/30 backdrop-blur-md text-white/60 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Heart className="w-4 h-4" />
              </span>
            )}
          </div>

          {/* Bottom title in media frame */}
          <div className="absolute bottom-3 inset-x-3 text-white">
            <div className="flex items-center gap-1 text-[11px] text-white/80 font-medium">
              <MapPin className="w-3 h-3 text-white/90" />
              <span>{place.city}</span>
              <span aria-hidden="true">·</span>
              <span className="text-white/70">Typical: {place.typicalCrowdLevel}</span>
            </div>
            <h3 className="text-base font-bold text-white tracking-tight leading-snug drop-shadow-xs line-clamp-1">
              {place.name}
            </h3>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5">
          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
            {place.description}
          </p>

          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            {/* Typical Crowd */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400">Typical Crowd:</span>
              <CrowdBadge
                index={place.typicalCrowdIndex}
                level={place.typicalCrowdLevel}
                size="sm"
              />
            </div>

            {/* Waiting Time */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400">Expected Wait:</span>
              {place.waitingTime ? (
                <span className="font-mono tabular-nums text-slate-800 dark:text-slate-200 font-medium">
                  {place.waitingTime}
                </span>
              ) : (
                <span className="text-slate-400 dark:text-slate-500 italic">
                  Not enough data
                </span>
              )}
            </div>

            {/* Safety Status */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400">Safety Status:</span>
              <span
                className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${safetyConf.bgLight} ${safetyConf.textLight} ${safetyConf.borderLight}`}
              >
                {safetyConf.shortLabel}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Action */}
      <div className="p-4 sm:p-5 pt-0">
        <Link
          to={`/results?placeId=${encodeURIComponent(place.id)}`}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white text-xs font-semibold shadow-xs transition-colors"
        >
          <span>View Prediction</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
};
