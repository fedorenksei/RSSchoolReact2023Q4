import { PropsWithChildren } from 'react';
import { SearchContext } from '../store/context';
import { useSearchManagement } from '../../shared/hooks';

export const SearchContextProvider = ({ children }: PropsWithChildren) => {
  const { apiRequestStatus } = useSearchManagement();

  return (
    <SearchContext.Provider value={{ apiRequestStatus }}>
      {children}
    </SearchContext.Provider>
  );
};
