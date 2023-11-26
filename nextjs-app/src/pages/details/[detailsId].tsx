import { Product } from "@/components/entities/Product";
import { ProductData } from "@/shared/data/types";
import { dummyJsonApi } from "@/shared/store/rtk-query";
import { store } from "@/shared/store/store";
import {
  getProducts,
  getQueryParams,
  getStringQueryParam,
} from "@/shared/utils";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps<{
  details: ProductData | undefined;
  results: ProductData[] | undefined;
  total: number | undefined;
}> = async (context) => {
  const detailsId = getStringQueryParam("detailsId", context);

  const result = await store.dispatch(
    dummyJsonApi.endpoints.getProductById.initiate(detailsId || "")
  );

  return { props: { details: result.data, ...(await getProducts(context)) } };
};

export default function Details(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { details } = props;
  const router = useRouter();

  return (
    <>
      <div className="h-screen fixed sm:sticky sm:right-0 sm:w-96 w-screen top-0 flex flex-col p-3 bg-slate-50">
        <Link
          href={`/${getQueryParams(router)}`}
          className="hover:text-violet-600 transition"
        >
          Close
        </Link>
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
}
