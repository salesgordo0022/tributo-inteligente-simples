
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, TrendingUp, DollarSign, Info } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TaxCalculator } from '../utils/taxCalculator';

interface TaxSimulatorProps {
  data?: any;
}

const TaxSimulator: React.FC<TaxSimulatorProps> = ({ data }) => {
  const [revenue, setRevenue] = useState(2450000);
  const [costs, setCosts] = useState(1800000);
  const [payroll, setPayroll] = useState(300000);
  const [sector, setSector] = useState<'comercio' | 'industria' | 'servicos'>('comercio');
  const [state, setState] = useState('SP');
  const [isCalculating, setIsCalculating] = useState(false);
  const [results, setResults] = useState<any>(null);

  const calculator = new TaxCalculator();

  const calculateTaxes = () => {
    setIsCalculating(true);
    
    setTimeout(() => {
      const companyData = {
        revenue,
        costs,
        payroll,
        sector,
        state
      };

      const calculationResults = calculator.calculateDetailedTaxes(companyData);
      setResults(calculationResults);
      setIsCalculating(false);
    }, 2000);
  };

  const pieData = results ? [
    { name: 'IRPJ', value: results.lucroReal.irpj + results.lucroReal.irpjAdicional, color: '#374151' },
    { name: 'CSLL', value: results.lucroReal.csll, color: '#4B5563' },
    { name: 'PIS', value: results.lucroReal.pis, color: '#6B7280' },
    { name: 'COFINS', value: results.lucroReal.cofins, color: '#9CA3AF' },
    { name: 'ICMS', value: results.lucroReal.icms, color: '#D1D5DB' },
    { name: 'INSS', value: results.lucroReal.inss, color: '#E5E7EB' }
  ] : [];

  const barData = results ? [
    {
      regime: 'Lucro Real',
      total: results.lucroReal.total,
      color: '#374151'
    },
    {
      regime: 'Lucro Presumido',
      total: results.lucroPresumido.total,
      color: '#6B7280'
    },
    {
      regime: 'Simples Nacional',
      total: results.simplesNacional.total,
      color: '#9CA3AF'
    }
  ] : [];

  const estados = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="h-5 w-5 text-gray-600" />
            <span>Simulador Tributário Avançado</span>
          </CardTitle>
          <CardDescription>
            Compare os regimes tributários com cálculos precisos e configuráveis
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Formulário de entrada */}
        <Card>
          <CardHeader>
            <CardTitle>Dados da Empresa</CardTitle>
            <CardDescription>
              Informe os dados para simulação tributária detalhada
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
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
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="payroll">Folha de Pagamento Anual</Label>
                <Input
                  id="payroll"
                  type="number"
                  value={payroll}
                  onChange={(e) => setPayroll(Number(e.target.value))}
                  placeholder="Digite a folha de pagamento"
                />
              </div>

              <div className="space-y-2">
                <Label>Estado</Label>
                <Select value={state} onValueChange={setState}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {estados.map(uf => (
                      <SelectItem key={uf} value={uf}>{uf}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Setor de Atividade</Label>
              <Select value={sector} onValueChange={(value: any) => setSector(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="comercio">Comércio</SelectItem>
                  <SelectItem value="industria">Indústria</SelectItem>
                  <SelectItem value="servicos">Serviços</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Lucro Bruto:</span>
                <span className="font-semibold text-gray-800">
                  R$ {(revenue - costs).toLocaleString('pt-BR')}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Margem:</span>
                <span className="font-semibold text-gray-800">
                  {((revenue - costs) / revenue * 100).toFixed(1)}%
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
        )}
      </div>

      {/* Detalhamentos */}
      {results && (
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
      )}

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
                  <Tooltip formatter={(value) => `R$ ${Number(value).toLocaleString('pt-BR')}`} />
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
                  <Tooltip formatter={(value) => `R$ ${Number(value).toLocaleString('pt-BR')}`} />
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
