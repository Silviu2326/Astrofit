import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';

const FiltrosCliente: React.FC = () => {
  const [cliente, setCliente] = useState<string>('');
  const [tipoHabito, setTipoHabito] = useState<string>('');

  const handleSearch = () => {
    console.log('Filtrando por:', { cliente, tipoHabito });
    // Lógica para aplicar filtros
  };

  const handleClear = () => {
    setCliente('');
    setTipoHabito('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 mb-6 relative overflow-hidden"
    >
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-emerald-600" />
          <h3 className="text-lg font-bold text-gray-900">Filtros</h3>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por cliente..."
                className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1">
            <select
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm appearance-none"
              value={tipoHabito}
              onChange={(e) => setTipoHabito(e.target.value)}
            >
              <option value="">Todos los tipos</option>
              <option value="Salud">Salud</option>
              <option value="Desarrollo Personal">Desarrollo Personal</option>
              <option value="Bienestar">Bienestar</option>
              <option value="Educación">Educación</option>
            </select>
          </div>

          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSearch}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-2xl hover:shadow-lg transition-all duration-300 flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              Buscar
            </motion.button>

            {(cliente || tipoHabito) && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClear}
                className="px-4 py-3 bg-gray-100 text-gray-600 font-semibold rounded-2xl hover:bg-gray-200 transition-all duration-300 flex items-center gap-2"
              >
                <X className="w-5 h-5" />
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FiltrosCliente;
