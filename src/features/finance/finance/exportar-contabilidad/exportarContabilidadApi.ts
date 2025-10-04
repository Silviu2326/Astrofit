import { ExportData, ExportHistoryItem, ReportData, AutomationSettings, ValidationResult } from './types';

// Mock data for API simulation
const mockExportHistory: ExportHistoryItem[] = [
  { id: 'exp001', date: '2024-09-01', type: 'Excel', period: 'Q3 2024', status: 'Completed' },
  { id: 'exp002', date: '2024-08-15', type: 'CSV', period: 'August 2024', status: 'Completed' },
  { id: 'exp003', date: '2024-07-20', type: 'Excel', period: 'Q2 2024', status: 'Failed' },
];

const mockReportData: ReportData = {
  income: [
    { month: 'Jan', amount: 5000 },
    { month: 'Feb', amount: 5500 },
    { month: 'Mar', amount: 6000 },
  ],
  expenses: [
    { month: 'Jan', amount: 2000 },
    { month: 'Feb', amount: 2200 },
    { month: 'Mar', amount: 2500 },
  ],
  taxes: [
    { month: 'Jan', amount: 800 },
    { month: 'Feb', amount: 900 },
    { month: 'Mar', amount: 1000 },
  ],
};

const mockValidationResult: ValidationResult = {
  isValid: true,
  errors: [],
  warnings: ['Some transactions are uncategorized.'],
};

// Define types for better type safety and clarity
export interface ExportData {
  format: 'excel' | 'csv';
  period: string;
  categories: string[];
}

export interface ExportHistoryItem {
  id: string;
  date: string;
  type: string;
  period: string;
  status: 'Completed' | 'Failed' | 'Pending';
}

export interface ReportData {
  income: { month: string; amount: number }[];
  expenses: { month: string; amount: number }[];
  taxes: { month: string; amount: number }[];
}

export interface AutomationSettings {
  frequency: 'monthly' | 'quarterly';
  recipients: string[];
  lastSent?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Simulates an API call to export accounting data.
 * @param data - The export configuration.
 * @returns A promise that resolves with a success message.
 */
export const exportAccountingData = async (data: ExportData): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Exporting data:', data);
      resolve(`Data exported successfully in ${data.format} format for period ${data.period}.`);
    }, 1000);
  });
};

/**
 * Simulates an API call to fetch export history.
 * @returns A promise that resolves with a list of export history items.
 */
export const getExportHistory = async (): Promise<ExportHistoryItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockExportHistory);
    }, 500);
  });
};

/**
 * Simulates an API call to fetch specific reports for a gestor.
 * @param period - The period for which to fetch reports (e.g., 'Q3 2024').
 * @returns A promise that resolves with report data.
 */
export const getGestorReports = async (period: string): Promise<ReportData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Fetching reports for period:', period);
      resolve(mockReportData);
    }, 700);
  });
};

/**
 * Simulates an API call to update automation settings for accounting exports.
 * @param settings - The automation settings to save.
 * @returns A promise that resolves with a success message.
 */
export const updateAutomationSettings = async (settings: AutomationSettings): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Updating automation settings:', settings);
      resolve('Automation settings updated successfully.');
    }, 800);
  });
};

/**
 * Simulates an API call to validate accounting data before export.
 * @param period - The period for which to validate data.
 * @returns A promise that resolves with validation results.
 */
export const validateAccountingData = async (period: string): Promise<ValidationResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Validating data for period:', period);
      resolve(mockValidationResult);
    }, 1200);
  });
};
