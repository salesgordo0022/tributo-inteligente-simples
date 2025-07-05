
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Lightbulb, TrendingUp, AlertTriangle, CheckCircle, Zap, Target, DollarSign } from 'lucide-react';

interface AIRecommendationsProps {
  data?: any;
}

const AIRecommendations: React.FC<AIRecommendationsProps> = ({ data }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  const runAIAnalysis = () => {
    setIsAnalyzing(true);
    
    // Simular análise da IA
    setTimeout(() => {
      const aiRecommendations = [
        {
          id: 1,
          type: 'regime_change',
          priority: 'high',
          title: 'Mudança para Simples Nacional',
          description: 'Com base na sua receita atual de R$ 2.45M, a migração para o Simples Nacional resultaria em uma economia de R$ 385.400 anuais.',
          impact: 385400,
          confidence: 92,
          timeframe: '12 meses',
          explanation: 'Sua empresa se enquadra perfeitamente no Simples Nacional. A alíquota única de 8.8% é significativamente menor que os 24.5% atuais do Lucro Real.',
          actions: [
            'Solicitar desenquadramento do Lucro Real',
            'Verificar pendências fiscais',
            'Efetuar opção pelo Simples Nacional'
          ]
        },
        {
          id: 2,
          type: 'supplier_optimization',
          priority: 'high',
          title: 'Otimização de Fornecedores',
          description: 'Identificamos 3 fornecedores com alto impacto fiscal. A substituição ou renegociação pode gerar economia de R$ 45.000 anuais.',
          impact: 45000,
          confidence: 87,
          timeframe: '6 meses',
          explanation: 'Fornecedor Alpha Ltda (SP) tem alíquota de 18% enquanto alternativas em MG oferecem 8% com benefícios fiscais regionais.',
          actions: [
            'Avaliar fornecedores alternativos em MG',
            'Negociar condições de substituição tributária',
            'Implementar mudança gradual'
          ]
        },
        {
          id: 3,
          type: 'tax_credit',
          priority: 'medium',
          title: 'Aproveitamento de Créditos PIS/COFINS',
          description: 'Há R$ 28.500 em créditos não aproveitados de PIS/COFINS que podem ser utilizados para reduzir débitos futuros.',
          impact: 28500,
          confidence: 95,
          timeframe: '3 meses',
          explanation: 'Despesas com energia elétrica e fretes estão gerando créditos não contabilizados adequadamente.',
          actions: [
            'Revisar apuração de créditos',
            'Implementar controle sistemático',
            'Compensar débitos pendentes'
          ]
        },
        {
          id: 4,
          type: 'compliance_risk',
          priority: 'medium',
          title: 'Adequação de CST/NCM',
          description: '12 produtos têm classificações fiscais inadequadas, criando risco de autuação e oportunidade de otimização.',
          impact: 15600,
          confidence: 78,
          timeframe: '2 meses',
          explanation: 'NCMs específicos permitem alíquotas reduzidas de ICMS que não estão sendo aproveitadas.',
          actions: [
            'Revisar classificação fiscal dos produtos',
            'Atualizar cadastro no sistema',
            'Treinar equipe de compras'
          ]
        },
        {
          id: 5,
          type: 'incentive',
          priority: 'low',
          title: 'Incentivos Fiscais Regionais',
          description: 'Sua empresa pode se beneficiar de incentivos fiscais específicos do setor industrial em SP.',
          impact: 22000,
          confidence: 65,
          timeframe: '8 meses',
          explanation: 'Programa Pró-Indústria SP oferece redução de até 25% no ICMS para empresas do seu segmento.',
          actions: [
            'Verificar enquadramento no programa',
            'Preparar documentação necessária',
            'Submeter pedido de adesão'
          ]
        }
      ];
      
      setRecommendations(aiRecommendations);
      setIsAnalyzing(false);
    }, 3000);
  };

  useEffect(() => {
    // Auto-executar análise na carga do componente
    if (recommendations.length === 0) {
      runAIAnalysis();
    }
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-700 border-green-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return 'Alta Prioridade';
      case 'medium': return 'Média Prioridade';
      case 'low': return 'Baixa Prioridade';
      default: return 'Indefinido';
    }
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
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-purple-600" />
            <span>Inteligência Tributária</span>
          </CardTitle>
          <CardDescription>
            Recomendações personalizadas baseadas em análise avançada dos seus dados fiscais
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Resumo da Análise */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              R$ {totalImpact.toLocaleString('pt-BR')}
            </div>
            <p className="text-green-100 text-sm">Economia Total Identificada</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{recommendations.length}</div>
            <p className="text-blue-100 text-sm">Oportunidades Detectadas</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {recommendations.filter(r => r.priority === 'high').length}
            </div>
            <p className="text-purple-100 text-sm">Alta Prioridade</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">89%</div>
            <p className="text-orange-100 text-sm">Confiança Média</p>
          </CardContent>
        </Card>
      </div>

      {/* Botão de Nova Análise */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Análise de IA Atualizada</h3>
              <p className="text-sm text-gray-600">
                Última análise realizada há {isAnalyzing ? '0' : '2'} minutos
              </p>
            </div>
            <Button 
              onClick={runAIAnalysis}
              disabled={isAnalyzing}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {isAnalyzing ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Analisando...</span>
                </div>
              ) : (
                <>
                  <Brain className="h-4 w-4 mr-2" />
                  Nova Análise
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Recomendações */}
      <div className="space-y-4">
        {recommendations.map((rec) => (
          <Card key={rec.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    {getTypeIcon(rec.type)}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{rec.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {rec.description}
                    </CardDescription>
                  </div>
                </div>
                <Badge className={getPriorityColor(rec.priority)}>
                  {getPriorityText(rec.priority)}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Métricas */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-lg font-bold text-green-600">
                    R$ {rec.impact.toLocaleString('pt-BR')}
                  </div>
                  <div className="text-sm text-green-700">Economia Anual</div>
                </div>
                
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">{rec.confidence}%</div>
                  <div className="text-sm text-blue-700">Confiança</div>
                </div>
                
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-lg font-bold text-purple-600">{rec.timeframe}</div>
                  <div className="text-sm text-purple-700">Prazo</div>
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
                <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                  Plano de Ação Recomendado
                </h4>
                <div className="space-y-2">
                  {rec.actions.map((action: string, idx: number) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <div className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium">
                        {idx + 1}
                      </div>
                      <div className="text-sm text-gray-700">{action}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ações */}
              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button variant="outline" size="sm">
                  Ver Detalhes
                </Button>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  Implementar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {recommendations.length === 0 && !isAnalyzing && (
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-gray-500">
              <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhuma recomendação disponível no momento.</p>
              <p className="text-sm">Execute uma nova análise para obter insights personalizados.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AIRecommendations;
