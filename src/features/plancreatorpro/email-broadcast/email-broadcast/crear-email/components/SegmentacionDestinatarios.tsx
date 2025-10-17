import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Filter, Plus, CheckCircle, X } from 'lucide-react';
import toast from 'react-hot-toast';
import Modal from '../../../../../../components/ui/modal';

interface SegmentacionDestinatariosProps {
  onSegmentChange: (segment: string) => void;
  selectedSegment: string;
}

const SegmentacionDestinatarios: React.FC<SegmentacionDestinatariosProps> = ({ 
  onSegmentChange, 
  selectedSegment 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customSegmentName, setCustomSegmentName] = useState('');
  const [, setCustomSegmentFilters] = useState<string[]>([]);

  const segments = [
    { id: 'todos', name: 'Todos los suscriptores', count: 1250, description: 'Enviar a toda la base de datos' },
    { id: 'clientes', name: 'Clientes activos', count: 890, description: 'Usuarios con compras recientes' },
    { id: 'leads', name: 'Leads calificados', count: 340, description: 'Prospectos interesados' },
    { id: 'inactivos', name: 'Usuarios inactivos', count: 120, description: 'Reactivación de usuarios' },
    { id: 'vip', name: 'Clientes VIP', count: 45, description: 'Clientes premium' }
  ];

  const handleSegmentSelect = (segmentId: string) => {
    onSegmentChange(segmentId);
    const segment = segments.find(s => s.id === segmentId);
    if (segment) {
      toast.success(`Segmento seleccionado: ${segment.name}`);
    }
  };

  const handleCreateCustomSegment = () => {
    if (!customSegmentName.trim()) {
      toast.error('Por favor, ingresa un nombre para el segmento');
      return;
    }
    toast.success(`Segmento personalizado "${customSegmentName}" creado`);
    setIsModalOpen(false);
    setCustomSegmentName('');
    setCustomSegmentFilters([]);
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 relative overflow-hidden"
      >
        {/* Decoración de fondo */}
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full blur-3xl opacity-20"></div>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 p-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3 relative z-10">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Target className="w-6 h-6" />
            </div>
            Segmentación de Destinatarios
          </h2>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 mb-6">Define a quién se enviará este email basándote en criterios de segmentación.</p>
          
          {/* Segment selection */}
          <div className="space-y-3 mb-6">
            {segments.map((segment) => (
              <motion.div
                key={segment.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleSegmentSelect(segment.id)}
                className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                  selectedSegment === segment.id
                    ? 'border-orange-500 bg-orange-50 shadow-md'
                    : 'border-gray-200 hover:border-orange-300 hover:bg-orange-25'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      selectedSegment === segment.id ? 'bg-orange-100' : 'bg-gray-100'
                    }`}>
                      <Users className={`w-5 h-5 ${
                        selectedSegment === segment.id ? 'text-orange-600' : 'text-gray-600'
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{segment.name}</h3>
                      <p className="text-sm text-gray-600">{segment.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-500">{segment.count} usuarios</span>
                    {selectedSegment === segment.id && (
                      <CheckCircle className="w-5 h-5 text-orange-500" />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Create custom segment button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-orange-300 rounded-xl text-orange-600 hover:border-orange-400 hover:bg-orange-50 transition-all duration-300"
          >
            <Plus className="w-5 h-5" />
            Crear Segmento Personalizado
          </motion.button>
        </div>
      </motion.div>

      {/* Custom Segment Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Crear Segmento Personalizado"
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nombre del Segmento
            </label>
            <input
              type="text"
              value={customSegmentName}
              onChange={(e) => setCustomSegmentName(e.target.value)}
              placeholder="Ej: Usuarios de Madrid"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Filtros de Segmentación
            </label>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Ubicación: Madrid</span>
                <button className="ml-auto p-1 hover:bg-red-100 rounded">
                  <X className="w-4 h-4 text-red-500" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Última actividad: Últimos 30 días</span>
                <button className="ml-auto p-1 hover:bg-red-100 rounded">
                  <X className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
            <button className="mt-2 flex items-center gap-2 text-orange-600 hover:text-orange-700 text-sm">
              <Plus className="w-4 h-4" />
              Añadir Filtro
            </button>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleCreateCustomSegment}
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Crear Segmento
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SegmentacionDestinatarios;
