import { configureStore } from '@reduxjs/toolkit';
import { encuestasNpsApi } from '../features/marketing/marketing/encuestas-nps/encuestasNpsApi';

export const store = configureStore({
  reducer: {
    [encuestasNpsApi.reducerPath]: encuestasNpsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(encuestasNpsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
