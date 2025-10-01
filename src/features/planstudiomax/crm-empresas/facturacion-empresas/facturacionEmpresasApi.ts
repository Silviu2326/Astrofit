import { useState, useEffect } from 'react';

export interface Factura {
  id: string;
  empresa: string;
  periodo: string;
  total: number;
  estado: 'pagada' | 'pendiente' | 'vencida';
  recurrente: boolean;
}

const generateMockFacturas = (count: number): Factura[] => {
  const facturas: Factura[] = [];
  const estados: ('pagada' | 'pendiente' | 'vencida')[] = ['pagada', 'pendiente', 'vencida'];
  const empresas = ['Tech Solutions Inc.', 'Global Innovations', 'Creative Minds LLC', 'Future Systems Co.'];

  for (let i = 1; i <= count; i++) {
    const randomEmpresa = empresas[Math.floor(Math.random() * empresas.length)];
    const randomEstado = estados[Math.floor(Math.random() * estados.length)];
    const randomTotal = parseFloat((Math.random() * 1000 + 100).toFixed(2));
    const randomMonth = Math.floor(Math.random() * 12) + 1;
    const randomYear = 2024; // Assuming current year for simplicity
    const periodo = `${randomYear}-${String(randomMonth).padStart(2, '0')}`;

    facturas.push({
      id: `INV-${1000 + i}`,
      empresa: randomEmpresa,
      periodo: periodo,
      total: randomTotal,
      estado: randomEstado,
      recurrente: Math.random() > 0.5,
    });
  }
  return facturas;
};

const mockFacturas: Factura[] = generateMockFacturas(20);

export const useFacturas = () => {
  const [data, setData] = useState<Factura[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchFacturas = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setData(mockFacturas);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFacturas();
  }, []);

  return { data, isLoading, error };
};

export const generateAutomaticInvoice = async (usageData: any) => {
  console.log('Generating automatic invoice with usage data:', usageData);
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  const newInvoiceId = `AUTO-INV-${Math.floor(Math.random() * 10000)}`;
  console.log('Automatic invoice generated:', newInvoiceId);
  return { success: true, invoiceId: newInvoiceId };
};

export const generateExecutiveReport = async (reportParams: any) => {
  console.log('Generating executive report with params:', reportParams);
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500));
  const reportData = { title: 'Executive Summary', date: new Date().toISOString(), ...reportParams };
  console.log('Executive report generated:', reportData);
  return { success: true, reportData };
};
