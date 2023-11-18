import { Loader } from '../shared/ui-kit/Loader';
import { Product } from '../entities/Product';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store/store';
import { useSearchResults } from '../widgets/Search/hook';

export const SearchResults = () => {
  const { isLoading, isError } = useSelector(
    (state: RootState) => state.searchResults
  );
  const { data } = useSearchResults();

  let searchResults;
  if (isError) {
    searchResults = <p>Something went wrong...</p>;
  } else if (!data || isLoading) {
    searchResults = <Loader />;
  } else if (!data.results.length) {
    searchResults = <p>Have not found anything...</p>;
  } else {
    searchResults = (
      <div>
        {data.results.map((product) => (
          <Product key={product.id} view="card" data={product} />
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
