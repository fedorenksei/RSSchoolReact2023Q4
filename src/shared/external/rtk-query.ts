import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../data/constants';
import { ApiProductData, ProductData } from '../data/types';

export const dummyJsonApi = createApi({
  reducerPath: 'dummyJsonApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getProductById: builder.query<ProductData, string>({
      query: (id) => `product/${id}`,
      transformResponse: (response: ApiProductData) => ({
        id: '' + response.id,
        name: response.title,
        description: response.description,
        imageUrl: response.thumbnail,
      }),
    }),
  }),
});

export const { useGetProductByIdQuery } = dummyJsonApi;
