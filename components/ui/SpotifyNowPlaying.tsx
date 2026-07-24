'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ==========================================================================
   Spotify "Now Playing" widget — shows what Can is currently listening to
   with a collapsed/expanded state similar to the weather widget.
   ========================================================================== */

interface SpotifyTrack {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
}

export function SpotifyNowPlaying() {
  const [mounted, setMounted] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [track, setTrack] = React.useState<SpotifyTrack>({ isPlaying: false });
  const [error, setError] = React.useState(false);
  const [dominantColor, setDominantColor] = React.useState<string>('rgba(29, 185, 84, 0.25)');

  React.useEffect(() => setMounted(true), []);

  // Extract dominant color from album art
  React.useEffect(() => {
    if (!track.albumImageUrl) return;

    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = track.albumImageUrl;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      let r = 0, g = 0, b = 0;
      const step = 5;

      for (let i = 0; i < data.length; i += 4 * step) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
      }

      const pixels = data.length / (4 * step);
      r = Math.floor(r / pixels);
      g = Math.floor(g / pixels);
      b = Math.floor(b / pixels);

      setDominantColor(`rgba(${r}, ${g}, ${b}, 0.25)`);
    };
  }, [track.albumImageUrl]);

  // Fetch now playing data every 5 seconds
  React.useEffect(() => {
    let cancelled = false;

    const fetchNowPlaying = async () => {
      try {
        const res = await fetch('/api/spotify/now-playing');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        if (cancelled) return;
        setTrack(data);
        setError(false);
      } catch {
        if (cancelled) return;
        setError(true);
      }
    };

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 5000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  if (!mounted || error) return null;
  if (!track.title) return null;

  // Spotify icon component
  const SpotifyIcon = ({ size = 18 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
    </svg>
  );

  return (
    <div className="fixed bottom-6 left-6 pointer-events-none" style={{ zIndex: 100 }}>
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
        style={{
          borderRadius: open ? 22 : 999,
          border: '1px solid rgba(255,255,255,0.3)',
          boxShadow: '0 18px 44px -14px rgba(10, 37, 64, 0.38), inset 0 1px 0 rgba(255,255,255,0.5)',
          overflow: 'hidden',
          width: open ? 'min(300px, calc(100vw - 2rem))' : '160px',
          position: 'relative',
          background: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(32px) saturate(1.6)',
          WebkitBackdropFilter: 'blur(32px) saturate(1.6)',
        }}
      >
        {/* Album color gradient overlay */}
        <motion.div
          aria-hidden
          animate={{ background: dominantColor }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            inset: 0,
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
                className="p-3 cursor-pointer pointer-events-auto"
              >
                {/* Header with status and close chevron */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1.5">
                    <span style={{ color: 'var(--color-ink)' }}>
                      <SpotifyIcon size={14} />
                    </span>
                    <span
                      className="text-[11px] font-bold uppercase tracking-wider"
                      style={{ color: 'var(--color-ink)' }}
                    >
                      {track.isPlaying ? 'Now Playing' : 'Last Played'}
                    </span>
                  </div>
                  <span aria-hidden className="shrink-0" style={{ color: 'var(--color-ink-muted)' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </div>

                {/* Album art */}
                <div className="mb-3">
                  {track.albumImageUrl && (
                    <motion.img
                      key={track.albumImageUrl}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      src={track.albumImageUrl}
                      alt={`${track.album} cover`}
                      className="rounded-xl w-full"
                      style={{
                        aspectRatio: '1',
                        objectFit: 'cover',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                      }}
                    />
                  )}
                </div>

                {/* Track info */}
                <div className="mb-3">
                  <p
                    className="text-[15px] font-bold leading-tight mb-1"
                    style={{ color: 'var(--color-ink)' }}
                  >
                    {track.title}
                  </p>
                  <p
                    className="text-[13px] font-medium leading-tight"
                    style={{ color: 'var(--color-ink-muted)' }}
                  >
                    {track.artist}
                  </p>
                </div>

                {/* Open in Spotify button */}
                <a
                  href={track.songUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-semibold text-[13px] transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.6)',
                    border: '1px solid rgba(255,255,255,0.8)',
                    color: 'var(--color-ink)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.75)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.6)';
                  }}
                >
                  Open in Spotify
                </a>
              </motion.div>
            ) : (
              <motion.button
                key="collapsed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setOpen(true)}
                aria-label={`${track.title} by ${track.artist}. Click to expand`}
                className="flex items-center gap-2.5 pl-3 pr-3.5 py-2.5 cursor-pointer pointer-events-auto w-full"
              >
                {/* Album art thumbnail */}
                <div className="relative shrink-0" style={{ width: 44, height: 44 }}>
                  {track.albumImageUrl && (
                    <img
                      src={track.albumImageUrl}
                      alt=""
                      className="rounded-lg w-full h-full object-cover"
                      style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}
                    />
                  )}
                  {/* Audio visualizer (only when playing) */}
                  {track.isPlaying && (
                    <div
                      className="absolute bottom-1 right-1 flex items-end gap-0.5"
                      style={{
                        background: 'rgba(0,0,0,0.65)',
                        borderRadius: 4,
                        padding: '2px 3px',
                      }}
                    >
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          style={{
                            width: 2,
                            background: '#22c55e',
                            borderRadius: 1,
                          }}
                          animate={{
                            height: [4, 10, 4],
                          }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.15,
                            ease: 'easeInOut',
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Track info (compact) */}
                <div className="flex-1 min-w-0 text-left">
                  <p
                    className="text-[10px] font-medium leading-tight truncate mb-0.5"
                    style={{ color: 'var(--color-ink-muted)' }}
                  >
                    {track.isPlaying ? 'Now Playing' : 'Last Played'}
                  </p>
                  <p
                    className="text-[12px] font-bold leading-tight truncate"
                    style={{ color: 'var(--color-ink)' }}
                  >
                    {track.title}
                  </p>
                </div>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
