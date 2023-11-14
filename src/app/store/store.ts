import { configureStore } from '@reduxjs/toolkit';
import limitSlice from '../../features/Limit/limit-slice';

export const store = configureStore({
  reducer: {
    limit: limitSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
