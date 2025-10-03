import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import {
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  Target,
  Calendar,
  Plus,
  Upload,
  Settings,
  Search,
  Filter,
  Download,
  Mail,
  Eye,
  Edit,
  Grid3x3,
  List,
  X,
  DollarSign,
  CreditCard,
  Send,
  TrendingUp,
  TrendingDown,
  BarChart3,
  FileSpreadsheet,
  MoreVertical,
  ArrowUpDown,
} from 'lucide-react';

// Types
interface InvoiceLine {
  id: string;
  concept: string;
  description: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  subtotal: number;
}

interface Payment {
  id: string;
  date: string;
  amount: number;
  method: string;
  reference: string;
  notes?: string;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  clientName: string;
  clientAvatar: string;
  clientEmail: string;
  issueDate: string;
  dueDate: string;
  concept: string;
  lines: InvoiceLine[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  paymentMethod: string;
  payments: Payment[];
  paidAmount: number;
  remainingAmount: number;
  notes?: string;
  remindersSent: number;
  lastReminderDate?: string;
}

type ViewMode = 'table' | 'cards';
type TabType = 'all' | 'pending' | 'paid' | 'overdue' | 'draft';
type SortField = 'invoiceNumber' | 'clientName' | 'issueDate' | 'dueDate' | 'total' | 'status';
type SortDirection = 'asc' | 'desc';

// Mock Data
const mockInvoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2025-001',
    clientId: 'c1',
    clientName: 'María García',
    clientAvatar: 'https://i.pravatar.cc/150?img=1',
    clientEmail: 'maria.garcia@email.com',
    issueDate: '2025-09-01',
    dueDate: '2025-09-15',
    concept: 'Plan Premium Mensual - Septiembre',
    lines: [
      { id: 'l1', concept: 'Plan Premium', description: 'Acceso completo mensual', quantity: 1, unitPrice: 99, discount: 0, subtotal: 99 }
    ],
    subtotal: 99,
    discount: 0,
    tax: 20.79,
    total: 119.79,
    status: 'paid',
    paymentMethod: 'Tarjeta de crédito',
    payments: [{ id: 'p1', date: '2025-09-10', amount: 119.79, method: 'Tarjeta de crédito', reference: 'TXN-001' }],
    paidAmount: 119.79,
    remainingAmount: 0,
    remindersSent: 0,
  },
  {
    id: '2',
    invoiceNumber: 'INV-2025-002',
    clientId: 'c2',
    clientName: 'Carlos Rodríguez',
    clientAvatar: 'https://i.pravatar.cc/150?img=2',
    clientEmail: 'carlos.rodriguez@email.com',
    issueDate: '2025-09-03',
    dueDate: '2025-09-17',
    concept: 'Sesión de coaching empresarial',
    lines: [
      { id: 'l1', concept: 'Sesión individual', description: '2 horas de coaching ejecutivo', quantity: 2, unitPrice: 150, discount: 10, subtotal: 270 }
    ],
    subtotal: 300,
    discount: 30,
    tax: 56.7,
    total: 326.7,
    status: 'paid',
    paymentMethod: 'Transferencia bancaria',
    payments: [{ id: 'p1', date: '2025-09-15', amount: 326.7, method: 'Transferencia', reference: 'TRANS-002' }],
    paidAmount: 326.7,
    remainingAmount: 0,
    remindersSent: 1,
    lastReminderDate: '2025-09-14',
  },
  {
    id: '3',
    invoiceNumber: 'INV-2025-003',
    clientId: 'c3',
    clientName: 'Ana Martínez',
    clientAvatar: 'https://i.pravatar.cc/150?img=3',
    clientEmail: 'ana.martinez@email.com',
    issueDate: '2025-08-15',
    dueDate: '2025-08-30',
    concept: 'Paquete de 10 sesiones',
    lines: [
      { id: 'l1', concept: 'Pack 10 sesiones', description: 'Sesiones de 1 hora', quantity: 10, unitPrice: 80, discount: 15, subtotal: 680 }
    ],
    subtotal: 800,
    discount: 120,
    tax: 142.8,
    total: 822.8,
    status: 'overdue',
    paymentMethod: 'Transferencia bancaria',
    payments: [],
    paidAmount: 0,
    remainingAmount: 822.8,
    remindersSent: 3,
    lastReminderDate: '2025-09-25',
  },
  {
    id: '4',
    invoiceNumber: 'INV-2025-004',
    clientId: 'c4',
    clientName: 'Luis Fernández',
    clientAvatar: 'https://i.pravatar.cc/150?img=4',
    clientEmail: 'luis.fernandez@email.com',
    issueDate: '2025-09-20',
    dueDate: '2025-10-05',
    concept: 'Consultoría estratégica',
    lines: [
      { id: 'l1', concept: 'Consultoría', description: 'Análisis y plan estratégico', quantity: 1, unitPrice: 1500, discount: 0, subtotal: 1500 }
    ],
    subtotal: 1500,
    discount: 0,
    tax: 315,
    total: 1815,
    status: 'sent',
    paymentMethod: 'Transferencia bancaria',
    payments: [],
    paidAmount: 0,
    remainingAmount: 1815,
    remindersSent: 0,
  },
  {
    id: '5',
    invoiceNumber: 'INV-2025-005',
    clientId: 'c5',
    clientName: 'Elena Torres',
    clientAvatar: 'https://i.pravatar.cc/150?img=5',
    clientEmail: 'elena.torres@email.com',
    issueDate: '2025-09-25',
    dueDate: '2025-10-10',
    concept: 'Plan Básico - Septiembre',
    lines: [
      { id: 'l1', concept: 'Plan Básico', description: 'Acceso mensual básico', quantity: 1, unitPrice: 49, discount: 0, subtotal: 49 }
    ],
    subtotal: 49,
    discount: 0,
    tax: 10.29,
    total: 59.29,
    status: 'sent',
    paymentMethod: 'Tarjeta de crédito',
    payments: [],
    paidAmount: 0,
    remainingAmount: 59.29,
    remindersSent: 0,
  },
  {
    id: '6',
    invoiceNumber: 'INV-2025-006',
    clientId: 'c6',
    clientName: 'Pedro Sánchez',
    clientAvatar: 'https://i.pravatar.cc/150?img=6',
    clientEmail: 'pedro.sanchez@email.com',
    issueDate: '2025-08-10',
    dueDate: '2025-08-25',
    concept: 'Workshop grupal',
    lines: [
      { id: 'l1', concept: 'Workshop', description: 'Taller de 4 horas', quantity: 1, unitPrice: 350, discount: 0, subtotal: 350 }
    ],
    subtotal: 350,
    discount: 0,
    tax: 73.5,
    total: 423.5,
    status: 'overdue',
    paymentMethod: 'Efectivo',
    payments: [],
    paidAmount: 0,
    remainingAmount: 423.5,
    remindersSent: 4,
    lastReminderDate: '2025-09-28',
  },
  {
    id: '7',
    invoiceNumber: 'INV-2025-007',
    clientId: 'c7',
    clientName: 'Isabel Jiménez',
    clientAvatar: 'https://i.pravatar.cc/150?img=7',
    clientEmail: 'isabel.jimenez@email.com',
    issueDate: '2025-09-28',
    dueDate: '2025-10-13',
    concept: 'Sesión de mentoring',
    lines: [
      { id: 'l1', concept: 'Mentoring', description: 'Sesión individual 1.5h', quantity: 1, unitPrice: 120, discount: 0, subtotal: 120 }
    ],
    subtotal: 120,
    discount: 0,
    tax: 25.2,
    total: 145.2,
    status: 'draft',
    paymentMethod: 'Tarjeta de crédito',
    payments: [],
    paidAmount: 0,
    remainingAmount: 145.2,
    remindersSent: 0,
  },
  {
    id: '8',
    invoiceNumber: 'INV-2025-008',
    clientId: 'c8',
    clientName: 'Javier López',
    clientAvatar: 'https://i.pravatar.cc/150?img=8',
    clientEmail: 'javier.lopez@email.com',
    issueDate: '2025-09-05',
    dueDate: '2025-09-20',
    concept: 'Paquete corporativo',
    lines: [
      { id: 'l1', concept: 'Pack corporativo', description: '5 sesiones grupales', quantity: 5, unitPrice: 200, discount: 20, subtotal: 800 }
    ],
    subtotal: 1000,
    discount: 200,
    tax: 168,
    total: 968,
    status: 'paid',
    paymentMethod: 'Transferencia bancaria',
    payments: [
      { id: 'p1', date: '2025-09-12', amount: 500, method: 'Transferencia', reference: 'TRANS-008-1' },
      { id: 'p2', date: '2025-09-18', amount: 468, method: 'Transferencia', reference: 'TRANS-008-2' }
    ],
    paidAmount: 968,
    remainingAmount: 0,
    remindersSent: 1,
  },
  {
    id: '9',
    invoiceNumber: 'INV-2025-009',
    clientId: 'c9',
    clientName: 'Laura Gómez',
    clientAvatar: 'https://i.pravatar.cc/150?img=9',
    clientEmail: 'laura.gomez@email.com',
    issueDate: '2025-09-22',
    dueDate: '2025-10-07',
    concept: 'Plan Premium Anual',
    lines: [
      { id: 'l1', concept: 'Plan Premium Anual', description: 'Acceso completo 12 meses', quantity: 1, unitPrice: 990, discount: 10, subtotal: 891 }
    ],
    subtotal: 990,
    discount: 99,
    tax: 187.11,
    total: 1078.11,
    status: 'sent',
    paymentMethod: 'Tarjeta de crédito',
    payments: [],
    paidAmount: 0,
    remainingAmount: 1078.11,
    remindersSent: 0,
  },
  {
    id: '10',
    invoiceNumber: 'INV-2025-010',
    clientId: 'c10',
    clientName: 'Miguel Ruiz',
    clientAvatar: 'https://i.pravatar.cc/150?img=10',
    clientEmail: 'miguel.ruiz@email.com',
    issueDate: '2025-08-20',
    dueDate: '2025-09-05',
    concept: 'Formación especializada',
    lines: [
      { id: 'l1', concept: 'Formación', description: 'Curso intensivo 2 días', quantity: 1, unitPrice: 650, discount: 0, subtotal: 650 }
    ],
    subtotal: 650,
    discount: 0,
    tax: 136.5,
    total: 786.5,
    status: 'overdue',
    paymentMethod: 'Transferencia bancaria',
    payments: [],
    paidAmount: 0,
    remainingAmount: 786.5,
    remindersSent: 2,
    lastReminderDate: '2025-09-20',
  },
  // Añadiendo más facturas para llegar a 35
  {
    id: '11',
    invoiceNumber: 'INV-2025-011',
    clientId: 'c11',
    clientName: 'Carmen Díaz',
    clientAvatar: 'https://i.pravatar.cc/150?img=11',
    clientEmail: 'carmen.diaz@email.com',
    issueDate: '2025-07-15',
    dueDate: '2025-07-30',
    concept: 'Sesiones de grupo',
    lines: [
      { id: 'l1', concept: 'Pack 5 sesiones grupales', description: 'Sesiones de 2 horas', quantity: 5, unitPrice: 60, discount: 0, subtotal: 300 }
    ],
    subtotal: 300,
    discount: 0,
    tax: 63,
    total: 363,
    status: 'paid',
    paymentMethod: 'Efectivo',
    payments: [{ id: 'p1', date: '2025-07-28', amount: 363, method: 'Efectivo', reference: 'CASH-011' }],
    paidAmount: 363,
    remainingAmount: 0,
    remindersSent: 0,
  },
  {
    id: '12',
    invoiceNumber: 'INV-2025-012',
    clientId: 'c12',
    clientName: 'Roberto Morales',
    clientAvatar: 'https://i.pravatar.cc/150?img=12',
    clientEmail: 'roberto.morales@email.com',
    issueDate: '2025-09-10',
    dueDate: '2025-09-25',
    concept: 'Asesoría personalizada',
    lines: [
      { id: 'l1', concept: 'Asesoría', description: '3 horas de asesoría', quantity: 3, unitPrice: 100, discount: 5, subtotal: 285 }
    ],
    subtotal: 300,
    discount: 15,
    tax: 59.85,
    total: 344.85,
    status: 'paid',
    paymentMethod: 'Tarjeta de crédito',
    payments: [{ id: 'p1', date: '2025-09-23', amount: 344.85, method: 'Tarjeta', reference: 'CARD-012' }],
    paidAmount: 344.85,
    remainingAmount: 0,
    remindersSent: 1,
  },
  {
    id: '13',
    invoiceNumber: 'INV-2025-013',
    clientId: 'c13',
    clientName: 'Sofía Navarro',
    clientAvatar: 'https://i.pravatar.cc/150?img=13',
    clientEmail: 'sofia.navarro@email.com',
    issueDate: '2025-09-18',
    dueDate: '2025-10-03',
    concept: 'Plan Básico Trimestral',
    lines: [
      { id: 'l1', concept: 'Plan Básico x3', description: 'Suscripción 3 meses', quantity: 1, unitPrice: 135, discount: 0, subtotal: 135 }
    ],
    subtotal: 135,
    discount: 0,
    tax: 28.35,
    total: 163.35,
    status: 'sent',
    paymentMethod: 'Transferencia bancaria',
    payments: [],
    paidAmount: 0,
    remainingAmount: 163.35,
    remindersSent: 0,
  },
  {
    id: '14',
    invoiceNumber: 'INV-2025-014',
    clientId: 'c14',
    clientName: 'Francisco Vega',
    clientAvatar: 'https://i.pravatar.cc/150?img=14',
    clientEmail: 'francisco.vega@email.com',
    issueDate: '2025-08-01',
    dueDate: '2025-08-16',
    concept: 'Workshop liderazgo',
    lines: [
      { id: 'l1', concept: 'Workshop', description: 'Taller de liderazgo 6h', quantity: 1, unitPrice: 450, discount: 0, subtotal: 450 }
    ],
    subtotal: 450,
    discount: 0,
    tax: 94.5,
    total: 544.5,
    status: 'paid',
    paymentMethod: 'Tarjeta de crédito',
    payments: [{ id: 'p1', date: '2025-08-14', amount: 544.5, method: 'Tarjeta', reference: 'CARD-014' }],
    paidAmount: 544.5,
    remainingAmount: 0,
    remindersSent: 0,
  },
  {
    id: '15',
    invoiceNumber: 'INV-2025-015',
    clientId: 'c15',
    clientName: 'Beatriz Castro',
    clientAvatar: 'https://i.pravatar.cc/150?img=15',
    clientEmail: 'beatriz.castro@email.com',
    issueDate: '2025-09-12',
    dueDate: '2025-09-27',
    concept: 'Sesión única',
    lines: [
      { id: 'l1', concept: 'Sesión individual', description: '1 hora de coaching', quantity: 1, unitPrice: 90, discount: 0, subtotal: 90 }
    ],
    subtotal: 90,
    discount: 0,
    tax: 18.9,
    total: 108.9,
    status: 'paid',
    paymentMethod: 'Efectivo',
    payments: [{ id: 'p1', date: '2025-09-26', amount: 108.9, method: 'Efectivo', reference: 'CASH-015' }],
    paidAmount: 108.9,
    remainingAmount: 0,
    remindersSent: 0,
  },
  {
    id: '16',
    invoiceNumber: 'INV-2025-016',
    clientId: 'c16',
    clientName: 'Antonio Herrera',
    clientAvatar: 'https://i.pravatar.cc/150?img=16',
    clientEmail: 'antonio.herrera@email.com',
    issueDate: '2025-07-25',
    dueDate: '2025-08-10',
    concept: 'Programa ejecutivo',
    lines: [
      { id: 'l1', concept: 'Programa ejecutivo', description: '8 sesiones personalizadas', quantity: 8, unitPrice: 150, discount: 15, subtotal: 1020 }
    ],
    subtotal: 1200,
    discount: 180,
    tax: 214.2,
    total: 1234.2,
    status: 'paid',
    paymentMethod: 'Transferencia bancaria',
    payments: [{ id: 'p1', date: '2025-08-08', amount: 1234.2, method: 'Transferencia', reference: 'TRANS-016' }],
    paidAmount: 1234.2,
    remainingAmount: 0,
    remindersSent: 0,
  },
  {
    id: '17',
    invoiceNumber: 'INV-2025-017',
    clientId: 'c17',
    clientName: 'Patricia Ortiz',
    clientAvatar: 'https://i.pravatar.cc/150?img=17',
    clientEmail: 'patricia.ortiz@email.com',
    issueDate: '2025-09-08',
    dueDate: '2025-09-23',
    concept: 'Plan Premium - Septiembre',
    lines: [
      { id: 'l1', concept: 'Plan Premium', description: 'Acceso mensual completo', quantity: 1, unitPrice: 99, discount: 0, subtotal: 99 }
    ],
    subtotal: 99,
    discount: 0,
    tax: 20.79,
    total: 119.79,
    status: 'paid',
    paymentMethod: 'Tarjeta de crédito',
    payments: [{ id: 'p1', date: '2025-09-20', amount: 119.79, method: 'Tarjeta', reference: 'CARD-017' }],
    paidAmount: 119.79,
    remainingAmount: 0,
    remindersSent: 1,
  },
  {
    id: '18',
    invoiceNumber: 'INV-2025-018',
    clientId: 'c18',
    clientName: 'Daniel Romero',
    clientAvatar: 'https://i.pravatar.cc/150?img=18',
    clientEmail: 'daniel.romero@email.com',
    issueDate: '2025-08-28',
    dueDate: '2025-09-12',
    concept: 'Consultoría breve',
    lines: [
      { id: 'l1', concept: 'Consultoría', description: '2 horas consultoría', quantity: 2, unitPrice: 120, discount: 0, subtotal: 240 }
    ],
    subtotal: 240,
    discount: 0,
    tax: 50.4,
    total: 290.4,
    status: 'overdue',
    paymentMethod: 'Transferencia bancaria',
    payments: [],
    paidAmount: 0,
    remainingAmount: 290.4,
    remindersSent: 2,
    lastReminderDate: '2025-09-26',
  },
  {
    id: '19',
    invoiceNumber: 'INV-2025-019',
    clientId: 'c19',
    clientName: 'Raquel Domínguez',
    clientAvatar: 'https://i.pravatar.cc/150?img=19',
    clientEmail: 'raquel.dominguez@email.com',
    issueDate: '2025-09-26',
    dueDate: '2025-10-11',
    concept: 'Pack 3 sesiones',
    lines: [
      { id: 'l1', concept: 'Pack 3 sesiones', description: 'Sesiones de 1 hora', quantity: 3, unitPrice: 85, discount: 0, subtotal: 255 }
    ],
    subtotal: 255,
    discount: 0,
    tax: 53.55,
    total: 308.55,
    status: 'draft',
    paymentMethod: 'Tarjeta de crédito',
    payments: [],
    paidAmount: 0,
    remainingAmount: 308.55,
    remindersSent: 0,
  },
  {
    id: '20',
    invoiceNumber: 'INV-2025-020',
    clientId: 'c20',
    clientName: 'Alberto Gil',
    clientAvatar: 'https://i.pravatar.cc/150?img=20',
    clientEmail: 'alberto.gil@email.com',
    issueDate: '2025-09-14',
    dueDate: '2025-09-29',
    concept: 'Formación online',
    lines: [
      { id: 'l1', concept: 'Curso online', description: 'Acceso curso 30 días', quantity: 1, unitPrice: 199, discount: 10, subtotal: 179.1 }
    ],
    subtotal: 199,
    discount: 19.9,
    tax: 37.611,
    total: 216.711,
    status: 'paid',
    paymentMethod: 'Tarjeta de crédito',
    payments: [{ id: 'p1', date: '2025-09-27', amount: 216.711, method: 'Tarjeta', reference: 'CARD-020' }],
    paidAmount: 216.711,
    remainingAmount: 0,
    remindersSent: 1,
  },
  {
    id: '21',
    invoiceNumber: 'INV-2025-021',
    clientId: 'c21',
    clientName: 'Mónica Serrano',
    clientAvatar: 'https://i.pravatar.cc/150?img=21',
    clientEmail: 'monica.serrano@email.com',
    issueDate: '2025-07-10',
    dueDate: '2025-07-25',
    concept: 'Mentoring empresarial',
    lines: [
      { id: 'l1', concept: 'Mentoring', description: '4 sesiones mensuales', quantity: 4, unitPrice: 130, discount: 0, subtotal: 520 }
    ],
    subtotal: 520,
    discount: 0,
    tax: 109.2,
    total: 629.2,
    status: 'paid',
    paymentMethod: 'Transferencia bancaria',
    payments: [{ id: 'p1', date: '2025-07-23', amount: 629.2, method: 'Transferencia', reference: 'TRANS-021' }],
    paidAmount: 629.2,
    remainingAmount: 0,
    remindersSent: 0,
  },
  {
    id: '22',
    invoiceNumber: 'INV-2025-022',
    clientId: 'c22',
    clientName: 'Ángel Campos',
    clientAvatar: 'https://i.pravatar.cc/150?img=22',
    clientEmail: 'angel.campos@email.com',
    issueDate: '2025-09-19',
    dueDate: '2025-10-04',
    concept: 'Plan Básico - Septiembre',
    lines: [
      { id: 'l1', concept: 'Plan Básico', description: 'Acceso mensual', quantity: 1, unitPrice: 49, discount: 0, subtotal: 49 }
    ],
    subtotal: 49,
    discount: 0,
    tax: 10.29,
    total: 59.29,
    status: 'sent',
    paymentMethod: 'Tarjeta de crédito',
    payments: [],
    paidAmount: 0,
    remainingAmount: 59.29,
    remindersSent: 0,
  },
  {
    id: '23',
    invoiceNumber: 'INV-2025-023',
    clientId: 'c23',
    clientName: 'Cristina Blanco',
    clientAvatar: 'https://i.pravatar.cc/150?img=23',
    clientEmail: 'cristina.blanco@email.com',
    issueDate: '2025-08-05',
    dueDate: '2025-08-20',
    concept: 'Workshop innovación',
    lines: [
      { id: 'l1', concept: 'Workshop', description: 'Taller de innovación 5h', quantity: 1, unitPrice: 380, discount: 0, subtotal: 380 }
    ],
    subtotal: 380,
    discount: 0,
    tax: 79.8,
    total: 459.8,
    status: 'paid',
    paymentMethod: 'Efectivo',
    payments: [{ id: 'p1', date: '2025-08-19', amount: 459.8, method: 'Efectivo', reference: 'CASH-023' }],
    paidAmount: 459.8,
    remainingAmount: 0,
    remindersSent: 0,
  },
  {
    id: '24',
    invoiceNumber: 'INV-2025-024',
    clientId: 'c24',
    clientName: 'Sergio Ramos',
    clientAvatar: 'https://i.pravatar.cc/150?img=24',
    clientEmail: 'sergio.ramos@email.com',
    issueDate: '2025-09-07',
    dueDate: '2025-09-22',
    concept: 'Sesión de evaluación',
    lines: [
      { id: 'l1', concept: 'Evaluación', description: 'Assessment completo', quantity: 1, unitPrice: 180, discount: 0, subtotal: 180 }
    ],
    subtotal: 180,
    discount: 0,
    tax: 37.8,
    total: 217.8,
    status: 'paid',
    paymentMethod: 'Tarjeta de crédito',
    payments: [{ id: 'p1', date: '2025-09-21', amount: 217.8, method: 'Tarjeta', reference: 'CARD-024' }],
    paidAmount: 217.8,
    remainingAmount: 0,
    remindersSent: 0,
  },
  {
    id: '25',
    invoiceNumber: 'INV-2025-025',
    clientId: 'c25',
    clientName: 'Natalia Prieto',
    clientAvatar: 'https://i.pravatar.cc/150?img=25',
    clientEmail: 'natalia.prieto@email.com',
    issueDate: '2025-09-23',
    dueDate: '2025-10-08',
    concept: 'Plan Premium Trimestral',
    lines: [
      { id: 'l1', concept: 'Plan Premium x3', description: 'Suscripción 3 meses', quantity: 1, unitPrice: 270, discount: 10, subtotal: 243 }
    ],
    subtotal: 270,
    discount: 27,
    tax: 51.03,
    total: 294.03,
    status: 'sent',
    paymentMethod: 'Transferencia bancaria',
    payments: [],
    paidAmount: 0,
    remainingAmount: 294.03,
    remindersSent: 0,
  },
  {
    id: '26',
    invoiceNumber: 'INV-2025-026',
    clientId: 'c26',
    clientName: 'Guillermo Pascual',
    clientAvatar: 'https://i.pravatar.cc/150?img=26',
    clientEmail: 'guillermo.pascual@email.com',
    issueDate: '2025-08-18',
    dueDate: '2025-09-02',
    concept: 'Programa de desarrollo',
    lines: [
      { id: 'l1', concept: 'Programa desarrollo', description: '6 sesiones personalizadas', quantity: 6, unitPrice: 140, discount: 12, subtotal: 739.2 }
    ],
    subtotal: 840,
    discount: 100.8,
    tax: 155.232,
    total: 894.432,
    status: 'overdue',
    paymentMethod: 'Transferencia bancaria',
    payments: [],
    paidAmount: 0,
    remainingAmount: 894.432,
    remindersSent: 3,
    lastReminderDate: '2025-09-27',
  },
  {
    id: '27',
    invoiceNumber: 'INV-2025-027',
    clientId: 'c27',
    clientName: 'Lorena Medina',
    clientAvatar: 'https://i.pravatar.cc/150?img=27',
    clientEmail: 'lorena.medina@email.com',
    issueDate: '2025-09-11',
    dueDate: '2025-09-26',
    concept: 'Sesión única coaching',
    lines: [
      { id: 'l1', concept: 'Sesión coaching', description: '1.5 horas', quantity: 1, unitPrice: 110, discount: 0, subtotal: 110 }
    ],
    subtotal: 110,
    discount: 0,
    tax: 23.1,
    total: 133.1,
    status: 'paid',
    paymentMethod: 'Tarjeta de crédito',
    payments: [{ id: 'p1', date: '2025-09-24', amount: 133.1, method: 'Tarjeta', reference: 'CARD-027' }],
    paidAmount: 133.1,
    remainingAmount: 0,
    remindersSent: 1,
  },
  {
    id: '28',
    invoiceNumber: 'INV-2025-028',
    clientId: 'c28',
    clientName: 'Víctor Iglesias',
    clientAvatar: 'https://i.pravatar.cc/150?img=28',
    clientEmail: 'victor.iglesias@email.com',
    issueDate: '2025-09-27',
    dueDate: '2025-10-12',
    concept: 'Formación especializada',
    lines: [
      { id: 'l1', concept: 'Formación', description: 'Curso especializado 3 días', quantity: 1, unitPrice: 890, discount: 0, subtotal: 890 }
    ],
    subtotal: 890,
    discount: 0,
    tax: 186.9,
    total: 1076.9,
    status: 'draft',
    paymentMethod: 'Transferencia bancaria',
    payments: [],
    paidAmount: 0,
    remainingAmount: 1076.9,
    remindersSent: 0,
  },
  {
    id: '29',
    invoiceNumber: 'INV-2025-029',
    clientId: 'c29',
    clientName: 'Alicia Vargas',
    clientAvatar: 'https://i.pravatar.cc/150?img=29',
    clientEmail: 'alicia.vargas@email.com',
    issueDate: '2025-09-16',
    dueDate: '2025-10-01',
    concept: 'Pack 5 sesiones grupales',
    lines: [
      { id: 'l1', concept: 'Pack grupal', description: '5 sesiones de 2h', quantity: 5, unitPrice: 70, discount: 0, subtotal: 350 }
    ],
    subtotal: 350,
    discount: 0,
    tax: 73.5,
    total: 423.5,
    status: 'sent',
    paymentMethod: 'Efectivo',
    payments: [],
    paidAmount: 0,
    remainingAmount: 423.5,
    remindersSent: 0,
  },
  {
    id: '30',
    invoiceNumber: 'INV-2025-030',
    clientId: 'c30',
    clientName: 'Rubén Soler',
    clientAvatar: 'https://i.pravatar.cc/150?img=30',
    clientEmail: 'ruben.soler@email.com',
    issueDate: '2025-07-28',
    dueDate: '2025-08-12',
    concept: 'Consultoría estratégica',
    lines: [
      { id: 'l1', concept: 'Consultoría', description: 'Análisis y plan 5h', quantity: 1, unitPrice: 750, discount: 0, subtotal: 750 }
    ],
    subtotal: 750,
    discount: 0,
    tax: 157.5,
    total: 907.5,
    status: 'paid',
    paymentMethod: 'Transferencia bancaria',
    payments: [{ id: 'p1', date: '2025-08-10', amount: 907.5, method: 'Transferencia', reference: 'TRANS-030' }],
    paidAmount: 907.5,
    remainingAmount: 0,
    remindersSent: 0,
  },
  {
    id: '31',
    invoiceNumber: 'INV-2025-031',
    clientId: 'c31',
    clientName: 'Sandra Flores',
    clientAvatar: 'https://i.pravatar.cc/150?img=31',
    clientEmail: 'sandra.flores@email.com',
    issueDate: '2025-09-04',
    dueDate: '2025-09-19',
    concept: 'Plan Básico - Septiembre',
    lines: [
      { id: 'l1', concept: 'Plan Básico', description: 'Acceso mensual', quantity: 1, unitPrice: 49, discount: 0, subtotal: 49 }
    ],
    subtotal: 49,
    discount: 0,
    tax: 10.29,
    total: 59.29,
    status: 'paid',
    paymentMethod: 'Tarjeta de crédito',
    payments: [{ id: 'p1', date: '2025-09-17', amount: 59.29, method: 'Tarjeta', reference: 'CARD-031' }],
    paidAmount: 59.29,
    remainingAmount: 0,
    remindersSent: 0,
  },
  {
    id: '32',
    invoiceNumber: 'INV-2025-032',
    clientId: 'c32',
    clientName: 'Marcos León',
    clientAvatar: 'https://i.pravatar.cc/150?img=32',
    clientEmail: 'marcos.leon@email.com',
    issueDate: '2025-09-21',
    dueDate: '2025-10-06',
    concept: 'Workshop productividad',
    lines: [
      { id: 'l1', concept: 'Workshop', description: 'Taller productividad 4h', quantity: 1, unitPrice: 320, discount: 0, subtotal: 320 }
    ],
    subtotal: 320,
    discount: 0,
    tax: 67.2,
    total: 387.2,
    status: 'sent',
    paymentMethod: 'Transferencia bancaria',
    payments: [],
    paidAmount: 0,
    remainingAmount: 387.2,
    remindersSent: 0,
  },
  {
    id: '33',
    invoiceNumber: 'INV-2025-033',
    clientId: 'c33',
    clientName: 'Julia Santos',
    clientAvatar: 'https://i.pravatar.cc/150?img=33',
    clientEmail: 'julia.santos@email.com',
    issueDate: '2025-08-22',
    dueDate: '2025-09-06',
    concept: 'Programa ejecutivo avanzado',
    lines: [
      { id: 'l1', concept: 'Programa ejecutivo', description: '10 sesiones premium', quantity: 10, unitPrice: 180, discount: 18, subtotal: 1476 }
    ],
    subtotal: 1800,
    discount: 324,
    tax: 309.96,
    total: 1785.96,
    status: 'paid',
    paymentMethod: 'Transferencia bancaria',
    payments: [
      { id: 'p1', date: '2025-08-30', amount: 900, method: 'Transferencia', reference: 'TRANS-033-1' },
      { id: 'p2', date: '2025-09-05', amount: 885.96, method: 'Transferencia', reference: 'TRANS-033-2' }
    ],
    paidAmount: 1785.96,
    remainingAmount: 0,
    remindersSent: 1,
  },
  {
    id: '34',
    invoiceNumber: 'INV-2025-034',
    clientId: 'c34',
    clientName: 'Emilio Ramírez',
    clientAvatar: 'https://i.pravatar.cc/150?img=34',
    clientEmail: 'emilio.ramirez@email.com',
    issueDate: '2025-09-24',
    dueDate: '2025-10-09',
    concept: 'Sesión mentoring ejecutivo',
    lines: [
      { id: 'l1', concept: 'Mentoring ejecutivo', description: '2 horas personalizadas', quantity: 1, unitPrice: 250, discount: 0, subtotal: 250 }
    ],
    subtotal: 250,
    discount: 0,
    tax: 52.5,
    total: 302.5,
    status: 'sent',
    paymentMethod: 'Tarjeta de crédito',
    payments: [],
    paidAmount: 0,
    remainingAmount: 302.5,
    remindersSent: 0,
  },
  {
    id: '35',
    invoiceNumber: 'INV-2025-035',
    clientId: 'c35',
    clientName: 'Teresa Cabrera',
    clientAvatar: 'https://i.pravatar.cc/150?img=35',
    clientEmail: 'teresa.cabrera@email.com',
    issueDate: '2025-09-29',
    dueDate: '2025-10-14',
    concept: 'Plan Premium - Octubre',
    lines: [
      { id: 'l1', concept: 'Plan Premium', description: 'Acceso completo mensual', quantity: 1, unitPrice: 99, discount: 0, subtotal: 99 }
    ],
    subtotal: 99,
    discount: 0,
    tax: 20.79,
    total: 119.79,
    status: 'draft',
    paymentMethod: 'Tarjeta de crédito',
    payments: [],
    paidAmount: 0,
    remainingAmount: 119.79,
    remindersSent: 0,
  },
];

const CobrosFacturacionPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const [showNewInvoiceModal, setShowNewInvoiceModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [sortField, setSortField] = useState<SortField>('issueDate');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [periodFilter, setPeriodFilter] = useState('all');

  // Filters
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [clientFilter, setClientFilter] = useState('');
  const [dateFromFilter, setDateFromFilter] = useState('');
  const [dateToFilter, setDateToFilter] = useState('');
  const [amountMinFilter, setAmountMinFilter] = useState('');
  const [amountMaxFilter, setAmountMaxFilter] = useState('');

  // Modal states
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  // New Invoice Modal states
  const [newInvoiceStep, setNewInvoiceStep] = useState(1);
  const [newInvoiceData, setNewInvoiceData] = useState({
    clientId: '',
    clientName: '',
    clientEmail: '',
    concept: '',
    lines: [] as InvoiceLine[],
    dueDate: '',
    notes: '',
    paymentMethod: 'Transferencia bancaria'
  });

  // Configuration Modal states
  const [configData, setConfigData] = useState({
    companyName: 'Mi Empresa',
    companyAddress: 'Calle Principal 123, Ciudad',
    companyPhone: '+34 123 456 789',
    companyEmail: 'info@miempresa.com',
    taxId: 'B12345678',
    bankAccount: 'ES12 1234 5678 9012 3456 7890',
    invoicePrefix: 'INV',
    defaultDueDays: 15,
    taxRate: 21,
    currency: 'EUR',
    language: 'es'
  });

  // Confirmation Modal states
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{
    title: string;
    message: string;
    confirmText: string;
    onConfirm: () => void;
    type: 'success' | 'warning' | 'danger';
  } | null>(null);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = mockInvoices.reduce((sum, inv) => sum + inv.total, 0);
    const paid = mockInvoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.paidAmount, 0);
    const pending = mockInvoices.filter(inv => inv.status === 'sent').reduce((sum, inv) => sum + inv.remainingAmount, 0);
    const overdue = mockInvoices.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + inv.remainingAmount, 0);
    const overdueCount = mockInvoices.filter(inv => inv.status === 'overdue').length;

    const paidInvoices = mockInvoices.filter(inv => inv.status === 'paid');
    const collectionRate = paidInvoices.length > 0 ? (paid / total) * 100 : 0;

    const avgCollectionTime = paidInvoices.length > 0
      ? paidInvoices.reduce((sum, inv) => {
          if (inv.payments.length > 0) {
            const issueDate = new Date(inv.issueDate);
            const paymentDate = new Date(inv.payments[inv.payments.length - 1].date);
            const days = Math.floor((paymentDate.getTime() - issueDate.getTime()) / (1000 * 60 * 60 * 24));
            return sum + days;
          }
          return sum;
        }, 0) / paidInvoices.length
      : 0;

    return {
      total,
      paid,
      pending,
      overdue,
      overdueCount,
      collectionRate,
      avgCollectionTime: Math.round(avgCollectionTime),
    };
  }, []);

  // Filter and sort invoices
  const filteredInvoices = useMemo(() => {
    let filtered = mockInvoices;

    // Period filter
    if (periodFilter !== 'all') {
      const today = new Date();
      const filterDate = new Date();
      
      switch (periodFilter) {
        case 'today':
          filtered = filtered.filter(inv => {
            const issueDate = new Date(inv.issueDate);
            return issueDate.toDateString() === today.toDateString();
          });
          break;
        case 'week':
          filterDate.setDate(today.getDate() - 7);
          filtered = filtered.filter(inv => new Date(inv.issueDate) >= filterDate);
          break;
        case 'month':
          filterDate.setMonth(today.getMonth() - 1);
          filtered = filtered.filter(inv => new Date(inv.issueDate) >= filterDate);
          break;
        case 'quarter':
          filterDate.setMonth(today.getMonth() - 3);
          filtered = filtered.filter(inv => new Date(inv.issueDate) >= filterDate);
          break;
        case 'year':
          filterDate.setFullYear(today.getFullYear() - 1);
          filtered = filtered.filter(inv => new Date(inv.issueDate) >= filterDate);
          break;
      }
    }

    // Tab filter
    if (activeTab !== 'all') {
      filtered = filtered.filter(inv => {
        if (activeTab === 'pending') return inv.status === 'sent';
        if (activeTab === 'paid') return inv.status === 'paid';
        if (activeTab === 'overdue') return inv.status === 'overdue';
        if (activeTab === 'draft') return inv.status === 'draft';
        return true;
      });
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(inv =>
        inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.concept.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter.length > 0) {
      filtered = filtered.filter(inv => statusFilter.includes(inv.status));
    }

    // Client filter
    if (clientFilter) {
      filtered = filtered.filter(inv =>
        inv.clientName.toLowerCase().includes(clientFilter.toLowerCase())
      );
    }

    // Date filters
    if (dateFromFilter) {
      filtered = filtered.filter(inv => inv.issueDate >= dateFromFilter);
    }
    if (dateToFilter) {
      filtered = filtered.filter(inv => inv.issueDate <= dateToFilter);
    }

    // Amount filters
    if (amountMinFilter) {
      filtered = filtered.filter(inv => inv.total >= parseFloat(amountMinFilter));
    }
    if (amountMaxFilter) {
      filtered = filtered.filter(inv => inv.total <= parseFloat(amountMaxFilter));
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      if (sortField === 'issueDate' || sortField === 'dueDate') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [mockInvoices, periodFilter, activeTab, searchTerm, statusFilter, clientFilter, dateFromFilter, dateToFilter, amountMinFilter, amountMaxFilter, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getStatusBadge = (status: Invoice['status']) => {
    const badges = {
      draft: { label: 'Borrador', color: 'bg-gray-100 text-gray-700' },
      sent: { label: 'Enviada', color: 'bg-blue-100 text-blue-700' },
      paid: { label: 'Cobrada', color: 'bg-green-100 text-green-700' },
      overdue: { label: 'Vencida', color: 'bg-red-100 text-red-700' },
      cancelled: { label: 'Cancelada', color: 'bg-gray-100 text-gray-500' },
    };
    return badges[status];
  };

  const getDaysInfo = (invoice: Invoice) => {
    const today = new Date();
    const issueDate = new Date(invoice.issueDate);
    const dueDate = new Date(invoice.dueDate);
    const daysSinceIssue = Math.floor((today.getTime() - issueDate.getTime()) / (1000 * 60 * 60 * 24));
    const daysUntilDue = Math.floor((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (invoice.status === 'paid') {
      return { text: `${daysSinceIssue}d desde emisión`, color: 'text-gray-500' };
    } else if (invoice.status === 'overdue') {
      return { text: `${Math.abs(daysUntilDue)}d de retraso`, color: 'text-red-600' };
    } else if (daysUntilDue < 0) {
      return { text: `${Math.abs(daysUntilDue)}d de retraso`, color: 'text-red-600' };
    } else if (daysUntilDue <= 3) {
      return { text: `Vence en ${daysUntilDue}d`, color: 'text-orange-600' };
    } else {
      return { text: `Vence en ${daysUntilDue}d`, color: 'text-gray-600' };
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  // Action handlers
  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowInvoiceModal(true);
  };

  const handleEditInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowNewInvoiceModal(true);
  };

  const handleSendInvoice = (invoice: Invoice) => {
    showConfirmation(
      'Enviar Factura',
      `¿Estás seguro de que quieres enviar la factura ${invoice.invoiceNumber} por email a ${invoice.clientEmail}?`,
      'Enviar',
      () => {
        toast.success(`Factura ${invoice.invoiceNumber} enviada por email exitosamente`, {
          duration: 4000,
          icon: '📧',
        });
      },
      'success'
    );
  };

  const handleDownloadPDF = (invoice: Invoice) => {
    // Simular descarga de PDF
    const link = document.createElement('a');
    link.href = '#';
    link.download = `factura-${invoice.invoiceNumber}.pdf`;
    link.click();
    toast.success(`PDF de la factura ${invoice.invoiceNumber} descargado`, {
      duration: 3000,
      icon: '📄',
    });
  };

  const handleRecordPayment = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowPaymentModal(true);
  };

  const handleBulkSendReminders = () => {
    const selectedInvoicesData = mockInvoices.filter(inv => selectedInvoices.includes(inv.id));
    showConfirmation(
      'Enviar Recordatorios',
      `¿Estás seguro de que quieres enviar recordatorios a ${selectedInvoicesData.length} facturas?`,
      'Enviar Recordatorios',
      () => {
        toast.success(`Recordatorios enviados a ${selectedInvoicesData.length} facturas`, {
          duration: 4000,
          icon: '📬',
        });
        setSelectedInvoices([]);
      },
      'success'
    );
  };

  const handleBulkDownloadPDF = () => {
    toast.success(`Descargando PDFs de ${selectedInvoices.length} facturas`, {
      duration: 3000,
      icon: '📄',
    });
  };

  const handleBulkExportExcel = () => {
    toast.success(`Exportando ${selectedInvoices.length} facturas a Excel`, {
      duration: 3000,
      icon: '📊',
    });
  };

  const handleExportInvoices = () => {
    toast.success(`Exportando ${filteredInvoices.length} facturas filtradas`, {
      duration: 3000,
      icon: '📊',
    });
  };

  const handleShowAnalytics = () => {
    setShowAnalyticsModal(true);
  };

  const handleGenerateReport = () => {
    setShowReportModal(true);
  };

  // New Invoice handlers
  const handleNewInvoiceNext = () => {
    if (newInvoiceStep < 4) {
      setNewInvoiceStep(newInvoiceStep + 1);
    }
  };

  const handleNewInvoicePrev = () => {
    if (newInvoiceStep > 1) {
      setNewInvoiceStep(newInvoiceStep - 1);
    }
  };

  const handleNewInvoiceSubmit = () => {
    // Simular creación de factura
    toast.success('Factura creada exitosamente', {
      duration: 4000,
      icon: '✅',
    });
    setShowNewInvoiceModal(false);
    setNewInvoiceStep(1);
    setNewInvoiceData({
      clientId: '',
      clientName: '',
      clientEmail: '',
      concept: '',
      lines: [],
      dueDate: '',
      notes: '',
      paymentMethod: 'Transferencia bancaria'
    });
  };

  const addInvoiceLine = () => {
    const newLine: InvoiceLine = {
      id: `line_${Date.now()}`,
      concept: '',
      description: '',
      quantity: 1,
      unitPrice: 0,
      discount: 0,
      subtotal: 0
    };
    setNewInvoiceData(prev => ({
      ...prev,
      lines: [...prev.lines, newLine]
    }));
    toast.success('Nueva línea agregada', {
      duration: 2000,
      icon: '➕',
    });
  };

  const updateInvoiceLine = (lineId: string, field: keyof InvoiceLine, value: any) => {
    setNewInvoiceData(prev => ({
      ...prev,
      lines: prev.lines.map(line => {
        if (line.id === lineId) {
          const updatedLine = { ...line, [field]: value };
          if (field === 'quantity' || field === 'unitPrice' || field === 'discount') {
            updatedLine.subtotal = updatedLine.quantity * updatedLine.unitPrice - updatedLine.discount;
          }
          return updatedLine;
        }
        return line;
      })
    }));
  };

  const removeInvoiceLine = (lineId: string) => {
    setNewInvoiceData(prev => ({
      ...prev,
      lines: prev.lines.filter(line => line.id !== lineId)
    }));
  };

  // Helper function for confirmations
  const showConfirmation = (title: string, message: string, confirmText: string, onConfirm: () => void, type: 'success' | 'warning' | 'danger' = 'warning') => {
    setConfirmAction({
      title,
      message,
      confirmText,
      onConfirm,
      type
    });
    setShowConfirmModal(true);
  };

  const handleConfirm = () => {
    if (confirmAction) {
      confirmAction.onConfirm();
      setShowConfirmModal(false);
      setConfirmAction(null);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 pb-12">
      {/* Hero Header con gradiente */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 shadow-2xl mb-8 p-8 md:p-12"
      >
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative z-10 max-w-[1920px] mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4">
                  <FileText className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                  Cobros y <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Facturación</span>
                </h1>
                <p className="text-lg md:text-xl text-blue-100 mt-2 max-w-2xl flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Gestiona tus facturas y controla tus ingresos
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <select
                  value={periodFilter}
                  onChange={(e) => setPeriodFilter(e.target.value)}
                  className="appearance-none bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-xl px-4 py-2.5 pr-8 focus:outline-none focus:ring-2 focus:ring-white/30 cursor-pointer transition-all duration-300 hover:bg-white/20"
                >
                  <option value="all" className="bg-gray-800 text-white">Todo el periodo</option>
                  <option value="today" className="bg-gray-800 text-white">Hoy</option>
                  <option value="week" className="bg-gray-800 text-white">Esta semana</option>
                  <option value="month" className="bg-gray-800 text-white">Este mes</option>
                  <option value="quarter" className="bg-gray-800 text-white">Este trimestre</option>
                  <option value="year" className="bg-gray-800 text-white">Este año</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowConfigModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300"
              >
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Config</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowImportModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300"
              >
                <Upload className="w-4 h-4" />
                <span className="hidden sm:inline">Importar</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowNewInvoiceModal(true)}
                className="flex items-center gap-2 px-6 py-2.5 bg-white text-emerald-600 font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <Plus className="w-5 h-5" />
                <span>Nueva Factura</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <div className="max-w-[1920px] mx-auto px-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 bg-blue-50 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <span className="flex items-center gap-1 text-sm font-bold text-emerald-600">
                <TrendingUp className="w-4 h-4" />
                +12.5%
              </span>
            </div>
            <p className="text-sm font-medium text-gray-600 mb-1">Total Facturado</p>
            <p className="text-3xl font-bold text-blue-600">{formatCurrency(stats.total)}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 bg-green-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <span className="flex items-center gap-1 text-sm font-bold text-emerald-600">
                <TrendingUp className="w-4 h-4" />
                +8.3%
              </span>
            </div>
            <p className="text-sm font-medium text-gray-600 mb-1">Total Cobrado</p>
            <p className="text-3xl font-bold text-green-600">{formatCurrency(stats.paid)}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 bg-orange-50 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <span className="flex items-center gap-1 text-sm font-bold text-emerald-600">
                <TrendingDown className="w-4 h-4" />
                -5.2%
              </span>
            </div>
            <p className="text-sm font-medium text-gray-600 mb-1">Pendiente de Cobro</p>
            <p className="text-3xl font-bold text-orange-600">{formatCurrency(stats.pending)}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 bg-red-50 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <span className="flex items-center gap-1 text-sm font-bold text-red-600">
                <TrendingUp className="w-4 h-4" />
                +15.8%
              </span>
            </div>
            <p className="text-sm font-medium text-gray-600 mb-1">Facturas Vencidas</p>
            <p className="text-3xl font-bold text-red-600">{formatCurrency(stats.overdue)}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 bg-purple-50 rounded-lg">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <span className="flex items-center gap-1 text-sm font-bold text-emerald-600">
                <TrendingUp className="w-4 h-4" />
                +3.2%
              </span>
            </div>
            <p className="text-sm font-medium text-gray-600 mb-1">Tasa de Cobro</p>
            <p className="text-3xl font-bold text-purple-600">{stats.collectionRate.toFixed(1)}%</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 bg-indigo-50 rounded-lg">
                <Calendar className="w-6 h-6 text-indigo-600" />
              </div>
              <span className="flex items-center gap-1 text-sm font-bold text-emerald-600">
                <TrendingDown className="w-4 h-4" />
                -2.1%
              </span>
            </div>
            <p className="text-sm font-medium text-gray-600 mb-1">Tiempo Medio Cobro</p>
            <p className="text-3xl font-bold text-indigo-600">{stats.avgCollectionTime} días</p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1920px] mx-auto px-6">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 mb-6">
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <div className="flex items-center gap-2">
            {[
              { id: 'all', label: 'Todas las Facturas', count: mockInvoices.length },
              { id: 'pending', label: 'Pendientes', count: mockInvoices.filter(i => i.status === 'sent').length },
              { id: 'paid', label: 'Cobradas', count: mockInvoices.filter(i => i.status === 'paid').length },
              { id: 'overdue', label: 'Vencidas', count: mockInvoices.filter(i => i.status === 'overdue').length },
              { id: 'draft', label: 'Borradores', count: mockInvoices.filter(i => i.status === 'draft').length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab.label}
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab.id ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'table' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'cards' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por número de factura, cliente o concepto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors ${
                showFilters ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}
            >
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filtros</span>
              {(statusFilter.length > 0 || clientFilter || dateFromFilter || dateToFilter || amountMinFilter || amountMaxFilter) && (
                <span className="w-2 h-2 bg-blue-600 rounded-full" />
              )}
            </button>
            <button 
              onClick={handleExportInvoices}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span className="text-sm font-medium">Exportar</span>
            </button>
          </div>

          {/* Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-gray-100"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                    <select
                      multiple
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(Array.from(e.target.selectedOptions, option => option.value))}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="draft">Borrador</option>
                      <option value="sent">Enviada</option>
                      <option value="paid">Cobrada</option>
                      <option value="overdue">Vencida</option>
                      <option value="cancelled">Cancelada</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
                    <input
                      type="text"
                      placeholder="Nombre del cliente"
                      value={clientFilter}
                      onChange={(e) => setClientFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha desde</label>
                    <input
                      type="date"
                      value={dateFromFilter}
                      onChange={(e) => setDateFromFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha hasta</label>
                    <input
                      type="date"
                      value={dateToFilter}
                      onChange={(e) => setDateToFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Monto mínimo</label>
                    <input
                      type="number"
                      placeholder="0.00"
                      value={amountMinFilter}
                      onChange={(e) => setAmountMinFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Monto máximo</label>
                    <input
                      type="number"
                      placeholder="9999.99"
                      value={amountMaxFilter}
                      onChange={(e) => setAmountMaxFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2 mt-4">
                  <button
                    onClick={() => {
                      setStatusFilter([]);
                      setClientFilter('');
                      setDateFromFilter('');
                      setDateToFilter('');
                      setAmountMinFilter('');
                      setAmountMaxFilter('');
                    }}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
                  >
                    Limpiar filtros
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bulk Actions */}
        <AnimatePresence>
          {selectedInvoices.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="px-6 py-3 bg-blue-50 border-b border-blue-100 flex items-center justify-between"
            >
              <span className="text-sm font-medium text-blue-900">
                {selectedInvoices.length} factura{selectedInvoices.length !== 1 ? 's' : ''} seleccionada{selectedInvoices.length !== 1 ? 's' : ''}
              </span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleBulkSendReminders}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors text-sm"
                >
                  <Mail className="w-4 h-4" />
                  Enviar recordatorios
                </button>
                <button 
                  onClick={handleBulkDownloadPDF}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors text-sm"
                >
                  <Download className="w-4 h-4" />
                  Descargar PDF
                </button>
                <button 
                  onClick={handleBulkExportExcel}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors text-sm"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  Exportar Excel
                </button>
                <button
                  onClick={() => setSelectedInvoices([])}
                  className="p-1.5 hover:bg-blue-100 rounded transition-colors"
                >
                  <X className="w-4 h-4 text-blue-600" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Table View */}
        {viewMode === 'table' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedInvoices.length === filteredInvoices.length}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedInvoices(filteredInvoices.map(inv => inv.id));
                        } else {
                          setSelectedInvoices([]);
                        }
                      }}
                      className="rounded border-gray-300"
                    />
                  </th>
                  <th className="px-6 py-3 text-left">
                    <button
                      onClick={() => handleSort('invoiceNumber')}
                      className="flex items-center gap-1 text-xs font-semibold text-gray-700 uppercase tracking-wider hover:text-blue-600"
                    >
                      Nº Factura
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <button
                      onClick={() => handleSort('clientName')}
                      className="flex items-center gap-1 text-xs font-semibold text-gray-700 uppercase tracking-wider hover:text-blue-600"
                    >
                      Cliente
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <button
                      onClick={() => handleSort('issueDate')}
                      className="flex items-center gap-1 text-xs font-semibold text-gray-700 uppercase tracking-wider hover:text-blue-600"
                    >
                      Fecha Emisión
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <button
                      onClick={() => handleSort('dueDate')}
                      className="flex items-center gap-1 text-xs font-semibold text-gray-700 uppercase tracking-wider hover:text-blue-600"
                    >
                      Vencimiento
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Concepto
                  </th>
                  <th className="px-6 py-3 text-right">
                    <button
                      onClick={() => handleSort('total')}
                      className="flex items-center gap-1 ml-auto text-xs font-semibold text-gray-700 uppercase tracking-wider hover:text-blue-600"
                    >
                      Monto
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <button
                      onClick={() => handleSort('status')}
                      className="flex items-center gap-1 text-xs font-semibold text-gray-700 uppercase tracking-wider hover:text-blue-600"
                    >
                      Estado
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Antigüedad
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Método Pago
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <AnimatePresence>
                  {filteredInvoices.map((invoice, index) => {
                    const daysInfo = getDaysInfo(invoice);
                    const statusBadge = getStatusBadge(invoice.status);

                    return (
                      <motion.tr
                        key={invoice.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: index * 0.02 }}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedInvoices.includes(invoice.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedInvoices([...selectedInvoices, invoice.id]);
                              } else {
                                setSelectedInvoices(selectedInvoices.filter(id => id !== invoice.id));
                              }
                            }}
                            className="rounded border-gray-300"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-blue-600">
                            {invoice.invoiceNumber}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={invoice.clientAvatar}
                              alt={invoice.clientName}
                              className="w-8 h-8 rounded-full"
                            />
                            <span className="text-sm font-medium text-gray-900">
                              {invoice.clientName}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-600">
                            {formatDate(invoice.issueDate)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-600">
                            {formatDate(invoice.dueDate)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-900 line-clamp-1 max-w-xs">
                            {invoice.concept}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div>
                            <span className="text-sm font-semibold text-gray-900">
                              {formatCurrency(invoice.total)}
                            </span>
                            {invoice.paidAmount > 0 && invoice.paidAmount < invoice.total && (
                              <div className="text-xs text-green-600 mt-0.5">
                                Pagado: {formatCurrency(invoice.paidAmount)}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge.color}`}>
                            {statusBadge.label}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-sm ${daysInfo.color}`}>
                            {daysInfo.text}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-600">
                            {invoice.paymentMethod}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              title="Ver factura"
                              onClick={() => handleViewInvoice(invoice)}
                              className="p-2 hover:bg-gray-100 rounded transition-colors"
                            >
                              <Eye className="w-4 h-4 text-gray-600" />
                            </button>
                            <button
                              title="Editar"
                              onClick={() => handleEditInvoice(invoice)}
                              className="p-2 hover:bg-gray-100 rounded transition-colors"
                            >
                              <Edit className="w-4 h-4 text-gray-600" />
                            </button>
                            <button
                              title="Enviar por email"
                              onClick={() => handleSendInvoice(invoice)}
                              className="p-2 hover:bg-gray-100 rounded transition-colors"
                            >
                              <Send className="w-4 h-4 text-gray-600" />
                            </button>
                            <button
                              title="Descargar PDF"
                              onClick={() => handleDownloadPDF(invoice)}
                              className="p-2 hover:bg-gray-100 rounded transition-colors"
                            >
                              <Download className="w-4 h-4 text-gray-600" />
                            </button>
                            {invoice.status !== 'paid' && invoice.status !== 'cancelled' && (
                              <button
                                title="Registrar cobro"
                                onClick={() => handleRecordPayment(invoice)}
                                className="p-2 hover:bg-green-50 rounded transition-colors"
                              >
                                <DollarSign className="w-4 h-4 text-green-600" />
                              </button>
                            )}
                            <button
                              title="Más opciones"
                              className="p-2 hover:bg-gray-100 rounded transition-colors"
                            >
                              <MoreVertical className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
            {filteredInvoices.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No se encontraron facturas</p>
              </div>
            )}
          </div>
        )}

        {/* Cards View */}
        {viewMode === 'cards' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredInvoices.map((invoice, index) => {
                  const daysInfo = getDaysInfo(invoice);
                  const statusBadge = getStatusBadge(invoice.status);
                  const progressPercentage = invoice.total > 0 ? (invoice.paidAmount / invoice.total) * 100 : 0;

                  return (
                    <motion.div
                      key={invoice.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: index * 0.03 }}
                      className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-blue-600 mb-1">
                            {invoice.invoiceNumber}
                          </h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge.color}`}>
                            {statusBadge.label}
                          </span>
                        </div>
                        <input
                          type="checkbox"
                          checked={selectedInvoices.includes(invoice.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedInvoices([...selectedInvoices, invoice.id]);
                            } else {
                              setSelectedInvoices(selectedInvoices.filter(id => id !== invoice.id));
                            }
                          }}
                          className="rounded border-gray-300"
                        />
                      </div>

                      {/* Client */}
                      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                        <img
                          src={invoice.clientAvatar}
                          alt={invoice.clientName}
                          className="w-12 h-12 rounded-full"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{invoice.clientName}</p>
                          <p className="text-sm text-gray-500">{invoice.clientEmail}</p>
                        </div>
                      </div>

                      {/* Amount */}
                      <div className="mb-4">
                        <div className="flex items-baseline justify-between mb-2">
                          <span className="text-3xl font-bold text-gray-900">
                            {formatCurrency(invoice.total)}
                          </span>
                          <span className={`text-sm font-medium ${daysInfo.color}`}>
                            {daysInfo.text}
                          </span>
                        </div>
                        {progressPercentage > 0 && progressPercentage < 100 && (
                          <div className="mt-3">
                            <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                              <span>Pagado: {formatCurrency(invoice.paidAmount)}</span>
                              <span>{progressPercentage.toFixed(0)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-green-500 h-2 rounded-full transition-all"
                                style={{ width: `${progressPercentage}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Dates */}
                      <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                        <div>
                          <p className="text-gray-500 mb-1">Emisión</p>
                          <p className="font-medium text-gray-900">{formatDate(invoice.issueDate)}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 mb-1">Vencimiento</p>
                          <p className="font-medium text-gray-900">{formatDate(invoice.dueDate)}</p>
                        </div>
                      </div>

                      {/* Concept */}
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {invoice.concept}
                        </p>
                      </div>

                      {/* Payment Method */}
                      <div className="flex items-center gap-2 mb-4 text-sm">
                        <CreditCard className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{invoice.paymentMethod}</span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                        <button 
                          onClick={() => handleViewInvoice(invoice)}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                        >
                          <Eye className="w-4 h-4" />
                          Ver
                        </button>
                        {invoice.status !== 'paid' && invoice.status !== 'cancelled' && (
                          <button 
                            onClick={() => handleRecordPayment(invoice)}
                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium"
                          >
                            <DollarSign className="w-4 h-4" />
                            Cobrar
                          </button>
                        )}
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <MoreVertical className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
            {filteredInvoices.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No se encontraron facturas</p>
              </div>
            )}
          </div>
        )}
      </div>

        {/* Summary Footer */}
        <div className="mt-6 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total de facturas</p>
              <p className="text-2xl font-bold text-gray-900">{filteredInvoices.length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Monto total</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(filteredInvoices.reduce((sum, inv) => sum + inv.total, 0))}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Cobrado</p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(filteredInvoices.reduce((sum, inv) => sum + inv.paidAmount, 0))}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Pendiente</p>
              <p className="text-2xl font-bold text-orange-600">
                {formatCurrency(filteredInvoices.reduce((sum, inv) => sum + inv.remainingAmount, 0))}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleShowAnalytics}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <BarChart3 className="w-4 h-4" />
              <span className="text-sm font-medium">Ver Analytics</span>
            </button>
            <button 
              onClick={handleGenerateReport}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span className="text-sm font-medium">Generar Reporte</span>
            </button>
          </div>
        </div>
        </div>
      </div>

      {/* New Invoice Modal */}
      <AnimatePresence>
        {showNewInvoiceModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowNewInvoiceModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
                <h2 className="text-2xl font-bold text-gray-900">Nueva Factura</h2>
                <button
                  onClick={() => setShowNewInvoiceModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Progress Steps */}
              <div className="px-6 py-4 border-b border-gray-100">
                <div className="flex items-center justify-center gap-2">
                  {[1, 2, 3, 4].map((step) => (
                    <div key={step} className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        step <= newInvoiceStep ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                      }`}>
                        {step}
                      </div>
                      <span className={`text-sm font-medium ${
                        step <= newInvoiceStep ? 'text-blue-600' : 'text-gray-500'
                      }`}>
                        {step === 1 && 'Cliente'}
                        {step === 2 && 'Líneas'}
                        {step === 3 && 'Totales'}
                        {step === 4 && 'Revisión'}
                      </span>
                      {step < 4 && (
                        <div className={`w-12 h-0.5 ${
                          step < newInvoiceStep ? 'bg-blue-600' : 'bg-gray-300'
                        }`}></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6">
                {/* Step 1: Client Information */}
                {newInvoiceStep === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-900">Información del Cliente</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Cliente</label>
                        <input
                          type="text"
                          value={newInvoiceData.clientName}
                          onChange={(e) => setNewInvoiceData(prev => ({ ...prev, clientName: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Nombre completo del cliente"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email del Cliente</label>
                        <input
                          type="email"
                          value={newInvoiceData.clientEmail}
                          onChange={(e) => setNewInvoiceData(prev => ({ ...prev, clientEmail: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="cliente@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Concepto General</label>
                        <input
                          type="text"
                          value={newInvoiceData.concept}
                          onChange={(e) => setNewInvoiceData(prev => ({ ...prev, concept: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Descripción general de la factura"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Vencimiento</label>
                        <input
                          type="date"
                          value={newInvoiceData.dueDate}
                          onChange={(e) => setNewInvoiceData(prev => ({ ...prev, dueDate: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Invoice Lines */}
                {newInvoiceStep === 2 && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-gray-900">Líneas de Factura</h3>
                      <button
                        onClick={addInvoiceLine}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Agregar Línea
                      </button>
                    </div>
                    
                    {newInvoiceData.lines.length === 0 ? (
                      <div className="text-center py-12">
                        <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">No hay líneas agregadas</p>
                        <p className="text-sm text-gray-400">Haz clic en "Agregar Línea" para comenzar</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {newInvoiceData.lines.map((line, index) => (
                          <div key={line.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="font-medium text-gray-900">Línea {index + 1}</h4>
                              <button
                                onClick={() => showConfirmation(
                                  'Eliminar Línea',
                                  '¿Estás seguro de que quieres eliminar esta línea de factura?',
                                  'Eliminar',
                                  () => {
                                    removeInvoiceLine(line.id);
                                    toast.success('Línea eliminada', {
                                      duration: 2000,
                                      icon: '🗑️',
                                    });
                                  },
                                  'danger'
                                )}
                                className="text-red-600 hover:text-red-800"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Concepto</label>
                                <input
                                  type="text"
                                  value={line.concept}
                                  onChange={(e) => updateInvoiceLine(line.id, 'concept', e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                                <input
                                  type="text"
                                  value={line.description}
                                  onChange={(e) => updateInvoiceLine(line.id, 'description', e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad</label>
                                <input
                                  type="number"
                                  value={line.quantity}
                                  onChange={(e) => updateInvoiceLine(line.id, 'quantity', parseFloat(e.target.value) || 0)}
                                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Precio Unit.</label>
                                <input
                                  type="number"
                                  step="0.01"
                                  value={line.unitPrice}
                                  onChange={(e) => updateInvoiceLine(line.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Descuento</label>
                                <input
                                  type="number"
                                  step="0.01"
                                  value={line.discount}
                                  onChange={(e) => updateInvoiceLine(line.id, 'discount', parseFloat(e.target.value) || 0)}
                                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                            </div>
                            <div className="mt-2 text-right">
                              <span className="text-sm text-gray-600">Subtotal: </span>
                              <span className="font-semibold">{formatCurrency(line.subtotal)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Step 3: Totals */}
                {newInvoiceStep === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-900">Totales y Configuración</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Método de Pago</label>
                          <select
                            value={newInvoiceData.paymentMethod}
                            onChange={(e) => setNewInvoiceData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="Transferencia bancaria">Transferencia bancaria</option>
                            <option value="Tarjeta de crédito">Tarjeta de crédito</option>
                            <option value="Efectivo">Efectivo</option>
                            <option value="Cheque">Cheque</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Notas</label>
                          <textarea
                            value={newInvoiceData.notes}
                            onChange={(e) => setNewInvoiceData(prev => ({ ...prev, notes: e.target.value }))}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Notas adicionales para la factura..."
                          />
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h4 className="font-semibold text-gray-900 mb-4">Resumen de Totales</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span>{formatCurrency(newInvoiceData.lines.reduce((sum, line) => sum + line.subtotal, 0))}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>IVA (21%):</span>
                            <span>{formatCurrency(newInvoiceData.lines.reduce((sum, line) => sum + line.subtotal, 0) * 0.21)}</span>
                          </div>
                          <div className="border-t border-gray-300 pt-2 flex justify-between font-semibold">
                            <span>Total:</span>
                            <span>{formatCurrency(newInvoiceData.lines.reduce((sum, line) => sum + line.subtotal, 0) * 1.21)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Review */}
                {newInvoiceStep === 4 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-900">Revisión Final</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Información del Cliente</h4>
                        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                          <p><span className="font-medium">Nombre:</span> {newInvoiceData.clientName}</p>
                          <p><span className="font-medium">Email:</span> {newInvoiceData.clientEmail}</p>
                          <p><span className="font-medium">Concepto:</span> {newInvoiceData.concept}</p>
                          <p><span className="font-medium">Vencimiento:</span> {newInvoiceData.dueDate}</p>
                          <p><span className="font-medium">Método de pago:</span> {newInvoiceData.paymentMethod}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Líneas de Factura</h4>
                        <div className="bg-gray-50 rounded-lg p-4">
                          {newInvoiceData.lines.map((line) => (
                            <div key={line.id} className="flex justify-between text-sm mb-1">
                              <span>{line.concept} x{line.quantity}</span>
                              <span>{formatCurrency(line.subtotal)}</span>
                            </div>
                          ))}
                          <div className="border-t border-gray-300 pt-2 mt-2 flex justify-between font-semibold">
                            <span>Total:</span>
                            <span>{formatCurrency(newInvoiceData.lines.reduce((sum, line) => sum + line.subtotal, 0) * 1.21)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {newInvoiceData.notes && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Notas</h4>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-gray-700">{newInvoiceData.notes}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={newInvoiceStep === 1 ? () => setShowNewInvoiceModal(false) : handleNewInvoicePrev}
                    className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    {newInvoiceStep === 1 ? 'Cancelar' : 'Anterior'}
                  </button>
                  <div className="flex gap-3">
                    {newInvoiceStep < 4 ? (
                      <button
                        onClick={handleNewInvoiceNext}
                        disabled={newInvoiceStep === 1 && (!newInvoiceData.clientName || !newInvoiceData.clientEmail)}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        Siguiente
                      </button>
                    ) : (
                      <button
                        onClick={handleNewInvoiceSubmit}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Crear Factura
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Configuration Modal */}
      <AnimatePresence>
        {showConfigModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowConfigModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
                <h2 className="text-2xl font-bold text-gray-900">Configuración de Facturación</h2>
                <button
                  onClick={() => setShowConfigModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <div className="space-y-8">
                  {/* Company Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Información de la Empresa</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de la Empresa</label>
                        <input
                          type="text"
                          value={configData.companyName}
                          onChange={(e) => setConfigData(prev => ({ ...prev, companyName: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          value={configData.companyEmail}
                          onChange={(e) => setConfigData(prev => ({ ...prev, companyEmail: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                        <input
                          type="tel"
                          value={configData.companyPhone}
                          onChange={(e) => setConfigData(prev => ({ ...prev, companyPhone: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">CIF/NIF</label>
                        <input
                          type="text"
                          value={configData.taxId}
                          onChange={(e) => setConfigData(prev => ({ ...prev, taxId: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
                        <textarea
                          value={configData.companyAddress}
                          onChange={(e) => setConfigData(prev => ({ ...prev, companyAddress: e.target.value }))}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Invoice Settings */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuración de Facturas</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Prefijo de Factura</label>
                        <input
                          type="text"
                          value={configData.invoicePrefix}
                          onChange={(e) => setConfigData(prev => ({ ...prev, invoicePrefix: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Días de Vencimiento por Defecto</label>
                        <input
                          type="number"
                          value={configData.defaultDueDays}
                          onChange={(e) => setConfigData(prev => ({ ...prev, defaultDueDays: parseInt(e.target.value) || 15 }))}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de IVA (%)</label>
                        <input
                          type="number"
                          value={configData.taxRate}
                          onChange={(e) => setConfigData(prev => ({ ...prev, taxRate: parseFloat(e.target.value) || 21 }))}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Moneda</label>
                        <select
                          value={configData.currency}
                          onChange={(e) => setConfigData(prev => ({ ...prev, currency: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="EUR">EUR (€)</option>
                          <option value="USD">USD ($)</option>
                          <option value="GBP">GBP (£)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Banking Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Información Bancaria</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Cuenta Bancaria</label>
                        <input
                          type="text"
                          value={configData.bankAccount}
                          onChange={(e) => setConfigData(prev => ({ ...prev, bankAccount: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="ES12 1234 5678 9012 3456 7890"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Language Settings */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuración Regional</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Idioma</label>
                        <select
                          value={configData.language}
                          onChange={(e) => setConfigData(prev => ({ ...prev, language: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="es">Español</option>
                          <option value="en">English</option>
                          <option value="fr">Français</option>
                          <option value="de">Deutsch</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
                    <button
                      onClick={() => setShowConfigModal(false)}
                      className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => {
                        toast.success('Configuración guardada exitosamente', {
                          duration: 4000,
                          icon: '⚙️',
                        });
                        setShowConfigModal(false);
                      }}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Guardar Configuración
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Import Modal */}
      <AnimatePresence>
        {showImportModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowImportModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
                <h2 className="text-2xl font-bold text-gray-900">Importar Facturas</h2>
                <button
                  onClick={() => setShowImportModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <div className="text-center py-12">
                  <Upload className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Importar Facturas
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Sube un archivo CSV o Excel con tus facturas para importarlas al sistema.
                  </p>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Arrastra y suelta tu archivo aquí</p>
                    <p className="text-sm text-gray-500">o haz clic para seleccionar</p>
                  </div>
                  <button
                    onClick={() => setShowImportModal(false)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Invoice Modal */}
      <AnimatePresence>
        {showInvoiceModal && selectedInvoice && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowInvoiceModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
                <h2 className="text-2xl font-bold text-gray-900">Factura {selectedInvoice.invoiceNumber}</h2>
                <button
                  onClick={() => setShowInvoiceModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Información del Cliente</h3>
                    <div className="space-y-2">
                      <p><span className="font-medium">Nombre:</span> {selectedInvoice.clientName}</p>
                      <p><span className="font-medium">Email:</span> {selectedInvoice.clientEmail}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Detalles de la Factura</h3>
                    <div className="space-y-2">
                      <p><span className="font-medium">Estado:</span> {getStatusBadge(selectedInvoice.status).label}</p>
                      <p><span className="font-medium">Fecha emisión:</span> {formatDate(selectedInvoice.issueDate)}</p>
                      <p><span className="font-medium">Fecha vencimiento:</span> {formatDate(selectedInvoice.dueDate)}</p>
                      <p><span className="font-medium">Total:</span> {formatCurrency(selectedInvoice.total)}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Líneas de Factura</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border border-gray-200 rounded-lg">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left">Concepto</th>
                          <th className="px-4 py-2 text-left">Descripción</th>
                          <th className="px-4 py-2 text-right">Cantidad</th>
                          <th className="px-4 py-2 text-right">Precio</th>
                          <th className="px-4 py-2 text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedInvoice.lines.map((line) => (
                          <tr key={line.id} className="border-t border-gray-200">
                            <td className="px-4 py-2">{line.concept}</td>
                            <td className="px-4 py-2">{line.description}</td>
                            <td className="px-4 py-2 text-right">{line.quantity}</td>
                            <td className="px-4 py-2 text-right">{formatCurrency(line.unitPrice)}</td>
                            <td className="px-4 py-2 text-right">{formatCurrency(line.subtotal)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && selectedInvoice && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowPaymentModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
                <h2 className="text-2xl font-bold text-gray-900">Registrar Cobro</h2>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <div className="text-center py-12">
                  <DollarSign className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Registrar Cobro - {selectedInvoice.invoiceNumber}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Monto pendiente: <span className="font-bold text-green-600">{formatCurrency(selectedInvoice.remainingAmount)}</span>
                  </p>
                  <div className="space-y-4 max-w-md mx-auto">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Monto a cobrar</label>
                      <input
                        type="number"
                        defaultValue={selectedInvoice.remainingAmount}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Método de pago</label>
                      <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                        <option>Transferencia bancaria</option>
                        <option>Tarjeta de crédito</option>
                        <option>Efectivo</option>
                        <option>Cheque</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Referencia</label>
                      <input
                        type="text"
                        placeholder="Número de referencia del pago"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 mt-8">
                    <button
                      onClick={() => setShowPaymentModal(false)}
                      className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => {
                        toast.success('Cobro registrado exitosamente', {
                          duration: 4000,
                          icon: '💰',
                        });
                        setShowPaymentModal(false);
                      }}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Registrar Cobro
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Analytics Modal */}
      <AnimatePresence>
        {showAnalyticsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAnalyticsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
                <h2 className="text-2xl font-bold text-gray-900">Analytics de Facturación</h2>
                <button
                  onClick={() => setShowAnalyticsModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <div className="text-center py-12">
                  <BarChart3 className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Analytics Avanzadas
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Aquí se mostrarían gráficos de tendencias, análisis de cobros, proyecciones, etc.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-semibold mb-2">Tendencias de Cobro</h4>
                      <div className="h-32 bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-gray-500">Gráfico de líneas</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-semibold mb-2">Distribución por Estado</h4>
                      <div className="h-32 bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-gray-500">Gráfico circular</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowAnalyticsModal(false)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mt-6"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Report Modal */}
      <AnimatePresence>
        {showReportModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowReportModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
                <h2 className="text-2xl font-bold text-gray-900">Generar Reporte</h2>
                <button
                  onClick={() => setShowReportModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <div className="text-center py-12">
                  <FileSpreadsheet className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Generar Reporte de Facturación
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Selecciona el tipo de reporte y el período que deseas generar.
                  </p>
                  <div className="space-y-4 max-w-md mx-auto">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de reporte</label>
                      <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Reporte de cobros</option>
                        <option>Reporte de facturas vencidas</option>
                        <option>Reporte de clientes</option>
                        <option>Reporte completo</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Período</label>
                      <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Último mes</option>
                        <option>Últimos 3 meses</option>
                        <option>Último año</option>
                        <option>Personalizado</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Formato</label>
                      <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>PDF</option>
                        <option>Excel</option>
                        <option>CSV</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-8">
                    <button
                      onClick={() => setShowReportModal(false)}
                      className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => {
                        toast.success('Reporte generado exitosamente', {
                          duration: 4000,
                          icon: '📊',
                        });
                        setShowReportModal(false);
                      }}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Generar Reporte
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmModal && confirmAction && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowConfirmModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    confirmAction.type === 'success' ? 'bg-green-100' :
                    confirmAction.type === 'warning' ? 'bg-yellow-100' :
                    'bg-red-100'
                  }`}>
                    {confirmAction.type === 'success' && <CheckCircle className="w-6 h-6 text-green-600" />}
                    {confirmAction.type === 'warning' && <AlertTriangle className="w-6 h-6 text-yellow-600" />}
                    {confirmAction.type === 'danger' && <AlertTriangle className="w-6 h-6 text-red-600" />}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{confirmAction.title}</h3>
                </div>
                <p className="text-gray-600 mb-6">{confirmAction.message}</p>
                <div className="flex items-center justify-end gap-3">
                  <button
                    onClick={() => setShowConfirmModal(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleConfirm}
                    className={`px-4 py-2 rounded-lg text-white transition-colors ${
                      confirmAction.type === 'success' ? 'bg-green-600 hover:bg-green-700' :
                      confirmAction.type === 'warning' ? 'bg-yellow-600 hover:bg-yellow-700' :
                      'bg-red-600 hover:bg-red-700'
                    }`}
                  >
                    {confirmAction.confirmText}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
            borderRadius: '12px',
            padding: '16px',
            fontSize: '14px',
            fontWeight: '500',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
};

export default CobrosFacturacionPage;