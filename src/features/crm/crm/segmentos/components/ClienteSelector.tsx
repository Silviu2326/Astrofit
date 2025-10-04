import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, UserPlus, X, Check } from 'lucide-react';
import clienteService from '../../../../../services/clienteService';

interface Cliente {
  _id: string;
  nombre: string;
  email: string;
  telefono?: string;
  foto?: string;
  estado: string;
  etiquetas: string[];
}

interface ClienteSelectorProps {
  selectedClientIds: string[];
  onClientesChange: (clientIds: string[]) => void;
  onClose: () => void;
}

const ClienteSelector: React.FC<ClienteSelectorProps> = ({ selectedClientIds, onClientesChange, onClose }) => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [filteredClientes, setFilteredClientes] = useState<Cliente[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [localSelectedIds, setLocalSelectedIds] = useState<string[]>(selectedClientIds);

  useEffect(() => {
    fetchClientes();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredClientes(clientes);
    } else {
      const filtered = clientes.filter(
        (cliente) =>
          cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cliente.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredClientes(filtered);
    }
  }, [searchTerm, clientes]);

  const fetchClientes = async () => {
    try {
      const response = await clienteService.getClientes();
      if (response.success) {
        setClientes(response.data);
        setFilteredClientes(response.data);
      }
    } catch (error) {
      console.error('Error al cargar clientes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCliente = (clienteId: string) => {
    setLocalSelectedIds((prev) =>
      prev.includes(clienteId) ? prev.filter((id) => id !== clienteId) : [...prev, clienteId]
    );
  };

  const handleSave = () => {
    onClientesChange(localSelectedIds);
    onClose();
  };

  const selectAll = () => {
    setLocalSelectedIds(filteredClientes.map((c) => c._id));
  };

  const deselectAll = () => {
    setLocalSelectedIds([]);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <UserPlus className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Seleccionar Clientes</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-600">
              {localSelectedIds.length} de {filteredClientes.length} seleccionados
            </p>
            <div className="flex gap-2">
              <button
                onClick={selectAll}
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Seleccionar todos
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={deselectAll}
                className="text-sm text-gray-600 hover:text-gray-700 font-medium"
              >
                Deseleccionar todos
              </button>
            </div>
          </div>
        </div>

        {/* Lista de Clientes */}
        <div className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filteredClientes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No se encontraron clientes</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredClientes.map((cliente) => {
                const isSelected = localSelectedIds.includes(cliente._id);
                return (
                  <motion.div
                    key={cliente._id}
                    whileHover={{ scale: 1.01 }}
                    onClick={() => toggleCliente(cliente._id)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Checkbox */}
                      <div
                        className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                          isSelected
                            ? 'bg-indigo-600 border-indigo-600'
                            : 'border-gray-300'
                        }`}
                      >
                        {isSelected && <Check className="w-4 h-4 text-white" />}
                      </div>

                      {/* Avatar */}
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        {cliente.nombre.charAt(0).toUpperCase()}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {cliente.nombre}
                        </h3>
                        <p className="text-sm text-gray-500 truncate">{cliente.email}</p>
                      </div>

                      {/* Estado */}
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          cliente.estado === 'activo'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {cliente.estado}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Guardar ({localSelectedIds.length})
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ClienteSelector;
