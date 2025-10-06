import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, MapPin, Calendar, Clock, Tag, User } from 'lucide-react';
import { Cliente } from '../clientesListadoApi';

interface ClienteDetailsModalProps {
  cliente: Cliente | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (cliente: Cliente) => void;
}

const ClienteDetailsModal: React.FC<ClienteDetailsModalProps> = ({ cliente, isOpen, onClose, onEdit }) => {
  if (!cliente) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <img src={cliente.foto} alt={cliente.nombre} className="w-16 h-16 rounded-full" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{cliente.nombre}</h2>
                  <p className="text-gray-600">{cliente.email}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Estado */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700">Estado:</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    cliente.estado === 'activo' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-rose-100 text-rose-700'
                  }`}
                >
                  {cliente.estado}
                </span>
              </div>

              {/* Información de contacto */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{cliente.email}</p>
                  </div>
                </div>
                
                {cliente.telefono && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Phone className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-600">Teléfono</p>
                      <p className="font-medium">{cliente.telefono}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Fechas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">Fecha de Alta</p>
                    <p className="font-medium">{cliente.fechaAlta}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Clock className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-sm text-gray-600">Última Actividad</p>
                    <p className="font-medium">{cliente.ultimaActividad}</p>
                  </div>
                </div>
              </div>

              {/* Etiquetas */}
              {cliente.etiquetas.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-5 h-5 text-indigo-600" />
                    <span className="text-sm font-medium text-gray-700">Etiquetas</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cliente.etiquetas.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm font-semibold text-blue-700 bg-blue-100 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Información adicional */}
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Información Adicional</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">ID del Cliente:</span>
                    <span className="ml-2 font-mono text-gray-900">{cliente.id}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Tipo de Cliente:</span>
                    <span className="ml-2 text-gray-900">
                      {cliente.etiquetas.includes('premium') ? 'Premium' : 'Estándar'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cerrar
              </button>
              <button
                onClick={() => onEdit?.(cliente)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Editar Cliente
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ClienteDetailsModal;
