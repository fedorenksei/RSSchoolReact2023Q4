import { configureStore } from '@reduxjs/toolkit';
import limitSlice from '../../features/Limit/limit-slice';
import searchTermSlice from '../../features/SearchInput/search-term-slice';

export const store = configureStore({
  reducer: {
    limit: limitSlice,
    searchTerm: searchTermSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
