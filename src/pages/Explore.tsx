import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPlaces, getCities, getCategories } from '../services/api.js';
import { PlaceCard, Place } from '../components/PlaceCard.tsx';
import { EmptyState } from '../components/EmptyState.tsx';
import { LoadingSkeleton } from '../components/LoadingSkeleton.tsx';
import { SampleDataBanner } from '../components/SampleDataBanner.tsx';
import { useAuth } from '../context/AuthContext.tsx';
import { Search, Filter, MapPin, Layers, Heart, X } from 'lucide-react';

export const Explore: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isLoggedIn, favorites } = useAuth();

  const [places, setPlaces] = useState<Place[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter state
  const searchQuery = searchParams.get('search') || '';
  const selectedCategory = searchParams.get('category') || 'All';
  const selectedCity = searchParams.get('city') || 'All';
  const favoritesOnly = searchParams.get('favoritesOnly') === 'true';

  useEffect(() => {
    let isMounted = true;
    Promise.all([getCities(), getCategories()]).then(([cityList, catList]) => {
      if (isMounted) {
        setCities(cityList);
        setCategories(catList);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    getPlaces({
      search: searchQuery,
      category: selectedCategory === 'All' ? '' : selectedCategory,
      city: selectedCity === 'All' ? '' : selectedCity,
    }).then((res) => {
      if (isMounted) {
        let filtered = res as Place[];
        if (favoritesOnly) {
          filtered = filtered.filter((p) => favorites.includes(p.id));
        }
        setPlaces(filtered);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [searchQuery, selectedCategory, selectedCity, favoritesOnly, favorites]);

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (!value || value === 'All' || value === 'false') {
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
    searchQuery || selectedCategory !== 'All' || selectedCity !== 'All' || favoritesOnly;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 pb-16">
      {/* Sample data banner */}
      <SampleDataBanner />

      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Explore Destinations
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Browse verified places across 6 categories with historical crowd baselines and active safety status.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Keyword Search */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => updateParam('search', e.target.value)}
              placeholder="Search by place name or keywords..."
              className="w-full pl-9 pr-8 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => updateParam('search', '')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Dropdown */}
          <div className="md:col-span-3 relative">
            <Layers className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={selectedCategory}
              onChange={(e) => updateParam('category', e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'All' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>

          {/* City Dropdown */}
          <div className="md:col-span-2 relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={selectedCity}
              onChange={(e) => updateParam('city', e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
            >
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c === 'All' ? 'All Cities' : c}
                </option>
              ))}
            </select>
          </div>

          {/* Favorites Only Toggle (if logged in) */}
          <div className="md:col-span-2 flex items-center">
            {isLoggedIn ? (
              <button
                type="button"
                onClick={() => updateParam('favoritesOnly', favoritesOnly ? 'false' : 'true')}
                className={`w-full py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  favoritesOnly
                    ? 'bg-rose-50 border-rose-300 text-rose-700 dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-300'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${favoritesOnly ? 'fill-current' : ''}`} />
                <span>Saved ({favorites.length})</span>
              </button>
            ) : (
              <span className="text-[11px] text-slate-400 text-center w-full block">
                Sign in to filter saved
              </span>
            )}
          </div>
        </div>

        {/* Active Filter Indicators & Clear */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="text-slate-500 dark:text-slate-400">
              Showing matching destinations ({places.length})
            </div>
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 transition-colors"
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>

      {/* Places Grid or Empty State */}
      {loading ? (
        <LoadingSkeleton type="card" count={6} />
      ) : places.length === 0 ? (
        <EmptyState
          title="No places match your search"
          description="We couldn't find any destination matching your selected keyword, category, or city filter."
          actionText="Clear All Filters"
          onAction={handleResetFilters}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {places.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      )}
    </div>
  );
};
