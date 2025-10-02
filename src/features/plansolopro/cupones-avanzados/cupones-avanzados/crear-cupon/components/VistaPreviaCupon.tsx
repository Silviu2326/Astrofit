import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Ticket, Calendar, Users, ShoppingBag, Calculator, Sparkles, CheckCircle2 } from 'lucide-react';

interface CuponData {
  nombre: string;
  codigo: string;
  tipo: 'porcentaje' | 'cantidadFija';
  valor: number;
  fechaInicio: string;
  fechaFin: string;
  usosPermitidos: number;
  usosIlimitados: boolean;
  clientesValidos: 'todos' | 'especificos';
  clientesEspecificos?: string[];
  minimoCompra?: number;
  productosAplicables?: string[];
}

interface VistaPreviaCuponProps {
  cuponData: CuponData;
}

const VistaPreviaCupon: React.FC<VistaPreviaCuponProps> = ({ cuponData }) => {
  const [precioSimulacion, setPrecioSimulacion] = useState<number>(100);

  const displayValue = cuponData.tipo === 'porcentaje' ? `${cuponData.valor}%` : `${cuponData.valor}€`;

  // Calcular descuento simulado
  const calcularDescuento = () => {
    if (!cuponData.valor || precioSimulacion <= 0) return 0;

    if (cuponData.tipo === 'porcentaje') {
      return (precioSimulacion * cuponData.valor) / 100;
    } else {
      return Math.min(cuponData.valor, precioSimulacion);
    }
  };

  const descuentoCalculado = calcularDescuento();
  const precioFinal = Math.max(0, precioSimulacion - descuentoCalculado);

  const formatearFecha = (fecha: string) => {
    if (!fecha) return 'No definida';
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <div className="space-y-6">
      {/* Preview del cupón */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden"
      >
        {/* Header gradiente */}
        <div className="relative overflow-hidden bg-gradient-to-r from-fuchsia-600 via-purple-600 to-violet-600 p-6">
          {/* Pattern de fondo */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          {/* Decoración */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full translate-x-1/2 translate-y-1/2"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <Ticket className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white">Vista Previa</h3>
            </div>

            {/* Cupón visual */}
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-5 border border-white/30">
              <p className="text-sm text-purple-100 mb-2">
                {cuponData.nombre || 'Nombre del cupón'}
              </p>
              <div className="flex items-end gap-2 mb-3">
                <span className="text-5xl font-extrabold text-white">
                  {cuponData.valor || '0'}
                </span>
                <span className="text-2xl font-bold text-yellow-300 mb-2">
                  {cuponData.tipo === 'porcentaje' ? '%' : '€'} OFF
                </span>
              </div>

              {/* Código del cupón */}
              <div className="bg-white rounded-xl px-3 py-2 inline-block">
                <p className="text-xs text-gray-500 font-semibold">CÓDIGO</p>
                <p className="text-xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-600 to-purple-600">
                  {cuponData.codigo || 'XXXXX'}
                </p>
              </div>
            </div>

            {/* Badge de estado */}
            <div className="mt-4 flex items-center gap-2">
              <div className="px-3 py-1 bg-green-400/20 backdrop-blur-sm rounded-full border border-green-300/30 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-green-200" />
                <span className="text-xs font-bold text-green-100">Activo</span>
              </div>
              {cuponData.usosIlimitados && (
                <div className="px-3 py-1 bg-yellow-400/20 backdrop-blur-sm rounded-full border border-yellow-300/30 flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-yellow-200" />
                  <span className="text-xs font-bold text-yellow-100">Ilimitado</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Detalles del cupón */}
        <div className="p-6 space-y-4">
          <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">Detalles</h4>

          <div className="space-y-3">
            {/* Fechas */}
            <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-purple-50 to-fuchsia-50 rounded-xl">
              <div className="p-2 bg-white rounded-lg">
                <Calendar className="w-4 h-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-600 font-semibold">Período de validez</p>
                <p className="text-sm font-bold text-gray-900">
                  {formatearFecha(cuponData.fechaInicio)} - {formatearFecha(cuponData.fechaFin)}
                </p>
              </div>
            </div>

            {/* Usos */}
            <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
              <div className="p-2 bg-white rounded-lg">
                <Ticket className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-600 font-semibold">Usos disponibles</p>
                <p className="text-sm font-bold text-gray-900">
                  {cuponData.usosIlimitados ? 'Ilimitados' : cuponData.usosPermitidos || 0}
                </p>
              </div>
            </div>

            {/* Clientes */}
            <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
              <div className="p-2 bg-white rounded-lg">
                <Users className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-600 font-semibold">Clientes válidos</p>
                <p className="text-sm font-bold text-gray-900">
                  {cuponData.clientesValidos === 'todos' ? 'Todos los clientes' : `${cuponData.clientesEspecificos?.length || 0} clientes específicos`}
                </p>
              </div>
            </div>

            {/* Mínimo de compra */}
            {cuponData.minimoCompra && cuponData.minimoCompra > 0 && (
              <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl">
                <div className="p-2 bg-white rounded-lg">
                  <ShoppingBag className="w-4 h-4 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-600 font-semibold">Compra mínima</p>
                  <p className="text-sm font-bold text-gray-900">{cuponData.minimoCompra}€</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Simulador de descuento */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
      >
        {/* Decoración */}
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-200 to-fuchsia-200 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-xl text-white">
              <Calculator className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Simulador de Descuento</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="precioSimulacion" className="block text-sm font-semibold text-gray-700 mb-2">
                Precio del producto
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="precioSimulacion"
                  value={precioSimulacion}
                  onChange={(e) => setPrecioSimulacion(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-100 transition-all duration-300 outline-none bg-white/80"
                  min="0"
                  step="0.01"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
                  €
                </div>
              </div>
            </div>

            {/* Resultados */}
            <div className="bg-gradient-to-r from-fuchsia-50 via-purple-50 to-violet-50 rounded-2xl p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Precio original:</span>
                <span className="text-lg font-bold text-gray-900">{precioSimulacion.toFixed(2)}€</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Descuento aplicado:</span>
                <span className="text-lg font-bold text-fuchsia-600">-{descuentoCalculado.toFixed(2)}€</span>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>

              <div className="flex justify-between items-center">
                <span className="text-base font-semibold text-gray-700">Precio final:</span>
                <div className="text-right">
                  <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-600 to-purple-600">
                    {precioFinal.toFixed(2)}€
                  </span>
                  {descuentoCalculado > 0 && (
                    <p className="text-xs text-green-600 font-bold">
                      ¡Ahorras {((descuentoCalculado / precioSimulacion) * 100).toFixed(0)}%!
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Nota informativa */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="text-center"
      >
        <p className="text-xs text-gray-500 italic">
          * Vista previa en tiempo real. Los cambios se reflejan automáticamente.
        </p>
      </motion.div>
    </div>
  );
};

export default VistaPreviaCupon;
