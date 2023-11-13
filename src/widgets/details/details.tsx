import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Api } from '../../shared/api';
import { ProductData } from '../../shared/types';
import { Product } from '../../entities/product';
import { Loader } from '../../entities/loader';

export const Details = () => {
  const { detailsId } = useParams();
  const [response, setResponse] = useState<ProductData | null>(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (!detailsId) return;
      setIsLoading(true);
      try {
        const api = Api.getInstance();
        const response = await api.getProduct(detailsId);
        setResponse(response);
        setHasError(false);
      } catch (err) {
        setHasError(true);
        console.log(err);
      }
      setIsLoading(false);
    })();
  }, [detailsId]);

  let searchResults;
  if (hasError) searchResults = <p>Something went wrong...</p>;
  else if (!response || isLoading) searchResults = <Loader />;
  else {
    searchResults = <Product view="details" data={response} />;
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
