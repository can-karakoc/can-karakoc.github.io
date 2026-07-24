'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ==========================================================================
   Coding Activity widget — GitHub-style contribution heatmap
   ========================================================================== */

interface GitHubStats {
  commitsThisWeek: number;
  activeDays: number;
  currentStreak: number;
  topLanguages: string[];
  lastActive: string | null;
  contributionsByDate: Record<string, number>;
  totalContributions: number;
}

export function CodingActivity() {
  const [mounted, setMounted] = React.useState(false);
  const [stats, setStats] = React.useState<GitHubStats | null>(null);
  const [error, setError] = React.useState(false);
  const [hoveredDay, setHoveredDay] = React.useState<{ date: string; count: number; x: number; y: number } | null>(null);

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    let cancelled = false;

    const fetchStats = async () => {
      try {
        const res = await fetch('/api/github/activity');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        if (cancelled) return;
        setStats(data);
        setError(false);
      } catch {
        if (cancelled) return;
        setError(true);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 5 * 60 * 1000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  if (!mounted || error || !stats) return null;

  // Build 12 weeks of activity data
  const weeks = 12;
  const weeklyData: { weekStart: Date; weekEnd: Date; total: number }[] = [];
  const today = new Date();

  for (let week = weeks - 1; week >= 0; week--) {
    const weekStart = new Date(today);
    weekStart.setDate(weekStart.getDate() - (week * 7 + 6));
    const weekEnd = new Date(today);
    weekEnd.setDate(weekEnd.getDate() - (week * 7));

    let weekTotal = 0;
    for (let day = 0; day < 7; day++) {
      const date = new Date(weekStart);
      date.setDate(date.getDate() + day);
      const dateKey = date.toISOString().split('T')[0];
      weekTotal += stats.contributionsByDate[dateKey] || 0;
    }

    weeklyData.push({ weekStart, weekEnd, total: weekTotal });
  }

  // Get color for weekly total
  const getColor = (total: number) => {
    if (total === 0) return 'rgba(10, 37, 64, 0.08)';
    if (total <= 5) return 'rgba(124, 185, 232, 0.3)';
    if (total <= 15) return 'rgba(124, 185, 232, 0.5)';
    if (total <= 30) return 'rgba(124, 185, 232, 0.7)';
    return 'rgba(124, 185, 232, 0.9)';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="relative w-full"
      style={{
        background: 'rgba(255,255,255,0.45)',
        backdropFilter: 'blur(20px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
        borderRadius: 20,
        border: '1px solid rgba(255,255,255,0.6)',
        boxShadow: '0 12px 32px -12px rgba(10, 37, 64, 0.18), inset 0 1px 0 rgba(255,255,255,0.8)',
        padding: '20px',
      }}
    >
      {/* Header */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <p className="text-[12px] font-bold" style={{ color: 'var(--color-ink)' }}>
            {stats.totalContributions} contributions
          </p>
          <p className="text-[10px] font-medium" style={{ color: 'var(--color-ink-muted)' }}>
            last 12 weeks
          </p>
        </div>
      </div>

      {/* Weekly Activity Line Chart */}
      <div className="mb-4 relative" style={{ height: 100 }}>
        {/* Grid background */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.15 }}>
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--color-ink)" strokeWidth="0.5" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Line chart */}
        <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(124, 185, 232, 0.3)" />
              <stop offset="100%" stopColor="rgba(124, 185, 232, 0)" />
            </linearGradient>
          </defs>

          {(() => {
            const maxContributions = Math.max(...weeklyData.map(w => w.total), 1);
            const padding = 10;
            const width = 100;
            const height = 100;
            const chartWidth = width - padding * 2;
            const chartHeight = height - padding * 2;

            const points = weeklyData.map((week, i) => {
              const x = padding + (i / (weeklyData.length - 1)) * chartWidth;
              const y = padding + chartHeight - (week.total / maxContributions) * chartHeight;
              return { x: `${x}%`, y: `${y}%`, total: week.total, week };
            });

            const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
            const areaD = `${pathD} L ${points[points.length - 1].x} ${padding + chartHeight}% L ${points[0].x} ${padding + chartHeight}% Z`;

            return (
              <>
                {/* Line */}
                <motion.path
                  d={pathD}
                  fill="none"
                  stroke="rgba(124, 185, 232, 0.9)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* Data points */}
                {points.map((point, i) => (
                  <motion.circle
                    key={i}
                    cx={point.x}
                    cy={point.y}
                    r="4"
                    fill="rgba(124, 185, 232, 0.9)"
                    stroke="rgba(255,255,255,0.8)"
                    strokeWidth="2"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8 + i * 0.05, duration: 0.3 }}
                    whileHover={{ scale: 1.5, r: 5 }}
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setHoveredDay({
                        date: point.week.weekStart.toISOString().split('T')[0],
                        count: point.total,
                        x: rect.left + rect.width / 2,
                        y: rect.top,
                      });
                    }}
                    onMouseLeave={() => setHoveredDay(null)}
                  />
                ))}
              </>
            );
          })()}
        </svg>

        {/* Hover Tooltip */}
        <AnimatePresence>
          {hoveredDay && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.15 }}
              style={{
                position: 'fixed',
                left: hoveredDay.x,
                top: hoveredDay.y - 40,
                transform: 'translateX(-50%)',
                zIndex: 1000,
                pointerEvents: 'none',
              }}
            >
              <div
                style={{
                  background: 'rgba(10, 37, 64, 0.95)',
                  color: '#ffffff',
                  padding: '6px 10px',
                  borderRadius: 8,
                  fontSize: 11,
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                }}
              >
                {hoveredDay.count} contribution{hoveredDay.count !== 1 ? 's' : ''}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Stats Footer */}
      <div className="flex items-center gap-3 pt-2" style={{ borderTop: '1px solid rgba(10,37,64,0.08)' }}>
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-wider mb-0.5" style={{ color: 'var(--color-ink-muted)', opacity: 0.7 }}>
            Streak
          </p>
          <p className="text-[15px] font-bold" style={{ color: 'var(--color-ink)' }}>
            {stats.currentStreak} days
          </p>
        </div>
        <div className="h-8 w-px" style={{ background: 'rgba(10,37,64,0.08)' }} />
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-wider mb-0.5" style={{ color: 'var(--color-ink-muted)', opacity: 0.7 }}>
            This Week
          </p>
          <p className="text-[15px] font-bold" style={{ color: 'var(--color-ink)' }}>
            {stats.commitsThisWeek}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
