import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, User, TrendingDown, TrendingUp, Activity, AlertCircle, ChevronRight } from 'lucide-react';
import { mockClientes, Cliente } from '../mockData';

interface ClienteSelectorProps {
  onNext: (data: { cliente: Cliente }) => void;
  initialData: any;
}

const ClienteSelector: React.FC<ClienteSelectorProps> = ({ onNext, initialData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(initialData.cliente || null);

  const filteredClientes = mockClientes.filter(cliente =>
    `${cliente.nombre} ${cliente.apellido}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = () => {
    if (selectedCliente) {
      onNext({ cliente: selectedCliente });
    } else {
      alert('Por favor, selecciona un cliente.');
    }
  };

  const getObjetivoIcon = (objetivo: string) => {
    if (objetivo.includes('Pérdida')) return <TrendingDown className="w-4 h-4 text-red-500" />;
    if (objetivo.includes('Ganancia')) return <TrendingUp className="w-4 h-4 text-green-500" />;
    return <Activity className="w-4 h-4 text-blue-500" />;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Lista de clientes */}
      <div className="lg:col-span-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Seleccionar Cliente</h2>

          {/* Barra de búsqueda */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
            />
          </div>

          {/* Lista de clientes */}
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
            {filteredClientes.map((cliente, index) => (
              <motion.div
                key={cliente.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                onClick={() => setSelectedCliente(cliente)}
                className={`
                  p-4 rounded-2xl cursor-pointer transition-all duration-300 border-2
                  ${selectedCliente?.id === cliente.id
                    ? 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-500 shadow-lg'
                    : 'bg-white hover:bg-gray-50 border-gray-200 hover:border-amber-300 hover:shadow-md'
                  }
                `}
              >
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg">
                    {cliente.avatar}
                  </div>

                  {/* Info del cliente */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-base font-bold text-gray-900">
                        {cliente.nombre} {cliente.apellido}
                      </p>
                      <span className="text-xs text-gray-500">({cliente.edad} años)</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{cliente.email}</p>

                    <div className="flex items-center gap-3 flex-wrap">
                      {/* Datos físicos */}
                      <div className="flex items-center gap-1 text-xs bg-blue-50 px-2 py-1 rounded-lg">
                        <span className="font-semibold text-blue-700">{cliente.peso}kg</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs bg-purple-50 px-2 py-1 rounded-lg">
                        <span className="font-semibold text-purple-700">{cliente.altura}cm</span>
                      </div>

                      {/* Objetivo */}
                      <div className="flex items-center gap-1 text-xs bg-gradient-to-r from-amber-50 to-orange-50 px-2 py-1 rounded-lg border border-amber-200">
                        {getObjetivoIcon(cliente.objetivoFitness)}
                        <span className="font-semibold text-amber-700">{cliente.objetivoFitness}</span>
                      </div>

                      {/* Restricciones */}
                      {cliente.restriccionesAlimentarias.length > 0 && (
                        <div className="flex items-center gap-1 text-xs bg-red-50 px-2 py-1 rounded-lg border border-red-200">
                          <AlertCircle className="w-3 h-3 text-red-500" />
                          <span className="font-semibold text-red-700">
                            {cliente.restriccionesAlimentarias.length} restricción(es)
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Indicador de selección */}
                  {selectedCliente?.id === cliente.id && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
                      <ChevronRight className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {filteredClientes.length === 0 && (
              <div className="text-center py-12">
                <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No se encontraron clientes</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Botón siguiente */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={handleSubmit}
          disabled={!selectedCliente}
          className={`
            mt-6 w-full py-4 rounded-2xl font-bold text-white text-lg shadow-xl transition-all duration-300
            ${selectedCliente
              ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:shadow-2xl hover:scale-[1.02]'
              : 'bg-gray-300 cursor-not-allowed'
            }
          `}
        >
          Continuar con {selectedCliente ? `${selectedCliente.nombre}` : 'cliente seleccionado'} →
        </motion.button>
      </div>

      {/* Preview sidebar */}
      <div className="lg:col-span-1">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 sticky top-6"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl">
              <User className="w-5 h-5 text-white" />
            </div>
            Cliente Seleccionado
          </h3>

          {selectedCliente ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              {/* Avatar grande */}
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 rounded-3xl flex items-center justify-center text-5xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-xl">
                  {selectedCliente.avatar}
                </div>
              </div>

              {/* Nombre */}
              <div className="text-center mb-6">
                <h4 className="text-2xl font-bold text-gray-900 mb-1">
                  {selectedCliente.nombre} {selectedCliente.apellido}
                </h4>
                <p className="text-sm text-gray-600">{selectedCliente.email}</p>
              </div>

              {/* Detalles */}
              <div className="space-y-3">
                <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                  <p className="text-xs font-semibold text-blue-600 mb-1">Datos Físicos</p>
                  <p className="text-sm text-gray-900">
                    <span className="font-bold">{selectedCliente.peso}kg</span> ·
                    <span className="font-bold"> {selectedCliente.altura}cm</span> ·
                    <span className="font-bold"> {selectedCliente.edad} años</span>
                  </p>
                </div>

                <div className="p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                  <p className="text-xs font-semibold text-amber-600 mb-1">Objetivo Fitness</p>
                  <div className="flex items-center gap-2">
                    {getObjetivoIcon(selectedCliente.objetivoFitness)}
                    <p className="text-sm font-bold text-gray-900">{selectedCliente.objetivoFitness}</p>
                  </div>
                </div>

                {selectedCliente.restriccionesAlimentarias.length > 0 && (
                  <div className="p-3 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-200">
                    <p className="text-xs font-semibold text-red-600 mb-2">Restricciones Alimentarias</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedCliente.restriccionesAlimentarias.map((restriccion, idx) => (
                        <span key={idx} className="px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-lg">
                          {restriccion}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-sm">Selecciona un cliente para ver su información</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ClienteSelector;
