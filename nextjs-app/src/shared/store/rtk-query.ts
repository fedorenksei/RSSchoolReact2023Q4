import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../data/constants";
import { ApiProductData, ProductData } from "../data/types";
// import { HYDRATE } from "next-redux-wrapper";

interface SearchProductsResult {
  total: number;
  results: ProductData[];
}
interface SearchProductsParams {
  searchTerm: string;
  limit: number;
  page: number;
}
interface ApiSearchProductsBody {
  products: ApiProductData[];
  total: number;
}

export const dummyJsonApi = createApi({
  reducerPath: "dummyJsonApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  // extractRehydrationInfo(action, { reducerPath }) {
  //   if (action.type === HYDRATE) {
  //     return action.payload[reducerPath];
  //   }
  // },
  endpoints: (builder) => ({
    getProductById: builder.query<ProductData, string>({
      query: (id) => `product/${id}`,
      transformResponse: (response: ApiProductData) => ({
        id: "" + response.id,
        name: response.title,
        description: response.description,
        imageUrl: response.thumbnail,
      }),
    }),

    searchProducts: builder.query<SearchProductsResult, SearchProductsParams>({
      query: ({ searchTerm, limit, page }) =>
        `products${
          searchTerm ? `/search?q=${searchTerm}` : "?"
        }&limit=${limit}&skip=${limit * (page - 1)}`,

      transformResponse: ({ products, total }: ApiSearchProductsBody) => ({
        results: products.map((data) => ({
          id: "" + data.id,
          name: data.title,
          description: data.description,
          imageUrl: data.thumbnail,
        })),
        total,
      }),
    }),
  }),
});

export const { useGetProductByIdQuery, useSearchProductsQuery } = dummyJsonApi;
