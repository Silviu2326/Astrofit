export interface Nutricionista {
  id: string;
  nombre: string;
  especialidad: string;
  contacto: string;
  telefono: string;
}

export interface Derivacion {
  id: string;
  clienteId: string;
  clienteNombre: string;
  nutricionistaId: string;
  nutricionistaNombre: string;
  fechaDerivacion: string;
  estado: 'Pendiente' | 'Completada' | 'Cancelada' | 'En Progreso';
  motivo: string;
  notas?: string;
  informacionCliente?: string;
}
