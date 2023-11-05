import React, { useCallback, useState } from 'react';
import { SearchInput } from './input';
import { SearchResults } from './results';
import { useNavigate } from 'react-router-dom';

export const Search = () => {
  const [query, setQuery] = useState<string | null>(null);
  const handleQuery = useCallback((query: string) => setQuery(query), []);
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-center pt-[10vh] flex-shrink-0 gap-5"
      onClick={() => navigate(`/${window.location.search}`)}
    >
      <h1 className="text-3xl">Search for Products of DummyJSON</h1>
      <SearchInput handleQuery={handleQuery} />
      <SearchResults query={query} />
    </div>
  );
};
