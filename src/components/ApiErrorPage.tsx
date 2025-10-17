import React from 'react';
import { motion } from 'framer-motion';
import { Wifi, WifiOff, RefreshCw, AlertTriangle, Home } from 'lucide-react';

interface ApiErrorPageProps {
  error?: string;
  onRetry?: () => void;
  onGoHome?: () => void;
}

const ApiErrorPage: React.FC<ApiErrorPageProps> = ({ 
  error = 'Error de conexión con el servidor', 
  onRetry, 
  onGoHome 
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50/30 to-orange-50/30 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-white/50 relative overflow-hidden">
          {/* Decoración de fondo */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-red-200 to-orange-200 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-gradient-to-br from-orange-200 to-red-200 rounded-full blur-3xl opacity-20"></div>
          
          <div className="relative z-10 text-center">
            {/* Icono animado */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative mb-8"
            >
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center">
                <WifiOff className="w-12 h-12 text-red-500" />
              </div>
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 w-24 h-24 mx-auto bg-red-200 rounded-full blur-lg"
              />
            </motion.div>

            {/* Título */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Problema de Conexión
            </motion.h1>

            {/* Descripción */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-lg text-gray-600 mb-8 leading-relaxed"
            >
              {error}
            </motion.p>

            {/* Información adicional */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8"
            >
              <div className="flex items-center gap-3 mb-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <span className="font-semibold text-amber-800">Posibles causas:</span>
              </div>
              <ul className="text-sm text-amber-700 text-left space-y-1">
                <li>• El servidor no está disponible</li>
                <li>• Problemas de conectividad a internet</li>
                <li>• El backend está en mantenimiento</li>
                <li>• Configuración incorrecta de la API</li>
              </ul>
            </motion.div>

            {/* Botones de acción */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              {onRetry && (
                <button
                  onClick={onRetry}
                  className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors font-semibold"
                >
                  <RefreshCw className="w-5 h-5" />
                  Reintentar Conexión
                </button>
              )}
              
              {onGoHome && (
                <button
                  onClick={onGoHome}
                  className="flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors font-semibold"
                >
                  <Home className="w-5 h-5" />
                  Ir al Inicio
                </button>
              )}
            </motion.div>

            {/* Información técnica */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-8 pt-6 border-t border-gray-200"
            >
              <details className="text-left">
                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700 transition-colors">
                  Información técnica
                </summary>
                <div className="mt-3 text-xs text-gray-500 space-y-1">
                  <p><strong>URL de API:</strong> {import.meta.env.VITE_API_URL || 'No configurada'}</p>
                  <p><strong>Timestamp:</strong> {new Date().toLocaleString()}</p>
                  <p><strong>User Agent:</strong> {navigator.userAgent.split(' ')[0]}</p>
                </div>
              </details>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ApiErrorPage;
