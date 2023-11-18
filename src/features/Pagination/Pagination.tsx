import { useSelector } from 'react-redux';
import { RootState } from '../../app/store/store';
import { Button } from '../../shared/ui-kit/Button';
import { usePage } from './hook';
import { useSearchResults } from '../../widgets/Search/hook';

export const Pagination = () => {
  const [page, setPage] = usePage();
  const limit = useSelector((state: RootState) => state.limit.value);
  const { data } = useSearchResults();
  const total = data?.total || 0;
  const pages = Math.ceil(total / limit);

  return (
    <div className="flex gap-2 items-center">
      <Button disabled={page === 1} onClick={() => setPage((n) => n - 1)}>
        &lt;
      </Button>
      {page > 2 && <Button onClick={() => setPage(1)}>1</Button>}
      {page > 3 && <span>...</span>}
      {page > 1 && (
        <Button onClick={() => setPage(page - 1)}>{page - 1}</Button>
      )}
      <span className="font-bold">{page}</span>
      {page < pages && (
        <Button onClick={() => setPage(page + 1)}>{page + 1}</Button>
      )}
      {page < pages - 2 && <span>...</span>}
      {page < pages - 1 && (
        <Button onClick={() => setPage(pages)}>{pages}</Button>
      )}
      <Button disabled={page === pages} onClick={() => setPage((n) => n + 1)}>
        &gt;
      </Button>
    </div>
  );
};
