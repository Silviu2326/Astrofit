
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Gauge, Lightbulb, RefreshCw } from 'lucide-react';

interface AnalizadorTonoProps {
  mensaje: string;
}

const AnalizadorTono: React.FC<AnalizadorTonoProps> = ({ mensaje }) => {
  // Análisis simulado del tono del mensaje
  const analisis = useMemo(() => {
    const longitud = mensaje.length;
    const tieneEmojis = /[\u{1F300}-\u{1F9FF}]/u.test(mensaje);
    const tienePreguntasAbiertas = mensaje.includes('?');
    const tieneExclamaciones = mensaje.includes('!');
    const palabrasMotivadoras = ['éxito', 'logro', 'felicidades', 'excelente', 'campeón', 'genial', 'increíble'].some(p => mensaje.toLowerCase().includes(p));

    return {
      profesionalismo: Math.min(100, 60 + (longitud > 50 ? 20 : 0) + (tieneEmojis ? -10 : 10)),
      empatia: Math.min(100, 50 + (tienePreguntasAbiertas ? 25 : 0) + (tieneEmojis ? 15 : 0)),
      motivacion: Math.min(100, 40 + (palabrasMotivadoras ? 30 : 0) + (tieneExclamaciones ? 20 : 0)),
      claridad: Math.min(100, longitud > 0 && longitud < 300 ? 80 : 50)
    };
  }, [mensaje]);

  const sugerencias = useMemo(() => {
    const sug: string[] = [];

    if (analisis.profesionalismo < 60) {
      sug.push('Considera usar un lenguaje más formal y evitar demasiados emojis.');
    }
    if (analisis.empatia < 60) {
      sug.push('Agrega preguntas que muestren interés por el cliente.');
    }
    if (analisis.motivacion < 60) {
      sug.push('Incluye palabras motivadoras o felicitaciones para inspirar.');
    }
    if (analisis.claridad < 60) {
      sug.push('El mensaje podría ser más claro. Intenta ser más conciso o específico.');
    }

    if (sug.length === 0) {
      sug.push('¡Excelente mensaje! El tono es equilibrado y efectivo.');
    }

    return sug;
  }, [analisis]);

  const GaugeCircular = ({ value, label, color }: { value: number; label: string; color: string }) => {
    const circumference = 2 * Math.PI * 40;
    const offset = circumference - (value / 100) * circumference;

    return (
      <div className="flex flex-col items-center">
        <div className="relative w-24 h-24">
          <svg className="transform -rotate-90 w-24 h-24">
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-gray-200"
            />
            <motion.circle
              cx="48"
              cy="48"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className={color}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-gray-800">{value}%</span>
          </div>
        </div>
        <p className="text-sm font-semibold text-gray-700 mt-2">{label}</p>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden"
    >
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Gauge className="w-6 h-6" />
          </div>
          Análisis de Tono
        </h3>
      </div>

      {/* Body */}
      <div className="p-6 space-y-6">
        {/* Gauges */}
        <div className="grid grid-cols-2 gap-4">
          <GaugeCircular value={analisis.profesionalismo} label="Profesionalismo" color="text-blue-500" />
          <GaugeCircular value={analisis.empatia} label="Empatía" color="text-green-500" />
          <GaugeCircular value={analisis.motivacion} label="Motivación" color="text-orange-500" />
          <GaugeCircular value={analisis.claridad} label="Claridad" color="text-purple-500" />
        </div>

        {/* Sugerencias de mejora */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-200">
          <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-purple-600" />
            Sugerencias de Mejora
          </h4>
          <ul className="space-y-2">
            {sugerencias.map((sugerencia, index) => (
              <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-purple-500 mt-1">•</span>
                <span>{sugerencia}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Botón para reescribir */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Reescribir con Otro Tono
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AnalizadorTono;
