
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileSpreadsheet, CheckCircle, AlertCircle, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface UploadSpreadsheetProps {
  onDataUpload: (data: any) => void;
}

const UploadSpreadsheet: React.FC<UploadSpreadsheetProps> = ({ onDataUpload }) => {
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      toast({
        title: "Formato inválido",
        description: "Por favor, envie apenas arquivos Excel (.xlsx ou .xls)",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    // Simular processamento do arquivo
    setTimeout(() => {
      const newFile = {
        id: Date.now(),
        name: file.name,
        type,
        size: file.size,
        status: 'success',
        records: Math.floor(Math.random() * 1000) + 100
      };

      setUploadedFiles(prev => [...prev, newFile]);
      setIsProcessing(false);

      toast({
        title: "Arquivo processado com sucesso!",
        description: `${newFile.records} registros importados de ${type}`,
      });

      // Notificar componente pai sobre os dados
      onDataUpload({ [type]: newFile });
    }, 2000);
  }, [onDataUpload, toast]);

  const removeFile = (fileId: number) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="h-5 w-5 text-blue-600" />
            <span>Importação de Dados</span>
          </CardTitle>
          <CardDescription>
            Faça upload das planilhas da sua empresa para iniciar a análise tributária
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Upload de Produtos */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <FileSpreadsheet className="h-5 w-5 text-green-600" />
              <span>Produtos</span>
            </CardTitle>
            <CardDescription>
              NCM, CST, CFOP, origem dos produtos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={(e) => handleFileUpload(e, 'produtos')}
                className="hidden"
                id="produtos-upload"
              />
              <label htmlFor="produtos-upload" className="cursor-pointer">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Clique para fazer upload</p>
                <p className="text-xs text-gray-400">Excel (.xlsx)</p>
              </label>
            </div>
            <Button asChild className="w-full mt-4 bg-green-600 hover:bg-green-700">
              <label htmlFor="produtos-upload" className="cursor-pointer">
                Selecionar Arquivo
              </label>
            </Button>
          </CardContent>
        </Card>

        {/* Upload de Fornecedores */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <FileSpreadsheet className="h-5 w-5 text-blue-600" />
              <span>Fornecedores</span>
            </CardTitle>
            <CardDescription>
              CNPJ, UF, dados dos fornecedores
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={(e) => handleFileUpload(e, 'fornecedores')}
                className="hidden"
                id="fornecedores-upload"
              />
              <label htmlFor="fornecedores-upload" className="cursor-pointer">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Clique para fazer upload</p>
                <p className="text-xs text-gray-400">Excel (.xlsx)</p>
              </label>
            </div>
            <Button asChild className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
              <label htmlFor="fornecedores-upload" className="cursor-pointer">
                Selecionar Arquivo
              </label>
            </Button>
          </CardContent>
        </Card>

        {/* Upload de Folha de Pagamento */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <FileSpreadsheet className="h-5 w-5 text-purple-600" />
              <span>Folha de Pagamento</span>
            </CardTitle>
            <CardDescription>
              Salários, encargos, funcionários
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={(e) => handleFileUpload(e, 'folha')}
                className="hidden"
                id="folha-upload"
              />
              <label htmlFor="folha-upload" className="cursor-pointer">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Clique para fazer upload</p>
                <p className="text-xs text-gray-400">Excel (.xlsx)</p>
              </label>
            </div>
            <Button asChild className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
              <label htmlFor="folha-upload" className="cursor-pointer">
                Selecionar Arquivo
              </label>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Arquivos Carregados */}
      {uploadedFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Arquivos Importados</CardTitle>
            <CardDescription>
              Dados carregados e prontos para análise
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {uploadedFiles.map((file) => (
                <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      {file.status === 'success' ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{file.name}</p>
                      <p className="text-xs text-gray-500">
                        {file.type} • {formatFileSize(file.size)} • {file.records} registros
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(file.id)}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {isProcessing && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              <span className="text-blue-700">Processando arquivo...</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UploadSpreadsheet;
