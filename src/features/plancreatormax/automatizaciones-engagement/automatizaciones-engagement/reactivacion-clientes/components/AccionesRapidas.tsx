import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Gift, MessageSquare, Zap, Send } from 'lucide-react';

interface AccionRapida {
  id: string;
  titulo: string;
  descripcion: string;
  icono: any;
  color: string;
  gradiente: string;
}

const AccionesRapidas: React.FC = () => {
  const acciones: AccionRapida[] = [
    {
      id: 'email',
      titulo: 'Enviar Email',
      descripcion: 'Campaña de reactivación personalizada',
      icono: Mail,
      color: 'blue',
      gradiente: 'from-blue-500 to-indigo-500'
    },
    {
      id: 'sms',
      titulo: 'Enviar SMS',
      descripcion: 'Mensaje de texto directo',
      icono: MessageSquare,
      color: 'green',
      gradiente: 'from-green-500 to-emerald-500'
    },
    {
      id: 'llamada',
      titulo: 'Programar Llamada',
      descripcion: 'Contacto telefónico personal',
      icono: Phone,
      color: 'purple',
      gradiente: 'from-purple-500 to-pink-500'
    },
    {
      id: 'oferta',
      titulo: 'Enviar Oferta',
      descripcion: 'Descuento especial de reactivación',
      icono: Gift,
      color: 'orange',
      gradiente: 'from-orange-500 to-amber-500'
    },
    {
      id: 'automatico',
      titulo: 'Secuencia Automática',
      descripcion: 'Activar flujo multi-canal',
      icono: Zap,
      color: 'yellow',
      gradiente: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'personalizado',
      titulo: 'Mensaje Personalizado',
      descripcion: 'Crear comunicación única',
      icono: Send,
      color: 'teal',
      gradiente: 'from-teal-500 to-cyan-500'
    }
  ];

  const handleAccion = (accionId: string) => {
    console.log(`Ejecutando acción: ${accionId}`);
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden">
      <div className="absolute -right-12 -top-12 w-48 h-48 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        <div className="mb-6">
          <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-1">
            Acciones Rápidas
          </h3>
          <p className="text-sm text-gray-600">Reactivación con un solo clic</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {acciones.map((accion, index) => {
            const Icono = accion.icono;

            return (
              <motion.button
                key={accion.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAccion(accion.id)}
                className={`relative overflow-hidden bg-gradient-to-br ${accion.gradiente} rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-5 text-left group border border-white/20`}
              >
                {/* Efecto hover */}
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

                {/* Decoración */}
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                      <Icono className="w-6 h-6 text-white" />
                    </div>
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>

                  <h4 className="text-lg font-bold text-white mb-1">
                    {accion.titulo}
                  </h4>
                  <p className="text-sm text-white/80 leading-relaxed">
                    {accion.descripcion}
                  </p>

                  {/* Indicador de hover */}
                  <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                      <div className="h-full bg-white rounded-full w-1/3 group-hover:w-full transition-all duration-500"></div>
                    </div>
                    <span className="text-xs text-white font-semibold">Ejecutar →</span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Estadísticas rápidas */}
        <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xs text-gray-600 mb-1">Esta Semana</p>
              <p className="text-2xl font-bold text-purple-600">24</p>
              <p className="text-xs text-gray-500">acciones</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Tasa Éxito</p>
              <p className="text-2xl font-bold text-green-600">68%</p>
              <p className="text-xs text-gray-500">efectividad</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Respuestas</p>
              <p className="text-2xl font-bold text-blue-600">16</p>
              <p className="text-xs text-gray-500">clientes</p>
            </div>
          </div>
        </div>

        {/* Sugerencia automática */}
        <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-l-4 border-purple-500">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-purple-500 rounded-lg">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-800 mb-1">Sugerencia de IA</p>
              <p className="text-sm text-gray-700">
                Enviar email emotivo tiene <span className="font-bold text-purple-600">85% probabilidad</span> de éxito con este segmento
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccionesRapidas;
