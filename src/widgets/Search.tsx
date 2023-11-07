import React, { useCallback, useState } from 'react';
import { SearchInput } from '../features/Input';
import { SearchResults } from '../features/Results';
import { useNavigate } from 'react-router-dom';

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const handleSearchTerm = useCallback(
    (searchTerm: string) => setSearchTerm(searchTerm),
    []
  );
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-center pt-[10vh] flex-shrink-0 gap-5"
      onClick={() => navigate(`/${window.location.search}`)}
    >
      <h1 className="text-3xl">Search for Products of DummyJSON</h1>
      <SearchInput handleSearchTerm={handleSearchTerm} />
      <SearchResults searchTerm={searchTerm} />
    </div>
  );
};
