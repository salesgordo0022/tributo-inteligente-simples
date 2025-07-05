
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Upload, Calculator, BarChart3, Brain, FileSpreadsheet, TrendingUp, Building2, Users, PieChart, Download } from 'lucide-react';
import UploadSpreadsheet from '../components/UploadSpreadsheet';
import TaxSimulator from '../components/TaxSimulator';
import RegimeComparator from '../components/RegimeComparator';
import SupplierAnalysis from '../components/SupplierAnalysis';
import AIRecommendations from '../components/AIRecommendations';
import ReportsGenerator from '../components/ReportsGenerator';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [companyData, setCompanyData] = useState(null);

  const handleDataUpload = (data: any) => {
    setCompanyData(data);
    console.log('Dados da empresa carregados:', data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-green-700 bg-clip-text text-transparent">
                  TaxOptimizer Pro
                </h1>
                <p className="text-sm text-gray-600">Sistema Inteligente de Planejamento Tributário</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-green-700 border-green-300">
                <TrendingUp className="h-3 w-3 mr-1" />
                Economia Identificada: R$ 125.000
              </Badge>
              <Button variant="outline" size="sm">
                <Users className="h-4 w-4 mr-2" />
                Minha Empresa
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-white/50 backdrop-blur p-1 rounded-xl border">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center space-x-2">
              <Upload className="h-4 w-4" />
              <span>Importar</span>
            </TabsTrigger>
            <TabsTrigger value="simulator" className="flex items-center space-x-2">
              <Calculator className="h-4 w-4" />
              <span>Simulador</span>
            </TabsTrigger>
            <TabsTrigger value="analysis" className="flex items-center space-x-2">
              <Building2 className="h-4 w-4" />
              <span>Fornecedores</span>
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center space-x-2">
              <Brain className="h-4 w-4" />
              <span>IA</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Relatórios</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Receita Bruta Anual</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ 2.450.000</div>
                  <p className="text-blue-100 text-sm">+12% vs ano anterior</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Economia Potencial</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ 125.000</div>
                  <p className="text-green-100 text-sm">5.1% da receita bruta</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Regime Atual</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Lucro Real</div>
                  <p className="text-purple-100 text-sm">Alíquota efetiva: 24.5%</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Fornecedores</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">127</div>
                  <p className="text-orange-100 text-sm">15 com alto impacto fiscal</p>
                </CardContent>
              </Card>
            </div>

            <RegimeComparator data={companyData} />
          </TabsContent>

          <TabsContent value="upload">
            <UploadSpreadsheet onDataUpload={handleDataUpload} />
          </TabsContent>

          <TabsContent value="simulator">
            <TaxSimulator data={companyData} />
          </TabsContent>

          <TabsContent value="analysis">
            <SupplierAnalysis data={companyData} />
          </TabsContent>

          <TabsContent value="ai">
            <AIRecommendations data={companyData} />
          </TabsContent>

          <TabsContent value="reports">
            <ReportsGenerator data={companyData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
