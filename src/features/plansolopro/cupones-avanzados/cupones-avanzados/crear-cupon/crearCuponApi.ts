import axios from 'axios';

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

const API_URL = '/api/cupones'; // Asume una API REST en esta ruta

export const crearCupon = async (cupon: CuponData): Promise<any> => {
  try {
    const response = await axios.post(API_URL, cupon);
    return response.data;
  } catch (error) {
    console.error('Error al crear cupón:', error);
    throw error;
  }
};

export const generarCodigoCupon = (): string => {
  // Lógica simple para generar un código alfanumérico
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
