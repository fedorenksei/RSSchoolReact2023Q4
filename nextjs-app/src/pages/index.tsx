import { ProductData } from '@/shared/data/types';
import { getProducts } from '@/shared/utils';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps<{
  results: ProductData[] | undefined;
  total: number | undefined;
}> = async (context) => {
  return { props: await getProducts(context) };
};

export default function Home() {
  return <div></div>;
}
