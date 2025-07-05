import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Target, TrendingUp, DollarSign, AlertTriangle, Zap, Lightbulb, RefreshCw, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface AIRecommendationsProps {
  data?: any;
}

interface Recommendation {
  id: string;
  title: string;
  description: string;
  type: string;
  impact: number;
  confidence: number;
  timeframe: string;
  priority: 'low' | 'medium' | 'high';
  explanation: string;
  actionPlan: string[];
  status: 'pending' | 'in_progress' | 'completed';
}

const AIRecommendations: React.FC<AIRecommendationsProps> = ({ data }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([
    {
      id: '1',
      title: 'Migração para Simples Nacional',
      description: 'Sua empresa pode se beneficiar da migração para o Simples Nacional',
      type: 'regime_change',
      impact: 385400,
      confidence: 95,
      timeframe: '3 meses',
      priority: 'high',
      explanation: 'Baseado na análise da receita bruta e estrutura de custos, a migração para o Simples Nacional resultaria em uma economia significativa de R$ 385.400 anuais, representando uma redução de 15.7% na carga tributária total.',
      actionPlan: [
        'Verificar elegibilidade para o Simples Nacional',
        'Solicitar opção pelo regime no portal da Receita Federal',
        'Ajustar processos contábeis para o novo regime',
        'Treinar equipe sobre as novas obrigações'
      ],
      status: 'pending'
    },
    {
      id: '2',
      title: 'Otimização de Fornecedores',
      description: 'Identificamos 15 fornecedores com alto impacto fiscal',
      type: 'supplier_optimization',
      impact: 125000,
      confidence: 87,
      timeframe: '6 meses',
      priority: 'high',
      explanation: 'A análise dos fornecedores revelou oportunidades de economia através da substituição de fornecedores com alta carga tributária por alternativas mais eficientes, mantendo a qualidade dos produtos.',
      actionPlan: [
        'Auditar fornecedores com alíquota superior a 18%',
        'Negociar com fornecedores atuais para redução de preços',
        'Identificar fornecedores alternativos com melhor perfil fiscal',
        'Implementar processo de avaliação fiscal de fornecedores'
      ],
      status: 'in_progress'
    },
    {
      id: '3',
      title: 'Aproveitamento de Créditos Fiscais',
      description: 'R$ 45.000 em créditos fiscais não aproveitados',
      type: 'tax_credit',
      impact: 45000,
      confidence: 92,
      timeframe: '1 mês',
      priority: 'medium',
      explanation: 'Identificamos créditos fiscais acumulados que podem ser aproveitados imediatamente, incluindo créditos de ICMS, PIS e COFINS que não foram compensados adequadamente.',
      actionPlan: [
        'Auditar créditos fiscais acumulados',
        'Preparar pedidos de restituição',
        'Implementar sistema de controle de créditos',
        'Treinar equipe sobre aproveitamento de créditos'
      ],
      status: 'pending'
    },
    {
      id: '4',
      title: 'Adequação de NCMs',
      description: 'Correção de códigos NCM pode gerar economia',
      type: 'compliance_risk',
      impact: 32000,
      confidence: 78,
      timeframe: '2 meses',
      priority: 'medium',
      explanation: 'Identificamos inconsistências nos códigos NCM utilizados, que podem resultar em tributação inadequada. A correção desses códigos pode gerar economia e reduzir riscos fiscais.',
      actionPlan: [
        'Auditar todos os códigos NCM utilizados',
        'Consultar tabela oficial de NCMs',
        'Corrigir códigos incorretos',
        'Implementar processo de validação de NCMs'
      ],
      status: 'pending'
    },
    {
      id: '5',
      title: 'Incentivos Fiscais Regionais',
      description: 'Aproveitamento de incentivos disponíveis',
      type: 'incentive',
      impact: 28000,
      confidence: 85,
      timeframe: '4 meses',
      priority: 'low',
      explanation: 'Existem incentivos fiscais regionais disponíveis para sua atividade que não estão sendo aproveitados. A implementação desses incentivos pode gerar economia adicional.',
      actionPlan: [
        'Pesquisar incentivos fiscais disponíveis na região',
        'Avaliar elegibilidade para cada incentivo',
        'Preparar documentação necessária',
        'Solicitar aprovação dos incentivos'
      ],
      status: 'pending'
    }
  ]);

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 3000);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'regime_change': return <Target className="h-5 w-5" />;
      case 'supplier_optimization': return <TrendingUp className="h-5 w-5" />;
      case 'tax_credit': return <DollarSign className="h-5 w-5" />;
      case 'compliance_risk': return <AlertTriangle className="h-5 w-5" />;
      case 'incentive': return <Zap className="h-5 w-5" />;
      default: return <Lightbulb className="h-5 w-5" />;
    }
  };

  const totalImpact = recommendations.reduce((sum, rec) => sum + rec.impact, 0);

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-gray-600" />
            <span>Inteligência Tributária</span>
          </CardTitle>
          <CardDescription>
            Recomendações personalizadas baseadas em análise avançada dos seus dados fiscais
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Resumo da Análise */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-gray-600 to-gray-700 text-white">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              R$ {totalImpact.toLocaleString('pt-BR')}
            </div>
            <p className="text-gray-300 text-sm">Economia Total Identificada</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-gray-500 to-gray-600 text-white">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{recommendations.length}</div>
            <p className="text-gray-300 text-sm">Oportunidades Detectadas</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-gray-700 to-gray-800 text-white">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {recommendations.filter(r => r.priority === 'high').length}
            </div>
            <p className="text-gray-300 text-sm">Alta Prioridade</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-gray-400 to-gray-500 text-white">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">89%</div>
            <p className="text-gray-300 text-sm">Confiança Média</p>
          </CardContent>
        </Card>
      </div>

      {/* Botão de Nova Análise */}
      <Card>
        <CardContent className="pt-6">
          <Button 
            onClick={startAnalysis}
            className="w-full bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900"
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Analisando dados...</span>
              </div>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Nova Análise IA
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Lista de Recomendações */}
      <div className="space-y-4">
        {recommendations.map((rec) => (
          <Card key={rec.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    {getTypeIcon(rec.type)}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{rec.title}</CardTitle>
                    <CardDescription>{rec.description}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={rec.priority === 'high' ? 'default' : 'secondary'}>
                    {rec.priority === 'high' ? 'Alta' : rec.priority === 'medium' ? 'Média' : 'Baixa'}
                  </Badge>
                  {rec.status === 'completed' && <CheckCircle className="h-4 w-4 text-gray-600" />}
                  {rec.status === 'in_progress' && <Clock className="h-4 w-4 text-gray-600" />}
                  {rec.status === 'pending' && <AlertCircle className="h-4 w-4 text-gray-600" />}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Métricas */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-600">
                    R$ {rec.impact.toLocaleString('pt-BR')}
                  </div>
                  <div className="text-sm text-gray-700">Economia Anual</div>
                </div>
                
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-600">{rec.confidence}%</div>
                  <div className="text-sm text-gray-700">Confiança</div>
                </div>
                
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-600">{rec.timeframe}</div>
                  <div className="text-sm text-gray-700">Prazo</div>
                </div>
              </div>

              {/* Explicação da IA */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Brain className="h-4 w-4 text-gray-600 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-800 mb-1">Análise da IA</div>
                    <div className="text-sm text-gray-700">{rec.explanation}</div>
                  </div>
                </div>
              </div>

              {/* Plano de Ação */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Plano de Ação</h4>
                <ul className="space-y-1">
                  {rec.actionPlan.map((action, idx) => (
                    <li key={idx} className="text-sm text-gray-700 flex items-start">
                      <span className="text-gray-500 mr-2">•</span>
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AIRecommendations;
