import { Link, useParams } from 'react-router-dom';
import { Product } from '../../entities/Product';
import { useGetProductByIdQuery } from '../../shared/external/rtk-query';
import { Loader } from '../../shared/ui-kit/Loader';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setIsLoading } from './details-slice';

export const Details = () => {
  const dispatch = useDispatch();
  const { detailsId } = useParams();
  const { data, isError, isFetching } = useGetProductByIdQuery(
    detailsId as string
  );

  useEffect(() => {
    dispatch(setIsLoading(isFetching));
  }, [isFetching, dispatch]);

  let searchResults;
  if (isError) searchResults = <p>Something went wrong...</p>;
  else if (!data || isFetching) searchResults = <Loader />;
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
