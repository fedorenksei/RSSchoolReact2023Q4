import { useRouter } from 'next/router';
import { Button } from '../../shared/ui-kit/Button';
import { getQueryParams, getStringQueryParam } from '@/shared/utils';
import { DEFAULT_LIMIT } from '@/shared/data/constants';
import { ProductData } from '@/shared/data/types';

export const Pagination = ({ total }: { total: number }) => {
  const router = useRouter();
  const limit = getStringQueryParam('limit', router) || DEFAULT_LIMIT;
  const page = +(getStringQueryParam('page', router) || 1);
  const pages = Math.ceil(total / +limit);
  const setPage = (action: number | ((n: number) => number)) => {
    const newPage = typeof action === 'number' ? action : action(page);
    const params = new URLSearchParams(getQueryParams(router));
    params.set('page', `${newPage}`);
    router.push(`/?${params.toString()}`);
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex gap-2 items-center"
    >
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
