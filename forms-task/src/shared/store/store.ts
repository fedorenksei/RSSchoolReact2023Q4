import { configureStore } from '@reduxjs/toolkit';
import formDataReducer from './formDataSlice';
import countriesListSlice from './countriesListSlice';

export const store = configureStore({
  reducer: {
    formData: formDataReducer,
    countriesList: countriesListSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
