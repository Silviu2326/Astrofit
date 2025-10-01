import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, FileText, Calendar, Plus, Clock } from 'lucide-react';
import { Interaction, NextAction } from '../leadDetalleApi';

interface LeadTimelineProps {
  interactions: Interaction[];
  nextActions: NextAction[];
  onAddInteraction: (newInteraction: Omit<Interaction, 'id'>) => void;
}

const LeadTimeline: React.FC<LeadTimelineProps> = ({ interactions, nextActions, onAddInteraction }) => {
  const [newInteractionType, setNewInteractionType] = useState<'Llamada' | 'Email' | 'Nota'>('Nota');
  const [newInteractionNotes, setNewInteractionNotes] = useState('');

  const handleAddInteractionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newInteractionNotes.trim()) {
      onAddInteraction({
        type: newInteractionType,
        date: new Date().toISOString().slice(0, 10),
        notes: newInteractionNotes,
      });
      setNewInteractionNotes('');
    }
  };

  const sortedTimeline = [...interactions, ...nextActions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const getInteractionIcon = (type: string) => {
    switch (type) {
      case 'Llamada':
        return <Phone className="w-4 h-4" />;
      case 'Email':
        return <Mail className="w-4 h-4" />;
      case 'Nota':
        return <FileText className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  const getInteractionColor = (type: string) => {
    switch (type) {
      case 'Llamada':
        return 'border-blue-400 bg-blue-50';
      case 'Email':
        return 'border-purple-400 bg-purple-50';
      case 'Nota':
        return 'border-gray-400 bg-gray-50';
      default:
        return 'border-indigo-400 bg-indigo-50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Historial de Interacciones</h2>
      </div>

      {/* Add new interaction form */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
      >
        <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5 text-indigo-600" />
          Añadir Nueva Interacción
        </h3>
        <form onSubmit={handleAddInteractionSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Tipo</label>
              <select
                value={newInteractionType}
                onChange={(e) => setNewInteractionType(e.target.value as 'Llamada' | 'Email' | 'Nota')}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white"
              >
                <option value="Llamada">Llamada</option>
                <option value="Email">Email</option>
                <option value="Nota">Nota</option>
              </select>
            </div>
            <div className="space-y-2 md:col-span-3">
              <label className="text-sm font-semibold text-gray-700">Detalles</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newInteractionNotes}
                  onChange={(e) => setNewInteractionNotes(e.target.value)}
                  placeholder="Detalles de la interacción o nota"
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md font-semibold"
                >
                  <Plus className="w-4 h-4" />
                  Añadir
                </motion.button>
              </div>
            </div>
          </div>
        </form>
      </motion.div>

      {/* Timeline */}
      <div className="space-y-4">
        {sortedTimeline.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center shadow-sm">
            <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No hay interacciones o seguimientos registrados.</p>
          </div>
        ) : (
          sortedTimeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="relative"
            >
              {'type' in item ? ( // It's an Interaction
                <div className={`bg-white border-l-4 ${getInteractionColor(item.type).split(' ')[0]} rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow`}>
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${getInteractionColor(item.type).split(' ')[1]}`}>
                      {getInteractionIcon(item.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-gray-800">{item.type}</span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(item.date).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      <p className="text-gray-700">{item.notes}</p>
                    </div>
                  </div>
                </div>
              ) : ( // It's a NextAction
                <div className="bg-white border-l-4 border-indigo-400 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-indigo-50">
                      <Calendar className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-indigo-600">Seguimiento Programado</span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {new Date(item.date).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      <p className="text-gray-700">{item.description}</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default LeadTimeline;
