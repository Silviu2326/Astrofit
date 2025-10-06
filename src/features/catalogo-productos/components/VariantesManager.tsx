import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react';
import type { OpcionVariante, VarianteProducto } from '../types';

interface VariantesManagerProps {
  opcionesVariantes: OpcionVariante[];
  variantes: VarianteProducto[];
  precioBase: number;
  onUpdate: (opcionesVariantes: OpcionVariante[], variantes: VarianteProducto[]) => void;
}

const VariantesManager: React.FC<VariantesManagerProps> = ({
  opcionesVariantes,
  variantes,
  precioBase,
  onUpdate
}) => {
  const [opciones, setOpciones] = useState<OpcionVariante[]>(opcionesVariantes);
  const [variantesState, setVariantesState] = useState<VarianteProducto[]>(variantes);
  const [nuevaOpcion, setNuevaOpcion] = useState({ nombre: '', valores: '' });
  const [editandoOpcion, setEditandoOpcion] = useState<string | null>(null);

  useEffect(() => {
    onUpdate(opciones, variantesState);
  }, [opciones, variantesState]);

  const agregarOpcion = () => {
    if (nuevaOpcion.nombre.trim() && nuevaOpcion.valores.trim()) {
      const valores = nuevaOpcion.valores.split(',').map(v => v.trim()).filter(v => v);

      const nuevaOpcionVariante: OpcionVariante = {
        id: Date.now().toString(),
        nombre: nuevaOpcion.nombre.trim(),
        valores
      };

      setOpciones([...opciones, nuevaOpcionVariante]);
      setNuevaOpcion({ nombre: '', valores: '' });

      // Generar variantes automáticamente
      generarVariantes([...opciones, nuevaOpcionVariante]);
    }
  };

  const eliminarOpcion = (id: string) => {
    const nuevasOpciones = opciones.filter(o => o.id !== id);
    setOpciones(nuevasOpciones);
    generarVariantes(nuevasOpciones);
  };

  const generarVariantes = (opcionesActuales: OpcionVariante[]) => {
    if (opcionesActuales.length === 0) {
      // Sin opciones, crear una variante por defecto
      const varianteDefault: VarianteProducto = {
        id: 'default',
        sku: generarSKU('DEFAULT', {}),
        nombre: 'Predeterminada',
        atributos: {},
        precio: precioBase,
        stock: 0,
        stockMinimo: 5,
        activo: true
      };
      setVariantesState([varianteDefault]);
      return;
    }

    // Generar combinaciones
    const combinaciones = generarCombinaciones(opcionesActuales);

    const nuevasVariantes = combinaciones.map(combinacion => {
      // Buscar si existe una variante con estos atributos
      const varianteExistente = variantesState.find(v =>
        JSON.stringify(v.atributos) === JSON.stringify(combinacion.atributos)
      );

      if (varianteExistente) {
        return varianteExistente;
      }

      // Crear nueva variante
      return {
        id: Date.now().toString() + Math.random(),
        sku: generarSKU(combinacion.nombre, combinacion.atributos),
        nombre: combinacion.nombre,
        atributos: combinacion.atributos,
        precio: precioBase,
        stock: 0,
        stockMinimo: 5,
        activo: true
      };
    });

    setVariantesState(nuevasVariantes);
  };

  const generarCombinaciones = (opcionesActuales: OpcionVariante[]): Array<{nombre: string, atributos: Record<string, string>}> => {
    if (opcionesActuales.length === 0) return [];

    const resultado: Array<{nombre: string, atributos: Record<string, string>}> = [];

    const generar = (indice: number, atributosActuales: Record<string, string>) => {
      if (indice === opcionesActuales.length) {
        const nombre = Object.values(atributosActuales).join(' / ');
        resultado.push({ nombre, atributos: { ...atributosActuales } });
        return;
      }

      const opcion = opcionesActuales[indice];
      opcion.valores.forEach(valor => {
        generar(indice + 1, { ...atributosActuales, [opcion.nombre]: valor });
      });
    };

    generar(0, {});
    return resultado;
  };

  const generarSKU = (nombre: string, atributos: Record<string, string>): string => {
    const prefijo = nombre.substring(0, 3).toUpperCase().replace(/\s/g, '');
    const sufijo = Object.values(atributos)
      .map(v => v.substring(0, 3).toUpperCase().replace(/\s/g, ''))
      .join('-');

    return sufijo ? `${prefijo}-${sufijo}` : prefijo;
  };

  const actualizarVariante = (id: string, campo: keyof VarianteProducto, valor: any) => {
    setVariantesState(variantesState.map(v =>
      v.id === id ? { ...v, [campo]: valor } : v
    ));
  };

  return (
    <div className="space-y-6">
      {/* Opciones de variantes */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Opciones de Variantes</h3>

        {/* Lista de opciones existentes */}
        <div className="space-y-3 mb-4">
          {opciones.map(opcion => (
            <div key={opcion.id} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">{opcion.nombre}</h4>
                  <div className="flex flex-wrap gap-2">
                    {opcion.valores.map((valor, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-white text-blue-700 rounded-full text-sm border border-blue-300"
                      >
                        {valor}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => eliminarOpcion(opcion.id)}
                  className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Agregar nueva opción */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3">Agregar Opción</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre de la opción
              </label>
              <input
                type="text"
                value={nuevaOpcion.nombre}
                onChange={(e) => setNuevaOpcion({ ...nuevaOpcion, nombre: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ej: Talla, Color, Material"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Valores (separados por comas)
              </label>
              <input
                type="text"
                value={nuevaOpcion.valores}
                onChange={(e) => setNuevaOpcion({ ...nuevaOpcion, valores: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ej: S, M, L, XL"
              />
            </div>
          </div>
          <button
            onClick={agregarOpcion}
            disabled={!nuevaOpcion.nombre.trim() || !nuevaOpcion.valores.trim()}
            className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4" />
            Agregar Opción
          </button>
        </div>

        {opciones.length > 0 && (
          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              💡 Se generarán <strong>{variantesState.length}</strong> variantes basadas en las combinaciones de opciones
            </p>
          </div>
        )}
      </div>

      {/* Tabla de variantes generadas */}
      {variantesState.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">
            Variantes Generadas ({variantesState.length})
          </h3>

          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">SKU</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Variante</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Precio</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Stock</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Stock Mín</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Código Barras</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase">Activo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {variantesState.map((variante, idx) => (
                    <tr key={variante.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={variante.sku}
                          onChange={(e) => actualizarVariante(variante.id, 'sku', e.target.value)}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 font-mono"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm font-medium text-gray-900">{variante.nombre}</div>
                        {Object.keys(variante.atributos).length > 0 && (
                          <div className="flex gap-1 mt-1">
                            {Object.entries(variante.atributos).map(([key, value]) => (
                              <span key={key} className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                                {value}
                              </span>
                            ))}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="relative">
                          <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">$</span>
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={variante.precio}
                            onChange={(e) => actualizarVariante(variante.id, 'precio', Number(e.target.value))}
                            className="w-24 pl-6 pr-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          min="0"
                          value={variante.stock}
                          onChange={(e) => actualizarVariante(variante.id, 'stock', Number(e.target.value))}
                          className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          min="0"
                          value={variante.stockMinimo}
                          onChange={(e) => actualizarVariante(variante.id, 'stockMinimo', Number(e.target.value))}
                          className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={variante.codigoBarras || ''}
                          onChange={(e) => actualizarVariante(variante.id, 'codigoBarras', e.target.value)}
                          className="w-32 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 font-mono"
                          placeholder="EAN/UPC"
                        />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={variante.activo}
                            onChange={(e) => actualizarVariante(variante.id, 'activo', e.target.checked)}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                          />
                        </label>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Acciones masivas */}
          <div className="mt-4 flex gap-3">
            <button
              onClick={() => {
                const precio = prompt('Precio para todas las variantes:');
                if (precio) {
                  setVariantesState(variantesState.map(v => ({ ...v, precio: Number(precio) })));
                }
              }}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
            >
              Aplicar precio a todas
            </button>
            <button
              onClick={() => {
                const stock = prompt('Stock inicial para todas las variantes:');
                if (stock) {
                  setVariantesState(variantesState.map(v => ({ ...v, stock: Number(stock) })));
                }
              }}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
            >
              Aplicar stock a todas
            </button>
            <button
              onClick={() => {
                setVariantesState(variantesState.map(v => ({ ...v, activo: true })));
              }}
              className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm"
            >
              Activar todas
            </button>
            <button
              onClick={() => {
                setVariantesState(variantesState.map(v => ({ ...v, activo: false })));
              }}
              className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
            >
              Desactivar todas
            </button>
          </div>

          {/* Resumen */}
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-600 mb-1">Stock Total</p>
              <p className="text-2xl font-bold text-blue-900">
                {variantesState.reduce((sum, v) => sum + v.stock, 0)}
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-sm text-green-600 mb-1">Variantes Activas</p>
              <p className="text-2xl font-bold text-green-900">
                {variantesState.filter(v => v.activo).length}
              </p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
              <p className="text-sm text-purple-600 mb-1">Valor Inventario</p>
              <p className="text-2xl font-bold text-purple-900">
                ${variantesState.reduce((sum, v) => sum + (v.precio * v.stock), 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      )}

      {variantesState.length === 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray-500">
            Agrega opciones de variantes para generar SKUs automáticamente
          </p>
        </div>
      )}
    </div>
  );
};

export default VariantesManager;
