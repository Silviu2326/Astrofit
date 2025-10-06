import React from 'react';
import { motion } from 'framer-motion';
import { 
  Tag, 
  Percent, 
  Euro, 
  Calendar, 
  Users, 
  Hash,
  Target,
  Clock,
  UserCheck
} from 'lucide-react';

interface CuponData {
  nombre: string;
  tipo: 'porcentaje' | 'cantidadFija';
  valor: number;
  fechaInicio: string;
  fechaFin: string;
  usosPermitidos: number;
  clientesValidos: 'todos' | 'especificos';
  clientesEspecificos?: string[];
}

interface FormularioCuponProps {
  cuponData: CuponData;
  onFormChange: (data: Partial<CuponData>) => void;
}

const FormularioCupon: React.FC<FormularioCuponProps> = ({ cuponData, onFormChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onFormChange({ [name]: value });
  };

  const handleNumericChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onFormChange({ [name]: parseFloat(value) || 0 });
  };

  const handleUsosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onFormChange({ [name]: parseInt(value) || 1 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mb-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg shadow-lg">
          <Tag className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Detalles del Cupón</h2>
      </div>

      <div className="space-y-6">
        {/* Nombre del Cupón */}
        <div>
          <label htmlFor="nombre" className="block text-sm font-semibold text-gray-700 mb-2">
            Nombre del Cupón
          </label>
          <div className="relative">
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={cuponData.nombre}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Ej: Descuento de Verano 2024"
              required
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Tag className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Tipo de Descuento */}
        <div>
          <label htmlFor="tipo" className="block text-sm font-semibold text-gray-700 mb-2">
            Tipo de Descuento
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => onFormChange({ tipo: 'porcentaje' })}
              className={`p-4 rounded-lg border-2 transition-all ${
                cuponData.tipo === 'porcentaje'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <Percent className="w-5 h-5" />
                <span className="font-medium">Porcentaje</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Ej: 20% de descuento</p>
            </button>
            
            <button
              type="button"
              onClick={() => onFormChange({ tipo: 'cantidadFija' })}
              className={`p-4 rounded-lg border-2 transition-all ${
                cuponData.tipo === 'cantidadFija'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <Euro className="w-5 h-5" />
                <span className="font-medium">Cantidad Fija</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Ej: €10 de descuento</p>
            </button>
          </div>
        </div>

        {/* Valor */}
        <div>
          <label htmlFor="valor" className="block text-sm font-semibold text-gray-700 mb-2">
            {cuponData.tipo === 'porcentaje' ? 'Porcentaje de Descuento' : 'Cantidad de Descuento'}
          </label>
          <div className="relative">
            <input
              type="number"
              id="valor"
              name="valor"
              value={cuponData.valor}
              onChange={handleNumericChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              min="0"
              max={cuponData.tipo === 'porcentaje' ? 100 : undefined}
              step={cuponData.tipo === 'porcentaje' ? 0.1 : 0.01}
              required
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              {cuponData.tipo === 'porcentaje' ? (
                <Percent className="w-5 h-5 text-gray-400" />
              ) : (
                <Euro className="w-5 h-5 text-gray-400" />
              )}
            </div>
          </div>
          {cuponData.tipo === 'porcentaje' && cuponData.valor > 0 && (
            <p className="text-sm text-gray-600 mt-1">
              El cliente pagará {100 - cuponData.valor}% del precio original
            </p>
          )}
        </div>

        {/* Fechas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="fechaInicio" className="block text-sm font-semibold text-gray-700 mb-2">
              Fecha de Inicio
            </label>
            <div className="relative">
              <input
                type="date"
                id="fechaInicio"
                name="fechaInicio"
                value={cuponData.fechaInicio}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Calendar className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="fechaFin" className="block text-sm font-semibold text-gray-700 mb-2">
              Fecha de Fin
            </label>
            <div className="relative">
              <input
                type="date"
                id="fechaFin"
                name="fechaFin"
                value={cuponData.fechaFin}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Calendar className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Usos Permitidos */}
        <div>
          <label htmlFor="usosPermitidos" className="block text-sm font-semibold text-gray-700 mb-2">
            Número de Usos Permitidos
          </label>
          <div className="relative">
            <input
              type="number"
              id="usosPermitidos"
              name="usosPermitidos"
              value={cuponData.usosPermitidos}
              onChange={handleUsosChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              min="1"
              required
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Hash className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Número de veces que se puede usar este cupón
          </p>
        </div>

        {/* Clientes Válidos */}
        <div>
          <label htmlFor="clientesValidos" className="block text-sm font-semibold text-gray-700 mb-2">
            Clientes Válidos
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => onFormChange({ clientesValidos: 'todos' })}
              className={`p-4 rounded-lg border-2 transition-all ${
                cuponData.clientesValidos === 'todos'
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span className="font-medium">Todos los Clientes</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Cualquier cliente puede usar</p>
            </button>
            
            <button
              type="button"
              onClick={() => onFormChange({ clientesValidos: 'especificos' })}
              className={`p-4 rounded-lg border-2 transition-all ${
                cuponData.clientesValidos === 'especificos'
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <UserCheck className="w-5 h-5" />
                <span className="font-medium">Clientes Específicos</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Solo clientes seleccionados</p>
            </button>
          </div>
        </div>

        {/* Clientes Específicos */}
        {cuponData.clientesValidos === 'especificos' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <label htmlFor="clientesEspecificos" className="block text-sm font-semibold text-gray-700 mb-2">
              IDs de Clientes Específicos
            </label>
            <div className="relative">
              <input
                type="text"
                id="clientesEspecificos"
                name="clientesEspecificos"
                value={cuponData.clientesEspecificos?.join(', ') || ''}
                onChange={(e) => onFormChange({ clientesEspecificos: e.target.value.split(',').map(s => s.trim()).filter(s => s) })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Ej: 123, 456, 789"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Target className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Separa los IDs con comas (ej: 123, 456, 789)
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default FormularioCupon;
