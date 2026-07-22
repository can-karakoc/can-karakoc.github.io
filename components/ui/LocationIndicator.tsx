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
  country: 'UK',
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
  // Richer 3-stop gradients: bright sky up top fading toward the horizon
  // by day, deep-to-lighter by night — a stronger light→dark range that
  // reads as the sun's height.
  switch (cat) {
    case 'clear':
      return isDay
        ? light('linear-gradient(180deg, #3e97ec 0%, #8ec6f4 50%, #d6ecfb 100%)')
        : dark('linear-gradient(180deg, #070c28 0%, #1c2559 58%, #454c88 100%)');
    case 'partly':
      return isDay
        ? light('linear-gradient(180deg, #5ba2e2 0%, #a2cae9 50%, #dbe7f2 100%)')
        : dark('linear-gradient(180deg, #0e1438 0%, #262f5c 58%, #4a5182 100%)');
    case 'cloudy':
      return isDay
        ? light('linear-gradient(180deg, #7890a8 0%, #a8b6c7 52%, #d7dee7 100%)')
        : dark('linear-gradient(180deg, #161d33 0%, #313a56 58%, #545c78 100%)');
    case 'fog':
      return isDay
        ? light('linear-gradient(180deg, #909aa8 0%, #bcc4ce 52%, #e2e6ec 100%)')
        : dark('linear-gradient(180deg, #212734 0%, #434a5b 58%, #656d7e 100%)');
    case 'drizzle':
    case 'rain':
      return isDay
        ? dark('linear-gradient(180deg, #445a6e 0%, #6d8194 52%, #a2b0bf 100%)')
        : dark('linear-gradient(180deg, #131b28 0%, #2c3746 58%, #4a5464 100%)');
    case 'snow':
      return light('linear-gradient(180deg, #93a8c4 0%, #c6d4e6 52%, #eff5fc 100%)');
    case 'storm':
      return dark('linear-gradient(180deg, #1a2032 0%, #363f56 58%, #565f79 100%)');
    default:
      return light('linear-gradient(180deg, #7890a8 0%, #a8b6c7 52%, #d7dee7 100%)');
  }
}

/* Sun/moon arc — shows the sun (day) or moon (night) traveling from
   sunrise to sunset along a dome, with the current position marked. */
function SunArc({
  sunriseMin,
  sunsetMin,
  nowMin,
  isDay,
  fg,
  sub,
}: {
  sunriseMin: number;
  sunsetMin: number;
  nowMin: number;
  isDay: boolean;
  fg: string;
  sub: string;
}) {
  const [hover, setHover] = React.useState<'sun' | 'moon' | null>(null);

  const W = 256;
  const H = 100;
  const x0 = 18;
  const x1 = W - 18;
  const xc = (x0 + x1) / 2;
  const span = x1 - x0;
  const horizon = H - 14;
  const sigma = span / 6;

  // Bell-curve (Gaussian) trajectory: flat near the horizon, humped in the
  // middle. A tall bell for the sun and a shorter one for the moon.
  const bellY = (x: number, amp: number) =>
    horizon - amp * Math.exp(-((x - xc) ** 2) / (2 * sigma * sigma));
  const xAt = (f: number) => x0 + f * span;
  const clamp = (v: number) => Math.min(1, Math.max(0, v));

  // Day progress (sunrise→sunset) and night progress (sunset→next sunrise).
  const dayF = clamp(
    nowMin < sunriseMin
      ? 0
      : nowMin > sunsetMin
        ? 1
        : (nowMin - sunriseMin) / Math.max(1, sunsetMin - sunriseMin)
  );
  const nextSunrise = sunriseMin + 1440;
  const nightF = clamp(
    nowMin >= sunsetMin
      ? (nowMin - sunsetMin) / Math.max(1, nextSunrise - sunsetMin)
      : nowMin < sunriseMin
        ? (nowMin + 1440 - sunsetMin) / Math.max(1, nextSunrise - sunsetMin)
        : 0
  );

  const sunAmp = 66;
  const moonAmp = 48;
  const N = 48;
  const full = (amp: number) => {
    const a: string[] = [];
    for (let i = 0; i <= N; i++) {
      const x = xAt(i / N);
      a.push(`${x.toFixed(1)},${bellY(x, amp).toFixed(1)}`);
    }
    return `M ${a.join(' L ')}`;
  };
  const trav = (amp: number, f: number) => {
    const a: string[] = [];
    for (let i = 0; i <= N * f; i++) {
      const x = xAt(i / N);
      a.push(`${x.toFixed(1)},${bellY(x, amp).toFixed(1)}`);
    }
    return a.length > 1 ? `M ${a.join(' L ')}` : '';
  };

  const sunX = xAt(dayF);
  const sunY = bellY(sunX, sunAmp);
  const moonX = xAt(nightF);
  const moonY = bellY(moonX, moonAmp);
  const moonTrav = trav(moonAmp, nightF);
  const sunTrav = trav(sunAmp, dayF);

  // Hover tooltip content (next rise/set time for the hovered body).
  const fmtMin = (m: number) => {
    const mm = ((m % 1440) + 1440) % 1440;
    const h = Math.floor(mm / 60);
    const mn = mm % 60;
    const ap = h >= 12 ? 'PM' : 'AM';
    const hh = ((h + 11) % 12) + 1;
    return `${hh}:${String(mn).padStart(2, '0')} ${ap}`;
  };
  const tip =
    hover === 'sun'
      ? isDay
        ? `Sun · sets ${fmtMin(sunsetMin)}`
        : `Sun · rises ${fmtMin(sunriseMin)}`
      : hover === 'moon'
        ? isDay
          ? `Moon · rises ${fmtMin(sunsetMin)}`
          : `Moon · sets ${fmtMin(sunriseMin)}`
        : null;
  const tipAnchorX = hover === 'sun' ? sunX : moonX;
  const tipY = hover === 'sun' ? sunY : moonY;
  const tipW = tip ? Math.min(160, tip.length * 5 + 18) : 0;
  const tipX = Math.min(W - tipW / 2 - 2, Math.max(tipW / 2 + 2, tipAnchorX));

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        {/* Radial-gradient glows — render identically in Safari, unlike CSS
            blur() on SVG elements. */}
        <radialGradient id="liSunGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="liMoonGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#242a38" stopOpacity="0.8" />
          <stop offset="55%" stopColor="#242a38" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#242a38" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* horizon */}
      <line x1={x0} y1={horizon} x2={x1} y2={horizon} stroke={sub} strokeWidth="1" strokeDasharray="2 3" opacity={0.4} />

      {/* moon bell + traveled */}
      <path d={full(moonAmp)} fill="none" stroke={fg} strokeWidth="1.2" opacity={0.18} strokeDasharray="3 4" />
      {moonTrav && (
        <path d={moonTrav} fill="none" stroke={fg} strokeWidth="1.5" opacity={isDay ? 0.22 : 0.55} strokeLinecap="round" />
      )}

      {/* sun bell + traveled */}
      <path d={full(sunAmp)} fill="none" stroke={fg} strokeWidth="1.2" opacity={0.24} strokeDasharray="3 4" />
      {sunTrav && (
        <path d={sunTrav} fill="none" stroke={fg} strokeWidth="1.6" opacity={isDay ? 0.6 : 0.26} strokeLinecap="round" />
      )}

      {/* moon — soft radial glow + solid orb (blooms on hover) */}
      <circle
        cx={moonX}
        cy={moonY}
        r={hover === 'moon' ? 16 : 11}
        fill="url(#liMoonGlow)"
        opacity={hover === 'moon' ? (isDay ? 0.85 : 1) : isDay ? 0.7 : 0.9}
        style={{ transition: 'r 0.2s ease, opacity 0.2s ease' }}
      />
      <circle
        cx={moonX}
        cy={moonY}
        r={hover === 'moon' ? (isDay ? 5.5 : 7) : isDay ? 4 : 5.5}
        fill="#2b3242"
        opacity={isDay ? 0.9 : 1}
        style={{ transition: 'r 0.2s ease' }}
      />

      {/* sun — soft radial glow + solid orb (blooms on hover) */}
      <circle
        cx={sunX}
        cy={sunY}
        r={hover === 'sun' ? 18 : 12}
        fill="url(#liSunGlow)"
        opacity={hover === 'sun' ? 1 : isDay ? 0.9 : 0.55}
        style={{ transition: 'r 0.2s ease, opacity 0.2s ease' }}
      />
      <circle
        cx={sunX}
        cy={sunY}
        r={hover === 'sun' ? (isDay ? 7.5 : 6.5) : isDay ? 5.5 : 4.5}
        fill="#ffffff"
        opacity={isDay ? 1 : 0.8}
        style={{ transition: 'r 0.2s ease' }}
      />

      {/* invisible hit areas for hover */}
      <circle
        cx={moonX}
        cy={moonY}
        r={13}
        fill="transparent"
        style={{ cursor: 'pointer' }}
        onMouseEnter={() => setHover('moon')}
        onMouseLeave={() => setHover(null)}
      />
      <circle
        cx={sunX}
        cy={sunY}
        r={13}
        fill="transparent"
        style={{ cursor: 'pointer' }}
        onMouseEnter={() => setHover('sun')}
        onMouseLeave={() => setHover(null)}
      />

      {/* hover tooltip */}
      {tip && (
        <g style={{ pointerEvents: 'none' }}>
          <rect x={tipX - tipW / 2} y={tipY - 28} width={tipW} height={17} rx={8.5} fill="rgba(17,22,32,0.88)" />
          <text
            x={tipX}
            y={tipY - 16.2}
            textAnchor="middle"
            fontSize="9"
            fontWeight={600}
            fill="#ffffff"
            style={{ fontFamily: 'var(--font-jakarta)' }}
          >
            {tip}
          </text>
        </g>
      )}
    </svg>
  );
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

  // Current minute-of-day + sun times (in the location's tz), used for the
  // sun/moon arc and the golden-hour gradient.
  const toMin = (s: string) => {
    const [h, m] = s.split(':').map(Number);
    return h * 60 + m;
  };
  const nowMin = toMin(
    new Intl.DateTimeFormat('en-GB', {
      timeZone: LOCATION.timeZone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(now)
  );
  const sunriseMin = weather ? toMin(weather.sunrise.slice(11, 16)) : 6 * 60;
  const sunsetMin = weather ? toMin(weather.sunset.slice(11, 16)) : 18 * 60;
  const golden = weather
    ? Math.abs(nowMin - sunsetMin) <= 60 || Math.abs(nowMin - sunriseMin) <= 60
    : false;

  const theme = skyTheme(cat, isDay, golden);

  return (
    <div className="block fixed bottom-4 right-4 sm:bottom-6 sm:right-6" style={{ zIndex: 2147483000 }}>
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
        style={{
          color: theme.fg,
          borderRadius: open ? 22 : 999,
          border: '1px solid rgba(255,255,255,0.55)',
          boxShadow:
            '0 18px 44px -14px rgba(10, 37, 64, 0.38), inset 0 1px 0 rgba(255,255,255,0.6)',
          overflow: 'hidden',
          width: open ? 'min(328px, calc(100vw - 2rem))' : 'auto',
          position: 'relative',
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(24px) saturate(1.5)',
          WebkitBackdropFilter: 'blur(24px) saturate(1.5)',
        }}
      >
        {/* Translucent weather-gradient tint — glassy, so the blurred page
            behind shows through instead of a solid fill. */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: theme.bg,
            opacity: 0.42,
            pointerEvents: 'none',
          }}
        />
        <div style={{ position: 'relative' }}>
        <AnimatePresence initial={false} mode="popLayout">
          {open ? (
            <motion.div
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              role="button"
              aria-label="Collapse"
              className="p-3 cursor-pointer"
            >
              {/* Top: location pill (live green dot) + collapse chevron — on the gradient */}
              <div className="flex items-center justify-between gap-2 px-0.5">
                <div
                  className="inline-flex items-center gap-2 pl-2 pr-3 py-1 rounded-full"
                  style={{
                    background: 'rgba(255,255,255,0.72)',
                    border: '1px solid rgba(255,255,255,0.75)',
                    backdropFilter: 'blur(6px)',
                    WebkitBackdropFilter: 'blur(6px)',
                  }}
                >
                  {/* live green glowing dot */}
                  <span className="relative inline-flex items-center justify-center" style={{ width: 8, height: 8 }}>
                    <motion.span
                      className="absolute rounded-full"
                      style={{ width: 8, height: 8, background: '#22c55e' }}
                      animate={{ opacity: [0.55, 0, 0.55], scale: [1, 2.6, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <span
                      className="relative rounded-full"
                      style={{ width: 7, height: 7, background: '#22c55e', boxShadow: '0 0 5px 1px rgba(34,197,94,0.85)' }}
                    />
                  </span>
                  <span className="text-[12px] font-bold" style={{ color: 'var(--color-ink)' }}>
                    {LOCATION.city}, {LOCATION.country}
                  </span>
                </div>
                <span aria-hidden className="shrink-0 p-1" style={{ color: theme.fg }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </div>

              {/* Sun / moon trajectory — on the gradient, outside the card */}
              <div className="mt-3">
                <SunArc
                  sunriseMin={sunriseMin}
                  sunsetMin={sunsetMin}
                  nowMin={nowMin}
                  isDay={isDay}
                  fg={theme.fg}
                  sub={theme.sub}
                />
                <div className="flex items-center justify-between px-1.5 -mt-0.5">
                  <span className="text-[10px] font-semibold" style={{ color: theme.sub }}>
                    ↑ {weather ? to12h(weather.sunrise.slice(11, 16)) : '—'}
                  </span>
                  <span className="text-[10px] font-semibold" style={{ color: theme.sub }}>
                    ↓ {weather ? to12h(weather.sunset.slice(11, 16)) : '—'}
                  </span>
                </div>
              </div>

              {/* Solid white data card */}
              <div
                className="mt-3 rounded-2xl p-4"
                style={{ background: '#ffffff', boxShadow: '0 8px 22px -12px rgba(10,37,64,0.3)' }}
              >
                {/* time + weather */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-end gap-1.5">
                      <span className="font-extrabold tracking-tight leading-none" style={{ fontSize: 46, color: 'var(--color-ink)' }}>
                        {clock}
                      </span>
                      <span className="font-semibold mb-1.5" style={{ fontSize: 15, color: 'var(--color-ink-muted)' }}>
                        {period.toLowerCase()}
                      </span>
                    </div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] mt-1.5" style={{ fontFamily: 'var(--font-plex)', color: 'var(--color-ink-muted)' }}>
                      {dateStr}
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-1 pt-1 shrink-0" style={{ color: 'var(--color-ink)' }}>
                    <WeatherIcon cat={cat} isDay={isDay} size={30} />
                    <span className="text-[11.5px] font-semibold text-center leading-tight" style={{ color: 'var(--color-ink)' }}>
                      {label}
                    </span>
                  </div>
                </div>

                {/* stats */}
                <div className="mt-3 pt-3 grid grid-cols-2 gap-y-2.5 gap-x-4" style={{ borderTop: '1px solid rgba(10,37,64,0.08)' }}>
                  {[
                    ['Temp', weather ? `${Math.round(weather.tempC)}°C` : '—'],
                    ['Feels like', weather ? `${Math.round(weather.feelsC)}°C` : '—'],
                    ['Humidity', weather ? `${weather.humidity}%` : '—'],
                    ['Wind', weather ? `${Math.round(weather.windKph)} km/h` : '—'],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <p className="text-[9px] font-semibold uppercase tracking-[0.1em]" style={{ fontFamily: 'var(--font-plex)', color: 'var(--color-ink-muted)' }}>
                        {k}
                      </p>
                      <p className="text-[13px] font-semibold" style={{ color: 'var(--color-ink)' }}>
                        {v}
                      </p>
                    </div>
                  ))}
                </div>
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
              className="flex items-center gap-2.5 pl-3.5 pr-4 py-2.5 cursor-pointer"
            >
              <span style={{ color: theme.fg }}>
                <WeatherIcon cat={cat} isDay={isDay} size={22} />
              </span>
              <span className="text-left leading-tight">
                {/* location + live green dot */}
                <span className="flex items-center gap-1.5">
                  <span className="relative inline-flex items-center justify-center" style={{ width: 6, height: 6 }}>
                    <motion.span
                      className="absolute rounded-full"
                      style={{ width: 6, height: 6, background: '#22c55e' }}
                      animate={{ opacity: [0.55, 0, 0.55], scale: [1, 2.6, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <span
                      className="relative rounded-full"
                      style={{ width: 5.5, height: 5.5, background: '#22c55e', boxShadow: '0 0 4px 1px rgba(34,197,94,0.85)' }}
                    />
                  </span>
                  <span className="font-bold text-[13px]" style={{ color: theme.fg }}>
                    {LOCATION.city}, {LOCATION.country}
                  </span>
                </span>
                <span className="block text-[11px] font-medium" style={{ color: theme.sub }}>
                  {clock} {period.toLowerCase()}
                  {weather ? ` · ${Math.round(weather.tempC)}°C` : ''}
                </span>
              </span>
            </motion.button>
          )}
        </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
