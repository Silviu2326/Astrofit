import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Building, Target, Calendar, Activity, Edit2, Check, X, AlertCircle } from 'lucide-react';
import { Lead } from '../leadDetalleApi';

interface LeadHeaderProps {
  lead: Lead;
  onEdit: (updatedLead: Lead) => void;
}

const LeadHeader: React.FC<LeadHeaderProps> = ({ lead, onEdit }) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [currentName, setCurrentName] = useState(lead.name);

  const handleSaveName = () => {
    onEdit({ ...lead, name: currentName });
    setIsEditingName(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Calificado':
        return 'from-green-400 to-emerald-500';
      case 'Contactado':
        return 'from-blue-400 to-blue-500';
      case 'Nuevo':
        return 'from-yellow-400 to-orange-500';
      case 'En Negociación':
        return 'from-purple-400 to-purple-500';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  const getUrgencyColor = (urgency?: string) => {
    switch (urgency) {
      case 'Alta':
        return 'text-red-600 bg-red-50';
      case 'Media':
        return 'text-yellow-600 bg-yellow-50';
      case 'Baja':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="flex items-start gap-6 flex-wrap">
      {/* Avatar con gradiente */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="relative"
      >
        <div className="relative">
          <div className="h-28 w-28 rounded-3xl bg-gradient-to-br from-indigo-400 to-purple-600 shadow-xl ring-4 ring-white/50 flex items-center justify-center">
            <span className="text-4xl font-bold text-white">
              {lead.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
            </span>
          </div>
          {/* Status indicator */}
          <div className={`absolute -bottom-2 -right-2 bg-gradient-to-br ${getStatusColor(lead.status)} p-2 rounded-xl shadow-lg border-4 border-white`}>
            <Activity className="w-4 h-4 text-white" />
          </div>
        </div>
      </motion.div>

      {/* Info principal */}
      <div className="flex-1 min-w-[300px]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-3">
            {isEditingName ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={currentName}
                  onChange={(e) => setCurrentName(e.target.value)}
                  className="px-3 py-2 border-2 border-white/30 bg-white/20 backdrop-blur-md rounded-lg text-2xl font-bold text-white placeholder-white/60 focus:ring-2 focus:ring-white/50 focus:border-white/50 outline-none"
                  placeholder="Nombre del lead"
                />
                <button
                  onClick={handleSaveName}
                  className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors shadow-lg"
                >
                  <Check className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {
                    setIsEditingName(false);
                    setCurrentName(lead.name);
                  }}
                  className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors shadow-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </motion.div>
            ) : (
              <>
                <h1 className="text-4xl font-bold text-white tracking-tight">
                  {lead.name}
                </h1>
                <button
                  onClick={() => setIsEditingName(true)}
                  className="p-2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-lg text-xs font-semibold transition-colors border border-white/20"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </>
            )}
            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r ${getStatusColor(lead.status)} rounded-full shadow-lg`}>
              <span className="text-xs font-bold text-white uppercase tracking-wide">{lead.status}</span>
            </div>
          </div>

          {/* Contact info pills */}
          <div className="flex flex-wrap gap-3 mb-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/20">
              <Mail className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">{lead.email}</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/20">
              <Phone className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">{lead.phone}</span>
            </div>
            {lead.company && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/20">
                <Building className="w-4 h-4 text-white" />
                <span className="text-sm font-medium text-white">{lead.company}</span>
              </div>
            )}
          </div>

          {/* Additional info */}
          <div className="flex flex-wrap gap-3">
            {lead.objective && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
                <Target className="w-4 h-4 text-white" />
                <span className="text-xs font-medium text-white">{lead.objective}</span>
              </div>
            )}
            {lead.urgency && (
              <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-xs ${getUrgencyColor(lead.urgency)}`}>
                <AlertCircle className="w-3.5 h-3.5" />
                Urgencia: {lead.urgency}
              </div>
            )}
            {lead.budget && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
                <Calendar className="w-4 h-4 text-white" />
                <span className="text-xs font-medium text-white">Presupuesto: {lead.budget}</span>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LeadHeader;
