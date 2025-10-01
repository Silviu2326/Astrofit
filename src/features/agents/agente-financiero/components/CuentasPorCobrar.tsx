import React, { useEffect, useState } from 'react';

interface Invoice {
  id: string;
  clientName: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  status: 'pending' | 'overdue' | 'partial' | 'paid';
  paidAmount: number;
  daysOverdue: number;
  service: string;
  contactAttempts: number;
}

const CuentasPorCobrar: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'overdue'>('all');

  useEffect(() => {
    setTimeout(() => {
      const mockInvoices: Invoice[] = [
        {
          id: 'INV-001',
          clientName: 'Ana García',
          amount: 300,
          issueDate: '2025-01-01',
          dueDate: '2025-01-15',
          status: 'overdue',
          paidAmount: 0,
          daysOverdue: 12,
          service: 'Entrenamiento Personal',
          contactAttempts: 2
        },
        {
          id: 'INV-002',
          clientName: 'Carlos Ruiz',
          amount: 150,
          issueDate: '2025-01-10',
          dueDate: '2025-01-25',
          status: 'pending',
          paidAmount: 0,
          daysOverdue: 0,
          service: 'Membresía Premium',
          contactAttempts: 0
        },
        {
          id: 'INV-003',
          clientName: 'María López',
          amount: 80,
          issueDate: '2025-01-05',
          dueDate: '2025-01-20',
          status: 'partial',
          paidAmount: 40,
          daysOverdue: 7,
          service: 'Plan Nutricional',
          contactAttempts: 1
        },
        {
          id: 'INV-004',
          clientName: 'Pedro Martín',
          amount: 200,
          issueDate: '2025-01-12',
          dueDate: '2025-01-27',
          status: 'pending',
          paidAmount: 0,
          daysOverdue: 0,
          service: 'Entrenamiento Grupal',
          contactAttempts: 0
        },
        {
          id: 'INV-005',
          clientName: 'Laura Sánchez',
          amount: 120,
          issueDate: '2024-12-20',
          dueDate: '2025-01-05',
          status: 'overdue',
          paidAmount: 0,
          daysOverdue: 22,
          service: 'Consulta Nutrición',
          contactAttempts: 3
        }
      ];
      setInvoices(mockInvoices);
      setLoading(false);
    }, 400);
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-blue-100 text-blue-700';
      case 'partial': return 'bg-yellow-100 text-yellow-700';
      case 'overdue': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid': return 'Pagado';
      case 'pending': return 'Pendiente';
      case 'partial': return 'Parcial';
      case 'overdue': return 'Vencido';
      default: return 'Desconocido';
    }
  };

  const getPriorityIcon = (daysOverdue: number, contactAttempts: number) => {
    if (daysOverdue > 30 || contactAttempts >= 3) return '🔴';
    if (daysOverdue > 15 || contactAttempts >= 2) return '🟡';
    if (daysOverdue > 0) return '🟠';
    return '🟢';
  };

  const filteredInvoices = invoices.filter(invoice => {
    if (filter === 'all') return true;
    if (filter === 'pending') return invoice.status === 'pending';
    if (filter === 'overdue') return invoice.status === 'overdue';
    return true;
  });

  const totalOutstanding = invoices.reduce((acc, inv) => acc + (inv.amount - inv.paidAmount), 0);
  const overdueAmount = invoices
    .filter(inv => inv.status === 'overdue')
    .reduce((acc, inv) => acc + (inv.amount - inv.paidAmount), 0);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Cuentas por Cobrar</h3>
        <div className="flex space-x-2">
          {(['all', 'pending', 'overdue'] as const).map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                filter === filterType
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filterType === 'all' ? 'Todas' : filterType === 'pending' ? 'Pendientes' : 'Vencidas'}
            </button>
          ))}
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-sm text-blue-600 font-medium">Total Pendiente</div>
          <div className="text-2xl font-bold text-blue-700">{totalOutstanding.toLocaleString()}€</div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <div className="text-sm text-red-600 font-medium">Vencido</div>
          <div className="text-2xl font-bold text-red-700">{overdueAmount.toLocaleString()}€</div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <div className="text-sm text-orange-600 font-medium">Facturas Vencidas</div>
          <div className="text-2xl font-bold text-orange-700">
            {invoices.filter(inv => inv.status === 'overdue').length}
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-sm text-green-600 font-medium">Tasa de Cobro</div>
          <div className="text-2xl font-bold text-green-700">
            {(((invoices.reduce((acc, inv) => acc + inv.paidAmount, 0)) /
               (invoices.reduce((acc, inv) => acc + inv.amount, 0))) * 100).toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Invoices list */}
      <div className="space-y-3">
        {filteredInvoices.map((invoice) => (
          <div key={invoice.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-lg">
                  {getPriorityIcon(invoice.daysOverdue, invoice.contactAttempts)}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{invoice.clientName}</div>
                  <div className="text-sm text-gray-600">{invoice.service} - {invoice.id}</div>
                  <div className="text-xs text-gray-500">
                    Emisión: {new Date(invoice.issueDate).toLocaleDateString()} |
                    Vencimiento: {new Date(invoice.dueDate).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-bold text-lg text-gray-900">
                  {(invoice.amount - invoice.paidAmount).toLocaleString()}€
                </div>
                {invoice.paidAmount > 0 && (
                  <div className="text-sm text-green-600">
                    Pagado: {invoice.paidAmount.toLocaleString()}€
                  </div>
                )}
                <div className="flex items-center justify-end space-x-2 mt-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                    {getStatusText(invoice.status)}
                  </span>
                  {invoice.daysOverdue > 0 && (
                    <span className="text-xs text-red-600 font-medium">
                      +{invoice.daysOverdue}d
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Action buttons and contact info */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>Contactos: {invoice.contactAttempts}</span>
                {invoice.contactAttempts > 0 && (
                  <span className="text-orange-600">• Último: hace 2 días</span>
                )}
              </div>

              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-200 transition-colors">
                  📞 Contactar
                </button>
                <button className="px-3 py-1 bg-green-100 text-green-700 rounded-md text-sm font-medium hover:bg-green-200 transition-colors">
                  💳 Registrar Pago
                </button>
                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors">
                  📄 Ver Factura
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Collection strategy recommendations */}
      <div className="mt-6 p-4 bg-purple-50 rounded-lg">
        <h4 className="font-semibold text-purple-800 text-sm mb-3">📋 Estrategia de Cobranza</h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-start space-x-2">
            <span className="text-red-500">🔴</span>
            <div>
              <span className="font-medium text-red-700">Prioridad Alta:</span>
              <span className="text-red-600"> {invoices.filter(inv => inv.daysOverdue > 15).length} facturas requieren atención inmediata</span>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-yellow-500">🟡</span>
            <div>
              <span className="font-medium text-yellow-700">Seguimiento:</span>
              <span className="text-yellow-600"> {invoices.filter(inv => inv.daysOverdue > 0 && inv.daysOverdue <= 15).length} facturas necesitan recordatorio</span>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-blue-500">💡</span>
            <div>
              <span className="font-medium text-blue-700">Recomendación:</span>
              <span className="text-blue-600"> Implementar descuentos por pronto pago o facilidades de pago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CuentasPorCobrar;