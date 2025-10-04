
import React from 'react';
import { Beneficiario } from '../empleadosSociosApi';

interface TablaBeneficiariosProps {
  beneficiarios: Beneficiario[];
}

const TablaBeneficiarios: React.FC<TablaBeneficiariosProps> = ({ beneficiarios }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Nombre</th>
            <th className="py-3 px-6 text-left">Empresa</th>
            <th className="py-3 px-6 text-left">Departamento</th>
            <th className="py-3 px-6 text-left">Estado</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {beneficiarios.map((beneficiario) => (
            <tr key={beneficiario.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">{beneficiario.nombre}</td>
              <td className="py-3 px-6 text-left">{beneficiario.empresa}</td>
              <td className="py-3 px-6 text-left">{beneficiario.departamento}</td>
              <td className="py-3 px-6 text-left">
                <span className={`py-1 px-3 rounded-full text-xs ${beneficiario.estado === 'activo' ? 'bg-green-200 text-green-600' : beneficiario.estado === 'baja' ? 'bg-red-200 text-red-600' : 'bg-yellow-200 text-yellow-600'}`}>
                  {beneficiario.estado}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaBeneficiarios;
