import { Link, useParams } from 'react-router-dom';
import { Product } from '../entities/Product';
import { useGetProductByIdQuery } from '../shared/external/rtk-query';
import { Loader } from '../shared/ui-kit/Loader';

export const Details = () => {
  const { detailsId } = useParams();
  const { data, isError, isLoading, isFetching } = useGetProductByIdQuery(
    detailsId as string
  );

  let searchResults;
  if (isError) searchResults = <p>Something went wrong...</p>;
  else if (!data || isLoading || isFetching) searchResults = <Loader />;
  else {
    searchResults = <Product view="details" data={data} />;
  }

  return (
    <div className="h-screen fixed sm:sticky sm:right-0 sm:w-96 w-screen top-0 flex flex-col p-3 bg-slate-50">
      <Link
        to={`/${window.location.search}`}
        className="hover:text-violet-600 transition"
      >
        Close
      </Link>
      <div className="grow grid place-items-center">{searchResults}</div>
    </div>
  );
};
