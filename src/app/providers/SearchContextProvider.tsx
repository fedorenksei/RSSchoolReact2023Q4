import { PropsWithChildren } from 'react';
import { SearchContext } from '../../shared/context';
import { useSearchManagement } from '../../widgets/Search/hooks';

export const SearchContextProvider = ({ children }: PropsWithChildren) => {
  const { apiRequestParams, apiRequestStatus } = useSearchManagement();

  return (
    <SearchContext.Provider value={{ apiRequestParams, apiRequestStatus }}>
      {children}
    </SearchContext.Provider>
  );
};
