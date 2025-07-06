
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FileSpreadsheet, Upload, CheckCircle, AlertCircle, Download } from 'lucide-react';

interface UploadSpreadsheetProps {
  onDataUpload: (data: any) => void;
}

const UploadSpreadsheet: React.FC<UploadSpreadsheetProps> = ({ onDataUpload }) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const handleFileUpload = (fileType: string) => {
    setIsUploading(true);
    setUploadProgress(0);

    // Simular upload progressivo
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadedFiles(prev => [...prev, fileType]);
          
          // Simular processamento dos dados
          setTimeout(() => {
            const mockData = {
              revenue: 2450000,
              costs: 1800000,
              suppliers: 127,
              products: 450,
              transactions: 1250
            };
            onDataUpload(mockData);
          }, 1000);
          
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const downloadTemplate = (templateType: string) => {
    // Simular download do template
    console.log(`Baixando template: ${templateType}`);
    
    // Criar dados de exemplo baseados no tipo
    let templateData = '';
    let fileName = '';
    
    switch (templateType) {
      case 'produtos':
        templateData = `Código,Descrição,NCM,CST,CFOP,Origem,Valor Unitário,Unidade
001,Produto A,12345678,000,5102,0,25.50,UN
002,Produto B,87654321,020,5405,1,150.00,KG
003,Produto C,11223344,060,6108,0,75.25,UN`;
        fileName = 'template_produtos.csv';
        break;
      case 'fornecedores':
        templateData = `CNPJ,Razão Social,Nome Fantasia,Estado,Atividade,Regime Tributário
12.345.678/0001-90,Fornecedor A Ltda,Fornecedor A,SP,Comércio,Simples Nacional
98.765.432/0001-10,Indústria B S/A,Indústria B,RJ,Indústria,Lucro Real
11.222.333/0001-44,Serviços C ME,Serviços C,MG,Serviços,Lucro Presumido`;
        fileName = 'template_fornecedores.csv';
        break;
      case 'transacoes':
        templateData = `Data,Número NF,CNPJ Emitente,Código Produto,Quantidade,Valor Unitário,Valor Total,ICMS,PIS,COFINS
2024-01-15,12345,12.345.678/0001-90,001,10,25.50,255.00,45.90,4.21,19.38
2024-01-16,12346,98.765.432/0001-10,002,5,150.00,750.00,135.00,12.38,57.00
2024-01-17,12347,11.222.333/0001-44,003,8,75.25,602.00,108.36,9.93,45.75`;
        fileName = 'template_transacoes.csv';
        break;
    }
    
    // Criar e baixar arquivo
    const blob = new Blob([templateData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="h-5 w-5 text-gray-600" />
            <span>Importação de Dados</span>
          </CardTitle>
          <CardDescription>
            Faça upload das planilhas da sua empresa para iniciar a análise tributária
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Templates para Download */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-lg text-blue-800">Modelos de Planilhas</CardTitle>
          <CardDescription className="text-blue-600">
            Baixe os modelos XLSX/CSV para preencher com os dados da sua empresa
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-blue-200">
              <div className="flex items-center space-x-3">
                <FileSpreadsheet className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="font-medium text-blue-800">Produtos</div>
                  <div className="text-sm text-blue-600">NCM, CST, CFOP</div>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => downloadTemplate('produtos')}
                className="border-blue-300 text-blue-700 hover:bg-blue-50"
              >
                <Download className="h-4 w-4 mr-2" />
                Baixar
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-blue-200">
              <div className="flex items-center space-x-3">
                <FileSpreadsheet className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="font-medium text-blue-800">Fornecedores</div>
                  <div className="text-sm text-blue-600">CNPJ, Regime</div>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => downloadTemplate('fornecedores')}
                className="border-blue-300 text-blue-700 hover:bg-blue-50"
              >
                <Download className="h-4 w-4 mr-2" />
                Baixar
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-blue-200">
              <div className="flex items-center space-x-3">
                <FileSpreadsheet className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="font-medium text-blue-800">Transações</div>
                  <div className="text-sm text-blue-600">NF, Valores</div>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => downloadTemplate('transacoes')}
                className="border-blue-300 text-blue-700 hover:bg-blue-50"
              >
                <Download className="h-4 w-4 mr-2" />
                Baixar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Upload de Produtos */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <FileSpreadsheet className="h-5 w-5 text-gray-600" />
              <span>Produtos</span>
            </CardTitle>
            <CardDescription>
              NCM, CST, CFOP, origem dos produtos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Arraste arquivos ou clique para selecionar</p>
              <p className="text-xs text-gray-500 mt-1">Excel, CSV (máx. 10MB)</p>
            </div>
            
            <Button 
              onClick={() => handleFileUpload('produtos')}
              className="w-full bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900"
              disabled={isUploading}
            >
              {uploadedFiles.includes('produtos') ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Produtos Importados
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Importar Produtos
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Upload de Fornecedores */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <FileSpreadsheet className="h-5 w-5 text-gray-600" />
              <span>Fornecedores</span>
            </CardTitle>
            <CardDescription>
              Dados fiscais e tributários dos fornecedores
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Arraste arquivos ou clique para selecionar</p>
              <p className="text-xs text-gray-500 mt-1">Excel, CSV (máx. 10MB)</p>
            </div>
            
            <Button 
              onClick={() => handleFileUpload('fornecedores')}
              className="w-full bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900"
              disabled={isUploading}
            >
              {uploadedFiles.includes('fornecedores') ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Fornecedores Importados
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Importar Fornecedores
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Upload de Transações */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <FileSpreadsheet className="h-5 w-5 text-gray-600" />
              <span>Transações</span>
            </CardTitle>
            <CardDescription>
              Notas fiscais, vendas e compras
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Arraste arquivos ou clique para selecionar</p>
              <p className="text-xs text-gray-500 mt-1">Excel, CSV (máx. 10MB)</p>
            </div>
            
            <Button 
              onClick={() => handleFileUpload('transacoes')}
              className="w-full bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900"
              disabled={isUploading}
            >
              {uploadedFiles.includes('transacoes') ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Transações Importadas
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Importar Transações
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Progresso do Upload */}
      {isUploading && (
        <Card>
          <CardHeader>
            <CardTitle>Processando Upload</CardTitle>
            <CardDescription>
              Analisando dados e preparando análise
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={uploadProgress} className="w-full" />
            <div className="flex justify-between text-sm text-gray-600">
              <span>Progresso: {uploadProgress}%</span>
              <span>{uploadProgress < 100 ? 'Processando...' : 'Concluído!'}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Status dos Uploads */}
      {uploadedFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Status dos Uploads</CardTitle>
            <CardDescription>
              Arquivos processados com sucesso
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-gray-600" />
                    <div>
                      <div className="font-medium text-gray-800 capitalize">{file}</div>
                      <div className="text-sm text-gray-600">Processado com sucesso</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Baixar
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Dicas de Upload */}
      <Card className="bg-gray-50 border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg">Dicas para Upload</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Formato dos Arquivos</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Excel (.xlsx, .xls)</li>
                <li>• CSV (.csv)</li>
                <li>• Tamanho máximo: 10MB</li>
                <li>• Codificação: UTF-8</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Colunas Obrigatórias</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Código do produto/fornecedor</li>
                <li>• Descrição</li>
                <li>• Valor</li>
                <li>• Data da transação</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadSpreadsheet;
