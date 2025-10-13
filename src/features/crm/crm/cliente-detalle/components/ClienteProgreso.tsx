import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Calendar, 
  Activity, 
  Weight, 
  Ruler, 
  Heart,
  Zap,
  Award,
  Plus,
  Edit3,
  Camera,
  BarChart3,
  Ruler as MedidasIcon,
  Target as ObjetivosIcon,
  Camera as FotosIcon
} from 'lucide-react';
import { Cliente } from '../clienteDetalleApi';

interface ClienteProgresoProps {
  cliente: Cliente;
}

interface MedidaCorporal {
  id: string;
  fecha: string;
  peso: number;
  grasa: number;
  musculo: number;
  cintura: number;
  cadera: number;
  brazo: number;
  foto?: string;
}

interface Objetivo {
  id: string;
  tipo: 'peso' | 'grasa' | 'musculo' | 'medidas';
  valorObjetivo: number;
  valorActual: number;
  fechaObjetivo: string;
  progreso: number;
}

const ClienteProgreso: React.FC<ClienteProgresoProps> = ({ cliente }) => {
  const [activeView, setActiveView] = useState<'dashboard' | 'medidas' | 'objetivos' | 'fotos'>('dashboard');
  const [showAddMedida, setShowAddMedida] = useState(false);
  const [showAddObjetivo, setShowAddObjetivo] = useState(false);

  // Datos mock para demostración
  const medidas: MedidaCorporal[] = [
    {
      id: '1',
      fecha: '2024-01-15',
      peso: 75.5,
      grasa: 18.2,
      musculo: 35.8,
      cintura: 85,
      cadera: 95,
      brazo: 32
    },
    {
      id: '2',
      fecha: '2024-01-08',
      peso: 76.2,
      grasa: 18.8,
      musculo: 35.2,
      cintura: 86,
      cadera: 96,
      brazo: 31.5
    }
  ];

  const objetivos: Objetivo[] = [
    {
      id: '1',
      tipo: 'peso',
      valorObjetivo: 70,
      valorActual: 75.5,
      fechaObjetivo: '2024-03-15',
      progreso: 65
    },
    {
      id: '2',
      tipo: 'grasa',
      valorObjetivo: 15,
      valorActual: 18.2,
      fechaObjetivo: '2024-04-01',
      progreso: 45
    }
  ];

  const getProgresoColor = (progreso: number) => {
    if (progreso >= 80) return 'text-green-600';
    if (progreso >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgresoBg = (progreso: number) => {
    if (progreso >= 80) return 'bg-green-500';
    if (progreso >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const DashboardView = () => (
    <div className="space-y-6">
      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Peso Actual</p>
              <p className="text-2xl font-bold text-blue-900">75.5 kg</p>
              <p className="text-xs text-blue-600 flex items-center gap-1">
                <TrendingDown className="w-3 h-3" />
                -0.7 kg esta semana
              </p>
            </div>
            <Weight className="w-8 h-8 text-blue-600" />
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
              <p className="text-sm font-medium text-green-600">% Grasa</p>
              <p className="text-2xl font-bold text-green-900">18.2%</p>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <TrendingDown className="w-3 h-3" />
                -0.6% esta semana
              </p>
            </div>
            <Activity className="w-8 h-8 text-green-600" />
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
              <p className="text-sm font-medium text-purple-600">% Músculo</p>
              <p className="text-2xl font-bold text-purple-900">35.8%</p>
              <p className="text-xs text-purple-600 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +0.6% esta semana
              </p>
            </div>
            <Zap className="w-8 h-8 text-purple-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl border border-orange-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">Progreso</p>
              <p className="text-2xl font-bold text-orange-900">65%</p>
              <p className="text-xs text-orange-600 flex items-center gap-1">
                <Award className="w-3 h-3" />
                Objetivo peso
              </p>
            </div>
            <Target className="w-8 h-8 text-orange-600" />
          </div>
        </motion.div>
      </div>

      {/* Gráfico de progreso */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Evolución del Peso</h3>
          <BarChart3 className="w-5 h-5 text-gray-600" />
        </div>
        <div className="h-64 flex items-end justify-between space-x-2">
          {medidas.map((medida, index) => (
            <div key={medida.id} className="flex flex-col items-center space-y-2">
              <div
                className="bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-lg w-8 transition-all duration-500"
                style={{ height: `${(medida.peso / 80) * 200}px` }}
              />
              <span className="text-xs text-gray-600">{medida.peso}kg</span>
              <span className="text-xs text-gray-500">{new Date(medida.fecha).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Objetivos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Objetivos Activos</h3>
          <button
            onClick={() => setShowAddObjetivo(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Nuevo Objetivo
          </button>
        </div>
        <div className="space-y-4">
          {objetivos.map((objetivo) => (
            <div key={objetivo.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900 capitalize">
                  {objetivo.tipo === 'peso' ? 'Peso' : objetivo.tipo === 'grasa' ? '% Grasa' : '% Músculo'}
                </span>
                <span className="text-sm text-gray-600">
                  {objetivo.valorActual} / {objetivo.valorObjetivo}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${getProgresoBg(objetivo.progreso)}`}
                  style={{ width: `${objetivo.progreso}%` }}
                />
              </div>
              <div className="flex justify-between text-sm">
                <span className={getProgresoColor(objetivo.progreso)}>
                  {objetivo.progreso}% completado
                </span>
                <span className="text-gray-500">
                  Objetivo: {new Date(objetivo.fechaObjetivo).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const MedidasView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Medidas Corporales</h3>
        <button
          onClick={() => setShowAddMedida(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nueva Medida
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Peso (kg)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">% Grasa</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">% Músculo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cintura (cm)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cadera (cm)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {medidas.map((medida) => (
                <tr key={medida.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(medida.fecha).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {medida.peso}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {medida.grasa}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {medida.musculo}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {medida.cintura}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {medida.cadera}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button className="text-indigo-600 hover:text-indigo-900">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Camera className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Navegación de vistas */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
          { id: 'medidas', label: 'Medidas', icon: MedidasIcon },
          { id: 'objetivos', label: 'Objetivos', icon: ObjetivosIcon },
          { id: 'fotos', label: 'Fotos', icon: FotosIcon },
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
      {activeView === 'medidas' && <MedidasView />}
      {activeView === 'objetivos' && <div>Vista de Objetivos (en desarrollo)</div>}
      {activeView === 'fotos' && <div>Vista de Fotos (en desarrollo)</div>}
    </div>
  );
};

export default ClienteProgreso;
