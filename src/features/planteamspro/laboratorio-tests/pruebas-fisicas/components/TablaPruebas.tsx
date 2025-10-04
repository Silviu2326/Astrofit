import React from 'react';
import { PruebaFisica, EstadoPrueba, Atleta } from '../pruebasFisicasApi';

interface TablaPruebasProps {
  pruebas: PruebaFisica[];
}

const getEstadoColor = (estado: EstadoPrueba): string => {
  switch (estado) {
    case 'programada':
      return 'text-blue-500';
    case 'en curso':
      return 'text-yellow-500';
    case 'completada':
      return 'text-green-500';
    case 'cancelada':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
};

const TablaPruebas: React.FC<TablaPruebasProps> = ({ pruebas }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Tipo de Prueba</th>
            <th className="py-3 px-6 text-left">Fecha</th>
            <th className="py-3 px-6 text-left">Atletas Participantes</th>
            <th className="py-3 px-6 text-left">Estado</th>
            <th className="py-3 px-6 text-left">Resultados</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {pruebas.map((prueba) => (
            <tr key={prueba.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">{prueba.tipo}</td>
              <td className="py-3 px-6 text-left">{prueba.fecha}</td>
              <td className="py-3 px-6 text-left">
                {prueba.atletasParticipantes.map((atleta: Atleta) => (
                  <span key={atleta.id} className="block">{atleta.nombre}</span>
                ))}
              </td>
              <td className="py-3 px-6 text-left">
                <span className={`font-medium ${getEstadoColor(prueba.estado)}`}>
                  {prueba.estado.charAt(0).toUpperCase() + prueba.estado.slice(1)}
                </span>
              </td>
              <td className="py-3 px-6 text-left">
                {prueba.resultados ? (
                  Object.entries(prueba.resultados).map(([atletaId, resultado]) => {
                    const atleta = prueba.atletasParticipantes.find(a => a.id === atletaId);
                    return (
                      <span key={atletaId} className="block">
                        {atleta?.nombre}: {resultado}
                      </span>
                    );
                  })
                ) : (
                  <span>N/A</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaPruebas;
