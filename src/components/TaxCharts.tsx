
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TaxChartsProps {
  results: any;
}

const TaxCharts: React.FC<TaxChartsProps> = ({ results }) => {
  if (!results) return null;

  const pieData = [
    { name: 'IRPJ', value: results.lucroReal.irpj + results.lucroReal.irpjAdicional, color: '#374151' },
    { name: 'CSLL', value: results.lucroReal.csll, color: '#4B5563' },
    { name: 'PIS', value: results.lucroReal.pis, color: '#6B7280' },
    { name: 'COFINS', value: results.lucroReal.cofins, color: '#9CA3AF' },
    { name: 'ICMS', value: results.lucroReal.icms, color: '#D1D5DB' },
    { name: 'INSS', value: results.lucroReal.inss, color: '#E5E7EB' }
  ];

  const barData = [
    {
      regime: 'Lucro Real',
      total: results.lucroReal.total,
      color: '#374151'
    },
    {
      regime: 'Lucro Presumido',
      total: results.lucroPresumido.total,
      color: '#6B7280'
    },
    {
      regime: 'Simples Nacional',
      total: results.simplesNacional.total,
      color: '#9CA3AF'
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Composição dos Tributos (Lucro Real)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `R$ ${Number(value).toLocaleString('pt-BR')}`} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Comparação entre Regimes</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="regime" />
              <YAxis />
              <Tooltip formatter={(value) => `R$ ${Number(value).toLocaleString('pt-BR')}`} />
              <Bar dataKey="total" fill="#6B7280" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxCharts;
