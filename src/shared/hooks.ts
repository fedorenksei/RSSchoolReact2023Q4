import { SetStateAction, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ApiRequestStatus } from './types';
import { Api } from '../utils/api';
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

export function useSearchManagement() {
  const [page, setPage] = usePage();
  const [searchTerm, setSearchTerm] = useSearchTerm({ setPage });
  const [apiRequestStatus, setApiRequestStatus] =
    useState<ApiRequestStatus>(null);
  const [limit, setLimit] = useLimit({ defaultLimit: 10, setPage });

  useEffect(() => {
    (async () => {
      setApiRequestStatus('loading');
      try {
        const api = Api.getInstance();
        const response = await api.getSearchResults({
          searchTerm: searchTerm,
          page,
          limit,
        });
        if (response.total && !response.results.length) setPage(1);
        setApiRequestStatus(response);
      } catch (err) {
        setApiRequestStatus('error');
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, page, limit]);

  return {
    apiRequestParams: { searchTerm, setSearchTerm, limit, setLimit },
    apiRequestStatus,
  };
}

function useSearchTerm({
  setPage,
}: {
  setPage: (s: SetStateAction<number>) => void;
}): [string, (s: string) => void] {
  const [searchTerm, setSearchTerm] = useState<string>(getSearchTermFromLS());
  const updateSearchTerm = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setSearchTermToLS(searchTerm);
    setPage(1);
  };
  return [searchTerm, updateSearchTerm];
}

function useLimit({
  defaultLimit,
  setPage,
}: {
  defaultLimit: number;
  setPage: (s: SetStateAction<number>) => void;
}): [number, (s: SetStateAction<number>) => void] {
  const [limit, setLimit] = useState(defaultLimit);
  const setLimitResetPage = (limit: SetStateAction<number>) => {
    setLimit(limit);
    setPage(1);
  };
  return [limit, setLimitResetPage];
}
