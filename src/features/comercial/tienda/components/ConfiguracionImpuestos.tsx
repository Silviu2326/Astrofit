import React, { useState } from 'react';
import { Receipt, Plus, Trash2, Settings, AlertCircle, MapPin, Percent, Globe, Check, Calculator } from 'lucide-react';

interface Props {
  onChangeDetected: () => void;
}

interface TasaImpuesto {
  id: string;
  nombre: string;
  tipo: 'IVA' | 'IGIC' | 'Custom';
  tasa: number;
  region: string;
  activo: boolean;
  descripcion?: string;
  aplicarA: 'productos' | 'servicios' | 'ambos';
}

interface ReglaNegocio {
  id: string;
  nombre: string;
  condicion: string;
  tasaAplicar: string;
  activa: boolean;
}

const ConfiguracionImpuestos: React.FC<Props> = ({ onChangeDetected }) => {
  const [tasas, setTasas] = useState<TasaImpuesto[]>([
    {
      id: '1',
      nombre: 'IVA General',
      tipo: 'IVA',
      tasa: 21,
      region: 'España (Península y Baleares)',
      activo: true,
      aplicarA: 'ambos',
      descripcion: 'Tipo general aplicable a la mayoría de productos y servicios'
    },
    {
      id: '2',
      nombre: 'IVA Reducido',
      tipo: 'IVA',
      tasa: 10,
      region: 'España (Península y Baleares)',
      activo: true,
      aplicarA: 'productos',
      descripcion: 'Aplicable a productos alimenticios, transporte, hostelería'
    },
    {
      id: '3',
      nombre: 'IVA Superreducido',
      tipo: 'IVA',
      tasa: 4,
      region: 'España (Península y Baleares)',
      activo: true,
      aplicarA: 'productos',
      descripcion: 'Aplicable a productos de primera necesidad'
    },
    {
      id: '4',
      nombre: 'IGIC General',
      tipo: 'IGIC',
      tasa: 7,
      region: 'Islas Canarias',
      activo: false,
      aplicarA: 'ambos',
      descripcion: 'Impuesto General Indirecto Canario - tipo general'
    },
  ]);

  const [reglas, setReglas] = useState<ReglaNegocio[]>([
    {
      id: '1',
      nombre: 'Clientes UE con NIF válido',
      condicion: 'País UE + NIF válido',
      tasaAplicar: 'Sin impuestos (Inversión sujeto pasivo)',
      activa: true
    },
    {
      id: '2',
      nombre: 'Envío a Canarias',
      condicion: 'Dirección de envío en Canarias',
      tasaAplicar: 'IGIC General (7%)',
      activa: true
    }
  ]);

  const [showAddTasa, setShowAddTasa] = useState(false);
  const [editingTasa, setEditingTasa] = useState<string | null>(null);

  const toggleTasa = (id: string) => {
    setTasas(tasas.map(t =>
      t.id === id ? { ...t, activo: !t.activo } : t
    ));
    onChangeDetected();
  };

  const deleteTasa = (id: string) => {
    setTasas(tasas.filter(t => t.id !== id));
    onChangeDetected();
  };

  const updateTasa = (id: string, field: string, value: any) => {
    setTasas(tasas.map(t =>
      t.id === id ? { ...t, [field]: value } : t
    ));
    onChangeDetected();
  };

  const toggleRegla = (id: string) => {
    setReglas(reglas.map(r =>
      r.id === id ? { ...r, activa: !r.activa } : r
    ));
    onChangeDetected();
  };

  const tasasActivas = tasas.filter(t => t.activo);

  return (
    <div className="space-y-6">
      {/* Resumen */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-purple-500 to-fuchsia-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <Receipt className="w-8 h-8 opacity-80" />
            <span className="text-2xl font-bold">{tasasActivas.length}</span>
          </div>
          <p className="text-purple-100">Tasas Activas</p>
        </div>

        <div className="bg-gradient-to-br from-fuchsia-500 to-pink-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <Percent className="w-8 h-8 opacity-80" />
            <span className="text-2xl font-bold">
              {tasasActivas.length > 0
                ? (tasasActivas.reduce((sum, t) => sum + t.tasa, 0) / tasasActivas.length).toFixed(1)
                : '0.0'}%
            </span>
          </div>
          <p className="text-fuchsia-100">Tasa Media</p>
        </div>

        <div className="bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <Globe className="w-8 h-8 opacity-80" />
            <span className="text-2xl font-bold">{new Set(tasas.map(t => t.region)).size}</span>
          </div>
          <p className="text-pink-100">Regiones</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <Calculator className="w-8 h-8 opacity-80" />
            <span className="text-2xl font-bold">{reglas.filter(r => r.activa).length}</span>
          </div>
          <p className="text-purple-100">Reglas Activas</p>
        </div>
      </div>

      {/* Configuración General */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Configuración General</h2>

        <div className="space-y-4">
          <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-purple-600 rounded" />
              <label className="font-medium text-gray-900">
                Los precios incluyen impuestos
              </label>
            </div>
            <p className="text-sm text-gray-600 ml-7">
              Los precios mostrados a los clientes ya incluyen los impuestos aplicables
            </p>
          </div>

          <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-purple-600 rounded" />
              <label className="font-medium text-gray-900">
                Calcular impuestos según dirección de envío
              </label>
            </div>
            <p className="text-sm text-gray-600 ml-7">
              Se aplicará la tasa correspondiente según el destino del pedido
            </p>
          </div>

          <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <input type="checkbox" className="w-4 h-4 text-purple-600 rounded" />
              <label className="font-medium text-gray-900">
                Aplicar impuestos a costes de envío
              </label>
            </div>
            <p className="text-sm text-gray-600 ml-7">
              Los gastos de envío también estarán sujetos a impuestos
            </p>
          </div>

          <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <input type="checkbox" className="w-4 h-4 text-purple-600 rounded" />
              <label className="font-medium text-gray-900">
                Mostrar desglose de impuestos en facturas
              </label>
            </div>
            <p className="text-sm text-gray-600 ml-7">
              Las facturas mostrarán el importe de impuestos de forma detallada
            </p>
          </div>
        </div>
      </div>

      {/* Tasas de Impuestos */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Tasas de Impuestos</h2>
          <button
            onClick={() => setShowAddTasa(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            Añadir Tasa
          </button>
        </div>

        <div className="space-y-4">
          {tasas.map((tasa) => {
            const isEditing = editingTasa === tasa.id;

            return (
              <div
                key={tasa.id}
                className={`border rounded-xl overflow-hidden transition-all ${
                  tasa.activo ? 'border-purple-200' : 'border-gray-200'
                }`}
              >
                <div className={`p-5 ${tasa.activo ? 'bg-white' : 'bg-gray-50'}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        tasa.activo
                          ? 'bg-gradient-to-br from-purple-100 to-pink-100'
                          : 'bg-gray-100'
                      }`}>
                        <Receipt className={`w-6 h-6 ${tasa.activo ? 'text-purple-600' : 'text-gray-400'}`} />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`font-semibold ${tasa.activo ? 'text-gray-900' : 'text-gray-500'}`}>
                            {tasa.nombre}
                          </h3>
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                            tasa.tipo === 'IVA'
                              ? 'bg-blue-100 text-blue-700'
                              : tasa.tipo === 'IGIC'
                              ? 'bg-orange-100 text-orange-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {tasa.tipo}
                          </span>
                        </div>

                        {tasa.descripcion && (
                          <p className="text-sm text-gray-600 mb-3">
                            {tasa.descripcion}
                          </p>
                        )}

                        {isEditing ? (
                          <div className="grid md:grid-cols-3 gap-4 mt-4">
                            <div>
                              <label className="block text-xs text-gray-600 mb-1">Tasa (%)</label>
                              <div className="flex items-center gap-2">
                                <input
                                  type="number"
                                  value={tasa.tasa}
                                  onChange={(e) => updateTasa(tasa.id, 'tasa', parseFloat(e.target.value) || 0)}
                                  step="0.1"
                                  min="0"
                                  max="100"
                                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                                />
                                <Percent className="w-4 h-4 text-gray-400" />
                              </div>
                            </div>

                            <div>
                              <label className="block text-xs text-gray-600 mb-1">Tipo</label>
                              <select
                                value={tasa.tipo}
                                onChange={(e) => updateTasa(tasa.id, 'tipo', e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                              >
                                <option value="IVA">IVA</option>
                                <option value="IGIC">IGIC</option>
                                <option value="Custom">Personalizado</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-xs text-gray-600 mb-1">Aplicar a</label>
                              <select
                                value={tasa.aplicarA}
                                onChange={(e) => updateTasa(tasa.id, 'aplicarA', e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                              >
                                <option value="productos">Solo Productos</option>
                                <option value="servicios">Solo Servicios</option>
                                <option value="ambos">Productos y Servicios</option>
                              </select>
                            </div>

                            <div className="md:col-span-3">
                              <label className="block text-xs text-gray-600 mb-1">Región</label>
                              <input
                                type="text"
                                value={tasa.region}
                                onChange={(e) => updateTasa(tasa.id, 'region', e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
                              <Percent className="w-4 h-4 text-purple-600" />
                              <span className="font-bold text-purple-900">{tasa.tasa}%</span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-600">
                              <MapPin className="w-4 h-4" />
                              <span>{tasa.region}</span>
                            </div>
                            <span className="text-gray-500">
                              • {tasa.aplicarA === 'ambos' ? 'Productos y Servicios' : tasa.aplicarA}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => setEditingTasa(isEditing ? null : tasa.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          isEditing
                            ? 'bg-green-100 text-green-600 hover:bg-green-200'
                            : 'hover:bg-gray-100 text-gray-600'
                        }`}
                      >
                        {isEditing ? <Check className="w-5 h-5" /> : <Settings className="w-5 h-5" />}
                      </button>

                      <button
                        onClick={() => deleteTasa(tasa.id)}
                        className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>

                      <button
                        onClick={() => toggleTasa(tasa.id)}
                        className={`relative w-14 h-7 rounded-full transition-colors ${
                          tasa.activo
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                            : 'bg-gray-300'
                        }`}
                      >
                        <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                          tasa.activo ? 'translate-x-7' : ''
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

      {/* Reglas de Negocio */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Reglas de Negocio</h2>
            <p className="text-sm text-gray-600 mt-1">
              Configura reglas especiales para aplicar impuestos automáticamente
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all">
            <Plus className="w-5 h-5" />
            Nueva Regla
          </button>
        </div>

        <div className="space-y-3">
          {reglas.map((regla) => (
            <div
              key={regla.id}
              className={`p-4 rounded-xl border-2 transition-all ${
                regla.activa
                  ? 'border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`font-semibold ${regla.activa ? 'text-gray-900' : 'text-gray-500'}`}>
                      {regla.nombre}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="font-medium">Si:</span>
                    <span className="px-2 py-0.5 bg-white rounded text-xs border border-gray-200">
                      {regla.condicion}
                    </span>
                    <span className="font-medium">→ Aplicar:</span>
                    <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                      {regla.tasaAplicar}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => toggleRegla(regla.id)}
                  className={`relative w-14 h-7 rounded-full transition-colors ${
                    regla.activa
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                      : 'bg-gray-300'
                  }`}
                >
                  <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                    regla.activa ? 'translate-x-7' : ''
                  }`} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Calculadora de Ejemplo */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Calculator className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Calculadora de Impuestos</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Precio Base (sin impuestos)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                defaultValue="100"
                step="0.01"
                className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <span className="text-gray-600">€</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tasa a Aplicar
            </label>
            <select className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent">
              {tasasActivas.map((tasa) => (
                <option key={tasa.id} value={tasa.tasa}>
                  {tasa.nombre} ({tasa.tasa}%)
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2 p-6 bg-gradient-to-r from-purple-100 via-fuchsia-100 to-pink-100 rounded-xl">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-600 mb-1">Base Imponible</p>
                <p className="text-2xl font-bold text-gray-900">100.00€</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Impuestos (21%)</p>
                <p className="text-2xl font-bold text-purple-600">21.00€</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Precio Final</p>
                <p className="text-2xl font-bold text-pink-600">121.00€</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Información Legal */}
      <div className="bg-gradient-to-r from-purple-50 via-fuchsia-50 to-pink-50 rounded-xl p-6 border border-purple-200">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-purple-900 mb-1">
              Información Importante sobre Impuestos
            </h3>
            <ul className="text-purple-700 text-sm space-y-1">
              <li>• Asegúrate de aplicar las tasas correctas según tu ubicación y legislación local</li>
              <li>• Las ventas intracomunitarias pueden estar exentas con NIF-IVA válido</li>
              <li>• Consulta con un asesor fiscal para configurar correctamente tus impuestos</li>
              <li>• Canarias, Ceuta y Melilla tienen regímenes fiscales especiales</li>
              <li>• Actualiza las tasas cuando haya cambios legislativos</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfiguracionImpuestos;
