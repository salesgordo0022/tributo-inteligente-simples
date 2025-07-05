
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, TrendingUp, TrendingDown, Equal } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface TaxSimulatorProps {
  data?: any;
}

const TaxSimulator: React.FC<TaxSimulatorProps> = ({ data }) => {
  const [simulation, setSimulation] = useState({
    revenue: '2450000',
    activity: 'comercio',
    state: 'SP',
    employees: '25',
    payroll: '180000'
  });

  const [results, setResults] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateTaxes = () => {
    setIsCalculating(true);
    
    setTimeout(() => {
      const revenue = parseFloat(simulation.revenue);
      
      // Simulação dos cálculos tributários
      const lucroReal = {
        name: 'Lucro Real',
        irpj: revenue * 0.15,
        csll: revenue * 0.09,
        pis: revenue * 0.0165,
        cofins: revenue * 0.076,
        icms: revenue * 0.18,
        total: 0
      };
      lucroReal.total = lucroReal.irpj + lucroReal.csll + lucroReal.pis + lucroReal.cofins + lucroReal.icms;

      const lucroPresumido = {
        name: 'Lucro Presumido',
        irpj: revenue * 0.048,
        csll: revenue * 0.0288,
        pis: revenue * 0.0065,
        cofins: revenue * 0.03,
        icms: revenue * 0.18,
        total: 0
      };
      lucroPresumido.total = lucroPresumido.irpj + lucroPresumido.csll + lucroPresumido.pis + lucroPresumido.cofins + lucroPresumido.icms;

      const simplesNacional = {
        name: 'Simples Nacional',
        das: revenue * 0.088,
        total: revenue * 0.088
      };

      setResults({
        lucroReal,
        lucroPresumido,
        simplesNacional,
        bestOption: lucroPresumido.total < lucroReal.total && lucroPresumido.total < simplesNacional.total ? 'presumido' :
                   simplesNacional.total < lucroReal.total ? 'simples' : 'real',
        savings: Math.min(lucroReal.total, lucroPresumido.total, simplesNacional.total)
      });
      
      setIsCalculating(false);
    }, 1500);
  };

  const pieData = results ? [
    { name: 'IRPJ', value: results.lucroReal.irpj, color: '#3B82F6' },
    { name: 'CSLL', value: results.lucroReal.csll, color: '#10B981' },
    { name: 'PIS', value: results.lucroReal.pis, color: '#F59E0B' },
    { name: 'COFINS', value: results.lucroReal.cofins, color: '#EF4444' },
    { name: 'ICMS', value: results.lucroReal.icms, color: '#8B5CF6' }
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
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="h-5 w-5 text-blue-600" />
            <span>Simulador Tributário</span>
          </CardTitle>
          <CardDescription>
            Compare os regimes tributários e encontre a melhor opção para sua empresa
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Formulário de Simulação */}
        <Card>
          <CardHeader>
            <CardTitle>Dados da Empresa</CardTitle>
            <CardDescription>
              Informe os dados básicos para simulação
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="revenue">Receita Bruta Anual (R$)</Label>
              <Input
                id="revenue"
                type="number"
                value={simulation.revenue}
                onChange={(e) => setSimulation(prev => ({ ...prev, revenue: e.target.value }))}
                placeholder="2.450.000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="activity">Atividade Principal</Label>
              <Select value={simulation.activity} onValueChange={(value) => setSimulation(prev => ({ ...prev, activity: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a atividade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="comercio">Comércio</SelectItem>
                  <SelectItem value="industria">Indústria</SelectItem>
                  <SelectItem value="servicos">Serviços</SelectItem>
                  <SelectItem value="construcao">Construção Civil</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">Estado</Label>
              <Select value={simulation.state} onValueChange={(value) => setSimulation(prev => ({ ...prev, state: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SP">São Paulo</SelectItem>
                  <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                  <SelectItem value="MG">Minas Gerais</SelectItem>
                  <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                  <SelectItem value="PR">Paraná</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="employees">Funcionários</Label>
                <Input
                  id="employees"
                  type="number"
                  value={simulation.employees}
                  onChange={(e) => setSimulation(prev => ({ ...prev, employees: e.target.value }))}
                  placeholder="25"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="payroll">Folha Anual (R$)</Label>
                <Input
                  id="payroll"
                  type="number"
                  value={simulation.payroll}
                  onChange={(e) => setSimulation(prev => ({ ...prev, payroll: e.target.value }))}
                  placeholder="180.000"
                />
              </div>
            </div>

            <Button 
              onClick={calculateTaxes}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
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
            <CardContent>
              <div className="space-y-4">
                {/* Lucro Real */}
                <div className="p-4 border rounded-lg bg-red-50 border-red-200">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-red-700">Lucro Real</h3>
                    <span className="text-lg font-bold text-red-700">
                      R$ {results.lucroReal.total.toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-red-600">
                    <div>IRPJ: R$ {results.lucroReal.irpj.toLocaleString('pt-BR')}</div>
                    <div>CSLL: R$ {results.lucroReal.csll.toLocaleString('pt-BR')}</div>
                    <div>PIS: R$ {results.lucroReal.pis.toLocaleString('pt-BR')}</div>
                    <div>COFINS: R$ {results.lucroReal.cofins.toLocaleString('pt-BR')}</div>
                  </div>
                </div>

                {/* Lucro Presumido */}
                <div className="p-4 border rounded-lg bg-orange-50 border-orange-200">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-orange-700">Lucro Presumido</h3>
                    <span className="text-lg font-bold text-orange-700">
                      R$ {results.lucroPresumido.total.toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-orange-600">
                    <div>IRPJ: R$ {results.lucroPresumido.irpj.toLocaleString('pt-BR')}</div>
                    <div>CSLL: R$ {results.lucroPresumido.csll.toLocaleString('pt-BR')}</div>
                    <div>PIS: R$ {results.lucroPresumido.pis.toLocaleString('pt-BR')}</div>
                    <div>COFINS: R$ {results.lucroPresumido.cofins.toLocaleString('pt-BR')}</div>
                  </div>
                </div>

                {/* Simples Nacional */}
                <div className="p-4 border rounded-lg bg-green-50 border-green-200">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-green-700">Simples Nacional</h3>
                    <span className="text-lg font-bold text-green-700">
                      R$ {results.simplesNacional.total.toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <div className="text-xs text-green-600 mt-2">
                    DAS: R$ {results.simplesNacional.das.toLocaleString('pt-BR')}
                  </div>
                </div>

                {/* Recomendação */}
                <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <h3 className="font-semibold text-gray-800">Melhor Opção</h3>
                  </div>
                  <p className="text-green-700 font-medium">
                    {results.bestOption === 'simples' ? 'Simples Nacional' :
                     results.bestOption === 'presumido' ? 'Lucro Presumido' : 'Lucro Real'}
                  </p>
                  <p className="text-sm text-gray-600">
                    Economia potencial de R$ {(Math.max(...[results.lucroReal.total, results.lucroPresumido.total, results.simplesNacional.total]) - Math.min(...[results.lucroReal.total, results.lucroPresumido.total, results.simplesNacional.total])).toLocaleString('pt-BR')} anuais
                  </p>
                </div>
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
              <CardTitle>Composição dos Tributos</CardTitle>
              <CardDescription>Lucro Real - Distribuição por imposto</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => `R$ ${value.toLocaleString('pt-BR')}`} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Comparação entre Regimes</CardTitle>
              <CardDescription>Total de tributos por regime</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="regime" />
                  <YAxis tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(value: any) => `R$ ${value.toLocaleString('pt-BR')}`} />
                  <Bar dataKey="total" fill="#8884d8" />
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
