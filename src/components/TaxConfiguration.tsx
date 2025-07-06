
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Save, RotateCcw } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface TaxConfig {
  lucroReal: {
    irpj: number;
    irpjAdicional: number;
    csll: number;
    pisNaoCumulativo: number;
    cofinsNaoCumulativo: number;
    icmsGeral: number;
  };
  lucroPresumido: {
    presumidoComercio: number;
    presumidoIndustria: number;
    presumidoServicos: number;
    irpj: number;
    csll: number;
    pisCumulativo: number;
    cofinsCumulativo: number;
    icmsGeral: number;
  };
  simplesNacional: {
    anexo1: {
      faixa1: { limite: number; aliquota: number };
      faixa2: { limite: number; aliquota: number };
      faixa3: { limite: number; aliquota: number };
      faixa4: { limite: number; aliquota: number };
      faixa5: { limite: number; aliquota: number };
      faixa6: { limite: number; aliquota: number };
    };
    anexo2: {
      faixa1: { limite: number; aliquota: number };
      faixa2: { limite: number; aliquota: number };
      faixa3: { limite: number; aliquota: number };
      faixa4: { limite: number; aliquota: number };
      faixa5: { limite: number; aliquota: number };
      faixa6: { limite: number; aliquota: number };
    };
    anexo3: {
      faixa1: { limite: number; aliquota: number };
      faixa2: { limite: number; aliquota: number };
      faixa3: { limite: number; aliquota: number };
      faixa4: { limite: number; aliquota: number };
      faixa5: { limite: number; aliquota: number };
      faixa6: { limite: number; aliquota: number };
    };
  };
  icmsEstadual: {
    [key: string]: number;
  };
  contribuicaoPrevidenciaria: {
    patronal: number;
    terceiros: number;
    rat: number;
    salarioEducacao: number;
    incra: number;
    sebrae: number;
    senai: number;
    sesi: number;
    senac: number;
    sesc: number;
  };
}

const TaxConfiguration: React.FC = () => {
  const [config, setConfig] = useState<TaxConfig>({
    lucroReal: {
      irpj: 15,
      irpjAdicional: 10,
      csll: 9,
      pisNaoCumulativo: 1.65,
      cofinsNaoCumulativo: 7.6,
      icmsGeral: 18,
    },
    lucroPresumido: {
      presumidoComercio: 8,
      presumidoIndustria: 8,
      presumidoServicos: 32,
      irpj: 15,
      csll: 9,
      pisCumulativo: 0.65,
      cofinsCumulativo: 3,
      icmsGeral: 18,
    },
    simplesNacional: {
      anexo1: {
        faixa1: { limite: 180000, aliquota: 4 },
        faixa2: { limite: 360000, aliquota: 7.3 },
        faixa3: { limite: 720000, aliquota: 9.5 },
        faixa4: { limite: 1800000, aliquota: 10.7 },
        faixa5: { limite: 3600000, aliquota: 14.3 },
        faixa6: { limite: 4800000, aliquota: 19 },
      },
      anexo2: {
        faixa1: { limite: 180000, aliquota: 4.5 },
        faixa2: { limite: 360000, aliquota: 7.8 },
        faixa3: { limite: 720000, aliquota: 10 },
        faixa4: { limite: 1800000, aliquota: 11.2 },
        faixa5: { limite: 3600000, aliquota: 14.7 },
        faixa6: { limite: 4800000, aliquota: 30 },
      },
      anexo3: {
        faixa1: { limite: 180000, aliquota: 6 },
        faixa2: { limite: 360000, aliquota: 11.2 },
        faixa3: { limite: 720000, aliquota: 13.5 },
        faixa4: { limite: 1800000, aliquota: 16 },
        faixa5: { limite: 3600000, aliquota: 21 },
        faixa6: { limite: 4800000, aliquota: 33 },
      },
    },
    icmsEstadual: {
      'AC': 17, 'AL': 17, 'AP': 18, 'AM': 18, 'BA': 18,
      'CE': 18, 'DF': 18, 'ES': 17, 'GO': 17, 'MA': 18,
      'MT': 17, 'MS': 17, 'MG': 18, 'PA': 17, 'PB': 18,
      'PR': 18, 'PE': 18, 'PI': 18, 'RJ': 18, 'RN': 18,
      'RS': 18, 'RO': 17.5, 'RR': 17, 'SC': 17, 'SP': 18,
      'SE': 18, 'TO': 18
    },
    contribuicaoPrevidenciaria: {
      patronal: 20,
      terceiros: 5.8,
      rat: 1,
      salarioEducacao: 2.5,
      incra: 0.2,
      sebrae: 0.6,
      senai: 1,
      sesi: 1.5,
      senac: 1,
      sesc: 1.5,
    },
  });

  const { toast } = useToast();

  useEffect(() => {
    const savedConfig = localStorage.getItem('taxConfig');
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('taxConfig', JSON.stringify(config));
    toast({
      title: "Configuração salva!",
      description: "As alíquotas tributárias foram atualizadas com sucesso",
    });
  };

  const handleReset = () => {
    localStorage.removeItem('taxConfig');
    window.location.reload();
  };

  const updateConfig = (section: string, field: string, value: number, subField?: string) => {
    setConfig(prev => {
      const newConfig = { ...prev };
      if (subField) {
        (newConfig as any)[section][field][subField] = value;
      } else {
        (newConfig as any)[section][field] = value;
      }
      return newConfig;
    });
  };

  return (
    <Card className="max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="h-5 w-5 text-gray-600" />
          <span>Configuração Tributária</span>
        </CardTitle>
        <CardDescription>
          Configure as alíquotas e parâmetros tributários para cálculos precisos
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="lucro-real" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="lucro-real">Lucro Real</TabsTrigger>
            <TabsTrigger value="lucro-presumido">Lucro Presumido</TabsTrigger>
            <TabsTrigger value="simples">Simples Nacional</TabsTrigger>
            <TabsTrigger value="icms">ICMS Estadual</TabsTrigger>
            <TabsTrigger value="previdencia">Previdência</TabsTrigger>
          </TabsList>

          <TabsContent value="lucro-real" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>IRPJ (%)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={config.lucroReal.irpj}
                  onChange={(e) => updateConfig('lucroReal', 'irpj', Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label>IRPJ Adicional (%)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={config.lucroReal.irpjAdicional}
                  onChange={(e) => updateConfig('lucroReal', 'irpjAdicional', Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label>CSLL (%)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={config.lucroReal.csll}
                  onChange={(e) => updateConfig('lucroReal', 'csll', Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label>PIS Não Cumulativo (%)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={config.lucroReal.pisNaoCumulativo}
                  onChange={(e) => updateConfig('lucroReal', 'pisNaoCumulativo', Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label>COFINS Não Cumulativo (%)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={config.lucroReal.cofinsNaoCumulativo}
                  onChange={(e) => updateConfig('lucroReal', 'cofinsNaoCumulativo', Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label>ICMS Geral (%)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={config.lucroReal.icmsGeral}
                  onChange={(e) => updateConfig('lucroReal', 'icmsGeral', Number(e.target.value))}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="lucro-presumido" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Presumido Comércio (%)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={config.lucroPresumido.presumidoComercio}
                  onChange={(e) => updateConfig('lucroPresumido', 'presumidoComercio', Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label>Presumido Indústria (%)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={config.lucroPresumido.presumidoIndustria}
                  onChange={(e) => updateConfig('lucroPresumido', 'presumidoIndustria', Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label>Presumido Serviços (%)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={config.lucroPresumido.presumidoServicos}
                  onChange={(e) => updateConfig('lucroPresumido', 'presumidoServicos', Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label>PIS Cumulativo (%)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={config.lucroPresumido.pisCumulativo}
                  onChange={(e) => updateConfig('lucroPresumido', 'pisCumulativo', Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label>COFINS Cumulativo (%)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={config.lucroPresumido.cofinsCumulativo}
                  onChange={(e) => updateConfig('lucroPresumido', 'cofinsCumulativo', Number(e.target.value))}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="simples" className="space-y-6">
            {['anexo1', 'anexo2', 'anexo3'].map((anexo) => (
              <div key={anexo} className="space-y-4">
                <h3 className="text-lg font-semibold capitalize">{anexo.replace('anexo', 'Anexo ')} - {
                  anexo === 'anexo1' ? 'Comércio' : 
                  anexo === 'anexo2' ? 'Indústria' : 'Serviços'
                }</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries((config.simplesNacional as any)[anexo]).map(([faixa, data]: [string, any]) => (
                    <div key={faixa} className="space-y-2 p-3 border rounded">
                      <Label className="text-sm font-medium">
                        {faixa.replace('faixa', 'Faixa ')} - Até R$ {data.limite.toLocaleString()}
                      </Label>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Alíquota %"
                        value={data.aliquota}
                        onChange={(e) => updateConfig('simplesNacional', anexo, Number(e.target.value), `${faixa}.aliquota`)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="icms" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(config.icmsEstadual).map(([estado, aliquota]) => (
                <div key={estado} className="space-y-2">
                  <Label>{estado}</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={aliquota}
                    onChange={(e) => updateConfig('icmsEstadual', estado, Number(e.target.value))}
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="previdencia" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(config.contribuicaoPrevidenciaria).map(([campo, valor]) => (
                <div key={campo} className="space-y-2">
                  <Label className="capitalize">{campo.replace(/([A-Z])/g, ' $1')}</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={valor}
                    onChange={(e) => updateConfig('contribuicaoPrevidenciaria', campo, Number(e.target.value))}
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex space-x-4 pt-6 border-t">
          <Button onClick={handleSave} className="bg-gray-600 hover:bg-gray-700">
            <Save className="h-4 w-4 mr-2" />
            Salvar Configurações
          </Button>
          <Button onClick={handleReset} variant="outline">
            <RotateCcw className="h-4 w-4 mr-2" />
            Restaurar Padrão
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaxConfiguration;
