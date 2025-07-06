
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from 'lucide-react';

interface TaxDetailsCardsProps {
  results: any;
}

const TaxDetailsCards: React.FC<TaxDetailsCardsProps> = ({ results }) => {
  if (!results) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Detalhes Lucro Real */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Lucro Real - Detalhamento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {results.lucroReal.detalhes.map((detalhe: string, index: number) => (
            <div key={index} className="text-sm text-gray-600 flex items-start space-x-1">
              <Info className="h-3 w-3 mt-0.5 text-gray-400" />
              <span>{detalhe}</span>
            </div>
          ))}
          <div className="pt-2 border-t">
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>R$ {results.lucroReal.total.toLocaleString('pt-BR')}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detalhes Lucro Presumido */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Lucro Presumido - Detalhamento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {results.lucroPresumido.detalhes.map((detalhe: string, index: number) => (
            <div key={index} className="text-sm text-gray-600 flex items-start space-x-1">
              <Info className="h-3 w-3 mt-0.5 text-gray-400" />
              <span>{detalhe}</span>
            </div>
          ))}
          <div className="pt-2 border-t">
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>R$ {results.lucroPresumido.total.toLocaleString('pt-BR')}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detalhes Simples Nacional */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Simples Nacional - Detalhamento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {results.simplesNacional.detalhes.map((detalhe: string, index: number) => (
            <div key={index} className="text-sm text-gray-600 flex items-start space-x-1">
              <Info className="h-3 w-3 mt-0.5 text-gray-400" />
              <span>{detalhe}</span>
            </div>
          ))}
          <div className="pt-2 border-t">
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>R$ {results.simplesNacional.total.toLocaleString('pt-BR')}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxDetailsCards;
