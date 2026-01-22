import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  suffix?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, suffix, className = '', ...props }) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <div className="relative">
        <input
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition-shadow ${
            error ? 'border-red-500' : 'border-slate-300'
          }`}
          {...props}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
            {suffix}
          </span>
        )}
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};