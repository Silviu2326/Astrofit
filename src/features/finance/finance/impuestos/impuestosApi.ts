import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = 'http://localhost:5000/api';

// ============================================================================
// INTERFACES Y TIPOS
// ============================================================================

// Tasas de Impuesto
export interface TasaImpuesto {
  _id: string;
  nombre: string;
  tipo: 'IVA' | 'IRPF' | 'OTRO';
  porcentaje: number;
  aplicaA: 'servicios' | 'productos' | 'ambos';
  codigo?: string;
  descripcion?: string;
  activo: boolean;
}

// Cálculos de Impuesto
export interface CalculoImpuesto {
  _id: string;
  factura: string;
  baseImponible: number;
  totalImpuestos: number;
  totalConImpuestos: number;
  desglose: Array<{
    nombreTasa: string;
    tipo: string;
    porcentaje: number;
    baseImponible: number;
    cuotaImpuesto: number;
  }>;
  fechaCalculo: string;
  estado: 'calculado' | 'aplicado' | 'anulado';
}

// Declaraciones Trimestrales
export interface DeclaracionTrimestral {
  _id: string;
  trimestre: number;
  año: number;
  totalVentas: number;
  ivaRepercutido: number;
  ivaSoportado: number;
  resultado: number;
  totalExenciones: number;
  estado: 'borrador' | 'presentado' | 'pagado' | 'compensado';
  fechaLimite: string;
  fechaPresentacion?: string;
  modelo: string;
  numeroReferencia?: string;
}

// Retenciones IRPF
export interface RetencionIRPF {
  _id: string;
  factura: string;
  cliente: any;
  baseRetencion: number;
  porcentaje: number;
  importeRetenido: number;
  trimestre: number;
  año: number;
  periodo: string;
  fecha: string;
  estado: 'pendiente' | 'declarado' | 'pagado';
  certificadoEmitido: boolean;
}

// Historial de Impuestos
export interface HistorialImpuesto {
  _id: string;
  periodo: string;
  trimestre?: number;
  año: number;
  tipoImpuesto: 'IVA' | 'IRPF' | 'IS' | 'IAE' | 'OTRO';
  modelo?: string;
  totalRetenido: number;
  totalPagado: number;
  saldo: number;
  fechaRegistro: string;
  fechaPago?: string;
  fechaLimite?: string;
  estado: 'pendiente' | 'pagado' | 'compensado' | 'vencido';
  metodoPago?: string;
  concepto?: string;
}

// Exenciones de Impuesto
export interface ExencionImpuesto {
  _id: string;
  nombre: string;
  descripcion: string;
  tipoExencion: 'IVA' | 'IRPF' | 'IS' | 'GENERAL';
  criterio: string;
  codigo?: string;
  porcentajeExencion: number;
  aplicacionAutomatica: boolean;
  baseLegal?: string;
  articulo?: string;
  fechaInicio: string;
  fechaFin?: string;
  activo: boolean;
}

// Otros Impuestos
export interface OtroImpuesto {
  _id: string;
  nombre: string;
  descripcion?: string;
  categoria: 'IAE' | 'Tasa Municipal' | 'Seguridad Social' | 'Impuesto Sociedades' | 'Otros';
  importeAnual: number;
  importePagado: number;
  importePendiente: number;
  frecuencia: 'Anual' | 'Semestral' | 'Trimestral' | 'Mensual' | 'Único';
  proximoVencimiento: string;
  ultimoPago?: string;
  estado: 'pendiente' | 'pagado' | 'parcial' | 'vencido';
  añoFiscal: number;
  organismoGestor?: string;
  numeroReferencia?: string;
}

// Respuestas de API
interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  total?: number;
}

// ============================================================================
// API SLICE
// ============================================================================

export const impuestosApi = createApi({
  reducerPath: 'impuestosApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      console.log('🔑 Token from localStorage:', token ? `${token.substring(0, 20)}...` : 'No token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
    validateStatus: (response, body) => {
      console.log('📡 API Response:', {
        status: response.status,
        statusText: response.statusText,
        url: response.url,
        body
      });
      return response.status >= 200 && response.status < 300;
    },
  }),
  tagTypes: ['TasaImpuesto', 'CalculoImpuesto', 'DeclaracionTrimestral', 'RetencionIRPF', 'HistorialImpuesto', 'ExencionImpuesto', 'OtroImpuesto'],
  endpoints: (builder) => ({

    // ========================================================================
    // TASAS DE IMPUESTO
    // ========================================================================
    getTasasImpuesto: builder.query<ApiResponse<TasaImpuesto[]>, void>({
      query: () => '/tasas-impuesto',
      providesTags: ['TasaImpuesto'],
    }),

    getTasasActivas: builder.query<ApiResponse<TasaImpuesto[]>, { tipo?: string }>({
      query: ({ tipo }) => ({
        url: '/tasas-impuesto/activas',
        params: tipo ? { tipo } : {},
      }),
      providesTags: ['TasaImpuesto'],
    }),

    createTasaImpuesto: builder.mutation<ApiResponse<TasaImpuesto>, Partial<TasaImpuesto>>({
      query: (body) => ({
        url: '/tasas-impuesto',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['TasaImpuesto'],
    }),

    updateTasaImpuesto: builder.mutation<ApiResponse<TasaImpuesto>, { id: string; data: Partial<TasaImpuesto> }>({
      query: ({ id, data }) => ({
        url: `/tasas-impuesto/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['TasaImpuesto'],
    }),

    deleteTasaImpuesto: builder.mutation<ApiResponse<{}>, string>({
      query: (id) => ({
        url: `/tasas-impuesto/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['TasaImpuesto'],
    }),

    // ========================================================================
    // CÁLCULOS DE IMPUESTO
    // ========================================================================
    getCalculosImpuesto: builder.query<ApiResponse<CalculoImpuesto[]>, void>({
      query: () => '/calculos-impuesto',
      providesTags: ['CalculoImpuesto'],
    }),

    getEstadisticasImpuestos: builder.query<ApiResponse<any>, { fechaInicio?: string; fechaFin?: string }>({
      query: (params) => ({
        url: '/calculos-impuesto/estadisticas',
        params,
      }),
    }),

    createCalculoImpuesto: builder.mutation<ApiResponse<CalculoImpuesto>, any>({
      query: (body) => ({
        url: '/calculos-impuesto',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['CalculoImpuesto'],
    }),

    createCalculoFromFactura: builder.mutation<ApiResponse<CalculoImpuesto>, { facturaId: string; tasasIds?: string[] }>({
      query: ({ facturaId, tasasIds }) => ({
        url: `/calculos-impuesto/from-factura/${facturaId}`,
        method: 'POST',
        body: tasasIds ? { tasasIds } : {},
      }),
      invalidatesTags: ['CalculoImpuesto'],
    }),

    // ========================================================================
    // DECLARACIONES TRIMESTRALES
    // ========================================================================
    getDeclaracionesTrimestrales: builder.query<ApiResponse<DeclaracionTrimestral[]>, { año?: number; trimestre?: number } | void>({
      query: (params) => {
        console.log('📤 GET Declaraciones Trimestrales - Request:', params);
        return {
          url: '/declaraciones-trimestrales',
          params,
        };
      },
      transformResponse: (response: ApiResponse<DeclaracionTrimestral[]>) => {
        console.log('📥 GET Declaraciones Trimestrales - Response:', response);
        return response;
      },
      providesTags: ['DeclaracionTrimestral'],
    }),

    getDeclaracionByPeriodo: builder.query<ApiResponse<DeclaracionTrimestral>, { año: number; trimestre: number }>({
      query: ({ año, trimestre }) => `/declaraciones-trimestrales/periodo/${año}/${trimestre}`,
      providesTags: ['DeclaracionTrimestral'],
    }),

    getResumenAnualDeclaraciones: builder.query<ApiResponse<any>, number>({
      query: (año) => `/declaraciones-trimestrales/resumen/${año}`,
    }),

    createDeclaracionFromPeriodo: builder.mutation<ApiResponse<DeclaracionTrimestral>, { año: number; trimestre: number }>({
      query: (body) => ({
        url: '/declaraciones-trimestrales/from-periodo',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['DeclaracionTrimestral'],
    }),

    presentarDeclaracion: builder.mutation<ApiResponse<DeclaracionTrimestral>, { id: string; numeroReferencia?: string }>({
      query: ({ id, numeroReferencia }) => ({
        url: `/declaraciones-trimestrales/${id}/presentar`,
        method: 'POST',
        body: numeroReferencia ? { numeroReferencia } : {},
      }),
      invalidatesTags: ['DeclaracionTrimestral'],
    }),

    pagarDeclaracion: builder.mutation<ApiResponse<DeclaracionTrimestral>, { id: string; metodoPago: string }>({
      query: ({ id, metodoPago }) => ({
        url: `/declaraciones-trimestrales/${id}/pagar`,
        method: 'POST',
        body: { metodoPago },
      }),
      invalidatesTags: ['DeclaracionTrimestral', 'HistorialImpuesto'],
    }),

    // ========================================================================
    // RETENCIONES IRPF
    // ========================================================================
    getRetencionesIRPF: builder.query<ApiResponse<RetencionIRPF[]>, { año?: number; trimestre?: number } | void>({
      query: (params) => {
        console.log('📤 GET Retenciones IRPF - Request:', params);
        return {
          url: '/retenciones-irpf',
          params,
        };
      },
      transformResponse: (response: ApiResponse<RetencionIRPF[]>) => {
        console.log('📥 GET Retenciones IRPF - Response:', response);
        return response;
      },
      providesTags: ['RetencionIRPF'],
    }),

    getRetencionesByPeriodo: builder.query<ApiResponse<RetencionIRPF[]>, { año: number; trimestre: number }>({
      query: ({ año, trimestre }) => `/retenciones-irpf/periodo/${año}/${trimestre}`,
      providesTags: ['RetencionIRPF'],
    }),

    getResumenTrimestralRetenciones: builder.query<ApiResponse<any>, { año: number; trimestre: number }>({
      query: ({ año, trimestre }) => `/retenciones-irpf/resumen/trimestral/${año}/${trimestre}`,
    }),

    getResumenAnualRetenciones: builder.query<ApiResponse<any>, number>({
      query: (año) => `/retenciones-irpf/resumen/anual/${año}`,
    }),

    createRetencionFromFactura: builder.mutation<ApiResponse<RetencionIRPF>, { facturaId: string; porcentaje?: number }>({
      query: ({ facturaId, porcentaje }) => ({
        url: `/retenciones-irpf/from-factura/${facturaId}`,
        method: 'POST',
        body: porcentaje ? { porcentaje } : {},
      }),
      invalidatesTags: ['RetencionIRPF'],
    }),

    emitirCertificado: builder.mutation<ApiResponse<RetencionIRPF>, { id: string; archivoUrl?: string }>({
      query: ({ id, archivoUrl }) => ({
        url: `/retenciones-irpf/${id}/certificado`,
        method: 'POST',
        body: archivoUrl ? { archivoUrl } : {},
      }),
      invalidatesTags: ['RetencionIRPF'],
    }),

    // ========================================================================
    // HISTORIAL DE IMPUESTOS
    // ========================================================================
    getHistorialImpuestos: builder.query<ApiResponse<HistorialImpuesto[]>, { año?: number; tipoImpuesto?: string }>({
      query: (params) => ({
        url: '/historial-impuestos',
        params,
      }),
      providesTags: ['HistorialImpuesto'],
    }),

    getResumenAnualHistorial: builder.query<ApiResponse<any>, number>({
      query: (año) => `/historial-impuestos/resumen/${año}`,
    }),

    getPendientesPago: builder.query<ApiResponse<HistorialImpuesto[]>, void>({
      query: () => '/historial-impuestos/pendientes',
      providesTags: ['HistorialImpuesto'],
    }),

    marcarHistorialPagado: builder.mutation<ApiResponse<HistorialImpuesto>, { id: string; metodoPago: string; numeroJustificante?: string }>({
      query: ({ id, metodoPago, numeroJustificante }) => ({
        url: `/historial-impuestos/${id}/pagar`,
        method: 'POST',
        body: { metodoPago, numeroJustificante },
      }),
      invalidatesTags: ['HistorialImpuesto'],
    }),

    // ========================================================================
    // EXENCIONES DE IMPUESTO
    // ========================================================================
    getExencionesImpuesto: builder.query<ApiResponse<ExencionImpuesto[]>, { tipoExencion?: string }>({
      query: (params) => ({
        url: '/exenciones-impuesto',
        params,
      }),
      providesTags: ['ExencionImpuesto'],
    }),

    getExencionesActivas: builder.query<ApiResponse<ExencionImpuesto[]>, { tipoExencion?: string }>({
      query: (params) => ({
        url: '/exenciones-impuesto/activas',
        params,
      }),
      providesTags: ['ExencionImpuesto'],
    }),

    createExencionImpuesto: builder.mutation<ApiResponse<ExencionImpuesto>, Partial<ExencionImpuesto>>({
      query: (body) => ({
        url: '/exenciones-impuesto',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['ExencionImpuesto'],
    }),

    updateExencionImpuesto: builder.mutation<ApiResponse<ExencionImpuesto>, { id: string; data: Partial<ExencionImpuesto> }>({
      query: ({ id, data }) => ({
        url: `/exenciones-impuesto/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['ExencionImpuesto'],
    }),

    deleteExencionImpuesto: builder.mutation<ApiResponse<{}>, string>({
      query: (id) => ({
        url: `/exenciones-impuesto/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ExencionImpuesto'],
    }),

    // ========================================================================
    // OTROS IMPUESTOS
    // ========================================================================
    getOtrosImpuestos: builder.query<ApiResponse<OtroImpuesto[]>, { añoFiscal?: number; categoria?: string } | void>({
      query: (params) => {
        console.log('📤 GET Otros Impuestos - Request:', params);
        return {
          url: '/otros-impuestos',
          params,
        };
      },
      transformResponse: (response: ApiResponse<OtroImpuesto[]>) => {
        console.log('📥 GET Otros Impuestos - Response:', response);
        return response;
      },
      providesTags: ['OtroImpuesto'],
    }),

    getProximosVencimientos: builder.query<ApiResponse<OtroImpuesto[]>, { dias?: number }>({
      query: (params) => ({
        url: '/otros-impuestos/proximos-vencimientos',
        params,
      }),
      providesTags: ['OtroImpuesto'],
    }),

    getResumenAnualOtrosImpuestos: builder.query<ApiResponse<any>, number>({
      query: (añoFiscal) => `/otros-impuestos/resumen/${añoFiscal}`,
    }),

    createOtroImpuesto: builder.mutation<ApiResponse<OtroImpuesto>, Partial<OtroImpuesto>>({
      query: (body) => ({
        url: '/otros-impuestos',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['OtroImpuesto'],
    }),

    registrarPagoOtroImpuesto: builder.mutation<ApiResponse<OtroImpuesto>, { id: string; importe: number; metodoPago: string; numeroJustificante?: string }>({
      query: ({ id, importe, metodoPago, numeroJustificante }) => ({
        url: `/otros-impuestos/${id}/pagar`,
        method: 'POST',
        body: { importe, metodoPago, numeroJustificante },
      }),
      invalidatesTags: ['OtroImpuesto'],
    }),

    updateOtroImpuesto: builder.mutation<ApiResponse<OtroImpuesto>, { id: string; data: Partial<OtroImpuesto> }>({
      query: ({ id, data }) => ({
        url: `/otros-impuestos/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['OtroImpuesto'],
    }),

    deleteOtroImpuesto: builder.mutation<ApiResponse<{}>, string>({
      query: (id) => ({
        url: `/otros-impuestos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['OtroImpuesto'],
    }),
  }),
});

// Export hooks
export const {
  // Tasas de Impuesto
  useGetTasasImpuestoQuery,
  useGetTasasActivasQuery,
  useCreateTasaImpuestoMutation,
  useUpdateTasaImpuestoMutation,
  useDeleteTasaImpuestoMutation,

  // Cálculos de Impuesto
  useGetCalculosImpuestoQuery,
  useGetEstadisticasImpuestosQuery,
  useCreateCalculoImpuestoMutation,
  useCreateCalculoFromFacturaMutation,

  // Declaraciones Trimestrales
  useGetDeclaracionesTrimestralesQuery,
  useGetDeclaracionByPeriodoQuery,
  useGetResumenAnualDeclaracionesQuery,
  useCreateDeclaracionFromPeriodoMutation,
  usePresentarDeclaracionMutation,
  usePagarDeclaracionMutation,

  // Retenciones IRPF
  useGetRetencionesIRPFQuery,
  useGetRetencionesByPeriodoQuery,
  useGetResumenTrimestralRetencionesQuery,
  useGetResumenAnualRetencionesQuery,
  useCreateRetencionFromFacturaMutation,
  useEmitirCertificadoMutation,

  // Historial de Impuestos
  useGetHistorialImpuestosQuery,
  useGetResumenAnualHistorialQuery,
  useGetPendientesPagoQuery,
  useMarcarHistorialPagadoMutation,

  // Exenciones de Impuesto
  useGetExencionesImpuestoQuery,
  useGetExencionesActivasQuery,
  useCreateExencionImpuestoMutation,
  useUpdateExencionImpuestoMutation,
  useDeleteExencionImpuestoMutation,

  // Otros Impuestos
  useGetOtrosImpuestosQuery,
  useGetProximosVencimientosQuery,
  useGetResumenAnualOtrosImpuestosQuery,
  useCreateOtroImpuestoMutation,
  useRegistrarPagoOtroImpuestoMutation,
  useUpdateOtroImpuestoMutation,
  useDeleteOtroImpuestoMutation,
} = impuestosApi;
