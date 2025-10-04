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
