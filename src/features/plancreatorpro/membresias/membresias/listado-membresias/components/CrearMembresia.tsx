import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Loader2, Users, DollarSign } from 'lucide-react';
import toast from 'react-hot-toast';
import { createMembresia, Membresia } from '../listadoMembresiasApi';

const CrearMembresia: React.FC<{
  onMembresiaCreated: (membresia: Membresia) => void;
}> = ({ onMembresiaCreated }) => {
  const [nivel, setNivel] = useState<'Bronce' | 'Plata' | 'Oro' | 'Premium'>('Bronce');
  const [miembrosActivos, setMiembrosActivos] = useState<number>(0);
  const [ingresosGenerados, setIngresosGenerados] = useState<number>(0);
  const [estado, setEstado] = useState<'activo' | 'pausado'>('activo');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const loadingToast = toast.loading('Creando membresía...');
    
    try {
      const nuevaMembresia = await createMembresia({
        nivel,
        miembrosActivos,
        ingresosGenerados,
        estado,
      });
      
      toast.success('¡Membresía creada exitosamente!', { id: loadingToast });
      
      // Notificar al componente padre
      onMembresiaCreated(nuevaMembresia);
      
      // Limpiar el formulario
      setNivel('Bronce');
      setMiembrosActivos(0);
      setIngresosGenerados(0);
      setEstado('activo');
    } catch (error) {
      toast.error('Error al crear la membresía. Inténtalo de nuevo.', { id: loadingToast });
      console.error('Error creating membership:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 mb-8 border border-white/50 relative overflow-hidden group"
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
      
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-5 rounded-full blur-2xl"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-xl">
            <Plus className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
            Crear Nueva Membresía
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="nivel" className="block text-sm font-semibold text-gray-700">
            Nivel de Membresía
          </label>
          <div className="relative">
            <select
              id="nivel"
              name="nivel"
              value={nivel}
              onChange={(e) => setNivel(e.target.value as 'Bronce' | 'Plata' | 'Oro' | 'Premium')}
              disabled={isLoading}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed appearance-none cursor-pointer"
            >
              <option value="Bronce">🥉 Bronce</option>
              <option value="Plata">🥈 Plata</option>
              <option value="Oro">🥇 Oro</option>
              <option value="Premium">💎 Premium</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="miembrosActivos" className="block text-sm font-semibold text-gray-700">
            Miembros Activos
          </label>
          <div className="relative">
            <input
              type="number"
              id="miembrosActivos"
              name="miembrosActivos"
              value={miembrosActivos}
              onChange={(e) => setMiembrosActivos(Number(e.target.value))}
              disabled={isLoading}
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="0"
              min="0"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Users className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="ingresosGenerados" className="block text-sm font-semibold text-gray-700">
            Ingresos Generados
          </label>
          <div className="relative">
            <input
              type="number"
              id="ingresosGenerados"
              name="ingresosGenerados"
              value={ingresosGenerados}
              onChange={(e) => setIngresosGenerados(Number(e.target.value))}
              disabled={isLoading}
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="0.00"
              step="0.01"
              min="0"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <DollarSign className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="estado" className="block text-sm font-semibold text-gray-700">
            Estado
          </label>
          <div className="relative">
            <select
              id="estado"
              name="estado"
              value={estado}
              onChange={(e) => setEstado(e.target.value as 'activo' | 'pausado')}
              disabled={isLoading}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed appearance-none cursor-pointer"
            >
              <option value="activo">🟢 Activo</option>
              <option value="pausado">⏸️ Pausado</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
        <div className="md:col-span-2 flex justify-end">
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: isLoading ? 1 : 1.05 }}
            whileTap={{ scale: isLoading ? 1 : 0.95 }}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Creando...
              </>
            ) : (
              <>
                <Plus className="w-5 h-5" />
                Crear Membresía
              </>
            )}
          </motion.button>
        </div>
        </form>
      </div>
    </motion.div>
  );
};

export default CrearMembresia;
