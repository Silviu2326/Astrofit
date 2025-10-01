import React from 'react';

interface CuponData {
  minimoCompra?: number;
  productosAplicables?: string[];
}

interface ConfiguracionAvanzadaProps {
  cuponData: CuponData;
  onFormChange: (data: Partial<CuponData>) => void;
}

const ConfiguracionAvanzada: React.FC<ConfiguracionAvanzadaProps> = ({ cuponData, onFormChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'productosAplicables') {
      onFormChange({ [name]: value.split(',').map(s => s.trim()).filter(s => s !== '') });
    } else {
      onFormChange({ [name]: value });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-semibold mb-4">Configuración Avanzada</h2>
      <div className="mb-4">
        <label htmlFor="minimoCompra" className="block text-sm font-medium text-gray-700">Mínimo de Compra</label>
        <input
          type="number"
          id="minimoCompra"
          name="minimoCompra"
          value={cuponData.minimoCompra || ''}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          min="0"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="productosAplicables" className="block text-sm font-medium text-gray-700">Productos Aplicables (IDs separados por comas)</label>
        <textarea
          id="productosAplicables"
          name="productosAplicables"
          value={cuponData.productosAplicables?.join(',') || ''}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        ></textarea>
      </div>
    </div>
  );
};

export default ConfiguracionAvanzada;
