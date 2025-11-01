import { SelectHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
  fullWidth?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      options,
      placeholder,
      fullWidth = false,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const selectId = props.id || `select-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className={clsx('flex flex-col gap-1', { 'w-full': fullWidth })}>
        {label && (
          <label
            htmlFor={selectId}
            className="text-sm font-medium text-neutral-700"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={clsx(
            'px-3 py-2 border rounded-lg',
            'text-neutral-900 bg-white',
            'focus-ring',
            'transition-colors duration-200',
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
          aria-describedby={error ? `${selectId}-error` : undefined}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p
            id={`${selectId}-error`}
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

Select.displayName = 'Select';
