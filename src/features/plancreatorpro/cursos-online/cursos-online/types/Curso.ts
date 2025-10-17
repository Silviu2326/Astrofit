// Tipos relacionados con cursos y módulos
export interface Curso {
  id: string;
  titulo: string;
  descripcion: string;
  imagenPortada: string;
  precio: number;
  estado: 'borrador' | 'activo' | 'archivado' | 'pausado';
  categoria: string;
  duracion: number; // en minutos
  modulos: Modulo[];
  alumnos: Alumno[];
  progresoMedio: number; // porcentaje 0-100
  fechaCreacion: string;
  fechaActualizacion: string;
  instructorId: string;
}

export interface Modulo {
  id: string;
  titulo: string;
  descripcion: string;
  orden: number;
  lecciones: Leccion[];
}

export interface Alumno {
  id: string;
  nombre: string;
  avatar: string;
  email: string;
  fechaInscripcion: string;
  progreso: number; // porcentaje 0-100
  ultimaActividad: string;
}

