
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, FileText, Calendar, Filter, TrendingUp, Building2, Calculator, Brain } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface ReportsGeneratorProps {
  data?: any;
}

const ReportsGenerator: React.FC<ReportsGeneratorProps> = ({ data }) => {
  const [selectedReport, setSelectedReport] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('2024');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const reportTypes = [
    {
      id: 'comparison',
      name: 'Comparação de Regimes',
      description: 'Análise detalhada dos regimes tributários disponíveis',
      icon: Calculator,
      format: ['PDF', 'Excel'],
      estimatedTime: '2-3 min'
    },
    {
      id: 'suppliers',
      name: 'Análise de Fornecedores',
      description: 'Impacto fiscal e oportunidades de otimização',
      icon: Building2,
      format: ['PDF', 'Excel'],
      estimatedTime: '3-4 min'
    },
    {
      id: 'ai_recommendations',
      name: 'Recomendações de IA',
      description: 'Insights e oportunidades identificadas pela inteligência artificial',
      icon: Brain,
      format: ['PDF'],
      estimatedTime: '1-2 min'
    },
    {
      id: 'executive',
      name: 'Relatório Executivo',
      description: 'Resumo estratégico para tomada de decisão',
      icon: TrendingUp,
      format: ['PDF'],
      estimatedTime: '4-5 min'
    },
    {
      id: 'compliance',
      name: 'Análise de Conformidade',
      description: 'Verificação de adequação às normas tributárias',
      icon: FileText,
      format: ['PDF', 'Excel'],
      estimatedTime: '3-4 min'
    }
  ];

  const generateReport = async () => {
    if (!selectedReport) {
      toast({
        title: "Selecione um relatório",
        description: "Por favor, escolha o tipo de relatório que deseja gerar.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);

    // Simular geração do relatório
    setTimeout(() => {
      const reportType = reportTypes.find(r => r.id === selectedReport);
      
      toast({
        title: "Relatório gerado com sucesso!",
        description: `${reportType?.name} foi gerado e está sendo baixado.`,
      });

      // Simular download
      const link = document.createElement('a');
      link.href = '#';
      link.download = `${reportType?.name}_${selectedPeriod}.pdf`;
      link.click();

      setIsGenerating(false);
    }, 3000);
  };

  const selectedReportDetails = reportTypes.find(r => r.id === selectedReport);

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Download className="h-5 w-5 text-green-600" />
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
            {/* Tipo de Relatório */}
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
                        <report.icon className="h-4 w-4" />
                        <span>{report.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Período */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Período</label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024 (Ano Completo)</SelectItem>
                  <SelectItem value="2024-q4">Q4 2024</SelectItem>
                  <SelectItem value="2024-q3">Q3 2024</SelectItem>
                  <SelectItem value="2023">2023 (Ano Completo)</SelectItem>
                  <SelectItem value="comparative">Comparativo 2023-2024</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Botão de Geração */}
            <Button 
              onClick={generateReport}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              disabled={isGenerating}
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
              <CardTitle className="flex items-center space-x-2">
                <selectedReportDetails.icon className="h-5 w-5 text-blue-600" />
                <span>{selectedReportDetails.name}</span>
              </CardTitle>
              <CardDescription>
                {selectedReportDetails.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Formatos disponíveis:</span>
                  <div className="flex space-x-2">
                    {selectedReportDetails.format.map((format) => (
                      <Badge key={format} variant="outline" className="text-xs">
                        {format}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Tempo estimado:</span>
                  <span className="text-sm font-medium">
                    {selectedReportDetails.estimatedTime}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Período selecionado:</span>
                  <span className="text-sm font-medium">{selectedPeriod}</span>
                </div>
              </div>

              {/* Preview do conteúdo */}
              <div className="border rounded-lg p-4 bg-gray-50">
                <h4 className="font-medium mb-2">Conteúdo do Relatório:</h4>
                {selectedReport === 'comparison' && (
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Comparação detalhada entre regimes</li>
                    <li>• Análise de alíquotas efetivas</li>
                    <li>• Recomendação de regime ideal</li>
                    <li>• Projeções de economia</li>
                  </ul>
                )}
                {selectedReport === 'suppliers' && (
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Ranking de fornecedores por impacto fiscal</li>
                    <li>• Oportunidades de substituição</li>
                    <li>• Análise de DIFAL e ST</li>
                    <li>• Sugestões de otimização</li>
                  </ul>
                )}
                {selectedReport === 'ai_recommendations' && (
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Recomendações personalizadas da IA</li>
                    <li>• Análise de oportunidades</li>
                    <li>• Planos de ação detalhados</li>
                    <li>• Estimativas de impacto</li>
                  </ul>
                )}
                {selectedReport === 'executive' && (
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Resumo executivo</li>
                    <li>• Principais achados</li>
                    <li>• Recomendações estratégicas</li>
                    <li>• Dashboard de métricas</li>
                  </ul>
                )}
                {selectedReport === 'compliance' && (
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Verificação de conformidade</li>
                    <li>• Identificação de riscos</li>
                    <li>• Sugestões de adequação</li>
                    <li>• Checklist de conformidade</li>
                  </ul>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Relatórios Disponíveis */}
      <Card>
        <CardHeader>
          <CardTitle>Tipos de Relatórios Disponíveis</CardTitle>
          <CardDescription>
            Selecione o relatório que melhor atende às suas necessidades
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reportTypes.map((report) => (
              <Card 
                key={report.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedReport === report.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                }`}
                onClick={() => setSelectedReport(report.id)}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <report.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{report.name}</h3>
                      <p className="text-xs text-gray-600 mt-1">
                        {report.description}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <div className="flex space-x-1">
                          {report.format.map((format) => (
                            <Badge key={format} variant="outline" className="text-xs">
                              {format}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Histórico de Relatórios */}
      <Card>
        <CardHeader>
          <CardTitle>Relatórios Recentes</CardTitle>
          <CardDescription>
            Seus relatórios gerados anteriormente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: 'Comparação de Regimes', date: '2024-12-01', size: '2.3 MB', format: 'PDF' },
              { name: 'Análise de Fornecedores', date: '2024-11-28', size: '1.8 MB', format: 'Excel' },
              { name: 'Relatório Executivo', date: '2024-11-25', size: '3.1 MB', format: 'PDF' },
            ].map((report, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-gray-600" />
                  <div>
                    <div className="font-medium text-sm">{report.name}</div>
                    <div className="text-xs text-gray-500">
                      {report.date} • {report.size} • {report.format}
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Baixar
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsGenerator;
