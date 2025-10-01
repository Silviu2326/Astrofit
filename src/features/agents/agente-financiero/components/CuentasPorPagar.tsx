import React, { useEffect, useState } from 'react';

interface PayableAccount {
  id: string;
  vendor: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  status: 'pending' | 'overdue' | 'scheduled' | 'paid';
  category: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  daysUntilDue: number;
  isRecurring: boolean;
  description: string;
}

const CuentasPorPagar: React.FC = () => {
  const [payables, setPayables] = useState<PayableAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'urgent' | 'upcoming'>('all');

  useEffect(() => {
    setTimeout(() => {
      const today = new Date();
      const mockPayables: PayableAccount[] = [
        {
          id: 'PAY-001',
          vendor: 'Alquiler Gimnasio',
          amount: 1200,
          issueDate: '2025-01-01',
          dueDate: '2025-01-31',
          status: 'pending',
          category: 'Alquiler',
          priority: 'high',
          daysUntilDue: 4,
          isRecurring: true,
          description: 'Alquiler mensual del local'
        },
        {
          id: 'PAY-002',
          vendor: 'Servicios Públicos',
          amount: 350,
          issueDate: '2025-01-15',
          dueDate: '2025-02-01',
          status: 'pending',
          category: 'Servicios',
          priority: 'medium',
          daysUntilDue: 5,
          isRecurring: true,
          description: 'Electricidad y agua'
        },
        {
          id: 'PAY-003',
          vendor: 'Equipo Fitness Pro',
          amount: 800,
          issueDate: '2025-01-20',
          dueDate: '2025-01-25',
          status: 'overdue',
          category: 'Equipamiento',
          priority: 'critical',
          daysUntilDue: -2,
          isRecurring: false,
          description: 'Mantenimiento equipos'
        },
        {
          id: 'PAY-004',
          vendor: 'Seguros Deportivos',
          amount: 180,
          issueDate: '2025-01-10',
          dueDate: '2025-02-10',
          status: 'scheduled',
          category: 'Seguros',
          priority: 'medium',
          daysUntilDue: 14,
          isRecurring: true,
          description: 'Seguro responsabilidad civil'
        },
        {
          id: 'PAY-005',
          vendor: 'Marketing Digital',
          amount: 450,
          issueDate: '2025-01-18',
          dueDate: '2025-02-02',
          status: 'pending',
          category: 'Marketing',
          priority: 'low',
          daysUntilDue: 6,
          isRecurring: true,
          description: 'Publicidad online y redes sociales'
        },
        {
          id: 'PAY-006',
          vendor: 'Proveedor Suplementos',
          amount: 320,
          issueDate: '2025-01-22',
          dueDate: '2025-02-05',
          status: 'pending',
          category: 'Inventario',
          priority: 'low',
          daysUntilDue: 9,
          isRecurring: false,
          description: 'Proteínas y suplementos'
        }
      ];
      setPayables(mockPayables);
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
      case 'scheduled': return 'bg-blue-100 text-blue-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'overdue': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid': return 'Pagado';
      case 'scheduled': return 'Programado';
      case 'pending': return 'Pendiente';
      case 'overdue': return 'Vencido';
      default: return 'Desconocido';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600';
      case 'high': return 'text-orange-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'critical': return '🔴';
      case 'high': return '🟠';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  const filteredPayables = payables.filter(payable => {
    if (filter === 'all') return true;
    if (filter === 'urgent') return payable.daysUntilDue <= 7 || payable.status === 'overdue';
    if (filter === 'upcoming') return payable.daysUntilDue > 7 && payable.daysUntilDue <= 30;
    return true;
  });

  const totalPayables = payables
    .filter(p => p.status !== 'paid')
    .reduce((acc, p) => acc + p.amount, 0);
  const overdueAmount = payables
    .filter(p => p.status === 'overdue')
    .reduce((acc, p) => acc + p.amount, 0);
  const urgentCount = payables.filter(p => p.daysUntilDue <= 7 && p.status !== 'paid').length;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Cuentas por Pagar</h3>
        <div className="flex space-x-2">
          {(['all', 'urgent', 'upcoming'] as const).map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                filter === filterType
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filterType === 'all' ? 'Todas' : filterType === 'urgent' ? 'Urgentes' : 'Próximas'}
            </button>
          ))}
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-red-50 p-4 rounded-lg">
          <div className="text-sm text-red-600 font-medium">Total a Pagar</div>
          <div className="text-2xl font-bold text-red-700">{totalPayables.toLocaleString()}€</div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <div className="text-sm text-orange-600 font-medium">Vencido</div>
          <div className="text-2xl font-bold text-orange-700">{overdueAmount.toLocaleString()}€</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="text-sm text-yellow-600 font-medium">Urgentes (7 días)</div>
          <div className="text-2xl font-bold text-yellow-700">{urgentCount}</div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-sm text-blue-600 font-medium">Pagos Programados</div>
          <div className="text-2xl font-bold text-blue-700">
            {payables.filter(p => p.status === 'scheduled').length}
          </div>
        </div>
      </div>

      {/* Payables list */}
      <div className="space-y-3">
        {filteredPayables.map((payable) => (
          <div key={payable.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-lg">
                  {getPriorityIcon(payable.priority)}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{payable.vendor}</div>
                  <div className="text-sm text-gray-600">
                    {payable.description}
                    {payable.isRecurring && <span className="ml-2 text-blue-600">🔄 Recurrente</span>}
                  </div>
                  <div className="text-xs text-gray-500">
                    Categoría: {payable.category} |
                    Vencimiento: {new Date(payable.dueDate).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-bold text-lg text-gray-900">
                  {payable.amount.toLocaleString()}€
                </div>
                <div className="flex items-center justify-end space-x-2 mt-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payable.status)}`}>
                    {getStatusText(payable.status)}
                  </span>
                  {payable.daysUntilDue <= 7 && payable.status !== 'paid' && (
                    <span className={`text-xs font-medium ${
                      payable.daysUntilDue < 0 ? 'text-red-600' : 'text-orange-600'
                    }`}>
                      {payable.daysUntilDue < 0 ? `+${Math.abs(payable.daysUntilDue)}d vencido` : `${payable.daysUntilDue}d restantes`}
                    </span>
                  )}
                </div>
                <div className={`text-xs mt-1 ${getPriorityColor(payable.priority)}`}>
                  Prioridad: {payable.priority.toUpperCase()}
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>ID: {payable.id}</span>
                {payable.isRecurring && (
                  <span className="text-blue-600">• Pago automático disponible</span>
                )}
              </div>

              <div className="flex space-x-2">
                {payable.status !== 'paid' && (
                  <>
                    <button className="px-3 py-1 bg-green-100 text-green-700 rounded-md text-sm font-medium hover:bg-green-200 transition-colors">
                      💳 Pagar Ahora
                    </button>
                    <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-200 transition-colors">
                      📅 Programar
                    </button>
                  </>
                )}
                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors">
                  📄 Detalles
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cash flow impact */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-800 text-sm mb-3">💰 Impacto en Flujo de Caja</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="font-medium text-blue-700">Próximos 7 días:</span>
            <div className="text-blue-600">
              {payables
                .filter(p => p.daysUntilDue <= 7 && p.daysUntilDue > 0 && p.status !== 'paid')
                .reduce((acc, p) => acc + p.amount, 0)
                .toLocaleString()}€
            </div>
          </div>
          <div>
            <span className="font-medium text-blue-700">Próximos 30 días:</span>
            <div className="text-blue-600">
              {payables
                .filter(p => p.daysUntilDue <= 30 && p.daysUntilDue > 0 && p.status !== 'paid')
                .reduce((acc, p) => acc + p.amount, 0)
                .toLocaleString()}€
            </div>
          </div>
          <div>
            <span className="font-medium text-blue-700">Gastos recurrentes:</span>
            <div className="text-blue-600">
              {payables
                .filter(p => p.isRecurring && p.status !== 'paid')
                .reduce((acc, p) => acc + p.amount, 0)
                .toLocaleString()}€/mes
            </div>
          </div>
        </div>
      </div>

      {/* Payment optimization suggestions */}
      <div className="mt-4 p-4 bg-green-50 rounded-lg">
        <h4 className="font-semibold text-green-800 text-sm mb-3">💡 Optimización de Pagos</h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-start space-x-2">
            <span className="text-green-500">✓</span>
            <div>
              <span className="font-medium text-green-700">Automatización:</span>
              <span className="text-green-600"> {payables.filter(p => p.isRecurring).length} pagos recurrentes pueden automatizarse</span>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-green-500">💰</span>
            <div>
              <span className="font-medium text-green-700">Descuentos:</span>
              <span className="text-green-600"> Considerar negociar descuentos por pronto pago</span>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-green-500">📊</span>
            <div>
              <span className="font-medium text-green-700">Planificación:</span>
              <span className="text-green-600"> Agrupar pagos por fecha para optimizar flujo de caja</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CuentasPorPagar;