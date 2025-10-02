import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, FileText, Settings, Link, Save, CheckCircle2, Copy } from 'lucide-react';

const GuiaPasoAPaso: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      icon: Settings,
      title: 'Accede a tu proveedor de dominio',
      number: 1,
      description: 'Inicia sesión en el panel de control de tu registrador de dominios (ej: GoDaddy, Namecheap, Cloudflare).',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: FileText,
      title: 'Localiza la configuración DNS',
      number: 2,
      description: 'Busca la sección de "Gestión de DNS", "Editor de Zona DNS" o similar.',
      color: 'from-indigo-500 to-purple-600'
    },
    {
      icon: Link,
      title: 'Añade un registro CNAME',
      number: 3,
      description: 'Crea un nuevo registro CNAME con los siguientes valores:',
      color: 'from-purple-500 to-pink-600',
      details: (
        <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-2 bg-white/60 rounded-lg">
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-600">Tipo</p>
                <p className="font-mono font-bold text-gray-900">CNAME</p>
              </div>
              <Copy className="w-4 h-4 text-purple-600 cursor-pointer hover:text-purple-700" />
            </div>
            <div className="flex items-center justify-between p-2 bg-white/60 rounded-lg">
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-600">Host/Nombre</p>
                <p className="font-mono font-bold text-gray-900">www</p>
              </div>
              <Copy className="w-4 h-4 text-purple-600 cursor-pointer hover:text-purple-700" />
            </div>
            <div className="flex items-center justify-between p-2 bg-white/60 rounded-lg">
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-600">Valor/Apuntado a</p>
                <p className="font-mono font-bold text-gray-900 break-all">tudominio.micrositio.com</p>
              </div>
              <Copy className="w-4 h-4 text-purple-600 cursor-pointer hover:text-purple-700" />
            </div>
            <div className="flex items-center justify-between p-2 bg-white/60 rounded-lg">
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-600">TTL</p>
                <p className="font-mono font-bold text-gray-900">3600 segundos (Automático)</p>
              </div>
              <Copy className="w-4 h-4 text-purple-600 cursor-pointer hover:text-purple-700" />
            </div>
          </div>
        </div>
      )
    },
    {
      icon: Save,
      title: 'Guarda los cambios',
      number: 4,
      description: 'Asegúrate de guardar la configuración DNS. Los cambios pueden tardar hasta 48 horas en propagarse.',
      color: 'from-pink-500 to-red-600'
    },
    {
      icon: CheckCircle2,
      title: 'Verifica el dominio',
      number: 5,
      description: 'Una vez guardados los cambios, vuelve a esta página y usa el verificador automático de dominio.',
      color: 'from-green-500 to-emerald-600'
    },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-2">
            <FileText className="w-7 h-7 text-indigo-600" />
            Guía de Configuración DNS
          </h2>
          <p className="text-sm text-gray-600">Sigue estos pasos para conectar tu dominio</p>
        </div>

        {/* Steps accordion */}
        <div className="space-y-3">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="border border-gray-200 rounded-2xl overflow-hidden hover:border-indigo-300 transition-colors"
            >
              <button
                className="flex items-center justify-between w-full text-left p-4 bg-gradient-to-r from-gray-50 to-white hover:from-indigo-50 hover:to-purple-50 transition-all duration-300"
                onClick={() => setActiveStep(index + 1 === activeStep ? 0 : index + 1)}
              >
                <div className="flex items-center gap-4 flex-1">
                  {/* Número de paso con gradiente */}
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold shadow-lg flex-shrink-0`}>
                    {step.number}
                  </div>

                  {/* Título */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 text-sm md:text-base">{step.title}</h3>
                  </div>
                </div>

                {/* Icono de expandir */}
                <div className="flex-shrink-0 ml-4">
                  {activeStep === index + 1 ? (
                    <ChevronUp className="w-5 h-5 text-indigo-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {activeStep === index + 1 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 pt-0 bg-white">
                      <div className="pl-14">
                        <p className="text-sm text-gray-700 leading-relaxed">{step.description}</p>
                        {step.details && <div className="mt-2">{step.details}</div>}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Progress indicator */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-blue-900 mb-1">Verificación Automática</p>
              <p className="text-xs text-blue-700">
                Una vez configurado tu dominio, nuestro sistema lo verificará automáticamente.
                Puedes refrescar la página para ver el estado actualizado.
              </p>
            </div>
          </div>
        </div>

        {/* Troubleshooting guide */}
        <div className="mt-4 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl border border-orange-200">
          <p className="text-xs font-semibold text-orange-900 mb-2">⚠️ Solución de Problemas</p>
          <ul className="text-xs text-orange-700 space-y-1">
            <li>• Los cambios DNS pueden tardar hasta 48 horas en propagarse completamente</li>
            <li>• Verifica que no existan registros conflictivos en tu DNS</li>
            <li>• Contacta a soporte si el dominio no se verifica después de 48 horas</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GuiaPasoAPaso;
