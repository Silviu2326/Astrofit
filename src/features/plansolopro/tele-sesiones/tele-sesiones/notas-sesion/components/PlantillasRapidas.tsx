import React from 'react';
import { motion } from 'framer-motion';
import {
  FileText, Zap, TrendingUp, Target, Award, AlertCircle
} from 'lucide-react';

interface Template {
  id: string;
  title: string;
  content: string;
  icon: React.ElementType;
  gradient: string;
  category: string;
}

const plantillas: Template[] = [
  {
    id: '1',
    title: "Progreso en Técnica",
    content: "El cliente mostró mejora significativa en la técnica de [ejercicio]. Se observa mejor control y forma durante la ejecución.",
    icon: TrendingUp,
    gradient: "from-green-500 to-emerald-600",
    category: "progreso"
  },
  {
    id: '2',
    title: "Objetivo Alcanzado",
    content: "El cliente alcanzó el objetivo de [descripción] durante la sesión. Se recomienda establecer un nuevo objetivo más desafiante.",
    icon: Award,
    gradient: "from-yellow-500 to-orange-600",
    category: "objetivo"
  },
  {
    id: '3',
    title: "Área de Mejora",
    content: "Se identificó que el cliente necesita trabajar en [área específica]. Plan de acción: [detalles del plan].",
    icon: Target,
    gradient: "from-blue-500 to-indigo-600",
    category: "tecnica"
  },
  {
    id: '4',
    title: "Observación General",
    content: "Durante la sesión se observó [descripción]. El cliente mostró [actitud/progreso]. Continuar monitoreando.",
    icon: FileText,
    gradient: "from-purple-500 to-pink-600",
    category: "observacion"
  },
  {
    id: '5',
    title: "Atención Especial",
    content: "El cliente reportó [molestia/limitación]. Se modificó el plan de entrenamiento para [adaptación realizada].",
    icon: AlertCircle,
    gradient: "from-orange-500 to-red-600",
    category: "importante"
  }
];

const PlantillasRapidas: React.FC = () => {
  const handleSelectTemplate = (template: Template) => {
    console.log('Plantilla seleccionada:', template);
    alert(`Plantilla seleccionada: "${template.title}"\n\n${template.content}\n\n(Integrar con el editor de notas)`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden"
    >
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white">Templates Rápidos</h3>
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="space-y-3">
          {plantillas.map((template, index) => (
            <motion.button
              key={template.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.05, duration: 0.3 }}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelectTemplate(template)}
              className="w-full text-left p-4 bg-gradient-to-r from-gray-50 to-slate-50 hover:from-white hover:to-gray-50 rounded-2xl border-2 border-gray-200 hover:border-orange-300 transition-all duration-300 group relative overflow-hidden"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-700"></div>

              <div className="relative z-10 flex items-start gap-3">
                {/* Icono */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${template.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <template.icon className="w-5 h-5" />
                </div>

                {/* Contenido */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors duration-300">
                    {template.title}
                  </h4>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {template.content}
                  </p>
                </div>

                {/* Badge de categoría */}
                <div className={`flex-shrink-0 px-2 py-1 bg-gradient-to-r ${template.gradient} text-white text-xs font-semibold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                  {template.category}
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Tip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200"
        >
          <div className="flex items-start gap-2">
            <Zap className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-blue-900">
              <span className="font-bold">Tip:</span> Haz clic en un template para insertarlo en el editor y personalizarlo.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PlantillasRapidas;
