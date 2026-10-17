import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchForm } from '../components/SearchForm.tsx';
import { PlaceCard, Place } from '../components/PlaceCard.tsx';
import { StepCard } from '../components/StepCard.tsx';
import { SampleDataBanner } from '../components/SampleDataBanner.tsx';
import { DisclaimerBox } from '../components/DisclaimerBox.tsx';
import { LoadingSkeleton } from '../components/LoadingSkeleton.tsx';
import { getPlaces } from '../services/api.js';
import { Search, Gauge, Compass, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const Home: React.FC = () => {
  const [popularPlaces, setPopularPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getPlaces().then((places) => {
      if (isMounted) {
        // Pick 4 diverse popular places
        const selected = places.slice(0, 4);
        setPopularPlaces(selected as Place[]);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="space-y-12 md:space-y-16 pb-16">
      {/* Sample Data Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <SampleDataBanner />
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Smart Visit Optimization</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white" style={{ textWrap: 'balance' }}>
            Plan Smart. Avoid Crowds. Stay Safer.
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Make informed decisions before stepping out. Check projected density curves, waiting times, and active safety advisories for tourist landmarks, transit hubs, and cultural venues.
          </p>
        </div>

        {/* Search Card */}
        <div className="mt-8 max-w-4xl mx-auto">
          <SearchForm />
        </div>
      </section>

      {/* Popular Destinations / Suggested Places */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Popular Suggested Places
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Destinations with historical crowd models and safety monitoring.
            </p>
          </div>

          <Link
            to="/explore"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors whitespace-nowrap"
          >
            <span>Explore all 12 places</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <LoadingSkeleton type="card" count={4} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularPlaces.map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        )}
      </section>

      {/* "How It Works" in 3 Steps */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            How It Works in 3 Clear Steps
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Grounded in historical trend models, venue capacities, and verified public safety notices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StepCard
            stepNumber="01"
            title="Search Destination & Time"
            description="Select any destination, pick your prospective visit date, and choose your arrival hour. Our system retrieves categorized capacity models."
            icon={<Search className="w-6 h-6" />}
          />
          <StepCard
            stepNumber="02"
            title="Inspect 0-100 Intensity & Safety"
            description="Review calibrated crowd indexes, 24-hour comparative bar charts, expected waiting times, and active municipal security bulletins."
            icon={<Gauge className="w-6 h-6" />}
          />
          <StepCard
            stepNumber="03"
            title="Explore Smarter Alternatives"
            description="If a venue is in the red peak threshold, discover calmer alternate hours or recommended low-density sister venues in the same region."
            icon={<Compass className="w-6 h-6" />}
          />
        </div>
      </section>

      {/* Full-width Disclaimer Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DisclaimerBox />
      </section>
    </div>
  );
};
