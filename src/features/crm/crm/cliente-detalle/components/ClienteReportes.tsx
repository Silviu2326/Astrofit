import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Download, 
  Mail, 
  Calendar, 
  Settings, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  Share2, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  BarChart3, 
  PieChart, 
  LineChart, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Target, 
  Activity, 
  Heart, 
  Zap, 
  RefreshCw, 
  Filter, 
  Search,
  Archive,
  Star,
  Bell
} from 'lucide-react';

interface ClienteReportesProps {
  clienteId: string;
  clienteNombre: string;
}

interface Reporte {
  id: string;
  nombre: string;
  descripcion: string;
  tipo: 'automatico' | 'manual' | 'programado';
  categoria: 'progreso' | 'financiero' | 'satisfaccion' | 'completo';
  formato: 'pdf' | 'excel' | 'powerpoint' | 'html';
  frecuencia: 'diario' | 'semanal' | 'mensual' | 'trimestral' | 'anual' | 'bajo_demanda';
  ultimaGeneracion: string;
  proximaGeneracion: string;
  estado: 'activo' | 'pausado' | 'inactivo';
  destinatarios: string[];
  metricas: string[];
  configuracion: any;
}

interface PlantillaReporte {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  formato: string;
  metricas: string[];
  configuracion: any;
  uso: number;
  activa: boolean;
}

interface EjecucionReporte {
  id: string;
  reporteId: string;
  fecha: string;
  estado: 'exitoso' | 'fallido' | 'en_progreso';
  duracion: number;
  tamaño: string;
  destinatarios: string[];
  errores: string[];
}

const ClienteReportes: React.FC<ClienteReportesProps> = ({ clienteId, clienteNombre }) => {
  const [activeView, setActiveView] = useState<'reportes' | 'plantillas' | 'ejecuciones' | 'configuracion'>('reportes');
  const [filtroTipo, setFiltroTipo] = useState<'todos' | 'automatico' | 'manual' | 'programado'>('todos');
  const [filtroCategoria, setFiltroCategoria] = useState<'todos' | 'progreso' | 'financiero' | 'satisfaccion' | 'completo'>('todos');
  const [showCrearReporte, setShowCrearReporte] = useState(false);

  // Datos mock para demostración
  const reportes: Reporte[] = [
    {
      id: '1',
      nombre: 'Reporte de Progreso Semanal',
      descripcion: 'Resumen semanal del progreso físico y nutricional del cliente',
      tipo: 'automatico',
      categoria: 'progreso',
      formato: 'pdf',
      frecuencia: 'semanal',
      ultimaGeneracion: '2024-01-15 09:00',
      proximaGeneracion: '2024-01-22 09:00',
      estado: 'activo',
      destinatarios: [clienteNombre, 'entrenador@ejemplo.com'],
      metricas: ['peso', 'medidas', 'adherencia', 'sesiones'],
      configuracion: {
        incluirGraficos: true,
        incluirRecomendaciones: true,
        nivelDetalle: 'alto'
      }
    },
    {
      id: '2',
      nombre: 'Análisis Financiero Mensual',
      descripcion: 'Reporte completo de ingresos, gastos y proyecciones financieras',
      tipo: 'programado',
      categoria: 'financiero',
      formato: 'excel',
      frecuencia: 'mensual',
      ultimaGeneracion: '2024-01-01 08:00',
      proximaGeneracion: '2024-02-01 08:00',
      estado: 'activo',
      destinatarios: ['admin@ejemplo.com', 'finanzas@ejemplo.com'],
      metricas: ['ingresos', 'gastos', 'ltv', 'retention'],
      configuracion: {
        incluirGraficos: true,
        incluirProyecciones: true,
        nivelDetalle: 'medio'
      }
    },
    {
      id: '3',
      nombre: 'Encuesta de Satisfacción',
      descripcion: 'Reporte de satisfacción del cliente y feedback',
      tipo: 'manual',
      categoria: 'satisfaccion',
      formato: 'html',
      frecuencia: 'bajo_demanda',
      ultimaGeneracion: '2024-01-10 14:30',
      proximaGeneracion: 'Bajo demanda',
      estado: 'activo',
      destinatarios: [clienteNombre],
      metricas: ['satisfaccion', 'nps', 'feedback'],
      configuracion: {
        incluirGraficos: false,
        incluirComentarios: true,
        nivelDetalle: 'bajo'
      }
    },
    {
      id: '4',
      nombre: 'Reporte Ejecutivo Completo',
      descripcion: 'Dashboard ejecutivo con todos los KPIs y métricas importantes',
      tipo: 'programado',
      categoria: 'completo',
      formato: 'powerpoint',
      frecuencia: 'trimestral',
      ultimaGeneracion: '2023-12-31 23:59',
      proximaGeneracion: '2024-03-31 23:59',
      estado: 'pausado',
      destinatarios: ['director@ejemplo.com', 'admin@ejemplo.com'],
      metricas: ['todos'],
      configuracion: {
        incluirGraficos: true,
        incluirRecomendaciones: true,
        nivelDetalle: 'alto'
      }
    }
  ];

  const plantillas: PlantillaReporte[] = [
    {
      id: '1',
      nombre: 'Plantilla de Progreso Básico',
      descripcion: 'Plantilla estándar para reportes de progreso físico',
      categoria: 'progreso',
      formato: 'pdf',
      metricas: ['peso', 'medidas', 'sesiones'],
      configuracion: {
        incluirGraficos: true,
        incluirRecomendaciones: false,
        nivelDetalle: 'medio'
      },
      uso: 25,
      activa: true
    },
    {
      id: '2',
      nombre: 'Plantilla Financiera Avanzada',
      descripcion: 'Plantilla completa para análisis financiero detallado',
      categoria: 'financiero',
      formato: 'excel',
      metricas: ['ingresos', 'gastos', 'ltv', 'retention', 'cac'],
      configuracion: {
        incluirGraficos: true,
        incluirProyecciones: true,
        nivelDetalle: 'alto'
      },
      uso: 12,
      activa: true
    },
    {
      id: '3',
      nombre: 'Plantilla de Satisfacción',
      descripcion: 'Plantilla para reportes de satisfacción y NPS',
      categoria: 'satisfaccion',
      formato: 'html',
      metricas: ['satisfaccion', 'nps', 'feedback'],
      configuracion: {
        incluirGraficos: true,
        incluirComentarios: true,
        nivelDetalle: 'medio'
      },
      uso: 8,
      activa: true
    }
  ];

  const ejecuciones: EjecucionReporte[] = [
    {
      id: '1',
      reporteId: '1',
      fecha: '2024-01-15 09:00',
      estado: 'exitoso',
      duracion: 45,
      tamaño: '2.3 MB',
      destinatarios: [clienteNombre, 'entrenador@ejemplo.com'],
      errores: []
    },
    {
      id: '2',
      reporteId: '2',
      fecha: '2024-01-01 08:00',
      estado: 'exitoso',
      duracion: 120,
      tamaño: '5.7 MB',
      destinatarios: ['admin@ejemplo.com', 'finanzas@ejemplo.com'],
      errores: []
    },
    {
      id: '3',
      reporteId: '3',
      fecha: '2024-01-10 14:30',
      estado: 'fallido',
      duracion: 30,
      tamaño: '0 MB',
      destinatarios: [clienteNombre],
      errores: ['Error de conexión con la base de datos', 'Timeout en la generación de gráficos']
    }
  ];

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'automatico': return 'bg-green-100 text-green-800';
      case 'manual': return 'bg-blue-100 text-blue-800';
      case 'programado': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoriaColor = (categoria: string) => {
    switch (categoria) {
      case 'progreso': return 'bg-blue-100 text-blue-800';
      case 'financiero': return 'bg-green-100 text-green-800';
      case 'satisfaccion': return 'bg-purple-100 text-purple-800';
      case 'completo': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'activo': return 'bg-green-100 text-green-800';
      case 'pausado': return 'bg-yellow-100 text-yellow-800';
      case 'inactivo': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFormatoIcon = (formato: string) => {
    switch (formato) {
      case 'pdf': return <FileText className="w-4 h-4 text-red-600" />;
      case 'excel': return <BarChart3 className="w-4 h-4 text-green-600" />;
      case 'powerpoint': return <PieChart className="w-4 h-4 text-orange-600" />;
      case 'html': return <LineChart className="w-4 h-4 text-blue-600" />;
      default: return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

  const getFrecuenciaIcon = (frecuencia: string) => {
    switch (frecuencia) {
      case 'diario': return <Clock className="w-4 h-4 text-blue-600" />;
      case 'semanal': return <Calendar className="w-4 h-4 text-green-600" />;
      case 'mensual': return <Calendar className="w-4 h-4 text-purple-600" />;
      case 'trimestral': return <Calendar className="w-4 h-4 text-orange-600" />;
      case 'anual': return <Calendar className="w-4 h-4 text-red-600" />;
      case 'bajo_demanda': return <Zap className="w-4 h-4 text-gray-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const ReportesView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Reportes Automáticos</h3>
        <div className="flex items-center gap-2">
          <select
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="todos">Todos los tipos</option>
            <option value="automatico">Automático</option>
            <option value="manual">Manual</option>
            <option value="programado">Programado</option>
          </select>
          <select
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="todos">Todas las categorías</option>
            <option value="progreso">Progreso</option>
            <option value="financiero">Financiero</option>
            <option value="satisfaccion">Satisfacción</option>
            <option value="completo">Completo</option>
          </select>
          <button
            onClick={() => setShowCrearReporte(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Nuevo Reporte
          </button>
        </div>
      </div>

      {/* Métricas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Total Reportes</p>
              <p className="text-2xl font-bold text-blue-900">{reportes.length}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Activos</p>
              <p className="text-2xl font-bold text-green-900">
                {reportes.filter(r => r.estado === 'activo').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Generados Hoy</p>
              <p className="text-2xl font-bold text-purple-900">3</p>
            </div>
            <Zap className="w-8 h-8 text-purple-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">Próximos</p>
              <p className="text-2xl font-bold text-orange-900">
                {reportes.filter(r => r.estado === 'activo').length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-orange-600" />
          </div>
        </motion.div>
      </div>

      {/* Lista de reportes */}
      <div className="space-y-4">
        {reportes
          .filter(r => filtroTipo === 'todos' || r.tipo === filtroTipo)
          .filter(r => filtroCategoria === 'todos' || r.categoria === filtroCategoria)
          .map((reporte) => (
            <motion.div
              key={reporte.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-indigo-100 rounded-xl">
                    {getFormatoIcon(reporte.formato)}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{reporte.nombre}</h4>
                    <p className="text-sm text-gray-600">{reporte.descripcion}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Última generación: {new Date(reporte.ultimaGeneracion).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTipoColor(reporte.tipo)}`}>
                    {reporte.tipo}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoriaColor(reporte.categoria)}`}>
                    {reporte.categoria}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEstadoColor(reporte.estado)}`}>
                    {reporte.estado}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-600">Formato</p>
                  <p className="text-lg font-bold text-gray-900 uppercase">{reporte.formato}</p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-600">Frecuencia</p>
                  <p className="text-sm font-bold text-blue-900 capitalize">{reporte.frecuencia}</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium text-green-600">Destinatarios</p>
                  <p className="text-lg font-bold text-green-900">{reporte.destinatarios.length}</p>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm font-medium text-purple-600">Métricas</p>
                  <p className="text-lg font-bold text-purple-900">{reporte.metricas.length}</p>
                </div>
              </div>

              <div className="mb-4">
                <h5 className="text-sm font-medium text-gray-700 mb-2">Destinatarios</h5>
                <div className="flex flex-wrap gap-2">
                  {reporte.destinatarios.map((destinatario, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium"
                    >
                      {destinatario}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h5 className="text-sm font-medium text-gray-700 mb-2">Métricas Incluidas</h5>
                <div className="flex flex-wrap gap-2">
                  {reporte.metricas.map((metrica, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium"
                    >
                      {metrica}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    Próxima: {reporte.proximaGeneracion === 'Bajo demanda' ? 'Bajo demanda' : 
                             new Date(reporte.proximaGeneracion).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Mail className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  );

  const PlantillasView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Plantillas de Reportes</h3>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          <Plus className="w-4 h-4" />
          Nueva Plantilla
        </button>
      </div>

      <div className="space-y-4">
        {plantillas.map((plantilla) => (
          <motion.div
            key={plantilla.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-100 rounded-xl">
                  {getFormatoIcon(plantilla.formato)}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{plantilla.nombre}</h4>
                  <p className="text-sm text-gray-600">{plantilla.descripcion}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Usada {plantilla.uso} veces
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoriaColor(plantilla.categoria)}`}>
                  {plantilla.categoria}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  plantilla.activa ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {plantilla.activa ? 'Activa' : 'Inactiva'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-600">Formato</p>
                <p className="text-lg font-bold text-gray-900 uppercase">{plantilla.formato}</p>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-600">Usos</p>
                <p className="text-lg font-bold text-blue-900">{plantilla.uso}</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-sm font-medium text-green-600">Métricas</p>
                <p className="text-lg font-bold text-green-900">{plantilla.metricas.length}</p>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <p className="text-sm font-medium text-purple-600">Estado</p>
                <p className="text-lg font-bold text-purple-900">
                  {plantilla.activa ? 'Activa' : 'Inactiva'}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Métricas Incluidas</h5>
              <div className="flex flex-wrap gap-2">
                {plantilla.metricas.map((metrica, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium"
                  >
                    {metrica}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                <Eye className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                <Download className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                <Edit3 className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const EjecucionesView = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Historial de Ejecuciones</h3>
      
      <div className="space-y-4">
        {ejecuciones.map((ejecucion) => (
          <motion.div
            key={ejecucion.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-100 rounded-xl">
                  <FileText className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Ejecución #{ejecucion.id}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {new Date(ejecucion.fecha).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  ejecucion.estado === 'exitoso' ? 'bg-green-100 text-green-800' :
                  ejecucion.estado === 'fallido' ? 'bg-red-100 text-red-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {ejecucion.estado}
                </span>
                <span className="text-sm text-gray-600">
                  {ejecucion.duracion}s
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-600">Duración</p>
                <p className="text-lg font-bold text-gray-900">{ejecucion.duracion}s</p>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-600">Tamaño</p>
                <p className="text-lg font-bold text-blue-900">{ejecucion.tamaño}</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-sm font-medium text-green-600">Destinatarios</p>
                <p className="text-lg font-bold text-green-900">{ejecucion.destinatarios.length}</p>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <p className="text-sm font-medium text-red-600">Errores</p>
                <p className="text-lg font-bold text-red-900">{ejecucion.errores.length}</p>
              </div>
            </div>

            {ejecucion.errores.length > 0 && (
              <div className="p-4 bg-red-50 rounded-lg mb-4">
                <h5 className="font-medium text-red-900 mb-2">Errores Encontrados</h5>
                <ul className="space-y-1">
                  {ejecucion.errores.map((error, index) => (
                    <li key={index} className="text-sm text-red-800">• {error}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  Destinatarios: {ejecucion.destinatarios.join(', ')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                  <Download className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl text-white">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Reportes Automáticos</h2>
            <p className="text-sm text-gray-600">Generación y distribución automática de reportes para {clienteNombre}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
            <Filter className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Navegación de vistas */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'reportes', label: 'Reportes', icon: FileText },
          { id: 'plantillas', label: 'Plantillas', icon: Star },
          { id: 'ejecuciones', label: 'Ejecuciones', icon: Clock },
          { id: 'configuracion', label: 'Configuración', icon: Settings },
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
      {activeView === 'reportes' && <ReportesView />}
      {activeView === 'plantillas' && <PlantillasView />}
      {activeView === 'ejecuciones' && <EjecucionesView />}
      {activeView === 'configuracion' && <div>Vista de Configuración (en desarrollo)</div>}
    </div>
  );
};

export default ClienteReportes;

