import React from 'react';
import { generarCodigoCupon } from '../crearCuponApi';

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

interface VistaPreviaCuponProps {
  cuponData: CuponData;
}

const VistaPreviaCupon: React.FC<VistaPreviaCuponProps> = ({ cuponData }) => {
  const displayValue = cuponData.tipo === 'porcentaje' ? `${cuponData.valor}%` : `${cuponData.valor}€`;
  const codigoGenerado = generarCodigoCupon(); // Genera un código para la vista previa

  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-lg shadow-xl text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full translate-x-1/2 translate-y-1/2"></div>

      <h2 className="text-2xl font-bold mb-2">Vista Previa del Cupón</h2>
      <div className="bg-white bg-opacity-20 p-4 rounded-md backdrop-blur-sm">
        <p className="text-lg font-semibold">{cuponData.nombre || 'Nombre del Cupón'}</p>
        <p className="text-4xl font-extrabold my-2">{displayValue} OFF</p>
        <p className="text-sm">Código: <span className="font-mono bg-white text-purple-700 px-2 py-1 rounded">{codigoGenerado}</span></p>
        <p className="text-xs mt-2">Válido desde: {cuponData.fechaInicio || 'YYYY-MM-DD'} hasta: {cuponData.fechaFin || 'YYYY-MM-DD'}</p>
        {cuponData.minimoCompra && (
          <p className="text-xs">Compra mínima de: {cuponData.minimoCompra}€</p>
        )}
        {cuponData.productosAplicables && cuponData.productosAplicables.length > 0 && (
          <p className="text-xs">Aplica a productos seleccionados</p>
        )}
        <p className="text-xs">Usos restantes: {cuponData.usosPermitidos}</p>
      </div>
      <p className="text-xs mt-4 text-center opacity-80">*Esta es una vista previa. El código final se generará al crear el cupón.</p>
    </div>
  );
};

export default VistaPreviaCupon;
