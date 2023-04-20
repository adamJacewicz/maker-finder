import React, { FC, forwardRef, InputHTMLAttributes, SVGAttributes } from 'react';
import clsx from 'clsx';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  icon?: FC<SVGAttributes<SVGElement>>;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, icon: Icon, ...props }, ref) => {
    return (
      <div className={clsx('flex flex-col gap-1', className)}>
        {!!label && (
          <label htmlFor="password" className="block text-sm font-medium text-white">
            {label}
          </label>
        )}
        <div className="flex items-center bg-theme-secondary border-gray-500 border rounded-md w-full relative">
          <input
            {...props}
            ref={ref}
            className={clsx(
              'appearance-none block pl-3 py-2 bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-theme-accent focus:border-theme-accent sm:text-sm form-control w-full',
              { 'relative z-1 pr-10': !!Icon },
            )}
          />
          {Icon && <Icon className="text-gray-600 absolute inset-y-0 right-0 my-auto mr-3" />}
        </div>
      </div>
    );
  },
);

export default Input;
