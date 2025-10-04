
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Definiciones de tipos para los datos de impuestos
export interface TaxRate {
  id: string;
  name: string;
  rate: number;
  type: 'IVA' | 'OTHER';
  appliesTo: 'services' | 'products' | 'both';
}

export interface TaxExemption {
  id: string;
  name: string;
  description: string;
  criteria: string; // e.g., 'client_type:non-profit', 'service_code:EXEMPT001'
}

export interface TaxCalculation {
  id: string;
  invoiceId: string;
  amount: number;
  taxAmount: number;
  totalAmount: number;
  taxRatesApplied: string[]; // IDs of applied tax rates
  calculationDate: string;
}

export interface QuarterlyReport {
  id: string;
  quarter: string;
  year: number;
  totalSales: number;
  totalTaxCollected: number;
  totalExemptions: number;
  reportDate: string;
  status: 'draft' | 'submitted' | 'filed';
  details: TaxCalculation[]; // Simplified for mock, in real app might be summary
}

export interface TaxHistoryEntry {
  id: string;
  period: string; // e.g., 'Q1-2023'
  totalTaxCollected: number;
  totalTaxPaid: number;
  balance: number;
  dateRecorded: string;
}

// Mock Data
const mockTaxRates: TaxRate[] = [
  { id: 'iva_general', name: 'IVA General', rate: 0.21, type: 'IVA', appliesTo: 'both' },
  { id: 'iva_reducido', name: 'IVA Reducido', rate: 0.10, type: 'IVA', appliesTo: 'both' },
  { id: 'iva_superreducido', name: 'IVA Superreducido', rate: 0.04, type: 'IVA', appliesTo: 'products' },
  { id: 'impuesto_servicios', name: 'Impuesto Servicios Digitales', rate: 0.05, type: 'OTHER', appliesTo: 'services' },
];

const mockExemptions: TaxExemption[] = [
  { id: 'ex_non_profit', name: 'Organizaciones sin ánimo de lucro', description: 'Exención para servicios a entidades sin ánimo de lucro', criteria: 'client_type:non-profit' },
  { id: 'ex_export', name: 'Exportaciones', description: 'Exención de IVA para exportaciones de bienes y servicios', criteria: 'transaction_type:export' },
];

const mockTaxCalculations: TaxCalculation[] = [
  { id: 'calc_001', invoiceId: 'INV-2023-001', amount: 100, taxAmount: 21, totalAmount: 121, taxRatesApplied: ['iva_general'], calculationDate: '2023-01-15' },
  { id: 'calc_002', invoiceId: 'INV-2023-002', amount: 50, taxAmount: 5, totalAmount: 55, taxRatesApplied: ['iva_reducido'], calculationDate: '2023-02-20' },
];

const mockQuarterlyReports: QuarterlyReport[] = [
  { id: 'qr_2023_q1', quarter: 'Q1', year: 2023, totalSales: 15000, totalTaxCollected: 3150, totalExemptions: 500, reportDate: '2023-04-10', status: 'submitted', details: [] },
];

const mockTaxHistory: TaxHistoryEntry[] = [
  { id: 'th_2023_q1', period: 'Q1-2023', totalTaxCollected: 3150, totalTaxPaid: 3150, balance: 0, dateRecorded: '2023-04-10' },
  { id: 'th_2023_q2', period: 'Q2-2023', totalTaxCollected: 4500, totalTaxPaid: 4000, balance: 500, dateRecorded: '2023-07-12' },
];

// API Slice (using a simplified approach without actual fetch for mock data)
export const impuestosApi = createApi({
  reducerPath: 'impuestosApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }), // Base URL is not used for mock data
  endpoints: (builder) => ({
    getTaxRates: builder.query<TaxRate[], void>({
      queryFn: () => ({ data: mockTaxRates }),
    }),
    getTaxExemptions: builder.query<TaxExemption[], void>({
      queryFn: () => ({ data: mockExemptions }),
    }),
    getTaxCalculations: builder.query<TaxCalculation[], void>({
      queryFn: () => ({ data: mockTaxCalculations }),
    }),
    getQuarterlyReports: builder.query<QuarterlyReport[], void>({
      queryFn: () => ({ data: mockQuarterlyReports }),
    }),
    getTaxHistory: builder.query<TaxHistoryEntry[], void>({
      queryFn: () => ({ data: mockTaxHistory }),
    }),
    // Add mutations for creating/updating/deleting if needed
  }),
});

export const { useGetTaxRatesQuery, useGetTaxExemptionsQuery, useGetTaxCalculationsQuery, useGetQuarterlyReportsQuery, useGetTaxHistoryQuery } = impuestosApi;
