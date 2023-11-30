import { configureStore } from '@reduxjs/toolkit';
import { dummyJsonApi } from './rtk-query';

export const configureAppStore = () => {
  return configureStore({
    reducer: {
      [dummyJsonApi.reducerPath]: dummyJsonApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(dummyJsonApi.middleware),
  });
};

export const store = configureAppStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
