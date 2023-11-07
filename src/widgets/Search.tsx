import React, { useEffect, useState } from 'react';
import { SearchInput } from '../features/Input';
import { SearchResults } from '../features/Results';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../shared/context';
import { ApiRequestStatus } from '../shared/types';
import { useLimit, usePage, useSearchTerm } from '../shared/hooks';
import { Api } from '../utils/api';
import { Limit } from '../features/Limit';
import { Pagination } from '../features/Pagination';

export const Search = () => {
  const navigate = useNavigate();
  const [page, setPage] = usePage();

  const [searchTerm, setSearchTerm] = useSearchTerm();
  const [apiRequestStatus, setApiRequestStatus] =
    useState<ApiRequestStatus>(null);
  const [limit, setLimit] = useLimit(10);

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

  return (
    <SearchContext.Provider
      value={{
        apiRequestParams: {
          searchTerm,
          setSearchTerm,
          limit,
          setLimit,
        },
        apiRequestStatus,
      }}
    >
      <div
        className="flex flex-col items-center pt-[10vh] flex-shrink-0 gap-5"
        onClick={() => navigate(`/${window.location.search}`)}
      >
        <h1 className="text-3xl">Search for Products of DummyJSON</h1>
        <SearchInput />
        {apiRequestStatus && typeof apiRequestStatus === 'object' && (
          <div className="flex flex-col gap-4 items-center">
            <div className="self-stretch flex justify-between gap-5 flex-wrap items-center">
              <p>Total: {apiRequestStatus.total}</p>
              <Limit />
            </div>
            <Pagination />
          </div>
        )}
        <SearchResults />
      </div>
    </SearchContext.Provider>
  );
};
