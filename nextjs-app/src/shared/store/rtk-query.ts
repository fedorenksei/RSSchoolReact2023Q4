import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../data/constants';
import { ApiProductData, ProductData } from '../data/types';
import { transformApiProductData } from '../utils';

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
  reducerPath: 'dummyJsonApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getProductById: builder.query<ProductData, string>({
      query: (id) => `product/${id}`,
      transformResponse: transformApiProductData,
    }),

    searchProducts: builder.query<SearchProductsResult, SearchProductsParams>({
      query: ({ searchTerm, limit, page }) =>
        `products${
          searchTerm ? `/search?q=${searchTerm}` : '?'
        }&limit=${limit}&skip=${limit * (page - 1)}`,

      transformResponse: ({ products, total }: ApiSearchProductsBody) => ({
        results: products.map(transformApiProductData),
        total,
      }),
    }),
  }),
});

export const { useGetProductByIdQuery, useSearchProductsQuery } = dummyJsonApi;
