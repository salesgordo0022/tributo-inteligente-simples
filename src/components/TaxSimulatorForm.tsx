
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator } from 'lucide-react';

interface TaxSimulatorFormProps {
  revenue: number;
  costs: number;
  payroll: number;
  sector: 'comercio' | 'industria' | 'servicos';
  state: string;
  isCalculating: boolean;
  onRevenueChange: (value: number) => void;
  onCostsChange: (value: number) => void;
  onPayrollChange: (value: number) => void;
  onSectorChange: (value: 'comercio' | 'industria' | 'servicos') => void;
  onStateChange: (value: string) => void;
  onCalculate: () => void;
}

const TaxSimulatorForm: React.FC<TaxSimulatorFormProps> = ({
  revenue,
  costs,
  payroll,
  sector,
  state,
  isCalculating,
  onRevenueChange,
  onCostsChange,
  onPayrollChange,
  onSectorChange,
  onStateChange,
  onCalculate
}) => {
  const estados = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dados da Empresa</CardTitle>
        <CardDescription>
          Informe os dados para simulação tributária detalhada
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="revenue">Receita Bruta Anual</Label>
            <Input
              id="revenue"
              type="number"
              value={revenue}
              onChange={(e) => onRevenueChange(Number(e.target.value))}
              placeholder="Digite a receita bruta"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="costs">Custos e Despesas</Label>
            <Input
              id="costs"
              type="number"
              value={costs}
              onChange={(e) => onCostsChange(Number(e.target.value))}
              placeholder="Digite os custos e despesas"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="payroll">Folha de Pagamento Anual</Label>
            <Input
              id="payroll"
              type="number"
              value={payroll}
              onChange={(e) => onPayrollChange(Number(e.target.value))}
              placeholder="Digite a folha de pagamento"
            />
          </div>

          <div className="space-y-2">
            <Label>Estado</Label>
            <Select value={state} onValueChange={onStateChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {estados.map(uf => (
                  <SelectItem key={uf} value={uf}>{uf}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Setor de Atividade</Label>
          <Select value={sector} onValueChange={onSectorChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="comercio">Comércio</SelectItem>
              <SelectItem value="industria">Indústria</SelectItem>
              <SelectItem value="servicos">Serviços</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Lucro Bruto:</span>
            <span className="font-semibold text-gray-800">
              R$ {(revenue - costs).toLocaleString('pt-BR')}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Margem:</span>
            <span className="font-semibold text-gray-800">
              {((revenue - costs) / revenue * 100).toFixed(1)}%
            </span>
          </div>
        </div>

        <Button 
          onClick={onCalculate}
          className="w-full bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900"
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
  );
};

export default TaxSimulatorForm;
