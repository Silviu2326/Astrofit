import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Calendar, Crown, Activity, Edit2, Check, X, Tag } from 'lucide-react';
import { Cliente, updateClienteEtiquetas } from '../clienteDetalleApi';

interface ClienteHeaderProps {
  cliente: Cliente;
}

const ClienteHeader: React.FC<ClienteHeaderProps> = ({ cliente }) => {
  const [isEditingTags, setIsEditingTags] = useState(false);
  const [currentTags, setCurrentTags] = useState(cliente.etiquetas.join(', '));

  const handleSaveTags = async () => {
    const newTags = currentTags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    await updateClienteEtiquetas(cliente.id, newTags);
    cliente.etiquetas = newTags;
    setIsEditingTags(false);
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
          <img
            className="h-28 w-28 rounded-3xl object-cover shadow-xl ring-4 ring-white/50"
            src={cliente.fotoUrl}
            alt={`${cliente.nombre} ${cliente.apellido}`}
          />
          {/* Status indicator */}
          <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-green-400 to-emerald-500 p-2 rounded-xl shadow-lg border-4 border-white">
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
            <h1 className="text-4xl font-bold text-white tracking-tight">
              {cliente.nombre} {cliente.apellido}
            </h1>
            {cliente.premium && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full shadow-lg">
                <Crown className="w-4 h-4 text-white" />
                <span className="text-xs font-bold text-white uppercase tracking-wide">Premium</span>
              </div>
            )}
          </div>

          {/* Contact info pills */}
          <div className="flex flex-wrap gap-3 mb-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/20">
              <Mail className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">{cliente.email}</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/20">
              <Phone className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">{cliente.telefono}</span>
            </div>
            {cliente.ciudad && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/20">
                <MapPin className="w-4 h-4 text-white" />
                <span className="text-sm font-medium text-white">{cliente.ciudad}</span>
              </div>
            )}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/20">
              <Calendar className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">Cliente desde {new Date(cliente.fechaRegistro).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Tags section */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
              <Tag className="w-4 h-4 text-white" />
              <span className="text-xs font-semibold text-white uppercase tracking-wide">Etiquetas:</span>
            </div>

            {isEditingTags ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={currentTags}
                  onChange={(e) => setCurrentTags(e.target.value)}
                  className="px-3 py-1.5 border-2 border-white/30 bg-white/20 backdrop-blur-md rounded-lg text-sm font-medium text-white placeholder-white/60 focus:ring-2 focus:ring-white/50 focus:border-white/50 outline-none"
                  placeholder="Etiquetas separadas por comas"
                />
                <button
                  onClick={handleSaveTags}
                  className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors shadow-lg"
                >
                  <Check className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setIsEditingTags(false);
                    setCurrentTags(cliente.etiquetas.join(', '));
                  }}
                  className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors shadow-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ) : (
              <>
                {cliente.etiquetas.map((tag, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md text-white border border-white/20 shadow-md"
                  >
                    {tag}
                  </motion.span>
                ))}
                <button
                  onClick={() => setIsEditingTags(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-lg text-xs font-semibold transition-colors border border-white/20"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  Editar
                </button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ClienteHeader;
