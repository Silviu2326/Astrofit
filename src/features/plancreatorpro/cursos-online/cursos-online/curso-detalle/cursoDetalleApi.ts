import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Leccion {
  id: string;
  titulo: string;
}

interface Modulo {
  id: string;
  titulo: string;
  lecciones: Leccion[];
}

interface Alumno {
  id: string;
  nombre: string;
  avatar: string;
}

export interface Curso {
  id: string;
  titulo: string;
  descripcion: string;
  imagenPortada: string;
  modulos: Modulo[];
  alumnos: Alumno[];
  progresoMedio: number;
}

export const cursoDetalleApi = createApi({
  reducerPath: 'cursoDetalleApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/cursos/' }), // Adjust base URL as needed
  endpoints: (builder) => ({
    getCursoById: builder.query<Curso, string>({
      query: (id) => id,
    }),
  }),
});

export const { useGetCursoByIdQuery } = cursoDetalleApi;
