import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Curso, Leccion, Alumno, Quiz } from '../types';

export const cursoDetalleApi = createApi({
  reducerPath: 'cursoDetalleApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/cursos/`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Curso', 'Leccion', 'Alumno', 'Quiz'],
  endpoints: (builder) => ({
    getCursoById: builder.query<Curso, string>({
      query: (id) => id,
      providesTags: (result, error, id) => [{ type: 'Curso', id }],
      transformErrorResponse: (response: any) => {
        return {
          message: response?.data?.message || 'Error al obtener el curso',
          status: response?.status || 500,
        };
      },
    }),
    getLecciones: builder.query<Leccion[], string>({
      query: (cursoId) => `${cursoId}/lecciones`,
      providesTags: (result, error, cursoId) => [
        { type: 'Leccion', id: 'LIST' },
        ...(result?.map(({ id }) => ({ type: 'Leccion' as const, id })) || []),
      ],
      transformErrorResponse: (response: any) => {
        return {
          message: response?.data?.message || 'Error al obtener las lecciones',
          status: response?.status || 500,
        };
      },
    }),
    getAlumnos: builder.query<Alumno[], string>({
      query: (cursoId) => `${cursoId}/alumnos`,
      providesTags: (result, error, cursoId) => [
        { type: 'Alumno', id: 'LIST' },
        ...(result?.map(({ id }) => ({ type: 'Alumno' as const, id })) || []),
      ],
      transformErrorResponse: (response: any) => {
        return {
          message: response?.data?.message || 'Error al obtener los alumnos',
          status: response?.status || 500,
        };
      },
    }),
    getQuizzes: builder.query<Quiz[], string>({
      query: (cursoId) => `${cursoId}/quizzes`,
      providesTags: (result, error, cursoId) => [
        { type: 'Quiz', id: 'LIST' },
        ...(result?.map(({ id }) => ({ type: 'Quiz' as const, id })) || []),
      ],
      transformErrorResponse: (response: any) => {
        return {
          message: response?.data?.message || 'Error al obtener los quizzes',
          status: response?.status || 500,
        };
      },
    }),
  }),
});

export const { 
  useGetCursoByIdQuery, 
  useGetLeccionesQuery, 
  useGetAlumnosQuery, 
  useGetQuizzesQuery 
} = cursoDetalleApi;
