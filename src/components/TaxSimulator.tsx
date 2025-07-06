
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from 'lucide-react';
import { TaxCalculator } from '../utils/taxCalculator';
import TaxSimulatorForm from './TaxSimulatorForm';
import TaxResultsDisplay from './TaxResultsDisplay';
import TaxDetailsCards from './TaxDetailsCards';
import TaxCharts from './TaxCharts';

interface TaxSimulatorProps {
  data?: any;
}

const TaxSimulator: React.FC<TaxSimulatorProps> = ({ data }) => {
  const [revenue, setRevenue] = useState(2450000);
  const [costs, setCosts] = useState(1800000);
  const [payroll, setPayroll] = useState(300000);
  const [sector, setSector] = useState<'comercio' | 'industria' | 'servicos'>('comercio');
  const [state, setState] = useState('SP');
  const [isCalculating, setIsCalculating] = useState(false);
  const [results, setResults] = useState<any>(null);

  const calculator = new TaxCalculator();

  const calculateTaxes = () => {
    setIsCalculating(true);
    
    setTimeout(() => {
      const companyData = {
        revenue,
        costs,
        payroll,
        sector,
        state
      };

      const calculationResults = calculator.calculateDetailedTaxes(companyData);
      setResults(calculationResults);
      setIsCalculating(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="h-5 w-5 text-gray-600" />
            <span>Simulador Tributário Avançado</span>
          </CardTitle>
          <CardDescription>
            Compare os regimes tributários com cálculos precisos e configuráveis
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TaxSimulatorForm
          revenue={revenue}
          costs={costs}
          payroll={payroll}
          sector={sector}
          state={state}
          isCalculating={isCalculating}
          onRevenueChange={setRevenue}
          onCostsChange={setCosts}
          onPayrollChange={setPayroll}
          onSectorChange={setSector}
          onStateChange={setState}
          onCalculate={calculateTaxes}
        />

        <TaxResultsDisplay 
          results={results} 
          revenue={revenue} 
        />
      </div>

      <TaxDetailsCards results={results} />

      <TaxCharts results={results} />
    </div>
  );
};

export default TaxSimulator;
