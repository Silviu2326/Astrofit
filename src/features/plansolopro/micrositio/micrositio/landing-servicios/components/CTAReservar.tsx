
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Phone, Mail, Calendar } from 'lucide-react';

interface CTAReservarProps {
  brandColors: { primary: string; secondary: string; accent: string };
}

const CTAReservar: React.FC<CTAReservarProps> = ({ brandColors }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-4">
          ¿Listo para transformar tu vida?
        </h2>
        <p className="text-xl text-gray-600">Contáctanos y comienza tu viaje hacia una mejor versión de ti</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formulario de contacto */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden"
        >
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl text-white">
                <Send className="w-6 h-6" />
              </div>
              Envíanos un mensaje
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre completo</label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                  placeholder="Juan Pérez"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                  placeholder="juan@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Teléfono</label>
                <input
                  type="tel"
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                  placeholder="+34 600 000 000"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Mensaje</label>
                <textarea
                  value={formData.mensaje}
                  onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm resize-none"
                  placeholder="Cuéntanos sobre tus objetivos..."
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Enviar mensaje
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Información de contacto y mapa */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="space-y-6"
        >
          {/* Info de contacto */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Información de Contacto</h3>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 group">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl text-white group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Ubicación</p>
                  <p className="text-gray-600">Calle Principal 123, Madrid</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 group">
                <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl text-white group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Teléfono</p>
                  <p className="text-gray-600">+34 600 123 456</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 group">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl text-white group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Email</p>
                  <p className="text-gray-600">contacto@trainer.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 group">
                <div className="p-3 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl text-white group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Horario</p>
                  <p className="text-gray-600">Lun-Vie: 7:00 - 22:00</p>
                  <p className="text-gray-600">Sáb: 9:00 - 14:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mapa placeholder */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 h-64 relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 opacity-20"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-indigo-600 mx-auto mb-3" />
                <p className="text-gray-700 font-semibold">Mapa de ubicación</p>
                <p className="text-sm text-gray-600">Vista interactiva disponible</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTAReservar;
