export type AIProvider = 'chatgpt' | 'claude' | 'gemini' | 'deepseek';

export interface AIRequest {
  provider: AIProvider;
  apiKey: string;
  prompt: string;
}

export const streamCompletion = async (_req: AIRequest, onToken: (token: string) => void) => {
  onToken('AI-Streaming ist vorbereitet. Verbinde echte Provider-Endpunkte in src/ai/providers.ts.');
};
