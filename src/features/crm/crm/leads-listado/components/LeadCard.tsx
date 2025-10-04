import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, Calendar, Star, MapPin, Clock, MessageSquare, MoreVertical, Edit, Trash2, Eye } from 'lucide-react';
import { Lead } from '../leadsListadoApi';

interface LeadCardProps {
  lead: Lead;
}

const LeadCard: React.FC<LeadCardProps> = ({ lead }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCall = () => alert(`Llamando a ${lead.name} (${lead.phone})`);
  const handleEmail = () => alert(`Enviando email a ${lead.name} (${lead.email})`);
  const handleSchedule = () => alert(`Agendando cita con ${lead.name}`);
  const handleWhatsApp = () => alert(`Abriendo WhatsApp con ${lead.name}`);
  const handleEdit = () => alert(`Editando lead: ${lead.name}`);
  const handleDelete = () => alert(`Eliminando lead: ${lead.name}`);
  const handleViewDetails = () => setIsExpanded(!isExpanded);

  const getOriginIcon = (origin: string) => {
    switch (origin) {
      case 'Web': return '🌐';
      case 'Referido': return '👥';
      case 'Campaña Email': return '📧';
      case 'Redes Sociales': return '📱';
      case 'Evento': return '🎪';
      default: return '📌';
    }
  };

  const getQualificationColor = (qual: string) => {
    switch (qual) {
      case 'Alta': return 'text-yellow-500';
      case 'Media': return 'text-orange-500';
      case 'Baja': return 'text-gray-400';
      default: return 'text-gray-300';
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group"
    >
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
        <div className="relative flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-base font-bold text-white mb-1 flex items-center space-x-2">
              <span>{lead.name}</span>
              <span className="text-lg">{getOriginIcon(lead.origin)}</span>
            </h3>
            <div className="flex items-center space-x-1">
              {[1, 2, 3].map((star) => (
                <Star
                  key={star}
                  className={`w-3 h-3 ${star <= 2 ? getQualificationColor('Alta') : 'text-gray-300'} fill-current`}
                />
              ))}
            </div>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="text-white hover:bg-white/20 p-1.5 rounded-lg transition-colors"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
            <AnimatePresence>
              {showMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-10"
                >
                  <button
                    onClick={handleEdit}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Editar</span>
                  </button>
                  <button
                    onClick={handleViewDetails}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Ver detalles</span>
                  </button>
                  <button
                    onClick={handleDelete}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Eliminar</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        {/* Contact Info */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm text-gray-700">
            <Phone className="w-4 h-4 text-green-500 flex-shrink-0" />
            <span className="font-medium truncate">{lead.phone}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-700">
            <Mail className="w-4 h-4 text-blue-500 flex-shrink-0" />
            <span className="truncate">{lead.email}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-700">
            <Calendar className="w-4 h-4 text-purple-500 flex-shrink-0" />
            <span>{new Date(lead.contactDate).toLocaleDateString('es-ES')}</span>
          </div>
        </div>

        {/* Objective Badge */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-lg p-2">
          <p className="text-xs font-semibold text-gray-600 mb-1">Objetivo</p>
          <p className="text-sm text-gray-800">{lead.objective}</p>
        </div>

        {/* Expanded Details */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="space-y-2 border-t border-gray-200 pt-3"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">Origen:</span>
                <span className="font-semibold text-gray-800">{lead.origin}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">ID:</span>
                <span className="font-mono text-gray-800">{lead.id}</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-600">
                <Clock className="w-3 h-3" />
                <span>Último contacto: Hace 2 días</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-600">
                <MapPin className="w-3 h-3" />
                <span>Madrid, España</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCall}
            className="flex items-center justify-center space-x-1.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-xs font-semibold py-2.5 px-3 rounded-lg shadow-md shadow-green-500/30 transition-all duration-200"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Llamar</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleWhatsApp}
            className="flex items-center justify-center space-x-1.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white text-xs font-semibold py-2.5 px-3 rounded-lg shadow-md shadow-emerald-500/30 transition-all duration-200"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleEmail}
            className="flex items-center justify-center space-x-1.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-xs font-semibold py-2.5 px-3 rounded-lg shadow-md shadow-blue-500/30 transition-all duration-200"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSchedule}
            className="flex items-center justify-center space-x-1.5 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white text-xs font-semibold py-2.5 px-3 rounded-lg shadow-md shadow-purple-500/30 transition-all duration-200"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Agendar</span>
          </motion.button>
        </div>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
};

export default LeadCard;
