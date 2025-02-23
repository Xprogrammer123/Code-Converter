import React from 'react';
import { Language } from '../types';

interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
  options: Language[];
  label: string;
}

export function LanguageSelector({ value, onChange, options, label }: LanguageSelectorProps) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="">Select language</option>
        {options.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}