import { SetStateAction, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchTermFromLS, setSearchTermToLS } from '../utils/localStorage';

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

export function useSearchTerm(): [string, (s: string) => void] {
  const [, setPage] = usePage();
  const [searchTerm, setSearchTerm] = useState<string>(getSearchTermFromLS());
  const updateSearchTerm = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setSearchTermToLS(searchTerm);
    setPage(1);
  };
  return [searchTerm, updateSearchTerm];
}

export function useLimit(
  defaultLimit: number
): [number, (s: SetStateAction<number>) => void] {
  const [, setPage] = usePage();
  const [limit, setLimit] = useState(defaultLimit);
  const setLimitResetPage = (limit: SetStateAction<number>) => {
    setLimit(limit);
    setPage(1);
  };
  return [limit, setLimitResetPage];
}
