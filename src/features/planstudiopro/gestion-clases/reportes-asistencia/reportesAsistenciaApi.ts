// reportesAsistenciaApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const reportesAsistenciaApi = createApi({
  reducerPath: 'reportesAsistenciaApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/analytics/' }), // Assuming an analytics API base URL
  endpoints: (builder) => ({
    getDashboardData: builder.query<any, void>({
      query: () => 'dashboard',
    }),
    getPredictiveAnalysis: builder.query<any, void>({
      query: () => 'predictive-analysis',
    }),
    getCustomerSegmentation: builder.query<any, void>({
      query: () => 'customer-segmentation',
    }),
    getCompetitorComparison: builder.query<any, void>({
      query: () => 'competitor-comparison',
    }),
    getMarketingROI: builder.query<any, void>({
      query: () => 'marketing-roi',
    }),
    getLifetimeValue: builder.query<any, void>({
      query: () => 'lifetime-value',
    }),
    getHeatmapData: builder.query<any, void>({
      query: () => 'heatmap',
    }),
    getDemandForecasting: builder.query<any, void>({
      query: () => 'demand-forecasting',
    }),
    getSmartAlerts: builder.query<any, void>({
      query: () => 'smart-alerts',
    }),
    getGoogleAnalyticsIntegration: builder.query<any, void>({
      query: () => 'google-analytics-integration',
    }),
  }),
});

export const {
  useGetDashboardDataQuery,
  useGetPredictiveAnalysisQuery,
  useGetCustomerSegmentationQuery,
  useGetCompetitorComparisonQuery,
  useGetMarketingROIQuery,
  useGetLifetimeValueQuery,
  useGetHeatmapDataQuery,
  useGetDemandForecastingQuery,
  useGetSmartAlertsQuery,
  useGetGoogleAnalyticsIntegrationQuery,
} = reportesAsistenciaApi;