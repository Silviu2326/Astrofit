import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, FileText, List, CheckCircle, AlertCircle } from 'lucide-react';
import { crearReto } from '../retosHabitosApi';

const CreadorRetos: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [reglas, setReglas] = useState<string>('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const newReto = await crearReto({
        nombre,
        descripcion,
        reglas: reglas.split('\n').filter(rule => rule.trim() !== ''),
        fechaInicio,
        fechaFin,
      });
      setSuccess(`Reto '${newReto.nombre}' creado con éxito!`);
      setNombre('');
      setDescripcion('');
      setReglas('');
      setFechaInicio('');
      setFechaFin('');
    } catch (err) {
      setError('Error al crear el reto. Inténtalo de nuevo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-gradient-to-br from-indigo-200 to-blue-200 rounded-full blur-3xl opacity-20"></div>

      {/* Dots pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(99,102,241,0.3) 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      <div className="relative z-10">
        {/* Encabezado con icono */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Crear Nuevo Reto</h3>
            <p className="text-sm text-gray-600">Define tu próximo desafío</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nombre del Reto */}
          <div>
            <label htmlFor="nombre" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <FileText className="w-4 h-4 text-indigo-500" />
              Nombre del Reto
            </label>
            <input
              type="text"
              id="nombre"
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
              placeholder="Ej: 30 Días de Meditación"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          {/* Descripción */}
          <div>
            <label htmlFor="descripcion" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <FileText className="w-4 h-4 text-indigo-500" />
              Descripción
            </label>
            <textarea
              id="descripcion"
              rows={3}
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm resize-none"
              placeholder="Describe el objetivo y beneficios del reto..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Reglas */}
          <div>
            <label htmlFor="reglas" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <List className="w-4 h-4 text-indigo-500" />
              Reglas (una por línea)
            </label>
            <textarea
              id="reglas"
              rows={4}
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm resize-none"
              placeholder="Meditar al menos 10 minutos diarios&#10;Registrar progreso cada día&#10;No saltarse más de 2 días consecutivos"
              value={reglas}
              onChange={(e) => setReglas(e.target.value)}
            ></textarea>
          </div>

          {/* Fechas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="fechaInicio" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Calendar className="w-4 h-4 text-green-500" />
                Fecha de Inicio
              </label>
              <input
                type="date"
                id="fechaInicio"
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="fechaFin" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Calendar className="w-4 h-4 text-red-500" />
                Fecha de Fin
              </label>
              <input
                type="date"
                id="fechaFin"
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Botón de Submit */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full relative overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-4 text-white font-semibold group border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {/* Efecto hover */}
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

            {/* Decoración */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

            <div className="relative z-10 flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creando Reto...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Crear Reto</span>
                </>
              )}
            </div>
          </motion.button>
        </form>

        {/* Mensajes de Error y Éxito */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-xl flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700 font-medium">{error}</p>
          </motion.div>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-green-50 border-l-4 border-green-500 rounded-xl flex items-start gap-3"
          >
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-green-700 font-medium">{success}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CreadorRetos;
