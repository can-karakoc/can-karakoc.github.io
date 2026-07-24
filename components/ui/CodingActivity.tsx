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

  // Build 12 weeks of activity grid
  const weeks = 12;
  const activityData: { date: string; count: number }[][] = [];
  const monthLabels: { month: string; weekIndex: number }[] = [];
  const today = new Date();
  let lastMonth = -1;

  for (let week = weeks - 1; week >= 0; week--) {
    const weekData: { date: string; count: number }[] = [];
    for (let day = 6; day >= 0; day--) {
      const date = new Date(today);
      date.setDate(date.getDate() - (week * 7 + day));
      const dateKey = date.toISOString().split('T')[0];
      const count = stats.contributionsByDate[dateKey] || 0;
      weekData.unshift({ date: dateKey, count });

      // Track month changes for labels
      if (day === 0) {
        const month = date.getMonth();
        if (month !== lastMonth) {
          monthLabels.push({
            month: date.toLocaleDateString('en-US', { month: 'short' }),
            weekIndex: weeks - 1 - week,
          });
          lastMonth = month;
        }
      }
    }
    activityData.push(weekData);
  }

  // Get color for contribution count
  const getColor = (count: number) => {
    if (count === 0) return 'rgba(10, 37, 64, 0.08)';
    if (count <= 2) return 'rgba(124, 185, 232, 0.3)';
    if (count <= 5) return 'rgba(124, 185, 232, 0.5)';
    if (count <= 10) return 'rgba(124, 185, 232, 0.7)';
    return 'rgba(124, 185, 232, 0.9)';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="relative"
      style={{
        background: 'rgba(255,255,255,0.45)',
        backdropFilter: 'blur(20px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
        borderRadius: 20,
        border: '1px solid rgba(255,255,255,0.6)',
        boxShadow: '0 12px 32px -12px rgba(10, 37, 64, 0.18), inset 0 1px 0 rgba(255,255,255,0.8)',
        padding: '20px',
        width: '100%',
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

      {/* Contribution Heatmap */}
      <div className="mb-3 relative">
        {/* Month Labels */}
        <div className="flex justify-between mb-2 px-[1px]">
          {monthLabels.map((label, i) => (
            <div key={i} style={{ position: 'absolute', left: `${(label.weekIndex / 11) * 100}%` }}>
              <span className="text-[9px] font-semibold" style={{ color: 'var(--color-ink-muted)' }}>
                {label.month}
              </span>
            </div>
          ))}
        </div>

        <div className="flex justify-between" style={{ gap: '2px' }}>
          {activityData.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col" style={{ gap: '2px' }}>
              {week.map((day, dayIndex) => (
                <motion.div
                  key={`${weekIndex}-${dayIndex}`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: (weekIndex * 7 + dayIndex) * 0.005, duration: 0.2 }}
                  onMouseEnter={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setHoveredDay({
                      date: day.date,
                      count: day.count,
                      x: rect.left + rect.width / 2,
                      y: rect.top,
                    });
                  }}
                  onMouseLeave={() => setHoveredDay(null)}
                  whileHover={{ scale: 1.4, zIndex: 10 }}
                  style={{
                    width: 11,
                    height: 11,
                    borderRadius: 2,
                    background: getColor(day.count),
                    border: '1px solid rgba(255,255,255,0.4)',
                    cursor: 'pointer',
                  }}
                />
              ))}
            </div>
          ))}
        </div>

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
                {hoveredDay.count} contribution{hoveredDay.count !== 1 ? 's' : ''} on{' '}
                {new Date(hoveredDay.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
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
