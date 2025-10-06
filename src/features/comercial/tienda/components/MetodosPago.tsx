import React, { useState } from 'react';
import { CreditCard, Smartphone, Building2, Wallet, Check, Settings, AlertCircle, DollarSign, Euro, Percent } from 'lucide-react';

interface Props {
  onChangeDetected: () => void;
}

interface MetodoPago {
  id: string;
  nombre: string;
  tipo: 'tarjeta' | 'transferencia' | 'efectivo' | 'digital';
  icon: any;
  activo: boolean;
  comision: number;
  configuracion?: any;
}

const MetodosPago: React.FC<Props> = ({ onChangeDetected }) => {
  const [metodos, setMetodos] = useState<MetodoPago[]>([
    {
      id: 'tarjeta',
      nombre: 'Tarjeta de Crédito/Débito',
      tipo: 'tarjeta',
      icon: CreditCard,
      activo: true,
      comision: 2.9,
      configuracion: {
        stripe: { activo: true, publicKey: '', secretKey: '' },
        redsys: { activo: false, merchantCode: '', terminal: '' }
      }
    },
    {
      id: 'bizum',
      nombre: 'Bizum',
      tipo: 'digital',
      icon: Smartphone,
      activo: true,
      comision: 0.5,
    },
    {
      id: 'transferencia',
      nombre: 'Transferencia Bancaria',
      tipo: 'transferencia',
      icon: Building2,
      activo: true,
      comision: 0,
      configuracion: {
        iban: 'ES00 0000 0000 0000 0000 0000',
        swift: '',
        titular: 'Mi Gimnasio Premium'
      }
    },
    {
      id: 'efectivo',
      nombre: 'Efectivo',
      tipo: 'efectivo',
      icon: Wallet,
      activo: true,
      comision: 0,
    },
    {
      id: 'paypal',
      nombre: 'PayPal',
      tipo: 'digital',
      icon: DollarSign,
      activo: false,
      comision: 3.4,
      configuracion: {
        clientId: '',
        secretKey: '',
        sandbox: true
      }
    }
  ]);

  const [selectedMetodo, setSelectedMetodo] = useState<string | null>(null);

  const toggleMetodo = (id: string) => {
    setMetodos(metodos.map(m =>
      m.id === id ? { ...m, activo: !m.activo } : m
    ));
    onChangeDetected();
  };

  const updateComision = (id: string, comision: number) => {
    setMetodos(metodos.map(m =>
      m.id === id ? { ...m, comision } : m
    ));
    onChangeDetected();
  };

  const metodosActivos = metodos.filter(m => m.activo);

  return (
    <div className="space-y-6">
      {/* Resumen */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-purple-500 to-fuchsia-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <CreditCard className="w-8 h-8 opacity-80" />
            <span className="text-2xl font-bold">{metodosActivos.length}</span>
          </div>
          <p className="text-purple-100">Métodos Activos</p>
        </div>

        <div className="bg-gradient-to-br from-fuchsia-500 to-pink-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <Percent className="w-8 h-8 opacity-80" />
            <span className="text-2xl font-bold">
              {(metodosActivos.reduce((sum, m) => sum + m.comision, 0) / metodosActivos.length).toFixed(1)}%
            </span>
          </div>
          <p className="text-fuchsia-100">Comisión Media</p>
        </div>

        <div className="bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <Check className="w-8 h-8 opacity-80" />
            <span className="text-2xl font-bold">{metodos.length}</span>
          </div>
          <p className="text-pink-100">Total Disponibles</p>
        </div>
      </div>

      {/* Lista de Métodos */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Métodos de Pago Disponibles</h2>

        <div className="space-y-4">
          {metodos.map((metodo) => {
            const Icon = metodo.icon;
            const isSelected = selectedMetodo === metodo.id;

            return (
              <div key={metodo.id} className="border border-gray-200 rounded-xl overflow-hidden">
                <div className={`p-4 transition-colors ${metodo.activo ? 'bg-white' : 'bg-gray-50'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        metodo.activo
                          ? 'bg-gradient-to-br from-purple-100 to-pink-100'
                          : 'bg-gray-100'
                      }`}>
                        <Icon className={`w-6 h-6 ${metodo.activo ? 'text-purple-600' : 'text-gray-400'}`} />
                      </div>

                      <div className="flex-1">
                        <h3 className={`font-semibold ${metodo.activo ? 'text-gray-900' : 'text-gray-500'}`}>
                          {metodo.nombre}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Comisión: {metodo.comision}%
                          {metodo.comision === 0 && ' (Sin coste)'}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        {metodo.configuracion && (
                          <button
                            onClick={() => setSelectedMetodo(isSelected ? null : metodo.id)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <Settings className="w-5 h-5 text-gray-600" />
                          </button>
                        )}

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

                  {/* Configuración Expandida */}
                  {isSelected && metodo.configuracion && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      {metodo.id === 'tarjeta' && (
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <input
                              type="checkbox"
                              checked={metodo.configuracion.stripe.activo}
                              onChange={(e) => {
                                const newMetodos = metodos.map(m => {
                                  if (m.id === metodo.id) {
                                    return {
                                      ...m,
                                      configuracion: {
                                        ...m.configuracion,
                                        stripe: { ...m.configuracion.stripe, activo: e.target.checked }
                                      }
                                    };
                                  }
                                  return m;
                                });
                                setMetodos(newMetodos);
                                onChangeDetected();
                              }}
                              className="w-4 h-4 text-purple-600 rounded"
                            />
                            <label className="font-medium">Stripe</label>
                          </div>

                          {metodo.configuracion.stripe.activo && (
                            <div className="grid md:grid-cols-2 gap-4 ml-8">
                              <div>
                                <label className="block text-sm text-gray-600 mb-1">Public Key</label>
                                <input
                                  type="text"
                                  placeholder="pk_live_..."
                                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                                />
                              </div>
                              <div>
                                <label className="block text-sm text-gray-600 mb-1">Secret Key</label>
                                <input
                                  type="password"
                                  placeholder="sk_live_..."
                                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                                />
                              </div>
                            </div>
                          )}

                          <div className="flex items-center gap-4 mt-4">
                            <input
                              type="checkbox"
                              checked={metodo.configuracion.redsys.activo}
                              onChange={(e) => {
                                const newMetodos = metodos.map(m => {
                                  if (m.id === metodo.id) {
                                    return {
                                      ...m,
                                      configuracion: {
                                        ...m.configuracion,
                                        redsys: { ...m.configuracion.redsys, activo: e.target.checked }
                                      }
                                    };
                                  }
                                  return m;
                                });
                                setMetodos(newMetodos);
                                onChangeDetected();
                              }}
                              className="w-4 h-4 text-purple-600 rounded"
                            />
                            <label className="font-medium">Redsys (TPV Virtual)</label>
                          </div>

                          {metodo.configuracion.redsys.activo && (
                            <div className="grid md:grid-cols-2 gap-4 ml-8">
                              <div>
                                <label className="block text-sm text-gray-600 mb-1">Código Comercio</label>
                                <input
                                  type="text"
                                  placeholder="999008881"
                                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                                />
                              </div>
                              <div>
                                <label className="block text-sm text-gray-600 mb-1">Terminal</label>
                                <input
                                  type="text"
                                  placeholder="1"
                                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {metodo.id === 'transferencia' && (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm text-gray-600 mb-1">IBAN</label>
                            <input
                              type="text"
                              value={metodo.configuracion.iban}
                              className="w-full px-3 py-2 rounded-lg border border-gray-200"
                            />
                          </div>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm text-gray-600 mb-1">SWIFT/BIC</label>
                              <input
                                type="text"
                                value={metodo.configuracion.swift}
                                className="w-full px-3 py-2 rounded-lg border border-gray-200"
                              />
                            </div>
                            <div>
                              <label className="block text-sm text-gray-600 mb-1">Titular</label>
                              <input
                                type="text"
                                value={metodo.configuracion.titular}
                                className="w-full px-3 py-2 rounded-lg border border-gray-200"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {metodo.id === 'paypal' && (
                        <div className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm text-gray-600 mb-1">Client ID</label>
                              <input
                                type="text"
                                placeholder="AeB..."
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-sm text-gray-600 mb-1">Secret Key</label>
                              <input
                                type="password"
                                placeholder="EL..."
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                              />
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={metodo.configuracion.sandbox}
                              className="w-4 h-4 text-purple-600 rounded"
                            />
                            <label className="text-sm text-gray-600">Modo Sandbox (Pruebas)</label>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Configuración de Comisiones */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Configuración de Comisiones</h2>

        <div className="space-y-4">
          {metodos.filter(m => m.activo).map((metodo) => (
            <div key={metodo.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
              <div>
                <p className="font-medium text-gray-900">{metodo.nombre}</p>
                <p className="text-sm text-gray-600">Comisión por transacción</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={metodo.comision}
                  onChange={(e) => updateComision(metodo.id, parseFloat(e.target.value) || 0)}
                  step="0.1"
                  min="0"
                  max="100"
                  className="w-20 px-3 py-2 rounded-lg border border-gray-200 text-center font-semibold"
                />
                <Percent className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Información */}
      <div className="bg-gradient-to-r from-purple-50 via-fuchsia-50 to-pink-50 rounded-xl p-6 border border-purple-200">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-purple-900 mb-1">
              Recomendaciones de Seguridad
            </h3>
            <ul className="text-purple-700 text-sm space-y-1">
              <li>• Utiliza siempre conexiones HTTPS para procesar pagos</li>
              <li>• Mantén tus claves API en un lugar seguro</li>
              <li>• Configura webhooks para recibir notificaciones de pago</li>
              <li>• Activa la autenticación 3D Secure para mayor seguridad</li>
              <li>• Revisa periódicamente las transacciones sospechosas</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetodosPago;
