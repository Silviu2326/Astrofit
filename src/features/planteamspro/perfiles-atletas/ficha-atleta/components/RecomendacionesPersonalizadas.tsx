// Recomendaciones personalizadas entrenamiento nutrición
import { motion } from 'framer-motion';
import { Target, Utensils, Dumbbell, Lightbulb, CheckCircle } from 'lucide-react';

const RecomendacionesPersonalizadas = () => {
  const recomendaciones = [
    {
      categoria: 'Entrenamiento',
      icono: Dumbbell,
      color: 'from-blue-500 to-indigo-600',
      items: [
        'Incrementar sesiones de fuerza explosiva 3x por semana',
        'Incluir trabajo de pliometría en días alternos',
        'Reducir carga de entrenamiento aeróbico en 15%'
      ]
    },
    {
      categoria: 'Nutrición',
      icono: Utensils,
      color: 'from-emerald-500 to-teal-600',
      items: [
        'Aumentar ingesta de proteínas a 2.2g/kg peso corporal',
        'Suplementar con omega-3 diariamente',
        'Hidratación: mínimo 3L de agua al día'
      ]
    },
    {
      categoria: 'Recuperación',
      icono: Target,
      color: 'from-purple-500 to-pink-600',
      items: [
        'Sesiones de stretching activo post-entrenamiento',
        'Masaje deportivo semanal',
        'Dormir mínimo 8 horas diarias'
      ]
    },
    {
      categoria: 'Mental',
      icono: Lightbulb,
      color: 'from-orange-500 to-red-600',
      items: [
        'Practicar visualización antes de competencias',
        'Técnicas de respiración para manejo de estrés',
        'Sesiones de mindfulness 10 min diarios'
      ]
    }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50">
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <h3 className="text-2xl font-bold text-white flex items-center gap-3 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Lightbulb className="w-7 h-7" />
          </div>
          Recomendaciones Personalizadas
        </h3>
        <p className="text-indigo-100 mt-2 relative z-10">Entrenamiento y nutrición personalizados</p>
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {recomendaciones.map((rec, index) => {
            const Icono = rec.icono;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden group"
              >
                {/* Decoración de fondo */}
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${rec.color} shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                      <Icono className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
                      {rec.categoria}
                    </h4>
                  </div>

                  <ul className="space-y-3">
                    {rec.items.map((item, itemIndex) => (
                      <motion.li
                        key={itemIndex}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + itemIndex * 0.05, duration: 0.3 }}
                        className="flex items-start gap-2 text-gray-700"
                      >
                        <div className="p-1 bg-green-50 rounded-lg mt-0.5">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-sm leading-relaxed">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RecomendacionesPersonalizadas;
