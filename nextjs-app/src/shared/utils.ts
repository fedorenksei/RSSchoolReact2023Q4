import { GetServerSidePropsContext } from 'next';
import { NextRouter } from 'next/router';
import { ApiProductData, ProductData } from './data/types';

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

export const transformApiProductData = (
  response: ApiProductData
): ProductData => ({
  id: '' + response.id,
  name: response.title,
  description: response.description,
  imageUrl: response.thumbnail,
});
