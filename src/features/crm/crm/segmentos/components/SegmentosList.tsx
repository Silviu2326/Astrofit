import React from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, Layers } from 'lucide-react';
import { Segment } from '../SegmentosPage';

interface SegmentosListProps {
  segments: Segment[];
  onSelectSegment: (segment: Segment) => void;
  selectedSegmentId: string | null;
}

const SegmentosList: React.FC<SegmentosListProps> = ({ segments, onSelectSegment, selectedSegmentId }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden"
    >
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-50 rounded-lg">
            <Layers className="w-6 h-6 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Mis Segmentos</h2>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {segments.map((segment, index) => (
          <motion.div
            key={segment.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.05 }}
            onClick={() => onSelectSegment(segment)}
            className={`p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
              selectedSegmentId === segment.id
                ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-300 shadow-md'
                : 'bg-white border-gray-200 hover:border-indigo-200 hover:shadow-sm'
            }`}
          >
            <h3 className="font-bold text-lg text-gray-800 mb-2">{segment.name}</h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{segment.description}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-indigo-50 rounded-lg">
                  <Users className="w-4 h-4 text-indigo-600" />
                </div>
                <span className="text-sm font-semibold text-gray-700">{segment.memberCount} miembros</span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(segment.lastUpdated).toLocaleDateString('es-ES')}
              </div>
            </div>
          </motion.div>
        ))}

        {segments.length === 0 && (
          <div className="text-center py-12">
            <Layers className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No hay segmentos creados</p>
            <p className="text-sm text-gray-400 mt-1">Crea tu primer segmento para comenzar</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SegmentosList;
