// Sistema alertas médicas condiciones especiales
import { motion } from 'framer-motion';
import { AlertCircle, Heart, Activity } from 'lucide-react';

const AlertasMedicas = () => {
  const alertas = [
    { tipo: 'Importante', mensaje: 'Revisión cardiovascular programada para el 15/12/2024', prioridad: 'alta' },
    { tipo: 'Recordatorio', mensaje: 'Actualizar certificado médico deportivo', prioridad: 'media' },
    { tipo: 'Información', mensaje: 'Sin alergias conocidas registradas', prioridad: 'baja' }
  ];

  const getPriorityColor = (prioridad: string) => {
    switch (prioridad) {
      case 'alta': return { bg: 'from-red-50 to-pink-50', border: 'border-red-200', icon: 'from-red-500 to-pink-600', text: 'text-red-600' };
      case 'media': return { bg: 'from-orange-50 to-yellow-50', border: 'border-orange-200', icon: 'from-orange-500 to-yellow-600', text: 'text-orange-600' };
      case 'baja': return { bg: 'from-blue-50 to-indigo-50', border: 'border-blue-200', icon: 'from-blue-500 to-indigo-600', text: 'text-blue-600' };
      default: return { bg: 'from-gray-50 to-gray-100', border: 'border-gray-200', icon: 'from-gray-500 to-gray-600', text: 'text-gray-600' };
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50">
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-red-500 via-pink-500 to-orange-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <h3 className="text-2xl font-bold text-white flex items-center gap-3 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <AlertCircle className="w-7 h-7" />
          </div>
          Alertas Médicas
        </h3>
        <p className="text-red-100 mt-2 relative z-10">Sistema de alertas para condiciones médicas especiales</p>
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="space-y-4">
          {alertas.map((alerta, index) => {
            const colors = getPriorityColor(alerta.prioridad);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className={`p-4 rounded-2xl bg-gradient-to-r ${colors.bg} border ${colors.border} hover:shadow-md transition-all duration-300`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 bg-gradient-to-br ${colors.icon} rounded-lg shadow-lg`}>
                    <AlertCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className={`font-bold text-sm uppercase tracking-wider mb-1 ${colors.text}`}>
                      {alerta.tipo}
                    </p>
                    <p className="text-gray-900 font-medium">{alerta.mensaje}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AlertasMedicas;
