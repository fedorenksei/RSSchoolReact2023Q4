import { SetStateAction, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { RootState } from '../app/store/store';
import { ApiRequestStatus } from './data/types';
import { Api } from './external/api';

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

export function useSearchManagement(): {
  apiRequestStatus: ApiRequestStatus;
} {
  const [page, setPage] = usePage();
  const [apiRequestStatus, setApiRequestStatus] =
    useState<ApiRequestStatus>(null);
  // const [limit, setLimit] = useLimit({ defaultLimit: 10, setPage });
  const searchTerm = useSelector((state: RootState) => state.searchTerm.value);
  const limit = useSelector((state: RootState) => state.limit.value);

  useEffect(() => {
    (async () => {
      setApiRequestStatus('loading');
      try {
        const api = Api.getInstance();
        const response = await api.getSearchResults({
          searchTerm,
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
    apiRequestStatus,
  };
}
