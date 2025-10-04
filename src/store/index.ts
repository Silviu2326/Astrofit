import { configureStore } from '@reduxjs/toolkit';
import { contenidosArticulosApi } from '../features/plancreatorpro/biblioteca-contenidos/biblioteca-contenidos/contenidos-articulos/contenidosArticulosApi';
import { impuestosApi } from '../features/finance/finance/impuestos/impuestosApi';
import { encuestasNpsApi } from '../features/marketing/marketing/encuestas-nps/encuestasNpsApi';
import { cursoDetalleApi } from '../features/plancreatorpro/cursos-online/cursos-online/curso-detalle/cursoDetalleApi';
import { calculadorasFuerzaApi } from '../features/training/training/calculadoras-fuerza/calculadorasFuerzaApi';
import { calculadorasNutricionalesApi } from '../features/nutrition/nutrition/calculadoras-nutricionales/calculadorasNutricionalesApi';
import { reportesAsistenciaApi } from '../features/planstudiopro/gestion-clases/reportes-asistencia/reportesAsistenciaApi';
import { datosTiempoRealApi } from '../features/planteamselite/sensores/datos-tiempo-real/datosTiempoRealApi';

export const store = configureStore({
  reducer: {
    [contenidosArticulosApi.reducerPath]: contenidosArticulosApi.reducer,
    [impuestosApi.reducerPath]: impuestosApi.reducer,
    [encuestasNpsApi.reducerPath]: encuestasNpsApi.reducer,
    [cursoDetalleApi.reducerPath]: cursoDetalleApi.reducer,
    [calculadorasFuerzaApi.reducerPath]: calculadorasFuerzaApi.reducer,
    [calculadorasNutricionalesApi.reducerPath]: calculadorasNutricionalesApi.reducer,
    [reportesAsistenciaApi.reducerPath]: reportesAsistenciaApi.reducer,
    [datosTiempoRealApi.reducerPath]: datosTiempoRealApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      contenidosArticulosApi.middleware,
      impuestosApi.middleware,
      encuestasNpsApi.middleware,
      cursoDetalleApi.middleware,
      calculadorasFuerzaApi.middleware,
      calculadorasNutricionalesApi.middleware,
      reportesAsistenciaApi.middleware,
      datosTiempoRealApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
