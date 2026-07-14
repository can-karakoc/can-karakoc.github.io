'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

type ButtonVariant = 'glass' | 'gradient' | 'primary' | 'cta';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: ButtonVariant;
  children: ReactNode;
  href?: string;
  className?: string;
}

const buttonVariants = {
  glass: `
    bg-[var(--color-glass-55)] backdrop-blur-[16px] saturate-[1.3]
    border border-[var(--color-glass-border)]
    text-[var(--color-ink)]
    shadow-[0_12px_30px_-16px_rgba(23,70,184,0.4),inset_0_1px_0_rgba(255,255,255,0.9)]
    hover:text-[var(--color-cobalt)]
  `,
  gradient: `
    bg-gradient-to-b from-[#2249B8] to-[#122E8C]
    text-white
    shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_6px_16px_-6px_rgba(15,40,120,0.85)]
  `,
  primary: `
    bg-gradient-to-b from-[var(--color-cobalt-bright)] to-[var(--color-cobalt-darker)]
    text-white
    shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_6px_16px_-6px_rgba(15,40,120,0.85)]
  `,
  cta: `
    bg-gradient-to-br from-[#1D4ED8] via-[#2249B8] to-[#0891B2]
    bg-[length:220%_220%]
    text-white
    shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_6px_16px_-6px_rgba(15,40,120,0.85)]
    animate-[ctaflow_6s_ease-in-out_infinite]
  `,
};

export function Button({
  variant = 'glass',
  children,
  href,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = `
    inline-flex items-center justify-center gap-2
    px-4 py-2 rounded-[var(--radius-pill)]
    font-[family-name:var(--font-jakarta)] font-semibold text-sm
    transition-all duration-300
    cursor-pointer
    no-underline
  `;

  const Component = motion.button;

  return (
    <Component
      className={`${baseStyles} ${buttonVariants[variant]} ${className} mag`}
      whileHover={{ scale: 1.06, y: -4 }}
      whileTap={{ scale: 0.98, y: -1 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 17,
      }}
      {...props}
    >
      {children}
    </Component>
  );
}

export function ButtonLink({
  variant = 'glass',
  children,
  href,
  className = '',
  ...props
}: ButtonProps & { href: string }) {
  const baseStyles = `
    inline-flex items-center justify-center gap-2
    px-4 py-2 rounded-[var(--radius-pill)]
    font-[family-name:var(--font-jakarta)] font-semibold text-sm
    transition-all duration-300
    cursor-pointer
    no-underline
  `;

  return (
    <motion.a
      href={href}
      className={`${baseStyles} ${buttonVariants[variant]} ${className} mag`}
      whileHover={{ scale: 1.06, y: -4 }}
      whileTap={{ scale: 0.98, y: -1 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 17,
      }}
      {...(props as any)}
    >
      {children}
    </motion.a>
  );
}
