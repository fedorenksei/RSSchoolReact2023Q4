import { PropsWithChildren } from 'react';
import { SearchContext } from '../store/context';
import { useSearchManagement } from '../../shared/hooks';

export const SearchContextProvider = ({ children }: PropsWithChildren) => {
  const { apiRequestParams, apiRequestStatus } = useSearchManagement();

  return (
    <SearchContext.Provider value={{ apiRequestParams, apiRequestStatus }}>
      {children}
    </SearchContext.Provider>
  );
};
