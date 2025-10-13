import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Link, 
  ExternalLink, 
  ArrowRight, 
  Activity, 
  Apple, 
  Target, 
  TrendingUp,
  TrendingDown,
  Calendar,
  DollarSign,
  Users,
  BarChart3,
  Settings,
  Zap
} from 'lucide-react';

interface ClienteIntegrationsProps {
  clienteId: string;
  clienteNombre: string;
}

interface ModuloIntegracion {
  id: string;
  nombre: string;
  descripcion: string;
  icono: React.ComponentType<any>;
  color: string;
  estado: 'activo' | 'inactivo' | 'pendiente';
  datos: {
    total: number;
    recientes: number;
    tendencia: 'up' | 'down' | 'stable';
  };
  acciones: {
    ver: string;
    gestionar: string;
    configurar: string;
  };
}

const ClienteIntegrations: React.FC<ClienteIntegrationsProps> = ({ clienteId, clienteNombre }) => {
  const [activeModulo, setActiveModulo] = useState<string | null>(null);

  const modulos: ModuloIntegracion[] = [
    {
      id: 'entrenamiento',
      nombre: 'Módulo de Entrenamiento',
      descripcion: 'Planes de entrenamiento, sesiones y seguimiento de rendimiento',
      icono: Activity,
      color: 'from-orange-500 to-red-500',
      estado: 'activo',
      datos: {
        total: 12,
        recientes: 3,
        tendencia: 'up'
      },
      acciones: {
        ver: `/training/entrenamiento-edicion?clienteId=${clienteId}`,
        gestionar: `/training/entrenamiento-edicion?clienteId=${clienteId}&action=manage`,
        configurar: `/training/entrenamiento-edicion?clienteId=${clienteId}&action=config`
      }
    },
    {
      id: 'nutricion',
      nombre: 'Módulo de Nutrición',
      descripcion: 'Planes alimentarios, seguimiento de macros y recetas',
      icono: Apple,
      color: 'from-green-500 to-emerald-500',
      estado: 'activo',
      datos: {
        total: 8,
        recientes: 2,
        tendencia: 'up'
      },
      acciones: {
        ver: `/nutrition/dieta-edicion?clienteId=${clienteId}`,
        gestionar: `/nutrition/dieta-edicion?clienteId=${clienteId}&action=manage`,
        configurar: `/nutrition/dieta-edicion?clienteId=${clienteId}&action=config`
      }
    },
    {
      id: 'progreso',
      nombre: 'Módulo de Progreso',
      descripcion: 'Seguimiento de medidas, fotos de progreso y análisis',
      icono: TrendingUp,
      color: 'from-blue-500 to-cyan-500',
      estado: 'activo',
      datos: {
        total: 15,
        recientes: 5,
        tendencia: 'up'
      },
      acciones: {
        ver: `/progreso/cliente-progreso?clienteId=${clienteId}`,
        gestionar: `/progreso/cliente-progreso?clienteId=${clienteId}&action=manage`,
        configurar: `/progreso/cliente-progreso?clienteId=${clienteId}&action=config`
      }
    },
    {
      id: 'agenda',
      nombre: 'Módulo de Agenda',
      descripcion: 'Gestión de citas, recordatorios y calendario',
      icono: Calendar,
      color: 'from-purple-500 to-pink-500',
      estado: 'activo',
      datos: {
        total: 6,
        recientes: 2,
        tendencia: 'stable'
      },
      acciones: {
        ver: `/agenda/cliente-agenda?clienteId=${clienteId}`,
        gestionar: `/agenda/cliente-agenda?clienteId=${clienteId}&action=manage`,
        configurar: `/agenda/cliente-agenda?clienteId=${clienteId}&action=config`
      }
    },
    {
      id: 'finanzas',
      nombre: 'Módulo de Finanzas',
      descripcion: 'Facturación, pagos y gestión económica',
      icono: DollarSign,
      color: 'from-yellow-500 to-orange-500',
      estado: 'activo',
      datos: {
        total: 4,
        recientes: 1,
        tendencia: 'up'
      },
      acciones: {
        ver: `/finanzas/cliente-facturacion?clienteId=${clienteId}`,
        gestionar: `/finanzas/cliente-facturacion?clienteId=${clienteId}&action=manage`,
        configurar: `/finanzas/cliente-facturacion?clienteId=${clienteId}&action=config`
      }
    },
    {
      id: 'marketing',
      nombre: 'Módulo de Marketing',
      descripcion: 'Campañas, seguimiento de engagement y comunicación',
      icono: Users,
      color: 'from-indigo-500 to-purple-500',
      estado: 'inactivo',
      datos: {
        total: 0,
        recientes: 0,
        tendencia: 'stable'
      },
      acciones: {
        ver: `/marketing/cliente-campanas?clienteId=${clienteId}`,
        gestionar: `/marketing/cliente-campanas?clienteId=${clienteId}&action=manage`,
        configurar: `/marketing/cliente-campanas?clienteId=${clienteId}&action=config`
      }
    }
  ];

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'activo': return 'bg-green-100 text-green-800';
      case 'inactivo': return 'bg-gray-100 text-gray-800';
      case 'pendiente': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTendenciaIcon = (tendencia: string) => {
    switch (tendencia) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      case 'stable': return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
    }
  };

  const ModuloCard = ({ modulo }: { modulo: ModuloIntegracion }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className={`p-3 bg-gradient-to-br ${modulo.color} rounded-xl text-white`}>
            <modulo.icono className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{modulo.nombre}</h3>
            <p className="text-sm text-gray-600">{modulo.descripcion}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEstadoColor(modulo.estado)}`}>
          {modulo.estado}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium text-gray-600">Total</p>
          <p className="text-xl font-bold text-gray-900">{modulo.datos.total}</p>
        </div>
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <p className="text-sm font-medium text-blue-600">Recientes</p>
          <p className="text-xl font-bold text-blue-900">{modulo.datos.recientes}</p>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <p className="text-sm font-medium text-green-600">Tendencia</p>
          <p className="text-xl font-bold text-green-900">
            {getTendenciaIcon(modulo.datos.tendencia)}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <a
            href={modulo.acciones.ver}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
          >
            <ExternalLink className="w-4 h-4" />
            Ver
          </a>
          <a
            href={modulo.acciones.gestionar}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
          >
            <Settings className="w-4 h-4" />
            Gestionar
          </a>
        </div>
        <button
          onClick={() => setActiveModulo(activeModulo === modulo.id ? null : modulo.id)}
          className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
        >
          <ArrowRight className={`w-4 h-4 transition-transform ${activeModulo === modulo.id ? 'rotate-90' : ''}`} />
        </button>
      </div>

      {activeModulo === modulo.id && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 p-4 bg-gray-50 rounded-lg"
        >
          <h4 className="text-sm font-medium text-gray-700 mb-2">Acciones Rápidas</h4>
          <div className="space-y-2">
            <a
              href={modulo.acciones.ver}
              className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Ver detalles del módulo
            </a>
            <a
              href={modulo.acciones.gestionar}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              <Settings className="w-4 h-4" />
              Gestionar configuración
            </a>
            <a
              href={modulo.acciones.configurar}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              <Zap className="w-4 h-4" />
              Configurar integración
            </a>
          </div>
        </motion.div>
      )}
    </motion.div>
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Integraciones del Cliente</h2>
        <p className="text-gray-600">
          Gestión centralizada de todos los módulos para <strong>{clienteNombre}</strong>
        </p>
      </div>

      {/* Resumen de integraciones */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-2xl border border-indigo-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-indigo-600">Módulos Activos</p>
              <p className="text-2xl font-bold text-indigo-900">
                {modulos.filter(m => m.estado === 'activo').length}
              </p>
              <p className="text-xs text-indigo-600">de {modulos.length} disponibles</p>
            </div>
            <Link className="w-8 h-8 text-indigo-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Datos Totales</p>
              <p className="text-2xl font-bold text-green-900">
                {modulos.reduce((acc, m) => acc + m.datos.total, 0)}
              </p>
              <p className="text-xs text-green-600">registros</p>
            </div>
            <BarChart3 className="w-8 h-8 text-green-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Actividad Reciente</p>
              <p className="text-2xl font-bold text-purple-900">
                {modulos.reduce((acc, m) => acc + m.datos.recientes, 0)}
              </p>
              <p className="text-xs text-purple-600">últimas 24h</p>
            </div>
            <Activity className="w-8 h-8 text-purple-600" />
          </div>
        </motion.div>
      </div>

      {/* Lista de módulos */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Módulos Disponibles</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {modulos.map((modulo) => (
            <ModuloCard key={modulo.id} modulo={modulo} />
          ))}
        </div>
      </div>

      {/* Acciones globales */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones Globales</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center gap-3 p-4 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors">
            <Zap className="w-5 h-5 text-indigo-600" />
            <div className="text-left">
              <p className="font-medium text-indigo-900">Sincronizar Datos</p>
              <p className="text-sm text-indigo-600">Actualizar todos los módulos</p>
            </div>
          </button>
          <button className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
            <BarChart3 className="w-5 h-5 text-green-600" />
            <div className="text-left">
              <p className="font-medium text-green-900">Generar Reporte</p>
              <p className="text-sm text-green-600">Reporte completo del cliente</p>
            </div>
          </button>
          <button className="flex items-center gap-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
            <Settings className="w-5 h-5 text-purple-600" />
            <div className="text-left">
              <p className="font-medium text-purple-900">Configurar</p>
              <p className="text-sm text-purple-600">Ajustes de integración</p>
            </div>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ClienteIntegrations;
