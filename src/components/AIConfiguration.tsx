
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Settings, CheckCircle, XCircle, Brain, Key, Link } from 'lucide-react';
import { aiService } from '../services/aiService';
import { useToast } from "@/hooks/use-toast";

const AIConfiguration: React.FC = () => {
  const [config, setConfig] = useState({
    apiKey: '',
    baseUrl: '',
    isConfigured: false,
    isConnected: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Carregar configuração salva do localStorage
    const savedConfig = localStorage.getItem('aiConfig');
    if (savedConfig) {
      const parsed = JSON.parse(savedConfig);
      setConfig(prev => ({ ...prev, ...parsed }));
      if (parsed.apiKey && parsed.baseUrl) {
        aiService.setApiCredentials(parsed.apiKey, parsed.baseUrl);
      }
    }
  }, []);

  const handleSaveConfig = () => {
    if (!config.apiKey || !config.baseUrl) {
      toast({
        title: "Erro de configuração",
        description: "Por favor, preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Configurar o serviço de IA
      aiService.setApiCredentials(config.apiKey, config.baseUrl);
      
      // Salvar no localStorage
      const configToSave = {
        apiKey: config.apiKey,
        baseUrl: config.baseUrl,
        isConfigured: true
      };
      localStorage.setItem('aiConfig', JSON.stringify(configToSave));
      
      setConfig(prev => ({ ...prev, isConfigured: true }));
      
      toast({
        title: "Configuração salva!",
        description: "As credenciais da IA foram configuradas com sucesso",
      });
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar a configuração",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestConnection = async () => {
    if (!config.isConfigured) {
      toast({
        title: "Configure primeiro",
        description: "Salve a configuração antes de testar a conexão",
        variant: "destructive"
      });
      return;
    }

    setIsTesting(true);
    
    try {
      // Teste simples com a IA
      const testData = { message: "Teste de conexão" };
      await aiService.analyzeCompanyData(testData);
      
      setConfig(prev => ({ ...prev, isConnected: true }));
      
      toast({
        title: "Conexão bem-sucedida!",
        description: "A IA está respondendo corretamente",
      });
    } catch (error) {
      setConfig(prev => ({ ...prev, isConnected: false }));
      
      toast({
        title: "Falha na conexão",
        description: "Verifique as credenciais e tente novamente",
        variant: "destructive"
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleClearConfig = () => {
    localStorage.removeItem('aiConfig');
    setConfig({
      apiKey: '',
      baseUrl: '',
      isConfigured: false,
      isConnected: false
    });
    
    toast({
      title: "Configuração limpa",
      description: "As credenciais foram removidas",
    });
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="h-5 w-5 text-blue-600" />
          <span>Configuração da IA</span>
        </CardTitle>
        <CardDescription>
          Configure as credenciais para integrar sua IA personalizada ao sistema
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Status da Configuração */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <Brain className="h-5 w-5 text-purple-600" />
            <div>
              <p className="font-medium">Status da IA</p>
              <p className="text-sm text-gray-600">Estado atual da integração</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Badge variant={config.isConfigured ? "default" : "secondary"}>
              {config.isConfigured ? (
                <><CheckCircle className="h-3 w-3 mr-1" /> Configurada</>
              ) : (
                <><XCircle className="h-3 w-3 mr-1" /> Não Configurada</>
              )}
            </Badge>
            {config.isConfigured && (
              <Badge variant={config.isConnected ? "default" : "destructive"}>
                {config.isConnected ? (
                  <><CheckCircle className="h-3 w-3 mr-1" /> Conectada</>
                ) : (
                  <><XCircle className="h-3 w-3 mr-1" /> Desconectada</>
                )}
              </Badge>
            )}
          </div>
        </div>

        {/* Formulário de Configuração */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey" className="flex items-center space-x-2">
              <Key className="h-4 w-4" />
              <span>API Key</span>
            </Label>
            <Input
              id="apiKey"
              type="password"
              value={config.apiKey}
              onChange={(e) => setConfig(prev => ({ ...prev, apiKey: e.target.value }))}
              placeholder="Insira sua chave da API"
              className="font-mono"
            />
            <p className="text-xs text-gray-500">
              Chave de autenticação para acessar sua IA personalizada
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="baseUrl" className="flex items-center space-x-2">
              <Link className="h-4 w-4" />
              <span>URL Base da API</span>
            </Label>
            <Input
              id="baseUrl"
              type="url"
              value={config.baseUrl}
              onChange={(e) => setConfig(prev => ({ ...prev, baseUrl: e.target.value }))}
              placeholder="https://sua-api.com/v1"
              className="font-mono"
            />
            <p className="text-xs text-gray-500">
              Endereço base da sua API de IA (incluindo versão se necessário)
            </p>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex space-x-3">
          <Button 
            onClick={handleSaveConfig}
            disabled={isLoading}
            className="flex-1"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Salvando...</span>
              </div>
            ) : (
              <>
                <Settings className="h-4 w-4 mr-2" />
                Salvar Configuração
              </>
            )}
          </Button>

          <Button 
            onClick={handleTestConnection}
            disabled={isTesting || !config.isConfigured}
            variant="outline"
          >
            {isTesting ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span>Testando...</span>
              </div>
            ) : (
              <>
                <Brain className="h-4 w-4 mr-2" />
                Testar Conexão
              </>
            )}
          </Button>

          <Button 
            onClick={handleClearConfig}
            variant="destructive"
            size="sm"
          >
            Limpar
          </Button>
        </div>

        {/* Instruções */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Como configurar:</h4>
          <ol className="text-sm text-blue-700 space-y-1">
            <li>1. Obtenha sua API key do provedor de IA</li>
            <li>2. Insira a URL base da API (ex: https://api.openai.com/v1)</li>
            <li>3. Clique em "Salvar Configuração"</li>
            <li>4. Teste a conexão para verificar se está funcionando</li>
          </ol>
        </div>

        {/* Endpoints Esperados */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Endpoints esperados:</h4>
          <div className="text-sm text-gray-600 space-y-1 font-mono">
            <div>POST {config.baseUrl || '{baseUrl}'}/analyze</div>
            <div>POST {config.baseUrl || '{baseUrl}'}/recommendations</div>
            <div>POST {config.baseUrl || '{baseUrl}'}/compare</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIConfiguration;
