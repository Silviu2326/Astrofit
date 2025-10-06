import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Zap, PlayCircle, StopCircle, TrendingUp, Award, Users, BarChart3 } from 'lucide-react';
import { getPruebasFisicas, addPruebaFisica, getAtletas, PruebaFisica, Atleta } from '../pruebasFisicasApi';
import TablaPruebas from './components/TablaPruebas';
import ProtocolosCientificos from './components/ProtocolosCientificos';
import RegistroTiempoReal from './components/RegistroTiempoReal';
import AnalizadorBiomecanico from './components/AnalizadorBiomecanico';
import IntegracionDispositivos from './components/IntegracionDispositivos';
import CalculosPercentiles from './components/CalculosPercentiles';
import AlertasAnomalias from './components/AlertasAnomalias';
import ExportacionCientifica from './components/ExportacionCientifica';
import BaseDatosNormativa from './components/BaseDatosNormativa';

const PruebasFisicasPage: React.FC = () => {
  const [pruebas, setPruebas] = useState<PruebaFisica[]>([]);
  const [atletas, setAtletas] = useState<Atleta[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [newTestType, setNewTestType] = useState<'vertical jump' | 'velocidad' | 'resistencia' | '1RM' | 'VO2'>('vertical jump');
  const [newTestDate, setNewTestDate] = useState<string>('');
  const [selectedAthletes, setSelectedAthletes] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPruebas = await getPruebasFisicas();
        const fetchedAtletas = await getAtletas();
        setPruebas(fetchedPruebas);
        setAtletas(fetchedAtletas);
      } catch (err) {
        setError('Error al cargar los datos.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddPrueba = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestDate || selectedAthletes.length === 0) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const atletasConvocados = atletas.filter(atleta => selectedAthletes.includes(atleta.id));

    const nuevaPrueba = {
      tipo: newTestType,
      fecha: newTestDate,
      atletasParticipantes: atletasConvocados,
    };

    try {
      const addedPrueba = await addPruebaFisica(nuevaPrueba);
      setPruebas(prev => [...prev, addedPrueba]);
      setNewTestDate('');
      setSelectedAthletes([]);
      alert('Prueba programada con éxito!');
    } catch (err) {
      setError('Error al programar la prueba.');
      console.error(err);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-red-50/30 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-600 mx-auto mb-4"></div>
        <p className="text-lg font-semibold text-gray-700">Cargando pruebas físicas...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-red-50/30 flex items-center justify-center">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-red-200">
        <p className="text-red-600 font-semibold text-lg">Error: {error}</p>
      </div>
    </div>
  );

  const testTypes = [
    { value: 'vertical jump', label: 'Salto Vertical', icon: TrendingUp, color: 'from-orange-500 to-red-500' },
    { value: 'velocidad', label: 'Velocidad', icon: Zap, color: 'from-yellow-500 to-orange-500' },
    { value: 'resistencia', label: 'Resistencia', icon: Activity, color: 'from-blue-500 to-cyan-500' },
    { value: '1RM', label: '1RM (Fuerza)', icon: Award, color: 'from-purple-500 to-pink-500' },
    { value: 'VO2', label: 'VO2 Máx', icon: BarChart3, color: 'from-green-500 to-emerald-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-red-50/30 pb-12">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section - Deportivo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
                <Activity className="w-10 h-10 text-yellow-300 animate-pulse" />
                <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                Laboratorio de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Tests Físicos</span>
              </h1>
            </div>

            {/* Descripción */}
            <p className="text-xl md:text-2xl text-orange-100 max-w-3xl leading-relaxed">
              Análisis científico del <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">rendimiento deportivo</span>
            </p>

            {/* Indicadores pills */}
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                <Users className="w-5 h-5 text-green-300" />
                <span className="text-sm font-semibold text-white">{atletas.length} Atletas</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                <Activity className="w-5 h-5 text-blue-300" />
                <span className="text-sm font-semibold text-white">{pruebas.length} Pruebas</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Grid de Tipos de Pruebas - Cards Interactivas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Zap className="w-6 h-6 text-orange-600" />
            Tipos de Pruebas Disponibles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {testTypes.map((test, index) => (
              <motion.div
                key={test.value}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
                whileHover={{ scale: 1.05, y: -8 }}
                className={`relative overflow-hidden bg-gradient-to-br ${test.color} rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 text-white group border border-white/20`}
              >
                {/* Efecto hover */}
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

                {/* Decoración */}
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm mb-3 group-hover:scale-110 transition-transform duration-300">
                    <test.icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-lg">{test.label}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Formulario de Programación - Estilizado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 mb-8 border border-white/50 relative overflow-hidden"
        >
          {/* Decoración de fondo */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-orange-200 to-red-200 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <PlayCircle className="w-6 h-6 text-orange-600" />
              Programar Nueva Prueba
            </h2>

            <form onSubmit={handleAddPrueba} className="space-y-6">
              <div>
                <label htmlFor="testType" className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
                  Tipo de Prueba
                </label>
                <select
                  id="testType"
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm font-medium"
                  value={newTestType}
                  onChange={(e) => setNewTestType(e.target.value as any)}
                >
                  {testTypes.map(test => (
                    <option key={test.value} value={test.value}>{test.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="testDate" className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
                  Fecha
                </label>
                <input
                  type="date"
                  id="testDate"
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                  value={newTestDate}
                  onChange={(e) => setNewTestDate(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="athletes" className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
                  Atletas Convocados
                </label>
                <select
                  id="athletes"
                  multiple
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm h-40"
                  value={selectedAthletes}
                  onChange={(e) => {
                    const options = Array.from(e.target.selectedOptions);
                    setSelectedAthletes(options.map(option => option.value));
                  }}
                >
                  {atletas.map(atleta => (
                    <option key={atleta.id} value={atleta.id} className="py-2">{atleta.nombre}</option>
                  ))}
                </select>
                <p className="mt-2 text-xs text-gray-500">Mantén Ctrl/Cmd para seleccionar múltiples</p>
              </div>

              {/* Progress bar - Muestra progreso de selección */}
              {selectedAthletes.length > 0 && (
                <div className="bg-orange-50 rounded-2xl p-4 border border-orange-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-orange-700">Atletas Seleccionados</span>
                    <span className="text-sm font-bold text-orange-600">{selectedAthletes.length}/{atletas.length}</span>
                  </div>
                  <div className="w-full bg-orange-200 rounded-full h-3 overflow-hidden shadow-inner">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(selectedAthletes.length / atletas.length) * 100}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 rounded-full relative"
                    >
                      <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                    </motion.div>
                  </div>
                </div>
              )}

              {/* Botón con animación */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full relative overflow-hidden bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-4 text-white font-bold text-lg group border border-white/20"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="relative z-10 flex items-center justify-center gap-2">
                  <PlayCircle className="w-6 h-6" />
                  Programar Prueba
                </div>
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Laboratorio Científico Avanzado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 mb-8 border border-white/50 relative overflow-hidden"
        >
          {/* Decoración de fondo */}
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-orange-600" />
              Laboratorio Científico Avanzado
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ProtocolosCientificos />
              <RegistroTiempoReal />
              <AnalizadorBiomecanico />
              <IntegracionDispositivos />
              <CalculosPercentiles />
              <AlertasAnomalias />
              <ExportacionCientifica />
              <BaseDatosNormativa />
            </div>
          </div>
        </motion.div>

        {/* Tabla de Pruebas Programadas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 border border-white/50 relative overflow-hidden"
        >
          {/* Decoración de fondo */}
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Activity className="w-6 h-6 text-orange-600" />
              Pruebas Físicas Programadas
            </h2>
            <TablaPruebas pruebas={pruebas} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PruebasFisicasPage;
