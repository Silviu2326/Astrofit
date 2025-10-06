// src/features/cuestionario-diario/components/IntervencionesAutomaticas.tsx
import React from 'react';
import { Shield, UserCheck, Phone, AlertCircle } from 'lucide-react';

const IntervencionesAutomaticas: React.FC = () => {
  const intervenciones = [
    { tipo: 'Activa', titulo: 'Sesión con psicólogo deportivo recomendada', prioridad: 'alta', icono: UserCheck },
    { tipo: 'Preventiva', titulo: 'Técnicas de manejo de estrés sugeridas', prioridad: 'media', icono: Shield }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 border border-white/50 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Header con icono */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Intervenciones Automáticas</h2>
        </div>

        <p className="text-gray-600 mb-6 leading-relaxed">
          Sistema inteligente de intervenciones automáticas y derivación a psicólogo deportivo
        </p>

        {/* Lista de intervenciones */}
        <div className="space-y-4 mb-6">
          {intervenciones.map((interv, index) => (
            <div
              key={index}
              className={`p-5 rounded-2xl border transition-all duration-300 ${
                interv.prioridad === 'alta'
                  ? 'bg-gradient-to-r from-orange-50 to-red-50 border-orange-200'
                  : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-2xl shadow-lg flex-shrink-0 ${
                  interv.prioridad === 'alta'
                    ? 'bg-gradient-to-br from-orange-500 to-red-500'
                    : 'bg-gradient-to-br from-blue-500 to-indigo-500'
                }`}>
                  <interv.icono className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      interv.prioridad === 'alta'
                        ? 'bg-orange-500 text-white'
                        : 'bg-blue-500 text-white'
                    }`}>
                      {interv.tipo}
                    </span>
                    {interv.prioridad === 'alta' && (
                      <AlertCircle className="w-4 h-4 text-orange-600" />
                    )}
                  </div>
                  <p className="text-sm font-semibold text-gray-800 mb-2">{interv.titulo}</p>
                  {interv.prioridad === 'alta' && (
                    <button className="mt-2 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold text-sm hover:shadow-lg transition-all duration-300">
                      <Phone className="w-4 h-4" />
                      <span>Contactar ahora</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Panel de contacto de emergencia */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-4 border-2 border-red-200">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-red-500 rounded-xl">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-800 mb-1">Línea de soporte 24/7</p>
              <p className="text-sm text-gray-600 mb-2">
                Si necesitas atención inmediata, nuestro equipo de psicólogos deportivos está disponible
              </p>
              <a
                href="tel:+123456789"
                className="inline-block px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold text-sm hover:shadow-lg transition-all duration-300"
              >
                Llamar: +1 234 567 89
              </a>
            </div>
          </div>
        </div>

        {/* Badge de protección */}
        <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full shadow-lg">
          <Shield className="w-4 h-4" />
          <span className="text-sm font-bold">Sistema de protección activo</span>
        </div>
      </div>
    </div>
  );
};

export default IntervencionesAutomaticas;
