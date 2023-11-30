import { ProductData } from '@/shared/data/types';
import { Loader } from '@/shared/ui-kit/Loader';
import { Product } from '../entities/Product';

export const SearchResults = ({ results }: { results: ProductData[] }) => {
  // const { isLoading, isError } = useSelector(
  //   (state: RootState) => state.searchResults
  // );
  // const { data } = useSearchResults();

  let searchResults;
  // if (isError) {
  //   searchResults = <p>Something went wrong...</p>;
  // } else
  if (
    !results
    //  || isLoading
  ) {
    searchResults = <Loader />;
  } else if (!results.length) {
    searchResults = <p>Have not found anything...</p>;
  } else {
    searchResults = (
      <div>
        {results.map((product) => (
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
