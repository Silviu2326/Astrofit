import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { History, TrendingUp, Award, Calendar, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import GraficoEvolucion from './components/GraficoEvolucion';
import AnalisisTendencias from './components/AnalisisTendencias';
import PrediccionRendimiento from './components/PrediccionRendimiento';
import DetectorPlateau from './components/DetectorPlateau';
import CorrelacionesTests from './components/CorrelacionesTests';
import AnalisisEstacionalidad from './components/AnalisisEstacionalidad';
import ComparacionNormativas from './components/ComparacionNormativas';
import AlertasRegresiones from './components/AlertasRegresiones';
import ReportesProgreso from './components/ReportesProgreso';
import { useResultadosHistoricos } from './resultadosHistoricosApi';

const ResultadosHistoricosPage: React.FC = () => {
  const [selectedAthlete, setSelectedAthlete] = useState<string>('atleta1');
  const [selectedTest, setSelectedTest] = useState<string>('saltoVertical');

  const { data: resultados, isLoading, error } = useResultadosHistoricos(selectedAthlete, selectedTest);

  if (isLoading) return <div className="text-center py-4">Cargando resultados...</div>;
  if (error) return <div className="text-center py-4 text-red-500">Error al cargar los resultados: {error.message}</div>;

  const athleteOptions = [
    { value: 'atleta1', label: 'Atleta 1' },
    { value: 'atleta2', label: 'Atleta 2' },
  ];

  const testOptions = [
    { value: 'saltoVertical', label: 'Salto Vertical' },
    { value: 'velocidad100m', label: 'Velocidad 100m' },
  ];

  const bestMark = resultados?.reduce((prev, current) => (prev.value > current.value ? prev : current), resultados[0]);

  const calculateImprovement = () => {
    if (!resultados || resultados.length < 2) return 0;
    const first = resultados[0].value;
    const last = resultados[resultados.length - 1].value;
    return ((last - first) / first * 100).toFixed(1);
  };

  const improvement = calculateImprovement();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
      >
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative z-10">
          {/* Título con icono animado */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <History className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Resultados <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Históricos</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
            Analiza la <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">evolución del rendimiento</span> a través del tiempo
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Activity className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Evolución en Tiempo Real</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <TrendingUp className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">Análisis de Tendencias</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filtros estilizados */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 mb-8 border border-white/50 relative overflow-hidden"
      >
        {/* Decoración de fondo */}
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-gray-900">Filtros de Búsqueda</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label htmlFor="athlete-select" className="text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Seleccionar Atleta</label>
              <select
                id="athlete-select"
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm font-medium text-gray-900"
                value={selectedAthlete}
                onChange={(e) => setSelectedAthlete(e.target.value)}
              >
                {athleteOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="test-select" className="text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Seleccionar Prueba</label>
              <select
                id="test-select"
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm font-medium text-gray-900"
                value={selectedTest}
                onChange={(e) => setSelectedTest(e.target.value)}
              >
                {testOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </motion.div>

      {resultados && resultados.length > 0 ? (
        <>
          {/* Card de Mejor Marca con Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 mb-8"
          >
            {/* Header con gradiente */}
            <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-6 relative overflow-hidden">
              {/* Pattern de fondo */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }}></div>
              </div>

              <div className="relative z-10 flex items-center justify-between">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                    <Award className="w-6 h-6" />
                  </div>
                  Mejor Marca Personal
                </h3>

                {/* Badge de mejora */}
                {parseFloat(improvement) !== 0 && (
                  <div className={`flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/20`}>
                    {parseFloat(improvement) > 0 ? (
                      <>
                        <ArrowUpRight className="w-5 h-5 text-white" />
                        <span className="text-sm font-bold text-white">+{improvement}%</span>
                      </>
                    ) : (
                      <>
                        <ArrowDownRight className="w-5 h-5 text-white" />
                        <span className="text-sm font-bold text-white">{improvement}%</span>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Body */}
            <div className="p-6">
              <div className="flex items-center gap-6">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-600 mb-1 uppercase tracking-wide">Marca Máxima</p>
                  <p className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
                    {bestMark?.value} <span className="text-3xl">{selectedTest === 'saltoVertical' ? 'cm' : 's'}</span>
                  </p>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-600 mb-1 uppercase tracking-wide">Fecha de Registro</p>
                  <p className="text-2xl font-bold text-gray-900">{bestMark?.date}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Gráfico de Evolución */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 mb-8 border border-white/50 relative overflow-hidden"
          >
            {/* Decoración de fondo */}
            <div className="absolute -right-12 -top-12 w-48 h-48 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-6 h-6 text-indigo-600" />
                <h3 className="text-xl font-bold text-gray-900">Evolución del Rendimiento</h3>
              </div>
              <GraficoEvolucion data={resultados} testUnit={selectedTest === 'saltoVertical' ? 'cm' : 's'} />
            </div>
          </motion.div>

          {/* Grid de análisis */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {[
              { component: <AnalisisTendencias />, delay: 0.5 },
              { component: <PrediccionRendimiento />, delay: 0.6 },
              { component: <DetectorPlateau />, delay: 0.7 },
              { component: <CorrelacionesTests />, delay: 0.8 },
              { component: <AnalisisEstacionalidad />, delay: 0.9 },
              { component: <ComparacionNormativas />, delay: 1.0 },
              { component: <AlertasRegresiones />, delay: 1.1 },
              { component: <ReportesProgreso />, delay: 1.2 }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: item.delay, duration: 0.5 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

                {/* Decoración de fondo */}
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-10"></div>

                <div className="relative z-10">
                  {item.component}
                </div>
              </motion.div>
            ))}
          </div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-12 text-center border border-white/50"
        >
          <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-xl font-semibold text-gray-600">No hay datos disponibles para la selección actual</p>
          <p className="text-sm text-gray-500 mt-2">Selecciona otro atleta o prueba para ver los resultados</p>
        </motion.div>
      )}
    </div>
  );
};

export default ResultadosHistoricosPage;
