import React, { useState } from 'react';
import { Eye, Edit, Trash2, Copy, MoreVertical } from 'lucide-react';
import { Coupon } from '../listadoCuponesApi';
import { EtiquetasEstado } from './EtiquetasEstado';

interface TablaCuponesProps {
  cupones: Coupon[];
}

export const TablaCupones: React.FC<TablaCuponesProps> = ({ cupones }) => {
  const [selectedCupon, setSelectedCupon] = useState<string | null>(null);

  const handleVerDetalles = (cuponId: string) => {
    console.log('Ver detalles del cupón:', cuponId);
    setSelectedCupon(cuponId);
  };

  const handleEditar = (cuponId: string) => {
    console.log('Editar cupón:', cuponId);
  };

  const handleEliminar = (cuponId: string) => {
    console.log('Eliminar cupón:', cuponId);
    if (confirm('¿Estás seguro de que quieres eliminar este cupón?')) {
      // Lógica de eliminación
    }
  };

  const handleCopiarCodigo = (codigo: string) => {
    navigator.clipboard.writeText(codigo);
    alert('Código copiado al portapapeles');
  };

  const handleToggleEstado = (cuponId: string, estadoActual: string) => {
    console.log('Cambiar estado del cupón:', cuponId, estadoActual);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Código
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Valor
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fechas
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Usos
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cupones.map((cupon) => (
              <tr key={cupon.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900">{cupon.codigo}</span>
                    <button
                      onClick={() => handleCopiarCodigo(cupon.codigo)}
                      className="ml-2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                      title="Copiar código"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">
                    {cupon.tipo === 'porcentaje' ? 'Porcentaje' : 'Cantidad Fija'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-900">
                    {cupon.tipo === 'porcentaje' ? `${cupon.valor}%` : `€${cupon.valor}`}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div>
                    <div>Inicio: {cupon.fechaInicio}</div>
                    <div>Fin: {cupon.fechaFin}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-900">
                      {cupon.usosActuales} / {cupon.limiteUsos}
                    </span>
                    <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(cupon.usosActuales / cupon.limiteUsos) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <EtiquetasEstado estado={cupon.estado} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => handleVerDetalles(cupon.id)}
                      className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Ver detalles"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEditar(cupon.id)}
                      className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
                      title="Editar"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleToggleEstado(cupon.id, cupon.estado)}
                      className={`p-2 rounded-lg transition-colors ${
                        cupon.estado === 'activo' 
                          ? 'text-orange-600 hover:text-orange-800 hover:bg-orange-50' 
                          : 'text-green-600 hover:text-green-800 hover:bg-green-50'
                      }`}
                      title={cupon.estado === 'activo' ? 'Desactivar' : 'Activar'}
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEliminar(cupon.id)}
                      className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
