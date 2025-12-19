import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dark';

const variants: Record<'primary' | 'ghost' | 'outline', string> = {
  primary:
    'bg-primary text-white shadow-glow hover:-translate-y-0.5 hover:shadow-glow border border-primary/40 active:scale-[0.99]',
  ghost: 'border border-white/15 text-white hover:-translate-y-0.5 hover:border-primary hover:text-primary bg-white/5',
  outline: 'border border-white/10 text-white/90 hover:border-primary hover:text-primary bg-white/0',
};

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: keyof typeof variants;
    href?: string;
  }
>;

export function Button({ children, className, variant = 'primary', disabled, href, ...props }: ButtonProps) {
  const styles = cn(
    baseClasses,
    variants[variant],
    disabled && 'cursor-not-allowed opacity-60 hover:translate-y-0 hover:shadow-none',
    className,
  );

  if (href) {
    return (
      <Link href={href} className={styles} aria-disabled={disabled} onClick={(e) => disabled && e.preventDefault()}>
        {children}
      </Link>
    );
  }

  return (
    <button className={styles} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
