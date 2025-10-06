
import axios from 'axios';

const API_URL = '/api/productos'; // Adjust as per your API endpoint

export interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagenes: string[];
  stock: number;
  estado: 'disponible' | 'agotado' | 'preventa';
  variantes: {
    talla?: string;
    color?: string;
    stock: number;
  }[];
}

export const getProductos = async (): Promise<Producto[]> => {
  const response = await axios.get<Producto[]>(API_URL);
  return response.data;
};

export const getProductoById = async (id: string): Promise<Producto> => {
  const response = await axios.get<Producto>(`${API_URL}/${id}`);
  return response.data;
};

export const createProducto = async (producto: Omit<Producto, 'id'>): Promise<Producto> => {
  const response = await axios.post<Producto>(API_URL, producto);
  return response.data;
};

export const updateProducto = async (id: string, producto: Partial<Producto>): Promise<Producto> => {
  const response = await axios.put<Producto>(`${API_URL}/${id}`, producto);
  return response.data;
};

export const deleteProducto = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
