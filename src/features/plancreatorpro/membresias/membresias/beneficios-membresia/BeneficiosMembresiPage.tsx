import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Sparkles, Eye, Edit3, List, Award } from 'lucide-react';

const BeneficiosMembresiPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
      >
        {/* Efectos de fondo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <Gift className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Gestión de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Beneficios</span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
            Define y organiza los <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">beneficios exclusivos</span> de cada nivel de membresía
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Edit3 className="w-5 h-5 text-emerald-300" />
              <span className="text-sm font-semibold text-white">Editor Visual</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Eye className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">Vista Previa en Tiempo Real</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Award className="w-5 h-5 text-purple-300" />
              <span className="text-sm font-semibold text-white">Comparativa de Niveles</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Contenido Principal */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor de Beneficios */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
          >
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-xl">
                  <List className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Editor de Beneficios</h2>
              </div>

              <p className="text-gray-600 mb-4">
                Aquí se integrará el componente <span className="font-semibold text-indigo-600">EditorBeneficios</span> con lista editable y switches ON/OFF
              </p>

              <div className="space-y-2">
                <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                  <span className="text-sm font-bold text-purple-700">• Editor visual por niveles</span>
                </div>
                <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                  <span className="text-sm font-bold text-blue-700">• Lista editable con switches</span>
                </div>
                <div className="p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
                  <span className="text-sm font-bold text-emerald-700">• Plantillas predefinidas</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Vista Previa */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
          >
            <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-gradient-to-br from-indigo-200 to-blue-200 rounded-full blur-3xl opacity-20"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-xl">
                  <Eye className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Vista Previa</h2>
              </div>

              <p className="text-gray-600 mb-4">
                Aquí se integrará el componente <span className="font-semibold text-emerald-600">VistaPreviaMembresia</span> con actualización en tiempo real
              </p>

              <div className="p-6 bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl border border-gray-200">
                <p className="text-sm text-gray-500 text-center">Vista previa en tiempo real de los beneficios configurados</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Comparativa entre Niveles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-6 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
        >
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-xl">
                <Award className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Comparativa entre Niveles</h2>
            </div>

            <p className="text-gray-600">
              Aquí se mostrará una comparativa visual de los beneficios entre diferentes niveles de membresía
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BeneficiosMembresiPage;
