import { GetServerSidePropsContext } from 'next';
import { getStringQueryParam } from './utils';
import { DEFAULT_LIMIT } from './data/constants';
import { store } from './store/store';
import { dummyJsonApi } from './store/rtk-query';

export const getProducts = async (context: GetServerSidePropsContext) => {
  const searchTerm = getStringQueryParam('searchTerm', context) || '';
  const limit = getStringQueryParam('limit', context) || `${DEFAULT_LIMIT}`;
  const page = getStringQueryParam('page', context) || '1';
  const result = await store.dispatch(
    dummyJsonApi.endpoints.searchProducts.initiate({
      searchTerm,
      limit: +limit,
      page: +page,
    })
  );
  return { results: result.data?.results, total: result.data?.total };
};
