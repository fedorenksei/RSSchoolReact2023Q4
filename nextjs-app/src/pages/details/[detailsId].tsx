import { Product } from "@/components/entities/Product";
import { Search } from "@/components/widgets/Search";
import { BASE_URL } from "@/shared/data/constants";
import { ProductData } from "@/shared/data/types";
import {
  getProducts,
  getQueryParams,
  getStringQueryParam,
} from "@/shared/utils";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

export const getServerSideProps: GetServerSideProps<{
  details: ProductData;
  results: ProductData[];
  total: number;
}> = async (context) => {
  const detailsId = getStringQueryParam("detailsId", context);

  // store.dispatch(dummyJsonApi.endpoints.getProductById.initiate("1"));
  // await Promise.all(store.dispatch(dummyJsonApi.util.getRunningQueriesThunk()));

  const response = await fetch(`${BASE_URL}products/${detailsId}`);
  if (!response.ok) {
    throw new Error("Response's status is not 200 OK");
  }
  const data: {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
  } = await response.json();
  const res = {
    id: data.id,
    name: data.title,
    description: data.description,
    imageUrl: data.thumbnail,
  };

  return { props: { details: res, ...(await getProducts(context)) } };
};

export default function Details(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { details } = props;
  const dispatch = useDispatch();
  const router = useRouter();

  // let { detailsId } = router.query;
  // if (Array.isArray(detailsId)) detailsId = detailsId[0]; // TODO: figure out how to remove
  // const { data, isError, isFetching } = useGetProductByIdQuery(
  //   detailsId || skipToken
  // );

  // useEffect(() => {
  //   dispatch(setIsLoading(isFetching));
  // }, [isFetching, dispatch]);

  let searchResults;
  // if (isError) searchResults = <p>Something went wrong...</p>;
  // else if (!data || isFetching) searchResults = <Loader />;
  // else {
  // }
  searchResults = <Product view="details" data={details} />;

  return (
    <>
      <div className="h-screen fixed sm:sticky sm:right-0 sm:w-96 w-screen top-0 flex flex-col p-3 bg-slate-50">
        <Link
          href={`/${getQueryParams(router)}`}
          className="hover:text-violet-600 transition"
        >
          Close
        </Link>
        <div className="grow grid place-items-center">{searchResults}</div>
      </div>
    </>
  );
}
