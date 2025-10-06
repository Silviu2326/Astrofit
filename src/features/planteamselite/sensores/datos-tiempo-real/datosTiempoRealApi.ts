// Endpoints para alertas en tiempo real, grabación y streaming
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const datosTiempoRealApi = createApi({
  reducerPath: 'datosTiempoRealApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/datos-tiempo-real/' }),
  endpoints: (builder) => ({
    getAlertas: builder.query<any, void>({
      query: () => 'alertas',
    }),
    startGrabacion: builder.mutation<any, void>({
      query: () => ({
        url: 'grabacion/start',
        method: 'POST',
      }),
    }),
    stopGrabacion: builder.mutation<any, void>({
      query: () => ({
        url: 'grabacion/stop',
        method: 'POST',
      }),
    }),
    startStreaming: builder.mutation<any, void>({
      query: () => ({
        url: 'streaming/start',
        method: 'POST',
      }),
    }),
    stopStreaming: builder.mutation<any, void>({
      query: () => ({
        url: 'streaming/stop',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useGetAlertasQuery,
  useStartGrabacionMutation,
  useStopGrabacionMutation,
  useStartStreamingMutation,
  useStopStreamingMutation,
} = datosTiempoRealApi;