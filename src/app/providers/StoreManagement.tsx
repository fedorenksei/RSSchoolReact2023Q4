import { PropsWithChildren } from 'react';
import { useSearchResults } from '../../widgets/Search/hook';

export const StoreManagement = ({ children }: PropsWithChildren) => {
  useSearchResults();
  return <>{children}</>;
};
