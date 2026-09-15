import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'yellow' | 'lime' | 'terminal' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children?: React.ReactNode;
}

export interface ButtonAsButtonProps
  extends ButtonBaseProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: undefined;
}

export interface ButtonAsLinkProps
  extends ButtonBaseProps,
    React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  target?: string;
  rel?: string;
}

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

export const buttonStyles = (
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  className?: string
) => {
  const base =
    'inline-flex items-center justify-center font-display font-bold border-2.5 border-carbon transition-all brutal-press select-none text-center';

  const sizes = {
    sm: 'px-3 py-1.5 text-xs rounded-sm',
    md: 'px-4 py-2 text-sm rounded-sm',
    lg: 'px-6 py-3 text-base rounded',
  };

  const variants = {
    primary: 'bg-kalcer-orange text-white brutal-shadow hover:bg-orange-600',
    secondary: 'bg-white text-carbon brutal-shadow hover:bg-paper-technical',
    yellow: 'bg-kalcer-yellow text-carbon brutal-shadow hover:bg-yellow-300',
    lime: 'bg-kalcer-lime text-carbon brutal-shadow hover:bg-lime-400',
    terminal: 'bg-carbon text-white border-2 border-white shadow-brutal-cobalt hover:bg-neutral-800',
    outline: 'bg-transparent text-carbon hover:bg-white/80',
  };

  return cn(base, sizes[size], variants[variant], className);
};

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const classes = buttonStyles(variant, size, className);

    if ('href' in props && props.href) {
      const { href, ...rest } = props as ButtonAsLinkProps;
      const isExternal = href.startsWith('http') || href.startsWith('mailto:');

      if (isExternal) {
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            className={classes}
            target={rest.target || '_blank'}
            rel={rest.rel || 'noopener noreferrer'}
            {...rest}
          >
            {children}
          </a>
        );
      }

      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          {...rest}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        {...(props as ButtonAsButtonProps)}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

