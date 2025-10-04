import React from 'react';
import { motion } from 'framer-motion';
import { Users, DollarSign, TrendingUp, ArrowUpRight } from 'lucide-react';

const EstadisticaCard: React.FC<{ 
  title: string; 
  value: string | number; 
  description: string; 
  icon: React.ComponentType<any>;
  change: string;
  index: number;
}> = ({
  title,
  value,
  description,
  icon: Icon,
  change,
  index
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    whileHover={{ scale: 1.03, y: -8 }}
    className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
  >
    {/* Shimmer effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

    {/* Decoración de fondo */}
    <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 opacity-5 rounded-full blur-2xl"></div>

    <div className="relative z-10">
      {/* Icono */}
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-8 h-8" />
      </div>

      {/* Título */}
      <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
        {title}
      </p>

      {/* Valor */}
      <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
        {value}
      </p>

      {/* Cambio */}
      <div className="flex items-center gap-2">
        <div className="p-1 bg-green-50 rounded-lg">
          <ArrowUpRight className="w-4 h-4 text-green-600" />
        </div>
        <span className="text-sm font-bold text-green-600">{change}</span>
        <span className="text-xs text-gray-500 font-medium">{description}</span>
      </div>

      {/* Barra decorativa */}
      <div className="mt-4 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, (index + 1) * 25)}%` }}
          transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
        ></motion.div>
      </div>
    </div>
  </motion.div>
);

const EstadisticasMembresia: React.FC = () => {
  // Datos dummy para las estadísticas
  const totalMiembros = 240;
  const ingresosTotales = 8800;
  const miembrosActivos = 210;

  const stats = [
    {
      title: "Total Miembros",
      value: totalMiembros,
      description: "Todos los niveles",
      icon: Users,
      change: "+12.5%"
    },
    {
      title: "Ingresos Totales",
      value: `$${ingresosTotales.toFixed(2)}`,
      description: "Generados por membresías",
      icon: DollarSign,
      change: "+18.2%"
    },
    {
      title: "Miembros Activos",
      value: miembrosActivos,
      description: "Actualmente con membresía",
      icon: TrendingUp,
      change: "+8.7%"
    }
  ];

  return (
    <>
      {stats.map((stat, index) => (
        <EstadisticaCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          description={stat.description}
          icon={stat.icon}
          change={stat.change}
          index={index}
        />
      ))}
    </>
  );
};

export default EstadisticasMembresia;
