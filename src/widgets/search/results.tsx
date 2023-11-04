import React, { useEffect, useState } from 'react';
import { Character } from '../../entities/character';
import { Api } from '../../shared/api';
import { CharacterData } from '../../shared/types';

interface Props {
  query: string | null;
}

export const SearchResults = ({ query }: Props) => {
  const [results, setResults] = useState<CharacterData[] | null>(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const f = async () => {
      if (query === null) return;
      setIsLoading(true);
      try {
        const api = Api.getInstance();
        const results = await api.getSearchResults(query);
        setResults(results);
        setHasError(false);
      } catch (err) {
        setHasError(true);
      }
      setIsLoading(false);
    };
    f();
  }, [query]);

  if (hasError) return <p>Something went wrong...</p>;
  if (!results || isLoading) return <p>Loading...</p>;
  if (!results.length) return <p>Have not found anything...</p>;
  return (
    <div className="max-w-xl">
      {results.map((data) => (
        <Character key={data.id} {...data} />
      ))}
    </div>
  );
};
