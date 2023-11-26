import { GetServerSidePropsContext } from 'next';
import { NextRouter } from 'next/router';
import { BASE_URL, DEFAULT_LIMIT } from './data/constants';
import { ProductData } from './data/types';
import { store } from './store/store';
import { dummyJsonApi } from './store/rtk-query';

export const getQueryParams = (router: NextRouter) => {
  const questionPos = router.asPath.indexOf('?');
  return questionPos < 0 ? '' : router.asPath.slice(questionPos);
};

export const getStringQueryParam = (
  name: string,
  router: NextRouter | GetServerSidePropsContext
) => {
  const urlValue = router.query[name];
  return Array.isArray(urlValue) ? urlValue[0] : urlValue;
};

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
