import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Image, Copy, CheckCircle, Share2, Mail, Printer } from 'lucide-react';

const ResultadosExport: React.FC = () => {
  const [exportStatus, setExportStatus] = useState<string | null>(null);
  const [copiedToClipboard, setCopiedToClipboard] = useState<boolean>(false);

  const handleExportPDF = () => {
    setExportStatus('Generando PDF...');
    setTimeout(() => {
      setExportStatus('✓ PDF generado con éxito');
      console.log('Exporting to PDF...');
      // Aquí iría la lógica real de exportación a PDF
    }, 1500);
  };

  const handleExportImage = () => {
    setExportStatus('Generando imagen...');
    setTimeout(() => {
      setExportStatus('✓ Imagen generada con éxito');
      console.log('Exporting to Image...');
      // Aquí iría la lógica real de exportación a imagen
    }, 1500);
  };

  const handleCopyToClipboard = () => {
    const mockData = `
=== RESULTADOS CALCULADORAS NUTRICIONALES ===
TDEE: 2,340 kcal/día
Macros: Proteína 150g | Carbohidratos 200g | Grasas 67g
Hidratación: 2.45 litros/día
Fibra: 30g/día
=========================================
    `;

    navigator.clipboard.writeText(mockData).then(() => {
      setCopiedToClipboard(true);
      setExportStatus('✓ Copiado al portapapeles');
      setTimeout(() => setCopiedToClipboard(false), 3000);
    });
  };

  const handleShare = () => {
    setExportStatus('Preparando para compartir...');
    setTimeout(() => {
      setExportStatus('✓ Listo para compartir');
      console.log('Sharing results...');
    }, 1000);
  };

  const exportOptions = [
    {
      icon: FileText,
      label: 'Exportar PDF',
      description: 'Documento profesional completo',
      color: 'red',
      action: handleExportPDF
    },
    {
      icon: Image,
      label: 'Exportar Imagen',
      description: 'Formato PNG de alta calidad',
      color: 'purple',
      action: handleExportImage
    },
    {
      icon: Copy,
      label: 'Copiar Resultados',
      description: 'Copiar al portapapeles',
      color: 'blue',
      action: handleCopyToClipboard
    },
    {
      icon: Share2,
      label: 'Compartir',
      description: 'Compartir vía email o redes',
      color: 'green',
      action: handleShare
    }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-green-200 to-teal-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl shadow-lg">
            <Download className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Exportar Resultados</h2>
            <p className="text-sm text-gray-600">Guarda o comparte tus cálculos nutricionales</p>
          </div>
        </div>

        {/* Opciones de exportación */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {exportOptions.map((option, index) => {
            const Icon = option.icon;
            const colorClasses = {
              red: 'from-red-500 to-pink-600',
              purple: 'from-purple-500 to-pink-600',
              blue: 'from-blue-500 to-cyan-600',
              green: 'from-green-500 to-teal-600'
            };

            return (
              <motion.button
                key={option.label}
                onClick={option.action}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="relative overflow-hidden bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-transparent hover:shadow-2xl transition-all duration-300 text-left group"
              >
                {/* Gradient overlay en hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses[option.color as keyof typeof colorClasses]} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                <div className="relative z-10">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 bg-gradient-to-br ${colorClasses[option.color as keyof typeof colorClasses]} rounded-xl shadow-lg group-hover:bg-white/20 transition-all`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 group-hover:text-white transition-colors mb-1">
                        {option.label}
                      </h3>
                      <p className="text-sm text-gray-600 group-hover:text-white/90 transition-colors">
                        {option.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
              </motion.button>
            );
          })}
        </div>

        {/* Status de exportación */}
        {exportStatus && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-2xl flex items-center gap-3 mb-6 ${
              exportStatus.startsWith('✓')
                ? 'bg-green-50 border-2 border-green-200'
                : 'bg-blue-50 border-2 border-blue-200'
            }`}
          >
            {exportStatus.startsWith('✓') ? (
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            ) : (
              <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin flex-shrink-0"></div>
            )}
            <p className={`font-semibold ${
              exportStatus.startsWith('✓') ? 'text-green-800' : 'text-blue-800'
            }`}>
              {exportStatus}
            </p>
          </motion.div>
        )}

        {/* Opciones adicionales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Enviar por email */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200 hover:border-blue-400 transition-all"
          >
            <div className="p-2 bg-blue-500 rounded-lg">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="font-bold text-gray-900 text-sm">Enviar por Email</p>
              <p className="text-xs text-gray-600">Compartir con tu nutricionista</p>
            </div>
          </motion.button>

          {/* Imprimir */}
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl border border-gray-200 hover:border-gray-400 transition-all"
          >
            <div className="p-2 bg-gray-500 rounded-lg">
              <Printer className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="font-bold text-gray-900 text-sm">Imprimir</p>
              <p className="text-xs text-gray-600">Versión imprimible</p>
            </div>
          </motion.button>
        </div>

        {/* Información */}
        <div className="p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl border border-teal-200">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-teal-500 rounded-lg flex-shrink-0">
              <Download className="w-5 h-5 text-white" />
            </div>
            <div className="text-sm text-teal-900">
              <p className="font-semibold mb-2">¿Qué se incluye en la exportación?</p>
              <ul className="space-y-1 text-teal-800">
                <li>• Todos los resultados de las calculadoras</li>
                <li>• Gráficos y visualizaciones</li>
                <li>• Recomendaciones personalizadas</li>
                <li>• Fecha y hora del cálculo</li>
                <li>• Distribuciones y tablas nutricionales</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Nota técnica */}
        <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-200">
          <p className="text-xs text-blue-800">
            <strong>Nota:</strong> En producción, estas funciones se conectarían a servicios de generación de PDF (como jsPDF), captura de pantalla (html2canvas), y APIs de compartir. Los datos se guardarían en el backend para historial persistente.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultadosExport;
