import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  Check,
  Clock,
  Calendar,
  Percent,
  TrendingDown,
  Ticket,
  Zap,
  ShoppingBag,
} from 'lucide-react';
import { getProductosByType, Producto } from '../productosServiciosApi';

const BonosClases: React.FC = () => {
  const [bonos, setBonos] = useState<Producto[]>([]);

  useEffect(() => {
    const fetchBonos = async () => {
      const data = await getProductosByType('bono');
      setBonos(data);
    };
    fetchBonos();
  }, []);

  // Función para calcular el ahorro (mock)
  const calcularAhorro = (precio: number, numClases: number) => {
    const precioIndividual = 30; // Precio base por clase
    const precioTotal = precioIndividual * numClases;
    const ahorro = precioTotal - precio;
    const porcentajeAhorro = Math.round((ahorro / precioTotal) * 100);
    return { ahorro, porcentajeAhorro, precioPorClase: precio / numClases };
  };

  // Extraer número de clases del nombre del bono
  const extraerNumeroClases = (nombre: string): number => {
    const match = nombre.match(/\d+/);
    return match ? parseInt(match[0]) : 10;
  };

  // Obtener color según el número de clases
  const getBonoColor = (numClases: number) => {
    if (numClases >= 20) {
      return {
        gradient: 'from-purple-500 to-pink-600',
        bgGradient: 'from-purple-500/10 to-pink-500/10',
        badgeColor: 'bg-purple-100 text-purple-700 border-purple-200',
      };
    } else if (numClases >= 10) {
      return {
        gradient: 'from-emerald-500 to-teal-600',
        bgGradient: 'from-emerald-500/10 to-teal-500/10',
        badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      };
    } else {
      return {
        gradient: 'from-blue-500 to-indigo-600',
        bgGradient: 'from-blue-500/10 to-indigo-500/10',
        badgeColor: 'bg-blue-100 text-blue-700 border-blue-200',
      };
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 to-rose-100 px-4 py-2 rounded-full mb-4"
        >
          <Ticket className="w-5 h-5 text-pink-600" />
          <span className="text-sm font-bold text-pink-900">Bonos de Clases</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl font-bold text-gray-900 mb-4"
        >
          Ahorra con nuestros bonos
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-600 max-w-2xl mx-auto"
        >
          Compra paquetes de clases y ahorra hasta un 25% en cada sesión
        </motion.p>
      </div>

      {/* Bonos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bonos.map((bono, index) => {
          const numClases = extraerNumeroClases(bono.nombre);
          const { ahorro, porcentajeAhorro, precioPorClase } = calcularAhorro(bono.precio, numClases);
          const colors = getBonoColor(numClases);

          // Mock: clases restantes
          const clasesRestantes = Math.floor(Math.random() * numClases);
          const clasesUsadas = numClases - clasesRestantes;
          const progreso = (clasesUsadas / numClases) * 100;

          return (
            <motion.div
              key={bono.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.03, y: -8 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/50 relative group"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

              {/* Decoración de fondo */}
              <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${colors.bgGradient} rounded-full blur-2xl`}></div>

              {/* Header con gradiente */}
              <div className={`relative p-6 bg-gradient-to-br ${colors.gradient} overflow-hidden`}>
                {/* Dots pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                      backgroundSize: '20px 20px',
                    }}
                  ></div>
                </div>

                {/* Badge de ahorro */}
                {porcentajeAhorro > 0 && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-yellow-400 text-yellow-900 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                      <Percent className="w-3 h-3" />
                      Ahorra {porcentajeAhorro}%
                    </div>
                  </div>
                )}

                <div className="relative z-10">
                  {/* Icono */}
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-4">
                    <Award className="w-8 h-8 text-white" />
                  </div>

                  {/* Nombre */}
                  <h3 className="text-2xl font-bold text-white mb-2">{bono.nombre}</h3>

                  {/* Número de clases destacado */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-white">{numClases}</span>
                    <span className="text-white/80 text-lg">clases</span>
                  </div>
                </div>
              </div>

              {/* Contenido */}
              <div className="p-6 relative z-10">
                {/* Descripción */}
                <p className="text-sm text-gray-600 mb-4">{bono.descripcion}</p>

                {/* Precio y ahorro */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className={`text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${colors.gradient}`}>
                      €{bono.precio}
                    </span>
                    <span className="text-lg text-gray-500 line-through">€{bono.precio + ahorro}</span>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <TrendingDown className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-semibold text-green-600">
                      €{precioPorClase.toFixed(2)} por clase
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{bono.duracion}</span>
                  </div>
                </div>

                {/* Características */}
                <div className="space-y-2 mb-6">
                  {bono.caracteristicas.map((caracteristica, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-gray-700">{caracteristica}</span>
                    </div>
                  ))}
                </div>

                {/* Estadísticas adicionales */}
                <div className="border-t border-gray-100 pt-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-gray-600">Modalidad:</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      bono.modalidad === 'presencial'
                        ? 'bg-indigo-100 text-indigo-700'
                        : bono.modalidad === 'online'
                        ? 'bg-cyan-100 text-cyan-700'
                        : 'bg-violet-100 text-violet-700'
                    }`}>
                      {bono.modalidad}
                    </span>
                  </div>

                  {bono.cupos && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-600">Cupos disponibles:</span>
                      <span className="text-xs font-bold text-gray-900">{bono.cupos}</span>
                    </div>
                  )}
                </div>

                {/* Botón CTA */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!bono.disponibilidad}
                  className={`w-full py-3 rounded-xl font-bold text-white shadow-lg hover:shadow-xl transition-all duration-300 ${
                    bono.disponibilidad
                      ? `bg-gradient-to-r ${colors.gradient}`
                      : 'bg-gray-400 cursor-not-allowed'
                  } flex items-center justify-center gap-2`}
                >
                  <ShoppingBag className="w-5 h-5" />
                  {bono.disponibilidad ? 'Comprar Bono' : 'No Disponible'}
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Información Adicional */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* Ventaja 1 */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/50">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Flexibilidad Total</h3>
          <p className="text-sm text-gray-600">
            Usa tus clases cuando quieras dentro del período de validez
          </p>
        </div>

        {/* Ventaja 2 */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/50">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-4">
            <Percent className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Máximo Ahorro</h3>
          <p className="text-sm text-gray-600">
            Cuantas más clases compres, mayor será tu ahorro por sesión
          </p>
        </div>

        {/* Ventaja 3 */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/50">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-4">
            <Award className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Sin Compromiso</h3>
          <p className="text-sm text-gray-600">
            Paga solo por lo que necesitas, sin cuotas mensuales recurrentes
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default BonosClases;
