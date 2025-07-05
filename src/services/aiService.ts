
export interface AIRequest {
  prompt: string;
  context?: any;
  type: 'tax_analysis' | 'recommendation' | 'comparison' | 'general';
}

export interface AIResponse {
  response: string;
  confidence: number;
  recommendations?: string[];
  data?: any;
}

export class AIService {
  private apiKey: string | null = null;
  private baseUrl: string = '';

  constructor() {
    // A API key será configurada dinamicamente
  }

  setApiCredentials(apiKey: string, baseUrl: string) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  async analyzeCompanyData(companyData: any): Promise<AIResponse> {
    if (!this.apiKey) {
      throw new Error('API key não configurada');
    }

    const prompt = this.buildCompanyAnalysisPrompt(companyData);
    
    try {
      const response = await fetch(`${this.baseUrl}/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          prompt,
          context: companyData,
          type: 'tax_analysis'
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao chamar IA:', error);
      throw error;
    }
  }

  async getRecommendations(taxData: any): Promise<AIResponse> {
    if (!this.apiKey) {
      throw new Error('API key não configurada');
    }

    const prompt = this.buildRecommendationPrompt(taxData);
    
    try {
      const response = await fetch(`${this.baseUrl}/recommendations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          prompt,
          context: taxData,
          type: 'recommendation'
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao obter recomendações:', error);
      throw error;
    }
  }

  async compareRegimes(simulationData: any): Promise<AIResponse> {
    if (!this.apiKey) {
      throw new Error('API key não configurada');
    }

    const prompt = this.buildComparisonPrompt(simulationData);
    
    try {
      const response = await fetch(`${this.baseUrl}/compare`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          prompt,
          context: simulationData,
          type: 'comparison'
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao comparar regimes:', error);
      throw error;
    }
  }

  private buildCompanyAnalysisPrompt(data: any): string {
    return `
Analise os dados fiscais da empresa a seguir e forneça insights sobre:
1. Regime tributário mais adequado
2. Oportunidades de economia
3. Riscos fiscais identificados
4. Recomendações de melhoria

Dados da empresa:
${JSON.stringify(data, null, 2)}

Por favor, forneça uma análise detalhada e recomendações específicas.
    `;
  }

  private buildRecommendationPrompt(data: any): string {
    return `
Com base nos dados tributários fornecidos, gere recomendações específicas para:
1. Otimização da carga tributária
2. Mudança de regime tributário
3. Ações de compliance fiscal
4. Estratégias de economia

Dados tributários:
${JSON.stringify(data, null, 2)}

Forneça recomendações práticas e priorizadas.
    `;
  }

  private buildComparisonPrompt(data: any): string {
    return `
Compare os regimes tributários com base nos dados de simulação:
1. Vantagens e desvantagens de cada regime
2. Impacto financeiro detalhado
3. Cenários de economia
4. Recomendação final justificada

Dados da simulação:
${JSON.stringify(data, null, 2)}

Forneça uma comparação detalhada e conclusão fundamentada.
    `;
  }
}

// Instância singleton do serviço
export const aiService = new AIService();
