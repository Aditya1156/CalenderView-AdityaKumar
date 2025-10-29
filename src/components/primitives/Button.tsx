import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = clsx(
      'inline-flex items-center justify-center',
      'font-medium rounded-lg',
      'transition-colors duration-200',
      'focus-ring',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      {
        'w-full': fullWidth,
      }
    );

    const variantStyles = clsx({
      'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800':
        variant === 'primary' && !disabled,
      'bg-neutral-200 text-neutral-900 hover:bg-neutral-300 active:bg-neutral-400':
        variant === 'secondary' && !disabled,
      'bg-transparent text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200':
        variant === 'ghost' && !disabled,
      'bg-error-500 text-white hover:bg-error-600 active:bg-error-700':
        variant === 'danger' && !disabled,
    });

    const sizeStyles = clsx({
      'px-3 py-1.5 text-sm': size === 'sm',
      'px-4 py-2 text-base': size === 'md',
      'px-6 py-3 text-lg': size === 'lg',
    });

    return (
      <button
        ref={ref}
        className={clsx(baseStyles, variantStyles, sizeStyles, className)}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
