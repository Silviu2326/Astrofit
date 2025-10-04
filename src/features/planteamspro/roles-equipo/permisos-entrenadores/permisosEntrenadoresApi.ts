import axios from 'axios';

const API_URL = '/api/permisos-entrenadores'; // Ajusta esta URL a tu backend

export interface Permiso {
  id: string;
  nombre: string;
  descripcion: string;
}

export interface RolEntrenador {
  id: string;
  nombre: string;
  permisos: Permiso[];
}

export interface Entrenador {
  id: string;
  nombre: string;
  rolId: string;
}

export interface PermisoEntrenador {
  entrenadorId: string;
  permisoId: string;
  permitido: boolean;
}

export interface AuditLog {
  id: string;
  usuario: string;
  accion: string;
  fecha: string;
  details: any;
}

export interface SecurityAlert {
  id: string;
  tipo: string;
  descripcion: string;
  fecha: string;
  severidad: string;
}

export const getEntrenadores = async (): Promise<Entrenador[]> => {
  const response = await axios.get(`${API_URL}/entrenadores`);
  return response.data;
};

export const getPermisos = async (): Promise<Permiso[]> => {
  const response = await axios.get(`${API_URL}/permisos`);
  return response.data;
};

export const getPermisosPorEntrenador = async (): Promise<PermisoEntrenador[]> => {
  const response = await axios.get(`${API_URL}/permisos-entrenador`);
  return response.data;
};

export const updatePermisoEntrenador = async (permiso: PermisoEntrenador): Promise<PermisoEntrenador> => {
  const response = await axios.post(`${API_URL}/permisos-entrenador`, permiso);
  return response.data;
};

// Nuevos endpoints para auditoría y seguridad
export const getAuditLogs = async (): Promise<AuditLog[]> => {
  const response = await axios.get(`${API_URL}/auditoria/logs`);
  return response.data;
};

export const getSecurityAlerts = async (): Promise<SecurityAlert[]> => {
  const response = await axios.get(`${API_URL}/seguridad/alertas`);
  return response.data;
};

export const updateRolEntrenador = async (rol: RolEntrenador): Promise<RolEntrenador> => {
  const response = await axios.post(`${API_URL}/roles`, rol);
  return response.data;
};

export const getLogsAcceso = async (): Promise<any[]> => {
  const response = await axios.get(`${API_URL}/logs-acceso`);
  return response.data;
};
