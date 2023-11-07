import { createContext, useContext } from 'react';
import { ApiRequestStatus } from './types';

interface Context {
  apiRequestParams: {
    searchTerm: string;
    setSearchTerm: (s: string) => void;
    limit: number;
    setLimit: (s: number) => void;
  };
  apiRequestStatus: ApiRequestStatus;
}

export const SearchContext = createContext<Context>({
  apiRequestParams: {
    searchTerm: '',
    setSearchTerm: () => {},
    limit: 0,
    setLimit: () => {},
  },
  apiRequestStatus: null,
});

export function useSearchContext() {
  return useContext(SearchContext);
}
