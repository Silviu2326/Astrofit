import React from 'react';
import { X } from 'lucide-react';
import type { FiltrosPedidos as FiltrosPedidosType, EstadoPedido, PrioridadPedido, TipoPago } from '../types';

interface FiltrosPedidosProps {
  filtros: FiltrosPedidosType;
  onChange: (filtros: FiltrosPedidosType) => void;
}

export const FiltrosPedidos: React.FC<FiltrosPedidosProps> = ({ filtros, onChange }) => {
  const estadosDisponibles: { valor: EstadoPedido; label: string }[] = [
    { valor: 'pendiente', label: 'Pendiente' },
    { valor: 'procesando', label: 'Procesando' },
    { valor: 'enviado', label: 'Enviado' },
    { valor: 'en_transito', label: 'En Tránsito' },
    { valor: 'entregado', label: 'Entregado' },
    { valor: 'cancelado', label: 'Cancelado' }
  ];

  const prioridadesDisponibles: { valor: PrioridadPedido; label: string }[] = [
    { valor: 'baja', label: 'Baja' },
    { valor: 'normal', label: 'Normal' },
    { valor: 'alta', label: 'Alta' },
    { valor: 'urgente', label: 'Urgente' }
  ];

  const metodoPagoDisponibles: { valor: TipoPago; label: string }[] = [
    { valor: 'tarjeta', label: 'Tarjeta' },
    { valor: 'transferencia', label: 'Transferencia' },
    { valor: 'paypal', label: 'PayPal' },
    { valor: 'contra_reembolso', label: 'Contra Reembolso' }
  ];

  const toggleEstado = (estado: EstadoPedido) => {
    const estados = filtros.estado || [];
    const nuevosEstados = estados.includes(estado)
      ? estados.filter(e => e !== estado)
      : [...estados, estado];
    onChange({ ...filtros, estado: nuevosEstados });
  };

  const togglePrioridad = (prioridad: PrioridadPedido) => {
    const prioridades = filtros.prioridad || [];
    const nuevasPrioridades = prioridades.includes(prioridad)
      ? prioridades.filter(p => p !== prioridad)
      : [...prioridades, prioridad];
    onChange({ ...filtros, prioridad: nuevasPrioridades });
  };

  const toggleMetodoPago = (metodo: TipoPago) => {
    const metodos = filtros.metodoPago || [];
    const nuevosMetodos = metodos.includes(metodo)
      ? metodos.filter(m => m !== metodo)
      : [...metodos, metodo];
    onChange({ ...filtros, metodoPago: nuevosMetodos });
  };

  const limpiarFiltros = () => {
    onChange({});
  };

  return (
    <div className="border-t border-gray-200 pt-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900">Filtros Activos</h3>
        <button
          onClick={limpiarFiltros}
          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
        >
          <X className="w-4 h-4" />
          Limpiar todo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Estados */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Estado del Pedido
          </label>
          <div className="space-y-2">
            {estadosDisponibles.map((estado) => (
              <label
                key={estado.valor}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filtros.estado?.includes(estado.valor) || false}
                  onChange={() => toggleEstado(estado.valor)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{estado.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Prioridades */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Prioridad
          </label>
          <div className="space-y-2">
            {prioridadesDisponibles.map((prioridad) => (
              <label
                key={prioridad.valor}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filtros.prioridad?.includes(prioridad.valor) || false}
                  onChange={() => togglePrioridad(prioridad.valor)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{prioridad.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Método de Pago */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Método de Pago
          </label>
          <div className="space-y-2">
            {metodoPagoDisponibles.map((metodo) => (
              <label
                key={metodo.valor}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filtros.metodoPago?.includes(metodo.valor) || false}
                  onChange={() => toggleMetodoPago(metodo.valor)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{metodo.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Rango de fechas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fecha Desde
          </label>
          <input
            type="date"
            value={filtros.fechaDesde?.toISOString().split('T')[0] || ''}
            onChange={(e) => onChange({
              ...filtros,
              fechaDesde: e.target.value ? new Date(e.target.value) : undefined
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fecha Hasta
          </label>
          <input
            type="date"
            value={filtros.fechaHasta?.toISOString().split('T')[0] || ''}
            onChange={(e) => onChange({
              ...filtros,
              fechaHasta: e.target.value ? new Date(e.target.value) : undefined
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
};
