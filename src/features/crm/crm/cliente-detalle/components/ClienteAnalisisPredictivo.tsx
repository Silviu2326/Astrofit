import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  AlertTriangle, 
  TrendingDown, 
  TrendingUp, 
  Brain, 
  Target, 
  Shield, 
  Zap,
  Users,
  Calendar,
  Activity,
  Heart,
  DollarSign,
  BarChart3,
  PieChart,
  Bell,
  Mail,
  Phone,
  MessageCircle,
  RefreshCw,
  Eye,
  Settings
} from 'lucide-react';

interface ClienteAnalisisPredictivoProps {
  clienteId: string;
  clienteNombre: string;
}

interface PrediccionAbandono {
  id: string;
  cliente: string;
  probabilidadAbandono: number;
  nivelRiesgo: 'bajo' | 'medio' | 'alto' | 'critico';
  factoresRiesgo: FactorRiesgo[];
  recomendaciones: Recomendacion[];
  ultimaActividad: string;
  tendencia: 'mejorando' | 'estable' | 'empeorando';
}

interface FactorRiesgo {
  id: string;
  nombre: string;
  impacto: number;
  descripcion: string;
  solucion: string;
  prioridad: 'alta' | 'media' | 'baja';
}

interface Recomendacion {
  id: string;
  tipo: 'contacto' | 'oferta' | 'servicio' | 'motivacion';
  titulo: string;
  descripcion: string;
  accion: string;
  urgencia: 'inmediata' | 'corta' | 'media';
}

interface MetricaPrediccion {
  nombre: string;
  valor: number;
  tendencia: 'up' | 'down' | 'stable';
  impacto: 'positivo' | 'negativo' | 'neutral';
  descripcion: string;
}

const ClienteAnalisisPredictivo: React.FC<ClienteAnalisisPredictivoProps> = ({ clienteId, clienteNombre }) => {
  const [activeView, setActiveView] = useState<'dashboard' | 'factores' | 'recomendaciones' | 'acciones'>('dashboard');
  const [filtroRiesgo, setFiltroRiesgo] = useState<'todos' | 'alto' | 'medio' | 'bajo'>('todos');

  // Datos mock para demostración
  const prediccion: PrediccionAbandono = {
    id: '1',
    cliente: clienteNombre,
    probabilidadAbandono: 35,
    nivelRiesgo: 'medio',
    ultimaActividad: '2024-01-10',
    tendencia: 'empeorando',
    factoresRiesgo: [
      {
        id: '1',
        nombre: 'Baja adherencia al plan nutricional',
        impacto: 85,
        descripcion: 'Solo ha seguido el 60% de las recomendaciones nutricionales',
        solucion: 'Programar consulta nutricional personalizada',
        prioridad: 'alta'
      },
      {
        id: '2',
        nombre: 'Falta de asistencia a sesiones',
        impacto: 70,
        descripcion: 'Ha faltado a 3 de las últimas 5 sesiones programadas',
        solucion: 'Revisar horarios y motivación del cliente',
        prioridad: 'alta'
      },
      {
        id: '3',
        nombre: 'Comunicación limitada',
        impacto: 45,
        descripcion: 'No responde mensajes ni participa en el chat',
        solucion: 'Implementar estrategia de comunicación proactiva',
        prioridad: 'media'
      }
    ],
    recomendaciones: [
      {
        id: '1',
        tipo: 'contacto',
        titulo: 'Llamada de seguimiento urgente',
        descripcion: 'Contactar al cliente para entender sus preocupaciones',
        accion: 'Programar llamada para hoy',
        urgencia: 'inmediata'
      },
      {
        id: '2',
        tipo: 'oferta',
        titulo: 'Oferta de plan personalizado',
        descripcion: 'Proponer ajustes al plan actual para mayor flexibilidad',
        accion: 'Crear propuesta personalizada',
        urgencia: 'corta'
      },
      {
        id: '3',
        tipo: 'motivacion',
        titulo: 'Programa de motivación',
        descripcion: 'Implementar sistema de recompensas y logros',
        accion: 'Activar gamificación',
        urgencia: 'media'
      }
    ]
  };

  const metricas: MetricaPrediccion[] = [
    {
      nombre: 'Adherencia al Plan',
      valor: 60,
      tendencia: 'down',
      impacto: 'negativo',
      descripcion: 'Porcentaje de cumplimiento del plan de entrenamiento'
    },
    {
      nombre: 'Frecuencia de Comunicación',
      valor: 25,
      tendencia: 'down',
      impacto: 'negativo',
      descripcion: 'Interacciones con el sistema en los últimos 30 días'
    },
    {
      nombre: 'Satisfacción del Cliente',
      valor: 70,
      tendencia: 'stable',
      impacto: 'neutral',
      descripcion: 'Puntuación de satisfacción en encuestas'
    },
    {
      nombre: 'Progreso Físico',
      valor: 45,
      tendencia: 'down',
      impacto: 'negativo',
      descripcion: 'Mejora en métricas físicas objetivo'
    }
  ];

  const getNivelRiesgoColor = (nivel: string) => {
    switch (nivel) {
      case 'bajo': return 'bg-green-100 text-green-800';
      case 'medio': return 'bg-yellow-100 text-yellow-800';
      case 'alto': return 'bg-orange-100 text-orange-800';
      case 'critico': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getNivelRiesgoIcon = (nivel: string) => {
    switch (nivel) {
      case 'bajo': return <Shield className="w-4 h-4 text-green-600" />;
      case 'medio': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'alto': return <TrendingDown className="w-4 h-4 text-orange-600" />;
      case 'critico': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <AlertTriangle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getPrioridadColor = (prioridad: string) => {
    switch (prioridad) {
      case 'alta': return 'bg-red-100 text-red-800';
      case 'media': return 'bg-yellow-100 text-yellow-800';
      case 'baja': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgenciaColor = (urgencia: string) => {
    switch (urgencia) {
      case 'inmediata': return 'bg-red-100 text-red-800';
      case 'corta': return 'bg-orange-100 text-orange-800';
      case 'media': return 'bg-yellow-100 text-yellow-800';
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

  const DashboardView = () => (
    <div className="space-y-6">
      {/* Alerta principal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 rounded-2xl border-2 ${
          prediccion.nivelRiesgo === 'critico' ? 'bg-red-50 border-red-200' :
          prediccion.nivelRiesgo === 'alto' ? 'bg-orange-50 border-orange-200' :
          prediccion.nivelRiesgo === 'medio' ? 'bg-yellow-50 border-yellow-200' :
          'bg-green-50 border-green-200'
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {getNivelRiesgoIcon(prediccion.nivelRiesgo)}
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Análisis de Riesgo de Abandono
              </h3>
              <p className="text-sm text-gray-600">
                Probabilidad de abandono: <strong>{prediccion.probabilidadAbandono}%</strong>
              </p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getNivelRiesgoColor(prediccion.nivelRiesgo)}`}>
            Riesgo {prediccion.nivelRiesgo}
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-white/50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">{prediccion.probabilidadAbandono}%</p>
            <p className="text-sm text-gray-600">Probabilidad de abandono</p>
          </div>
          <div className="text-center p-4 bg-white/50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">{prediccion.factoresRiesgo.length}</p>
            <p className="text-sm text-gray-600">Factores de riesgo</p>
          </div>
          <div className="text-center p-4 bg-white/50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">{prediccion.recomendaciones.length}</p>
            <p className="text-sm text-gray-600">Recomendaciones</p>
          </div>
        </div>
      </motion.div>

      {/* Métricas de predicción */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {metricas.map((metrica, index) => (
          <motion.div
            key={metrica.nombre}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900">{metrica.nombre}</h4>
              <div className="flex items-center gap-2">
                {getTendenciaIcon(metrica.tendencia)}
                <span className={`text-sm font-medium ${
                  metrica.impacto === 'positivo' ? 'text-green-600' :
                  metrica.impacto === 'negativo' ? 'text-red-600' :
                  'text-gray-600'
                }`}>
                  {metrica.impacto}
                </span>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progreso</span>
                <span>{metrica.valor}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    metrica.impacto === 'positivo' ? 'bg-green-500' :
                    metrica.impacto === 'negativo' ? 'bg-red-500' :
                    'bg-gray-500'
                  }`}
                  style={{ width: `${metrica.valor}%` }}
                />
              </div>
            </div>
            
            <p className="text-sm text-gray-600">{metrica.descripcion}</p>
          </motion.div>
        ))}
      </div>

      {/* Acciones rápidas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center gap-3 p-4 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
            <Phone className="w-5 h-5 text-red-600" />
            <div className="text-left">
              <p className="font-medium text-red-900">Llamar Cliente</p>
              <p className="text-sm text-red-600">Contacto inmediato</p>
            </div>
          </button>
          <button className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
            <Mail className="w-5 h-5 text-blue-600" />
            <div className="text-left">
              <p className="font-medium text-blue-900">Enviar Email</p>
              <p className="text-sm text-blue-600">Seguimiento personalizado</p>
            </div>
          </button>
          <button className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
            <MessageCircle className="w-5 h-5 text-green-600" />
            <div className="text-left">
              <p className="font-medium text-green-900">Chat Directo</p>
              <p className="text-sm text-green-600">Comunicación instantánea</p>
            </div>
          </button>
        </div>
      </motion.div>
    </div>
  );

  const FactoresView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Factores de Riesgo</h3>
        <div className="flex items-center gap-2">
          <select
            value={filtroRiesgo}
            onChange={(e) => setFiltroRiesgo(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="todos">Todos</option>
            <option value="alto">Alta Prioridad</option>
            <option value="medio">Media Prioridad</option>
            <option value="baja">Baja Prioridad</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {prediccion.factoresRiesgo
          .filter(factor => filtroRiesgo === 'todos' || factor.prioridad === filtroRiesgo)
          .map((factor) => (
            <motion.div
              key={factor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{factor.nombre}</h4>
                    <p className="text-sm text-gray-600">{factor.descripcion}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPrioridadColor(factor.prioridad)}`}>
                    {factor.prioridad}
                  </span>
                  <span className="text-sm font-bold text-gray-900">{factor.impacto}%</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Impacto en el riesgo</span>
                  <span>{factor.impacto}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-500"
                    style={{ width: `${factor.impacto}%` }}
                  />
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <h5 className="font-medium text-blue-900 mb-2">Solución Recomendada</h5>
                <p className="text-sm text-blue-800">{factor.solucion}</p>
              </div>

              <div className="flex items-center justify-end gap-2 mt-4">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm">
                  Implementar Solución
                </button>
                <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  );

  const RecomendacionesView = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Recomendaciones de Acción</h3>
      
      <div className="space-y-4">
        {prediccion.recomendaciones.map((recomendacion) => (
          <motion.div
            key={recomendacion.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  recomendacion.tipo === 'contacto' ? 'bg-blue-100' :
                  recomendacion.tipo === 'oferta' ? 'bg-green-100' :
                  recomendacion.tipo === 'servicio' ? 'bg-purple-100' :
                  'bg-orange-100'
                }`}>
                  {recomendacion.tipo === 'contacto' ? <Phone className="w-5 h-5 text-blue-600" /> :
                   recomendacion.tipo === 'oferta' ? <DollarSign className="w-5 h-5 text-green-600" /> :
                   recomendacion.tipo === 'servicio' ? <Settings className="w-5 h-5 text-purple-600" /> :
                   <Heart className="w-5 h-5 text-orange-600" />}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{recomendacion.titulo}</h4>
                  <p className="text-sm text-gray-600">{recomendacion.descripcion}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getUrgenciaColor(recomendacion.urgencia)}`}>
                {recomendacion.urgencia}
              </span>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg mb-4">
              <h5 className="font-medium text-gray-900 mb-2">Acción Sugerida</h5>
              <p className="text-sm text-gray-700">{recomendacion.accion}</p>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm">
                Ejecutar Acción
              </button>
              <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm">
                Programar
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header con IA */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl text-white">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Análisis Predictivo de Abandono</h2>
            <p className="text-sm text-gray-600">IA avanzada para prevenir pérdida de clientes</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Navegación de vistas */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
          { id: 'factores', label: 'Factores', icon: AlertTriangle },
          { id: 'recomendaciones', label: 'Recomendaciones', icon: Target },
          { id: 'acciones', label: 'Acciones', icon: Zap },
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
      {activeView === 'factores' && <FactoresView />}
      {activeView === 'recomendaciones' && <RecomendacionesView />}
      {activeView === 'acciones' && <div>Vista de Acciones (en desarrollo)</div>}
    </div>
  );
};

export default ClienteAnalisisPredictivo;

