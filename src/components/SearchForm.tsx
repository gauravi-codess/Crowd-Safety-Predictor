import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, Clock, Layers, AlertCircle, ArrowRight } from 'lucide-react';
import { PLACE_CATEGORIES } from '../config/thresholds.js';
import { getPlaces } from '../services/api.js';

interface SearchFormProps {
  initialPlaceId?: string;
  initialPlaceName?: string;
  initialCategory?: string;
  initialDate?: string;
  initialTime?: string;
  className?: string;
  compact?: boolean;
}

export const SearchForm: React.FC<SearchFormProps> = ({
  initialPlaceId = '',
  initialPlaceName = '',
  initialCategory = '',
  initialDate = '',
  initialTime = '',
  className = '',
  compact = false,
}) => {
  const navigate = useNavigate();

  // Today's ISO date string YYYY-MM-DD
  const todayStr = new Date().toISOString().split('T')[0];

  const [placeQuery, setPlaceQuery] = useState(initialPlaceName || '');
  const [selectedPlaceId, setSelectedPlaceId] = useState(initialPlaceId || '');
  const [category, setCategory] = useState(initialCategory || '');
  const [date, setDate] = useState(initialDate || todayStr);
  const [time, setTime] = useState(initialTime || '14:00');

  // Autocomplete state
  const [allPlaces, setAllPlaces] = useState<any[]>([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const autocompleteRef = useRef<HTMLDivElement>(null);

  // Form validation errors
  const [errors, setErrors] = useState<{ place?: string; date?: string; time?: string }>({});

  useEffect(() => {
    let isMounted = true;
    getPlaces().then((places) => {
      if (isMounted) setAllPlaces(places);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Sync initial props
  useEffect(() => {
    if (initialPlaceName) setPlaceQuery(initialPlaceName);
    if (initialPlaceId) setSelectedPlaceId(initialPlaceId);
    if (initialCategory) setCategory(initialCategory);
    if (initialDate) setDate(initialDate);
    if (initialTime) setTime(initialTime);
  }, [initialPlaceName, initialPlaceId, initialCategory, initialDate, initialTime]);

  // Handle autocomplete filtering
  useEffect(() => {
    if (!placeQuery.trim()) {
      setFilteredSuggestions(allPlaces.slice(0, 5));
      return;
    }
    const q = placeQuery.toLowerCase().trim();
    const matches = allPlaces.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
    setFilteredSuggestions(matches);
  }, [placeQuery, allPlaces]);

  // Click outside listener for autocomplete dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (autocompleteRef.current && !autocompleteRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectPlace = (place: any) => {
    setSelectedPlaceId(place.id);
    setPlaceQuery(place.name);
    setCategory(place.category);
    setShowSuggestions(false);
    if (errors.place) setErrors((prev) => ({ ...prev, place: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { place?: string; date?: string; time?: string } = {};

    if (!placeQuery.trim()) {
      newErrors.place = 'Please select or enter a place name.';
    }

    if (!date) {
      newErrors.date = 'Please pick a valid date.';
    }

    if (!time) {
      newErrors.time = 'Please select a visit time.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Determine placeId: if selected place id is found or match query directly
    let targetId = selectedPlaceId;
    if (!targetId && placeQuery.trim()) {
      const match = allPlaces.find(
        (p) => p.name.toLowerCase().includes(placeQuery.toLowerCase().trim())
      );
      targetId = match ? match.id : (allPlaces[0]?.id || 'victoria-memorial');
    }

    const queryParams = new URLSearchParams({
      placeId: targetId,
      date,
      time,
      category: category || '',
    });

    navigate(`/results?${queryParams.toString()}`);
  };

  const timeOptions = [
    { value: '06:00', label: '6:00 AM (Early Morning)' },
    { value: '08:00', label: '8:00 AM (Morning Peak)' },
    { value: '10:00', label: '10:00 AM' },
    { value: '12:00', label: '12:00 PM (Noon)' },
    { value: '14:00', label: '2:00 PM (Afternoon)' },
    { value: '16:00', label: '4:00 PM' },
    { value: '18:00', label: '6:00 PM (Evening Peak)' },
    { value: '20:00', label: '8:00 PM' },
    { value: '22:00', label: '10:00 PM (Night)' },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-lg p-5 md:p-6 transition-all ${className}`}
    >
      <div className={`grid grid-cols-1 ${compact ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-2 lg:grid-cols-4'} gap-4`}>
        {/* Field 1: Place Name with Autocomplete */}
        <div className="relative" ref={autocompleteRef}>
          <label htmlFor="search-place" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Destination / Place
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="search-place"
              type="text"
              autoComplete="off"
              value={placeQuery}
              onChange={(e) => {
                setPlaceQuery(e.target.value);
                setSelectedPlaceId('');
                setShowSuggestions(true);
                if (errors.place) setErrors((prev) => ({ ...prev, place: undefined }));
              }}
              onFocus={() => setShowSuggestions(true)}
              placeholder="e.g. Victoria Memorial, CSMT..."
              aria-invalid={!!errors.place}
              aria-describedby={errors.place ? 'place-error' : undefined}
              className={`w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border ${
                errors.place ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-200 dark:border-slate-700'
              } rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors`}
            />
          </div>

          {errors.place && (
            <p id="place-error" className="text-[11px] text-rose-600 dark:text-rose-400 mt-1 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3 h-3 shrink-0" />
              <span>{errors.place}</span>
            </p>
          )}

          {/* Autocomplete Dropdown */}
          {showSuggestions && (
            <div className="absolute z-40 left-0 right-0 top-full mt-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl max-h-60 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700">
              {filteredSuggestions.length > 0 ? (
                filteredSuggestions.map((place) => (
                  <button
                    key={place.id}
                    type="button"
                    onClick={() => handleSelectPlace(place)}
                    className="w-full text-left px-3.5 py-2.5 hover:bg-indigo-50 dark:hover:bg-slate-700/80 transition-colors flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">{place.name}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        {place.category} · {place.city}
                      </div>
                    </div>
                    <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium font-mono">
                      {place.typicalCrowdLevel}
                    </span>
                  </button>
                ))
              ) : (
                <div className="px-3.5 py-3 text-xs text-slate-500 dark:text-slate-400 text-center">
                  No places match "{placeQuery}"
                </div>
              )}
            </div>
          )}
        </div>

        {/* Field 2: Date Picker */}
        <div>
          <label htmlFor="search-date" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Visit Date
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="search-date"
              type="date"
              min={todayStr}
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                if (errors.date) setErrors((prev) => ({ ...prev, date: undefined }));
              }}
              aria-invalid={!!errors.date}
              aria-describedby={errors.date ? 'date-error' : undefined}
              className={`w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border ${
                errors.date ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-200 dark:border-slate-700'
              } rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors`}
            />
          </div>
          {errors.date && (
            <p id="date-error" className="text-[11px] text-rose-600 dark:text-rose-400 mt-1 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3 h-3 shrink-0" />
              <span>{errors.date}</span>
            </p>
          )}
        </div>

        {/* Field 3: Time Selector */}
        <div>
          <label htmlFor="search-time" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Expected Arrival Time
          </label>
          <div className="relative">
            <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              id="search-time"
              value={time}
              onChange={(e) => {
                setTime(e.target.value);
                if (errors.time) setErrors((prev) => ({ ...prev, time: undefined }));
              }}
              className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
            >
              {timeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Field 4: Category Dropdown */}
        <div>
          <label htmlFor="search-category" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Category Filter
          </label>
          <div className="relative">
            <Layers className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              id="search-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
            >
              <option value="">All Categories</option>
              {PLACE_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Action CTA Button */}
      <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="text-xs text-slate-500 dark:text-slate-400">
          <span>Evaluates 24-hr historical patterns &amp; verified advisories</span>
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all transform active:scale-98 cursor-pointer"
        >
          <span>Predict Crowd &amp; Safety</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};
