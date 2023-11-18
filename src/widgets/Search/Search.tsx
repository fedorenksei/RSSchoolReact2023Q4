import { useNavigate } from 'react-router-dom';
import { Limit } from '../../features/Limit';
import { Pagination } from '../../features/Pagination';
import { SearchInput } from '../../features/SearchInput';
import { SearchResults } from '../../features/SearchResults';
import { useSearchResults } from './hook';

export const Search = () => {
  const navigate = useNavigate();
  const { data } = useSearchResults();

  return (
    <div
      className="flex flex-col items-center pt-[10vh] flex-shrink-0 gap-5"
      onClick={() => navigate(`/${window.location.search}`)}
    >
      <h1 className="text-3xl">Search for Products of DummyJSON</h1>
      <SearchInput />
      {data && (
        <div className="flex flex-col gap-4 items-center">
          <div className="self-stretch flex justify-between gap-5 flex-wrap items-center">
            <p>Total: {data.total}</p>
            <Limit />
          </div>
          <Pagination />
        </div>
      )}
      <SearchResults />
    </div>
  );
};
