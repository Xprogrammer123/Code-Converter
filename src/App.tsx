import React, { useState } from 'react';
import { Code2, ArrowRightLeft } from 'lucide-react';
import { ApiKeyProvider } from './context/ApiKeyContext';
import { ApiKeyInput } from './components/ApiKeyInput';
import { CodeEditor } from './components/CodeEditor';
import { LanguageSelector } from './components/LanguageSelector';
import { programmingLanguages } from './utils/languages';
import { convertCode } from './utils/convertCode';
import { useApiKey } from './context/ApiKeyContext';

function CodeConverter() {
  const [sourceCode, setSourceCode] = useState('');
  const [convertedCode, setConvertedCode] = useState('');
  const [fromLanguage, setFromLanguage] = useState('');
  const [toLanguage, setToLanguage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { apiKey } = useApiKey();

  const handleConvert = async () => {
    if (!apiKey) {
      setError('Please enter your OpenAI API key');
      return;
    }
    if (!fromLanguage || !toLanguage) {
      setError('Please select both languages');
      return;
    }
    if (!sourceCode.trim()) {
      setError('Please enter some code to convert');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const result = await convertCode(sourceCode, fromLanguage, toLanguage, apiKey);
      setConvertedCode(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Code2 className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Code Converter</h1>
        </div>
        <p className="text-gray-600">Transform your code between different programming languages</p>
      </div>

      <ApiKeyInput />

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <LanguageSelector
            value={fromLanguage}
            onChange={setFromLanguage}
            options={programmingLanguages}
            label="From Language"
          />
          <CodeEditor
            value={sourceCode}
            onChange={setSourceCode}
            placeholder="Enter your code here..."
            label="Source Code"
          />
        </div>

        <div className="space-y-4">
          <LanguageSelector
            value={toLanguage}
            onChange={setToLanguage}
            options={programmingLanguages}
            label="To Language"
          />
          <CodeEditor
            value={convertedCode}
            onChange={setConvertedCode}
            placeholder="Converted code will appear here..."
            label="Converted Code"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleConvert}
          disabled={isLoading}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowRightLeft className="h-5 w-5" />
          {isLoading ? 'Converting...' : 'Convert Code'}
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <ApiKeyProvider>
      <div className="min-h-screen bg-gray-50">
        <CodeConverter />
      </div>
    </ApiKeyProvider>
  );
}

export default App;