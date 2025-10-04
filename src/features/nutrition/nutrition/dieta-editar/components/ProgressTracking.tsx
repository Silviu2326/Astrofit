import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Scale, Percent, Calendar as CalendarIcon, Activity, Target } from 'lucide-react';
import { ProgressEntry, dietaEditarApi } from '../dietaEditarApi';
import { v4 as uuidv4 } from 'uuid';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ProgressTrackingProps {
  clientId: string;
}

const ProgressTracking: React.FC<ProgressTrackingProps> = ({ clientId }) => {
  const [progressEntries, setProgressEntries] = useState<ProgressEntry[]>([]);
  const [newWeight, setNewWeight] = useState<string>('');
  const [newBodyFat, setNewBodyFat] = useState<string>('');
  const [newNote, setNewNote] = useState<string>('');

  useEffect(() => {
    const fetchProgress = async () => {
      const fetchedProgress = await dietaEditarApi.fetchProgressTracking(clientId);
      setProgressEntries(fetchedProgress);
    };
    fetchProgress();
  }, [clientId]);

  const handleAddProgress = async () => {
    if (newWeight.trim()) {
      const newEntry: Omit<ProgressEntry, 'id'> = {
        date: new Date().toISOString().split('T')[0],
        weight: parseFloat(newWeight),
        bodyFat: newBodyFat.trim() ? parseFloat(newBodyFat) : undefined,
        notes: newNote.trim(),
      };
      const addedEntry = await dietaEditarApi.addProgressEntry(clientId, newEntry);
      setProgressEntries([...progressEntries, addedEntry]);
      setNewWeight('');
      setNewBodyFat('');
      setNewNote('');
    }
  };

  // Datos mockeados extendidos para gráficos
  const mockWeeklyData = [
    { week: 'Sem 1', peso: 75.2, objetivo: 76, adherencia: 85 },
    { week: 'Sem 2', peso: 75.8, objetivo: 76.5, adherencia: 90 },
    { week: 'Sem 3', peso: 76.5, objetivo: 77, adherencia: 87 },
    { week: 'Sem 4', peso: 77.1, objetivo: 77.5, adherencia: 92 },
    { week: 'Sem 5', peso: 77.8, objetivo: 78, adherencia: 88 },
    { week: 'Sem 6', peso: 78.3, objetivo: 78.5, adherencia: 91 },
    { week: 'Sem 7', peso: 79.0, objetivo: 79, adherencia: 94 },
    { week: 'Sem 8', peso: 79.5, objetivo: 79.5, adherencia: 89 },
  ];

  const mockCaloriesData = [
    { day: 'Lun', consumidas: 2450, objetivo: 2500 },
    { day: 'Mar', consumidas: 2530, objetivo: 2500 },
    { day: 'Mie', consumidas: 2480, objetivo: 2500 },
    { day: 'Jue', consumidas: 2520, objetivo: 2500 },
    { day: 'Vie', consumidas: 2490, objetivo: 2500 },
    { day: 'Sab', consumidas: 2600, objetivo: 2500 },
    { day: 'Dom', consumidas: 2470, objetivo: 2500 },
  ];

  const initialWeight = 75.2;
  const currentWeight = 79.5;
  const weightChange = currentWeight - initialWeight;
  const weightChangePercent = ((weightChange / initialWeight) * 100).toFixed(1);

  const initialBodyFat = 15.1;
  const currentBodyFat = 14.2;
  const bodyFatChange = currentBodyFat - initialBodyFat;

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 border border-white/50 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute -right-12 -top-12 w-48 h-48 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Header con gradiente */}
        <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-2xl p-6 mb-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <div className="relative z-10 flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Tracking de Progreso</h2>
              <p className="text-sm text-green-100">Seguimiento completo del cliente</p>
            </div>
          </div>
        </div>

        {/* Métricas clave */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200"
          >
            <div className="flex items-center justify-between mb-2">
              <Scale className="w-8 h-8 text-blue-600" />
              <div className={`px-2 py-1 rounded-full ${weightChange >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                <span className={`text-xs font-bold ${weightChange >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                  {weightChange >= 0 ? '+' : ''}{weightChange.toFixed(1)} kg
                </span>
              </div>
            </div>
            <p className="text-xs text-blue-600 font-semibold mb-1">Peso Actual</p>
            <p className="text-3xl font-bold text-blue-700">{currentWeight} kg</p>
            <p className="text-xs text-blue-600 mt-1">Inicial: {initialWeight} kg ({weightChange >= 0 ? '+' : ''}{weightChangePercent}%)</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200"
          >
            <div className="flex items-center justify-between mb-2">
              <Percent className="w-8 h-8 text-purple-600" />
              <div className={`px-2 py-1 rounded-full ${bodyFatChange < 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                <span className={`text-xs font-bold ${bodyFatChange < 0 ? 'text-green-700' : 'text-red-700'}`}>
                  {bodyFatChange.toFixed(1)}%
                </span>
              </div>
            </div>
            <p className="text-xs text-purple-600 font-semibold mb-1">Grasa Corporal</p>
            <p className="text-3xl font-bold text-purple-700">{currentBodyFat}%</p>
            <p className="text-xs text-purple-600 mt-1">Inicial: {initialBodyFat}%</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl border border-orange-200"
          >
            <div className="flex items-center justify-between mb-2">
              <Target className="w-8 h-8 text-orange-600" />
              <div className="px-2 py-1 bg-green-100 rounded-full">
                <span className="text-xs font-bold text-green-700">En objetivo</span>
              </div>
            </div>
            <p className="text-xs text-orange-600 font-semibold mb-1">Adherencia Promedio</p>
            <p className="text-3xl font-bold text-orange-700">89%</p>
            <p className="text-xs text-orange-600 mt-1">Últimas 8 semanas</p>
          </motion.div>
        </div>

        {/* Gráfico de peso semanal */}
        <div className="mb-6 p-4 bg-gray-50 rounded-2xl border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Evolución de Peso (8 semanas)
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={mockWeeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="week" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} domain={[74, 80]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '8px'
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="peso" stroke="#10b981" strokeWidth={3} name="Peso Real" dot={{ fill: '#10b981', r: 5 }} />
              <Line type="monotone" dataKey="objetivo" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" name="Objetivo" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de calorías semanales */}
        <div className="mb-6 p-4 bg-gray-50 rounded-2xl border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-orange-600" />
            Consumo de Calorías (Última semana)
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={mockCaloriesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} domain={[2300, 2700]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '8px'
                }}
              />
              <Legend />
              <Bar dataKey="consumidas" fill="#f59e0b" name="Consumidas" radius={[8, 8, 0, 0]} />
              <Bar dataKey="objetivo" fill="#3b82f6" name="Objetivo" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de adherencia (heatmap simulado) */}
        <div className="mb-6 p-4 bg-gray-50 rounded-2xl border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Adherencia Diaria (8 semanas)</h3>
          <div className="grid grid-cols-7 gap-2">
            {mockWeeklyData.flatMap((week) =>
              Array.from({ length: 7 }, (_, i) => {
                const adherence = week.adherencia + (Math.random() * 10 - 5);
                const normalizedAdherence = Math.max(0, Math.min(100, adherence));
                const opacity = normalizedAdherence / 100;
                const color = normalizedAdherence >= 80 ? 'bg-green-500' : normalizedAdherence >= 60 ? 'bg-yellow-500' : 'bg-red-500';

                return (
                  <motion.div
                    key={`${week.week}-${i}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (mockWeeklyData.indexOf(week) * 7 + i) * 0.01 }}
                    className={`aspect-square rounded-lg ${color} cursor-pointer hover:scale-110 transition-transform duration-300`}
                    style={{ opacity }}
                    title={`${normalizedAdherence.toFixed(0)}% adherencia`}
                  ></motion.div>
                );
              })
            )}
          </div>
          <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-red-500"></div>
              <span>&lt; 60%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-yellow-500"></div>
              <span>60-80%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-green-500"></div>
              <span>&gt; 80%</span>
            </div>
          </div>
        </div>

        {/* Historial de registros */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4">Historial de Registros</h3>
          {progressEntries.length === 0 && (
            <p className="text-center text-gray-500 py-8">No hay registros de progreso aún.</p>
          )}
          <div className="space-y-2">
            {progressEntries.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-bold text-gray-700">{entry.date}</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="px-3 py-1 bg-blue-100 rounded-full">
                      <span className="text-xs font-bold text-blue-700">{entry.weight} kg</span>
                    </div>
                    {entry.bodyFat && (
                      <div className="px-3 py-1 bg-purple-100 rounded-full">
                        <span className="text-xs font-bold text-purple-700">{entry.bodyFat}%</span>
                      </div>
                    )}
                  </div>
                </div>
                {entry.notes && (
                  <p className="text-sm text-gray-600 mt-2">{entry.notes}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracking;
