import { configureStore } from '@reduxjs/toolkit';
import limitSlice from '../../features/Limit/limit-slice';
import searchTermSlice from '../../features/SearchInput/search-term-slice';
import { dummyJsonApi } from '../../shared/external/rtk-query';
import searchResultsSlice from '../../widgets/Search/search-slice';

export const store = configureStore({
  reducer: {
    limit: limitSlice,
    searchTerm: searchTermSlice,
    searchResults: searchResultsSlice,
    [dummyJsonApi.reducerPath]: dummyJsonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dummyJsonApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
