import React, { forwardRef } from 'react';
import { clsx } from 'clsx';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className,
      disabled,
      children,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const baseClasses = [
      // Base styles
      'inline-flex items-center justify-center',
      'font-medium rounded-lg',
      'transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-60 disabled:cursor-not-allowed',
      // Minimum touch target size for accessibility
      'min-h-[44px] min-w-[44px]',
      // Prevent text selection
      'select-none',
    ];

    const variantClasses = {
      primary: [
        'bg-primary-500 text-white',
        'hover:bg-primary-600 focus:ring-primary-500',
        'shadow-soft hover:shadow-medium',
        'disabled:hover:bg-primary-500',
      ],
      secondary: [
        'bg-secondary-100 text-secondary-800',
        'hover:bg-secondary-200 focus:ring-secondary-500',
        'shadow-soft hover:shadow-medium',
        'disabled:hover:bg-secondary-100',
      ],
      accent: [
        'bg-accent-500 text-white',
        'hover:bg-accent-600 focus:ring-accent-500',
        'shadow-soft hover:shadow-medium',
        'disabled:hover:bg-accent-500',
      ],
      outline: [
        'bg-transparent text-primary-600',
        'border-2 border-primary-500',
        'hover:bg-primary-50 focus:ring-primary-500 focus:bg-primary-50',
        'disabled:hover:bg-transparent',
      ],
      ghost: [
        'bg-transparent text-neutral-700',
        'hover:bg-neutral-100 focus:ring-neutral-500',
        'disabled:hover:bg-transparent',
      ],
    };

    const sizeClasses = {
      sm: 'px-4 py-2 text-sm gap-2',
      md: 'px-6 py-3 text-base gap-2',
      lg: 'px-8 py-4 text-lg gap-3',
    };

    const widthClasses = fullWidth ? 'w-full' : '';

    const classes = clsx(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      widthClasses,
      className
    );

    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type}
        className={classes}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && leftIcon && (
          <span className="flex-shrink-0" aria-hidden="true">
            {leftIcon}
          </span>
        )}
        <span className={loading ? 'opacity-70' : ''}>{children}</span>
        {!loading && rightIcon && (
          <span className="flex-shrink-0" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
