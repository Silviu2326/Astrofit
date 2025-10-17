import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Eye, 
  Copy, 
  Calendar, 
  Users, 
  Hash, 
  Gift, 
  CheckCircle,
  Clock,
  Target,
  Percent,
  Euro
} from 'lucide-react';
import { generarCodigoCupon } from '../crearCuponApi';

interface CuponData {
  nombre: string;
  tipo: 'porcentaje' | 'cantidadFija';
  valor: number;
  fechaInicio: string;
  fechaFin: string;
  usosPermitidos: number;
  clientesValidos: 'todos' | 'especificos';
  clientesEspecificos?: string[];
  minimoCompra?: number;
  productosAplicables?: string[];
}

interface VistaPreviaCuponProps {
  cuponData: CuponData;
}

const VistaPreviaCupon: React.FC<VistaPreviaCuponProps> = ({ cuponData }) => {
  const [codigoGenerado, setCodigoGenerado] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCodigoGenerado(generarCodigoCupon());
  }, []);

  const displayValue = cuponData.tipo === 'porcentaje' ? `${cuponData.valor}%` : `€${cuponData.valor}`;
  
  const formatDate = (dateString: string) => {
    if (!dateString) return 'No especificada';
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(codigoGenerado);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  const calcularDescuento = (precio: number): number => {
    if (cuponData.tipo === 'porcentaje') {
      return (precio * cuponData.valor) / 100;
    }
    return Math.min(cuponData.valor, precio);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg">
          <Eye className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Vista Previa del Cupón</h2>
      </div>

      {/* Cupón Card */}
      <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 p-6 rounded-xl text-white relative overflow-hidden mb-6">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full translate-y-12 -translate-x-12"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Gift className="w-6 h-6" />
              <span className="text-sm font-medium opacity-90">Cupón de Descuento</span>
            </div>
            <div className="text-xs opacity-75">
              {cuponData.clientesValidos === 'todos' ? 'Público' : 'Privado'}
            </div>
          </div>

          <h3 className="text-2xl font-bold mb-2">
            {cuponData.nombre || 'Nombre del Cupón'}
          </h3>

          <div className="flex items-center gap-4 mb-4">
            <div className="text-4xl font-extrabold">
              {displayValue}
            </div>
            <div className="text-lg font-semibold opacity-90">
              DESCUENTO
            </div>
          </div>

          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-3 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Código:</span>
              <div className="flex items-center gap-2">
                <span className="font-mono bg-white text-purple-700 px-3 py-1 rounded text-sm font-bold">
                  {codigoGenerado}
                </span>
                <button
                  onClick={copyToClipboard}
                  className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
                  title="Copiar código"
                >
                  {copied ? (
                    <CheckCircle className="w-4 h-4 text-green-300" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 opacity-75" />
              <span className="opacity-90">
                {formatDate(cuponData.fechaInicio)} - {formatDate(cuponData.fechaFin)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 opacity-75" />
              <span className="opacity-90">
                {cuponData.usosPermitidos} uso{cuponData.usosPermitidos !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Detalles del Cupón */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Detalles del Cupón</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              {cuponData.tipo === 'porcentaje' ? (
                <Percent className="w-4 h-4 text-blue-600" />
              ) : (
                <Euro className="w-4 h-4 text-green-600" />
              )}
              <span className="text-sm font-semibold text-gray-700">Tipo</span>
            </div>
            <p className="text-sm text-gray-600">
              {cuponData.tipo === 'porcentaje' ? 'Porcentaje' : 'Cantidad Fija'}
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-semibold text-gray-700">Valor</span>
            </div>
            <p className="text-sm text-gray-600 font-semibold">{displayValue}</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-green-600" />
            <span className="text-sm font-semibold text-gray-700">Clientes Válidos</span>
          </div>
          <p className="text-sm text-gray-600">
            {cuponData.clientesValidos === 'todos' 
              ? 'Todos los clientes' 
              : `${cuponData.clientesEspecificos?.length || 0} cliente(s) específico(s)`
            }
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-semibold text-gray-700">Válido Desde</span>
            </div>
            <p className="text-sm text-gray-600">{formatDate(cuponData.fechaInicio)}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-red-600" />
              <span className="text-sm font-semibold text-gray-700">Válido Hasta</span>
            </div>
            <p className="text-sm text-gray-600">{formatDate(cuponData.fechaFin)}</p>
          </div>
        </div>

        {/* Ejemplo de Aplicación */}
        {cuponData.valor > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-blue-800 mb-3">Ejemplo de Aplicación</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Precio Original:</span>
                <span className="text-sm font-semibold">€50.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Descuento:</span>
                <span className="text-sm font-semibold text-red-600">
                  -€{calcularDescuento(50).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-blue-200">
                <span className="text-sm font-semibold text-blue-800">Precio Final:</span>
                <span className="text-lg font-bold text-blue-800">
                  €{(50 - calcularDescuento(50)).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-xs text-yellow-800 text-center">
          <strong>Nota:</strong> Esta es una vista previa. El código final se generará al crear el cupón.
        </p>
      </div>
    </motion.div>
  );
};

export default VistaPreviaCupon;
