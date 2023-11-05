import React, { useCallback, useState } from 'react';
import { SearchInput } from './input';
import { SearchResults } from './results';

export const Search = () => {
  const [query, setQuery] = useState<string | null>(null);
  const handleQuery = useCallback((query: string) => setQuery(query), []);

  return (
    <div className="flex flex-col items-center pt-[10vh] flex-shrink-0 gap-5">
      <h1 className="text-3xl">Search for Products of DummyJSON</h1>
      <SearchInput handleQuery={handleQuery} />
      <SearchResults query={query} />
    </div>
  );
};
