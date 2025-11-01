import { TextareaHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      fullWidth = false,
      className,
      disabled,
      rows = 3,
      ...props
    },
    ref
  ) => {
    const textareaId = props.id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className={clsx('flex flex-col gap-1', { 'w-full': fullWidth })}>
        {label && (
          <label
            htmlFor={textareaId}
            className="text-sm font-medium text-neutral-700"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={clsx(
            'px-3 py-2 border rounded-lg',
            'text-neutral-900 bg-white',
            'focus-ring',
            'transition-colors duration-200',
            'placeholder:text-neutral-400',
            'resize-vertical',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-neutral-50',
            {
              'border-neutral-300 hover:border-neutral-400': !error && !disabled,
              'border-error-500 hover:border-error-600': error && !disabled,
              'w-full': fullWidth,
            },
            className
          )}
          disabled={disabled}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${textareaId}-error` : undefined}
          {...props}
        />
        {error && (
          <p
            id={`${textareaId}-error`}
            className="text-sm text-error-600"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
