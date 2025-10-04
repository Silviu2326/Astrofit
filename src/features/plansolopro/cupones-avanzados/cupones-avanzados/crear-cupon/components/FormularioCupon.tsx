import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tag, Percent, DollarSign, Calendar, Users, Sparkles, RefreshCw, CheckCircle } from 'lucide-react';

interface CuponData {
  nombre: string;
  codigo: string;
  tipo: 'porcentaje' | 'cantidadFija';
  valor: number;
  fechaInicio: string;
  fechaFin: string;
  usosPermitidos: number;
  usosIlimitados: boolean;
  clientesValidos: 'todos' | 'especificos';
  clientesEspecificos?: string[];
}

interface FormularioCuponProps {
  cuponData: CuponData;
  onFormChange: (data: Partial<CuponData>) => void;
}

const FormularioCupon: React.FC<FormularioCuponProps> = ({ cuponData, onFormChange }) => {
  const [codigoGenerado, setCodigoGenerado] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onFormChange({ [name]: value });
  };

  const generarCodigoAleatorio = () => {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let codigo = '';
    for (let i = 0; i < 8; i++) {
      codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    onFormChange({ codigo });
    setCodigoGenerado(true);
    setTimeout(() => setCodigoGenerado(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden"
    >
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-fuchsia-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>

      {/* Header */}
      <div className="relative z-10 mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-xl text-white">
            <Tag className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Detalles del Cupón</h2>
        </div>
        <p className="text-sm text-gray-600">Configura la información básica de tu promoción</p>
      </div>

      <div className="relative z-10 space-y-6">
        {/* Nombre del cupón */}
        <div>
          <label htmlFor="nombre" className="block text-sm font-semibold text-gray-700 mb-2">
            Nombre del Cupón
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={cuponData.nombre}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
            placeholder="ej. Descuento de Verano"
            required
          />
        </div>

        {/* Código del cupón con generador */}
        <div>
          <label htmlFor="codigo" className="block text-sm font-semibold text-gray-700 mb-2">
            Código del Cupón
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              id="codigo"
              name="codigo"
              value={cuponData.codigo}
              onChange={handleChange}
              className="flex-1 px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm uppercase font-mono"
              placeholder="ej. VERANO2025"
              required
            />
            <motion.button
              type="button"
              onClick={generarCodigoAleatorio}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-3 bg-gradient-to-br from-fuchsia-500 to-purple-600 text-white rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
            >
              {codigoGenerado ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span className="hidden sm:inline">Listo</span>
                </>
              ) : (
                <>
                  <RefreshCw className="w-5 h-5" />
                  <span className="hidden sm:inline">Generar</span>
                </>
              )}
            </motion.button>
          </div>
        </div>

        {/* Tipo de descuento y valor */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="tipo" className="block text-sm font-semibold text-gray-700 mb-2">
              Tipo de Descuento
            </label>
            <div className="relative">
              <select
                id="tipo"
                name="tipo"
                value={cuponData.tipo}
                onChange={handleChange}
                className="w-full px-4 py-3 pl-12 rounded-2xl border-2 border-gray-200 focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm appearance-none"
              >
                <option value="porcentaje">Porcentaje</option>
                <option value="cantidadFija">Cantidad Fija</option>
              </select>
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-fuchsia-600">
                {cuponData.tipo === 'porcentaje' ? (
                  <Percent className="w-5 h-5" />
                ) : (
                  <DollarSign className="w-5 h-5" />
                )}
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="valor" className="block text-sm font-semibold text-gray-700 mb-2">
              Valor del Descuento
            </label>
            <div className="relative">
              <input
                type="number"
                id="valor"
                name="valor"
                value={cuponData.valor || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                placeholder="0"
                min="0"
                max={cuponData.tipo === 'porcentaje' ? 100 : undefined}
                required
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-bold">
                {cuponData.tipo === 'porcentaje' ? '%' : '€'}
              </div>
            </div>
          </div>
        </div>

        {/* Fechas de validez */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-fuchsia-600" />
            Período de Validez
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="fechaInicio" className="block text-xs text-gray-600 mb-1">Fecha de Inicio</label>
              <input
                type="date"
                id="fechaInicio"
                name="fechaInicio"
                value={cuponData.fechaInicio}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="fechaFin" className="block text-xs text-gray-600 mb-1">Fecha de Fin</label>
              <input
                type="date"
                id="fechaFin"
                name="fechaFin"
                value={cuponData.fechaFin}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                required
              />
            </div>
          </div>
        </div>

        {/* Límites de uso */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Límites de Uso
          </label>

          {/* Toggle para usos ilimitados */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-fuchsia-50 rounded-2xl mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-semibold text-gray-700">Usos Ilimitados</span>
            </div>
            <button
              type="button"
              onClick={() => onFormChange({ usosIlimitados: !cuponData.usosIlimitados })}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                cuponData.usosIlimitados ? 'bg-gradient-to-r from-fuchsia-500 to-purple-600' : 'bg-gray-300'
              }`}
            >
              <motion.div
                animate={{ x: cuponData.usosIlimitados ? 24 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md"
              />
            </button>
          </div>

          {!cuponData.usosIlimitados && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <label htmlFor="usosPermitidos" className="block text-xs text-gray-600 mb-1">
                Número de Usos Permitidos
              </label>
              <input
                type="number"
                id="usosPermitidos"
                name="usosPermitidos"
                value={cuponData.usosPermitidos || 1}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                min="1"
                disabled={cuponData.usosIlimitados}
                required={!cuponData.usosIlimitados}
              />
            </motion.div>
          )}
        </div>

        {/* Clientes válidos */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Users className="w-4 h-4 text-fuchsia-600" />
            Clientes Válidos
          </label>
          <select
            id="clientesValidos"
            name="clientesValidos"
            value={cuponData.clientesValidos}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm appearance-none"
          >
            <option value="todos">Todos los clientes</option>
            <option value="especificos">Clientes específicos</option>
          </select>
        </div>

        {/* Campo condicional para clientes específicos */}
        {cuponData.clientesValidos === 'especificos' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <label htmlFor="clientesEspecificos" className="block text-sm font-semibold text-gray-700 mb-2">
              IDs de Clientes (separados por comas)
            </label>
            <input
              type="text"
              id="clientesEspecificos"
              name="clientesEspecificos"
              value={cuponData.clientesEspecificos?.join(',') || ''}
              onChange={(e) => onFormChange({ clientesEspecificos: e.target.value.split(',').map(s => s.trim()).filter(s => s !== '') })}
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm font-mono text-sm"
              placeholder="ej. C001, C002, C003"
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default FormularioCupon;
