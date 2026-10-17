# Crowd & Safety Predictor - Frontend UI

A modern React web application designed to help people choose the best time and safest place to visit by visualizing predicted crowd levels, 24-hour comparative profiles, weekly heatmaps, and verified facility safety notices.

> **Tagline:** "Plan Smart. Avoid Crowds. Stay Safer."
> **Honesty Notice:** "Sample data – not verified real-world information. Predictions are estimates and not a guarantee of safety."

---

## 📁 Folder Structure

```
/
├── src/
│   ├── assets/
│   │   └── images/              # High-fidelity architectural & destination photography
│   ├── components/              # 18 Modular, accessible React UI components
│   │   ├── AlternativePlaceCard.tsx  # Cards for recommended lower-density destinations
│   │   ├── CrowdBadge.tsx       # Green/Amber/Red crowd level badge with tabular index
│   │   ├── CrowdGauge.tsx       # Circular SVG 0-100 crowd intensity gauge
│   │   ├── DataTag.tsx          # "Historical", "Predicted", or "Real-time" honesty tags
│   │   ├── DisclaimerBox.tsx    # Safety and estimation disclaimer container
│   │   ├── EmptyState.tsx       # Empty search/filter state with reset CTA
│   │   ├── Footer.tsx           # Footer with methodology links, disclaimer, and architecture note
│   │   ├── HeatmapGrid.tsx      # 7-day x 24-hour interactive intensity heatmap
│   │   ├── HourlyChart.tsx      # 24-hour Recharts bar chart with active hour ring highlight
│   │   ├── LoadingSkeleton.tsx  # Shimmer skeleton states for cards, charts, and results
│   │   ├── Navbar.tsx           # 3-Zone top bar with dark mode toggle & responsive menu
│   │   ├── PlaceCard.tsx        # Place card with image fallback, wait times & favorite heart
│   │   ├── RecommendationCard.tsx # "Better time to visit" slot recommendation
│   │   ├── SafetyNoticeItem.tsx # Individual advisory, restriction, or notice card
│   │   ├── SafetyStatusCard.tsx # Tabbed safety panel (notices, emergency, accessibility, incidents)
│   │   ├── SampleDataBanner.tsx # Visible sample data notification banner
│   │   ├── SearchForm.tsx       # Destination autocomplete, date, time, category dropdown
│   │   └── StepCard.tsx         # "How it works in 3 steps" card
│   ├── config/
│   │   └── thresholds.js        # Configurable crowd index bands (0-39, 40-69, 70-100) & safety configs
│   ├── context/
│   │   └── AuthContext.tsx      # Mock authentication state, favorites, and light/dark theme
│   ├── data/
│   │   └── mockData.js          # 12 mock places across 6 categories with 24-hr curves and notices
│   ├── pages/                   # Complete page views
│   │   ├── About.tsx            # Mission, 0-100 index explanation, thresholds table & limitations
│   │   ├── Explore.tsx          # Search, category and city filtering with place grid
│   │   ├── Home.tsx             # Hero banner, search form, popular places & how it works
│   │   ├── Login.tsx            # User sign in with form validation
│   │   ├── NotFound.tsx         # 404 handler with fallback navigation
│   │   ├── Register.tsx         # User registration with confirm password validation
│   │   ├── Results.tsx          # Prediction forecast, gauge, hourly chart, safety card & alternatives
│   │   ├── Safety.tsx           # Safety notices feed with place, type & severity filters
│   │   └── Trends.tsx           # Place selector, 7x24 weekly heatmap, and weekday vs weekend curves
│   ├── services/
│   │   └── api.js               # Service layer abstraction connecting UI to data source
│   ├── App.tsx                  # Application root & React Router route definitions
│   ├── index.css                # Tailwind CSS v4 styling & typography setup
│   └── main.tsx                 # React DOM mount point
├── package.json
└── vite.config.ts
```

---

## 🔌 Replacing Mock Functions with Real API Calls

All UI components consume data exclusively through the service layer in `src/services/api.js`. None of the components import `mockData.js` directly.

To connect this frontend to a real Node.js/Express + MySQL or PostgreSQL backend:

1. Install an HTTP client (e.g., `axios`):
   ```bash
   npm install axios
   ```

2. Open `src/services/api.js` and initialize an Axios instance:
   ```javascript
   import axios from 'axios';

   const client = axios.create({
     baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
     timeout: 10000,
   });
   ```

3. Replace the mock functions in `src/services/api.js` with real network requests:

   - **`getPlaces({ search, category, city })`**
     ```javascript
     export async function getPlaces({ search = '', category = '', city = '' } = {}) {
       const res = await client.get('/places', { params: { search, category, city } });
       return res.data;
     }
     ```

   - **`getPlaceById(placeId)`**
     ```javascript
     export async function getPlaceById(placeId) {
       const res = await client.get(`/places/${placeId}`);
       return res.data;
     }
     ```

   - **`predict(placeId, date, time)`**
     ```javascript
     export async function predict(placeId, date, time) {
       const res = await client.post('/predict', { placeId, date, time });
       return res.data;
     }
     ```

   - **`getAllNotices({ placeId, type, severity })`**
     ```javascript
     export async function getAllNotices({ placeId = '', type = '', severity = '' } = {}) {
       const res = await client.get('/safety/notices', { params: { placeId, type, severity } });
       return res.data;
     }
     ```

   - **`getWeeklyHeatmap(placeId)`**
     ```javascript
     export async function getWeeklyHeatmap(placeId) {
       const res = await client.get(`/trends/heatmap/${placeId}`);
       return res.data;
     }
     ```

Because the function signatures and return schemas match what the components expect, **no React components need to be modified** when switching to the real backend.

---

## 🎨 Color System & Thresholds

- **Low Crowd (0 – 39):** `#22C55E` (Green) – Minimal wait times, free movement.
- **Moderate Crowd (40 – 69):** `#F59E0B` (Amber) – Normal operations, steady foot traffic.
- **High Crowd (70 – 100):** `#EF4444` (Red) – Peak congestion, prolonged queues.

Configure or adjust these bounds anytime in `src/config/thresholds.js`.
