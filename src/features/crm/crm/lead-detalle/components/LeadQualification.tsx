import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Clock, DollarSign, AlertCircle, Edit2, Save } from 'lucide-react';
import { Lead } from '../leadDetalleApi';

interface LeadQualificationProps {
  lead: Lead;
  onUpdate: (updatedLead: Lead) => void;
}

const LeadQualification: React.FC<LeadQualificationProps> = ({ lead, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [objective, setObjective] = useState(lead.objective || '');
  const [availability, setAvailability] = useState(lead.availability || '');
  const [budget, setBudget] = useState(lead.budget || '');
  const [urgency, setUrgency] = useState(lead.urgency || '');

  const handleSave = () => {
    const updatedLead = {
      ...lead,
      objective,
      availability,
      budget,
      urgency,
    };
    onUpdate(updatedLead);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setObjective(lead.objective || '');
    setAvailability(lead.availability || '');
    setBudget(lead.budget || '');
    setUrgency(lead.urgency || '');
    setIsEditing(false);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Alta':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'Media':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Baja':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Cualificación del Lead</h2>
        {!isEditing && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
          >
            <Edit2 className="w-4 h-4" />
            Editar
          </motion.button>
        )}
      </div>

      {isEditing ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="objective" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Target className="w-4 h-4 text-indigo-600" />
                Objetivo
              </label>
              <input
                type="text"
                id="objective"
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="Ej: Aumentar ventas en un 20%"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="availability" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Clock className="w-4 h-4 text-indigo-600" />
                Disponibilidad
              </label>
              <input
                type="text"
                id="availability"
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="Ej: Mañanas, Tardes"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="budget" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <DollarSign className="w-4 h-4 text-indigo-600" />
                Presupuesto
              </label>
              <input
                type="text"
                id="budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="Ej: 5000-10000 EUR"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="urgency" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <AlertCircle className="w-4 h-4 text-indigo-600" />
                Urgencia
              </label>
              <select
                id="urgency"
                value={urgency}
                onChange={(e) => setUrgency(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white"
              >
                <option value="">Seleccionar</option>
                <option value="Baja">Baja</option>
                <option value="Media">Media</option>
                <option value="Alta">Alta</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md font-semibold"
            >
              <Save className="w-4 h-4" />
              Guardar
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCancel}
              className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
            >
              Cancelar
            </motion.button>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <Target className="w-5 h-5 text-indigo-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">Objetivo</span>
            </div>
            <p className="text-gray-800 font-medium">{lead.objective || 'No especificado'}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <Clock className="w-5 h-5 text-indigo-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">Disponibilidad</span>
            </div>
            <p className="text-gray-800 font-medium">{lead.availability || 'No especificada'}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <DollarSign className="w-5 h-5 text-indigo-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">Presupuesto</span>
            </div>
            <p className="text-gray-800 font-medium">{lead.budget || 'No especificado'}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <AlertCircle className="w-5 h-5 text-indigo-600" />
              </div>
              <span className="text-sm font-semibold text-gray-600">Urgencia</span>
            </div>
            {lead.urgency ? (
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm font-bold border ${getUrgencyColor(lead.urgency)}`}>
                {lead.urgency}
              </span>
            ) : (
              <p className="text-gray-800 font-medium">No especificada</p>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default LeadQualification;
