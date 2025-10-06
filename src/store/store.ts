import { configureStore } from '@reduxjs/toolkit';
import { impuestosApi } from '../features/finance/finance/impuestos/impuestosApi';

export const store = configureStore({
  reducer: {
    [impuestosApi.reducerPath]: impuestosApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(impuestosApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
