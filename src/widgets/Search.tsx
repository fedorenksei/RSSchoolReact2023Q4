import { useNavigate } from 'react-router-dom';
import { SearchInput } from '../features/Input';
import { Limit } from '../features/Limit';
import { Pagination } from '../features/Pagination';
import { SearchResults } from '../features/Results';
import { useSearchContext } from '../app/store/context';

export const Search = () => {
  const navigate = useNavigate();
  const { apiRequestStatus } = useSearchContext();

  return (
    <div
      className="flex flex-col items-center pt-[10vh] flex-shrink-0 gap-5"
      onClick={() => navigate(`/${window.location.search}`)}
    >
      <h1 className="text-3xl">Search for Products of DummyJSON</h1>
      <SearchInput />
      {apiRequestStatus && typeof apiRequestStatus === 'object' && (
        <div className="flex flex-col gap-4 items-center">
          <div className="self-stretch flex justify-between gap-5 flex-wrap items-center">
            <p>Total: {apiRequestStatus.total}</p>
            <Limit />
          </div>
          <Pagination />
        </div>
      )}
      <SearchResults />
    </div>
  );
};
