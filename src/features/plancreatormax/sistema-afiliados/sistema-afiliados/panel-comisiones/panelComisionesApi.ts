// src/features/sistema-afiliados/panel-comisiones/panelComisionesApi.ts

// Este archivo contendrá las funciones para interactuar con la API
// relacionadas con la gestión de comisiones de afiliados.

import axios from 'axios';

const API_BASE_URL = '/api/afiliados/comisiones'; // Ajusta la URL base de tu API

interface Transaccion {
  id: string;
  afiliadoId: string;
  montoVenta: number;
  porcentajeComision: number;
  montoComision: number;
  estado: 'pendiente' | 'pagado' | 'procesando';
  fecha: string;
}

interface ResumenComisiones {
  totalGenerado: number;
  totalPendiente: number;
  totalPagado: number;
  totalProcesando: number;
}

// Obtener resumen de comisiones
export const getResumenComisiones = async (): Promise<ResumenComisiones> => {
  try {
    const response = await axios.get<ResumenComisiones>(`${API_BASE_URL}/resumen`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el resumen de comisiones:', error);
    throw error;
  }
};

// Obtener lista detallada de transacciones
export const getTransacciones = async (afiliadoId?: string): Promise<Transaccion[]> => {
  try {
    const url = afiliadoId ? `${API_BASE_URL}/transacciones?afiliadoId=${afiliadoId}` : `${API_BASE_URL}/transacciones`;
    const response = await axios.get<Transaccion[]>(url);
    return response.data;
  } catch (error) {
    console.error('Error al obtener las transacciones:', error);
    throw error;
  }
};

// Actualizar el estado de una transacción
export const updateTransaccionEstado = async (
  transaccionId: string,
  estado: 'pendiente' | 'pagado' | 'procesando'
): Promise<Transaccion> => {
  try {
    const response = await axios.put<Transaccion>(`${API_BASE_URL}/transacciones/${transaccionId}/estado`, { estado });
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el estado de la transacción:', error);
    throw error;
  }
};

// Configurar porcentaje de comisión para un afiliado (ejemplo)
export const setPorcentajeComisionAfiliado = async (
  afiliadoId: string,
  porcentaje: number
): Promise<any> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/afiliados/${afiliadoId}/configurar-comision`, { porcentaje });
    return response.data;
  } catch (error) {
    console.error('Error al configurar el porcentaje de comisión:', error);
    throw error;
  }
};

// Otros endpoints relacionados con la gestión de pagos a afiliados
// ...
