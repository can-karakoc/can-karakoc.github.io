import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  opacity?: '55' | '60' | '70';
}

export function GlassCard({
  children,
  className = '',
  opacity = '60',
}: GlassCardProps) {
  const opacityMap = {
    '55': 'bg-[var(--color-glass-55)]',
    '60': 'bg-[var(--color-glass-60)]',
    '70': 'bg-[var(--color-glass-70)]',
  };

  return (
    <div
      className={`
        ${opacityMap[opacity]} backdrop-blur-[14px] saturate-[1.3]
        border border-[var(--color-glass-border)]
        rounded-[var(--radius-card)]
        shadow-[0_34px_70px_-46px_rgba(23,70,184,0.5),inset_0_1px_0_rgba(255,255,255,0.9)]
        ${className}
      `}
    >
      {children}
    </div>
  );
}
