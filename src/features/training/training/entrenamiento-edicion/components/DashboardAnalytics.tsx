import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3, TrendingUp, TrendingDown, Activity, Heart, Flame, Zap,
  Award, Target, Clock, Weight, Repeat, Users, Calendar, MessageSquare,
  Eye, Download, Share, Settings, Filter, RefreshCw, AlertCircle,
  CheckCircle, Star, Bookmark, Tag, ArrowUp, ArrowDown, Minus
} from 'lucide-react';

interface MetricasTiempoReal {
  sesionesActivas: number;
  clientesEnLinea: number;
  ejerciciosCompletados: number;
  caloriasQuemadas: number;
  tiempoTotal: number;
  satisfaccionPromedio: number;
  adherencia: number;
  progresoGeneral: number;
}

interface MetricasHistorico {
  fecha: string;
  sesiones: number;
  ejercicios: number;
  calorias: number;
  satisfaccion: number;
  adherencia: number;
}

interface DashboardAnalyticsProps {
  entrenamientoId: string;
  periodo: 'dia' | 'semana' | 'mes' | 'año';
  onPeriodoChange: (periodo: 'dia' | 'semana' | 'mes' | 'año') => void;
  modo: 'vista' | 'edicion' | 'completo';
}

const DashboardAnalytics: React.FC<DashboardAnalyticsProps> = ({
  entrenamientoId,
  periodo,
  onPeriodoChange,
  modo
}) => {
  const [metricas, setMetricas] = useState<MetricasTiempoReal>({
    sesionesActivas: 0,
    clientesEnLinea: 0,
    ejerciciosCompletados: 0,
    caloriasQuemadas: 0,
    tiempoTotal: 0,
    satisfaccionPromedio: 0,
    adherencia: 0,
    progresoGeneral: 0
  });
  
  const [datosHistoricos, setDatosHistoricos] = useState<MetricasHistorico[]>([]);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [actualizando, setActualizando] = useState(false);

  // Simular datos en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setMetricas(prev => ({
        sesionesActivas: Math.floor(Math.random() * 10) + 5,
        clientesEnLinea: Math.floor(Math.random() * 20) + 15,
        ejerciciosCompletados: prev.ejerciciosCompletados + Math.floor(Math.random() * 3),
        caloriasQuemadas: prev.caloriasQuemadas + Math.floor(Math.random() * 50) + 25,
        tiempoTotal: prev.tiempoTotal + Math.floor(Math.random() * 5) + 2,
        satisfaccionPromedio: Math.round((Math.random() * 2 + 3) * 10) / 10,
        adherencia: Math.round((Math.random() * 20 + 70) * 10) / 10,
        progresoGeneral: Math.round((Math.random() * 15 + 75) * 10) / 10
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Datos históricos mock
  useEffect(() => {
    const datosMock: MetricasHistorico[] = [
      { fecha: '2024-01-01', sesiones: 12, ejercicios: 45, calorias: 1200, satisfaccion: 4.2, adherencia: 78 },
      { fecha: '2024-01-02', sesiones: 15, ejercicios: 52, calorias: 1350, satisfaccion: 4.5, adherencia: 82 },
      { fecha: '2024-01-03', sesiones: 18, ejercicios: 48, calorias: 1280, satisfaccion: 4.3, adherencia: 85 },
      { fecha: '2024-01-04', sesiones: 14, ejercicios: 41, calorias: 1150, satisfaccion: 4.1, adherencia: 79 },
      { fecha: '2024-01-05', sesiones: 20, ejercicios: 58, calorias: 1420, satisfaccion: 4.6, adherencia: 88 },
      { fecha: '2024-01-06', sesiones: 16, ejercicios: 44, calorias: 1180, satisfaccion: 4.4, adherencia: 81 },
      { fecha: '2024-01-07', sesiones: 22, ejercicios: 61, calorias: 1580, satisfaccion: 4.7, adherencia: 92 }
    ];
    setDatosHistoricos(datosMock);
  }, [periodo]);

  // Actualizar datos
  const actualizarDatos = async () => {
    setActualizando(true);
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 2000));
    setActualizando(false);
  };

  // Obtener tendencia
  const obtenerTendencia = (actual: number, anterior: number) => {
    if (actual > anterior) return { icono: ArrowUp, color: 'text-green-600', texto: 'Subiendo' };
    if (actual < anterior) return { icono: ArrowDown, color: 'text-red-600', texto: 'Bajando' };
    return { icono: Minus, color: 'text-gray-600', texto: 'Estable' };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Dashboard de Analytics</h2>
            <p className="text-gray-600">Métricas en tiempo real del entrenamiento</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {['dia', 'semana', 'mes', 'año'].map((p) => (
                <button
                  key={p}
                  onClick={() => onPeriodoChange(p as any)}
                  className={`px-3 py-1 rounded-full text-sm font-semibold transition-all ${
                    periodo === p
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>
            
            <button
              onClick={actualizarDatos}
              disabled={actualizando}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${actualizando ? 'animate-spin' : ''}`} />
              Actualizar
            </button>
          </div>
        </div>

        {/* Indicador de tiempo real */}
        <div className="flex items-center gap-2 text-sm text-green-600">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Datos en tiempo real</span>
        </div>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            titulo: 'Sesiones Activas',
            valor: metricas.sesionesActivas,
            icono: Activity,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-200',
            unidad: 'sesiones'
          },
          {
            titulo: 'Clientes en Línea',
            valor: metricas.clientesEnLinea,
            icono: Users,
            color: 'text-green-600',
            bgColor: 'bg-green-50',
            borderColor: 'border-green-200',
            unidad: 'clientes'
          },
          {
            titulo: 'Ejercicios Completados',
            valor: metricas.ejerciciosCompletados,
            icono: CheckCircle,
            color: 'text-orange-600',
            bgColor: 'bg-orange-50',
            borderColor: 'border-orange-200',
            unidad: 'ejercicios'
          },
          {
            titulo: 'Calorías Quemadas',
            valor: metricas.caloriasQuemadas,
            icono: Flame,
            color: 'text-red-600',
            bgColor: 'bg-red-50',
            borderColor: 'border-red-200',
            unidad: 'kcal'
          }
        ].map((metrica, index) => (
          <motion.div
            key={metrica.titulo}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${metrica.bgColor} ${metrica.borderColor} border rounded-xl p-6`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${metrica.bgColor}`}>
                <metrica.icono className={`w-6 h-6 ${metrica.color}`} />
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-600">+12%</span>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-1">{metrica.titulo}</p>
              <p className="text-3xl font-bold text-gray-900">{metrica.valor.toLocaleString()}</p>
              <p className="text-sm text-gray-500">{metrica.unidad}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Métricas de rendimiento */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Satisfacción y Adherencia */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Satisfacción y Adherencia</h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">Satisfacción Promedio</span>
                <span className="text-lg font-bold text-gray-900">{metricas.satisfaccionPromedio}/5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-orange-500 to-pink-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(metricas.satisfaccionPromedio / 5) * 100}%` }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">Adherencia</span>
                <span className="text-lg font-bold text-gray-900">{metricas.adherencia}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-green-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${metricas.adherencia}%` }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">Progreso General</span>
                <span className="text-lg font-bold text-gray-900">{metricas.progresoGeneral}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${metricas.progresoGeneral}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tiempo y Eficiencia */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Tiempo y Eficiencia</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-gray-900">Tiempo Total</span>
              </div>
              <span className="text-2xl font-bold text-blue-600">{metricas.tiempoTotal}h</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-gray-900">Eficiencia</span>
              </div>
              <span className="text-2xl font-bold text-green-600">87%</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-orange-600" />
                <span className="font-semibold text-gray-900">Intensidad Promedio</span>
              </div>
              <span className="text-2xl font-bold text-orange-600">7.2/10</span>
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos de tendencias */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de sesiones */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Sesiones por Día</h3>
          <div className="h-64 flex items-end justify-between gap-2">
            {datosHistoricos.map((dato, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <div 
                  className="w-8 bg-gradient-to-t from-orange-500 to-pink-600 rounded-t-lg transition-all duration-500"
                  style={{ height: `${(dato.sesiones / 25) * 200}px` }}
                />
                <span className="text-xs text-gray-600">{new Date(dato.fecha).getDate()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Gráfico de calorías */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Calorías Quemadas</h3>
          <div className="h-64 flex items-end justify-between gap-2">
            {datosHistoricos.map((dato, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <div 
                  className="w-8 bg-gradient-to-t from-red-500 to-orange-600 rounded-t-lg transition-all duration-500"
                  style={{ height: `${(dato.calorias / 1600) * 200}px` }}
                />
                <span className="text-xs text-gray-600">{new Date(dato.fecha).getDate()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top ejercicios y clientes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Ejercicios */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Ejercicios Más Populares</h3>
          <div className="space-y-3">
            {[
              { nombre: 'Sentadilla', completados: 45, tendencia: '+12%' },
              { nombre: 'Press de Banca', completados: 38, tendencia: '+8%' },
              { nombre: 'Peso Muerto', completados: 32, tendencia: '+15%' },
              { nombre: 'Dominadas', completados: 28, tendencia: '+5%' },
              { nombre: 'Burpees', completados: 25, tendencia: '+20%' }
            ].map((ejercicio, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <span className="font-semibold text-gray-900">{ejercicio.nombre}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{ejercicio.completados}</span>
                  <span className="text-sm text-green-600">{ejercicio.tendencia}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Clientes */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Clientes Más Activos</h3>
          <div className="space-y-3">
            {[
              { nombre: 'Juan Pérez', sesiones: 12, progreso: '+15%' },
              { nombre: 'María López', sesiones: 10, progreso: '+8%' },
              { nombre: 'Carlos García', sesiones: 9, progreso: '+12%' },
              { nombre: 'Ana Rodríguez', sesiones: 8, progreso: '+5%' },
              { nombre: 'Pedro Martínez', sesiones: 7, progreso: '+18%' }
            ].map((cliente, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <img
                    src={`https://i.pravatar.cc/150?img=${index + 1}`}
                    alt={cliente.nombre}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="font-semibold text-gray-900">{cliente.nombre}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{cliente.sesiones} sesiones</span>
                  <span className="text-sm text-green-600">{cliente.progreso}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alertas y notificaciones */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Alertas y Notificaciones</h3>
        <div className="space-y-3">
          {[
            { tipo: 'success', mensaje: 'Cliente Juan Pérez completó su objetivo semanal', tiempo: 'Hace 5 min' },
            { tipo: 'warning', mensaje: 'Sesión de María López retrasada 15 minutos', tiempo: 'Hace 10 min' },
            { tipo: 'info', mensaje: 'Nuevo récord personal en sentadilla para Carlos García', tiempo: 'Hace 20 min' },
            { tipo: 'error', mensaje: 'Equipamiento no disponible para sesión de Ana Rodríguez', tiempo: 'Hace 30 min' }
          ].map((alerta, index) => (
            <div key={index} className={`flex items-center gap-3 p-3 rounded-lg ${
              alerta.tipo === 'success' ? 'bg-green-50 border border-green-200' :
              alerta.tipo === 'warning' ? 'bg-yellow-50 border border-yellow-200' :
              alerta.tipo === 'info' ? 'bg-blue-50 border border-blue-200' :
              'bg-red-50 border border-red-200'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                alerta.tipo === 'success' ? 'bg-green-500' :
                alerta.tipo === 'warning' ? 'bg-yellow-500' :
                alerta.tipo === 'info' ? 'bg-blue-500' :
                'bg-red-500'
              }`} />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">{alerta.mensaje}</p>
                <p className="text-xs text-gray-600">{alerta.tiempo}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardAnalytics;







