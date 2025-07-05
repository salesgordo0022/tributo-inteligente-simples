import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TaxSimulatorProps {
  data?: any;
}

interface TaxResults {
  lucroReal: {
    irpj: number;
    csll: number;
    pis: number;
    cofins: number;
    icms: number;
    total: number;
  };
  lucroPresumido: {
    irpj: number;
    csll: number;
    pis: number;
    cofins: number;
    icms: number;
    total: number;
  };
  simplesNacional: {
    total: number;
  };
  bestOption: string;
}

const TaxSimulator: React.FC<TaxSimulatorProps> = ({ data }) => {
  const [revenue, setRevenue] = useState(2450000);
  const [costs, setCosts] = useState(1800000);
  const [isCalculating, setIsCalculating] = useState(false);
  const [results, setResults] = useState<TaxResults | null>(null);

  const calculateTaxes = () => {
    setIsCalculating(true);
    
    // Simulação de cálculo
    setTimeout(() => {
      const profit = revenue - costs;
      
      // Lucro Real
      const lucroReal = {
        irpj: profit * 0.15,
        csll: profit * 0.09,
        pis: revenue * 0.0165,
        cofins: revenue * 0.076,
        icms: revenue * 0.18,
        total: 0
      };
      lucroReal.total = lucroReal.irpj + lucroReal.csll + lucroReal.pis + lucroReal.cofins + lucroReal.icms;

      // Lucro Presumido
      const lucroPresumido = {
        irpj: revenue * 0.15 * 0.32,
        csll: revenue * 0.09 * 0.32,
        pis: revenue * 0.0165,
        cofins: revenue * 0.076,
        icms: revenue * 0.18,
        total: 0
      };
      lucroPresumido.total = lucroPresumido.irpj + lucroPresumido.csll + lucroPresumido.pis + lucroPresumido.cofins + lucroPresumido.icms;

      // Simples Nacional
      const simplesNacional = {
        total: revenue * 0.088
      };

      // Determinar melhor opção
      const totals = [lucroReal.total, lucroPresumido.total, simplesNacional.total];
      const minTotal = Math.min(...totals);
      let bestOption = 'real';
      if (minTotal === lucroPresumido.total) bestOption = 'presumido';
      if (minTotal === simplesNacional.total) bestOption = 'simples';

      setResults({
        lucroReal,
        lucroPresumido,
        simplesNacional,
        bestOption
      });
      setIsCalculating(false);
    }, 2000);
  };

  const pieData = results ? [
    { name: 'IRPJ', value: results.lucroReal.irpj, color: '#6B7280' },
    { name: 'CSLL', value: results.lucroReal.csll, color: '#9CA3AF' },
    { name: 'PIS', value: results.lucroReal.pis, color: '#D1D5DB' },
    { name: 'COFINS', value: results.lucroReal.cofins, color: '#E5E7EB' },
    { name: 'ICMS', value: results.lucroReal.icms, color: '#F3F4F6' }
  ] : [];

  const barData = results ? [
    {
      regime: 'Lucro Real',
      total: results.lucroReal.total
    },
    {
      regime: 'Lucro Presumido',
      total: results.lucroPresumido.total
    },
    {
      regime: 'Simples Nacional',
      total: results.simplesNacional.total
    }
  ] : [];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="h-5 w-5 text-gray-600" />
            <span>Simulador Tributário</span>
          </CardTitle>
          <CardDescription>
            Compare os regimes tributários e encontre a melhor opção para sua empresa
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Formulário de entrada */}
        <Card>
          <CardHeader>
            <CardTitle>Dados da Empresa</CardTitle>
            <CardDescription>
              Informe os valores para calcular os tributos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="revenue">Receita Bruta Anual</Label>
              <Input
                id="revenue"
                type="number"
                value={revenue}
                onChange={(e) => setRevenue(Number(e.target.value))}
                placeholder="Digite a receita bruta"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="costs">Custos e Despesas</Label>
              <Input
                id="costs"
                type="number"
                value={costs}
                onChange={(e) => setCosts(Number(e.target.value))}
                placeholder="Digite os custos e despesas"
              />
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Lucro Estimado:</span>
                <span className="font-semibold text-gray-800">
                  R$ {(revenue - costs).toLocaleString('pt-BR')}
                </span>
              </div>
            </div>

            <Button 
              onClick={calculateTaxes}
              className="w-full bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900"
              disabled={isCalculating}
            >
              {isCalculating ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Calculando...</span>
                </div>
              ) : (
                <>
                  <Calculator className="h-4 w-4 mr-2" />
                  Simular Tributos
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Resultados da Simulação */}
        {results && (
          <Card>
            <CardHeader>
              <CardTitle>Resultado da Simulação</CardTitle>
              <CardDescription>
                Comparação entre os regimes tributários
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-800">
                    R$ {results.lucroReal.total.toLocaleString('pt-BR')}
                  </div>
                  <div className="text-sm text-gray-600">Lucro Real</div>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-800">
                    R$ {results.lucroPresumido.total.toLocaleString('pt-BR')}
                  </div>
                  <div className="text-sm text-gray-600">Lucro Presumido</div>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-800">
                    R$ {results.simplesNacional.total.toLocaleString('pt-BR')}
                  </div>
                  <div className="text-sm text-gray-600">Simples Nacional</div>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-gray-600" />
                  <h3 className="font-semibold text-gray-800">Melhor Opção</h3>
                </div>
                <p className="text-gray-700 font-medium">
                  {results.bestOption === 'simples' ? 'Simples Nacional' :
                   results.bestOption === 'presumido' ? 'Lucro Presumido' : 'Lucro Real'}
                </p>
                <p className="text-sm text-gray-600">
                  Economia potencial de R$ {(Math.max(...[results.lucroReal.total, results.lucroPresumido.total, results.simplesNacional.total]) - Math.min(...[results.lucroReal.total, results.lucroPresumido.total, results.simplesNacional.total])).toLocaleString('pt-BR')} anuais
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Gráficos */}
      {results && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Composição dos Tributos (Lucro Real)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Comparação entre Regimes</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="regime" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="total" fill="#6B7280" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default TaxSimulator;
