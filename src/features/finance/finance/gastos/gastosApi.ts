
import { Expense } from '../../types'; // Assuming a types file exists at this path

export interface FixedExpense {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  category: string;
  receiptUrl?: string;
}

export interface VariableExpense {
  id: string;
  name: string;
  amount: number;
  date: string;
  category: string;
  receiptUrl?: string;
}

export interface ExpenseCategory {
  id: string;
  name: string;
  type: 'fixed' | 'variable';
}

export interface MonthlyBudget {
  id: string;
  category: string;
  limit: number;
  currentSpent: number;
}

// Mock Data
const mockFixedExpenses: FixedExpense[] = [
  { id: 'fe1', name: 'Alquiler de Sala', amount: 500, dueDate: '2025-10-01', category: 'Alquiler' },
  { id: 'fe2', name: 'Seguro de Responsabilidad', amount: 100, dueDate: '2025-10-15', category: 'Seguros' },
  { id: 'fe3', name: 'Licencia Software CRM', amount: 50, dueDate: '2025-10-20', category: 'Software' },
];

const mockVariableExpenses: VariableExpense[] = [
  { id: 've1', name: 'Balones de Fútbol', amount: 120, date: '2025-09-20', category: 'Material Deportivo' },
  { id: 've2', name: 'Campaña Instagram', amount: 80, date: '2025-09-22', category: 'Publicidad' },
  { id: 've3', name: 'Gasolina Viaje Cliente', amount: 40, date: '2025-09-25', category: 'Desplazamientos' },
];

const mockCategories: ExpenseCategory[] = [
  { id: 'cat1', name: 'Alquiler', type: 'fixed' },
  { id: 'cat2', name: 'Seguros', type: 'fixed' },
  { id: 'cat3', name: 'Software', type: 'fixed' },
  { id: 'cat4', name: 'Material Deportivo', type: 'variable' },
  { id: 'cat5', name: 'Publicidad', type: 'variable' },
  { id: 'cat6', name: 'Desplazamientos', type: 'variable' },
  { id: 'cat7', name: 'Alimentación', type: 'variable' },
  { id: 'cat8', name: 'Suministros', type: 'variable' },
  { id: 'cat9', name: 'Marketing', type: 'variable' },
];

const mockMonthlyBudgets: MonthlyBudget[] = [
  { id: 'mb1', category: 'Alimentación', limit: 300, currentSpent: 250 },
  { id: 'mb2', category: 'Marketing', limit: 200, currentSpent: 180 },
  { id: 'mb3', category: 'Material Deportivo', limit: 150, currentSpent: 120 },
];

// Mock API calls
export const gastosApi = {
  getFixedExpenses: async (): Promise<FixedExpense[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(mockFixedExpenses), 500));
  },
  getVariableExpenses: async (): Promise<VariableExpense[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(mockVariableExpenses), 500));
  },
  getCategories: async (): Promise<ExpenseCategory[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(mockCategories), 500));
  },
  getMonthlyBudgets: async (): Promise<MonthlyBudget[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(mockMonthlyBudgets), 500));
  },
  // Add more API functions as needed for adding, updating, deleting expenses/budgets
};
