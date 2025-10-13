const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// ========== PRODUCTOS ==========

export interface Producto {
  _id?: string;
  id?: string;
  nombre: string;
  precio: number;
  descripcion: string;
  modalidad: 'presencial' | 'online' | 'hibrido';
  tipo: 'individual' | 'grupal' | 'membresia' | 'programa' | 'bono';
  disponibilidad: boolean;
  cupos?: number;
  duracion: string;
  caracteristicas: string[];
  imagen: string;
  categoria?: 'entrenamiento' | 'nutricion' | 'bienestar' | 'evaluacion' | 'mixto';
  stock?: number;
  activo?: boolean;
  etiquetas?: string[];
  incluye?: string[];
  descuento?: {
    porcentaje: number;
    fechaInicio: Date;
    fechaFin: Date;
  };
  ventasTotales?: number;
  valoracion?: {
    promedio: number;
    cantidadReviews: number;
  };
}

// Función helper para normalizar productos
const normalizeProducto = (producto: any): Producto => ({
  ...producto,
  id: producto._id || producto.id
});

export const getProductos = async (): Promise<Producto[]> => {
  try {
    const response = await fetch(`${API_URL}/productos`);
    if (!response.ok) {
      throw new Error('Error al obtener productos');
    }
    const data = await response.json();
    return data.data.map(normalizeProducto);
  } catch (error) {
    console.error('Error fetching productos:', error);
    return [];
  }
};

export const getProductosByType = async (type: Producto['tipo']): Promise<Producto[]> => {
  try {
    const response = await fetch(`${API_URL}/productos/tipo/${type}`);
    if (!response.ok) {
      throw new Error('Error al obtener productos por tipo');
    }
    const data = await response.json();
    return data.data.map(normalizeProducto);
  } catch (error) {
    console.error('Error fetching productos by type:', error);
    return [];
  }
};

export const getBestSellingProducts = async (): Promise<Producto[]> => {
  try {
    const response = await fetch(`${API_URL}/productos/bestsellers`);
    if (!response.ok) {
      throw new Error('Error al obtener productos más vendidos');
    }
    const data = await response.json();
    return data.data.map(normalizeProducto);
  } catch (error) {
    console.error('Error fetching best selling products:', error);
    return [];
  }
};

export const getProducto = async (id: string): Promise<Producto | null> => {
  try {
    const response = await fetch(`${API_URL}/productos/${id}`);
    if (!response.ok) {
      throw new Error('Error al obtener producto');
    }
    const data = await response.json();
    return normalizeProducto(data.data);
  } catch (error) {
    console.error('Error fetching producto:', error);
    return null;
  }
};

export const createProducto = async (producto: Omit<Producto, 'id' | '_id'>): Promise<Producto> => {
  try {
    const response = await fetch(`${API_URL}/productos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(producto)
    });
    if (!response.ok) {
      throw new Error('Error al crear producto');
    }
    const data = await response.json();
    return normalizeProducto(data.data);
  } catch (error) {
    console.error('Error creating producto:', error);
    throw error;
  }
};

export const updateProducto = async (id: string, producto: Partial<Producto>): Promise<Producto> => {
  try {
    const response = await fetch(`${API_URL}/productos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(producto)
    });
    if (!response.ok) {
      throw new Error('Error al actualizar producto');
    }
    const data = await response.json();
    return normalizeProducto(data.data);
  } catch (error) {
    console.error('Error updating producto:', error);
    throw error;
  }
};

export const deleteProducto = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/productos/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (!response.ok) {
      throw new Error('Error al eliminar producto');
    }
  } catch (error) {
    console.error('Error deleting producto:', error);
    throw error;
  }
};

// ========== SERVICIOS ==========

export interface Servicio {
  _id?: string;
  id?: string;
  nombre: string;
  precio: number;
  descripcion: string;
  modalidad: 'presencial' | 'online' | 'hibrido';
  tipoServicio: 'sesion' | 'consulta' | 'evaluacion' | 'taller' | 'programa' | 'asesoria';
  duracion: {
    valor: number;
    unidad: 'minutos' | 'horas' | 'dias' | 'semanas' | 'meses';
  };
  disponibilidad: boolean;
  capacidadMaxima?: number;
  caracteristicas: string[];
  requisitos?: string[];
  incluye?: string[];
  imagen: string;
  categoria: 'entrenamiento' | 'nutricion' | 'bienestar' | 'evaluacion' | 'mixto';
  activo?: boolean;
  horarios?: Array<{
    diaSemana: string;
    horaInicio: string;
    horaFin: string;
    disponible: boolean;
  }>;
  trainer?: any;
  especialidad?: string;
  nivel?: 'principiante' | 'intermedio' | 'avanzado' | 'todos';
  descuento?: {
    porcentaje: number;
    fechaInicio: Date;
    fechaFin: Date;
  };
  reservasTotales?: number;
  valoracion?: {
    promedio: number;
    cantidadReviews: number;
  };
  politicaCancelacion?: string;
  materialesIncluidos?: boolean;
  ubicacion?: string;
  etiquetas?: string[];
}

// Función helper para normalizar servicios
const normalizeServicio = (servicio: any): Servicio => ({
  ...servicio,
  id: servicio._id || servicio.id
});

export const getServicios = async (): Promise<Servicio[]> => {
  try {
    const response = await fetch(`${API_URL}/servicios`);
    if (!response.ok) {
      throw new Error('Error al obtener servicios');
    }
    const data = await response.json();
    return data.data.map(normalizeServicio);
  } catch (error) {
    console.error('Error fetching servicios:', error);
    return [];
  }
};

export const getServiciosByType = async (type: Servicio['tipoServicio']): Promise<Servicio[]> => {
  try {
    const response = await fetch(`${API_URL}/servicios/tipo/${type}`);
    if (!response.ok) {
      throw new Error('Error al obtener servicios por tipo');
    }
    const data = await response.json();
    return data.data.map(normalizeServicio);
  } catch (error) {
    console.error('Error fetching servicios by type:', error);
    return [];
  }
};

export const getServiciosByTrainer = async (trainerId: string): Promise<Servicio[]> => {
  try {
    const response = await fetch(`${API_URL}/servicios/trainer/${trainerId}`);
    if (!response.ok) {
      throw new Error('Error al obtener servicios por trainer');
    }
    const data = await response.json();
    return data.data.map(normalizeServicio);
  } catch (error) {
    console.error('Error fetching servicios by trainer:', error);
    return [];
  }
};

export const getPopularServicios = async (): Promise<Servicio[]> => {
  try {
    const response = await fetch(`${API_URL}/servicios/populares`);
    if (!response.ok) {
      throw new Error('Error al obtener servicios populares');
    }
    const data = await response.json();
    return data.data.map(normalizeServicio);
  } catch (error) {
    console.error('Error fetching popular servicios:', error);
    return [];
  }
};

export const getServicio = async (id: string): Promise<Servicio | null> => {
  try {
    const response = await fetch(`${API_URL}/servicios/${id}`);
    if (!response.ok) {
      throw new Error('Error al obtener servicio');
    }
    const data = await response.json();
    return normalizeServicio(data.data);
  } catch (error) {
    console.error('Error fetching servicio:', error);
    return null;
  }
};

export const createServicio = async (servicio: Omit<Servicio, 'id' | '_id'>): Promise<Servicio> => {
  try {
    const response = await fetch(`${API_URL}/servicios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(servicio)
    });
    if (!response.ok) {
      throw new Error('Error al crear servicio');
    }
    const data = await response.json();
    return normalizeServicio(data.data);
  } catch (error) {
    console.error('Error creating servicio:', error);
    throw error;
  }
};

export const updateServicio = async (id: string, servicio: Partial<Servicio>): Promise<Servicio> => {
  try {
    const response = await fetch(`${API_URL}/servicios/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(servicio)
    });
    if (!response.ok) {
      throw new Error('Error al actualizar servicio');
    }
    const data = await response.json();
    return normalizeServicio(data.data);
  } catch (error) {
    console.error('Error updating servicio:', error);
    throw error;
  }
};

export const deleteServicio = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/servicios/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (!response.ok) {
      throw new Error('Error al eliminar servicio');
    }
  } catch (error) {
    console.error('Error deleting servicio:', error);
    throw error;
  }
};

export const checkDisponibilidadDia = async (id: string, dia: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/servicios/${id}/disponibilidad/${dia}`);
    if (!response.ok) {
      throw new Error('Error al verificar disponibilidad');
    }
    const data = await response.json();
    return data.data.disponible;
  } catch (error) {
    console.error('Error checking disponibilidad:', error);
    return false;
  }
};
