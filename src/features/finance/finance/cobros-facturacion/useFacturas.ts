import { useState, useEffect } from 'react';
import { getFacturas } from './cobrosFacturacionApi';
import type { Factura } from './cobrosFacturacionApi';

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
  lines: { id: string; concept: string; description: string; quantity: number; unitPrice: number; discount: number; subtotal: number; }[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  paymentMethod: string;
  payments: any[];
  paidAmount: number;
  remainingAmount: number;
  notes?: string;
  remindersSent: number;
  lastReminderDate?: string;
}

const transformFacturaToInvoice = (factura: Factura): Invoice => {
  const mapStatus = (estado: string): Invoice['status'] => {
    switch (estado) {
      case 'Pagada':
        return 'paid';
      case 'Pendiente':
        return 'sent';
      case 'Vencida':
        return 'overdue';
      case 'Anulada':
        return 'cancelled';
      default:
        return 'draft';
    }
  };

  // Función para convertir fecha de dd/MM/yyyy a yyyy-MM-dd
  const parseDate = (dateStr: string): string => {
    try {
      // Si la fecha ya está en formato ISO o puede ser parseada directamente
      const date = new Date(dateStr);
      if (!isNaN(date.getTime())) {
        return date.toISOString().split('T')[0];
      }

      // Si está en formato dd/MM/yyyy
      const parts = dateStr.split('/');
      if (parts.length === 3) {
        const [day, month, year] = parts;
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      }

      // Fallback a fecha actual
      return new Date().toISOString().split('T')[0];
    } catch (error) {
      console.error('Error parsing date:', dateStr, error);
      return new Date().toISOString().split('T')[0];
    }
  };

  const clientName = factura.datosCliente?.nombre || factura.cliente || 'Cliente';
  const clientEmail = factura.datosCliente?.email || '';

  return {
    id: factura.id || '',
    invoiceNumber: factura.numeroFactura || 'N/A',
    clientId: factura.clienteId || '',
    clientName,
    clientAvatar: `https://i.pravatar.cc/150?u=${clientEmail}`,
    clientEmail,
    issueDate: parseDate(factura.fecha),
    dueDate: parseDate(factura.fecha), // Usar la misma fecha si no hay vencimiento
    concept: factura.items && factura.items.length > 0
      ? factura.items[0].descripcion
      : 'Factura',
    lines: factura.items.map((item, index) => ({
      id: `l${index}`,
      concept: item.descripcion,
      description: item.descripcion,
      quantity: item.cantidad,
      unitPrice: item.precioUnitario,
      discount: 0,
      subtotal: item.subtotal
    })),
    subtotal: factura.montoTotal,
    discount: 0,
    tax: 0,
    total: factura.montoTotal,
    status: mapStatus(factura.estado),
    paymentMethod: 'Transferencia bancaria',
    payments: [],
    paidAmount: factura.estado === 'Pagada' ? factura.montoTotal : 0,
    remainingAmount: factura.estado === 'Pagada' ? 0 : factura.montoTotal,
    notes: '',
    remindersSent: 0
  };
};

export const useFacturas = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadFacturas = async () => {
    try {
      setLoading(true);
      setError(null);
      const facturas = await getFacturas();
      const transformedInvoices = facturas.map(transformFacturaToInvoice);
      setInvoices(transformedInvoices);
    } catch (err) {
      console.error('Error loading facturas:', err);
      setError('Error al cargar las facturas');
      setInvoices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFacturas();
  }, []);

  return { invoices, loading, error, reload: loadFacturas };
};
