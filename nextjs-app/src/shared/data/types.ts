import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';

export interface ProductData {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface ApiProductData {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  withSearch: boolean;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
