import { GetServerSidePropsContext } from "next";
import { NextRouter } from "next/router";
import { BASE_URL, DEFAULT_LIMIT } from "./data/constants";
import { ProductData } from "./data/types";

export const getQueryParams = (router: NextRouter) => {
  const questionPos = router.asPath.indexOf("?");
  return questionPos < 0 ? "" : router.asPath.slice(questionPos);
};

export const getStringQueryParam = (
  name: string,
  router: NextRouter | GetServerSidePropsContext
) => {
  const urlValue = router.query[name];
  return Array.isArray(urlValue) ? urlValue[0] : urlValue;
};

export const getProducts = async (context: GetServerSidePropsContext) => {
  const { searchTerm } = context.query;
  const limit = getStringQueryParam("limit", context) || `${DEFAULT_LIMIT}`;
  const page = getStringQueryParam("page", context) || "1";
  const response = await fetch(
    `${BASE_URL}products${
      searchTerm ? `/search?q=${searchTerm}` : "?"
    }&limit=${limit}&skip=${+limit * (+page - 1)}`
  );
  if (!response.ok) {
    throw new Error("Response's status is not 200 OK");
  }
  const body = await response.json();
  const results: ProductData[] = body.products.map(
    (productData: {
      id: string;
      title: string;
      description: string;
      thumbnail: string;
    }) => ({
      id: productData.id,
      name: productData.title,
      description: productData.description,
      imageUrl: productData.thumbnail,
    })
  );
  const total: number = body.total;
  return { results, total };
};
