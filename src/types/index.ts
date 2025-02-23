export interface ConversionResult {
  convertedCode: string;
  error?: string;
}

export interface ApiKeyContextType {
  apiKey: string;
  setApiKey: (key: string) => void;
}

export type Language = {
  name: string;
  value: string;
};