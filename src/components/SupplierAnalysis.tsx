import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, TrendingUp, AlertTriangle, CheckCircle, Filter, Search } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface SupplierAnalysisProps {
  data?: any;
}

interface Supplier {
  id: string;
  name: string;
  cnpj: string;
  state: string;
  totalPurchases: number;
  taxRate: number;
  taxImpact: number;
  category: 'high' | 'medium' | 'low';
  status: 'active' | 'inactive';
}

const SupplierAnalysis: React.FC<SupplierAnalysisProps> = ({ data }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const suppliers: Supplier[] = [
    {
      id: '1',
      name: 'Alpha Comércio Ltda',
      cnpj: '12.345.678/0001-90',
      state: 'SP',
      totalPurchases: 450000,
      taxRate: 18.0,
      taxImpact: 81000,
      category: 'high',
      status: 'active'
    },
    {
      id: '2',
      name: 'Beta Distribuidora',
      cnpj: '23.456.789/0001-01',
      state: 'MG',
      totalPurchases: 320000,
      taxRate: 8.0,
      taxImpact: 25600,
      category: 'low',
      status: 'active'
    },
    {
      id: '3',
      name: 'Gamma Industrial',
      cnpj: '34.567.890/0001-12',
      state: 'RS',
      totalPurchases: 280000,
      taxRate: 17.0,
      taxImpact: 47600,
      category: 'high',
      status: 'active'
    },
    {
      id: '4',
      name: 'Delta Comercial',
      cnpj: '45.678.901/0001-23',
      state: 'PR',
      totalPurchases: 180000,
      taxRate: 12.0,
      taxImpact: 21600,
      category: 'medium',
      status: 'inactive'
    },
    {
      id: '5',
      name: 'Epsilon Ltda',
      cnpj: '56.789.012/0001-34',
      state: 'SC',
      totalPurchases: 220000,
      taxRate: 7.0,
      taxImpact: 15400,
      category: 'low',
      status: 'active'
    }
  ];

  const totalPurchases = suppliers.reduce((sum, s) => sum + s.totalPurchases, 0);
  const totalTaxImpact = suppliers.reduce((sum, s) => sum + s.taxImpact, 0);
  const averageTaxRate = suppliers.reduce((sum, s) => sum + s.taxRate, 0) / suppliers.length;

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesCategory = selectedCategory === 'all' || supplier.category === selectedCategory;
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.cnpj.includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'high': return 'bg-gray-800 text-white';
      case 'medium': return 'bg-gray-600 text-white';
      case 'low': return 'bg-gray-400 text-white';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'high': return 'Alto Impacto';
      case 'medium': return 'Médio Impacto';
      case 'low': return 'Baixo Impacto';
      default: return 'Indefinido';
    }
  };

  const chartData = suppliers.map(s => ({
    name: s.name.substring(0, 10) + '...',
    purchases: s.totalPurchases,
    taxImpact: s.taxImpact
  }));

  const pieData = [
    { name: 'Alto Impacto', value: suppliers.filter(s => s.category === 'high').length, color: '#374151' },
    { name: 'Médio Impacto', value: suppliers.filter(s => s.category === 'medium').length, color: '#6B7280' },
    { name: 'Baixo Impacto', value: suppliers.filter(s => s.category === 'low').length, color: '#9CA3AF' }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building2 className="h-5 w-5 text-gray-600" />
            <span>Análise de Fornecedores</span>
          </CardTitle>
          <CardDescription>
            Identifique oportunidades de economia através da otimização fiscal de fornecedores
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Resumo Executivo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-gray-600">
              R$ {totalPurchases.toLocaleString('pt-BR')}
            </div>
            <p className="text-sm text-gray-600">Total de Compras</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-gray-600">
              R$ {totalTaxImpact.toLocaleString('pt-BR')}
            </div>
            <p className="text-sm text-gray-600">Impacto Tributário</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-gray-600">
              {averageTaxRate.toFixed(1)}%
            </div>
            <p className="text-sm text-gray-600">Alíquota Média</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-gray-600">
              R$ 45.000
            </div>
            <p className="text-sm text-gray-600">Economia Potencial</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros e Busca</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar fornecedor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('all')}
                className="bg-gray-600 hover:bg-gray-700"
              >
                Todos
              </Button>
              <Button
                variant={selectedCategory === 'high' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('high')}
                className="bg-gray-800 hover:bg-gray-900"
              >
                Alto Impacto
              </Button>
              <Button
                variant={selectedCategory === 'medium' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('medium')}
                className="bg-gray-600 hover:bg-gray-700"
              >
                Médio Impacto
              </Button>
              <Button
                variant={selectedCategory === 'low' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('low')}
                className="bg-gray-400 hover:bg-gray-500"
              >
                Baixo Impacto
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Fornecedores */}
      <Card>
        <CardHeader>
          <CardTitle>Fornecedores ({filteredSuppliers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredSuppliers.map((supplier) => (
              <div key={supplier.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Building2 className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{supplier.name}</h3>
                      <p className="text-sm text-gray-600">{supplier.cnpj} • {supplier.state}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="font-semibold text-gray-800">
                        R$ {supplier.totalPurchases.toLocaleString('pt-BR')}
                      </div>
                      <div className="text-sm text-gray-600">Compras</div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-semibold text-gray-800">
                        {supplier.taxRate}%
                      </div>
                      <div className="text-sm text-gray-600">Alíquota</div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-semibold text-gray-800">
                        R$ {supplier.taxImpact.toLocaleString('pt-BR')}
                      </div>
                      <div className="text-sm text-gray-600">Impacto Fiscal</div>
                    </div>
                    
                    <Badge className={getCategoryColor(supplier.category)}>
                      {getCategoryText(supplier.category)}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Compras por Fornecedor</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="purchases" fill="#6B7280" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Impacto Fiscal</CardTitle>
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
      </div>

      {/* Recomendações */}
      <Card className="bg-gray-50 border-gray-200">
        <CardHeader>
          <CardTitle>Recomendações de Otimização</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg border border-gray-200">
              <div className="flex items-start space-x-3">
                <TrendingUp className="h-5 w-5 text-gray-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-800">Substituição de Fornecedores</h4>
                  <p className="text-sm text-gray-600">
                    Identificamos 3 fornecedores com alta carga tributária que podem ser substituídos por alternativas mais eficientes, gerando economia de R$ 32.000 anuais.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-white rounded-lg border border-gray-200">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-gray-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-800">Negociação de Preços</h4>
                  <p className="text-sm text-gray-600">
                    Recomendamos renegociar preços com fornecedores de alto impacto fiscal, buscando compensar a diferença tributária através de descontos.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-white rounded-lg border border-gray-200">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-gray-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-800">Benefícios Fiscais Regionais</h4>
                  <p className="text-sm text-gray-600">
                    Considere fornecedores de estados com benefícios fiscais regionais, como MG e SC, que oferecem alíquotas reduzidas de ICMS.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupplierAnalysis;
