
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Equal, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface RegimeComparatorProps {
  data?: any;
}

const RegimeComparator: React.FC<RegimeComparatorProps> = ({ data }) => {
  const regimes = [
    {
      name: 'Lucro Real',
      revenue: 2450000,
      taxes: 601000,
      effectiveRate: 24.5,
      pros: ['Dedução total das despesas', 'Adequado para empresas com alta margem'],
      cons: ['Maior complexidade contábil', 'Apuração mensal obrigatória'],
      status: 'current',
      color: 'red'
    },
    {
      name: 'Lucro Presumido',
      revenue: 2450000,  
      taxes: 485000,
      effectiveRate: 19.8,
      pros: ['Simplicidade na apuração', 'Menor custo contábil'],
      cons: ['Limitação de receita', 'Presunção de lucro fixo'],
      status: 'recommended',
      color: 'green'
    },
    {
      name: 'Simples Nacional',
      revenue: 2450000,
      taxes: 215600,
      effectiveRate: 8.8,
      pros: ['Alíquota única', 'Simplificação tributária'],
      cons: ['Limitação de receita R$ 4.8M', 'Restrições de atividade'],
      status: 'best',
      color: 'blue'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'current':
        return <Equal className="h-4 w-4" />;
      case 'recommended':
        return <TrendingUp className="h-4 w-4" />;
      case 'best':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current':
        return 'bg-gray-100 text-gray-700 border-gray-300';
      case 'recommended':
        return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'best':
        return 'bg-green-100 text-green-700 border-green-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'current':
        return 'Regime Atual';
      case 'recommended':
        return 'Recomendado';
      case 'best':
        return 'Melhor Opção';
      default:
        return 'Analisar';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <span>Comparação de Regimes Tributários</span>
          </CardTitle>
          <CardDescription>
            Análise detalhada dos regimes disponíveis para sua empresa
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {regimes.map((regime, index) => (
          <Card 
            key={regime.name} 
            className={`transition-all hover:shadow-lg ${
              regime.status === 'best' ? 'ring-2 ring-green-200 bg-green-50' :
              regime.status === 'recommended' ? 'ring-2 ring-orange-200 bg-orange-50' :
              'hover:ring-2 hover:ring-gray-200'
            }`}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{regime.name}</CardTitle>
                <Badge className={getStatusColor(regime.status)}>
                  {getStatusIcon(regime.status)}
                  <span className="ml-1">{getStatusText(regime.status)}</span>
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Métricas principais */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Receita Bruta</span>
                  <span className="font-semibold">
                    R$ {regime.revenue.toLocaleString('pt-BR')}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total de Tributos</span>
                  <span className="font-semibold text-red-600">
                    R$ {regime.taxes.toLocaleString('pt-BR')}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Alíquota Efetiva</span>
                  <span className="font-bold text-lg">
                    {regime.effectiveRate}%
                  </span>
                </div>

                {/* Economia/Diferença */}
                {regime.status === 'best' && (
                  <div className="p-3 bg-green-100 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-2">
                      <TrendingDown className="h-4 w-4 text-green-600" />
                      <span className="text-green-700 font-medium text-sm">
                        Economia de R$ {(601000 - regime.taxes).toLocaleString('pt-BR')} anuais
                      </span>
                    </div>
                  </div>
                )}

                {regime.status === 'recommended' && (
                  <div className="p-3 bg-orange-100 rounded-lg border border-orange-200">
                    <div className="flex items-center space-x-2">
                      <TrendingDown className="h-4 w-4 text-orange-600" />
                      <span className="text-orange-700 font-medium text-sm">
                        Economia de R$ {(601000 - regime.taxes).toLocaleString('pt-BR')} anuais
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Vantagens */}
              <div>
                <h4 className="font-medium text-green-700 mb-2 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Vantagens
                </h4>
                <ul className="space-y-1">
                  {regime.pros.map((pro, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Desvantagens */}
              <div>
                <h4 className="font-medium text-red-700 mb-2 flex items-center">
                  <XCircle className="h-4 w-4 mr-1" />
                  Desvantagens
                </h4>
                <ul className="space-y-1">
                  {regime.cons.map((con, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Barra de progresso da alíquota */}
              <div className="pt-2">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Alíquota</span>
                  <span>{regime.effectiveRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      regime.effectiveRate < 15 ? 'bg-green-500' :
                      regime.effectiveRate < 25 ? 'bg-orange-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${(regime.effectiveRate / 30) * 100}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Resumo da análise */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-green-700">Resumo da Análise</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">R$ 385.400</div>
              <div className="text-sm text-gray-600">Economia Máxima Anual</div>
              <div className="text-xs text-gray-500">Simples Nacional vs Lucro Real</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">15.7%</div>
              <div className="text-sm text-gray-600">Redução da Carga</div>
              <div className="text-xs text-gray-500">Diferença percentual</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">12 meses</div>
              <div className="text-sm text-gray-600">Prazo p/ Mudança</div>
              <div className="text-xs text-gray-500">Próxima oportunidade</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegimeComparator;
