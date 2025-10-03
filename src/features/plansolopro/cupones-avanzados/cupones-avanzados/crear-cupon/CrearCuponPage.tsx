import React, { useState } from 'react';
import FormularioCupon from './components/FormularioCupon';
import VistaPreviaCupon from './components/VistaPreviaCupon';
import ConfiguracionAvanzada from './components/ConfiguracionAvanzada';

interface CuponData {
  nombre: string;
  tipo: 'porcentaje' | 'cantidadFija';
  valor: number;
  fechaInicio: string;
  fechaFin: string;
  usosPermitidos: number;
  clientesValidos: 'todos' | 'especificos';
  clientesEspecificos?: string[];
  minimoCompra?: number;
  productosAplicables?: string[];
}

const CrearCuponPage: React.FC = () => {
  const [cuponData, setCuponData] = useState<CuponData>({
    nombre: '',
    tipo: 'porcentaje',
    valor: 0,
    fechaInicio: '',
    fechaFin: '',
    usosPermitidos: 1,
    clientesValidos: 'todos',
  });

  const handleFormChange = (data: Partial<CuponData>) => {
    setCuponData((prev) => ({ ...prev, ...data }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Cupón a crear:', cuponData);
    // Aquí se integraría la llamada a crearCuponApi.ts
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Crear Nuevo Cupón</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <FormularioCupon cuponData={cuponData} onFormChange={handleFormChange} />
          <ConfiguracionAvanzada cuponData={cuponData} onFormChange={handleFormChange} />
          <button
            type="submit"
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition-colors"
          >
            Crear Cupón
          </button>
        </div>
        <div>
          <VistaPreviaCupon cuponData={cuponData} />
        </div>
      </form>
    </div>
  );
};

export default CrearCuponPage;
