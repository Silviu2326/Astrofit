import React from 'react';

interface CuponData {
  nombre: string;
  tipo: 'porcentaje' | 'cantidadFija';
  valor: number;
  fechaInicio: string;
  fechaFin: string;
  usosPermitidos: number;
  clientesValidos: 'todos' | 'especificos';
  clientesEspecificos?: string[];
}

interface FormularioCuponProps {
  cuponData: CuponData;
  onFormChange: (data: Partial<CuponData>) => void;
}

const FormularioCupon: React.FC<FormularioCuponProps> = ({ cuponData, onFormChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onFormChange({ [name]: value });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-semibold mb-4">Detalles del Cupón</h2>
      <div className="mb-4">
        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre del Cupón</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={cuponData.nombre}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">Tipo de Descuento</label>
        <select
          id="tipo"
          name="tipo"
          value={cuponData.tipo}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        >
          <option value="porcentaje">Porcentaje</option>
          <option value="cantidadFija">Cantidad Fija</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="valor" className="block text-sm font-medium text-gray-700">Valor</label>
        <input
          type="number"
          id="valor"
          name="valor"
          value={cuponData.valor}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          min="0"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="fechaInicio" className="block text-sm font-medium text-gray-700">Fecha de Inicio</label>
          <input
            type="date"
            id="fechaInicio"
            name="fechaInicio"
            value={cuponData.fechaInicio}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="fechaFin" className="block text-sm font-medium text-gray-700">Fecha de Fin</label>
          <input
            type="date"
            id="fechaFin"
            name="fechaFin"
            value={cuponData.fechaFin}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="usosPermitidos" className="block text-sm font-medium text-gray-700">Número de Usos Permitidos</label>
        <input
          type="number"
          id="usosPermitidos"
          name="usosPermitidos"
          value={cuponData.usosPermitidos}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          min="1"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="clientesValidos" className="block text-sm font-medium text-gray-700">Clientes Válidos</label>
        <select
          id="clientesValidos"
          name="clientesValidos"
          value={cuponData.clientesValidos}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        >
          <option value="todos">Todos los clientes</option>
          <option value="especificos">Clientes específicos</option>
        </select>
      </div>

      {cuponData.clientesValidos === 'especificos' && (
        <div className="mb-4">
          <label htmlFor="clientesEspecificos" className="block text-sm font-medium text-gray-700">IDs de Clientes Específicos (separados por comas)</label>
          <input
            type="text"
            id="clientesEspecificos"
            name="clientesEspecificos"
            value={cuponData.clientesEspecificos?.join(',') || ''}
            onChange={(e) => onFormChange({ clientesEspecificos: e.target.value.split(',').map(s => s.trim()) })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
      )}
    </div>
  );
};

export default FormularioCupon;
