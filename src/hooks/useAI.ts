
import { useState, useCallback } from 'react';
import { aiService, AIResponse } from '../services/aiService';
import { useToast } from './use-toast';

export const useAI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const callAI = useCallback(async (
    method: 'analyzeCompanyData' | 'getRecommendations' | 'compareRegimes',
    data: any
  ): Promise<AIResponse | null> => {
    setIsLoading(true);
    setError(null);

    try {
      let result: AIResponse;
      
      switch (method) {
        case 'analyzeCompanyData':
          result = await aiService.analyzeCompanyData(data);
          break;
        case 'getRecommendations':
          result = await aiService.getRecommendations(data);
          break;
        case 'compareRegimes':
          result = await aiService.compareRegimes(data);
          break;
        default:
          throw new Error('Método não reconhecido');
      }

      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      
      toast({
        title: "Erro na IA",
        description: errorMessage,
        variant: "destructive"
      });
      
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const analyzeCompany = useCallback((data: any) => {
    return callAI('analyzeCompanyData', data);
  }, [callAI]);

  const getRecommendations = useCallback((data: any) => {
    return callAI('getRecommendations', data);
  }, [callAI]);

  const compareRegimes = useCallback((data: any) => {
    return callAI('compareRegimes', data);
  }, [callAI]);

  return {
    isLoading,
    error,
    analyzeCompany,
    getRecommendations,
    compareRegimes
  };
};
