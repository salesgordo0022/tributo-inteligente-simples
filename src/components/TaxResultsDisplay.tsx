
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from 'lucide-react';

interface TaxResultsDisplayProps {
  results: any;
  revenue: number;
}

const TaxResultsDisplay: React.FC<TaxResultsDisplayProps> = ({ results, revenue }) => {
  if (!results) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resultado da Simulação</CardTitle>
        <CardDescription>
          Comparação detalhada entre os regimes tributários
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`text-center p-4 rounded-lg ${results.bestOption === 'lucroReal' ? 'bg-green-50 border-2 border-green-200' : 'bg-gray-50'}`}>
            <div className="text-lg font-bold text-gray-800">
              R$ {results.lucroReal.total.toLocaleString('pt-BR')}
            </div>
            <div className="text-sm text-gray-600">Lucro Real</div>
            {results.bestOption === 'lucroReal' && (
              <div className="text-xs text-green-600 font-medium">✓ Melhor opção</div>
            )}
          </div>
          
          <div className={`text-center p-4 rounded-lg ${results.bestOption === 'lucroPresumido' ? 'bg-green-50 border-2 border-green-200' : 'bg-gray-50'}`}>
            <div className="text-lg font-bold text-gray-800">
              R$ {results.lucroPresumido.total.toLocaleString('pt-BR')}
            </div>
            <div className="text-sm text-gray-600">Lucro Presumido</div>
            {results.bestOption === 'lucroPresumido' && (
              <div className="text-xs text-green-600 font-medium">✓ Melhor opção</div>
            )}
          </div>
          
          <div className={`text-center p-4 rounded-lg ${results.bestOption === 'simplesNacional' ? 'bg-green-50 border-2 border-green-200' : 'bg-gray-50'}`}>
            <div className="text-lg font-bold text-gray-800">
              R$ {results.simplesNacional.total.toLocaleString('pt-BR')}
            </div>
            <div className="text-sm text-gray-600">Simples Nacional</div>
            <div className="text-xs text-gray-500">{results.simplesNacional.faixa}</div>
            {results.bestOption === 'simplesNacional' && (
              <div className="text-xs text-green-600 font-medium">✓ Melhor opção</div>
            )}
          </div>
        </div>

        <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <h3 className="font-semibold text-green-800">Economia Potencial</h3>
          </div>
          <p className="text-green-700 font-medium text-lg">
            R$ {results.economy.toLocaleString('pt-BR')} anuais
          </p>
          <p className="text-sm text-green-600">
            {((results.economy / revenue) * 100).toFixed(2)}% da receita bruta
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaxResultsDisplay;
