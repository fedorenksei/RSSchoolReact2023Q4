import { configureStore } from "@reduxjs/toolkit";
import { dummyJsonApi } from "./rtk-query";
// import limitSlice from '../../features/Limit/limit-slice';
// import searchTermSlice from '../../features/SearchInput/search-term-slice';
// import searchResultsSlice from '../../widgets/Search/search-slice';

export const configureAppStore = () => {
  return configureStore({
    reducer: {
      // limit: limitSlice,
      // searchTerm: searchTermSlice,
      // searchResults: searchResultsSlice,
      [dummyJsonApi.reducerPath]: dummyJsonApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(dummyJsonApi.middleware),
  });
};

export const store = configureAppStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
