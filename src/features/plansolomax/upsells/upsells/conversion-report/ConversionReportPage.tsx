import React, { useState } from 'react';
import {
  BarChart3, TrendingUp, TrendingDown, DollarSign,
  Target, Users, ShoppingCart, Package, Download,
  Settings, Send, AlertCircle, Award, Zap,
  Calendar, Clock, Lightbulb, PieChart, Filter
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  PieChart as RechartsPie, Pie, Cell, FunnelChart, Funnel,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { motion } from 'framer-motion';

// Datos mockeados
const generateMonthlyData = () => {
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  return months.map((month, idx) => ({
    month,
    tasaConversion: 15 + Math.random() * 7,
    ingresos: 2000 + Math.random() * 4000,
    ofertasPresentadas: 150 + Math.floor(Math.random() * 150),
    conversiones: 25 + Math.floor(Math.random() * 40)
  }));
};

const funnelData = [
  { name: 'Clientes Elegibles', value: 1000, porcentaje: 100, color: '#10b981' },
  { name: 'Oferta Presentada', value: 850, porcentaje: 85, color: '#059669' },
  { name: 'Oferta Vista', value: 700, porcentaje: 70, color: '#047857' },
  { name: 'Click en CTA', value: 350, porcentaje: 35, color: '#065f46' },
  { name: 'Conversión', value: 180, porcentaje: 18, color: '#064e3b' }
];

const offerTypeData = [
  { tipo: 'Upsell', vistas: 450, conversiones: 95, tasa: 21.1, ingresos: 15200, aov: 160 },
  { tipo: 'Cross-sell', vistas: 380, conversiones: 72, tasa: 18.9, ingresos: 8640, aov: 120 },
  { tipo: 'Bundle', vistas: 320, conversiones: 64, tasa: 20.0, ingresos: 12800, aov: 200 },
  { tipo: 'Downsell', vistas: 150, conversiones: 25, tasa: 16.7, ingresos: 2000, aov: 80 }
];

const topOffersByRevenue = [
  { pos: 1, nombre: 'Membresía Premium Anual', ingresos: 8500, conversiones: 42, badge: 'Top Performer' },
  { pos: 2, nombre: 'Bundle Nutrición + Entrenamiento', ingresos: 6200, conversiones: 31, badge: 'Top Performer' },
  { pos: 3, nombre: 'Plan Nutrición Personalizado', ingresos: 4800, conversiones: 48, badge: 'Top Performer' },
  { pos: 4, nombre: 'Sesiones 1-on-1 (Pack 10)', ingresos: 3900, conversiones: 26, badge: '' },
  { pos: 5, nombre: 'Upgrade a Elite', ingresos: 3200, conversiones: 16, badge: '' }
];

const topOffersByConversion = [
  { pos: 1, nombre: 'Trial Extendido (7 días extra)', tasa: 34.5, conversiones: 89, badge: 'Alta Conversión' },
  { pos: 2, nombre: 'Descuento 20% Renovación Inmediata', tasa: 28.2, conversiones: 67, badge: 'Alta Conversión' },
  { pos: 3, nombre: 'Pack Suplementos Básicos', tasa: 25.8, conversiones: 52, badge: 'Alta Conversión' },
  { pos: 4, nombre: 'Membresía Premium Anual', tasa: 23.5, conversiones: 42, badge: '' },
  { pos: 5, nombre: 'Guía de Recetas Premium', tasa: 22.1, conversiones: 78, badge: '' }
];

const worstOffers = [
  { nombre: 'Plan Elite Trimestral', tasa: 4.2, razon: 'Precio muy alto', sugerencia: 'Ofrecer pago fraccionado' },
  { nombre: 'Consulta Nutricional Avanzada', tasa: 6.8, razon: 'Mensaje poco claro', sugerencia: 'Destacar beneficios específicos' },
  { nombre: 'Bundle Completo Premium', tasa: 8.1, razon: 'Mal timing', sugerencia: 'Mostrar después de 2 semanas de uso' }
];

const segmentData = {
  membresia: [
    { nombre: 'Básica', tasa: 14.2, ingresos: 8500, clientes: 450 },
    { nombre: 'Premium', tasa: 28.5, ingresos: 18200, clientes: 280 },
    { nombre: 'Elite', tasa: 35.8, ingresos: 12400, clientes: 120 }
  ],
  canal: [
    { nombre: 'Orgánico', tasa: 22.5, ingresos: 15200, clientes: 320 },
    { nombre: 'Publicidad', tasa: 16.8, ingresos: 12800, clientes: 380 },
    { nombre: 'Referido', tasa: 31.2, ingresos: 10500, clientes: 150 }
  ],
  actividad: [
    { nombre: 'Alta', tasa: 29.4, ingresos: 18900, clientes: 280 },
    { nombre: 'Media', tasa: 18.7, ingresos: 14200, clientes: 350 },
    { nombre: 'Baja', tasa: 11.2, ingresos: 6400, clientes: 220 }
  ]
};

const touchpointData = [
  { canal: 'Checkout', ofertas: 450, tasa: 24.5, ingresos: 16200 },
  { canal: 'Post-compra', ofertas: 380, tasa: 19.2, ingresos: 12800 },
  { canal: 'Email post-compra', ofertas: 320, tasa: 15.8, ingresos: 8400 },
  { canal: 'Dashboard', ofertas: 280, tasa: 12.4, ingresos: 6200 },
  { canal: 'Pop-up en app', ofertas: 150, tasa: 9.8, ingresos: 2800 }
];

const dayOfWeekData = [
  { dia: 'Lun', tasa: 16.5 },
  { dia: 'Mar', tasa: 21.2 },
  { dia: 'Mié', tasa: 22.8 },
  { dia: 'Jue', tasa: 19.4 },
  { dia: 'Vie', tasa: 17.8 },
  { dia: 'Sáb', tasa: 14.2 },
  { dia: 'Dom', tasa: 12.8 }
];

const abTests = [
  { nombre: 'Botón CTA: "Mejorar Plan" vs "Upgrade Ahora"', varianteA: 'Mejorar Plan', varianteB: 'Upgrade Ahora', metrica: 'Conversión', ganador: 'B', mejora: 18.5, pValue: 0.023 },
  { nombre: 'Descuento: 15% vs 20%', varianteA: '15%', varianteB: '20%', metrica: 'Ingresos', ganador: 'A', mejora: 12.3, pValue: 0.041 },
  { nombre: 'Timing: Inmediato vs Día 3', varianteA: 'Inmediato', varianteB: 'Día 3', metrica: 'Conversión', ganador: 'B', mejora: 24.7, pValue: 0.008 }
];

const productDistribution = [
  { nombre: 'Membresía Premium', valor: 40, color: '#10b981' },
  { nombre: 'Plan Nutrición', valor: 25, color: '#3b82f6' },
  { nombre: 'Sesiones 1-on-1', valor: 20, color: '#f59e0b' },
  { nombre: 'Bundle Completo', valor: 15, color: '#8b5cf6' }
];

const discountDistribution = [
  { nombre: 'Sin descuento', valor: 30, color: '#10b981' },
  { nombre: '10% descuento', valor: 25, color: '#3b82f6' },
  { nombre: '20% descuento', valor: 35, color: '#f59e0b' },
  { nombre: '30%+ descuento', valor: 10, color: '#ef4444' }
];

const recommendations = [
  { texto: 'Aumenta precio de "Trial Extendido", tiene alta conversión (34.5%)', tipo: 'precio', prioridad: 'alta' },
  { texto: 'Prueba mostrar "Bundle Nutrición" en checkout, no solo email', tipo: 'canal', prioridad: 'alta' },
  { texto: 'Segmento Premium tiene potencial (28.5%), crea más ofertas exclusivas', tipo: 'segmento', prioridad: 'media' },
  { texto: 'Martes y miércoles son mejores días (21-23%), enfoca campañas allí', tipo: 'timing', prioridad: 'media' },
  { texto: 'Ofrece "Plan Nutrición" con 15% descuento mejora conversión estimada en 12%', tipo: 'descuento', prioridad: 'alta' }
];

const ConversionReportPage: React.FC = () => {
  const [periodo, setPeriodo] = useState('mes');
  const [segmentTab, setSegmentTab] = useState<'membresia' | 'canal' | 'actividad'>('membresia');

  const monthlyData = generateMonthlyData();
  const currentMonth = monthlyData[monthlyData.length - 1];
  const previousMonth = monthlyData[monthlyData.length - 2];

  // KPIs principales
  const kpis = {
    tasaConversion: {
      actual: 18.5,
      anterior: 16.8,
      cambio: ((18.5 - 16.8) / 16.8 * 100)
    },
    ingresos: {
      actual: 45230,
      anterior: 38450,
      cambio: ((45230 - 38450) / 38450 * 100)
    },
    aov: {
      conUpsell: 185,
      sinUpsell: 132,
      incremento: ((185 - 132) / 132 * 100)
    },
    ofertasPresentadas: {
      actual: 1580,
      anterior: 1420,
      cambio: ((1580 - 1420) / 1420 * 100)
    },
    conversiones: {
      actual: 292,
      anterior: 238,
      cambio: ((292 - 238) / 238 * 100)
    },
    roi: {
      valor: 4.2,
      descripcion: 'Por cada €1 invertido'
    }
  };

  const KPICard = ({ titulo, valor, subvalor, cambio, icon: Icon, prefix = '', suffix = '' }: any) => {
    const esPositivo = cambio >= 0;
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-emerald-500"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-600">{titulo}</h3>
          <Icon className="w-5 h-5 text-emerald-600" />
        </div>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-3xl font-bold text-gray-900">
              {prefix}{valor.toLocaleString()}{suffix}
            </p>
            {subvalor && <p className="text-sm text-gray-500 mt-1">{subvalor}</p>}
          </div>
          <div className={`flex items-center gap-1 ${esPositivo ? 'text-green-600' : 'text-red-600'}`}>
            {esPositivo ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span className="text-sm font-semibold">{Math.abs(cambio).toFixed(1)}%</span>
          </div>
        </div>
        <div className="mt-4 h-12">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData.slice(-6)}>
              <Line type="monotone" dataKey="tasaConversion" stroke="#10b981" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-xl">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent">
              Análisis de Conversiones de Upsells
            </h1>
            <p className="text-gray-600 mt-1">Mide y optimiza el rendimiento de tus ofertas</p>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-6 flex-wrap">
          <div className="flex items-center gap-2 bg-white rounded-lg shadow px-4 py-2">
            <Calendar className="w-4 h-4 text-gray-600" />
            <select
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
              className="border-none focus:outline-none text-sm font-medium"
            >
              <option value="mes">Este mes</option>
              <option value="3meses">Últimos 3 meses</option>
              <option value="6meses">Últimos 6 meses</option>
              <option value="12meses">Últimos 12 meses</option>
              <option value="personalizado">Personalizado</option>
            </select>
          </div>
          <button className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition shadow">
            <Download className="w-4 h-4" />
            Exportar Reporte
          </button>
          <button className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition shadow">
            <Settings className="w-4 h-4" />
            Configurar Objetivos
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow">
            <Send className="w-4 h-4" />
            Enviar Reporte
          </button>
        </div>
      </motion.div>

      {/* KPIs Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <KPICard
          titulo="Tasa de Conversión Global"
          valor={kpis.tasaConversion.actual}
          cambio={kpis.tasaConversion.cambio}
          icon={Target}
          suffix="%"
        />
        <KPICard
          titulo="Ingresos por Upsells"
          valor={kpis.ingresos.actual}
          subvalor="32% del total de ingresos"
          cambio={kpis.ingresos.cambio}
          icon={DollarSign}
          prefix="€"
        />
        <KPICard
          titulo="AOV con Upsell"
          valor={kpis.aov.conUpsell}
          subvalor={`vs €${kpis.aov.sinUpsell} sin upsells (+${kpis.aov.incremento.toFixed(0)}%)`}
          cambio={15.2}
          icon={ShoppingCart}
          prefix="€"
        />
        <KPICard
          titulo="Ofertas Presentadas"
          valor={kpis.ofertasPresentadas.actual}
          cambio={kpis.ofertasPresentadas.cambio}
          icon={Package}
        />
        <KPICard
          titulo="Conversiones Totales"
          valor={kpis.conversiones.actual}
          cambio={kpis.conversiones.cambio}
          icon={Users}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-emerald-500 to-amber-500 rounded-xl shadow-lg p-6 text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium opacity-90">ROI de Upsells</h3>
            <Zap className="w-5 h-5" />
          </div>
          <p className="text-4xl font-bold">{kpis.roi.valor}x</p>
          <p className="text-sm opacity-90 mt-2">{kpis.roi.descripcion}</p>
          <div className="mt-4 bg-white/20 rounded-lg p-3">
            <p className="text-xs">Retorno excelente sobre inversión</p>
          </div>
        </motion.div>
      </div>

      {/* Gráfico Principal de Conversiones */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6 mb-8"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-6">Evolución de Conversiones (Últimos 12 meses)</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis yAxisId="left" stroke="#10b981" />
            <YAxis yAxisId="right" orientation="right" stroke="#3b82f6" />
            <Tooltip
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
            />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="tasaConversion" stroke="#10b981" strokeWidth={3} name="Tasa de Conversión (%)" dot={{ r: 4 }} />
            <Line yAxisId="right" type="monotone" dataKey="ingresos" stroke="#3b82f6" strokeWidth={3} name="Ingresos (€)" dot={{ r: 4 }} />
            <Line yAxisId="right" type="monotone" dataKey="ofertasPresentadas" stroke="#f59e0b" strokeWidth={2} name="Ofertas Presentadas" dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Funnel de Conversión */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6 mb-8"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-6">Funnel de Conversión</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={funnelData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={150} />
                <Tooltip />
                <Bar dataKey="value" fill="#10b981">
                  {funnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4">
            {funnelData.map((step, idx) => (
              <div key={idx} className="border-l-4 pl-4" style={{ borderColor: step.color }}>
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-gray-900">{step.name}</h4>
                  <span className="text-2xl font-bold text-gray-900">{step.porcentaje}%</span>
                </div>
                <p className="text-sm text-gray-600">{step.value.toLocaleString()} usuarios</p>
                {idx > 0 && (
                  <p className="text-xs text-red-600 mt-1">
                    Drop-off: {((funnelData[idx-1].value - step.value) / funnelData[idx-1].value * 100).toFixed(1)}%
                  </p>
                )}
                {idx === 2 && (
                  <div className="mt-2 bg-amber-50 border border-amber-200 rounded p-2">
                    <p className="text-xs text-amber-800"><strong>⚠️ Mayor drop-off aquí:</strong> Optimiza visibilidad de la oferta</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Análisis por Tipo de Oferta */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6 mb-8"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-6">Análisis por Tipo de Oferta</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Tipo</th>
                  <th className="text-right py-3 px-2 text-sm font-semibold text-gray-700">Vistas</th>
                  <th className="text-right py-3 px-2 text-sm font-semibold text-gray-700">Conv.</th>
                  <th className="text-right py-3 px-2 text-sm font-semibold text-gray-700">Tasa</th>
                  <th className="text-right py-3 px-2 text-sm font-semibold text-gray-700">Ingresos</th>
                </tr>
              </thead>
              <tbody>
                {offerTypeData.map((offer, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-2 font-medium">{offer.tipo}</td>
                    <td className="py-3 px-2 text-right">{offer.vistas}</td>
                    <td className="py-3 px-2 text-right">{offer.conversiones}</td>
                    <td className="py-3 px-2 text-right">
                      <span className="font-semibold text-emerald-600">{offer.tasa}%</span>
                    </td>
                    <td className="py-3 px-2 text-right font-semibold">€{offer.ingresos.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={offerTypeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="tipo" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="tasa" fill="#10b981" name="Tasa de Conversión (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>

      {/* Top Ofertas */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl font-bold text-gray-900">Top Ofertas por Ingresos</h2>
          </div>
          <div className="space-y-3">
            {topOffersByRevenue.map((offer) => (
              <div key={offer.pos} className="flex items-center gap-3 p-3 bg-gradient-to-r from-emerald-50 to-amber-50 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-full flex items-center justify-center text-white font-bold">
                  {offer.pos}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm">{offer.nombre}</p>
                  <p className="text-xs text-gray-600">{offer.conversiones} conversiones</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-emerald-600">€{offer.ingresos.toLocaleString()}</p>
                  {offer.badge && (
                    <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">{offer.badge}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-emerald-500" />
            <h2 className="text-xl font-bold text-gray-900">Top Ofertas por Conversión</h2>
          </div>
          <div className="space-y-3">
            {topOffersByConversion.map((offer) => (
              <div key={offer.pos} className="flex items-center gap-3 p-3 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  {offer.pos}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm">{offer.nombre}</p>
                  <p className="text-xs text-gray-600">{offer.conversiones} conversiones</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-emerald-600">{offer.tasa}%</p>
                  {offer.badge && (
                    <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">{offer.badge}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Peores Ofertas - Oportunidades de Mejora */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl shadow-lg p-6 mb-8 border border-red-200"
      >
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <h2 className="text-xl font-bold text-gray-900">Oportunidades de Mejora</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {worstOffers.map((offer, idx) => (
            <div key={idx} className="bg-white rounded-lg p-4 border-l-4 border-red-500">
              <h3 className="font-semibold text-gray-900 mb-2">{offer.nombre}</h3>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl font-bold text-red-600">{offer.tasa}%</span>
                <span className="text-xs text-gray-600">tasa conversión</span>
              </div>
              <div className="bg-red-50 rounded p-2 mb-2">
                <p className="text-xs text-red-800"><strong>Razón:</strong> {offer.razon}</p>
              </div>
              <div className="bg-emerald-50 rounded p-2 mb-3">
                <p className="text-xs text-emerald-800"><strong>Sugerencia:</strong> {offer.sugerencia}</p>
              </div>
              <button className="w-full bg-emerald-600 text-white text-sm py-2 rounded-lg hover:bg-emerald-700 transition">
                Optimizar Oferta
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Análisis por Segmento */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6 mb-8"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-6">Análisis por Segmento de Clientes</h2>
        <div className="flex gap-4 mb-6 border-b">
          {(['membresia', 'canal', 'actividad'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setSegmentTab(tab)}
              className={`px-4 py-2 font-medium transition ${
                segmentTab === tab
                  ? 'text-emerald-600 border-b-2 border-emerald-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab === 'membresia' ? 'Tipo de Membresía' : tab === 'canal' ? 'Canal de Adquisición' : 'Nivel de Actividad'}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={segmentData[segmentTab]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nombre" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="tasa" fill="#10b981" name="Tasa de Conversión (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4">
            {segmentData[segmentTab].map((seg, idx) => (
              <div key={idx} className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg p-4">
                <h3 className="font-bold text-gray-900 mb-2">{seg.nombre}</h3>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Tasa Conv.</p>
                    <p className="font-bold text-emerald-600 text-lg">{seg.tasa}%</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Ingresos</p>
                    <p className="font-bold text-gray-900">€{seg.ingresos.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Clientes</p>
                    <p className="font-bold text-gray-900">{seg.clientes}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-900">
                <strong>💡 Insight:</strong> {
                  segmentTab === 'membresia' ? 'Segmento Premium convierte 2x mejor que Básica' :
                  segmentTab === 'canal' ? 'Clientes referidos tienen mayor tasa de conversión' :
                  'Usuarios con alta actividad convierten 2.6x más'
                }
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Análisis por Punto de Contacto */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6 mb-8"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-6">Análisis por Punto de Contacto</h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={touchpointData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="canal" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="tasa" fill="#10b981" name="Tasa de Conversión (%)" />
            <Bar yAxisId="right" dataKey="ingresos" fill="#3b82f6" name="Ingresos (€)" />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
          <p className="text-emerald-900"><strong>🎯 Canal más efectivo:</strong> Checkout con 24.5% de conversión y €16,200 en ingresos</p>
        </div>
      </motion.div>

      {/* Análisis Temporal */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl font-bold text-gray-900">Conversión por Día de la Semana</h2>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dayOfWeekData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dia" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="tasa" fill="#10b981" name="Tasa (%)" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-sm text-amber-900"><strong>⭐ Mejores días:</strong> Martes y Miércoles (21-23%)</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Valor Incremental</h2>
          </div>
          <div className="h-64 flex flex-col justify-center space-y-6">
            <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg p-6">
              <p className="text-sm text-gray-600 mb-2">Ingresos con upsells</p>
              <p className="text-4xl font-bold text-emerald-600">€45,000</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-sm text-gray-600 mb-2">Ingresos sin upsells (estimado)</p>
              <p className="text-4xl font-bold text-gray-600">€32,000</p>
            </div>
            <div className="bg-gradient-to-r from-amber-500 to-emerald-500 text-white rounded-lg p-6">
              <p className="text-sm opacity-90 mb-2">Valor Incremental</p>
              <p className="text-4xl font-bold">+€13,000</p>
              <p className="text-xl font-semibold mt-1">+40.6%</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Test A/B Results */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6 mb-8"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-6">Resultados de Tests A/B</h2>
        <div className="space-y-4">
          {abTests.map((test, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">{test.nombre}</h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div className={`p-3 rounded ${test.ganador === 'A' ? 'bg-emerald-100 border-2 border-emerald-500' : 'bg-gray-50'}`}>
                  <p className="text-xs text-gray-600 mb-1">Variante A</p>
                  <p className="font-semibold">{test.varianteA}</p>
                  {test.ganador === 'A' && <span className="text-xs bg-emerald-600 text-white px-2 py-1 rounded-full mt-2 inline-block">Ganador</span>}
                </div>
                <div className={`p-3 rounded ${test.ganador === 'B' ? 'bg-emerald-100 border-2 border-emerald-500' : 'bg-gray-50'}`}>
                  <p className="text-xs text-gray-600 mb-1">Variante B</p>
                  <p className="font-semibold">{test.varianteB}</p>
                  {test.ganador === 'B' && <span className="text-xs bg-emerald-600 text-white px-2 py-1 rounded-full mt-2 inline-block">Ganador</span>}
                </div>
                <div className="p-3 bg-blue-50 rounded">
                  <p className="text-xs text-gray-600 mb-1">Mejora</p>
                  <p className="text-2xl font-bold text-blue-600">+{test.mejora}%</p>
                  <p className="text-xs text-gray-600 mt-1">{test.metrica}</p>
                </div>
                <div className="flex items-center">
                  <button className="w-full bg-emerald-600 text-white text-sm py-2 px-4 rounded-lg hover:bg-emerald-700 transition">
                    Aplicar a Producción
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Significancia estadística: p-value = {test.pValue}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Distribución (Pie Charts) */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">Distribución por Producto</h2>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPie>
              <Pie
                data={productDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.nombre} (${entry.valor}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="valor"
              >
                {productDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPie>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">Distribución por Descuento</h2>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPie>
              <Pie
                data={discountDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.nombre} (${entry.valor}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="valor"
              >
                {discountDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPie>
          </ResponsiveContainer>
          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-sm text-amber-900"><strong>📊 Análisis:</strong> 35% convierte con 20% descuento - óptimo para maximizar conversión vs margen</p>
          </div>
        </motion.div>
      </div>

      {/* Objetivos vs Real */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6 mb-8"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-6">Objetivos vs Real</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg p-6">
            <p className="text-sm text-gray-600 mb-2">Tasa de Conversión</p>
            <div className="flex items-end gap-3 mb-3">
              <span className="text-4xl font-bold text-gray-900">18.5%</span>
              <span className="text-gray-600 mb-1">/ 20%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div className="bg-gradient-to-r from-emerald-500 to-blue-500 h-3 rounded-full" style={{ width: '92.5%' }}></div>
            </div>
            <p className="text-sm font-semibold text-emerald-600">92.5% del objetivo</p>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-6">
            <p className="text-sm text-gray-600 mb-2">Ingresos Mensuales</p>
            <div className="flex items-end gap-3 mb-3">
              <span className="text-4xl font-bold text-gray-900">€45K</span>
              <span className="text-gray-600 mb-1">/ €50K</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-3 rounded-full" style={{ width: '90%' }}></div>
            </div>
            <p className="text-sm font-semibold text-amber-600">90% del objetivo</p>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6">
            <p className="text-sm text-gray-600 mb-2">Conversiones Totales</p>
            <div className="flex items-end gap-3 mb-3">
              <span className="text-4xl font-bold text-gray-900">292</span>
              <span className="text-gray-600 mb-1">/ 250</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full" style={{ width: '100%' }}></div>
            </div>
            <p className="text-sm font-semibold text-green-600">🎉 116.8% - ¡Objetivo superado!</p>
          </div>
        </div>
      </motion.div>

      {/* Recomendaciones IA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl shadow-lg p-6 mb-8 border border-purple-200"
      >
        <div className="flex items-center gap-2 mb-6">
          <Lightbulb className="w-6 h-6 text-purple-600" />
          <h2 className="text-xl font-bold text-gray-900">Insights y Recomendaciones IA</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {recommendations.map((rec, idx) => (
            <div key={idx} className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
              <div className="flex items-start justify-between mb-3">
                <p className="text-sm text-gray-900 flex-1">{rec.texto}</p>
                <span className={`text-xs px-2 py-1 rounded-full ml-2 ${
                  rec.prioridad === 'alta' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {rec.prioridad === 'alta' ? 'Alta' : 'Media'}
                </span>
              </div>
              <button className="w-full bg-purple-600 text-white text-sm py-2 rounded-lg hover:bg-purple-700 transition">
                Implementar Acción
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Benchmarks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6 mb-8"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-6">Comparación con Industria (Benchmarks)</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-emerald-50 rounded-lg p-6 border-l-4 border-emerald-500">
            <h3 className="font-semibold text-gray-900 mb-4">Tasa de Conversión</h3>
            <div className="flex items-end gap-4 mb-3">
              <div>
                <p className="text-xs text-gray-600">Promedio Industria</p>
                <p className="text-3xl font-bold text-gray-600">15-20%</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Tu Tasa</p>
                <p className="text-4xl font-bold text-emerald-600">18.5%</p>
              </div>
            </div>
            <span className="bg-emerald-600 text-white text-xs px-3 py-1 rounded-full">✓ Por encima del promedio</span>
          </div>

          <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
            <h3 className="font-semibold text-gray-900 mb-4">Incremento AOV</h3>
            <div className="flex items-end gap-4 mb-3">
              <div>
                <p className="text-xs text-gray-600">Promedio Industria</p>
                <p className="text-3xl font-bold text-gray-600">25-35%</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Tu Incremento</p>
                <p className="text-4xl font-bold text-blue-600">32%</p>
              </div>
            </div>
            <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">✓ En promedio</span>
          </div>
        </div>
      </motion.div>

      {/* Predicción y Proyección */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl shadow-lg p-6 border border-indigo-200"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-6">Proyección de Ingresos (Próximos 6 Meses)</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600 mb-2">Escenario Pesimista</p>
            <p className="text-3xl font-bold text-red-600">€240K</p>
            <p className="text-xs text-gray-500 mt-1">-10% tasa actual</p>
          </div>
          <div className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-lg p-4 text-center">
            <p className="text-sm opacity-90 mb-2">Escenario Realista</p>
            <p className="text-4xl font-bold">€270K</p>
            <p className="text-xs opacity-90 mt-1">Manteniendo tasa actual</p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600 mb-2">Escenario Optimista</p>
            <p className="text-3xl font-bold text-emerald-600">€310K</p>
            <p className="text-xs text-gray-500 mt-1">+15% mejora</p>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4">
          <p className="text-center text-gray-900">
            <strong>📈 Proyección:</strong> Si mantienes la tasa actual de 18.5%, generarás aproximadamente <strong className="text-emerald-600">€270,000</strong> en los próximos 6 meses
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ConversionReportPage;
