import React, { useEffect, useState } from 'react';
import { Play, Pause, Square, MoreVertical, BarChart3, Clock, Target } from 'lucide-react';
import toast from 'react-hot-toast';
import { fetchExperiments, Experiment } from '../experimentosApi';
import TarjetasComparativas from './TarjetasComparativas';

interface PanelExperimentosProps {
  onExperimentAction: (action: string, experimentId: string, experimentName: string) => void;
  onViewDetails: (experiment: Experiment) => void;
  onShowOptions: (experiment: Experiment) => void;
}

const PanelExperimentos: React.FC<PanelExperimentosProps> = ({ 
  onExperimentAction, 
  onShowOptions 
}) => {
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getExperiments = async () => {
      setLoading(true);
      try {
        const data = await fetchExperiments();
        setExperiments(data);
      } catch (error) {
        toast.error('Error al cargar los experimentos');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getExperiments();
  }, []);


  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'paused': return 'text-yellow-600 bg-yellow-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Activo';
      case 'paused': return 'Pausado';
      case 'completed': return 'Completado';
      default: return status;
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <BarChart3 className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Panel de Experimentos</h2>
            <p className="text-sm text-gray-600">Gestiona tus pruebas A/B activas</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          <span>Actualizado hace 2 min</span>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      ) : experiments.length === 0 ? (
        <div className="text-center py-12">
          <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No hay experimentos activos</p>
          <p className="text-gray-400 text-sm">Crea tu primer experimento para comenzar</p>
        </div>
      ) : (
        <div className="space-y-4">
          {experiments.map((exp) => (
            <div key={exp.id} className="bg-gradient-to-r from-slate-50 to-indigo-50/30 rounded-2xl p-6 border border-slate-200/50 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{exp.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(exp.status)}`}>
                      {getStatusText(exp.status)}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{exp.duration}</span>
                    </div>
                    {exp.winningVariant && (
                      <div className="flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        <span>Ganador: Variante {exp.winningVariant}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {exp.status === 'active' && (
                    <button
                      onClick={() => onExperimentAction('pausar', exp.id, exp.name)}
                      className="p-2 text-yellow-600 hover:bg-yellow-100 rounded-lg transition-colors"
                      title="Pausar experimento"
                    >
                      <Pause className="w-4 h-4" />
                    </button>
                  )}
                  {exp.status === 'paused' && (
                    <button
                      onClick={() => onExperimentAction('reanudar', exp.id, exp.name)}
                      className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                      title="Reanudar experimento"
                    >
                      <Play className="w-4 h-4" />
                    </button>
                  )}
                  {exp.status !== 'completed' && (
                    <button
                      onClick={() => onExperimentAction('finalizar', exp.id, exp.name)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                      title="Finalizar experimento"
                    >
                      <Square className="w-4 h-4" />
                    </button>
                  )}
                  <button 
                    onClick={() => onShowOptions(exp)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Más opciones"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <TarjetasComparativas experiment={exp} />
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default PanelExperimentos;
