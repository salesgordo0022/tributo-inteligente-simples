
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Building2, TrendingUp, AlertTriangle, Search, Filter } from 'lucide-react';

interface SupplierAnalysisProps {
  data?: any;
}

const SupplierAnalysis: React.FC<SupplierAnalysisProps> = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const suppliers = [
    {
      id: 1,
      name: 'Fornecedor Alpha Ltda',
      cnpj: '12.345.678/0001-90',
      state: 'SP',
      totalPurchases: 450000,
      taxImpact: 81000,
      taxRate: 18.0,
      category: 'Matéria Prima',
      risk: 'high',
      opportunity: 'Substituição tributária disponível'
    },
    {
      id: 2,
      name: 'Beta Distribuidora S/A',
      cnpj: '98.765.432/0001-10',
      state: 'RJ',
      totalPurchases: 320000,
      taxImpact: 44800,
      taxRate: 14.0,
      category: 'Revenda',
      risk: 'medium',
      opportunity: 'DIFAL aplicável'
    },
    {
      id: 3,
      name: 'Gamma Indústria ME',
      cnpj: '11.222.333/0001-44',
      state: 'MG',
      totalPurchases: 280000,
      taxImpact: 22400,
      taxRate: 8.0,
      category: 'Industrialização',
      risk: 'low',
      opportunity: 'Benefício fiscal regional'
    },
    {
      id: 4,
      name: 'Delta Comércio Eireli',
      cnpj: '55.666.777/0001-88',
      state: 'RS',
      totalPurchases: 190000,
      taxImpact: 36100,
      taxRate: 19.0,
      category: 'Produtos Acabados',
      risk: 'high',
      opportunity: 'Fornecedor alternativo identificado'
    },
    {
      id: 5,
      name: 'Epsilon Logistics',
      cnpj: '99.888.777/0001-66',
      state: 'PR',
      totalPurchases: 150000,
      taxImpact: 18000,
      taxRate: 12.0,
      category: 'Serviços',
      risk: 'medium',
      opportunity: 'ISS x ICMS optimization'
    }
  ];

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.cnpj.includes(searchTerm) ||
                         supplier.state.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === 'all' || supplier.risk === filterType;
    
    return matchesSearch && matchesFilter;
  });

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-red-100 text-red-700 border-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-700 border-green-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getRiskText = (risk: string) => {
    switch (risk) {
      case 'high': return 'Alto Impacto';
      case 'medium': return 'Médio Impacto';
      case 'low': return 'Baixo Impacto';
      default: return 'Indefinido';
    }
  };

  const totalPurchases = suppliers.reduce((sum, supplier) => sum + supplier.totalPurchases, 0);
  const totalTaxImpact = suppliers.reduce((sum, supplier) => sum + supplier.taxImpact, 0);
  const averageTaxRate = (totalTaxImpact / totalPurchases) * 100;

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building2 className="h-5 w-5 text-blue-600" />
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
            <div className="text-2xl font-bold text-blue-600">
              R$ {totalPurchases.toLocaleString('pt-BR')}
            </div>
            <p className="text-sm text-gray-600">Total de Compras</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-red-600">
              R$ {totalTaxImpact.toLocaleString('pt-BR')}
            </div>
            <p className="text-sm text-gray-600">Impacto Tributário</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-purple-600">
              {averageTaxRate.toFixed(1)}%
            </div>
            <p className="text-sm text-gray-600">Alíquota Média</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">
              R$ 45.000
            </div>
            <p className="text-sm text-gray-600">Economia Potencial</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar por nome, CNPJ ou estado..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={filterType === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterType('all')}
                size="sm"
              >
                Todos
              </Button>
              <Button
                variant={filterType === 'high' ? 'default' : 'outline'}
                onClick={() => setFilterType('high')}
                size="sm"
                className="border-red-300 text-red-700 hover:bg-red-50"
              >
                Alto Impacto
              </Button>
              <Button
                variant={filterType === 'medium' ? 'default' : 'outline'}
                onClick={() => setFilterType('medium')}
                size="sm"
                className="border-yellow-300 text-yellow-700 hover:bg-yellow-50"
              >
                Médio Impacto
              </Button>
              <Button
                variant={filterType === 'low' ? 'default' : 'outline'}
                onClick={() => setFilterType('low')}
                size="sm"
                className="border-green-300 text-green-700 hover:bg-green-50"
              >
                Baixo Impacto
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Fornecedores */}
      <div className="space-y-4">
        {filteredSuppliers.map((supplier) => (
          <Card key={supplier.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                {/* Informações básicas */}
                <div className="lg:col-span-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Building2 className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{supplier.name}</h3>
                      <p className="text-sm text-gray-600">{supplier.cnpj}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {supplier.state}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {supplier.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Métricas financeiras */}
                <div className="lg:col-span-3">
                  <div className="space-y-1">
                    <div className="text-sm text-gray-600">Compras Anuais</div>
                    <div className="font-semibold">
                      R$ {supplier.totalPurchases.toLocaleString('pt-BR')}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <div className="space-y-1">
                    <div className="text-sm text-gray-600">Impacto Fiscal</div>
                    <div className="font-semibold text-red-600">
                      R$ {supplier.taxImpact.toLocaleString('pt-BR')}
                    </div>
                    <div className="text-xs text-gray-500">
                      {supplier.taxRate}% alíquota
                    </div>
                  </div>
                </div>

                {/* Status e oportunidades */}
                <div className="lg:col-span-2">
                  <Badge className={getRiskColor(supplier.risk)}>
                    {supplier.risk === 'high' && <AlertTriangle className="h-3 w-3 mr-1" />}
                    {supplier.risk === 'medium' && <TrendingUp className="h-3 w-3 mr-1" />}
                    {getRiskText(supplier.risk)}
                  </Badge>
                </div>

                <div className="lg:col-span-1 text-right">
                  <Button variant="outline" size="sm">
                    Analisar
                  </Button>
                </div>
              </div>

              {/* Oportunidade identificada */}
              {supplier.opportunity && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-600 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-green-800">
                        Oportunidade Identificada
                      </div>
                      <div className="text-sm text-green-700">
                        {supplier.opportunity}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSuppliers.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-gray-500">
              <Building2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhum fornecedor encontrado com os filtros aplicados.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SupplierAnalysis;
