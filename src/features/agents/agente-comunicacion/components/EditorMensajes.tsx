
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit3, Bold, Italic, Smile, Mail, MessageCircle, Smartphone, Bell, Type } from 'lucide-react';

interface EditorMensajesProps {
  mensajeInicial?: string;
  onMensajeEditado?: (mensaje: string) => void;
}

const EditorMensajes: React.FC<EditorMensajesProps> = ({ mensajeInicial = '', onMensajeEditado }) => {
  const [mensaje, setMensaje] = useState<string>(mensajeInicial);
  const [canal, setCanal] = useState<'email' | 'sms' | 'whatsapp' | 'push'>('email');

  useEffect(() => {
    setMensaje(mensajeInicial);
  }, [mensajeInicial]);

  const handleMensajeChange = (value: string) => {
    setMensaje(value);
    if (onMensajeEditado) {
      onMensajeEditado(value);
    }
  };

  const insertarVariable = (variable: string) => {
    const newMensaje = mensaje + ` {{${variable}}}`;
    handleMensajeChange(newMensaje);
  };

  const canales = [
    { id: 'email', label: 'Email', icon: Mail, color: 'text-blue-500' },
    { id: 'sms', label: 'SMS', icon: Smartphone, color: 'text-green-500' },
    { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle, color: 'text-emerald-500' },
    { id: 'push', label: 'Push', icon: Bell, color: 'text-purple-500' }
  ];

  const variables = ['nombre', 'objetivo', 'progreso', 'proxima_sesion'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden"
    >
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-orange-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Edit3 className="w-6 h-6" />
          </div>
          Editor de Mensajes
        </h3>
      </div>

      {/* Body */}
      <div className="p-6 space-y-4">
        {/* Toolbar de edición */}
        <div className="flex flex-wrap gap-2 p-3 bg-gradient-to-r from-rose-50 to-orange-50 rounded-2xl border border-rose-200">
          <button
            className="p-2 bg-white rounded-lg hover:bg-rose-100 transition-colors duration-200 border border-rose-200"
            title="Negrita"
          >
            <Bold className="w-4 h-4 text-gray-700" />
          </button>
          <button
            className="p-2 bg-white rounded-lg hover:bg-rose-100 transition-colors duration-200 border border-rose-200"
            title="Cursiva"
          >
            <Italic className="w-4 h-4 text-gray-700" />
          </button>
          <button
            className="p-2 bg-white rounded-lg hover:bg-rose-100 transition-colors duration-200 border border-rose-200"
            title="Emoji"
          >
            <Smile className="w-4 h-4 text-gray-700" />
          </button>

          <div className="flex-1"></div>

          {/* Variables dinámicas */}
          <div className="flex items-center gap-2">
            <Type className="w-4 h-4 text-gray-600" />
            <span className="text-xs font-semibold text-gray-600">Variables:</span>
            {variables.map((variable) => (
              <button
                key={variable}
                onClick={() => insertarVariable(variable)}
                className="px-2 py-1 bg-white text-xs font-semibold text-rose-600 rounded-lg hover:bg-rose-100 transition-colors duration-200 border border-rose-200"
              >
                {`{{${variable}}}`}
              </button>
            ))}
          </div>
        </div>

        {/* Editor textarea */}
        <div className="relative">
          <textarea
            value={mensaje}
            onChange={(e) => handleMensajeChange(e.target.value)}
            placeholder="Escribe o edita tu mensaje aquí..."
            rows={8}
            className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm resize-none"
          />
          <div className="absolute bottom-3 right-3 text-xs text-gray-500 font-medium bg-white/80 px-2 py-1 rounded-lg">
            {mensaje.length} caracteres
          </div>
        </div>

        {/* Vista previa por canal */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Vista Previa por Canal
          </label>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {canales.map((canalOption) => (
              <button
                key={canalOption.id}
                onClick={() => setCanal(canalOption.id as typeof canal)}
                className={`px-3 py-2 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  canal === canalOption.id
                    ? 'bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <canalOption.icon className="w-4 h-4" />
                <span className="text-xs">{canalOption.label}</span>
              </button>
            ))}
          </div>

          {/* Preview */}
          <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl p-6 border-2 border-gray-200">
            {canal === 'email' && (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-rose-500 to-orange-500 p-4 text-white">
                  <p className="text-sm font-semibold">De: El Copy Fitness</p>
                  <p className="text-sm">Para: cliente@ejemplo.com</p>
                </div>
                <div className="p-4">
                  <p className="text-gray-800 whitespace-pre-wrap text-sm">{mensaje || 'Tu mensaje aparecerá aquí...'}</p>
                </div>
              </div>
            )}

            {canal === 'sms' && (
              <div className="max-w-xs mx-auto">
                <div className="bg-white rounded-2xl shadow-lg p-4 border-2 border-green-200">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white text-xs font-bold">
                      CF
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-gray-600 mb-1">El Copy Fitness</p>
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-3 border border-green-200">
                        <p className="text-sm text-gray-800 whitespace-pre-wrap">{mensaje || 'Tu mensaje aparecerá aquí...'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {canal === 'whatsapp' && (
              <div className="max-w-xs mx-auto bg-[#e5ddd5] rounded-2xl p-4">
                <div className="bg-[#dcf8c6] rounded-lg p-3 shadow-md">
                  <p className="text-sm text-gray-800 whitespace-pre-wrap">{mensaje || 'Tu mensaje aparecerá aquí...'}</p>
                  <p className="text-xs text-gray-500 mt-1 text-right">12:34</p>
                </div>
              </div>
            )}

            {canal === 'push' && (
              <div className="max-w-sm mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-4 border-2 border-purple-200">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                      <Bell className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-gray-800">El Copy Fitness</p>
                      <p className="text-xs text-gray-600 line-clamp-3 mt-1">{mensaje || 'Tu mensaje aparecerá aquí...'}</p>
                      <p className="text-xs text-gray-400 mt-1">Ahora</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EditorMensajes;
