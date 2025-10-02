import React, { useState } from 'react';
import { Truck, MapPin, Clock, Package, Euro, Plus, Trash2, Settings, AlertCircle, Check, X } from 'lucide-react';

interface Props {
  onChangeDetected: () => void;
}

interface ZonaEnvio {
  id: string;
  nombre: string;
  paises: string[];
  activa: boolean;
}

interface MetodoEnvio {
  id: string;
  nombre: string;
  descripcion: string;
  tipo: 'estandar' | 'express' | 'recogida' | 'local';
  precio: number;
  tiempoEntrega: string;
  zonas: string[];
  activo: boolean;
  gratuito?: boolean;
  minimoGratuito?: number;
}

const MetodosEnvio: React.FC<Props> = ({ onChangeDetected }) => {
  const [zonasEnvio, setZonasEnvio] = useState<ZonaEnvio[]>([
    {
      id: 'nacional',
      nombre: 'España (Península)',
      paises: ['España'],
      activa: true
    },
    {
      id: 'baleares',
      nombre: 'Islas Baleares',
      paises: ['España - Baleares'],
      activa: true
    },
    {
      id: 'canarias',
      nombre: 'Islas Canarias',
      paises: ['España - Canarias'],
      activa: false
    },
    {
      id: 'europa',
      nombre: 'Europa',
      paises: ['Francia', 'Portugal', 'Italia', 'Alemania'],
      activa: false
    }
  ]);

  const [metodosEnvio, setMetodosEnvio] = useState<MetodoEnvio[]>([
    {
      id: '1',
      nombre: 'Envío Estándar',
      descripcion: 'Entrega en 3-5 días laborables',
      tipo: 'estandar',
      precio: 4.95,
      tiempoEntrega: '3-5 días',
      zonas: ['nacional'],
      activo: true,
      gratuito: true,
      minimoGratuito: 50
    },
    {
      id: '2',
      nombre: 'Envío Express',
      descripcion: 'Entrega en 24-48h',
      tipo: 'express',
      precio: 9.95,
      tiempoEntrega: '24-48h',
      zonas: ['nacional'],
      activo: true,
    },
    {
      id: '3',
      nombre: 'Recogida en Tienda',
      descripcion: 'Recoge tu pedido sin coste',
      tipo: 'recogida',
      precio: 0,
      tiempoEntrega: '2-3 días',
      zonas: ['nacional'],
      activo: true,
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMetodo, setEditingMetodo] = useState<string | null>(null);

  const toggleMetodo = (id: string) => {
    setMetodosEnvio(metodosEnvio.map(m =>
      m.id === id ? { ...m, activo: !m.activo } : m
    ));
    onChangeDetected();
  };

  const deleteMetodo = (id: string) => {
    setMetodosEnvio(metodosEnvio.filter(m => m.id !== id));
    onChangeDetected();
  };

  const updateMetodo = (id: string, field: string, value: any) => {
    setMetodosEnvio(metodosEnvio.map(m =>
      m.id === id ? { ...m, [field]: value } : m
    ));
    onChangeDetected();
  };

  const metodosActivos = metodosEnvio.filter(m => m.activo);

  return (
    <div className="space-y-6">
      {/* Resumen */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-purple-500 to-fuchsia-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <Truck className="w-8 h-8 opacity-80" />
            <span className="text-2xl font-bold">{metodosActivos.length}</span>
          </div>
          <p className="text-purple-100">Métodos Activos</p>
        </div>

        <div className="bg-gradient-to-br from-fuchsia-500 to-pink-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <MapPin className="w-8 h-8 opacity-80" />
            <span className="text-2xl font-bold">{zonasEnvio.filter(z => z.activa).length}</span>
          </div>
          <p className="text-fuchsia-100">Zonas Activas</p>
        </div>

        <div className="bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <Euro className="w-8 h-8 opacity-80" />
            <span className="text-2xl font-bold">
              {metodosActivos.length > 0
                ? (metodosActivos.reduce((sum, m) => sum + m.precio, 0) / metodosActivos.length).toFixed(2)
                : '0.00'}
            </span>
          </div>
          <p className="text-pink-100">Precio Medio</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <Package className="w-8 h-8 opacity-80" />
            <span className="text-2xl font-bold">
              {metodosEnvio.filter(m => m.gratuito).length}
            </span>
          </div>
          <p className="text-purple-100">Envíos Gratis</p>
        </div>
      </div>

      {/* Zonas de Envío */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Zonas de Envío</h2>

        <div className="grid md:grid-cols-2 gap-4">
          {zonasEnvio.map((zona) => (
            <div
              key={zona.id}
              className={`p-4 rounded-xl border-2 transition-all ${
                zona.activa
                  ? 'border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <MapPin className={`w-5 h-5 ${zona.activa ? 'text-purple-600' : 'text-gray-400'}`} />
                  <h3 className={`font-semibold ${zona.activa ? 'text-gray-900' : 'text-gray-500'}`}>
                    {zona.nombre}
                  </h3>
                </div>

                <button
                  onClick={() => {
                    setZonasEnvio(zonasEnvio.map(z =>
                      z.id === zona.id ? { ...z, activa: !z.activa } : z
                    ));
                    onChangeDetected();
                  }}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    zona.activa
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                      : 'bg-gray-300'
                  }`}
                >
                  <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    zona.activa ? 'translate-x-6' : ''
                  }`} />
                </button>
              </div>

              <div className="flex flex-wrap gap-1 mt-2">
                {zona.paises.map((pais, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-white rounded-lg text-xs text-gray-600 border border-gray-200"
                  >
                    {pais}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Métodos de Envío */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Métodos de Envío</h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            Añadir Método
          </button>
        </div>

        <div className="space-y-4">
          {metodosEnvio.map((metodo) => {
            const isEditing = editingMetodo === metodo.id;

            return (
              <div
                key={metodo.id}
                className={`border rounded-xl overflow-hidden transition-all ${
                  metodo.activo ? 'border-purple-200' : 'border-gray-200'
                }`}
              >
                <div className={`p-5 ${metodo.activo ? 'bg-white' : 'bg-gray-50'}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        metodo.activo
                          ? 'bg-gradient-to-br from-purple-100 to-pink-100'
                          : 'bg-gray-100'
                      }`}>
                        {metodo.tipo === 'express' && <Clock className={`w-6 h-6 ${metodo.activo ? 'text-purple-600' : 'text-gray-400'}`} />}
                        {metodo.tipo === 'estandar' && <Truck className={`w-6 h-6 ${metodo.activo ? 'text-purple-600' : 'text-gray-400'}`} />}
                        {metodo.tipo === 'recogida' && <Package className={`w-6 h-6 ${metodo.activo ? 'text-purple-600' : 'text-gray-400'}`} />}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`font-semibold ${metodo.activo ? 'text-gray-900' : 'text-gray-500'}`}>
                            {metodo.nombre}
                          </h3>
                          {metodo.gratuito && (
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                              Gratis desde {metodo.minimoGratuito}€
                            </span>
                          )}
                        </div>

                        <p className="text-sm text-gray-600 mb-3">
                          {metodo.descripcion}
                        </p>

                        {isEditing ? (
                          <div className="grid md:grid-cols-3 gap-4 mt-4">
                            <div>
                              <label className="block text-xs text-gray-600 mb-1">Precio</label>
                              <div className="flex items-center gap-2">
                                <input
                                  type="number"
                                  value={metodo.precio}
                                  onChange={(e) => updateMetodo(metodo.id, 'precio', parseFloat(e.target.value) || 0)}
                                  step="0.01"
                                  min="0"
                                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                                />
                                <Euro className="w-4 h-4 text-gray-400" />
                              </div>
                            </div>

                            <div>
                              <label className="block text-xs text-gray-600 mb-1">Tiempo de Entrega</label>
                              <input
                                type="text"
                                value={metodo.tiempoEntrega}
                                onChange={(e) => updateMetodo(metodo.id, 'tiempoEntrega', e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                              />
                            </div>

                            <div>
                              <label className="block text-xs text-gray-600 mb-1">Tipo</label>
                              <select
                                value={metodo.tipo}
                                onChange={(e) => updateMetodo(metodo.id, 'tipo', e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                              >
                                <option value="estandar">Estándar</option>
                                <option value="express">Express</option>
                                <option value="recogida">Recogida</option>
                                <option value="local">Local</option>
                              </select>
                            </div>

                            <div className="md:col-span-3">
                              <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    checked={metodo.gratuito}
                                    onChange={(e) => updateMetodo(metodo.id, 'gratuito', e.target.checked)}
                                    className="w-4 h-4 text-purple-600 rounded"
                                  />
                                  <span className="text-sm text-gray-700">Envío gratuito desde:</span>
                                </label>
                                {metodo.gratuito && (
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="number"
                                      value={metodo.minimoGratuito}
                                      onChange={(e) => updateMetodo(metodo.id, 'minimoGratuito', parseFloat(e.target.value) || 0)}
                                      step="5"
                                      min="0"
                                      className="w-24 px-3 py-2 rounded-lg border border-gray-200 text-sm"
                                    />
                                    <Euro className="w-4 h-4 text-gray-400" />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1 text-gray-700">
                              <Euro className="w-4 h-4" />
                              <span className="font-semibold">{metodo.precio.toFixed(2)}€</span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-600">
                              <Clock className="w-4 h-4" />
                              <span>{metodo.tiempoEntrega}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => setEditingMetodo(isEditing ? null : metodo.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          isEditing
                            ? 'bg-green-100 text-green-600 hover:bg-green-200'
                            : 'hover:bg-gray-100 text-gray-600'
                        }`}
                      >
                        {isEditing ? <Check className="w-5 h-5" /> : <Settings className="w-5 h-5" />}
                      </button>

                      <button
                        onClick={() => deleteMetodo(metodo.id)}
                        className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>

                      <button
                        onClick={() => toggleMetodo(metodo.id)}
                        className={`relative w-14 h-7 rounded-full transition-colors ${
                          metodo.activo
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                            : 'bg-gray-300'
                        }`}
                      >
                        <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                          metodo.activo ? 'translate-x-7' : ''
                        }`} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Configuración de Seguimiento */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Seguimiento de Envíos</h2>

        <div className="space-y-4">
          <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-purple-600 rounded" />
              <label className="font-medium text-gray-900">
                Enviar email de confirmación al cliente
              </label>
            </div>
            <p className="text-sm text-gray-600 ml-7">
              Se enviará un email cuando el pedido sea enviado con el número de seguimiento
            </p>
          </div>

          <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-purple-600 rounded" />
              <label className="font-medium text-gray-900">
                Actualizar automáticamente el estado del pedido
              </label>
            </div>
            <p className="text-sm text-gray-600 ml-7">
              El estado se actualizará según la información de la empresa de transporte
            </p>
          </div>

          <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <input type="checkbox" className="w-4 h-4 text-purple-600 rounded" />
              <label className="font-medium text-gray-900">
                Permitir al cliente elegir punto de recogida
              </label>
            </div>
            <p className="text-sm text-gray-600 ml-7">
              Los clientes podrán seleccionar un punto de recogida cercano en el checkout
            </p>
          </div>
        </div>
      </div>

      {/* Información */}
      <div className="bg-gradient-to-r from-purple-50 via-fuchsia-50 to-pink-50 rounded-xl p-6 border border-purple-200">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-purple-900 mb-1">
              Recomendaciones para Envíos
            </h3>
            <ul className="text-purple-700 text-sm space-y-1">
              <li>• Ofrece envío gratuito a partir de un importe mínimo para aumentar el ticket medio</li>
              <li>• Proporciona al menos 2 opciones de envío (estándar y express)</li>
              <li>• Integra el seguimiento de envíos para mejorar la experiencia del cliente</li>
              <li>• Considera la opción de recogida en tienda para reducir costes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetodosEnvio;
