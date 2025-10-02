import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, ChevronRight, ChevronLeft, Check, Sparkles,
  Target, Users, DollarSign, Calendar, Mail, MessageSquare,
  Smartphone, Globe, FileText, Image as ImageIcon
} from 'lucide-react';
import { CanalCampana } from '../types';

interface CrearCampanaProps {
  onClose: () => void;
}

const CrearCampana: React.FC<CrearCampanaProps> = ({ onClose }) => {
  const [paso, setPaso] = useState(1);
  const [nombre, setNombre] = useState('');
  const [objetivo, setObjetivo] = useState('');
  const [audiencia, setAudiencia] = useState('');
  const [canal, setCanal] = useState<CanalCampana>('email');
  const [presupuesto, setPresupuesto] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [contenido, setContenido] = useState('');

  const totalPasos = 5;

  const canales = [
    { id: 'email' as CanalCampana, nombre: 'Email', icono: Mail, color: 'from-blue-500 to-cyan-600' },
    { id: 'redes' as CanalCampana, nombre: 'Redes Sociales', icono: MessageSquare, color: 'from-purple-500 to-pink-600' },
    { id: 'SMS' as CanalCampana, nombre: 'SMS', icono: Smartphone, color: 'from-green-500 to-emerald-600' },
    { id: 'web' as CanalCampana, nombre: 'Web', icono: Globe, color: 'from-indigo-500 to-violet-600' },
    { id: 'mixto' as CanalCampana, nombre: 'Mixto', icono: Sparkles, color: 'from-fuchsia-500 to-purple-600' }
  ];

  const templates = [
    { id: 'promo', nombre: 'Promoción', emoji: '🏷️', descripcion: 'Descuentos y ofertas especiales' },
    { id: 'lanzamiento', nombre: 'Lanzamiento', emoji: '🚀', descripcion: 'Nuevo producto o servicio' },
    { id: 'engagement', nombre: 'Engagement', emoji: '💬', descripcion: 'Interacción con audiencia' },
    { id: 'retencion', nombre: 'Retención', emoji: '🔄', descripcion: 'Fidelización de clientes' },
    { id: 'awareness', nombre: 'Awareness', emoji: '📢', descripcion: 'Conocimiento de marca' }
  ];

  const siguientePaso = () => {
    if (paso < totalPasos) setPaso(paso + 1);
  };

  const pasoAnterior = () => {
    if (paso > 1) setPaso(paso - 1);
  };

  const handleSubmit = () => {
    // Aquí iría la lógica para guardar la campaña
    alert('¡Campaña creada exitosamente! 🎉');
    onClose();
  };

  const renderPaso = () => {
    switch (paso) {
      case 1:
        return (
          <motion.div
            key="paso1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Nombre de la Campaña</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej: Black Friday 2025"
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Objetivo Principal</label>
              <textarea
                value={objetivo}
                onChange={(e) => setObjetivo(e.target.value)}
                placeholder="Describe qué quieres lograr con esta campaña..."
                rows={4}
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">Template Sugerido</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {templates.map((template) => (
                  <motion.button
                    key={template.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-4 rounded-2xl border-2 border-gray-200 hover:border-violet-400 hover:bg-violet-50 transition-all text-left"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{template.emoji}</span>
                      <span className="font-bold text-gray-900">{template.nombre}</span>
                    </div>
                    <p className="text-sm text-gray-600">{template.descripcion}</p>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="paso2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Audiencia Objetivo</label>
              <textarea
                value={audiencia}
                onChange={(e) => setAudiencia(e.target.value)}
                placeholder="Define tu público objetivo (edad, intereses, comportamiento...)"
                rows={4}
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">Segmentos Rápidos</label>
              <div className="flex flex-wrap gap-2">
                {['Nuevos clientes', 'Clientes recurrentes', 'Abandonaron carrito', 'VIPs', 'Millennials', 'Gen Z', 'B2B'].map((segmento) => (
                  <button
                    key={segmento}
                    onClick={() => setAudiencia(audiencia + (audiencia ? ', ' : '') + segmento)}
                    className="px-4 py-2 bg-gradient-to-r from-violet-50 to-purple-50 rounded-full border border-violet-200 hover:border-violet-400 transition-all text-sm font-semibold text-violet-700"
                  >
                    + {segmento}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="paso3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">Selecciona el Canal</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {canales.map((canalItem) => {
                  const Icon = canalItem.icono;
                  const seleccionado = canal === canalItem.id;
                  return (
                    <motion.button
                      key={canalItem.id}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setCanal(canalItem.id)}
                      className={`p-6 rounded-2xl border-2 transition-all ${
                        seleccionado
                          ? 'border-violet-500 bg-gradient-to-br from-violet-50 to-purple-50 shadow-lg'
                          : 'border-gray-200 hover:border-violet-300'
                      }`}
                    >
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${canalItem.color} flex items-center justify-center text-white mb-3 mx-auto shadow-lg`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <h3 className="font-bold text-gray-900 mb-1">{canalItem.nombre}</h3>
                      {seleccionado && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="mt-2"
                        >
                          <Check className="w-5 h-5 text-violet-600 mx-auto" />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            key="paso4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Presupuesto Total (USD)</label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  value={presupuesto}
                  onChange={(e) => setPresupuesto(e.target.value)}
                  placeholder="10000"
                  className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Fecha de Inicio</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={fechaInicio}
                    onChange={(e) => setFechaInicio(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Fecha de Fin</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={fechaFin}
                    onChange={(e) => setFechaFin(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                  />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl p-4 border border-violet-200">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-violet-600" />
                <span className="font-bold text-violet-900">Proyección Estimada</span>
              </div>
              <p className="text-sm text-gray-700">
                Con un presupuesto de ${presupuesto || '0'}, podrías alcanzar aproximadamente{' '}
                <span className="font-bold text-violet-700">
                  {presupuesto ? (parseInt(presupuesto) * 50).toLocaleString() : '0'}
                </span>{' '}
                impresiones.
              </p>
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            key="paso5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Contenido del Mensaje</label>
              <textarea
                value={contenido}
                onChange={(e) => setContenido(e.target.value)}
                placeholder="Escribe el mensaje principal de tu campaña..."
                rows={6}
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 rounded-2xl border-2 border-dashed border-gray-300 hover:border-violet-400 hover:bg-violet-50 transition-all flex flex-col items-center gap-2 text-gray-600 hover:text-violet-600"
              >
                <ImageIcon className="w-8 h-8" />
                <span className="text-sm font-semibold">Agregar Imagen</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 rounded-2xl border-2 border-dashed border-gray-300 hover:border-violet-400 hover:bg-violet-50 transition-all flex flex-col items-center gap-2 text-gray-600 hover:text-violet-600"
              >
                <FileText className="w-8 h-8" />
                <span className="text-sm font-semibold">Agregar CTA</span>
              </motion.button>
            </div>

            {/* Preview */}
            <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6 border border-violet-200">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-violet-600" />
                <h3 className="font-bold text-violet-900">Vista Previa</h3>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md">
                <h4 className="font-bold text-gray-900 mb-2">{nombre || 'Nombre de la campaña'}</h4>
                <p className="text-sm text-gray-700 mb-3">{contenido || 'Tu mensaje aparecerá aquí...'}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="px-2 py-1 bg-violet-100 rounded-full text-violet-700 font-semibold">
                    {canal.toUpperCase()}
                  </span>
                  <span>•</span>
                  <span>{audiencia || 'Audiencia no definida'}</span>
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-8 border border-white/50 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-violet-200 to-fuchsia-200 rounded-full blur-3xl opacity-20"></div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl text-white shadow-lg">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-600">
              Crear Nueva Campaña
            </h2>
            <p className="text-sm text-gray-600">Paso {paso} de {totalPasos}</p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
        >
          <X className="w-6 h-6 text-gray-600" />
        </motion.button>
      </div>

      {/* Progress Bar */}
      <div className="relative z-10 mb-8">
        <div className="flex gap-2">
          {Array.from({ length: totalPasos }).map((_, idx) => (
            <div
              key={idx}
              className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                idx < paso
                  ? 'bg-gradient-to-r from-violet-500 to-purple-600'
                  : 'bg-gray-200'
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* Contenido del paso */}
      <div className="relative z-10 mb-8">
        <AnimatePresence mode="wait">
          {renderPaso()}
        </AnimatePresence>
      </div>

      {/* Botones de navegación */}
      <div className="relative z-10 flex gap-3">
        {paso > 1 && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={pasoAnterior}
            className="flex items-center gap-2 px-6 py-3 border-2 border-violet-300 text-violet-700 rounded-2xl font-semibold hover:bg-violet-50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Anterior
          </motion.button>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={paso === totalPasos ? handleSubmit : siguientePaso}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-2xl font-semibold hover:shadow-lg transition-all"
        >
          {paso === totalPasos ? (
            <>
              <Check className="w-5 h-5" />
              Crear Campaña
            </>
          ) : (
            <>
              Siguiente
              <ChevronRight className="w-5 h-5" />
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default CrearCampana;
