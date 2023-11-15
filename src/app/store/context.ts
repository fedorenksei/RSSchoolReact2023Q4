import { createContext, useContext } from 'react';
import { ApiRequestStatus } from '../../shared/data/types';

interface Context {
  apiRequestStatus: ApiRequestStatus;
}

export const SearchContext = createContext<Context>({
  apiRequestStatus: null,
});

export function useSearchContext() {
  return useContext(SearchContext);
}
