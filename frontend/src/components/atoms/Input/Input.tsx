// src/components/atoms/Input/Input.tsx
import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  leftIcon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ label, error, leftIcon, className = '', ...props }) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={props.id} className="text-sm font-medium text-neutral-700">
        {label}
      </label>
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {leftIcon}
          </div>
        )}
        <input
          className={`w-full px-4 py-3 rounded-lg border ${error ? 'border-error' : 'border-neutral-300'} focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-200 ${leftIcon ? 'pl-10' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && <span className="text-error text-sm">{error}</span>}
    </div>
  );
};

export default Input;