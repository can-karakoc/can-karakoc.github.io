'use client';

export function AuroraBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 overflow-clip pointer-events-none z-0"
    >
      {/* Cyan aurora - top */}
      <div
        className="absolute w-[560px] h-[560px] rounded-full opacity-50"
        style={{
          top: '640px',
          left: '-140px',
          background:
            'radial-gradient(circle at 40% 38%, rgba(56,189,248,0.5), transparent 66%)',
          filter: 'blur(90px)',
          animation: 'drift1 22s ease-in-out infinite',
        }}
      />

      {/* Green aurora - mid right */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-40"
        style={{
          top: '1180px',
          right: '-160px',
          background:
            'radial-gradient(circle at 40% 38%, rgba(22,163,74,0.4), transparent 66%)',
          filter: 'blur(96px)',
          animation: 'drift2 26s ease-in-out infinite',
        }}
      />

      {/* Cobalt aurora - lower left */}
      <div
        className="absolute w-[520px] h-[520px] rounded-full opacity-[0.42]"
        style={{
          top: '2060px',
          left: '-120px',
          background:
            'radial-gradient(circle at 40% 38%, rgba(29,78,216,0.42), transparent 66%)',
          filter: 'blur(92px)',
          animation: 'drift3 24s ease-in-out infinite',
        }}
      />

      {/* Teal aurora - bottom right */}
      <div
        className="absolute w-[520px] h-[520px] rounded-full opacity-40"
        style={{
          top: '2680px',
          right: '-120px',
          background:
            'radial-gradient(circle at 40% 38%, rgba(8,145,178,0.4), transparent 66%)',
          filter: 'blur(92px)',
          animation: 'drift1 28s ease-in-out infinite',
        }}
      />
    </div>
  );
}
