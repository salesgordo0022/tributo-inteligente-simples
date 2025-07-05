import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, FileText, BarChart3, TrendingUp, Calendar, CheckCircle } from 'lucide-react';

interface ReportsGeneratorProps {
  data?: any;
}

interface ReportType {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  estimatedTime: string;
  format: string[];
}

const ReportsGenerator: React.FC<ReportsGeneratorProps> = ({ data }) => {
  const [selectedReport, setSelectedReport] = useState<string>('');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('2024');
  const [selectedFormat, setSelectedFormat] = useState<string>('pdf');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReports, setGeneratedReports] = useState<any[]>([]);

  const reportTypes: ReportType[] = [
    {
      id: 'tax_analysis',
      name: 'Análise Tributária Completa',
      description: 'Relatório detalhado com comparação de regimes e oportunidades de economia',
      icon: <BarChart3 className="h-5 w-5" />,
      estimatedTime: '2-3 minutos',
      format: ['pdf', 'excel']
    },
    {
      id: 'supplier_optimization',
      name: 'Otimização de Fornecedores',
      description: 'Análise dos fornecedores com recomendações de otimização fiscal',
      icon: <TrendingUp className="h-5 w-5" />,
      estimatedTime: '1-2 minutos',
      format: ['pdf', 'excel']
    },
    {
      id: 'compliance_report',
      name: 'Relatório de Compliance',
      description: 'Verificação de conformidade com obrigações fiscais e legais',
      icon: <CheckCircle className="h-5 w-5" />,
      estimatedTime: '3-4 minutos',
      format: ['pdf']
    },
    {
      id: 'cash_flow_impact',
      name: 'Impacto no Fluxo de Caixa',
      description: 'Projeção do impacto das otimizações no fluxo de caixa',
      icon: <FileText className="h-5 w-5" />,
      estimatedTime: '2-3 minutos',
      format: ['pdf', 'excel']
    }
  ];

  const selectedReportDetails = reportTypes.find(r => r.id === selectedReport);

  const generateReport = () => {
    if (!selectedReport) return;
    
    setIsGenerating(true);
    
    setTimeout(() => {
      const newReport = {
        id: Date.now(),
        name: selectedReportDetails?.name || '',
        type: selectedReport,
        period: selectedPeriod,
        format: selectedFormat,
        generatedAt: new Date().toLocaleString('pt-BR'),
        status: 'completed'
      };
      
      setGeneratedReports(prev => [newReport, ...prev]);
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Download className="h-5 w-5 text-gray-600" />
            <span>Gerador de Relatórios</span>
          </CardTitle>
          <CardDescription>
            Gere relatórios profissionais para análise e tomada de decisão estratégica
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Seleção de Relatório */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Configuração do Relatório</CardTitle>
            <CardDescription>
              Escolha o tipo de relatório e período desejado
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Tipo de Relatório</label>
              <Select value={selectedReport} onValueChange={setSelectedReport}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo de relatório" />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((report) => (
                    <SelectItem key={report.id} value={report.id}>
                      <div className="flex items-center space-x-2">
                        {report.icon}
                        <span>{report.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Período</label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="custom">Período Personalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Formato</label>
              <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {selectedReportDetails?.format.includes('pdf') && (
                    <SelectItem value="pdf">PDF</SelectItem>
                  )}
                  {selectedReportDetails?.format.includes('excel') && (
                    <SelectItem value="excel">Excel</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={generateReport}
              className="w-full bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900"
              disabled={isGenerating || !selectedReport}
            >
              {isGenerating ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Gerando...</span>
                </div>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Gerar Relatório
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Preview do Relatório Selecionado */}
        {selectedReportDetails && (
          <Card>
            <CardHeader>
              <CardTitle>Preview do Relatório</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <div className="p-2 bg-gray-200 rounded-lg">
                  {selectedReportDetails.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{selectedReportDetails.name}</h3>
                  <p className="text-sm text-gray-600">{selectedReportDetails.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Calendar className="h-4 w-4 text-gray-600 mx-auto mb-1" />
                  <div className="text-sm font-medium text-gray-800">Tempo Estimado</div>
                  <div className="text-xs text-gray-600">{selectedReportDetails.estimatedTime}</div>
                </div>
                
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <FileText className="h-4 w-4 text-gray-600 mx-auto mb-1" />
                  <div className="text-sm font-medium text-gray-800">Formatos</div>
                  <div className="text-xs text-gray-600">{selectedReportDetails.format.join(', ').toUpperCase()}</div>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2">Conteúdo Incluído:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Análise detalhada dos dados fiscais</li>
                  <li>• Comparação de cenários</li>
                  <li>• Recomendações personalizadas</li>
                  <li>• Gráficos e visualizações</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Relatórios Gerados */}
      {generatedReports.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Relatórios Gerados</CardTitle>
            <CardDescription>
              Histórico dos relatórios gerados recentemente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {generatedReports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-200 rounded-lg">
                      <Download className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{report.name}</div>
                      <div className="text-sm text-gray-600">
                        {report.period} • {report.format.toUpperCase()} • {report.generatedAt}
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ReportsGenerator;
