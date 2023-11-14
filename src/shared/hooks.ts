import { SetStateAction, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ApiRequestParams, ApiRequestStatus } from './data/types';
import { Api } from './external/api';
import {
  getSearchTermFromLS,
  setSearchTermToLS,
} from './external/localStorage';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store/store';

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
  apiRequestParams: ApiRequestParams;
  apiRequestStatus: ApiRequestStatus;
} {
  const [page, setPage] = usePage();
  const [searchTerm, setSearchTerm] = useSearchTerm({ setPage });
  const [apiRequestStatus, setApiRequestStatus] =
    useState<ApiRequestStatus>(null);
  // const [limit, setLimit] = useLimit({ defaultLimit: 10, setPage });
  const limit = useSelector((state: RootState) => state.limit.value);

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
    apiRequestParams: { searchTerm, setSearchTerm },
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
