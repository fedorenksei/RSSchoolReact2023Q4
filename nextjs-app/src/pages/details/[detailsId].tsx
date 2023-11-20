import { Product } from "@/components/entities/Product";
import { setIsLoading } from "@/shared/store/details-slice";
import { skipToken } from "@reduxjs/toolkit/query";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useGetProductByIdQuery } from "@/shared/store/rtk-query";
import { Loader } from "@/shared/ui-kit/Loader";
import { useEffect } from "react";
import { getQueryParams } from "@/shared/utils";

const Details = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  console.log(router);

  let { detailsId } = router.query;
  if (Array.isArray(detailsId)) detailsId = detailsId[0]; // TODO: figure out how to remove
  const { data, isError, isFetching } = useGetProductByIdQuery(
    detailsId || skipToken
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
        href={`/${getQueryParams(router)}`}
        className="hover:text-violet-600 transition"
      >
        Close
      </Link>
      <div className="grow grid place-items-center">{searchResults}</div>
    </div>
  );
};

export default Details;
