import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  Plus,
  Edit3,
  Download,
  Send,
  Eye,
  FileText,
  Receipt,
  Wallet,
  Target,
  BarChart3,
  PieChart
} from 'lucide-react';
import { Cliente } from '../clienteDetalleApi';

interface ClienteFacturacionProps {
  cliente: Cliente;
}

interface Factura {
  id: string;
  numero: string;
  fecha: string;
  vencimiento: string;
  monto: number;
  estado: 'Pendiente' | 'Pagada' | 'Vencida' | 'Cancelada';
  concepto: string;
  metodoPago?: string;
  fechaPago?: string;
  descuento?: number;
  impuestos?: number;
  total: number;
}

interface PlanSuscripcion {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  duracion: number; // en días
  tipo: 'Mensual' | 'Trimestral' | 'Anual' | 'Personalizado';
  activo: boolean;
  fechaInicio: string;
  fechaFin: string;
  servicios: string[];
}

interface Transaccion {
  id: string;
  fecha: string;
  concepto: string;
  monto: number;
  tipo: 'Ingreso' | 'Egreso' | 'Reembolso';
  metodo: 'Transferencia' | 'Efectivo' | 'Tarjeta' | 'PayPal';
  estado: 'Completada' | 'Pendiente' | 'Fallida';
  referencia?: string;
}

const ClienteFacturacion: React.FC<ClienteFacturacionProps> = ({ cliente }) => {
  const [activeView, setActiveView] = useState<'dashboard' | 'facturas' | 'planes' | 'transacciones' | 'reportes'>('dashboard');
  const [showAddFactura, setShowAddFactura] = useState(false);
  const [showAddPlan, setShowAddPlan] = useState(false);

  // Datos mock para demostración
  const facturas: Factura[] = [
    {
      id: '1',
      numero: 'FAC-2024-001',
      fecha: '2024-01-01',
      vencimiento: '2024-01-31',
      monto: 150,
      estado: 'Pagada',
      concepto: 'Plan Mensual - Enero 2024',
      metodoPago: 'Transferencia',
      fechaPago: '2024-01-15',
      descuento: 0,
      impuestos: 24,
      total: 174
    },
    {
      id: '2',
      numero: 'FAC-2024-002',
      fecha: '2024-02-01',
      vencimiento: '2024-02-28',
      monto: 150,
      estado: 'Pendiente',
      concepto: 'Plan Mensual - Febrero 2024',
      descuento: 10,
      impuestos: 22.4,
      total: 162.4
    }
  ];

  const planes: PlanSuscripcion[] = [
    {
      id: '1',
      nombre: 'Plan Básico',
      descripcion: 'Entrenamientos básicos y seguimiento',
      precio: 150,
      duracion: 30,
      tipo: 'Mensual',
      activo: true,
      fechaInicio: '2024-01-01',
      fechaFin: '2024-01-31',
      servicios: ['3 sesiones/semana', 'Seguimiento básico', 'Plan nutricional']
    },
    {
      id: '2',
      nombre: 'Plan Premium',
      descripcion: 'Entrenamientos personalizados y seguimiento completo',
      precio: 250,
      duracion: 30,
      tipo: 'Mensual',
      activo: false,
      fechaInicio: '2023-12-01',
      fechaFin: '2023-12-31',
      servicios: ['5 sesiones/semana', 'Seguimiento completo', 'Plan nutricional avanzado', 'Consultas ilimitadas']
    }
  ];

  const transacciones: Transaccion[] = [
    {
      id: '1',
      fecha: '2024-01-15',
      concepto: 'Pago Plan Básico - Enero',
      monto: 174,
      tipo: 'Ingreso',
      metodo: 'Transferencia',
      estado: 'Completada',
      referencia: 'TXN-001'
    },
    {
      id: '2',
      fecha: '2024-01-10',
      concepto: 'Reembolso sesión cancelada',
      monto: -50,
      tipo: 'Reembolso',
      metodo: 'Transferencia',
      estado: 'Completada',
      referencia: 'REF-001'
    }
  ];

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Pagada': return 'bg-green-100 text-green-800';
      case 'Pendiente': return 'bg-yellow-100 text-yellow-800';
      case 'Vencida': return 'bg-red-100 text-red-800';
      case 'Cancelada': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'Ingreso': return 'bg-green-100 text-green-800';
      case 'Egreso': return 'bg-red-100 text-red-800';
      case 'Reembolso': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const DashboardView = () => (
    <div className="space-y-6">
      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Ingresos del Mes</p>
              <p className="text-2xl font-bold text-green-900">€1,240</p>
              <p className="text-xs text-green-600">+15% vs mes anterior</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-2xl border border-yellow-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-600">Pendientes</p>
              <p className="text-2xl font-bold text-yellow-900">€162</p>
              <p className="text-xs text-yellow-600">1 factura pendiente</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Plan Activo</p>
              <p className="text-2xl font-bold text-blue-900">Básico</p>
              <p className="text-xs text-blue-600">€150/mes</p>
            </div>
            <Target className="w-8 h-8 text-blue-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Promedio Mensual</p>
              <p className="text-2xl font-bold text-purple-900">€180</p>
              <p className="text-xs text-purple-600">Últimos 6 meses</p>
            </div>
            <BarChart3 className="w-8 h-8 text-purple-600" />
          </div>
        </motion.div>
      </div>

      {/* Gráfico de ingresos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Ingresos por Mes</h3>
          <PieChart className="w-5 h-5 text-gray-600" />
        </div>
        <div className="h-64 flex items-end justify-between space-x-2">
          {[
            { mes: 'Oct', monto: 150 },
            { mes: 'Nov', monto: 180 },
            { mes: 'Dic', monto: 200 },
            { mes: 'Ene', monto: 174 },
            { mes: 'Feb', monto: 162 }
          ].map((item, index) => (
            <div key={item.mes} className="flex flex-col items-center space-y-2">
              <div
                className="bg-gradient-to-t from-indigo-500 to-indigo-300 rounded-t-lg w-8 transition-all duration-500"
                style={{ height: `${(item.monto / 200) * 200}px` }}
              />
              <span className="text-xs text-gray-600">€{item.monto}</span>
              <span className="text-xs text-gray-500">{item.mes}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Facturas recientes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Facturas Recientes</h3>
          <button
            onClick={() => setShowAddFactura(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Nueva Factura
          </button>
        </div>
        <div className="space-y-3">
          {facturas.slice(0, 3).map((factura) => (
            <div key={factura.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Receipt className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{factura.numero}</h4>
                  <p className="text-sm text-gray-600">{factura.concepto}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-gray-900">€{factura.total}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEstadoColor(factura.estado)}`}>
                  {factura.estado}
                </span>
                <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const FacturasView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Facturas</h3>
        <button
          onClick={() => setShowAddFactura(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nueva Factura
        </button>
      </div>

      <div className="space-y-4">
        {facturas.map((factura) => (
          <motion.div
            key={factura.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-100 rounded-xl">
                  <Receipt className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{factura.numero}</h4>
                  <p className="text-sm text-gray-600">{factura.concepto}</p>
                  <p className="text-xs text-gray-500">
                    Emitida: {new Date(factura.fecha).toLocaleDateString()} | 
                    Vence: {new Date(factura.vencimiento).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEstadoColor(factura.estado)}`}>
                  {factura.estado}
                </span>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">€{factura.total}</p>
                  {factura.descuento && factura.descuento > 0 && (
                    <p className="text-xs text-green-600">Descuento: €{factura.descuento}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-600">Subtotal</p>
                <p className="text-lg font-bold text-gray-900">€{factura.monto}</p>
              </div>
              {factura.descuento && factura.descuento > 0 && (
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium text-green-600">Descuento</p>
                  <p className="text-lg font-bold text-green-900">-€{factura.descuento}</p>
                </div>
              )}
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-600">Impuestos</p>
                <p className="text-lg font-bold text-blue-900">€{factura.impuestos}</p>
              </div>
              <div className="text-center p-3 bg-indigo-50 rounded-lg">
                <p className="text-sm font-medium text-indigo-600">Total</p>
                <p className="text-lg font-bold text-indigo-900">€{factura.total}</p>
              </div>
            </div>

            {factura.metodoPago && (
              <div className="p-3 bg-green-50 rounded-lg mb-4">
                <p className="text-sm text-green-800">
                  <strong>Pagado:</strong> {factura.metodoPago} el {new Date(factura.fechaPago!).toLocaleDateString()}
                </p>
              </div>
            )}

            <div className="flex items-center justify-end gap-2">
              <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                <Eye className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                <Download className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Send className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const PlanesView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Planes de Suscripción</h3>
        <button
          onClick={() => setShowAddPlan(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nuevo Plan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {planes.map((plan) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-indigo-100 rounded-xl">
                  <Target className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{plan.nombre}</h4>
                  <p className="text-sm text-gray-600">{plan.descripcion}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                plan.activo ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {plan.activo ? 'Activo' : 'Inactivo'}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Precio:</span>
                <span className="text-lg font-bold text-gray-900">€{plan.precio}/{plan.tipo}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Duración:</span>
                <span className="text-sm text-gray-600">{plan.duracion} días</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Período:</span>
                <span className="text-sm text-gray-600">
                  {new Date(plan.fechaInicio).toLocaleDateString()} - {new Date(plan.fechaFin).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Servicios incluidos:</h5>
              <ul className="space-y-1">
                {plan.servicios.map((servicio, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    {servicio}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm">
                Ver Detalles
              </button>
              <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const TransaccionesView = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Transacciones</h3>
      
      <div className="space-y-4">
        {transacciones.map((transaccion) => (
          <motion.div
            key={transaccion.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-100 rounded-xl">
                  <CreditCard className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{transaccion.concepto}</h4>
                  <p className="text-sm text-gray-600">
                    {new Date(transaccion.fecha).toLocaleDateString('es-ES', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTipoColor(transaccion.tipo)}`}>
                  {transaccion.tipo}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  transaccion.estado === 'Completada' ? 'bg-green-100 text-green-800' : 
                  transaccion.estado === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'
                }`}>
                  {transaccion.estado}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-600">Monto</p>
                <p className={`text-lg font-bold ${transaccion.monto > 0 ? 'text-green-900' : 'text-red-900'}`}>
                  €{Math.abs(transaccion.monto)}
                </p>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-600">Método</p>
                <p className="text-lg font-bold text-blue-900">{transaccion.metodo}</p>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <p className="text-sm font-medium text-purple-600">Referencia</p>
                <p className="text-lg font-bold text-purple-900">{transaccion.referencia}</p>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <p className="text-sm font-medium text-orange-600">Estado</p>
                <p className="text-lg font-bold text-orange-900">{transaccion.estado}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Navegación de vistas */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
          { id: 'facturas', label: 'Facturas', icon: Receipt },
          { id: 'planes', label: 'Planes', icon: Target },
          { id: 'transacciones', label: 'Transacciones', icon: CreditCard },
          { id: 'reportes', label: 'Reportes', icon: FileText },
        ].map((view) => (
          <button
            key={view.id}
            onClick={() => setActiveView(view.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeView === view.id
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <view.icon className="w-4 h-4" />
            {view.label}
          </button>
        ))}
      </div>

      {/* Contenido de la vista activa */}
      {activeView === 'dashboard' && <DashboardView />}
      {activeView === 'facturas' && <FacturasView />}
      {activeView === 'planes' && <PlanesView />}
      {activeView === 'transacciones' && <TransaccionesView />}
      {activeView === 'reportes' && <div>Vista de Reportes (en desarrollo)</div>}
    </div>
  );
};

export default ClienteFacturacion;

