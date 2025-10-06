import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Euro, 
  Package, 
  Target, 
  Calendar,
  Users,
  Clock,
  AlertCircle,
  CheckCircle,
  Info
} from 'lucide-react';

interface CuponData {
  minimoCompra?: number;
  productosAplicables?: string[];
}

interface ConfiguracionAvanzadaProps {
  cuponData: CuponData;
  onFormChange: (data: Partial<CuponData>) => void;
}

const ConfiguracionAvanzada: React.FC<ConfiguracionAvanzadaProps> = ({ cuponData, onFormChange }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'productosAplicables') {
      onFormChange({ [name]: value.split(',').map(s => s.trim()).filter(s => s !== '') });
    } else {
      onFormChange({ [name]: parseFloat(value) || 0 });
    }
  };

  const productosDisponibles = [
    { id: '1', nombre: 'Membresía Básica', precio: 29.99 },
    { id: '2', nombre: 'Membresía Premium', precio: 49.99 },
    { id: '3', nombre: 'Membresía Elite', precio: 79.99 },
    { id: '4', nombre: 'Sesión Personal', precio: 35.00 },
    { id: '5', nombre: 'Plan Nutricional', precio: 25.00 },
  ];

  const toggleProducto = (productoId: string) => {
    const productosActuales = cuponData.productosAplicables || [];
    const nuevosProductos = productosActuales.includes(productoId)
      ? productosActuales.filter(id => id !== productoId)
      : [...productosActuales, productoId];
    
    onFormChange({ productosAplicables: nuevosProductos });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg">
            <Settings className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Configuración Avanzada</h2>
        </div>
        
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
        >
          {showAdvanced ? 'Ocultar' : 'Mostrar'} Opciones
        </button>
      </div>

      {showAdvanced && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-6"
        >
          {/* Mínimo de Compra */}
          <div>
            <label htmlFor="minimoCompra" className="block text-sm font-semibold text-gray-700 mb-2">
              Compra Mínima Requerida
            </label>
            <div className="relative">
              <input
                type="number"
                id="minimoCompra"
                name="minimoCompra"
                value={cuponData.minimoCompra || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                min="0"
                step="0.01"
                placeholder="0.00"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Euro className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              El cliente debe gastar al menos esta cantidad para usar el cupón
            </p>
          </div>

          {/* Productos Aplicables */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Productos/Servicios Aplicables
            </label>
            
            <div className="space-y-3">
              {productosDisponibles.map((producto) => {
                const isSelected = cuponData.productosAplicables?.includes(producto.id) || false;
                return (
                  <motion.div
                    key={producto.id}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => toggleProducto(producto.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isSelected
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-300'
                        }`}>
                          {isSelected && <CheckCircle className="w-3 h-3 text-white" />}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{producto.nombre}</h4>
                          <p className="text-sm text-gray-600">€{producto.precio}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">ID: {producto.id}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm text-blue-800 font-medium">Información</p>
                  <p className="text-xs text-blue-700 mt-1">
                    Si no seleccionas ningún producto, el cupón se aplicará a todos los productos/servicios.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Resumen de Configuración */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Resumen de Configuración</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Compra mínima:</span>
                <span className="font-medium">
                  {cuponData.minimoCompra ? `€${cuponData.minimoCompra}` : 'Sin restricción'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Productos aplicables:</span>
                <span className="font-medium">
                  {cuponData.productosAplicables?.length || 0} de {productosDisponibles.length} seleccionados
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Restricciones:</span>
                <span className="font-medium text-green-600">
                  {cuponData.minimoCompra || cuponData.productosAplicables?.length ? 'Configuradas' : 'Ninguna'}
                </span>
              </div>
            </div>
          </div>

          {/* Alertas y Recomendaciones */}
          <div className="space-y-3">
            {cuponData.minimoCompra && cuponData.minimoCompra > 100 && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-yellow-800 font-medium">Compra mínima alta</p>
                    <p className="text-xs text-yellow-700 mt-1">
                      Una compra mínima de €{cuponData.minimoCompra} puede reducir la conversión del cupón.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {cuponData.productosAplicables?.length === 1 && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-blue-800 font-medium">Cupón específico</p>
                    <p className="text-xs text-blue-700 mt-1">
                      Este cupón solo se aplicará a 1 producto específico.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {!cuponData.minimoCompra && !cuponData.productosAplicables?.length && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-green-800 font-medium">Cupón sin restricciones</p>
                    <p className="text-xs text-green-700 mt-1">
                      Este cupón se puede aplicar a cualquier compra sin restricciones.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ConfiguracionAvanzada;
