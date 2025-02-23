import React from 'react';
import { useApiKey } from '../context/ApiKeyContext';
import { KeyRound } from 'lucide-react';

export function ApiKeyInput() {
  const { apiKey, setApiKey } = useApiKey();

  return (
    <div className="w-full max-w-md">
      <div className="relative">
        <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your OpenAI API key"
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <p className="mt-2 text-sm text-gray-500">
        Your API key is stored locally and never sent to our servers
      </p>
    </div>
  );
}