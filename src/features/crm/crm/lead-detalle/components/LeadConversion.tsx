import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';

interface LeadConversionProps {
  onConvert: () => void;
}

const LeadConversion: React.FC<LeadConversionProps> = ({ onConvert }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Convertir a Cliente</h2>
      </div>

      {/* Main conversion card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600 rounded-2xl p-8 shadow-xl"
      >
        {/* Background decorations */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl mb-6 ring-4 ring-white/30"
          >
            <UserCheck className="w-10 h-10 text-white" />
          </motion.div>

          <h3 className="text-2xl font-bold text-white mb-3">
            ¿Listo para convertir este lead?
          </h3>
          <p className="text-purple-100 mb-8 max-w-md mx-auto">
            Una vez convertido, toda la información se transferirá al perfil de cliente y podrás gestionar su cuenta completa.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onConvert}
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-purple-600 font-bold text-lg rounded-xl shadow-2xl hover:shadow-white/20 transition-all duration-300"
          >
            <Sparkles className="w-5 h-5" />
            Convertir a Cliente
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>

      {/* Benefits cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Historial Completo</h4>
              <p className="text-sm text-gray-600">Todas las interacciones se mantienen</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Gestión Avanzada</h4>
              <p className="text-sm text-gray-600">Acceso a todas las funciones de CRM</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Sin Pérdida de Datos</h4>
              <p className="text-sm text-gray-600">Toda la información se transfiere</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Info notice */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-blue-50 border border-blue-200 rounded-lg p-4"
      >
        <p className="text-sm text-blue-800">
          <span className="font-semibold">Nota:</span> Esta acción no se puede deshacer. Asegúrate de haber completado toda la información necesaria antes de convertir el lead.
        </p>
      </motion.div>
    </div>
  );
};

export default LeadConversion;
