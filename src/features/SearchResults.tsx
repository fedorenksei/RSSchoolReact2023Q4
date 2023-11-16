import { Loader } from '../shared/ui-kit/Loader';
import { Product } from '../entities/Product';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store/store';

export const SearchResults = () => {
  const { data, isLoading, isError } = useSelector(
    (state: RootState) => state.searchResults
  );

  let searchResults;
  if (isError) {
    searchResults = <p>Something went wrong...</p>;
  } else if (isLoading) {
    searchResults = <Loader />;
  } else if (!data.length) {
    searchResults = <p>Have not found anything...</p>;
  } else {
    searchResults = (
      <div>
        {data.map((product) => (
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
