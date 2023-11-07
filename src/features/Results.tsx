import React, { MouseEvent } from 'react';
import { Product } from '../entities/Product';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../entities/Loader';
import { useSearchContext } from '../shared/context';

export const SearchResults = () => {
  const { apiRequestStatus } = useSearchContext();
  const navigate = useNavigate();

  let searchResults;
  if (apiRequestStatus === 'error') {
    searchResults = <p>Something went wrong...</p>;
  } else if (!apiRequestStatus || apiRequestStatus === 'loading') {
    searchResults = <Loader />;
  } else if (!apiRequestStatus.results.length) {
    searchResults = <p>Have not found anything...</p>;
  } else {
    const { results } = apiRequestStatus;
    searchResults = (
      <div>
        {results.map((data) => (
          <div
            onClick={(e: MouseEvent) => {
              navigate(`details/${data.id}${window.location.search}`);
              e.stopPropagation();
            }}
            key={data.id}
            className="cursor-pointer hover:shadow-lg hover:bg-blue-100 transition"
          >
            <Product view="card" data={data} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-xl flex flex-col gap-7 items-center">
      {searchResults}
    </div>
  );
};
