import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, BarChart3, AreaChart, Download, ZoomIn } from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart as RechartsArea,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

// Datos mockeados con comparativa
const datosIngresos = [
  { dia: '1 Ene', actual: 2800, anterior: 2200, pedidos: 42, ticket: 67 },
  { dia: '2 Ene', actual: 3200, anterior: 2500, pedidos: 48, ticket: 67 },
  { dia: '3 Ene', actual: 2900, anterior: 2300, pedidos: 45, ticket: 64 },
  { dia: '4 Ene', actual: 3500, anterior: 2800, pedidos: 52, ticket: 67 },
  { dia: '5 Ene', actual: 4200, anterior: 3200, pedidos: 61, ticket: 69 },
  { dia: '6 Ene', actual: 3800, anterior: 3000, pedidos: 55, ticket: 69 },
  { dia: '7 Ene', actual: 3600, anterior: 2900, pedidos: 53, ticket: 68 },
  { dia: '8 Ene', actual: 4500, anterior: 3500, pedidos: 65, ticket: 69 },
  { dia: '9 Ene', actual: 4800, anterior: 3800, pedidos: 68, ticket: 71 },
  { dia: '10 Ene', actual: 4200, anterior: 3400, pedidos: 60, ticket: 70 },
  { dia: '11 Ene', actual: 3900, anterior: 3100, pedidos: 57, ticket: 68 },
  { dia: '12 Ene', actual: 4600, anterior: 3600, pedidos: 66, ticket: 70 },
  { dia: '13 Ene', actual: 5200, anterior: 4000, pedidos: 72, ticket: 72 },
  { dia: '14 Ene', actual: 4900, anterior: 3900, pedidos: 69, ticket: 71 },
  { dia: '15 Ene', actual: 4400, anterior: 3500, pedidos: 63, ticket: 70 },
];

type TipoGrafico = 'line' | 'bar' | 'area';

const GraficoIngresos: React.FC = () => {
  const [tipoGrafico, setTipoGrafico] = useState<TipoGrafico>('line');
  const [mostrarComparativa, setMostrarComparativa] = useState(true);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-4 border border-gray-200">
          <p className="font-bold text-gray-900 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 mb-1">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              ></div>
              <span className="text-sm font-semibold text-gray-700">
                {entry.name}: <span className="text-gray-900">${entry.value.toLocaleString()}</span>
              </span>
            </div>
          ))}
          {active && payload[0]?.payload.pedidos && (
            <>
              <div className="border-t border-gray-200 mt-2 pt-2">
                <p className="text-xs text-gray-600">Pedidos: <span className="font-bold text-gray-900">{payload[0].payload.pedidos}</span></p>
                <p className="text-xs text-gray-600">Ticket promedio: <span className="font-bold text-gray-900">${payload[0].payload.ticket}</span></p>
              </div>
            </>
          )}
        </div>
      );
    }
    return null;
  };

  const renderGrafico = () => {
    const commonProps = {
      data: datosIngresos,
      margin: { top: 10, right: 30, left: 0, bottom: 0 }
    };

    const gradientDefs = (
      <defs>
        <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
          <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
        </linearGradient>
        <linearGradient id="colorAnterior" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.6}/>
          <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.05}/>
        </linearGradient>
      </defs>
    );

    switch (tipoGrafico) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            {gradientDefs}
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="dia" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="actual"
              name="Período Actual"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ fill: '#10b981', r: 5 }}
              activeDot={{ r: 7 }}
            />
            {mostrarComparativa && (
              <Line
                type="monotone"
                dataKey="anterior"
                name="Período Anterior"
                stroke="#06b6d4"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: '#06b6d4', r: 4 }}
              />
            )}
          </LineChart>
        );

      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="dia" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="actual" name="Período Actual" fill="#10b981" radius={[8, 8, 0, 0]} />
            {mostrarComparativa && (
              <Bar dataKey="anterior" name="Período Anterior" fill="#06b6d4" radius={[8, 8, 0, 0]} />
            )}
          </BarChart>
        );

      case 'area':
        return (
          <RechartsArea {...commonProps}>
            {gradientDefs}
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="dia" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area
              type="monotone"
              dataKey="actual"
              name="Período Actual"
              stroke="#10b981"
              strokeWidth={3}
              fill="url(#colorActual)"
            />
            {mostrarComparativa && (
              <Area
                type="monotone"
                dataKey="anterior"
                name="Período Anterior"
                stroke="#06b6d4"
                strokeWidth={2}
                strokeDasharray="5 5"
                fill="url(#colorAnterior)"
              />
            )}
          </RechartsArea>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 mb-8"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 via-teal-500 to-cyan-500 p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <TrendingUp className="w-6 h-6" />
              </div>
              Evolución de Ingresos
            </h3>
            <p className="text-emerald-100 text-sm mt-2">Análisis temporal detallado con comparativa</p>
          </div>

          {/* Controles */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Selector de tipo de gráfico */}
            <div className="flex gap-2 bg-white/10 backdrop-blur-md rounded-xl p-1 border border-white/20">
              <button
                onClick={() => setTipoGrafico('line')}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  tipoGrafico === 'line' ? 'bg-white text-green-600 shadow-lg' : 'text-white hover:bg-white/10'
                }`}
                title="Líneas"
              >
                <TrendingUp className="w-5 h-5" />
              </button>
              <button
                onClick={() => setTipoGrafico('bar')}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  tipoGrafico === 'bar' ? 'bg-white text-green-600 shadow-lg' : 'text-white hover:bg-white/10'
                }`}
                title="Barras"
              >
                <BarChart3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setTipoGrafico('area')}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  tipoGrafico === 'area' ? 'bg-white text-green-600 shadow-lg' : 'text-white hover:bg-white/10'
                }`}
                title="Área"
              >
                <AreaChart className="w-5 h-5" />
              </button>
            </div>

            {/* Toggle comparativa */}
            <button
              onClick={() => setMostrarComparativa(!mostrarComparativa)}
              className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 ${
                mostrarComparativa
                  ? 'bg-white text-green-600 shadow-lg'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Comparar
            </button>

            {/* Exportar */}
            <button className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl text-white font-semibold text-sm hover:bg-white/20 transition-all duration-300 flex items-center gap-2 border border-white/20">
              <Download className="w-4 h-4" />
              Exportar
            </button>
          </div>
        </div>
      </div>

      {/* Gráfico */}
      <div className="p-6">
        <ResponsiveContainer width="100%" height={400}>
          {renderGrafico()}
        </ResponsiveContainer>

        {/* Estadísticas del gráfico */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200">
            <p className="text-xs font-bold text-green-700 uppercase tracking-wide mb-1">Total Período</p>
            <p className="text-2xl font-bold text-green-900">$64,500</p>
          </div>
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-4 border border-teal-200">
            <p className="text-xs font-bold text-teal-700 uppercase tracking-wide mb-1">Promedio Diario</p>
            <p className="text-2xl font-bold text-teal-900">$4,300</p>
          </div>
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-4 border border-cyan-200">
            <p className="text-xs font-bold text-cyan-700 uppercase tracking-wide mb-1">Día Pico</p>
            <p className="text-2xl font-bold text-cyan-900">$5,200</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-200">
            <p className="text-xs font-bold text-blue-700 uppercase tracking-wide mb-1">Crecimiento</p>
            <p className="text-2xl font-bold text-blue-900">+24.5%</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GraficoIngresos;
