import React, { SetStateAction, useEffect, useState } from 'react';
import { Product } from '../../entities/product';
import { Api } from '../../shared/api';
import { ProductData } from '../../shared/types';
import { Pagination } from '../../features/pagination';
import { Limit } from '../../features/limit';
import { useSearchParams } from 'react-router-dom';

interface ApiResponse {
  total: number;
  results: ProductData[];
}

interface Props {
  query: string | null;
}

export const SearchResults = ({ query }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get('page');
  const page = +(pageParam || '1');
  const setPage = (pageSetter: SetStateAction<number>) => {
    setSearchParams({
      page: `${typeof pageSetter === 'number' ? pageSetter : pageSetter(page)}`,
    });
  };
  const [limit, setLimit] = useState(10);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (query === null) return;
      setIsLoading(true);
      try {
        const api = Api.getInstance();
        const response = await api.getSearchResults({
          query,
          page,
          limit,
        });
        if (response.total && !response.results.length) setPage(1);
        setResponse(response);
        setHasError(false);
      } catch (err) {
        setHasError(true);
        console.log(err);
      }
      setIsLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, page, limit]);

  const setLimitResetPage = (limit: SetStateAction<number>) => {
    setLimit(limit);
    setPage(1);
  };

  const { results, total } = response || {};
  let searchResults;
  if (hasError) searchResults = <p>Something went wrong...</p>;
  else if (!results || isLoading) searchResults = <p>Loading...</p>;
  else if (!results.length) searchResults = <p>Have not found anything...</p>;
  else {
    searchResults = (
      <div>
        {results.map((data) => (
          <Product key={data.id} {...data} />
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-xl flex flex-col gap-7 items-center">
      {results && total && (
        <div className="flex flex-col gap-4 items-center">
          <div className="self-stretch flex justify-between gap-5 flex-wrap items-center">
            <p>Total: {total}</p>
            <Limit {...{ limit, setLimit: setLimitResetPage }} />
          </div>
          <Pagination {...{ page, setPage, pages: Math.ceil(total / limit) }} />
        </div>
      )}
      {searchResults}
    </div>
  );
};
