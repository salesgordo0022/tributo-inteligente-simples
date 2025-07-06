
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
      [key: string]: { limite: number; aliquota: number };
    };
    anexo2: {
      [key: string]: { limite: number; aliquota: number };
    };
    anexo3: {
      [key: string]: { limite: number; aliquota: number };
    };
  };
  icmsEstadual: {
    [key: string]: number;
  };
  contribuicaoPrevidenciaria: {
    [key: string]: number;
  };
}

interface CompanyData {
  revenue: number;
  costs: number;
  payroll: number;
  sector: 'comercio' | 'industria' | 'servicos';
  state: string;
}

interface DetailedTaxResults {
  lucroReal: {
    irpj: number;
    irpjAdicional: number;
    csll: number;
    pis: number;
    cofins: number;
    icms: number;
    inss: number;
    total: number;
    detalhes: string[];
  };
  lucroPresumido: {
    irpj: number;
    csll: number;
    pis: number;
    cofins: number;
    icms: number;
    inss: number;
    total: number;
    detalhes: string[];
  };
  simplesNacional: {
    das: number;
    inss: number;
    total: number;
    faixa: string;
    aliquota: number;
    detalhes: string[];
  };
  bestOption: 'lucroReal' | 'lucroPresumido' | 'simplesNacional';
  economy: number;
}

export class TaxCalculator {
  private config: TaxConfig;

  constructor() {
    this.config = this.getConfig();
  }

  private getConfig(): TaxConfig {
    const savedConfig = localStorage.getItem('taxConfig');
    if (savedConfig) {
      return JSON.parse(savedConfig);
    }

    // Configuração padrão
    return {
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
        'SP': 18, 'RJ': 18, 'MG': 18, 'RS': 18, 'PR': 18,
        'SC': 17, 'BA': 18, 'GO': 17, 'PE': 18, 'CE': 18,
      },
      contribuicaoPrevidenciaria: {
        patronal: 20,
        terceiros: 5.8,
        rat: 1,
        salarioEducacao: 2.5,
      },
    };
  }

  calculateDetailedTaxes(companyData: CompanyData): DetailedTaxResults {
    const profit = companyData.revenue - companyData.costs;
    const icmsRate = this.config.icmsEstadual[companyData.state] || this.config.lucroReal.icmsGeral;

    // Cálculo Lucro Real
    const lucroReal = this.calculateLucroReal(companyData.revenue, profit, companyData.payroll, icmsRate);
    
    // Cálculo Lucro Presumido
    const lucroPresumido = this.calculateLucroPresumido(companyData.revenue, companyData.sector, companyData.payroll, icmsRate);
    
    // Cálculo Simples Nacional
    const simplesNacional = this.calculateSimplesNacional(companyData.revenue, companyData.sector, companyData.payroll);

    // Determinar melhor opção
    const totals = [lucroReal.total, lucroPresumido.total, simplesNacional.total];
    const minTotal = Math.min(...totals);
    const maxTotal = Math.max(...totals);
    
    let bestOption: 'lucroReal' | 'lucroPresumido' | 'simplesNacional' = 'lucroReal';
    if (minTotal === lucroPresumido.total) bestOption = 'lucroPresumido';
    if (minTotal === simplesNacional.total) bestOption = 'simplesNacional';

    return {
      lucroReal,
      lucroPresumido,
      simplesNacional,
      bestOption,
      economy: maxTotal - minTotal
    };
  }

  private calculateLucroReal(revenue: number, profit: number, payroll: number, icmsRate: number) {
    const irpj = profit * (this.config.lucroReal.irpj / 100);
    const irpjAdicional = profit > 240000 ? (profit - 240000) * (this.config.lucroReal.irpjAdicional / 100) : 0;
    const csll = profit * (this.config.lucroReal.csll / 100);
    const pis = revenue * (this.config.lucroReal.pisNaoCumulativo / 100);
    const cofins = revenue * (this.config.lucroReal.cofinsNaoCumulativo / 100);
    const icms = revenue * (icmsRate / 100);
    const inss = payroll * (this.config.contribuicaoPrevidenciaria.patronal / 100);

    const detalhes = [
      `IRPJ: ${this.config.lucroReal.irpj}% sobre lucro de R$ ${profit.toLocaleString()}`,
      irpjAdicional > 0 ? `IRPJ Adicional: ${this.config.lucroReal.irpjAdicional}% sobre excesso de R$ 240.000` : '',
      `CSLL: ${this.config.lucroReal.csll}% sobre lucro`,
      `PIS: ${this.config.lucroReal.pisNaoCumulativo}% sobre receita (não cumulativo)`,
      `COFINS: ${this.config.lucroReal.cofinsNaoCumulativo}% sobre receita (não cumulativo)`,
      `ICMS: ${icmsRate}% sobre receita`,
      `INSS Patronal: ${this.config.contribuicaoPrevidenciaria.patronal}% sobre folha`
    ].filter(Boolean);

    return {
      irpj,
      irpjAdicional,
      csll,
      pis,
      cofins,
      icms,
      inss,
      total: irpj + irpjAdicional + csll + pis + cofins + icms + inss,
      detalhes
    };
  }

  private calculateLucroPresumido(revenue: number, sector: string, payroll: number, icmsRate: number) {
    let presumptionRate = this.config.lucroPresumido.presumidoComercio;
    if (sector === 'industria') presumptionRate = this.config.lucroPresumido.presumidoIndustria;
    if (sector === 'servicos') presumptionRate = this.config.lucroPresumido.presumidoServicos;

    const presumedProfit = revenue * (presumptionRate / 100);
    const irpj = presumedProfit * (this.config.lucroPresumido.irpj / 100);
    const csll = presumedProfit * (this.config.lucroPresumido.csll / 100);
    const pis = revenue * (this.config.lucroPresumido.pisCumulativo / 100);
    const cofins = revenue * (this.config.lucroPresumido.cofinsCumulativo / 100);
    const icms = revenue * (icmsRate / 100);
    const inss = payroll * (this.config.contribuicaoPrevidenciaria.patronal / 100);

    const detalhes = [
      `Presunção de lucro: ${presumptionRate}% para ${sector}`,
      `IRPJ: ${this.config.lucroPresumido.irpj}% sobre lucro presumido de R$ ${presumedProfit.toLocaleString()}`,
      `CSLL: ${this.config.lucroPresumido.csll}% sobre lucro presumido`,
      `PIS: ${this.config.lucroPresumido.pisCumulativo}% sobre receita (cumulativo)`,
      `COFINS: ${this.config.lucroPresumido.cofinsCumulativo}% sobre receita (cumulativo)`,
      `ICMS: ${icmsRate}% sobre receita`,
      `INSS Patronal: ${this.config.contribuicaoPrevidenciaria.patronal}% sobre folha`
    ];

    return {
      irpj,
      csll,
      pis,
      cofins,
      icms,
      inss,
      total: irpj + csll + pis + cofins + icms + inss,
      detalhes
    };
  }

  private calculateSimplesNacional(revenue: number, sector: string, payroll: number) {
    let anexo = 'anexo1';
    if (sector === 'industria') anexo = 'anexo2';
    if (sector === 'servicos') anexo = 'anexo3';

    const faixas = (this.config.simplesNacional as any)[anexo];
    let aliquota = 4;
    let faixaAtual = 'Faixa 1';

    for (const [faixa, dados] of Object.entries(faixas)) {
      if (revenue <= (dados as any).limite) {
        aliquota = (dados as any).aliquota;
        faixaAtual = faixa.replace('faixa', 'Faixa ');
        break;
      }
    }

    const das = revenue * (aliquota / 100);
    const inss = payroll * (this.config.contribuicaoPrevidenciaria.patronal / 100);

    const detalhes = [
      `${anexo.replace('anexo', 'Anexo ')} - ${sector}`,
      `${faixaAtual}: ${aliquota}% sobre receita`,
      `DAS: R$ ${das.toLocaleString()}`,
      `INSS Patronal: ${this.config.contribuicaoPrevidenciaria.patronal}% sobre folha`
    ];

    return {
      das,
      inss,
      total: das + inss,
      faixa: faixaAtual,
      aliquota,
      detalhes
    };
  }
}
