import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'glass' | 'lime';
  withDot?: boolean;
  dotColor?: string;
  className?: string;
}

export function Badge({
  children,
  variant = 'glass',
  withDot = false,
  dotColor = 'var(--color-green)',
  className = '',
}: BadgeProps) {
  const variantStyles = {
    glass: `
      bg-[var(--color-glass-55)] backdrop-blur-[14px] saturate-[1.3]
      border border-[var(--color-glass-border)]
      text-[var(--color-ink)]
    `,
    lime: `
      bg-[var(--color-lime)] bg-opacity-20
      border border-[var(--color-lime)]
      text-[var(--color-ink)]
    `,
  };

  return (
    <div
      className={`
        inline-flex items-center gap-2
        px-4 py-2 rounded-[var(--radius-pill)]
        font-[family-name:var(--font-jakarta)] font-medium text-sm
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {withDot && (
        <span
          className="w-2 h-2 rounded-full animate-pulse"
          style={{
            backgroundColor: dotColor,
            boxShadow: `0 0 8px 1px ${dotColor}`,
          }}
        />
      )}
      {children}
    </div>
  );
}
