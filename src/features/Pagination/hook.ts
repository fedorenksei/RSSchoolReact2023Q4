import { SetStateAction } from 'react';
import { useSearchParams } from 'react-router-dom';

export function usePage(): [number, (s: SetStateAction<number>) => void] {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get('page');
  const page = +(pageParam || '1');

  const setPage = (pageSetter: SetStateAction<number>) => {
    setSearchParams({
      page: `${typeof pageSetter === 'number' ? pageSetter : pageSetter(page)}`,
    });
  };

  return [page, setPage];
}
