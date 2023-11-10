import React from 'react';
import { SearchInput } from '../../features/Input';
import { SearchResults } from '../../features/Results';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../shared/context';
import { Limit } from '../../features/Limit';
import { Pagination } from '../../features/Pagination';
import { useSearchManagement } from './hooks';

export const Search = () => {
  const navigate = useNavigate();
  const { apiRequestParams, apiRequestStatus } = useSearchManagement();

  return (
    <SearchContext.Provider value={{ apiRequestParams, apiRequestStatus }}>
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
