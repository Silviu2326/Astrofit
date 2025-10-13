import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, ChevronRight, ChevronLeft, Check, Sparkles,
  Target, Users, DollarSign, Calendar, Mail, MessageSquare,
  Smartphone, Globe, FileText, Image as ImageIcon, Instagram,
  Youtube, Linkedin, Facebook, Send, TrendingUp, Tag, Zap, Twitter
} from 'lucide-react';
import { CanalCampana } from '../types';
import { createCampana } from '../campanasApi';

interface CrearCampanaProps {
  onClose: () => void;
  onSuccess?: () => void;
}

const CrearCampana: React.FC<CrearCampanaProps> = ({ onClose, onSuccess }) => {
  const [paso, setPaso] = useState(1);
  const [nombre, setNombre] = useState('');
  const [objetivo, setObjetivo] = useState('');
  const [audiencia, setAudiencia] = useState('');
  const [canal, setCanal] = useState<CanalCampana>('email');
  const [presupuesto, setPresupuesto] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [contenido, setContenido] = useState('');
  const [templateSeleccionado, setTemplateSeleccionado] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [callToAction, setCallToAction] = useState('');
  const [frecuencia, setFrecuencia] = useState('unica');
  const [horarioPublicacion, setHorarioPublicacion] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const totalPasos = 6;

  const canales = [
    { id: 'email' as CanalCampana, nombre: 'Email', icono: Mail, color: 'from-blue-500 to-cyan-600', descripcion: 'Marketing por correo' },
    { id: 'instagram' as CanalCampana, nombre: 'Instagram', icono: Instagram, color: 'from-pink-500 to-rose-600', descripcion: 'Historias y posts' },
    { id: 'facebook' as CanalCampana, nombre: 'Facebook', icono: Facebook, color: 'from-blue-600 to-indigo-600', descripcion: 'Ads y publicaciones' },
    { id: 'tiktok' as CanalCampana, nombre: 'TikTok', icono: MessageSquare, color: 'from-slate-800 to-slate-900', descripcion: 'Videos virales' },
    { id: 'youtube' as CanalCampana, nombre: 'YouTube', icono: Youtube, color: 'from-red-500 to-red-700', descripcion: 'Video marketing' },
    { id: 'linkedin' as CanalCampana, nombre: 'LinkedIn', icono: Linkedin, color: 'from-blue-700 to-blue-900', descripcion: 'B2B y profesional' },
    { id: 'twitter' as CanalCampana, nombre: 'Twitter/X', icono: Twitter, color: 'from-sky-500 to-blue-600', descripcion: 'Tweets y threads' },
    { id: 'whatsapp' as CanalCampana, nombre: 'WhatsApp', icono: MessageSquare, color: 'from-green-500 to-emerald-600', descripcion: 'Mensajería directa' },
    { id: 'telegram' as CanalCampana, nombre: 'Telegram', icono: Send, color: 'from-sky-400 to-cyan-500', descripcion: 'Canales y grupos' },
    { id: 'SMS' as CanalCampana, nombre: 'SMS', icono: Smartphone, color: 'from-green-600 to-teal-600', descripcion: 'Mensajes de texto' },
    { id: 'web' as CanalCampana, nombre: 'Web', icono: Globe, color: 'from-indigo-500 to-violet-600', descripcion: 'Sitio web y banners' },
    { id: 'mixto' as CanalCampana, nombre: 'Multicanal', icono: Sparkles, color: 'from-fuchsia-500 to-purple-600', descripcion: 'Varios canales' }
  ];

  const templates = [
    { id: 'promo', nombre: 'Promoción', emoji: '🏷️', descripcion: 'Descuentos y ofertas especiales' },
    { id: 'lanzamiento', nombre: 'Lanzamiento', emoji: '🚀', descripcion: 'Nuevo producto o servicio' },
    { id: 'engagement', nombre: 'Engagement', emoji: '💬', descripcion: 'Interacción con audiencia' },
    { id: 'retencion', nombre: 'Retención', emoji: '🔄', descripcion: 'Fidelización de clientes' },
    { id: 'awareness', nombre: 'Awareness', emoji: '📢', descripcion: 'Conocimiento de marca' },
    { id: 'evento', nombre: 'Evento', emoji: '🎉', descripcion: 'Promoción de eventos' },
    { id: 'educativo', nombre: 'Educativo', emoji: '🎓', descripcion: 'Contenido formativo' },
    { id: 'storytelling', nombre: 'Storytelling', emoji: '📖', descripcion: 'Narrativa de marca' }
  ];

  const siguientePaso = () => {
    if (paso < totalPasos) setPaso(paso + 1);
  };

  const pasoAnterior = () => {
    if (paso > 1) setPaso(paso - 1);
  };

  const handleSubmit = async () => {
    // Validar campos requeridos
    if (!nombre.trim()) {
      alert('Por favor ingresa el nombre de la campaña');
      return;
    }
    if (!objetivo.trim()) {
      alert('Por favor describe el objetivo de la campaña');
      return;
    }
    if (!audiencia.trim()) {
      alert('Por favor define la audiencia objetivo');
      return;
    }
    if (!presupuesto || parseFloat(presupuesto) <= 0) {
      alert('Por favor ingresa un presupuesto válido');
      return;
    }
    if (!fechaInicio) {
      alert('Por favor selecciona la fecha de inicio');
      return;
    }
    if (!fechaFin) {
      alert('Por favor selecciona la fecha de fin');
      return;
    }
    if (!contenido.trim()) {
      alert('Por favor escribe el contenido del mensaje');
      return;
    }

    try {
      setIsLoading(true);

      // Crear la campaña usando la API
      await createCampana({
        nombre,
        objetivo,
        audienciaObjetivo: audiencia,
        canal,
        presupuesto: parseFloat(presupuesto),
        fechaInicio,
        fechaFin,
        contenido,
        hashtags,
        callToAction,
        frecuencia: frecuencia as 'unica' | 'diaria' | 'semanal' | 'mensual',
        horarioPublicacion,
        templateSeleccionado,
        estado: 'Programada',
        presupuestoUtilizado: 0,
        impresiones: 0,
        clicks: 0,
        conversiones: 0,
        ctr: 0,
        cpc: 0,
        cpa: 0,
        roi: 0
      });

      alert('¡Campaña creada exitosamente! 🎉');
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Error al crear campaña:', error);
      alert(error instanceof Error ? error.message : 'Error al crear la campaña');
    } finally {
      setIsLoading(false);
    }
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
                    onClick={() => setTemplateSeleccionado(template.id)}
                    className={`p-4 rounded-2xl border-2 transition-all text-left ${
                      templateSeleccionado === template.id
                        ? 'border-violet-500 bg-gradient-to-br from-violet-50 to-purple-50 shadow-lg'
                        : 'border-gray-200 hover:border-violet-400 hover:bg-violet-50'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{template.emoji}</span>
                      <span className="font-bold text-gray-900">{template.nombre}</span>
                      {templateSeleccionado === template.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-auto"
                        >
                          <Check className="w-5 h-5 text-violet-600" />
                        </motion.div>
                      )}
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
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-h-96 overflow-y-auto pr-2">
                {canales.map((canalItem) => {
                  const Icon = canalItem.icono;
                  const seleccionado = canal === canalItem.id;
                  return (
                    <motion.button
                      key={canalItem.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCanal(canalItem.id)}
                      className={`p-4 rounded-2xl border-2 transition-all relative ${
                        seleccionado
                          ? 'border-violet-500 bg-gradient-to-br from-violet-50 to-purple-50 shadow-lg'
                          : 'border-gray-200 hover:border-violet-300'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${canalItem.color} flex items-center justify-center text-white mb-2 mx-auto shadow-lg`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold text-gray-900 text-sm mb-1">{canalItem.nombre}</h3>
                      <p className="text-xs text-gray-600">{canalItem.descripcion}</p>
                      {seleccionado && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-2 -right-2 bg-violet-600 rounded-full p-1"
                        >
                          <Check className="w-4 h-4 text-white" />
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
                rows={5}
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Llamado a la Acción (CTA)</label>
                <select
                  value={callToAction}
                  onChange={(e) => setCallToAction(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                >
                  <option value="">Selecciona un CTA</option>
                  <option value="Comprar Ahora">Comprar Ahora</option>
                  <option value="Saber Más">Saber Más</option>
                  <option value="Registrarse">Registrarse</option>
                  <option value="Descargar">Descargar</option>
                  <option value="Contactar">Contactar</option>
                  <option value="Ver Oferta">Ver Oferta</option>
                  <option value="Únete">Únete</option>
                  <option value="Solicitar Demo">Solicitar Demo</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Hashtags (opcional)</label>
                <input
                  type="text"
                  value={hashtags}
                  onChange={(e) => setHashtags(e.target.value)}
                  placeholder="#marketing #digital #promo"
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  alert('Funcionalidad de subir imagen próximamente');
                }}
                className="p-4 rounded-2xl border-2 border-dashed border-gray-300 hover:border-violet-400 hover:bg-violet-50 transition-all flex flex-col items-center gap-2 text-gray-600 hover:text-violet-600"
              >
                <ImageIcon className="w-8 h-8" />
                <span className="text-sm font-semibold">Agregar Imagen</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  alert('Funcionalidad de adjuntar archivo próximamente');
                }}
                className="p-4 rounded-2xl border-2 border-dashed border-gray-300 hover:border-violet-400 hover:bg-violet-50 transition-all flex flex-col items-center gap-2 text-gray-600 hover:text-violet-600"
              >
                <FileText className="w-8 h-8" />
                <span className="text-sm font-semibold">Adjuntar Archivo</span>
              </motion.button>
            </div>
          </motion.div>
        );

      case 6:
        return (
          <motion.div
            key="paso6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">Frecuencia de Publicación</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'unica', nombre: 'Única', descripcion: 'Una sola publicación' },
                  { id: 'diaria', nombre: 'Diaria', descripcion: 'Todos los días' },
                  { id: 'semanal', nombre: 'Semanal', descripcion: 'Una vez por semana' }
                ].map((frec) => (
                  <motion.button
                    key={frec.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setFrecuencia(frec.id)}
                    className={`p-4 rounded-2xl border-2 transition-all text-left ${
                      frecuencia === frec.id
                        ? 'border-violet-500 bg-gradient-to-br from-violet-50 to-purple-50 shadow-lg'
                        : 'border-gray-200 hover:border-violet-400'
                    }`}
                  >
                    <h4 className="font-bold text-gray-900 mb-1">{frec.nombre}</h4>
                    <p className="text-xs text-gray-600">{frec.descripcion}</p>
                    {frecuencia === frec.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="mt-2"
                      >
                        <Check className="w-5 h-5 text-violet-600" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Horario de Publicación (opcional)</label>
              <input
                type="time"
                value={horarioPublicacion}
                onChange={(e) => setHorarioPublicacion(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
              />
            </div>

            {/* Vista Previa Completa */}
            <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6 border border-violet-200">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-violet-600" />
                <h3 className="font-bold text-violet-900">Vista Previa Final</h3>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-md space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-gray-900 text-lg">{nombre || 'Nombre de la campaña'}</h4>
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${canales.find(c => c.id === canal)?.color || 'from-gray-400 to-gray-500'}`}>
                    {React.createElement(canales.find(c => c.id === canal)?.icono || Target, { className: "w-5 h-5 text-white" })}
                  </div>
                </div>
                <p className="text-sm text-gray-700">{contenido || 'Tu mensaje aparecerá aquí...'}</p>
                {hashtags && (
                  <p className="text-sm text-violet-600 font-semibold">{hashtags}</p>
                )}
                {callToAction && (
                  <button className="w-full py-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-xl font-semibold">
                    {callToAction}
                  </button>
                )}
                <div className="flex flex-wrap gap-2 text-xs text-gray-500 pt-3 border-t">
                  <span className="px-3 py-1 bg-violet-100 rounded-full text-violet-700 font-semibold">
                    {canal.toUpperCase()}
                  </span>
                  <span className="px-3 py-1 bg-blue-100 rounded-full text-blue-700 font-semibold">
                    {audiencia || 'Audiencia no definida'}
                  </span>
                  <span className="px-3 py-1 bg-green-100 rounded-full text-green-700 font-semibold">
                    ${presupuesto || '0'}
                  </span>
                  <span className="px-3 py-1 bg-orange-100 rounded-full text-orange-700 font-semibold">
                    {frecuencia}
                  </span>
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
          disabled={isLoading}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-2xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {paso === totalPasos ? (
            <>
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creando...
                </>
              ) : (
                <>
                  <Check className="w-5 h-5" />
                  Crear Campaña
                </>
              )}
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
