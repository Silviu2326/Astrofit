
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, User, Target, MessageSquare } from 'lucide-react';
import { agenteComunicacionApi, MessageTone } from '../agenteComunicacionApi';

interface GeneradorMensajesProps {
  onMensajeGenerado?: (mensaje: string) => void;
}

const GeneradorMensajes: React.FC<GeneradorMensajesProps> = ({ onMensajeGenerado }) => {
  const [tipoMensaje, setTipoMensaje] = useState<string>('bienvenida');
  const [clienteObjetivo, setClienteObjetivo] = useState<string>('');
  const [objetivo, setObjetivo] = useState<string>('');
  const [tone, setTone] = useState<MessageTone>('warm');
  const [loading, setLoading] = useState<boolean>(false);

  const tiposMensaje = [
    { value: 'bienvenida', label: 'Bienvenida' },
    { value: 'seguimiento', label: 'Seguimiento' },
    { value: 'motivacion', label: 'Motivación' },
    { value: 'recordatorio', label: 'Recordatorio' },
    { value: 'felicitacion', label: 'Felicitación' },
    { value: 'recuperacion', label: 'Recuperación' }
  ];

  const tonos = [
    { value: 'warm', label: 'Cálido' },
    { value: 'technical', label: 'Formal' },
    { value: 'motivational', label: 'Motivador' }
  ];

  const handleGenerateMessage = async () => {
    setLoading(true);
    try {
      const content = `${tipoMensaje} - Cliente: ${clienteObjetivo || 'General'} - Objetivo: ${objetivo || 'Sin objetivo específico'}`;
      const message = await agenteComunicacionApi.generateMessage(content, tone, 'medium');

      if (onMensajeGenerado) {
        onMensajeGenerado(message);
      }
    } catch (error) {
      console.error('Error generating message:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden"
    >
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Sparkles className="w-6 h-6" />
          </div>
          Generador de Mensajes
        </h3>
      </div>

      {/* Body */}
      <div className="p-6 space-y-4">
        {/* Tipo de mensaje */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-pink-500" />
            Tipo de Mensaje
          </label>
          <select
            value={tipoMensaje}
            onChange={(e) => setTipoMensaje(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
          >
            {tiposMensaje.map((tipo) => (
              <option key={tipo.value} value={tipo.value}>
                {tipo.label}
              </option>
            ))}
          </select>
        </div>

        {/* Cliente objetivo */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <User className="w-4 h-4 text-rose-500" />
            Cliente Objetivo
          </label>
          <input
            type="text"
            value={clienteObjetivo}
            onChange={(e) => setClienteObjetivo(e.target.value)}
            placeholder="Nombre del cliente (opcional)"
            className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
          />
        </div>

        {/* Objetivo del mensaje */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Target className="w-4 h-4 text-orange-500" />
            Objetivo del Mensaje
          </label>
          <textarea
            value={objetivo}
            onChange={(e) => setObjetivo(e.target.value)}
            placeholder="¿Qué quieres lograr con este mensaje?"
            rows={3}
            className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm resize-none"
          />
        </div>

        {/* Tono */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Tono del Mensaje
          </label>
          <div className="grid grid-cols-3 gap-3">
            {tonos.map((tonoOption) => (
              <button
                key={tonoOption.value}
                onClick={() => setTone(tonoOption.value as MessageTone)}
                className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  tone === tonoOption.value
                    ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tonoOption.label}
              </button>
            ))}
          </div>
        </div>

        {/* Botón generar */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGenerateMessage}
          disabled={loading}
          className="w-full relative overflow-hidden bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-4 text-white font-bold group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          <div className="relative z-10 flex items-center justify-center gap-2">
            <Sparkles className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Generando mensaje...' : 'Generar Mensaje'}
          </div>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default GeneradorMensajes;
