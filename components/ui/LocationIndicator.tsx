'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ==========================================================================
   Location indicator — a small glass card pinned to the bottom-left corner
   that shows where Can currently is, the live local time there, and live
   weather (with a sky gradient that reflects the conditions).

   • Time is computed in the browser from LOCATION.timeZone — no API.
   • Weather comes from Open-Meteo (free, no API key) given the coordinates.
   • Location itself can't be auto-detected on a static site, so it's the one
     value you set by hand. When you travel, edit LOCATION below and redeploy.
   ========================================================================== */

const LOCATION = {
  city: 'London',
  region: 'United Kingdom',
  latitude: 51.5074,
  longitude: -0.1278,
  timeZone: 'Europe/London',
};

type WeatherCat =
  | 'clear'
  | 'partly'
  | 'cloudy'
  | 'fog'
  | 'drizzle'
  | 'rain'
  | 'snow'
  | 'storm';

// WMO weather codes → human label + a coarse category we theme against.
const WMO: Record<number, [string, WeatherCat]> = {
  0: ['Clear sky', 'clear'],
  1: ['Mainly clear', 'clear'],
  2: ['Partly cloudy', 'partly'],
  3: ['Overcast', 'cloudy'],
  45: ['Fog', 'fog'],
  48: ['Rime fog', 'fog'],
  51: ['Light drizzle', 'drizzle'],
  53: ['Drizzle', 'drizzle'],
  55: ['Heavy drizzle', 'drizzle'],
  56: ['Freezing drizzle', 'drizzle'],
  57: ['Freezing drizzle', 'drizzle'],
  61: ['Light rain', 'rain'],
  63: ['Rain', 'rain'],
  65: ['Heavy rain', 'rain'],
  66: ['Freezing rain', 'rain'],
  67: ['Freezing rain', 'rain'],
  71: ['Light snow', 'snow'],
  73: ['Snow', 'snow'],
  75: ['Heavy snow', 'snow'],
  77: ['Snow grains', 'snow'],
  80: ['Light showers', 'rain'],
  81: ['Showers', 'rain'],
  82: ['Violent showers', 'rain'],
  85: ['Snow showers', 'snow'],
  86: ['Snow showers', 'snow'],
  95: ['Thunderstorm', 'storm'],
  96: ['Thunderstorm', 'storm'],
  99: ['Thunderstorm', 'storm'],
};

interface Weather {
  tempC: number;
  feelsC: number;
  humidity: number;
  windKph: number;
  code: number;
  isDay: boolean;
  sunrise: string; // ISO "YYYY-MM-DDTHH:MM" in location tz
  sunset: string;
}

interface SkyTheme {
  bg: string;
  fg: string; // primary text
  sub: string; // secondary text
  panel: string; // translucent panel over the gradient
}

// Sunset/sunrise "golden hour" gradient echoing the reference art.
const GOLDEN: SkyTheme = {
  bg: 'linear-gradient(180deg, #9fb3e6 0%, #f3c38f 55%, #f4a05f 100%)',
  fg: '#2c2436',
  sub: 'rgba(44, 36, 54, 0.62)',
  panel: 'rgba(255, 255, 255, 0.5)',
};

const light = (bg: string): SkyTheme => ({
  bg,
  fg: '#20293c',
  sub: 'rgba(32, 41, 60, 0.6)',
  panel: 'rgba(255, 255, 255, 0.5)',
});
const dark = (bg: string): SkyTheme => ({
  bg,
  fg: '#ffffff',
  sub: 'rgba(255, 255, 255, 0.72)',
  panel: 'rgba(255, 255, 255, 0.14)',
});

function skyTheme(cat: WeatherCat, isDay: boolean, golden: boolean): SkyTheme {
  if (golden && (cat === 'clear' || cat === 'partly')) return GOLDEN;
  switch (cat) {
    case 'clear':
      return isDay
        ? light('linear-gradient(180deg, #78b7f2 0%, #c7e6fb 100%)')
        : dark('linear-gradient(180deg, #141b45 0%, #3a3f78 100%)');
    case 'partly':
      return isDay
        ? light('linear-gradient(180deg, #8dbbe9 0%, #d4e2f0 100%)')
        : dark('linear-gradient(180deg, #222a4d 0%, #464d76 100%)');
    case 'cloudy':
      return isDay
        ? light('linear-gradient(180deg, #97a6b9 0%, #cdd6e1 100%)')
        : dark('linear-gradient(180deg, #2a3350 0%, #494f69 100%)');
    case 'fog':
      return isDay
        ? light('linear-gradient(180deg, #abb4c1 0%, #d8dde4 100%)')
        : dark('linear-gradient(180deg, #333a49 0%, #565d6e 100%)');
    case 'drizzle':
    case 'rain':
      return isDay
        ? dark('linear-gradient(180deg, #62768c 0%, #93a3b7 100%)')
        : dark('linear-gradient(180deg, #283340 0%, #464f63 100%)');
    case 'snow':
      return light('linear-gradient(180deg, #b1c2d7 0%, #e9f0f8 100%)');
    case 'storm':
      return dark('linear-gradient(180deg, #363c4d 0%, #565d70 100%)');
    default:
      return light('linear-gradient(180deg, #97a6b9 0%, #cdd6e1 100%)');
  }
}

/* ---- Weather icon (inline SVG, inherits currentColor) ------------------- */
function WeatherIcon({
  cat,
  isDay,
  size = 22,
}: {
  cat: WeatherCat;
  isDay: boolean;
  size?: number;
}) {
  const fill = { fill: 'currentColor' } as const;
  const line = {
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    fill: 'none',
  };
  const cloud = (
    <path
      d="M7 18h9.2a3.6 3.6 0 0 0 .5-7.16A5.2 5.2 0 0 0 6.9 11.7 3.2 3.2 0 0 0 7 18z"
      {...fill}
      opacity={0.92}
    />
  );

  let inner: React.ReactNode;
  if (cat === 'clear' && isDay) {
    inner = (
      <>
        <circle cx="12" cy="12" r="4.2" {...fill} />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((d) => (
          <line key={d} x1="12" y1="3.2" x2="12" y2="5.6" {...line} transform={`rotate(${d} 12 12)`} />
        ))}
      </>
    );
  } else if (cat === 'clear') {
    inner = <path d="M16.5 13.2A5.6 5.6 0 1 1 10.8 6a4.4 4.4 0 0 0 5.7 7.2z" {...fill} />;
  } else if (cat === 'partly') {
    inner = (
      <>
        {isDay ? (
          <>
            <circle cx="8.5" cy="8" r="3" {...fill} opacity={0.95} />
            {[0, 60, 120, 180, 240, 300].map((d) => (
              <line key={d} x1="8.5" y1="2.6" x2="8.5" y2="4" {...line} transform={`rotate(${d} 8.5 8)`} />
            ))}
          </>
        ) : (
          <path d="M11.5 8.4A3.6 3.6 0 1 1 7.8 4.9a2.9 2.9 0 0 0 3.7 3.5z" {...fill} />
        )}
        <path d="M8 19h8.2a3.2 3.2 0 0 0 .3-6.37A4.6 4.6 0 0 0 7.7 13 2.9 2.9 0 0 0 8 19z" {...fill} opacity={0.92} />
      </>
    );
  } else if (cat === 'rain' || cat === 'drizzle') {
    inner = (
      <>
        {cloud}
        <line x1="9" y1="19.5" x2="8" y2="22" {...line} />
        <line x1="13" y1="19.5" x2="12" y2="22" {...line} />
        <line x1="17" y1="19.5" x2="16" y2="22" {...line} />
      </>
    );
  } else if (cat === 'snow') {
    inner = (
      <>
        {cloud}
        <circle cx="9" cy="21" r="1" {...fill} />
        <circle cx="13" cy="21" r="1" {...fill} />
        <circle cx="17" cy="21" r="1" {...fill} />
      </>
    );
  } else if (cat === 'storm') {
    inner = (
      <>
        {cloud}
        <path d="M13 18l-3 3.5h2.4L11 24l4-4h-2.3L14 18z" {...fill} />
      </>
    );
  } else if (cat === 'fog') {
    inner = (
      <>
        {cloud}
        <line x1="6" y1="21" x2="15" y2="21" {...line} />
        <line x1="9" y1="23" x2="18" y2="23" {...line} />
      </>
    );
  } else {
    inner = cloud;
  }

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      {inner}
    </svg>
  );
}

/* ---- helpers ------------------------------------------------------------ */
function to12h(hhmm: string): string {
  const [H, M] = hhmm.split(':').map(Number);
  const ap = H >= 12 ? 'PM' : 'AM';
  const h = ((H + 11) % 12) + 1;
  return `${h}:${String(M).padStart(2, '0')} ${ap}`;
}

export function LocationIndicator() {
  const [mounted, setMounted] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [now, setNow] = React.useState<Date>(() => new Date());
  const [weather, setWeather] = React.useState<Weather | null>(null);

  React.useEffect(() => setMounted(true), []);

  // Live clock
  React.useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // Live weather (Open-Meteo, keyless). Refresh every 10 min.
  React.useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const url =
          `https://api.open-meteo.com/v1/forecast?latitude=${LOCATION.latitude}` +
          `&longitude=${LOCATION.longitude}` +
          `&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m` +
          `&daily=sunrise,sunset&forecast_days=1&timezone=${encodeURIComponent(LOCATION.timeZone)}`;
        const res = await fetch(url);
        if (!res.ok) return;
        const d = await res.json();
        if (cancelled) return;
        setWeather({
          tempC: d.current.temperature_2m,
          feelsC: d.current.apparent_temperature,
          humidity: d.current.relative_humidity_2m,
          windKph: d.current.wind_speed_10m,
          code: d.current.weather_code,
          isDay: d.current.is_day === 1,
          sunrise: d.daily.sunrise[0],
          sunset: d.daily.sunset[0],
        });
      } catch {
        /* leave weather null — the card still shows location + time */
      }
    };
    load();
    const id = setInterval(load, 10 * 60 * 1000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  // Avoid SSR/client time mismatch: render only after mount.
  if (!mounted) return null;

  const timeParts = new Intl.DateTimeFormat('en-US', {
    timeZone: LOCATION.timeZone,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).formatToParts(now);
  const clock = `${timeParts.find((p) => p.type === 'hour')?.value}:${
    timeParts.find((p) => p.type === 'minute')?.value
  }`;
  const period = timeParts.find((p) => p.type === 'dayPeriod')?.value ?? '';

  const dateStr = new Intl.DateTimeFormat('en-US', {
    timeZone: LOCATION.timeZone,
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(now);

  const [label, cat]: [string, WeatherCat] = weather
    ? WMO[weather.code] ?? ['—', 'cloudy']
    : ['Loading…', 'cloudy'];
  const isDay = weather ? weather.isDay : true;

  // "golden hour" — within 60 min of sunrise/sunset, in the location's tz
  let golden = false;
  if (weather) {
    const hhmmNow = new Intl.DateTimeFormat('en-GB', {
      timeZone: LOCATION.timeZone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(now);
    const mins = (s: string) => {
      const [h, m] = s.split(':').map(Number);
      return h * 60 + m;
    };
    const n = mins(hhmmNow);
    const ss = mins(weather.sunset.slice(11, 16));
    const sr = mins(weather.sunrise.slice(11, 16));
    golden = Math.abs(n - ss) <= 60 || Math.abs(n - sr) <= 60;
  }

  const theme = skyTheme(cat, isDay, golden);

  return (
    <div className="hidden lg:block fixed bottom-6 left-6" style={{ zIndex: 2147483000 }}>
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
        style={{
          background: theme.bg,
          color: theme.fg,
          borderRadius: open ? 22 : 999,
          border: '1px solid rgba(255,255,255,0.45)',
          boxShadow:
            '0 18px 40px -16px rgba(10, 37, 64, 0.4), inset 0 1px 0 rgba(255,255,255,0.5)',
          overflow: 'hidden',
          width: open ? 288 : 'auto',
        }}
      >
        <AnimatePresence initial={false} mode="popLayout">
          {open ? (
            <motion.div
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="p-4"
            >
              {/* Header: location + collapse */}
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-bold text-sm leading-tight truncate" style={{ color: theme.fg }}>
                    {LOCATION.city}
                  </p>
                  <p className="text-[11px] leading-tight truncate" style={{ color: theme.sub }}>
                    {LOCATION.region}
                  </p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Collapse"
                  className="shrink-0 -mr-1 -mt-1 p-1 rounded-full"
                  style={{ color: theme.sub }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 15l6-6 6 6" />
                  </svg>
                </button>
              </div>

              {/* Big time */}
              <div className="mt-3 flex items-end gap-2">
                <span className="font-extrabold tracking-tight leading-none" style={{ fontSize: 46, color: theme.fg }}>
                  {clock}
                </span>
                <span className="font-semibold mb-1.5" style={{ fontSize: 15, color: theme.sub }}>
                  {period.toLowerCase()}
                </span>
                <span className="flex-1" />
                <span style={{ color: theme.fg }} className="mb-1">
                  <WeatherIcon cat={cat} isDay={isDay} size={30} />
                </span>
              </div>

              <div className="mt-0.5 flex items-center justify-between">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em]" style={{ fontFamily: 'var(--font-plex)', color: theme.sub }}>
                  {dateStr}
                </p>
                <p className="text-[13px] font-semibold" style={{ color: theme.fg }}>
                  {label}
                </p>
              </div>

              {/* Stats panel */}
              <div className="mt-3 rounded-2xl px-3 py-3 grid grid-cols-2 gap-y-3 gap-x-4" style={{ background: theme.panel }}>
                {[
                  ['Temp', weather ? `${Math.round(weather.tempC)}°C` : '—'],
                  ['Feels like', weather ? `${Math.round(weather.feelsC)}°C` : '—'],
                  ['Humidity', weather ? `${weather.humidity}%` : '—'],
                  ['Wind', weather ? `${Math.round(weather.windKph)} km/h` : '—'],
                  ['Sunrise', weather ? to12h(weather.sunrise.slice(11, 16)) : '—'],
                  ['Sunset', weather ? to12h(weather.sunset.slice(11, 16)) : '—'],
                ].map(([k, v]) => (
                  <div key={k}>
                    <p className="text-[9.5px] font-bold uppercase tracking-[0.12em]" style={{ fontFamily: 'var(--font-plex)', color: theme.sub }}>
                      {k}
                    </p>
                    <p className="text-[15px] font-semibold" style={{ color: theme.fg }}>
                      {v}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.button
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(true)}
              aria-label={`${LOCATION.city} — ${clock} ${period}. Expand for weather`}
              className="flex items-center gap-2.5 pl-3.5 pr-4 py-2.5"
            >
              <span style={{ color: theme.fg }}>
                <WeatherIcon cat={cat} isDay={isDay} size={22} />
              </span>
              <span className="text-left leading-tight">
                <span className="block font-bold text-[13px]" style={{ color: theme.fg }}>
                  {LOCATION.city}
                </span>
                <span className="block text-[11px] font-medium" style={{ color: theme.sub }}>
                  {clock} {period.toLowerCase()}
                  {weather ? ` · ${Math.round(weather.tempC)}°C` : ''}
                </span>
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
