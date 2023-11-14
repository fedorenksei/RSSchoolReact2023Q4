import { createContext, useContext } from 'react';
import { ApiRequestParams, ApiRequestStatus } from '../../shared/data/types';

interface Context {
  apiRequestParams: ApiRequestParams;
  apiRequestStatus: ApiRequestStatus;
}

export const SearchContext = createContext<Context>({
  apiRequestParams: {
    searchTerm: '',
    setSearchTerm: () => {},
  },
  apiRequestStatus: null,
});

export function useSearchContext() {
  return useContext(SearchContext);
}
