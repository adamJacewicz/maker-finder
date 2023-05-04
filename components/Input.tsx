import React, { FC, forwardRef, InputHTMLAttributes, SVGAttributes } from 'react';
import clsx from 'clsx';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  wrapperClass?: string;
  icon?: FC<SVGAttributes<SVGElement>>;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, id, wrapperClass, icon: Icon, error, ...props }, ref) => {
    return (
      <div className={clsx('flex flex-col gap-1 relative', className)}>
        {!!label && (
          <label htmlFor={id} className="block text-sm font-medium text-white">
            {label}
          </label>
        )}
        <div
          className={clsx(
            'flex items-center bg-theme-secondary border-gray-500 border rounded-md w-full relative',
            wrapperClass,
          )}
        >
          <input
            {...props}
            ref={ref}
            className={clsx(
              'appearance-none block pl-3 py-2 bg-transparent border-none rounded-md focus:outline-none focus:ring-1 focus:ring-theme-accent focus:border-theme-accent sm:text-sm form-control w-full',
              { 'pr-10': !!Icon },
            )}
          />
          {Icon && <Icon className="text-gray-600 absolute inset-y-0 right-0 my-auto mr-3" />}
        </div>
        {!!error && <p className="absolute text-sm text-red-500 -bottom-6">{error}</p>}
      </div>
    );
  },
);

export default Input;
