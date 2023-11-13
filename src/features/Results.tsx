import { Loader } from '../shared/ui-kit/Loader';
import { Product } from '../entities/Product';
import { useSearchContext } from '../app/store/context';

export const SearchResults = () => {
  const { apiRequestStatus } = useSearchContext();

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
          <Product key={data.id} view="card" data={data} />
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
