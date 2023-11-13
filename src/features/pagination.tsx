import React, { Dispatch, SetStateAction } from 'react';
import { Button } from '../entities/button';

interface Props {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  pages: number;
}

export const Pagination = ({ page, setPage, pages }: Props) => {
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
