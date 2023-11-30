import { DetailsUI } from '@/components/widgets/Details';
import { ProductData } from '@/shared/data/types';
import { getProducts } from '@/shared/getProducts';
import { dummyJsonApi } from '@/shared/store/rtk-query';
import { store } from '@/shared/store/store';
import { getStringQueryParam } from '@/shared/utils';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export const getServerSideProps: GetServerSideProps<{
  details: ProductData | undefined;
  results: ProductData[] | undefined;
  total: number | undefined;
}> = async (context) => {
  const detailsId = getStringQueryParam('detailsId', context);

  const result = await store.dispatch(
    dummyJsonApi.endpoints.getProductById.initiate(detailsId || '')
  );

  return { props: { details: result.data, ...(await getProducts(context)) } };
};

export default function Details(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { details } = props;

  return <DetailsUI details={details} />;
}

Details.withSearch = true;
