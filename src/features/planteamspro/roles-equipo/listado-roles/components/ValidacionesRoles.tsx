import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

const ValidacionesRoles: React.FC = () => {
  const validaciones = [
    { estado: 'success', texto: 'Todos los roles tienen permisos válidos', icono: CheckCircle2 },
    { estado: 'warning', texto: 'Revisar conflictos de horarios', icono: AlertTriangle },
    { estado: 'error', texto: 'Falta asignar rol a 2 miembros', icono: XCircle },
  ];

  const getColorClasses = (estado: string) => {
    const colores = {
      success: { bg: 'from-green-50 to-emerald-50', border: 'border-green-200', icon: 'from-green-500 to-emerald-600', text: 'text-green-700' },
      warning: { bg: 'from-orange-50 to-yellow-50', border: 'border-orange-200', icon: 'from-orange-500 to-yellow-600', text: 'text-orange-700' },
      error: { bg: 'from-red-50 to-pink-50', border: 'border-red-200', icon: 'from-red-500 to-pink-600', text: 'text-red-700' },
    };
    return colores[estado as keyof typeof colores] || colores.success;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
    >
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <h2 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <ShieldCheck className="w-6 h-6" />
          </div>
          Validaciones
        </h2>
      </div>

      {/* Body */}
      <div className="p-6 space-y-3">
        {validaciones.map((val, index) => {
          const Icono = val.icono;
          const colores = getColorClasses(val.estado);
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className={`flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r ${colores.bg} border ${colores.border}`}
            >
              <div className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${colores.icon} flex items-center justify-center shadow-lg`}>
                <Icono className="w-5 h-5 text-white" />
              </div>
              <p className={`text-sm font-medium ${colores.text} flex-1 pt-1`}>{val.texto}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ValidacionesRoles;
