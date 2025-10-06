import React from 'react';
import { Trophy, Calendar, TrendingUp } from 'lucide-react';

interface PR {
  id: string;
  ejercicio: string;
  valor: number;
  unidad: string;
  fecha: string;
  atleta: string;
  mejoraPrevio?: number;
}

interface TablaPRsProps {
  prs: PR[];
}

const TablaPRs: React.FC<TablaPRsProps> = ({ prs }) => {
  if (!prs || prs.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
          Records Personales (PRs)
        </h3>
        <p className="text-gray-500 text-center py-8">No hay PRs registrados</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold flex items-center">
          <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
          Records Personales (PRs)
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ejercicio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Atleta
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Marca
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mejora
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {prs.map((pr) => (
              <tr key={pr.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{pr.ejercicio}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{pr.atleta}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Trophy className="h-4 w-4 text-yellow-500 mr-2" />
                    <span className="text-sm font-semibold text-gray-900">
                      {pr.valor} {pr.unidad}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(pr.fecha).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {pr.mejoraPrevio ? (
                    <div className="flex items-center text-sm text-green-600">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      +{pr.mejoraPrevio.toFixed(1)}%
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">Primer PR</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {prs.length > 5 && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Mostrando {prs.length} record{prs.length !== 1 ? 's' : ''} personal{prs.length !== 1 ? 'es' : ''}
          </p>
        </div>
      )}
    </div>
  );
};

export default TablaPRs;
