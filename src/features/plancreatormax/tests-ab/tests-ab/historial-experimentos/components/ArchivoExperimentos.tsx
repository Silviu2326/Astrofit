import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Download, Share2, Calendar, TrendingUp, Target, FileText } from 'lucide-react';
import toast from 'react-hot-toast';
import { getExperiments, Experiment } from '../historialExperimentosApi';

interface ArchivoExperimentosProps {
  onViewDetails: (experiment: Experiment) => void;
}

const ArchivoExperimentos: React.FC<ArchivoExperimentosProps> = ({ onViewDetails }) => {
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExperiments = async () => {
      try {
        setIsLoading(true);
        const data = await getExperiments();
        setExperiments(data);
        toast.success(`${data.length} experimentos cargados`);
      } catch (error) {
        toast.error('Error al cargar los experimentos');
      } finally {
        setIsLoading(false);
      }
    };
    fetchExperiments();
  }, []);

  const handleViewDetails = (experiment: Experiment) => {
    onViewDetails(experiment);
  };

  const handleDownloadReport = (experiment: Experiment) => {
    toast.success(`Descargando reporte de: ${experiment.description}`);
    // Aquí implementarías la lógica de descarga
  };

  const handleShareExperiment = (experiment: Experiment) => {
    navigator.clipboard.writeText(`Experimento: ${experiment.description} - Resultado: ${experiment.winner}`);
    toast.success('Enlace copiado al portapapeles');
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 text-gray-600">Cargando experimentos...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 rounded-xl">
            <FileText className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Archivo de Experimentos</h2>
            <p className="text-gray-600">{experiments.length} experimentos disponibles</p>
          </div>
        </div>
      </div>

      {/* Grid de experimentos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experiments.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -4 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden group hover:shadow-xl transition-all duration-300"
          >
            {/* Header de la tarjeta */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">{exp.description}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(exp.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                  <TrendingUp className="w-3 h-3" />
                  Completado
                </div>
              </div>
            </div>

            {/* Contenido */}
            <div className="p-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-indigo-500" />
                  <span className="text-sm font-medium text-gray-700">Ganador:</span>
                  <span className="text-sm text-gray-900 font-semibold">{exp.winner}</span>
                </div>
                
                <div className="text-sm text-gray-600 line-clamp-2">
                  <strong>Notas:</strong> {exp.notes}
                </div>
              </div>
            </div>

            {/* Acciones */}
            <div className="p-6 pt-0">
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleViewDetails(exp)}
                  className="flex-1 bg-indigo-500 text-white px-4 py-2 rounded-xl hover:bg-indigo-600 transition-colors duration-200 flex items-center justify-center gap-2 text-sm font-medium"
                >
                  <Eye className="w-4 h-4" />
                  Ver Detalles
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDownloadReport(exp)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                >
                  <Download className="w-4 h-4" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleShareExperiment(exp)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                >
                  <Share2 className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
};

export default ArchivoExperimentos;
