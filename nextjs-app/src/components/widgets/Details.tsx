import { ProductData } from '@/shared/data/types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Product } from '../entities/Product';
import { getQueryParams } from '@/shared/utils';

export const DetailsUI = ({
  details,
}: {
  details: ProductData | undefined;
}) => {
  const router = useRouter();

  return (
    <>
      <div className="h-screen fixed sm:sticky sm:right-0 sm:w-96 w-screen top-0 flex flex-col p-3 bg-slate-50">
        <div
          className="hover:text-violet-600 transition cursor-pointer"
          onClick={() => router.push(`/${getQueryParams(router)}`)}
        >
          Close
        </div>
        <div className="grow grid place-items-center">
          {details ? (
            <Product view="details" data={details} />
          ) : (
            <p>Something went wrong...</p>
          )}
        </div>
      </div>
    </>
  );
};
